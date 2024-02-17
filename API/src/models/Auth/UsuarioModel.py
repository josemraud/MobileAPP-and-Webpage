"""
@Author Jose Raudales
@Version 1.0.0
@Descripcion Modelo de usuario
"""
import datetime

from marshmallow import fields, Schema
from marshmallow.validate import Length
from .. import db, bcrypt
from ..Mantenimientos.PaisModel import TblPaisModel, TblPaisSchema


# Model User
class TblUserModel(db.Model):
    """
    TblUsaurio Model
    """

    # table name
    __tablename__ = 'tbl_usuarios'
    __table_args__ = {
        "schema": "sch_seguridad"
    }

    # cambiar de acuerdo al diseño de la DB
    id_usuario = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50), nullable=False)
    apellido = db.Column(db.String(50), nullable=True)
    correo = db.Column(db.String(50), nullable=True)
    telefono = db.Column(db.String(15), nullable=True)
    password = db.Column(db.String(15), nullable=True)
    confirmado = db.Column(db.Boolean, default=False)
    activo = db.Column(db.Boolean, default=True)
    fecha_creacion = db.Column(db.Date, default=datetime.datetime.now())
    fecha_modificacion = db.Column(db.Date, nullable=True)
    fecha_nacimiento = db.Column(db.Date, nullable=False)
    # Relaciones
    id_pais = db.Column(db.Integer, db.ForeignKey(TblPaisModel.id_pais), nullable=True)

    # class constructor
    def __init__(self, data):
        """
        Class constructor
        """
        self.nombre = data.get('nombre')
        self.apellido = data.get('apellido')
        self.correo = data.get('correo')
        self.telefono = data.get('telefono')
        self.confirmado = data.get('confirmado')
        self.id_pais = data.get('id_pais')
        self.password = self.__generate_hash(data.get('password'))
        self.fecha_creacion = data.get('fecha_creacion')
        self.fecha_modificacion = data.get('fecha_modificacion')
        self.fecha_nacimiento = data.get('fecha_nacimiento')
        self.activo = data.get('activo')

    #  INI | CRUD *******************************************
    def save(self):
        db.session.add(self)
        db.session.commit()

    # Encrypta la contraseña del usuario
    def update(self, data):
        for key, item in data.items():
            if key == 'password':  # add this new line
                self.password = self.__generate_hash(key)  # add this new line
            setattr(self, key, item)
        self.modified_at = datetime.datetime.now()
        db.session.commit()

    #  FIN | CRUD *******************************************
    @staticmethod
    def delete(id_usuario):
        db.session.query(TblUserModel).filter(TblUserModel.id_usuario == id_usuario).delete()
        db.session.commit()

    @staticmethod
    # traer todos
    def get_all_users():
        return TblUserModel.query.all()

    # traer uno por id.
    @staticmethod
    def get_one_user(id_usuario):
        return TblUserModel.query.get(id_usuario)

    @staticmethod
    def generate_hash_new(password):
        return bcrypt.generate_password_hash(password, rounds=10).decode("utf-8")

    @staticmethod
    def get_user_by_email(correo):
        return TblUserModel.query.filter_by(correo=correo).first()

    def __generate_hash(self, password):
        return bcrypt.generate_password_hash(password, rounds=10).decode("utf-8")

    def check_hash(self, password):
        return bcrypt.check_password_hash(self.password, password)

    def __repr(self):
        return '<id_usuario {}>'.format(self.id_usuario)

    @staticmethod
    def get_by_username(correo):
        return TblUserModel.query.filter_by(correo=correo).first()


