"""
@Author Jose Raudales
@Version 1.0.0
@Descripcion Rutas del Login de BackOffice
"""

# INI | Login User **************************************************************************
from dotenv import load_dotenv
from flask import json, Response, Blueprint, request
from sqlalchemy import text

from ...models import db
from ...models.Auth.EmpleadosModel import TblEmpleadoModel, TblEmpleadoSchema
from ...shared.security.AuthenticationEmpleados import Auth

employee_session_api = Blueprint('employee_session_api', __name__)
employee_session_schema = TblEmpleadoSchema()

load_dotenv()


@employee_session_api.route('/', methods=['POST'])
def login():
    req_data = request.get_json()

    error = employee_session_schema.validate(req_data, partial=True)

    if error:
        return error, 400

    data = employee_session_schema.load(req_data, partial=True)

    if not data.get('correo') or not data.get('password'):
        return custom_response({'error': 'Necesitas Usuario para ingresar'}, 400)

    user = TblEmpleadoModel.get_by_username(data.get('correo'))
    if not user or user.activo is False or not user.check_hash(data.get('password')):
        return custom_response({'msg': 'Credenciales no válidas', 'code': 400, 'ok': False}, 400)

    token = Auth.generate_token(user.correo, user.id_rol)

    return custom_response({'token': token, "message": "Sesion Iniciada",
                            'code': 200, 'ok': True}, 200)  # FIN | Login User ***********


# cerrar sesion
@employee_session_api.route('/', methods=['PUT'])
# @Auth.auth_required
def logout():
    req_data = request.get_json()

    error = employee_session_schema.validate(req_data, partial=True)
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
