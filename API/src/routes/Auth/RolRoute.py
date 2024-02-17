"""
@Author Jose Raudales
@Version 1.0.0
@Descripcion Rutas de Rol
"""
from dotenv import load_dotenv
from flask import json, Response, Blueprint, request, jsonify, make_response
from sqlalchemy import text

from src.models import db
from src.models.Auth.RolModel import TblRolModel, TblRolSchema
from src.shared.security.AuthenticationEmpleados import Auth

rol_api = Blueprint('rol_api', __name__)
rol_schema = TblRolSchema()
rol_schemas = TblRolSchema(many=True)

load_dotenv()


# INI | Get All Roles ***********************************************************************
@rol_api.route('/', methods=['GET'])
@Auth.auth_required
def get_all():
    query = TblRolModel.get_all_rol()
    result = rol_schemas.dump(query)
    return make_response(jsonify({'data': result}), 200)  # FIN | Get All Countries *************


# INI | Get All Countries ***********************************************************************
@rol_api.route('/active', methods=['GET'])
def get_all_Active():
    query = TblRolModel.get_all_rol_activos()
    result = rol_schemas.dump(query)
    return make_response(jsonify({'data': result}), 200)  # FIN | Get All Countries *************


# INI | New User ****************************************************************************
@rol_api.route('/', methods=['POST'])
@Auth.auth_admin
def nuevoRol():
    req_data = request.get_json(force=True)
    errors = rol_schema.validate(req_data)

    if errors:
        return errors, 400

    data = rol_schema.load(req_data)

    user = TblRolModel(data)
    user.save()

    return custom_response({'msg': 'Nuevo Rol', 'code': 201}, 201)  # FIN | New User ********************


# INI | Actualziar Rol
@rol_api.route('/<int:id_rol>', methods=['PUT'])
@Auth.auth_required
def actualizarRol(id_rol):
    req_data = request.get_json()
    quote = TblRolModel.get_one_rol(id_rol)
    if quote:
        quote.desc_rol = req_data['desc_rol']
        db.session.commit()
        return custom_response({"msg": "Rol actualizado", 'code': 200}, 200)
    else:
        return custom_response({"msg": "Rol no existe", 'code': 304}, 304)


# Aqui arranca el metodo de actualizar el estado [ACTIVO|INACTIVO] del Rol
@rol_api.route('/<string:id_rol>/state', methods=['PUT'])
@Auth.auth_required
def actualizaEstadoRol(id_rol):
    req_data = request.get_json()
    quote = TblRolModel.get_one_rol(id_rol)
    if quote:
        quote.activo = req_data['activo']
        db.session.commit()
        return custom_response({"msg": "Rol actualizado", 'code': 200}, 200)
    else:
        return custom_response({"msg": "Rol no existe", 'code': 304}, 304)


# FIN | Actualzar Estado Rol


def custom_response(res, status_code):
    """
    Custom Response Function
    """
    return Response(
        mimetype="application/json",
        response=json.dumps(res),
        status=status_code
    )
