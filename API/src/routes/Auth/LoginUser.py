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
    if not user or not user.activo or not user.check_hash(data.get('password')):
        return custom_response({'msg': 'Credenciales no válidas', 'code': 400, 'ok': False}, 400)

    if user.confirmado is False:
        return custom_response({'msg': 'Confirma tu correo para acceder', 'code': 403, 'ok': False}, 403)

    token = Auth.generate_token(user.correo)

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
