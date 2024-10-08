from app import db

class Location(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    lt = db.Column(db.Float, nullable=False)
    ln = db.Column(db.Float, nullable=False)
    fecha = db.Column(db.String(50), nullable=False)
    nombre = db.Column(db.String(100), nullable=False)

    def __init__(self, lt, ln, fecha, nombre):
        self.lt = lt
        self.ln = ln
        self.fecha = fecha
        self.nombre = nombre

    # Método para serializar los datos en formato JSON
    def serialize(self):
        return {
            'id': self.id,
            'lt': self.lt,
            'ln': self.ln,
            'fecha': self.fecha,
            'nombre': self.nombre
        }
