"""
@Author Jose Raudales
@Version 1.0.0
@Descripcion Modelo de Fotos
"""
import datetime

from marshmallow import fields, Schema
from marshmallow.validate import Length
from .. import db, bcrypt
from .VehiculoModel import TblVehiculoModel, TblVehiculoSchema


# Model vehiculo
class TblFotoModel(db.Model):
    """
    Foto Model
    """

    # table name
    __tablename__ = 'tbl_foto_vehiculo'
    __table_args__ = {
        "schema": "sch_vehiculos"
    }

    # cambiar de acuerdo al diseño de la DB
    id_foto = db.Column(db.Integer, primary_key=True)
    nombre_foto = db.Column(db.String(50), nullable=False)

    # Relaciones
    id_vehiculo = db.Column(db.Integer, db.ForeignKey(TblVehiculoModel.id_vehiculo), nullable=True)

    # class constructor
    def __init__(self, data):
        """
        Class constructor
        """
        self.nombre_foto = data.get('nombre_foto')
        self.id_vehiculo = data.get('id_vehiculo')

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
    def get_all_foto():
        return TblFotoModel.query.all()

    # traer uno por id.
    @staticmethod
    def get_foto_by_vehiculo(id_vehiculo):
        return TblFotoModel.query.filter_by(id_vehiculo=id_vehiculo)

    # traer uno por id.
    @staticmethod
    def get_foto_by_vehiculo_first(id_vehiculo):
        return TblFotoModel.query.filter_by(id_vehiculo=id_vehiculo).limit(1)


# Eschema vehiculo MAPEO
class TblFotoSchema(Schema):
    """
    Foto Schema
    """
    id_foto = fields.Int(dump_only=True)
    nombre_foto = fields.Str(required=True, validate=Length(min=1, max=50, error="Ingrese el nombre de la foto"))

    # Relaciones
    id_vehiculo = fields.Int(required=True)

    class Meta:
        strict = True
        # exclude = ['password']
