"""
@Author Jose Raudales
@Version 1.0.0
@Descripcion Rutas de ciudad
"""
from dotenv import load_dotenv
from flask import json, Response, Blueprint, request, jsonify, make_response
from sqlalchemy import text, select

from ...models import db
from ...models.Mantenimientos.RegionModel import TblRegionModel
from ...models.Mantenimientos.CiudadModel import TblCiudadModel, TblCiudadSchema, VwCiudadModel, VwCiudadSchema
from ...shared.security.AuthenticationEmpleados import Auth

ciudad_api = Blueprint('ciudad_api', __name__)
ciudad_schema = TblCiudadSchema()
ciudad_schemas = VwCiudadSchema(many=True)

load_dotenv()


# INI | Get All Users ***********************************************************************
@ciudad_api.route('/', methods=['GET'])
def get_all():
    query = VwCiudadModel.get_all_ciudad_view()
    result = ciudad_schemas.dump(query)
    return make_response(jsonify({'data': result}), 200)  # FIN | Get All Countries *************


# INI | Get All Users ***********************************************************************
@ciudad_api.route('/<int:id_region_send>', methods=['GET'])
def get_all_by_country(id_region_send):
    query = VwCiudadModel.get_all_by_region_vw(id_region_send)
    result = ciudad_schemas.dump(query)
    return make_response(jsonify({'data': result}), 200)  # FIN | Get All Countries *************


# INI | New User ****************************************************************************
@ciudad_api.route('/', methods=['POST'])
@Auth.auth_admin
def nuevociudad():
    req_data = request.get_json(force=True)
    errors = ciudad_schema.validate(req_data)

    if errors:
        return errors, 400

    data = ciudad_schema.load(req_data)

    user = TblCiudadModel(data)
    user.save()

    return custom_response({'msg': 'Nuevo ciudad', 'code': 201}, 201)  # FIN | New User ********************


# INI | Actualizar ciudad
@ciudad_api.route('/<int:id_ciudad>', methods=['PUT'])
@Auth.auth_admin
def actualizarciudad(id_ciudad):
    req_data = request.get_json()
    quote = TblCiudadModel.get_one_ciudad(id_ciudad)
    if quote:
        quote.nombre_ciudad = req_data['nombre_ciudad']
        quote.id_region = req_data['id_region']
        db.session.commit()
        return custom_response({"msg": "Ciudad actualizado", 'code': 200}, 200)
    else:
        return custom_response({"msg": "Ciudad no existe", 'code': 304}, 304)


# Aqui arranca el metodo de actualizar el estado [ACTIVO|INACTIVO] del ciudad
@ciudad_api.route('/<string:id_ciudad>/state', methods=['PUT'])
@Auth.auth_admin
def actualizaEstadociudad(id_ciudad):
    req_data = request.get_json()
    quote = TblCiudadModel.get_one_ciudad(id_ciudad)
    if quote:
        quote.activo = req_data['activo']
        db.session.commit()
        return custom_response({"msg": "Ciudad actualizado", 'code': 200}, 200)
    else:
        return custom_response({"msg": "Ciudad no existe", 'code': 304}, 304)


# FIN | Actualizar Estado ciudad


def custom_response(res, status_code):
    """
    Custom Response Function
    """
    return Response(
        mimetype="application/json",
        response=json.dumps(res),
        status=status_code
    )
