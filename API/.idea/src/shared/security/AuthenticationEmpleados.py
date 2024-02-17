import os
from functools import wraps

import jwt
from dotenv import load_dotenv
from flask import json, Response, request, g

load_dotenv()
import datetime
from ...models.Auth.EmpleadosModel import TblEmpleadoModel


class Auth():

    @staticmethod
    def generate_token(user_id):
        """
        Generate Token Method
        """
        try:
            payload = {
                'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=14),
                'iat': datetime.datetime.utcnow(),
                'sub': user_id
            }
            return jwt.encode(
                payload,
                os.getenv('JWT_SECRET_KEY'),
                'HS256'
            ).decode("utf-8")
        except Exception as e:
            return Response(
                mimetype="application/json",
                response=json.dumps({'error': 'Error no se pudo generar token'}),
                status=401
            )

    @staticmethod
    def decode_token(token):
        re = {'data': {}, 'error': {}}
        try:
            payload = jwt.decode(token, os.getenv('JWT_SECRET_KEY'))
            re['data'] = {'user_id': payload['sub']}
            return re
        except jwt.ExpiredSignatureError as e1:
            re['error'] = {'code': 401, 'message': 'El token ha expirado, inicie sesión nuevamente'}
            return re
        except jwt.InvalidTokenError:
            re['error'] = {'code': 401, 'message': 'Token invalido, consiga un nuevo token'}
            return re

    @staticmethod
    def auth_admin(func):
        @wraps(func)
        def decorated_auth(*args, **kwargs):
            if 'api-token' not in request.headers:
                return Response(
                    mimetype="application/json",
                    response=json.dumps({'error': 'No se puede validar token'}),
                    status=401
                )
            token = request.headers.get('api-token')
            data = Auth.decode_token(token)
            user_id = data['data']['user_id']
            check_user = TblEmpleadoModel.get_by_username(user_id)
            if check_user.activo is False:
                return {'code': 401, 'message': 'Tu usuario fue desactivado'}
            if check_user.id_rol is not 1:
                return {'code': 401, 'message': 'No estas autorizado para realizar esta accion'}
            if data['error']:
                return Response(
                    mimetype="application/json",
                    response=json.dumps(data['error']),
                    status=401
                )
            if not check_user:
                return Response(
                    mimetype="application/json",
                    response=json.dumps({'error': 'No existe un usuario con esas credenciales'}),
                    status=401
                )
            g.user = {'id': user_id}
            return func(*args, **kwargs)

        return decorated_auth

    # decorator
    @staticmethod
    def auth_required(func):
        @wraps(func)
        def decorated_auth(*args, **kwargs):
            if 'api-token' not in request.headers:
                return Response(
                    mimetype="application/json",
                    response=json.dumps({'error': 'No se puede validar token'}),
                    status=401
                )
            token = request.headers.get('api-token')
            data = Auth.decode_token(token)
            user_id = data['data']['user_id']
            check_user = TblEmpleadoModel.get_by_username(user_id)

            if data['error']:
                return Response(
                    mimetype="application/json",
                    response=json.dumps(data['error']),
                    status=401
                )
            if not check_user:
                return Response(
                    mimetype="application/json",
                    response=json.dumps({'error': 'No existe un usuario con esas credenciales'}),
                    status=401
                )
            g.user = {'id': user_id}
            return func(*args, **kwargs)

        return decorated_auth
