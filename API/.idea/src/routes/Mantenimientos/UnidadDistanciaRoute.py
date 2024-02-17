"""
@Author Jose Raudales
@Version 1.0.0
@Descripcion Rutas de Unidad de distancia
"""
from dotenv import load_dotenv
from flask import json, Response, Blueprint, request, jsonify, make_response

from ...models import db
from ...models.Mantenimientos.UnidadDistanciaModel import TblUnidaddistanciaModel, TblUnidaddistanciaSchema
from ...shared.security.AuthenticationEmpleados import Auth

unidad_distancia_api = Blueprint('unidad_distancia_api', __name__)
unidad_distancia_schema = TblUnidaddistanciaSchema()
unidad_distancia_schemas = TblUnidaddistanciaSchema(many=True)

load_dotenv()


# INI | Get All Countries ***********************************************************************
@unidad_distancia_api.route('/', methods=['GET'])
@Auth.auth_admin
def get_all():
    query = TblUnidaddistanciaModel.get_all_unidad_distancia()
    result = unidad_distancia_schemas.dump(query)
    return make_response(jsonify({'data': result}), 200)  # FIN | Get All Countries *************


# INI | Get All Countries ***********************************************************************
@unidad_distancia_api.route('/active', methods=['GET'])
def get_all_Active():
    query = TblUnidaddistanciaModel.get_all_unidad_distancia_activos()
    result = unidad_distancia_schemas.dump(query)
    return make_response(jsonify({'data': result}), 200)  # FIN | Get All Countries *************


# INI | New User ****************************************************************************
@unidad_distancia_api.route('/', methods=['POST'])
@Auth.auth_admin
def nuevounidad_distancia():
    req_data = request.get_json(force=True)
    errors = unidad_distancia_schema.validate(req_data)

    if errors:
        return errors, 400

    data = unidad_distancia_schema.load(req_data)

    user = TblUnidaddistanciaModel(data)
    user.save()

    return custom_response({'msg': 'Nuevo Unidad de distancia', 'code': 201}, 201)  # FIN | New User ********************


# INI | Actualziar unidad_distancia
@unidad_distancia_api.route('/<int:id_unidad_distancia>', methods=['PUT'])
@Auth.auth_admin
def actualizarunidad_distancia(id_unidad_distancia):
    req_data = request.get_json()
    quote = TblUnidaddistanciaModel.get_one_unidad_distancia(id_unidad_distancia)
    if quote:
        quote.desc_unidad_distancia = req_data['desc_unidad_distancia']
        db.session.commit()
        return custom_response({"msg": "unidad_distancia actualizado", 'code': 200}, 200)
    else:
        return custom_response({"msg": "unidad_distancia no existe", 'code': 304}, 304)


# Aqui arranca el metodo de actualizar el estado [ACTIVO|INACTIVO] del unidad_distancia
@unidad_distancia_api.route('/<string:id_unidad_distancia>/state', methods=['PUT'])
@Auth.auth_admin
def actualizaEstadounidad_distancia(id_unidad_distancia):
    req_data = request.get_json()
    quote = TblUnidaddistanciaModel.get_one_unidad_distancia(id_unidad_distancia)
    if quote:
        quote.activo = req_data['activo']
        db.session.commit()
        return custom_response({"msg": "unidad_distancia actualizado", 'code': 200}, 200)
    else:
        return custom_response({"msg": "unidad_distancia no existe", 'code': 304}, 304)


# FIN | Actualzar Estado unidad_distancia


def custom_response(res, status_code):
    """
    Custom Response Function
    """
    return Response(
        mimetype="application/json",
        response=json.dumps(res),
        status=status_code
    )
