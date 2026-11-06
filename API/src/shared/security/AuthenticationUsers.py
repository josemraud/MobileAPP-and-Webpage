from functools import wraps

from flask import g, request

from ...models.Auth.UsuarioModel import TblUserModel
from .tokens import decode, json_error, user_token


class Auth():

    @staticmethod
    def generate_token(user_id):
        try:
            return user_token(user_id)
        except Exception:
            return json_error('Error no se pudo generar token')

    @staticmethod
    def decode_token(token):
        return decode(token)

    @staticmethod
    def auth_required(func):
        @wraps(func)
        def decorated_auth(*args, **kwargs):
            if 'api-token' not in request.headers:
                return json_error('No se puede validar token')
            token = request.headers.get('api-token')
            data = Auth.decode_token(token)
            if data['error']:
                return json_error(data['error'].get('message', 'Token invalido'))
            if data['data'].get('typ') != 'user':
                return json_error('Token invalido, consiga un nuevo token')
            user_id = data['data'].get('user_id')
            check_user = TblUserModel.get_by_username(user_id)
            if not check_user:
                return json_error('No existe un usuario con esas credenciales')
            if check_user.activo is False:
                return json_error('Tu usuario fue desactivado')
            if check_user.confirmado is False:
                return json_error('Confirma tu correo para acceder')
            g.user = {'id': user_id, 'typ': 'user'}
            return func(*args, **kwargs)

        return decorated_auth
