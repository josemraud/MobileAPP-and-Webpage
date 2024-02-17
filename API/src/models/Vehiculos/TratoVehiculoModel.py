"""
@Author Jose Raudales
@Version 1.0.0
@Descripcion Modelo de Tratos
"""
import datetime

from marshmallow import fields, Schema
from marshmallow.validate import Length
from .. import db, bcrypt
from .CitaVehiculoModel import TblCitaModel


# Model pais
class TblTratoModel(db.Model):
    """
    Trato Model
    """

    # table name
    __tablename__ = 'tbl_trato_vehiculo'
    __table_args__ = {
        "schema": "sch_vehiculos"
    }

    # cambiar de acuerdo al diseño de la DB
    id_trato = db.Column(db.Integer, primary_key=True)
    fecha = db.Column(db.Date, default=datetime.datetime.now())

    # Relaciones
    id_cita = db.Column(db.Integer, db.ForeignKey(TblCitaModel.id_vehiculo), nullable=True)

    # class constructor
    def __init__(self, data):
        """
        Class constructor
        """
        self.fecha = data.get('fecha')
        self.id_trato = data.get('id_trato')
        self.id_cita = data.get('id_cita')

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
    def get_all_trato():
        return TblTratoModel.query.all()

    # traer uno por id.
    @staticmethod
    def get_one_trato(id_trato):
        return TblTratoModel.query.get(id_trato)


# Eschema pais MAPEO
class TblTratoSchema(Schema):
    """
    Trato Schema
    """
    id_trato = fields.Int(dump_only=True)
    fecha = fields.Str(required=False)

    # Relaciones
    id_cita = fields.Int(required=True)

    class Meta:
        strict = True
        # exclude = ['password']


class VwTratoModel(db.Model):
    """
    Trato Model
    """

    # table name
    __tablename__ = 'vw_tratos'
    __table_args__ = {
        "schema": "sch_vehiculos"
    }

    # cambiar de acuerdo al diseño de la DB
    id_trato = db.Column(db.Integer, primary_key=True)
    fecha = db.Column(db.Date, default=datetime.datetime.now())

    # Relaciones
    id_cita = db.Column(db.Integer, nullable=True)
    id_vehiculo = db.Column(db.Integer, nullable=True)
    desc_vehiculo = db.Column(db.String, nullable=True)
    id_comprador = db.Column(db.Integer, nullable=True)
    comprador = db.Column(db.String, nullable=True)
    id_vendedor = db.Column(db.Integer, nullable=True)
    vendedor = db.Column(db.String, nullable=True)
    id_empleado = db.Column(db.Integer, nullable=True)
    empleado = db.Column(db.String, nullable=False)

    # class constructor
    def __init__(self, data):
        """
        Class constructor
        """
        self.fecha = data.get('fecha')
        self.id_trato = data.get('id_trato')
        self.id_cita = data.get('id_cita')
        self.id_vehiculo = data.get('id_vehiculo')
        self.desc_vehiculo = data.get('desc_vehiculo')
        self.id_comprador = data.get('id_comprador')
        self.comprador = data.get('comprador')
        self.id_vendedor = data.get('id_vendedor')
        self.vendedor = data.get('vendedor')
        self.id_empleado = data.get('id_empleado')
        self.empleado = data.get('empleado')

    @staticmethod
    # traer todos
    def get_all_trato():
        return VwTratoModel.query.all()

    # traer uno por id.
    @staticmethod
    def get_one_trato(id_trato):
        return VwTratoModel.query.get(id_trato)


# Eschema pais MAPEO
class VwTratoSchema(Schema):
    """
    Trato Schema
    """
    id_trato = fields.Int(dump_only=True)
    fecha = fields.Str(required=False)

    # Relaciones
    id_cita = fields.Int(required=True)
    id_vehiculo = fields.Int(required=True)
    desc_vehiculo = fields.Str(required=True)
    id_comprador = fields.Int(required=True)
    comprador = fields.Str(required=True)
    id_vendedor = fields.Int(required=True)
    vendedor = fields.Str(required=True)
    id_empleado = fields.Int(required=True)
    empleado = fields.Str(required=True)

    class Meta:
        strict = True
        # exclude = ['password']
