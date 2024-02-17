"""
@Author Jose Raudales
@Version 1.0.0
@Descripcion Rutas de TipoVehiculo
"""
from dotenv import load_dotenv
from flask import json, Response, Blueprint, request, jsonify, make_response
from sqlalchemy import text

from ...models import db
from ...models.Vehiculos.TipoVehiculoModel import TblTipoVehiculoModel, TblTipoVehiculoSchema
from ...shared.security.AuthenticationEmpleados import Auth

tipo_vehiculo_api = Blueprint('tipo_vehiculo_api', __name__)
tipo_vehiculo_schema = TblTipoVehiculoSchema()

load_dotenv()


# INI | Get All Users ***********************************************************************
@tipo_vehiculo_api.route('/', methods=['GET'])
def get_all():
    sql = text('SELECT id_tipo_vehiculo, desc_tipo_vehiculo, activo '
               'FROM sch_vehiculos.tbl_tipo_vehiculo ')
    result = db.engine.execute(sql)
    res_tipo_vehiculo = [dict(id_tipo_vehiculo=row[0], desc_tipo_vehiculo=row[1], activo=row[2])
                     for row in result.fetchall()]

    return make_response(jsonify({'data': res_tipo_vehiculo}), 200)  # FIN | Get All Users *************


# INI | New User ****************************************************************************
@tipo_vehiculo_api.route('/', methods=['POST'])
@Auth.auth_admin
def nuevoTipoVehiculo():
    req_data = request.get_json(force=True)
    errors = tipo_vehiculo_schema.validate(req_data)

    if errors:
        return errors, 400

    data = tipo_vehiculo_schema.load(req_data)

    user = TblTipoVehiculoModel(data)
    user.save()

    return custom_response({'msg': 'Nuevo TipoVehiculo', 'code': 201}, 201)  # FIN | New User ********************


# INI | Actualziar TipoVehiculo
@tipo_vehiculo_api.route('/<int:id_tipo_vehiculo>', methods=['PUT'])
@Auth.auth_admin
def actualizarTipoVehiculo(id_tipo_vehiculo):
    req_data = request.get_json()

    sqlUpdate = text("UPDATE sch_vehiculos.tbl_tipo_vehiculo "
                     "SET desc_tipo_vehiculo = :desc_tipo_vehiculo WHERE id_tipo_vehiculo = :id_tipo_vehiculo; ")
    result = db.engine.execute(sqlUpdate, desc_tipo_vehiculo=req_data['desc_tipo_vehiculo'],
                               id_tipo_vehiculo=id_tipo_vehiculo)

    return custom_response({"msg": "TipoVehiculo actualizado", 'code': 200}, 200)


# Aqui arranca el metodo de actualizar el estado [ACTIVO|INACTIVO] del TipoVehiculo
@tipo_vehiculo_api.route('/<string:id_tipo_vehiculo>/state', methods=['PUT'])
@Auth.auth_admin
def actualizaEstadoTipoVehiculo(id_tipo_vehiculo):
    req_data = request.get_json()
    idexist = TblTipoVehiculoModel.get_one_tipo_vehiculo(id_tipo_vehiculo)
    if idexist:
        if idexist.activo is True and req_data['activo'] is True:
            return custom_response({"msg": "El TipoVehiculo ya está activo", 'code': 304}, 304)

        elif idexist.activo is True and req_data['activo'] is not True:
            sqlUpdate = text("UPDATE sch_vehiculos.tbl_tipo_vehiculo "
                             "SET activo = :activo "

                             "WHERE id_tipo_vehiculo = :id_tipo_vehiculo; ")
            result = db.engine.execute(sqlUpdate, activo=req_data['activo'],
                                       id_tipo_vehiculo=id_tipo_vehiculo)
            return custom_response({"msg": "TipoVehiculo Degradado", 'code': 200}, 200)

        elif idexist.activo is not True and req_data['activo'] is True:
            sqlUpdate = text("UPDATE sch_vehiculos.tbl_tipo_vehiculo "
                             "SET activo = :activo "
                             "WHERE id_tipo_vehiculo = :id_tipo_vehiculo; ")
            result = db.engine.execute(sqlUpdate, activo=req_data['activo'],
                                       id_tipo_vehiculo=id_tipo_vehiculo)
            return custom_response({"msg": "TipoVehiculo Activo", 'code': 200}, 200)

        elif idexist.activo is not True and req_data['activo'] is not True:
            return custom_response({"msg": "El TipoVehiculo ya está inactivo", 'code': 304}, 304)
    else:
        message = 'El TipoVehiculo con identidad no existe'
        return custom_response(message, 400)


# FIN | Actualzar Estado TipoVehiculo


def custom_response(res, status_code):
    """
    Custom Response Function
    """
    return Response(
        mimetype="application/json",
        response=json.dumps(res),
        status=status_code
    )
