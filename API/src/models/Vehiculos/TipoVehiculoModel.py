"""
@Author Jose Raudales
@Version 1.0.0
@Descripcion Modelo de TipoVehiculoes
"""
import datetime

from marshmallow import fields, Schema
from marshmallow.validate import Length
from .. import db, bcrypt


# Model tipo_vehiculo
class TblTipoVehiculoModel(db.Model):
    """
    TblTipoVehiculo Model
    """

    # table name
    __tablename__ = 'tbl_tipo_vehiculo'
    __table_args__ = {
        "schema": "sch_vehiculos"
    }

    # cambiar de acuerdo al diseño de la DB
    id_tipo_vehiculo = db.Column(db.Integer, primary_key=True)
    desc_tipo_vehiculo = db.Column(db.String(50), nullable=False)
    activo = db.Column(db.Boolean, default=True)

    # class constructor
    def __init__(self, data):
        """
        Class constructor
        """
        self.desc_tipo_vehiculo = data.get('desc_tipo_vehiculo')
        self.activo = data.get('activo')

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
    def get_all_tipo_vehiculo():
        return TblTipoVehiculoModel.query.all()

    # traer uno por id.
    @staticmethod
    def get_one_tipo_vehiculo(id_tipo_vehiculo):
        return TblTipoVehiculoModel.query.get(id_tipo_vehiculo)


# Eschema tipo_vehiculo MAPEO
class TblTipoVehiculoSchema(Schema):
    """
    tipo_vehiculo Schema
    """
    id_tipo_vehiculo = fields.Int(dump_only=True)
    desc_tipo_vehiculo = fields.Str(required=True,
                             validate=Length(min=1, max=50, error="Ingrese el desc del tipo de vehiculo"))
    activo = fields.Boolean(required=False)

    class Meta:
        strict = True
        # exclude = ['password']
