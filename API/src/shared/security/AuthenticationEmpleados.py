from functools import wraps

from flask import g, request

from ...models.Auth.EmpleadosModel import TblEmpleadoModel
from .tokens import decode, employee_token, json_error


class Auth():

    @staticmethod
    def generate_token(user_id, role_id=None):
        try:
            return employee_token(user_id, role_id)
        except Exception:
            return json_error('Error no se pudo generar token')

    @staticmethod
    def decode_token(token):
        return decode(token)

    @staticmethod
    def _employee_from_request():
        if 'api-token' not in request.headers:
            return None, json_error('No se puede validar token')
        token = request.headers.get('api-token')
        data = Auth.decode_token(token)
        if data['error']:
            return None, json_error(data['error'].get('message', 'Token invalido'))
        if data['data'].get('typ') != 'employee':
            return None, json_error('Token invalido, consiga un nuevo token')
        user_id = data['data'].get('user_id')
        check_user = TblEmpleadoModel.get_by_username(user_id)
        if not check_user:
            return None, json_error('No existe un usuario con esas credenciales')
        if check_user.activo is False:
            return None, json_error('Tu usuario fue desactivado')
        return check_user, None

    @staticmethod
    def auth_admin(func):
        @wraps(func)
        def decorated_auth(*args, **kwargs):
            check_user, error = Auth._employee_from_request()
            if error:
                return error
            if check_user.id_rol != 1:
                return json_error('No estas autorizado para realizar esta accion')
            g.user = {'id': check_user.correo, 'typ': 'employee', 'rol': check_user.id_rol}
            return func(*args, **kwargs)

        return decorated_auth

    @staticmethod
    def auth_required(func):
        @wraps(func)
        def decorated_auth(*args, **kwargs):
            check_user, error = Auth._employee_from_request()
            if error:
                return error
            g.user = {'id': check_user.correo, 'typ': 'employee', 'rol': check_user.id_rol}
            return func(*args, **kwargs)

        return decorated_auth
