"""
@Author Jose Raudales
@Version 1.0.0
@Descripcion Rutas de usuario
"""
from datetime import datetime as ddd
import datetime
import secrets

from dotenv import load_dotenv
from flask import json, Response, Blueprint, request, jsonify, make_response

from ...models import db
from ...models.Auth.EmpleadosModel import TblEmpleadoModel
from ...models.Auth.UsuarioModel import TblUserModel, TblUserSchema, VwUserModel, VwUserSchema
from ...shared.mailer import send_temporary_password
from ...shared.security.AuthenticationUsers import Auth
from ...shared.security.AuthenticationEmpleados import Auth as Auth2
from ...shared.security.session import identity
from ...shared.security.tokens import confirm_token, decode
from ...models.Bienes.BienModel import TblBienModel
from ...models.Vehiculos.VehiculoModel import TblVehiculoModel
user_api = Blueprint('user_api', __name__)
user_schema = TblUserSchema()
user_schemas = VwUserSchema(many=True)

load_dotenv()


# INI | Get All Users ***********************************************************************
@user_api.route('/', methods=['GET'])
@Auth2.auth_admin
def get_all():
    query = VwUserModel.get_all_users()
    result = user_schemas.dump(query)
    return make_response(jsonify({'data': result}), 200)  # FIN | Get All Countries *************


# INI | Get All Users ***********************************************************************
@user_api.route('/<string:correo>', methods=['GET'])
def get_one(correo):
    allowed, error = _can_read_user(correo)
    if error:
        return error
    if not allowed:
        return custom_response({'data': [], 'msg': 'No autorizado', 'code': 403}, 403)
    query = VwUserModel.get_user_by_email(correo)
    result = user_schemas.dump(query)
    return make_response(jsonify({'data': result}), 200)  # FIN | Get All Countries *************


# INI | Get All Users ***********************************************************************
@user_api.route('/active', methods=['GET'])
@Auth2.auth_admin
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
    if errors:
        return errors, 400
    d2 = datetime.datetime.now()
    d1 = req_data['fecha_nacimiento']
    datetime_object = ddd.strptime(d1, '%Y-%m-%d')
    if abs((d2 - datetime_object).days) < 6570:
        return custom_response({'msg': 'Debes ser mayor de 18 años', 'code': 400}, 400)
    if TblUserModel.get_user_by_email(req_data['correo']):
        return custom_response({'msg': 'El correo ya existe', 'code': 400}, 400)

    data = user_schema.load(req_data)
    data['confirmado'] = False
    data['activo'] = True

    user = TblUserModel(data)
    user.save()

    return custom_response({
        'msg': 'Nuevo usuario',
        'code': 201,
        'id_usuario': user.id_usuario,
        'confirm_token': confirm_token(user.id_usuario),
    }, 201)


# INI | Actualizar Usuario
@user_api.route('/confirm', methods=['PUT'])
def confirmarUsuario():
    req_data = request.get_json(force=True) or {}
    token = req_data.get('token')
    if not token:
        return custom_response({'msg': 'Token de confirmacion invalido', 'code': 400}, 400)
    data = decode(token)
    if data['error'] or data['data'].get('typ') != 'confirm':
        return custom_response({'msg': 'Token de confirmacion invalido', 'code': 400}, 400)
    try:
        id_usuario = int(data['data'].get('user_id'))
    except (TypeError, ValueError):
        return custom_response({'msg': 'Token de confirmacion invalido', 'code': 400}, 400)
    quote = TblUserModel.get_one_user(id_usuario)
    if quote:
        quote.confirmado = True
        quote.fecha_modificacion = datetime.datetime.now()
        db.session.commit()
        return custom_response({"msg": "Usuario actualizado", 'code': 200}, 200)
    return custom_response({"msg": "Usuario no existe", 'code': 404}, 404)


# INI | Actualziar Usuario
@user_api.route('/<int:id_usuario>', methods=['PUT'])
@Auth.auth_required
def actualizarUsuario(id_usuario):
    req_data = request.get_json()
    quote = TblUserModel.get_one_user(id_usuario)
    if quote and not _owns(quote):
        return custom_response({"msg": "No autorizado", 'code': 403}, 403)
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
    if not quote:
        return custom_response({"msg": "Usuario no existe", 'code': 404}, 404)
    if not _owns(quote):
        return custom_response({"msg": "No autorizado", 'code': 403}, 403)
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
    generic = {
        'msg': 'Si el correo existe, enviamos una contraseña temporal',
        'code': 200,
    }
    quote = TblUserModel.get_user_by_email(correo)
    if not quote:
        return custom_response(generic, 200)
    password = secrets.token_urlsafe(9)
    if not send_temporary_password(correo, password):
        return custom_response(generic, 200)
    quote.password = TblUserModel.generate_hash_new(password)
    quote.fecha_modificacion = datetime.datetime.now()
    db.session.commit()
    return custom_response(generic, 200)


# Actualizar el estado [ACTIVO|INACTIVO] del Usuario
@user_api.route('/<string:id_usuario>/state', methods=['PUT'])
@Auth2.auth_admin
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
@Auth.auth_required
def delete_one(id_usuario):
    req_data = request.get_json() or {}
    query = TblUserModel.get_one_user(id_usuario)
    if not query:
        return custom_response({"msg": "Usuario no existe", 'code': 404}, 404)
    if not _owns(query):
        return custom_response({"msg": "No autorizado", 'code': 403}, 403)
    if not query.check_hash(req_data.get('password')):
        return custom_response({'msg': 'Credenciales no válidas', 'code': 400, 'ok': False}, 400)
    if query:
        quoteB = TblBienModel.get_bien_user(id_usuario)
        for q in quoteB:
            if q:
                q.aprobado = 'Denegado'
                q.fecha_modificacion = datetime.datetime.now()
                db.session.commit()
        quoteV = TblVehiculoModel.get_vehiculo_user(id_usuario)
        for q in quoteV:
            if q:
                q.aprobado = 'Denegado'
                q.fecha_modificacion = datetime.datetime.now()
                db.session.commit()
        TblUserModel.delete(id_usuario)
        return make_response(jsonify({'msg': 'Usuario eliminado', 'code': 200}), 200)
    else:
        return custom_response({"msg": "Usuario no existe", 'code': 400}, 400)

        # FIN | Get All Countries *************


def _owns(account):
    from flask import g
    return account.correo == g.user.get('id')


def _can_read_user(correo):
    ident = identity()
    if not ident:
        return False, custom_response({'data': [], 'msg': 'No se puede validar token', 'code': 401}, 401)
    if ident.get('typ') == 'user':
        account = TblUserModel.get_by_username(ident.get('user_id'))
        if not account or account.activo is False or account.confirmado is False:
            return False, custom_response({'data': [], 'msg': 'No se puede validar token', 'code': 401}, 401)
        if (account.correo or '').lower() != (correo or '').lower():
            return False, custom_response({'data': [], 'msg': 'No autorizado', 'code': 403}, 403)
        return True, None
    if ident.get('typ') == 'employee':
        employee = TblEmpleadoModel.get_by_username(ident.get('user_id'))
        if not employee or employee.activo is False or employee.id_rol != 1:
            return False, custom_response({'data': [], 'msg': 'No autorizado', 'code': 403}, 403)
        return True, None
    return False, custom_response({'data': [], 'msg': 'No se puede validar token', 'code': 401}, 401)


def custom_response(res, status_code):
    """
    Custom Response Function
    """
    return Response(
        mimetype="application/json",
        response=json.dumps(res),
        status=status_code
    )
