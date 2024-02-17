"""
@Author Jose Raudales
@Version 1.0.0
@Descripcion Modelo de Fotoes
"""
import datetime

from marshmallow import fields, Schema
from marshmallow.validate import Length
from .. import db, bcrypt
from .BienModel import TblBienModel, TblBienSchema


# Model bien
class TblFotoModel(db.Model):
    """
    Foto Model
    """

    # table name
    __tablename__ = 'tbl_foto_bien'
    __table_args__ = {
        "schema": "sch_bienes"
    }

    # cambiar de acuerdo al diseño de la DB
    id_foto = db.Column(db.Integer, primary_key=True)
    nombre_foto = db.Column(db.String(50), nullable=False)

    # Relaciones
    id_bien = db.Column(db.Integer, db.ForeignKey(TblBienModel.id_bien), nullable=True)

    # class constructor
    def __init__(self, data):
        """
        Class constructor
        """
        self.nombre_foto = data.get('nombre_foto')
        self.id_bien = data.get('id_bien')

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

    @staticmethod
    # traer todos de un bien
    def get_all_fotos_bien(id_bien):
        return TblFotoModel.query.filter_by(id_bien=id_bien)
    @staticmethod
    # traer todos de un bien
    def get_all_fotos_bien_first(id_bien):
        return TblFotoModel.query.filter_by(id_bien=id_bien).limit(1)


# Eschema bien MAPEO
class TblFotoSchema(Schema):
    """
    Foto Schema
    """
    id_foto = fields.Int(dump_only=True)
    nombre_foto = fields.Str(required=True, validate=Length(min=1, max=50, error="Ingrese el nombre de la foto"))

    # Relaciones
    id_bien = fields.Int(required=True)

    class Meta:
        strict = True
        # exclude = ['password']
