

import requests

BASE_URL = "http://127.0.0.1:8000/api/v1/marcas/"

# Test para GET: Obtener todas las marcas
def test_get_all_marcas() -> None:
    response = requests.get(BASE_URL, timeout=10)
    assert response.status_code == 200
    marcas = response.json()
    # Verificamos que algunas marcas conocidas están en la respuesta
    marca_nombres = [marca["marca_nombre"] for marca in marcas]
    assert "Toyota" in marca_nombres
    assert "Hyundai" in marca_nombres
    assert "Chevrolet" in marca_nombres

# Test para POST: Crear una nueva marca
def test_create_marca() -> None:
    payload = {
        "marca_nombre": "Subaru"
    }
    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
    response = requests.post(BASE_URL, json=payload, headers=headers, timeout=10)
    assert response.status_code == 201  # Verifica que el recurso se haya creado correctamente

    # Verificamos que la nueva marca se encuentra en la lista de marcas
    response_get = requests.get(BASE_URL, timeout=10)
    assert response_get.status_code == 200
    marcas = response_get.json()
    marca_nombres = [marca["marca_nombre"] for marca in marcas]
    assert "Subaru" in marca_nombres

# Test para PUT: Actualizar una marca existente
def test_update_marca() -> None:
    # Usamos el ID de una marca ya existente (en este caso, usaremos el ID 1, correspondiente a "Toyota")
    marca_id = 1
    payload = {
        "marca_nombre": "Toyota actualizado"
    }
    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
    response = requests.put(f"{BASE_URL}{marca_id}/", json=payload, headers=headers, timeout=10)
    assert response.status_code == 200  # Verifica que la marca haya sido actualizada correctamente

    # Verificamos que la marca fue actualizada correctamente
    response_get = requests.get(BASE_URL, timeout=10)
    assert response_get.status_code == 200
    marcas = response_get.json()
    marca_nombres = [marca["marca_nombre"] for marca in marcas]
    assert "Toyota actualizado" in marca_nombres

