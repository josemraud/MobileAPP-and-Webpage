"""
@Author Jose Raudales
@Version 1.0.0
@Descripcion Modelo de empleado
"""
import datetime

from marshmallow import fields, Schema
from marshmallow.validate import Length
from .. import db, bcrypt
from ..Mantenimientos.PaisModel import TblPaisModel, TblPaisSchema
from ..Auth.RolModel import TblRolModel, TblRolSchema


# Model User
class TblEmpleadoModel(db.Model):
    """
    TblEmpleado Model
    """

    # table name
    __tablename__ = 'tbl_empleados'
    __table_args__ = {
        "schema": "sch_seguridad"
    }

    # cambiar de acuerdo al diseño de la DB
    id_empleado = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50), nullable=False)
    apellido = db.Column(db.String(50), nullable=True)
    correo = db.Column(db.String(50), nullable=True)
    password = db.Column(db.String(15), nullable=True)
    activo = db.Column(db.Boolean, default=True)
    fecha_creacion = db.Column(db.Date, default=datetime.datetime.now())
    fecha_modificacion = db.Column(db.Date, nullable=True)

    # Relaciones
    id_pais = db.Column(db.Integer, db.ForeignKey(TblPaisModel.id_pais), nullable=True)
    id_rol = db.Column(db.Integer, db.ForeignKey(TblRolModel.id_rol), nullable=True)

    # class constructor
    def __init__(self, data):
        """
        Class constructor
        """
        self.nombre = data.get('nombre')
        self.apellido = data.get('apellido')
        self.correo = data.get('correo')
        self.confirmado = data.get('confirmado')
        self.id_pais = data.get('id_pais')
        self.id_rol = data.get('id_rol')
        self.activo = data.get('activo')
        self.password = self.__generate_hash(data.get('password'))
        self.fecha_creacion = data.get('fecha_creacion')
        self.fecha_modificacion = data.get('fecha_modificacion')

    #  INI | CRUD *******************************************
    def save(self):
        db.session.add(self)
        db.session.commit()

    # Encrypta la contraseña del empleado
    def update(self, data):
        for key, item in data.items():
            if key == 'password':  # add this new line
                self.password = self.__generate_hash(key)  # add this new line
            setattr(self, key, item)
        self.fecha_modificacion = datetime.datetime.now()
        db.session.commit()

    #  FIN | CRUD *******************************************

    @staticmethod
    # traer todos
    def get_all_users():
        return TblEmpleadoModel.query.all()

    # traer uno por id.
    @staticmethod
    def get_one_user(id_empleado):
        return TblEmpleadoModel.query.get(id_empleado)
    @staticmethod
    def generate_hash_restore(password):
        return bcrypt.generate_password_hash(password, rounds=10).decode("utf-8")

    @staticmethod
    def get_user_by_email(correo):
        return TblEmpleadoModel.query.filter_by(correo=correo).first()

    def __generate_hash(self, password):
        return bcrypt.generate_password_hash(password, rounds=10).decode("utf-8")

    def check_hash(self, password):
        return bcrypt.check_password_hash(self.password, password)

    def __repr(self):
        return '<id_empleado {}>'.format(self.id_empleado)

    @staticmethod
    def get_by_username(correo):
        return TblEmpleadoModel.query.filter_by(correo=correo).first()


# Eschema User MAPEO
class TblEmpleadoSchema(Schema):
    """
    User Schema
    """
    id_empleado = fields.Int(dump_only=True)
    nombre = fields.Str(required=False,
                        validate=Length(min=1, max=20, error="Es nesesario ingresar el nombre"))
    apellido = fields.Str(required=True, validate=Length(min=2, max=30, error="Es nesesario ingresar el apellido"))
    correo = fields.Str(required=False, validate=Length(min=2, max=30, error="Es nesesario ingresar el correo"))
    password = fields.Str(required=True, exclude=True, error="Es nesesario ingresar la contraseña")
    activo = fields.Boolean(required=False)
    fecha_creacion = fields.Date(required=False)
    fecha_modificacion = fields.Date(required=False)

    # Relaciones
    id_pais = fields.Int(required=True)
    id_rol = fields.Int(required=True)

    class Meta:
        strict = True
        # exclude = ['password']


