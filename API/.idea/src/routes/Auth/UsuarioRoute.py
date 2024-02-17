"""
@Author Jose Raudales
@Version 1.0.0
@Descripcion Rutas de usuario
"""
from datetime import datetime as ddd
import datetime

from dotenv import load_dotenv
from flask import json, Response, Blueprint, request, jsonify, make_response
import random
import string

from ...models import db
from ...models.Auth.UsuarioModel import TblUserModel, TblUserSchema, VwUserModel, VwUserSchema
from ...shared.security.AuthenticationUsers import Auth
from ...shared.security.AuthenticationEmpleados import Auth as Auth2
from ...models.Bienes.BienModel import TblBienModel, TblBienSchema
from ...models.Vehiculos.VehiculoModel import TblVehiculoModel, TblVehiculoSchema
user_api = Blueprint('user_api', __name__)
user_schema = TblUserSchema()
user_schemas = VwUserSchema(many=True)

load_dotenv()


# INI | Get All Users ***********************************************************************
@user_api.route('/', methods=['GET'])
@Auth2.auth_required
def get_all():
    query = VwUserModel.get_all_users()
    result = user_schemas.dump(query)
    return make_response(jsonify({'data': result}), 200)  # FIN | Get All Countries *************


# INI | Get All Users ***********************************************************************
@user_api.route('/<string:correo>', methods=['GET'])
def get_one(correo):
    query = VwUserModel.get_user_by_email(correo)
    result = user_schemas.dump(query)
    return make_response(jsonify({'data': result}), 200)  # FIN | Get All Countries *************


# INI | Get All Users ***********************************************************************
@user_api.route('/active', methods=['GET'])
def get_active():
    query = VwUserModel.get_active_users()
    result = user_schemas.dump(query)
    return make_response(jsonify({'data': result}), 200)  # FIN | Get All Countries *************


# INI | New User ****************************************************************************
@user_api.route('/', methods=['POST'])
def nuevoUsuario():
    """
    Crear un nuevo usuario
    """
    req_data = request.get_json(force=True)
    errors = user_schema.validate(req_data)
    d2 = datetime.datetime.now()
    d1 = req_data['fecha_nacimiento']
    datetime_object = ddd.strptime(d1, '%Y-%m-%d')
    print(d2)
    print(datetime_object)
    if abs((d2 - datetime_object).days) < 6570:
        return custom_response({'msg': 'Debes ser mayor de 18 años', 'code': 400}, 400)
    if TblUserModel.get_user_by_email(req_data['correo']):
        return custom_response({'msg': 'El correo ya existe', 'code': 400}, 400)
    if errors:
        print(errors)
        return errors, 400

    data = user_schema.load(req_data)

    user = TblUserModel(data)
    user.save()

    return custom_response({'msg': 'Nuevo usuario', 'code': 201, 'id_usuario': user.id_usuario}, 201)


# INI | Actualizar Usuario
@user_api.route('/<int:id_usuario>/confirmed', methods=['PUT'])
def confirmarUsuario(id_usuario):
    quote = TblUserModel.get_one_user(id_usuario)
    if quote:
        quote.confirmado = True
        quote.fecha_modificacion = datetime.datetime.now()
        db.session.commit()
        return custom_response({"msg": "Usuario actualizado", 'code': 200}, 200)
    else:
        return custom_response({"msg": "Usuario no existe", 'code': 304}, 304)


# INI | Actualziar Usuario
@user_api.route('/<int:id_usuario>', methods=['PUT'])
@Auth.auth_required
def actualizarUsuario(id_usuario):
    req_data = request.get_json()
    quote = TblUserModel.get_one_user(id_usuario)
    if quote:
        quote.nombre = req_data['nombre']
        quote.apellido = req_data['apellido']
        quote.telefono = req_data['telefono']
        quote.id_pais = req_data['id_pais']
        quote.fecha_modificacion = datetime.datetime.now()
        db.session.commit()
        return custom_response({"msg": "Usuario actualizado", 'code': 200}, 200)
    else:
        return custom_response({"msg": "Usuario no existe", 'code': 304}, 304)


# INI | Actualziar Usuario
@user_api.route('/<int:id_usuario>/newpassword', methods=['PUT'])
@Auth.auth_required
def actualizarPassword(id_usuario):
    req_data = request.get_json()
    quote = TblUserModel.get_one_user(id_usuario)
    if not quote.check_hash(req_data.get('current_password')):
        return custom_response({'msg': 'La contraseña no coincide', 'code': 400, 'ok': False}, 400)
    if quote:
        quote.password = TblUserModel.generate_hash_new(req_data['new_password'])
        quote.fecha_modificacion = datetime.datetime.now()
        db.session.commit()
        return custom_response({"msg": "Contraseña actualizada", 'code': 200}, 200)
    else:
        return custom_response({"msg": "Usuario no existe", 'code': 304}, 304)


# INI | Actualziar Usuario
@user_api.route('/<string:correo>/restore', methods=['PUT'])
def generarPassword(correo):
    req_data = request.get_json()
    quote = TblUserModel.get_user_by_email(correo)
    if quote:
        characters = string.ascii_letters + string.digits + string.punctuation
        password = ''.join(random.choice(characters) for i in range(8))
        quote.password = TblUserModel.generate_hash_new(password)
        quote.fecha_modificacion = datetime.datetime.now()
        db.session.commit()
        return custom_response({"msg": 'Contraseña Random Generada', 'password': password, 'code': 200}, 200)
    else:
        return custom_response({"msg": "Usuario no existe", 'code': 304}, 304)


# Actualizar el estado [ACTIVO|INACTIVO] del Usuario
@user_api.route('/<string:id_usuario>/state', methods=['PUT'])
@Auth2.auth_required
def actualizaEstadoUsuario(id_usuario):
    req_data = request.get_json()
    quote = TblUserModel.get_one_user(id_usuario)
    if quote:
        quote.activo = req_data['activo']
        quote.fecha_modificacion = datetime.datetime.now()
        db.session.commit()
        return custom_response({"msg": "Usuario actualizado", 'code': 200}, 200)
    else:
        return custom_response({"msg": "Usuario no existe", 'code': 304}, 304)


# INI | Get All Users ***********************************************************************
@user_api.route('/<int:id_usuario>', methods=['DELETE'])
def delete_one(id_usuario):
    req_data = request.get_json()
    query = TblUserModel.get_one_user(id_usuario)
    if not query.check_hash(req_data['password']):
        return custom_response({'msg': 'Credenciales no válidas', 'code': 400, 'ok': False}, 400)
    if query:
        quoteB = TblBienModel.get_bien_user(id_usuario)
        for q in quoteB:
            if q:
                q.aprobado = req_data['aprobado']
                q.fecha_modificacion = datetime.datetime.now()
                db.session.commit()
        quoteV = TblVehiculoModel.get_vehiculo_user(id_usuario)
        for q in quoteV:
            if q:
                q.aprobado = req_data['aprobado']
                q.fecha_modificacion = datetime.datetime.now()
                db.session.commit()
        TblUserModel.delete(id_usuario)
        return make_response(jsonify({'msg': 'Usuario eliminado', 'code': 200}), 200)
    else:
        return custom_response({"msg": "Usuario no existe", 'code': 400}, 400)

        # FIN | Get All Countries *************


def custom_response(res, status_code):
    """
    Custom Response Function
    """
    return Response(
        mimetype="application/json",
        response=json.dumps(res),
        status=status_code
    )
