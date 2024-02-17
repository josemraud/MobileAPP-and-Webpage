"""
@Author Jose Raudales
@Version 1.0.0
@Descripcion Rutas de Bienes
"""
import datetime

from dotenv import load_dotenv
from flask import json, Response, Blueprint, request, jsonify, make_response
from sqlalchemy import text

from ...models import db
from ...models.Bienes.BienModel import TblBienModel, TblBienSchema, VwBienModel, VwBienSchema
from ...shared.security.AuthenticationUsers import Auth
from ...shared.security.AuthenticationEmpleados import Auth as Auth2

bien_api = Blueprint('bien_api', __name__)
bien_schema = TblBienSchema()
bien_schemas = VwBienSchema(many=True)

load_dotenv()


# INI | Get All Properties ***********************************************************************
@bien_api.route('/', methods=['GET'])
@Auth2.auth_required
def get_all():
    query = VwBienModel.get_all_bien()
    result = bien_schemas.dump(query)
    return make_response(jsonify({'data': result}), 200)  # FIN | Get All Users *************


# INI | Get All Properties ***********************************************************************
@bien_api.route('/approved', methods=['GET'])
def get_all_approved():
    query = VwBienModel.get_all_bien_approved("Aprobado")
    result = bien_schemas.dump(query)
    return make_response(jsonify({'data': result}), 200)  # FIN | Get All Users *************


# INI | Get All Properties ***********************************************************************
@bien_api.route('/reviewing', methods=['GET'])
def get_all_reviewign():
    query = VwBienModel.get_all_bien_approved("En Revision")
    result = bien_schemas.dump(query)
    return make_response(jsonify({'data': result}), 200)  # FIN | Get All Users *************


# INI | Get All Properties ***********************************************************************
@bien_api.route('/denied', methods=['GET'])
def get_all_denied():
    query = VwBienModel.get_all_bien_approved("Denegado")
    result = bien_schemas.dump(query)
    return make_response(jsonify({'data': result}), 200)  # FIN | Get All Users *************


# INI | Get All Properties ***********************************************************************
@bien_api.route('/sold', methods=['GET'])
def get_all_sales():
    query = VwBienModel.get_all_bien_approved("Vendido")
    result = bien_schemas.dump(query)
    return make_response(jsonify({'data': result}), 200)  # FIN | Get All Users *************


# INI | Get All Properties ***********************************************************************
@bien_api.route('/rental', methods=['GET'])
def get_all_rental():
    query = VwBienModel.get_by_objective("Renta")
    result = bien_schemas.dump(query)
    return make_response(jsonify({'data': result}), 200)  # FIN | Get All Users *************


# INI | Get All Properties ***********************************************************************
@bien_api.route('/sale', methods=['GET'])
def get_all_sale():
    query = VwBienModel.get_by_objective("Venta")
    result = bien_schemas.dump(query)
    return make_response(jsonify({'data': result}), 200)  # FIN | Get All Users *************


# INI | Get All Properties ***********************************************************************
@bien_api.route('/seo', methods=['GET'])
def get_all_seo():
    query = VwBienModel.get_seo()
    result = bien_schemas.dump(query)
    return make_response(jsonify({'data': result}), 200)  # FIN | Get All Users *************


# INI | Get All Properties ***********************************************************************
@bien_api.route('/<int:id_bien>', methods=['GET'])
def get_one(id_bien):
    query = VwBienModel.get_one_bien_vw(id_bien)
    result = bien_schemas.dump(query)
    return make_response(jsonify({'data': result}), 200)  # FIN | Get All Users *************


# INI | Get All Properties ***********************************************************************
@bien_api.route('/bytype/<int:id_tipo_bien>', methods=['GET'])
def get_by_type(id_tipo_bien):
    query = VwBienModel.get_by_type(id_tipo_bien)
    result = bien_schemas.dump(query)
    return make_response(jsonify({'data': result}), 200)  # FIN | Get All Users *************


# INI | Get All Properties ***********************************************************************
@bien_api.route('/filters/sale/city/<int:id_ciudad>/location/<string:location>/type/<int:id_tipo_bien>/lowest/<string'
                ':precio_menor>/highest/<string:precio_mayor>', methods=['GET'])
def get_by_filter(id_ciudad, id_tipo_bien, precio_menor, precio_mayor, location):
    query = VwBienModel.get_filters_sale(id_ciudad, id_tipo_bien, precio_menor, precio_mayor, location)
    result = bien_schemas.dump(query)
    return make_response(jsonify({'data': result}), 200)  # FIN | Get All Users *************


# INI | Get All Properties ***********************************************************************
@bien_api.route('/filters/rental/city/<int:id_ciudad>/location/<string:location>/type/<int:id_tipo_bien>/lowest'
                '/<string:precio_menor>/highest/<string:precio_mayor>', methods=['GET'])
def get_by_filterRent(id_ciudad, id_tipo_bien, precio_menor, precio_mayor, location):
    query = VwBienModel.get_filters_rental(id_ciudad, id_tipo_bien, precio_menor, precio_mayor, location)
    result = bien_schemas.dump(query)
    return make_response(jsonify({'data': result}), 200)  # FIN | Get All Users *************


# INI | New Property ****************************************************************************
@bien_api.route('/', methods=['POST'])
@Auth.auth_required
def nuevobien():
    req_data = request.get_json(force=True)
    errors = bien_schema.validate(req_data)

    if errors:
        return errors, 400

    data = bien_schema.load(req_data)

    propiedad = TblBienModel(data)
    propiedad.save()

    return custom_response({'msg': 'Nuevo bien', 'code': 201, 'id_bien': propiedad.id_bien}, 201)
    # FIN | New Property ********************


# INI | New Property ****************************************************************************
@bien_api.route('/admin', methods=['POST'])
@Auth2.auth_required
def nuevobiene():
    req_data = request.get_json(force=True)
    errors = bien_schema.validate(req_data)

    if errors:
        return errors, 400

    data = bien_schema.load(req_data)

    propiedad = TblBienModel(data)
    propiedad.save()

    return custom_response({'msg': 'Nuevo bien', 'code': 201, 'id_bien': propiedad.id_bien}, 201)
    # FIN | New Property ********************


# INI | Actualizar bien
@bien_api.route('/<int:id_bien>/approve', methods=['PUT'])
@Auth2.auth_required
def actualizarbien(id_bien):
    req_data = request.get_json()
    quote = TblBienModel.get_one_bien(id_bien)
    if quote:
        quote.aprobado = req_data['aprobado']
        quote.fecha_modificacion = datetime.datetime.now()
        quote.fecha_aprobacion = datetime.datetime.now()
        db.session.commit()
        return custom_response({"msg": "Bien actualizado", 'code': 200}, 200)
    else:
        return custom_response({"msg": "Bien no existe", 'code': 304}, 304)


# INI | Actualizar bien
@bien_api.route('/<int:id_bien>/seo', methods=['PUT'])
@Auth2.auth_required
def actualizarbienSEO(id_bien):
    req_data = request.get_json()
    quote = TblBienModel.get_one_bien(id_bien)
    if quote:
        quote.seo = req_data['seo']
        quote.fecha_modificacion = datetime.datetime.now()
        quote.fecha_aprobacion = datetime.datetime.now()
        db.session.commit()
        return custom_response({"msg": "Bien actualizado", 'code': 200}, 200)
    else:
        return custom_response({"msg": "Bien no existe", 'code': 304}, 304)


def custom_response(res, status_code):
    """
    Custom Response Function
    """
    return Response(
        mimetype="application/json",
        response=json.dumps(res),
        status=status_code
    )
