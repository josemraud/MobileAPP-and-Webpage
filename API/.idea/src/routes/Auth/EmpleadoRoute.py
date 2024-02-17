"""
@Author Jose Raudales
@Version 1.0.0
@Descripcion Rutas de Empleados
"""
import datetime

from dotenv import load_dotenv
from flask import json, Response, Blueprint, request, jsonify, make_response
from sqlalchemy import text

from ...models import db
from ...models.Auth.EmpleadosModel import TblEmpleadoModel, TblEmpleadoSchema, VwEmpleadoModel, VwEmpleadoSchema
from ...shared.security.AuthenticationEmpleados import Auth

empleado_api = Blueprint('empleado_api', __name__)
empleado_schema = TblEmpleadoSchema()
empleado_schemas = VwEmpleadoSchema(many=True)

load_dotenv()


# INI | Get All Employees ***********************************************************************
@empleado_api.route('/', methods=['GET'])
@Auth.auth_admin
def get_all():
    query = VwEmpleadoModel.get_all_users()
    result = empleado_schemas.dump(query)
    return make_response(jsonify({'data': result}), 200)  # FIN | Get All Countries *************


# INI | Get All Employees ***********************************************************************
@empleado_api.route('/active', methods=['GET'])
@Auth.auth_admin
def get_all_active():
    query = VwEmpleadoModel.get_active_users()
    result = empleado_schemas.dump(query)
    return make_response(jsonify({'data': result}), 200)  # FIN | Get All Countries *************


# INI | New Employee ****************************************************************************
@empleado_api.route('/', methods=['POST'])
@Auth.auth_admin
def nuevoEmpleado():
    req_data = request.get_json(force=True)
    errors = empleado_schema.validate(req_data)

    if errors:
        return errors, 400

    data = empleado_schema.load(req_data)

    employee = TblEmpleadoModel(data)
    employee.save()

    return custom_response({'msg': 'Nuevo empleado', 'code': 201}, 201)  # FIN | New Employee ********************


# INI | Actualizar Empleado
@empleado_api.route('/<int:id_empleado>', methods=['PUT'])
@Auth.auth_admin
def actualizarEmpleado(id_empleado):
    req_data = request.get_json()
    quote = TblEmpleadoModel.get_one_user(id_empleado)
    if quote:
        quote.nombre = req_data['nombre']
        quote.apellido = req_data['apellido']
        quote.correo = req_data['correo']
        quote.fecha_modificacion = datetime.datetime.now()
        quote.id_pais = req_data['id_pais']
        quote.id_rol = req_data['id_rol']
        db.session.commit()
        return custom_response({"msg": "Empleado actualizado", 'code': 200}, 200)
    else:
        return custom_response({"msg": "Empleado no existe", 'code': 304}, 304)


# INI | Actualizar Empleado
@empleado_api.route('/<int:id_empleado>/restore', methods=['PUT'])
@Auth.auth_admin
def recuperarContra(id_empleado):
    req_data = request.get_json()
    quote = TblEmpleadoModel.get_one_user(id_empleado)
    if quote:
        quote.password = TblEmpleadoModel.generate_hash_restore(req_data['password'])
        quote.fecha_modificacion = datetime.datetime.now()
        db.session.commit()
        return custom_response({"msg": "Empleado actualizado", 'code': 200}, 200)
    else:
        return custom_response({"msg": "Empleado no existe", 'code': 304}, 304)


# Actualizar el estado [ACTIVO|INACTIVO] del Empleado
@empleado_api.route('/<string:id_empleado>/state', methods=['PUT'])
@Auth.auth_admin
def actualizaEstadoEmpleado(id_empleado):
    req_data = request.get_json()
    quote = TblEmpleadoModel.get_one_user(id_empleado)
    if quote:
        quote.activo = req_data['activo']
        quote.fecha_modificacion = datetime.datetime.now()
        db.session.commit()
        return custom_response({"msg": "Empleado actualizado", 'code': 200}, 200)
    else:
        return custom_response({"msg": "Empleado no existe", 'code': 304}, 304)


def custom_response(res, status_code):
    """
    Custom Response Function
    """
    return Response(
        mimetype="application/json",
        response=json.dumps(res),
        status=status_code
    )
