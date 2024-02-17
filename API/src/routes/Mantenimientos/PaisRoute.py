"""
@Author Jose Raudales
@Version 1.0.0
@Descripcion Rutas de Pais
"""
from dotenv import load_dotenv
from flask import json, Response, Blueprint, request, jsonify, make_response

from ...models import db
from ...models.Mantenimientos.PaisModel import TblPaisModel, TblPaisSchema
from ...shared.security.AuthenticationEmpleados import Auth

pais_api = Blueprint('pais_api', __name__)
pais_schema = TblPaisSchema()
pais_schemas = TblPaisSchema(many=True)

load_dotenv()


# INI | Get All Countries ***********************************************************************
@pais_api.route('/', methods=['GET'])
def get_all():
    query = TblPaisModel.get_all_pais()
    result = pais_schemas.dump(query)
    return make_response(jsonify({'data': result}), 200)  # FIN | Get All Countries *************


# INI | Get All Countries ***********************************************************************
@pais_api.route('/active', methods=['GET'])
def get_all_Active():
    query = TblPaisModel.get_all_pais_activos()
    result = pais_schemas.dump(query)
    return make_response(jsonify({'data': result}), 200)  # FIN | Get All Countries *************


# INI | New User ****************************************************************************
@pais_api.route('/', methods=['POST'])
@Auth.auth_admin
def nuevoPais():
    req_data = request.get_json(force=True)
    errors = pais_schema.validate(req_data)

    if errors:
        return errors, 400

    data = pais_schema.load(req_data)

    user = TblPaisModel(data)
    user.save()

    return custom_response({'msg': 'Nuevo Pais', 'code': 201}, 201)  # FIN | New User ********************


# INI | Actualziar Pais
@pais_api.route('/<int:id_pais>', methods=['PUT'])
@Auth.auth_admin
def actualizarPais(id_pais):
    req_data = request.get_json()
    quote = TblPaisModel.get_one_pais(id_pais)
    if quote:
        quote.nombre_pais = req_data['nombre_pais']
        db.session.commit()
        return custom_response({"msg": "Pais actualizado", 'code': 200}, 200)
    else:
        return custom_response({"msg": "Pais no existe", 'code': 304}, 304)


# Aqui arranca el metodo de actualizar el estado [ACTIVO|INACTIVO] del Pais
@pais_api.route('/<string:id_pais>/state', methods=['PUT'])
@Auth.auth_admin
def actualizaEstadoPais(id_pais):
    req_data = request.get_json()
    quote = TblPaisModel.get_one_pais(id_pais)
    if quote:
        quote.activo = req_data['activo']
        db.session.commit()
        return custom_response({"msg": "Pais actualizado", 'code': 200}, 200)
    else:
        return custom_response({"msg": "Pais no existe", 'code': 304}, 304)


# FIN | Actualzar Estado Pais


def custom_response(res, status_code):
    """
    Custom Response Function
    """
    return Response(
        mimetype="application/json",
        response=json.dumps(res),
        status=status_code
    )
