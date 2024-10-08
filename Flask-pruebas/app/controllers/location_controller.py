from app.models.location_model import Location
from app import db

# Obtener todas las ubicaciones
def get_all_locations():
    return Location.query.all()

# Añadir una nueva ubicación
def add_location(lt, ln, fecha, nombre):
    new_location = Location(lt=lt, ln=ln, fecha=fecha, nombre=nombre)
    db.session.add(new_location)
    db.session.commit()

# Obtener una ubicación por ID
def get_location_by_id(location_id):
    return Location.query.get(location_id)

# Actualizar una ubicación existente
def update_location(location):
    db.session.commit()  # Los cambios ya están en el objeto `location`, solo guardamos los cambios en la DB

# Eliminar una ubicación
def delete_location(location_id):
    location = Location.query.get(location_id)
    if location:
        db.session.delete(location)
        db.session.commit()
