"""
@Author Jose Raudales
@Version 1.0.0
@Descripcion Rutas de foto
"""
from dotenv import load_dotenv
from flask import g, json, Response, Blueprint, request, jsonify, make_response

from ...models.Auth.UsuarioModel import TblUserModel
from ...models.Vehiculos.FotoVehiculoModel import TblFotoModel, TblFotoSchema
from ...models.Vehiculos.VehiculoModel import TblVehiculoModel
from ...shared.security.session import session_required

foto_vehiculo_api = Blueprint('foto_vehiculo_api', __name__)
foto_schema = TblFotoSchema()
foto_schemas = TblFotoSchema(many=True)

load_dotenv()


# INI | Get All Photos ***********************************************************************
@foto_vehiculo_api.route('/', methods=['GET'])
def get_all():
    query = TblFotoModel.get_all_foto()
    result = foto_schemas.dump(query)
    return make_response(jsonify({'data': result}), 200)  # FIN | Get All Users *************


# INI | Get All Photos ***********************************************************************
@foto_vehiculo_api.route('/<int:id_vehiculo_send>', methods=['GET'])
def get_all_by_country(id_vehiculo_send):
    query = TblFotoModel.get_foto_by_vehiculo(id_vehiculo_send)
    result = foto_schemas.dump(query)
    return make_response(jsonify({'data': result}), 200)  # FIN | Get All Users *************


# INI | Get All Photos ***********************************************************************
@foto_vehiculo_api.route('/<int:id_bien_send>/first', methods=['GET'])
def get_all_by_bien_first(id_bien_send):
    query = TblFotoModel.get_foto_by_vehiculo_first(id_bien_send)
    result = foto_schemas.dump(query)
    return make_response(jsonify({'data': result}), 200)  # FIN | Get All Users *************


# INI | New User ****************************************************************************
@foto_vehiculo_api.route('/', methods=['POST'])
@session_required
def nuevofoto():
    req_data = request.get_json(force=True)
    errors = foto_schema.validate(req_data)

    if errors:
        return errors, 400

    data = foto_schema.load(req_data)
    vehicle = TblVehiculoModel.get_one_vehiculo(data.get('id_vehiculo'))
    if not vehicle:
        return custom_response({'msg': 'Vehiculo no existe', 'code': 404}, 404)
    if g.user.get('typ') == 'user':
        owner = TblUserModel.get_by_username(g.user.get('id'))
        if not owner or vehicle.id_usuario != owner.id_usuario:
            return custom_response({'msg': 'No autorizado', 'code': 403}, 403)

    pics = TblFotoModel(data)
    pics.save()

    return custom_response({'msg': 'Nuevo foto', 'code': 201}, 201)  # FIN | New User *******


def custom_response(res, status_code):
    """
    Custom Response Function
    """
    return Response(
        mimetype="application/json",
        response=json.dumps(res),
        status=status_code
    )
