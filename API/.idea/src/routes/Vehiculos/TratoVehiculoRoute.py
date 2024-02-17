"""
@Author Jose Raudales
@Version 1.0.0
@Descripcion Rutas de trato
"""
import datetime

from dotenv import load_dotenv
from flask import json, Response, Blueprint, request, jsonify, make_response
from sqlalchemy import text

from ...models import db
from ...models.Vehiculos.TratoVehiculoModel import TblTratoModel, TblTratoSchema, VwTratoModel, VwTratoSchema
from ...models.Vehiculos.VehiculoModel import TblVehiculoModel
from ...shared.security.AuthenticationEmpleados import Auth

trato_vehiculo_api = Blueprint('trato_vehiculo_api', __name__)
trato_vehiculo_schema = TblTratoSchema()
trato_vehiculo_schemas = VwTratoSchema(many=True)

load_dotenv()


# INI | Get All deals ***********************************************************************
@trato_vehiculo_api.route('/', methods=['GET'])
@Auth.auth_admin
def get_all():
    query = VwTratoModel.get_all_trato()
    result = trato_vehiculo_schemas.dump(query)
    return make_response(jsonify({'data': result}), 200)  # FIN | Get All Users *************


# INI | New deal ****************************************************************************
@trato_vehiculo_api.route('/', methods=['POST'])
@Auth.auth_admin
def nuevotrato():
    req_data = request.get_json(force=True)
    errors = trato_vehiculo_schema.validate(req_data)
    if errors:
        return errors, 400

    data = trato_vehiculo_schema.load(req_data)

    deal = TblTratoModel(data)
    deal.save()

    query = (VwTratoModel.get_one_trato(deal.id_trato))
    quote = TblVehiculoModel.get_one_vehiculo(query.id_vehiculo)
    if quote:
        quote.aprobado = "Vendido"
        quote.fecha_modificacion = datetime.datetime.now()
        quote.fecha_aprobacion = datetime.datetime.now()
        db.session.commit()
    return custom_response({'msg': 'Nuevo trato', 'code': 201}, 201)  # FIN | New deal ********************


def custom_response(res, status_code):
    """
    Custom Response Function
    """
    return Response(
        mimetype="application/json",
        response=json.dumps(res),
        status=status_code
    )
