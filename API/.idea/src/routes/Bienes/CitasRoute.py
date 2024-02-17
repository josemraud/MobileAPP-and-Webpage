"""
@Author Jose Raudales
@Version 1.0.0
@Descripcion Rutas de Cita
"""
import datetime

from dotenv import load_dotenv
from flask import json, Response, Blueprint, request, jsonify, make_response
from sqlalchemy import text

from ...models import db
from ...models.Bienes.CitaBienModel import TblCitaModel, TblCitaSchema, VwCitaSchema, VwCitaModel
from ...shared.security.AuthenticationEmpleados import Auth
from ...shared.security.AuthenticationUsers import Auth as AuthE

cita_bien_api = Blueprint('cita_bien_api', __name__)
cita_bien_schema = TblCitaSchema()
cita_bien_schemas = VwCitaSchema(many=True)

load_dotenv()


# INI | Get All Users ***********************************************************************
@cita_bien_api.route('/', methods=['GET'])
@Auth.auth_admin
def get_all():
    query = VwCitaModel.get_all_cita()
    result = cita_bien_schemas.dump(query)
    return make_response(jsonify({'data': result}), 200)  # FIN | Get All Users *************


# INI | Get All Users ***********************************************************************
@cita_bien_api.route('/<int:id_empleado>', methods=['GET'])
@Auth.auth_required
def get_by_employee(id_empleado):
    query = VwCitaModel.get_appointment_employee(id_empleado)
    result = cita_bien_schemas.dump(query)
    return make_response(jsonify({'data': result}), 200)  # FIN | Get All Users *************


# INI | Get All Users ***********************************************************************
@cita_bien_api.route('/pending', methods=['GET'])
@Auth.auth_admin
def get_all_pending():
    query = VwCitaModel.get_appointment_pending()
    result = cita_bien_schemas.dump(query)
    return make_response(jsonify({'data': result}), 200)  # FIN | Get All Users *************


# INI | Get All Users ***********************************************************************
@cita_bien_api.route('/assigned', methods=['GET'])
@Auth.auth_admin
def get_all_assigned():
    query = VwCitaModel.get_appointment_assigned()
    result = cita_bien_schemas.dump(query)
    return make_response(jsonify({'data': result}), 200)  # FIN | Get All Users *************


# INI | Get All Users ***********************************************************************
@cita_bien_api.route('/completed', methods=['GET'])
@Auth.auth_admin
def get_all_completed():
    query = VwCitaModel.get_appointment_completed()
    result = cita_bien_schemas.dump(query)
    return make_response(jsonify({'data': result}), 200)  # FIN | Get All Users *************


# INI | New User ****************************************************************************
@cita_bien_api.route('/', methods=['POST'])
@AuthE.auth_required
def nuevoCita():
    req_data = request.get_json(force=True)
    errors = cita_bien_schema.validate(req_data)

    if errors:
        return errors, 400

    data = cita_bien_schema.load(req_data)

    user = TblCitaModel(data)
    user.save()

    return custom_response({'msg': 'Nuevo Cita', 'code': 201}, 201)  # FIN | New User ********************


# INI | Asignar Gestor
@cita_bien_api.route('/<int:id_cita>/assign', methods=['PUT'])
@Auth.auth_admin
def actualizarCita(id_cita):
    req_data = request.get_json()
    quote = TblCitaModel.get_one_cita(id_cita)
    if quote:
        quote.id_empleado = req_data['id_empleado']
        db.session.commit()
        return custom_response({"msg": "Cita asignada", 'code': 200}, 200)
    else:
        return custom_response({"msg": "Cita no existe", 'code': 304}, 304)


# INI | Asignar Gestor
@cita_bien_api.route('/<int:id_cita>/date', methods=['PUT'])
@Auth.auth_required
def actualizarCitaF(id_cita):
    req_data = request.get_json()
    quote = TblCitaModel.get_one_cita(id_cita)
    if quote:
        quote.fecha_cita = req_data['fecha_cita']
        db.session.commit()
        return custom_response({"msg": "Cita Completada", 'code': 200}, 200)
    else:
        return custom_response({"msg": "Cita no existe", 'code': 304}, 304)


# INI | Asignar Gestor
@cita_bien_api.route('/<int:id_cita>/complete', methods=['PUT'])
@Auth.auth_admin
def actualizarCitaC(id_cita):
    req_data = request.get_json()
    quote = TblCitaModel.get_one_cita(id_cita)
    if quote:
        quote.realizado = req_data['realizado']
        db.session.commit()
        return custom_response({"msg": "Cita Completada", 'code': 200}, 200)
    else:
        return custom_response({"msg": "Cita no existe", 'code': 304}, 304)


# FIN | Asignar Gestor


def custom_response(res, status_code):
    """
    Custom Response Function
    """
    return Response(
        mimetype="application/json",
        response=json.dumps(res),
        status=status_code
    )
