import datetime
import os

import jwt
from flask import json, Response


def _secret():
    return os.getenv('JWT_SECRET_KEY')


def json_error(message, status=401):
    return Response(
        mimetype="application/json",
        response=json.dumps({'error': message, 'code': status}),
        status=status,
    )


def encode(payload):
    token = jwt.encode(payload, _secret(), algorithm='HS256')
    if isinstance(token, bytes):
        return token.decode('utf-8')
    return token


def decode(token):
    result = {'data': {}, 'error': {}}
    try:
        payload = jwt.decode(token, _secret(), algorithms=['HS256'])
        result['data'] = {
            'user_id': payload.get('sub'),
            'typ': payload.get('typ'),
            'rol': payload.get('rol'),
        }
        return result
    except jwt.ExpiredSignatureError:
        result['error'] = {'code': 401, 'message': 'El token ha expirado, inicie sesión nuevamente'}
        return result
    except jwt.InvalidTokenError:
        result['error'] = {'code': 401, 'message': 'Token invalido, consiga un nuevo token'}
        return result


def user_token(email):
    now = datetime.datetime.utcnow()
    return encode({
        'exp': now + datetime.timedelta(hours=24),
        'iat': now,
        'sub': email,
        'typ': 'user',
    })


def employee_token(email, role_id):
    now = datetime.datetime.utcnow()
    return encode({
        'exp': now + datetime.timedelta(hours=12),
        'iat': now,
        'sub': email,
        'typ': 'employee',
        'rol': role_id,
    })


def confirm_token(user_id):
    now = datetime.datetime.utcnow()
    return encode({
        'exp': now + datetime.timedelta(hours=48),
        'iat': now,
        'sub': str(user_id),
        'typ': 'confirm',
    })