class VwEmpleadoModel(db.Model):
    """
    TblEmpleado Model
    """

    # table name
    __tablename__ = 'vw_empleados'
    __table_args__ = {
        "schema": "sch_seguridad"
    }

    # cambiar de acuerdo al diseño de la DB
    id_empleado = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50), nullable=False)
    apellido = db.Column(db.String(50), nullable=True)
    correo = db.Column(db.String(50), nullable=True)
    password = db.Column(db.String(15), nullable=True)
    activo = db.Column(db.Boolean, default=True)
    fecha_creacion = db.Column(db.Date, default=datetime.datetime.now())
    fecha_modificacion = db.Column(db.Date, nullable=True)

    # Relaciones
    id_pais = db.Column(db.Integer, nullable=True)
    nombre_pais = db.Column(db.String(50), nullable=False)
    id_rol = db.Column(db.Integer, nullable=True)
    desc_rol = db.Column(db.String(50), nullable=False)

    # class constructor
    def __init__(self, data):
        """
        Class constructor
        """
        self.nombre = data.get('nombre')
        self.apellido = data.get('apellido')
        self.correo = data.get('correo')
        self.confirmado = data.get('confirmado')
        self.id_pais = data.get('id_pais')
        self.nombre_pais = data.get('nombre_pais')
        self.desc_rol = data.get('desc_rol')
        self.id_rol = data.get('id_rol')
        self.activo = data.get('activo')
        self.password = self.__generate_hash(data.get('password'))
        self.fecha_creacion = data.get('fecha_creacion')
        self.fecha_modificacion = data.get('fecha_modificacion')

    @staticmethod
    # traer todos
    def get_all_users():
        return VwEmpleadoModel.query.all()

    # traer uno por id.
    @staticmethod
    def get_one_user(id_empleado):
        return VwEmpleadoModel.query.get(id_empleado)

    @staticmethod
    def get_active_users():
        return VwEmpleadoModel.query.filter_by(activo=True)

    @staticmethod
    def get_user_by_email(correo):
        return VwEmpleadoModel.query.filter_by(correo=correo).first()

    def __generate_hash(self, password):
        return bcrypt.generate_password_hash(password, rounds=10).decode("utf-8")

    def check_hash(self, password):
        return bcrypt.check_password_hash(self.password, password)

    def __repr(self):
        return '<id_empleado {}>'.format(self.id_empleado)

    @staticmethod
    def get_by_username(correo):
        return VwEmpleadoModel.query.filter_by(correo=correo).first()


class VwEmpleadoSchema(Schema):
    """
    User Schema
    """
    id_empleado = fields.Int(dump_only=True)
    nombre = fields.Str(required=False,
                        validate=Length(min=1, max=20, error="Es nesesario ingresar el nombre"))
    apellido = fields.Str(required=True, validate=Length(min=2, max=30, error="Es nesesario ingresar el apellido"))
    correo = fields.Str(required=False, validate=Length(min=2, max=30, error="Es nesesario ingresar el correo"))
    password = fields.Str(required=True, exclude=True, error="Es nesesario ingresar la contraseña")
    activo = fields.Boolean(required=False)
    fecha_creacion = fields.Date(required=False)
    fecha_modificacion = fields.Date(required=False)

    # Relaciones
    id_pais = fields.Int(required=True)
    id_rol = fields.Int(required=True)
    nombre_pais = fields.Str(required=False,
                             validate=Length(min=1, max=20, error="Es nesesario ingresar el nombre del pais"))
    desc_rol = fields.Str(required=False,
                          validate=Length(min=1, max=20, error="Es nesesario ingresar el nombre del rol"))

    class Meta:
        strict = True
        # exclude = ['password']
