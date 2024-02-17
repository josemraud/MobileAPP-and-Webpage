"""
@Author Jose Raudales
@Version 1.0.0
@Descripcion Rutas de region
"""
from dotenv import load_dotenv
from flask import json, Response, Blueprint, request, jsonify, make_response
from sqlalchemy import text, select

from ...models import db
from ...models.Mantenimientos.PaisModel import TblPaisModel
from ...models.Mantenimientos.RegionModel import TblRegionModel, TblRegionSchema, VwRegionModel, VwRegionSchema
from ...shared.security.AuthenticationEmpleados import Auth

region_api = Blueprint('region_api', __name__)
region_schema = TblRegionSchema()
region_schemas = VwRegionSchema(many=True)

load_dotenv()


# INI | Get All Users ***********************************************************************
@region_api.route('/', methods=['GET'])
def get_all():
    query = VwRegionModel.get_all_region_view()
    result = region_schemas.dump(query)
    return make_response(jsonify({'data': result}), 200)  # FIN | Get All Countries *************


# INI | Get All Users ***********************************************************************
@region_api.route('/<int:id_pais_send>', methods=['GET'])
def get_all_by_country(id_pais_send):
    query = VwRegionModel.get_all_by_country_vw(id_pais_send)
    result = region_schemas.dump(query)
    return make_response(jsonify({'data': result}), 200)  # FIN | Get All Countries *************


# INI | New User ****************************************************************************
@region_api.route('/', methods=['POST'])
@Auth.auth_admin
def nuevoregion():
    req_data = request.get_json(force=True)
    errors = region_schema.validate(req_data)

    if errors:
        return errors, 400

    data = region_schema.load(req_data)

    user = TblRegionModel(data)
    user.save()

    return custom_response({'msg': 'Nuevo region', 'code': 201}, 201)  # FIN | New User ********************


# INI | Actualziar region
@region_api.route('/<int:id_region>', methods=['PUT'])
@Auth.auth_admin
def actualizarregion(id_region):
    req_data = request.get_json()
    quote = TblRegionModel.get_one_region(id_region)
    if quote:
        quote.nombre_region = req_data['nombre_region']
        quote.id_pais = req_data['id_pais']
        db.session.commit()
        return custom_response({"msg": "Region actualizado", 'code': 200}, 200)
    else:
        return custom_response({"msg": "Region no existe", 'code': 304}, 304)


# Aqui arranca el metodo de actualizar el estado [ACTIVO|INACTIVO] del region
@region_api.route('/<string:id_region>/state', methods=['PUT'])
@Auth.auth_admin
def actualizaEstadoregion(id_region):
    req_data = request.get_json()
    quote = TblRegionModel.get_one_region(id_region)
    if quote:
        quote.activo = req_data['activo']
        db.session.commit()
        return custom_response({"msg": "Region actualizado", 'code': 200}, 200)
    else:
        return custom_response({"msg": "Region no existe", 'code': 304}, 304)


# FIN | Actualzar Estado region


def custom_response(res, status_code):
    """
    Custom Response Function
    """
    return Response(
        mimetype="application/json",
        response=json.dumps(res),
        status=status_code
    )
