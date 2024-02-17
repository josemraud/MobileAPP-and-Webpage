"""
@Author Jose Raudales
@Version 1.0.0
@Descripcion Modelo de Citas
"""
import datetime

from marshmallow import fields, Schema
from marshmallow.validate import Length
from .. import db, bcrypt
from .BienModel import TblBienModel, TblBienSchema
from ..Auth.EmpleadosModel import TblEmpleadoModel, TblEmpleadoSchema
from ..Auth.UsuarioModel import TblUserModel, TblUserSchema


# Model pais
class TblCitaModel(db.Model):
    """
    Cita Model
    """

    # table name
    __tablename__ = 'tbl_cita_bien'
    __table_args__ = {
        "schema": "sch_bienes"
    }

    # cambiar de acuerdo al diseño de la DB
    id_cita = db.Column(db.Integer, primary_key=True)
    fecha_solicitud = db.Column(db.Date, default=datetime.datetime.now())
    fecha_cita = db.Column(db.Date, nullable=True)
    realizado = db.Column(db.String(20), default="Pendiente")

    # Relaciones
    id_bien = db.Column(db.Integer, db.ForeignKey(TblBienModel.id_bien), nullable=False)
    id_usuario = db.Column(db.Integer, nullable=False)
    id_empleado = db.Column(db.Integer, db.ForeignKey(TblEmpleadoModel.id_empleado), nullable=True)

    # class constructor
    def __init__(self, data):
        """
        Class constructor
        """
        self.id_cita = data.get('id_cita')
        self.fecha_solicitud = data.get('fecha_solicitud')
        self.fecha_cita = data.get('fecha_cita')
        self.realizado = data.get('realizado')
        self.id_bien = data.get('id_bien')
        self.id_empleado = data.get('id_empleado')
        self.id_usuario = data.get('id_usuario')

    #  INI | CRUD *******************************************
    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    #  FIN | CRUD *******************************************

    @staticmethod
    # traer todos
    def get_all_cita():
        return TblCitaModel.query.all()

    # traer uno por id.
    @staticmethod
    def get_one_cita(id_cita):
        return TblCitaModel.query.get(id_cita)


# Eschema pais MAPEO
class TblCitaSchema(Schema):
    """
    Cita Schema
    """
    id_cita = fields.Int(dump_only=True)
    fecha_solicitud = fields.Date(required=False)
    fecha_cita = fields.Date(required=False)
    realizado = fields.Str(required=False)

    # Relaciones
    id_empleado = fields.Int(required=False)
    id_usuario = fields.Int(required=True)
    id_bien = fields.Int(required=True)

    class Meta:
        strict = True
        # exclude = ['password']


# Model pais
class VwCitaModel(db.Model):
    """
    Cita Model
    """

    # table name
    __tablename__ = 'vw_citas_bienes'
    __table_args__ = {
        "schema": "sch_bienes"
    }

    # cambiar de acuerdo al diseño de la DB
    id_cita = db.Column(db.Integer, primary_key=True)
    fecha_solicitud = db.Column(db.Date, default=datetime.datetime.now())
    fecha_cita = db.Column(db.Date, nullable=True)
    realizado = db.Column(db.String, default="Pendiente")

    # Relaciones
    id_bien = db.Column(db.Integer, nullable=False)
    direccion = db.Column(db.String, nullable=False)
    id_usuario = db.Column(db.Integer, nullable=False)
    correo = db.Column(db.String, nullable=False)
    usuario = db.Column(db.String, nullable=False)
    id_empleado = db.Column(db.String, nullable=True)
    empleado = db.Column(db.String, nullable=False)

    # class constructor
    def __init__(self, data):
        """
        Class constructor
        """
        self.id_cita = data.get('id_cita')
        self.fecha_solicitud = data.get('fecha_solicitud')
        self.fecha_cita = data.get('fecha_cita')
        self.realizado = data.get('realizado')
        self.id_bien = data.get('id_bien')
        self.direccion = data.get('direccion')
        self.id_empleado = data.get('id_empleado')
        self.empleado = data.get('empleado')
        self.id_usuario = data.get('id_usuario')
        self.correo = data.get('correo')
        self.usuario = data.get('usuario')

    #  INI | CRUD *******************************************
    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    #  FIN | CRUD *******************************************

    @staticmethod
    # traer todos
    def get_all_cita():
        return VwCitaModel.query.all()

    # traer uno por id.
    @staticmethod
    def get_appointment_employee(id_empleado):
        return VwCitaModel.query.filter_by(id_empleado=id_empleado)

    # traer uno por id.
    @staticmethod
    def get_appointment_pending():
        return VwCitaModel.query.filter(VwCitaModel.realizado == "Pendiente", VwCitaModel.id_empleado == None)

    # traer uno por id.
    @staticmethod
    def get_appointment_assigned():
        return VwCitaModel.query.filter(VwCitaModel.realizado == "Pendiente", VwCitaModel.id_empleado != None)


    # traer uno por id.
    @staticmethod
    def get_appointment_completed():
        return VwCitaModel.query.filter(VwCitaModel.realizado == "Realizada")


# Eschema pais MAPEO
class VwCitaSchema(Schema):
    """
    Cita Schema
    """
    id_cita = fields.Int(dump_only=True)
    fecha_solicitud = fields.Date(required=False)
    fecha_cita = fields.Date(required=False)
    realizado = fields.Str(required=False)

    # Relaciones
    id_empleado = fields.Int(required=False)
    empleado = fields.Str(required=False)
    id_usuario = fields.Int(required=True)
    correo = fields.Str(required=False)
    usuario = fields.Str(required=False)
    id_bien = fields.Int(required=True)
    direccion = fields.Str(required=False)

    class Meta:
        strict = True
        # exclude = ['password']
