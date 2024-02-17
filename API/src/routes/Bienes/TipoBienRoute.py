"""
@Author Jose Raudales
@Version 1.0.0
@Descripcion Rutas de TipoBien
"""
from dotenv import load_dotenv
from flask import json, Response, Blueprint, request, jsonify, make_response
from sqlalchemy import text

from ...models import db
from ...models.Bienes.TipoBienModel import TblTipoBienModel, TblTipoBienSchema
from ...shared.security.AuthenticationEmpleados import Auth

tipo_bien_api = Blueprint('tipo_bien_api', __name__)
tipo_bien_schema = TblTipoBienSchema()
tipo_bien_schemas = TblTipoBienSchema(many=True)

load_dotenv()


# INI | Get All Users ***********************************************************************
@tipo_bien_api.route('/', methods=['GET'])
def get_all():
    query = TblTipoBienModel.get_all_tipo_bien()
    result = tipo_bien_schemas.dump(query)
    return make_response(jsonify({'data': result}), 200)  # FIN | Get All Users *************


# INI | Get All Users ***********************************************************************
@tipo_bien_api.route('/active', methods=['GET'])
def get_all_Active():
    query = TblTipoBienModel.get_all_tipo_bien_activos()
    result = tipo_bien_schemas.dump(query)
    return make_response(jsonify({'data': result}), 200)  # FIN | Get All Users *************


# INI | New User ****************************************************************************
@tipo_bien_api.route('/', methods=['POST'])
@Auth.auth_admin
def nuevoTipoBien():
    req_data = request.get_json(force=True)
    errors = tipo_bien_schema.validate(req_data)

    if errors:
        return errors, 400

    data = tipo_bien_schema.load(req_data)

    user = TblTipoBienModel(data)
    user.save()

    return custom_response({'msg': 'Nuevo TipoBien', 'code': 201}, 201)  # FIN | New User ********************


# INI | Actualziar TipoBien
@tipo_bien_api.route('/<int:id_tipo_bien>', methods=['PUT'])
@Auth.auth_admin
def actualizarTipoBien(id_tipo_bien):
    req_data = request.get_json()
    quote = TblTipoBienModel.get_one_tipo_bien(id_tipo_bien)
    if quote:
        quote.desc_tipo_bien = req_data['desc_tipo_bien']
        db.session.commit()
        return custom_response({"msg": "TipoBien actualizado", 'code': 200}, 200)
    else:
        return custom_response({"msg": "Tipo de Bien no existe", 'code': 304}, 304)


# Aqui arranca el metodo de actualizar el estado [ACTIVO|INACTIVO] del TipoBien
@tipo_bien_api.route('/<string:id_tipo_bien>/state', methods=['PUT'])
@Auth.auth_admin
def actualizaEstadoTipoBien(id_tipo_bien):
    req_data = request.get_json()
    quote = TblTipoBienModel.get_one_tipo_bien(id_tipo_bien)
    if quote:
        quote.activo = req_data['activo']
        db.session.commit()
        return custom_response({"msg": "TipoBien actualizado", 'code': 200}, 200)
    else:
        return custom_response({"msg": "Tipo de Bien no existe", 'code': 304}, 304)


# FIN | Actualzar Estado TipoBien


def custom_response(res, status_code):
    """
    Custom Response Function
    """
    return Response(
        mimetype="application/json",
        response=json.dumps(res),
        status=status_code
    )
