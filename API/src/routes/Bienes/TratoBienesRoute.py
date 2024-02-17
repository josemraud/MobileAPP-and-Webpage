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
from ...models.Bienes.BienModel import TblBienModel
from ...models.Bienes.TratoBienModel import TblTratoModel, TblTratoSchema, VwTratoBienModel,VwTratoBienSchema
from ...shared.security.AuthenticationEmpleados import Auth

trato_bien_api = Blueprint('trato_bien_api', __name__)
trato_bien_schema = TblTratoSchema()
trato_bien_schemas = VwTratoBienSchema(many=True)

load_dotenv()


# INI | Get All deals ***********************************************************************
@trato_bien_api.route('/', methods=['GET'])
@Auth.auth_admin
def get_all():
    query = VwTratoBienModel.get_all_trato()
    result = trato_bien_schemas.dump(query)
    return make_response(jsonify({'data': result}), 200)  # FIN | Get All Users *************


# INI | New deal ****************************************************************************
@trato_bien_api.route('/', methods=['POST'])
@Auth.auth_admin
def nuevotrato():
    req_data = request.get_json(force=True)
    errors = trato_bien_schema.validate(req_data)

    if errors:
        return errors, 400

    data = trato_bien_schema.load(req_data)

    deal = TblTratoModel(data)
    deal.save()

    query = (VwTratoBienModel.get_one_trato(deal.id_trato))
    quote = TblBienModel.get_one_bien(query.id_bien)
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
