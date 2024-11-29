import requests

def test_get_all_() -> None:
    response = requests.get("http://127.0.0.1:8000/api/v1/", timeout=10)
    assert response.status_code == 200

def test_get_all_vehiculos() -> None:
    response = requests.get("http://127.0.0.1:8000/api/v1/vehiculos/", timeout=10)
    assert response.status_code == 200

def test_get_an_PlacaVehiculo() -> None:
    response = requests.get("http://127.0.0.1:8000/api/v1/vehiculos/", timeout=10)
    vehiculos = response.json()  
    title_content = [vehiculo["vehiculo_placa"] for vehiculo in vehiculos] 
    assert 'ABC123' in title_content

def test_create_resource() -> None:
    payload = {
        "vehiculo_placa": "XYZ9876",
                "vehiculo_marca": {
            "marca_id": 5,
            "marca_nombre": "Chevrolet"
        },
        "vehiculo_estado": {
            "estado_id": 1,
            "estado_nombre": "Activo"
        },
        "vehiculo_estado_id": 1,
        "vehiculo_color_id": 5,
        "vehiculo_marca_id": 5,
        "vehiculo_soat": 654321,
        "vehiculo_año_fabri": 2022,
        "vehiculo_max_dist_dia": "350.00",
        "vehiculo_capacidad": "1800.00",
        "vehiculo_reg": "2023-08-15",
        "vehiculo_modelo": 1,
        "vehiculo_color": 3
    }
    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
    response = requests.post("http://127.0.0.1:8000/api/v1/vehiculos/", json=payload, headers=headers, timeout=10)
    assert response.status_code == 201