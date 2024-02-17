"""
@Author Jose Raudales
@Version 1.0.0
@Descripcion Rutas de Publicidad
"""
from dotenv import load_dotenv
from flask import json, Response, Blueprint, request, jsonify, make_response

from ...models import db
from ...models.Publicidad.PublicidadModel import TblPublicidadModel, TblPublicidadSchema
from ...shared.security.AuthenticationEmpleados import Auth

publicidad_api = Blueprint('publicidad_api', __name__)
publicidad_schema = TblPublicidadSchema()
publicidad_schemas = TblPublicidadSchema(many=True)

load_dotenv()


# INI | Get All Publicity ***********************************************************************
@publicidad_api.route('/', methods=['GET'])
@Auth.auth_admin
def get_all():
    query = TblPublicidadModel.get_all_publicidad()
    result = publicidad_schemas.dump(query)
    return make_response(jsonify({'data': result}), 200)  # FIN | Get All Publicity *************


# INI | Get All Publicity ***********************************************************************
@publicidad_api.route('/active/property', methods=['GET'])
def get_all_Activep():
    query = TblPublicidadModel.get_all_publicidad_activos_bien()
    result = publicidad_schemas.dump(query)
    return make_response(jsonify({'data': result}), 200)  # FIN | Get All Publicity *************


# INI | Get All Publicity ***********************************************************************
@publicidad_api.route('/active/vehicle', methods=['GET'])
def get_all_Active():
    query = TblPublicidadModel.get_all_publicidad_activos()
    result = publicidad_schemas.dump(query)
    return make_response(jsonify({'data': result}), 200)  # FIN | Get All Publicity *************


# INI | New User ****************************************************************************
@publicidad_api.route('/', methods=['POST'])
@Auth.auth_admin
def nuevoPublicidad():
    req_data = request.get_json(force=True)
    errors = publicidad_schema.validate(req_data)

    if errors:
        return errors, 400

    data = publicidad_schema.load(req_data)

    user = TblPublicidadModel(data)
    user.save()

    return custom_response({'msg': 'Nuevo Publicidad', 'code': 201}, 201)  # FIN | New User ********************


# INI | Actualziar Publicidad
@publicidad_api.route('/<int:id_publicidad>', methods=['PUT'])
@Auth.auth_admin
def actualizarPublicidad(id_publicidad):
    req_data = request.get_json()
    quote = TblPublicidadModel.get_one_publicidad(id_publicidad)
    if quote:
        quote.link = req_data['link']
        quote.empresa = req_data['empresa']
        quote.thumbnail = req_data['thumbnail']
        db.session.commit()
        return custom_response({"msg": "Publicidad actualizado", 'code': 200}, 200)
    else:
        return custom_response({"msg": "Publicidad no existe", 'code': 304}, 304)


# Aqui arranca el metodo de actualizar el estado [ACTIVO|INACTIVO] del Publicidad
@publicidad_api.route('/<string:id_publicidad>/state', methods=['PUT'])
@Auth.auth_admin
def actualizaEstadoPublicidad(id_publicidad):
    req_data = request.get_json()
    quote = TblPublicidadModel.get_one_publicidad(id_publicidad)
    if quote:
        quote.activo = req_data['activo']
        db.session.commit()
        return custom_response({"msg": "Publicidad actualizado", 'code': 200}, 200)
    else:
        return custom_response({"msg": "Publicidad no existe", 'code': 304}, 304)


# FIN | Actualzar Estado Publicidad


def custom_response(res, status_code):
    """
    Custom Response Function
    """
    return Response(
        mimetype="application/json",
        response=json.dumps(res),
        status=status_code
    )
