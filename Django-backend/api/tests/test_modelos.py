import requests

def test_get_all_modelos() -> None:
    # Verificar que los modelos están disponibles
    response = requests.get("http://127.0.0.1:8000/api/v1/modelos/", timeout=10)
    assert response.status_code == 200
    modelos = response.json()
    
    # Comprobar que los modelos están listados correctamente
    modelo_nombres = [modelo["modelo_nombre"] for modelo in modelos]
    assert "Corolla" in modelo_nombres  # Comprobar que un modelo esté presente en la lista
    assert "Elantra" in modelo_nombres  # Otro modelo de ejemplo
    assert "Focus" in modelo_nombres  # Otro modelo de ejemplo

def test_create_modelo() -> None:
    # Crear un nuevo modelo
    payload = {
        "modelo_nombre": "Civic"  # Nuevo modelo a agregar
    }
    
    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
    
    # Hacemos el POST para crear el modelo
    response = requests.post("http://127.0.0.1:8000/api/v1/modelos/", json=payload, headers=headers, timeout=10)
    assert response.status_code == 201  # Aseguramos que el modelo se haya creado correctamente

    # Verificamos que el nuevo modelo se encuentra en la lista de modelos
    response_get = requests.get("http://127.0.0.1:8000/api/v1/modelos/", timeout=10)
    assert response_get.status_code == 200
    modelos = response_get.json()
    modelo_nombres = [modelo["modelo_nombre"] for modelo in modelos]
    assert "Civic" in modelo_nombres  # Verificamos que el modelo "Civic" esté presente


