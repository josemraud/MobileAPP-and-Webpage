"""
@Author Jose Raudales
@Version 1.0.0
@Descripcion Rutas de Vehiculos
"""
import datetime

from dotenv import load_dotenv
from flask import json, Response, Blueprint, request, jsonify, make_response
from sqlalchemy import text

from ...models import db
from ...models.Vehiculos.VehiculoModel import TblVehiculoModel, TblVehiculoSchema, VwVehiculoModel, VwVehiculoSchema
from ...shared.security.AuthenticationUsers import Auth
from ...shared.security.AuthenticationEmpleados import Auth as Auth2

vehiculo_api = Blueprint('vehiculo_api', __name__)
vehiculo_schema = TblVehiculoSchema()
vehiculo_schemas = VwVehiculoSchema(many=True)

load_dotenv()


# INI | Get All Properties ***********************************************************************
@vehiculo_api.route('/', methods=['GET'])
def get_all():
    query = VwVehiculoModel.get_all_vehiculo()
    result = vehiculo_schemas.dump(query)
    return make_response(jsonify({'data': result}), 200)  # FIN | Get All Users *************


# INI | Get All Properties ***********************************************************************
@vehiculo_api.route('/approved', methods=['GET'])
def get_all_approved():
    query = VwVehiculoModel.get_all_vehiculo_approved("Aprobado")
    result = vehiculo_schemas.dump(query)
    return make_response(jsonify({'data': result}), 200)  # FIN | Get All Users *************


# INI | Get All Properties ***********************************************************************
@vehiculo_api.route('/denied', methods=['GET'])
def get_all_denied():
    query = VwVehiculoModel.get_all_vehiculo_approved("Denegado")
    result = vehiculo_schemas.dump(query)
    return make_response(jsonify({'data': result}), 200)  # FIN | Get All Users *************


# INI | Get All Properties ***********************************************************************
@vehiculo_api.route('/reviewing', methods=['GET'])
def get_all_review():
    query = VwVehiculoModel.get_all_vehiculo_approved("En Revision")
    result = vehiculo_schemas.dump(query)
    return make_response(jsonify({'data': result}), 200)  # FIN | Get All Users *************


# INI | Get All Properties ***********************************************************************
@vehiculo_api.route('/sold', methods=['GET'])
def get_all_sales():
    query = VwVehiculoModel.get_all_vehiculo_approved("Vendido")
    result = vehiculo_schemas.dump(query)
    return make_response(jsonify({'data': result}), 200)  # FIN | Get All Users *************


# INI | Get All Properties ***********************************************************************
@vehiculo_api.route('/new', methods=['GET'])
def get_all_new():
    query = VwVehiculoModel.get_by_objective("Nuevo")
    result = vehiculo_schemas.dump(query)
    return make_response(jsonify({'data': result}), 200)  # FIN | Get All Users *************


# INI | Get All Properties ***********************************************************************
@vehiculo_api.route('/used', methods=['GET'])
def get_all_used():
    query = VwVehiculoModel.get_by_objective("Usado")
    result = vehiculo_schemas.dump(query)
    return make_response(jsonify({'data': result}), 200)  # FIN | Get All Users *************


# INI | Get All Properties ***********************************************************************
@vehiculo_api.route('/seo', methods=['GET'])
def get_Seo():
    query = VwVehiculoModel.get_seo()
    result = vehiculo_schemas.dump(query)
    return make_response(jsonify({'data': result}), 200)  # FIN | Get All Users *************


# INI | Get All Properties ***********************************************************************
@vehiculo_api.route('/<int:id_vehiculo>', methods=['GET'])
def get_one(id_vehiculo):
    query = VwVehiculoModel.get_one_vehiculo(id_vehiculo)
    result = vehiculo_schemas.dump(query)
    return make_response(jsonify({'data': result}), 200)  # FIN | Get All Users *************


# INI | Get All Properties ***********************************************************************
@vehiculo_api.route('/bytype/<int:id_tipo_vehiculo>', methods=['GET'])
def get_by_type(id_tipo_vehiculo):
    query = VwVehiculoModel.get_by_type(id_tipo_vehiculo)
    result = vehiculo_schemas.dump(query)
    return make_response(jsonify({'data': result}), 200)  # FIN | Get All Users *************


