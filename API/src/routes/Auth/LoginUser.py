"""
@Author Jose Raudales
@Version 1.0.0
@Descripcion Rutas del Login
"""

# INI | Login User **************************************************************************
from dotenv import load_dotenv
from flask import json, Response, Blueprint, request
from sqlalchemy import text

from ...models import db
from ...models.Auth.UsuarioModel import TblUserModel, TblUserSchema
from ...shared.security.AuthenticationUsers import Auth

session_api = Blueprint('session_api', __name__)
user_schema = TblUserSchema()

load_dotenv()


@session_api.route('/', methods=['POST'])
def login():
    req_data = request.get_json()

    error = user_schema.validate(req_data, partial=True)
    data = user_schema.load(req_data, partial=True)

    if not data.get('correo') or not data.get('password'):
        return custom_response({'error': 'Necesitas Usuario para ingresar'}, 400)

    user = TblUserModel.get_by_username(data.get('correo'))
    if not user:
        return custom_response(
            {'msg': 'Credenciales no válidas', 'code': 400, 'ok': False}, 400)

    if not user:
        return custom_response({'msg': 'Credenciales no válidas', 'code': 400, 'ok': False}, 400)

    if not user.check_hash(data.get('password')):
        return custom_response({'msg': 'Credenciales no válidas', 'code': 400, 'ok': False}, 400)

    ser_data = user_schema.dump(user)
    token = Auth.generate_token(ser_data.get('correo'))

    return custom_response({'token': token, "msg": "Sesion Iniciada",
                            'code': 200, 'ok': True}, 200)  # FIN | Login User ***********


# cerrar sesion
@session_api.route('/', methods=['PUT'])
# @Auth.auth_required
def logout():
    req_data = request.get_json()

    error = user_schema.validate(req_data, partial=True)
    if error:
        return error, 400

    data = user_schema.load(req_data, partial=True)
    user = TblUserModel.get_by_username(data.get('correo'))
    ser_data = user_schema.dump(user)

    return custom_response({"msg": "Sesión Finalizada", "code": 200, "ok": True}, 200)


def custom_response(res, status_code):
    """
    Custom Response Function
    """
    return Response(
        mimetype="application/json",
        response=json.dumps(res),
        status=status_code
    )
