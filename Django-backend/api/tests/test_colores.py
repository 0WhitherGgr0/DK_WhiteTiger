import requests

BASE_URL = "http://127.0.0.1:8000/api/v1/colores/"

# Test para GET: Obtener todos los colores
def test_get_all_colores() -> None:
    response = requests.get(BASE_URL, timeout=10)
    assert response.status_code == 200
    colores = response.json()
    # Verificamos que algunos colores conocidos están en la respuesta
    color_nombres = [color["color_nombre"] for color in colores]
    assert "Rojo" in color_nombres
    assert "Negro" in color_nombres
    assert "Azul" in color_nombres

# Test para POST: Crear un nuevo color
def test_create_color() -> None:
    payload = {
        "color_nombre": "Amarillo"
    }
    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
    response = requests.post(BASE_URL, json=payload, headers=headers, timeout=10)
    assert response.status_code == 201  # Verifica que el recurso se haya creado correctamente

    # Verificamos que el nuevo color se encuentra en la lista de colores
    response_get = requests.get(BASE_URL, timeout=10)
    assert response_get.status_code == 200
    colores = response_get.json()
    color_nombres = [color["color_nombre"] for color in colores]
    assert "Amarillo" in color_nombres

# Test para PUT: Actualizar un color existente
def test_update_color() -> None:
    # Usamos el ID de un color ya existente (en este caso, usaremos el ID 1, correspondiente a "Rojo")
    color_id = 1
    payload = {
        "color_nombre": "Rojo actualizado"
    }
    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
    response = requests.put(f"{BASE_URL}{color_id}/", json=payload, headers=headers, timeout=10)
    assert response.status_code == 200  # Verifica que el color haya sido actualizado correctamente

    # Verificamos que el color fue actualizado correctamente
    response_get = requests.get(BASE_URL, timeout=10)
    assert response_get.status_code == 200
    colores = response_get.json()
    color_nombres = [color["color_nombre"] for color in colores]
    assert "Rojo actualizado" in color_nombres