# INI | Get All Properties ***********************************************************************
@vehiculo_api.route('/filters/new/city/<int:id_ciudad>/type/<int:id_tipo_vehiculo>/lowest/<string:precio_menor>/highest'
                    '/<string:precio_mayor>', methods=['GET'])
def get_by_filter(id_ciudad, id_tipo_vehiculo, precio_menor, precio_mayor):
    query = VwVehiculoModel.get_filters_new(id_ciudad, id_tipo_vehiculo, precio_menor, precio_mayor)
    result = vehiculo_schemas.dump(query)
    return make_response(jsonify({'data': result}), 200)  # FIN | Get All Users *************


# INI | Get All Properties ***********************************************************************
@vehiculo_api.route('/filters/used/city/<int:id_ciudad>/type/<int:id_tipo_vehiculo>/lowest/<string:precio_menor'
                    '>/highest/<string:precio_mayor>', methods=['GET'])
def get_by_filter_used(id_ciudad, id_tipo_vehiculo, precio_menor, precio_mayor):
    query = VwVehiculoModel.get_filters_used(id_ciudad, id_tipo_vehiculo, precio_menor, precio_mayor)
    result = vehiculo_schemas.dump(query)
    return make_response(jsonify({'data': result}), 200)  # FIN | Get All Users *************


# INI | New Property ****************************************************************************
@vehiculo_api.route('/', methods=['POST'])
@Auth.auth_required
def nuevovehiculo():
    req_data = request.get_json(force=True)
    errors = vehiculo_schema.validate(req_data)

    if errors:
        return errors, 400

    data = vehiculo_schema.load(req_data)

    propiedad = TblVehiculoModel(data)
    propiedad.save()

    return custom_response({'msg': 'Nuevo vehiculo', 'code': 201, 'id_vehiculo': propiedad.id_vehiculo}, 201)
    # FIN | New Property ********************


# INI | New Property ****************************************************************************
@vehiculo_api.route('/admin', methods=['POST'])
@Auth2.auth_required
def nuevovehiculoe():
    req_data = request.get_json(force=True)
    errors = vehiculo_schema.validate(req_data)

    if errors:
        return errors, 400

    data = vehiculo_schema.load(req_data)

    propiedad = TblVehiculoModel(data)
    propiedad.save()

    return custom_response({'msg': 'Nuevo vehiculo', 'code': 201, 'id_vehiculo': propiedad.id_vehiculo}, 201)
    # FIN | New Property ********************


# INI | Actualizar vehiculo
@vehiculo_api.route('/<int:id_vehiculo>/approve', methods=['PUT'])
@Auth2.auth_admin
def actualizarvehiculo(id_vehiculo):
    req_data = request.get_json()
    quote = TblVehiculoModel.get_one_vehiculo(id_vehiculo)
    if quote:
        quote.aprobado = req_data['aprobado']
        quote.fecha_modificacion = datetime.datetime.now()
        quote.fecha_aprobacion = datetime.datetime.now()
        db.session.commit()
        return custom_response({"msg": "vehiculo actualizado", 'code': 200}, 200)
    else:
        return custom_response({"msg": "vehiculo no existe", 'code': 304}, 304)


# INI | Actualizar vehiculo
@vehiculo_api.route('/<int:id_vehiculo>/seo', methods=['PUT'])
@Auth2.auth_required
def actualizarvehiculoseo(id_vehiculo):
    req_data = request.get_json()
    quote = TblVehiculoModel.get_one_vehiculo(id_vehiculo)
    if quote:
        quote.seo = req_data['seo']
        quote.fecha_modificacion = datetime.datetime.now()
        quote.fecha_aprobacion = datetime.datetime.now()
        db.session.commit()
        return custom_response({"msg": "vehiculo actualizado", 'code': 200}, 200)
    else:
        return custom_response({"msg": "vehiculo no existe", 'code': 304}, 304)


def custom_response(res, status_code):
    """
    Custom Response Function
    """
    return Response(
        mimetype="application/json",
        response=json.dumps(res),
        status=status_code
    )
