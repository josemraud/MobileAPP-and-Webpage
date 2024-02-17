"""
@Author Jose Raudales
@Version 1.0.0
@Descripcion Modelo de Paises
"""
import datetime

from marshmallow import fields, Schema
from marshmallow.validate import Length
from .. import db, bcrypt


# Model pais
class TblPaisModel(db.Model):
    """
    TblPais Model
    """

    # table name
    __tablename__ = 'tbl_pais'
    __table_args__ = {
        "schema": "sch_mantenimientos"
    }

    # cambiar de acuerdo al diseño de la DB
    id_pais = db.Column(db.Integer, primary_key=True)
    nombre_pais = db.Column(db.String(50), nullable=False)
    activo = db.Column(db.Boolean, default=True)

    # class constructor
    def __init__(self, data):
        """
        Class constructor
        """
        self.nombre_pais = data.get('nombre_pais')
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
    def get_all_pais():
        return TblPaisModel.query.all()

    @staticmethod
    # traer todos
    def get_all_pais_activos():
        return TblPaisModel.query.filter_by(activo=True)

    # traer uno por id.
    @staticmethod
    def get_one_pais(id_pais):
        return TblPaisModel.query.filter_by(id_pais=id_pais).first()


# Eschema pais MAPEO
class TblPaisSchema(Schema):
    """
    pais Schema
    """
    id_pais = fields.Int(dump_only=True)
    nombre_pais = fields.Str(required=True,
                             validate=Length(min=1, max=50, error="Ingrese el nombre del país"))
    activo = fields.Boolean(required=False)

    class Meta:
        strict = True
        # exclude = ['password']
