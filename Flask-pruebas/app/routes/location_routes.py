from flask import Blueprint, request, jsonify, redirect, url_for
from app.controllers.location_controller import get_all_locations, add_location, get_location_by_id, update_location, delete_location

location_bp = Blueprint('location_bp', __name__)

# Ruta para listar todas las ubicaciones
@location_bp.route('/', methods=['GET'])
def index():
    locations = get_all_locations()
    return jsonify([location.serialize() for location in locations])  # Devuelve las ubicaciones en formato JSON

# Ruta para añadir una nueva ubicación
@location_bp.route('/add', methods=['POST'])
def add():
    if request.is_json:
        data = request.get_json()
        lt = data.get('lt')
        ln = data.get('ln')
        fecha = data.get('fecha')
        nombre = data.get('nombre')
        
        if not lt or not ln or not fecha or not nombre:
            return jsonify({"error": "Faltan datos"}), 400

        add_location(lt, ln, fecha, nombre)
        return jsonify({"message": "Ubicación añadida"}), 201
    else:
        return jsonify({"error": "La solicitud no es un JSON válido"}), 400

# Ruta para editar una ubicación existente
@location_bp.route('/edit/<int:id>', methods=['PUT'])
def edit(id):
    location = get_location_by_id(id)
    
    if not location:
        return jsonify({"error": "Ubicación no encontrada"}), 404

    if request.is_json:
        data = request.get_json()
        location.lt = data.get('lt', location.lt)
        location.ln = data.get('ln', location.ln)
        location.fecha = data.get('fecha', location.fecha)
        location.nombre = data.get('nombre', location.nombre)

        update_location(location)
        return jsonify({"message": "Ubicación actualizada"}), 200
    else:
        return jsonify({"error": "La solicitud no es un JSON válido"}), 400

# Ruta para eliminar una ubicación
@location_bp.route('/delete/<int:id>', methods=['DELETE'])
def delete(id):
    location = get_location_by_id(id)
    
    if not location:
        return jsonify({"error": "Ubicación no encontrada"}), 404

    delete_location(id)
    return jsonify({"message": "Ubicación eliminada"}), 200