# Eschema User MAPEO
class TblUserSchema(Schema):
    """
    User Schema
    """
    id_usuario = fields.Int(dump_only=True)
    nombre = fields.Str(required=False,
                        validate=Length(min=1, max=20, error="Es nesesario ingresar el nombre"))
    apellido = fields.Str(required=True, validate=Length(min=2, max=30, error="Es nesesario ingresar el apellido"))
    correo = fields.Str(required=False, validate=Length(min=2, max=30, error="Es nesesario ingresar el correo"))
    telefono = fields.Str(required=True,
                          validate=Length(min=2, max=30, error="Es nesesario ingresar el telefono"))
    password = fields.Str(required=True, exclude=True, error="Es nesesario ingresar la contraseña")
    fecha_creacion = fields.Date(required=False)
    fecha_nacimiento = fields.Date(required=True)
    fecha_modificacion = fields.Date(required=False)
    confirmado = fields.Boolean(required=False)
    activo = fields.Boolean(required=False)

    # Relaciones
    id_pais = fields.Int(required=True)

    class Meta:
        strict = True
        # exclude = ['password']


class VwUserModel(db.Model):
    """
    TblUsaurio Model
    """

    # table name
    __tablename__ = 'vw_usuarios'
    __table_args__ = {
        "schema": "sch_seguridad"
    }

    # cambiar de acuerdo al diseño de la DB
    id_usuario = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50), nullable=False)
    apellido = db.Column(db.String(50), nullable=True)
    correo = db.Column(db.String(50), nullable=True)
    telefono = db.Column(db.String(15), nullable=True)
    confirmado = db.Column(db.Boolean, default=False)
    activo = db.Column(db.Boolean, default=True)
    fecha_creacion = db.Column(db.Date, default=datetime.datetime.now())
    fecha_modificacion = db.Column(db.Date, nullable=True)
    fecha_nacimiento = db.Column(db.Date, nullable=False)
    # Relaciones
    id_pais = db.Column(db.Integer, nullable=True)
    nombre_pais = db.Column(db.String(50), nullable=False)

    # class constructor
    def __init__(self, data):
        """
        Class constructor
        """
        self.id_usuario = data.get('id_usuario')
        self.nombre = data.get('nombre')
        self.apellido = data.get('apellido')
        self.correo = data.get('correo')
        self.telefono = data.get('telefono')
        self.confirmado = data.get('confirmado')
        self.id_pais = data.get('id_pais')
        self.nombre_pais = data.get('nombre_pais')
        self.fecha_creacion = data.get('fecha_creacion')
        self.fecha_nacimiento = data.get('fecha_nacimiento')
        self.fecha_modificacion = data.get('fecha_modificacion')
        self.activo = data.get('activo')

    #  INI | CRUD *******************************************
    def save(self):
        db.session.add(self)
        db.session.commit()

    @staticmethod
    # traer todos
    def get_all_users():
        return VwUserModel.query.all()

    # traer uno por id.
    @staticmethod
    def get_one_user(id_usuario):
        return VwUserModel.query.get(id_usuario)

    @staticmethod
    def get_user_by_email(correo):
        return VwUserModel.query.filter_by(correo=correo)

    @staticmethod
    def get_by_username(correo):
        return VwUserModel.query.filter_by(correo=correo).first()

    @staticmethod
    def get_active_users():
        return VwUserModel.query.filter_by(activo=True)


# Eschema User MAPEO
class VwUserSchema(Schema):
    """
    User Schema
    """
    id_usuario = fields.Int(dump_only=True)
    nombre = fields.Str(required=True,
                        validate=Length(min=1, max=20, error="Es nesesario ingresar el nombre"))
    apellido = fields.Str(required=True, validate=Length(min=2, max=30, error="Es nesesario ingresar el apellido"))
    correo = fields.Str(required=False, validate=Length(min=2, max=30, error="Es nesesario ingresar el correo"))
    telefono = fields.Str(required=True,
                          validate=Length(min=2, max=30, error="Es nesesario ingresar el telefono"))
    fecha_creacion = fields.Date(required=False)
    fecha_nacimiento = fields.Date(required=True)
    fecha_modificacion = fields.Date(required=False)
    confirmado = fields.Boolean(required=False)
    activo = fields.Boolean(required=False)

    # Relaciones
    id_pais = fields.Int(required=True)
    nombre_pais = fields.Str(required=False,
                             validate=Length(min=1, max=20, error="Es nesesario ingresar el nombre del pais"))

    class Meta:
        strict = True
        # exclude = ['password']
