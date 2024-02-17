"""
@Author Jose Raudales
@Version 1.0.0
@Descripcion Modelo de Regiones
"""
import datetime

from marshmallow import fields, Schema
from marshmallow.validate import Length
from .. import db, bcrypt
from .PaisModel import TblPaisModel, TblPaisSchema


# Model pais
class TblRegionModel(db.Model):
    """
    Region Model
    """

    # table name
    __tablename__ = 'tbl_region'
    __table_args__ = {
        "schema": "sch_mantenimientos"
    }

    # cambiar de acuerdo al diseño de la DB
    id_region = db.Column(db.Integer, primary_key=True)
    nombre_region = db.Column(db.String(50), nullable=False)
    activo = db.Column(db.Boolean, default=True)

    # Relaciones
    id_pais = db.Column(db.Integer, db.ForeignKey(TblPaisModel.id_pais), nullable=True)

    # class constructor
    def __init__(self, data):
        """
        Class constructor
        """
        self.nombre_region = data.get('nombre_region')
        self.activo = data.get('activo')
        self.id_pais = data.get('id_pais')

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
    def get_all_region():
        return TblRegionModel.query.all()

    # traer uno por id.
    @staticmethod
    def get_one_region(id_region):
        return TblRegionModel.query.get(id_region)


class VwRegionModel(db.Model):
    """
    Region Model
    """

    # table name
    __tablename__ = 'vw_region'
    __table_args__ = {
        "schema": "sch_mantenimientos"
    }

    # cambiar de acuerdo al diseño de la DB
    id_region = db.Column(db.Integer, primary_key=True)
    nombre_region = db.Column(db.String(50), nullable=False)
    activo = db.Column(db.Boolean, default=True)
    id_pais = db.Column(db.Integer, nullable=False)
    nombre_pais = db.Column(db.String(50), nullable=False)

    # class constructor
    def __init__(self, data):
        """
        Class constructor
        """
        self.id_region = data.get('id_region')
        self.nombre_region = data.get('nombre_region')
        self.activo = data.get('activo')
        self.id_pais = data.get('id_pais')
        self.nombre_pais = data.get('nombre_pais')

    @staticmethod
    # traer todos
    def get_all_region_view():
        return VwRegionModel.query.all()

    @staticmethod
    # traer todos
    def get_all_by_country_vw(id_pais):
        return VwRegionModel.query.filter_by(activo=True, id_pais=id_pais)



# Eschema pais MAPEO
class TblRegionSchema(Schema):
    """
    Region Schema
    """
    id_region = fields.Int(dump_only=True)
    nombre_region = fields.Str(required=True,
                               validate=Length(min=1, max=50, error="Ingrese el nombre de la region"))
    activo = fields.Boolean(required=False)

    # Relaciones
    id_pais = fields.Int(required=True)

    class Meta:
        strict = True
        # exclude = ['password']


class VwRegionSchema(Schema):
    """
    Region Schema
    """
    id_region = fields.Int(dump_only=True)
    nombre_region = fields.Str(required=True,
                               validate=Length(min=1, max=50, error="Ingrese el nombre de la region"))
    nombre_pais = fields.Str(required=True,
                               validate=Length(min=1, max=50, error="Ingrese el nombre del pais"))
    activo = fields.Boolean(required=False)

    # Relaciones
    id_pais = fields.Int(required=True)

    class Meta:
        strict = True
        # exclude = ['password']
