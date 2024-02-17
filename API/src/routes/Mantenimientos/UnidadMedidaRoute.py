"""
@Author Jose Raudales
@Version 1.0.0
@Descripcion Rutas de Unidad de Medida
"""
from dotenv import load_dotenv
from flask import json, Response, Blueprint, request, jsonify, make_response

from ...models import db
from ...models.Mantenimientos.UnidadMedidaModel import TblUnidadMedidaModel, TblUnidadMedidaSchema
from ...shared.security.AuthenticationEmpleados import Auth

unidad_medida_api = Blueprint('unidad_medida_api', __name__)
unidad_medida_schema = TblUnidadMedidaSchema()
unidad_medida_schemas = TblUnidadMedidaSchema(many=True)

load_dotenv()


# INI | Get All Countries ***********************************************************************
@unidad_medida_api.route('/', methods=['GET'])
@Auth.auth_admin
def get_all():
    query = TblUnidadMedidaModel.get_all_unidad_medida()
    result = unidad_medida_schemas.dump(query)
    return make_response(jsonify({'data': result}), 200)  # FIN | Get All Countries *************


# INI | Get All Countries ***********************************************************************
@unidad_medida_api.route('/active', methods=['GET'])
def get_all_Active():
    query = TblUnidadMedidaModel.get_all_unidad_medida_activos()
    result = unidad_medida_schemas.dump(query)
    return make_response(jsonify({'data': result}), 200)  # FIN | Get All Countries *************


# INI | New User ****************************************************************************
@unidad_medida_api.route('/', methods=['POST'])
@Auth.auth_admin
def nuevounidad_medida():
    req_data = request.get_json(force=True)
    errors = unidad_medida_schema.validate(req_data)

    if errors:
        return errors, 400

    data = unidad_medida_schema.load(req_data)

    user = TblUnidadMedidaModel(data)
    user.save()

    return custom_response({'msg': 'Nuevo Unidad de medida', 'code': 201}, 201)  # FIN | New User ********************


# INI | Actualziar unidad_medida
@unidad_medida_api.route('/<int:id_unidad_medida>', methods=['PUT'])
@Auth.auth_admin
def actualizarunidad_medida(id_unidad_medida):
    req_data = request.get_json()
    quote = TblUnidadMedidaModel.get_one_unidad_medida(id_unidad_medida)
    if quote:
        quote.desc_unidad_medida = req_data['desc_unidad_medida']
        db.session.commit()
        return custom_response({"msg": "unidad_medida actualizado", 'code': 200}, 200)
    else:
        return custom_response({"msg": "unidad_medida no existe", 'code': 304}, 304)


# Aqui arranca el metodo de actualizar el estado [ACTIVO|INACTIVO] del unidad_medida
@unidad_medida_api.route('/<string:id_unidad_medida>/state', methods=['PUT'])
@Auth.auth_admin
def actualizaEstadounidad_medida(id_unidad_medida):
    req_data = request.get_json()
    quote = TblUnidadMedidaModel.get_one_unidad_medida(id_unidad_medida)
    if quote:
        quote.activo = req_data['activo']
        db.session.commit()
        return custom_response({"msg": "unidad_medida actualizado", 'code': 200}, 200)
    else:
        return custom_response({"msg": "unidad_medida no existe", 'code': 304}, 304)


# FIN | Actualzar Estado unidad_medida


def custom_response(res, status_code):
    """
    Custom Response Function
    """
    return Response(
        mimetype="application/json",
        response=json.dumps(res),
        status=status_code
    )
