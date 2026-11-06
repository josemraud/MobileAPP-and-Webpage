from functools import wraps

from flask import g, request

from ...models.Auth.EmpleadosModel import TblEmpleadoModel
from ...models.Auth.UsuarioModel import TblUserModel
from .tokens import decode, json_error


def identity():
    token = request.headers.get('api-token')
    if not token:
        return None
    data = decode(token)
    if data.get('error') or not data.get('data', {}).get('user_id'):
        return None
    return data['data']


def _account_for(ident):
    if not ident:
        return None
    if ident.get('typ') == 'user':
        account = TblUserModel.get_by_username(ident.get('user_id'))
        if not account or account.activo is False or account.confirmado is False:
            return None
        return account
    if ident.get('typ') == 'employee':
        account = TblEmpleadoModel.get_by_username(ident.get('user_id'))
        if not account or account.activo is False:
            return None
        return account
    return None


def session_required(func):
    @wraps(func)
    def decorated(*args, **kwargs):
        ident = identity()
        account = _account_for(ident)
        if not account:
            return json_error('No se puede validar token')
        g.user = {
            'id': ident.get('user_id'),
            'typ': ident.get('typ'),
            'rol': ident.get('rol'),
        }
        return func(*args, **kwargs)

    return decorated


def is_active_employee():
    ident = identity()
    if not ident or ident.get('typ') != 'employee':
        return False
    account = TblEmpleadoModel.get_by_username(ident.get('user_id'))
    return bool(account and account.activo)
