import pytest
from rest_framework.test import APIClient
from api.models import Estado, Marca, Modelo, Color, Vehiculo
from django.urls import reverse

@pytest.fixture
def estado_activo():
    return Estado.objects.create(estado_nombre="Activo")

@pytest.fixture
def marca_toyota():
    return Marca.objects.create(marca_nombre="Toyota")

@pytest.fixture
def modelo_corolla():
    return Modelo.objects.create(modelo_nombre="Corolla")

@pytest.fixture
def color_rojo():
    return Color.objects.create(color_nombre="Rojo")

@pytest.fixture
def vehiculo(estado_activo, marca_toyota, modelo_corolla, color_rojo):
    return Vehiculo.objects.create(
        vehiculo_placa="ABC123",
        vehiculo_soat=123456,
        vehiculo_marca=marca_toyota,
        vehiculo_modelo=modelo_corolla,
        vehiculo_color=color_rojo,
        vehiculo_año_fabri=2018,
        vehiculo_estado=estado_activo,
        vehiculo_max_dist_dia=400.00,
        vehiculo_capacidad=1500.00,
        vehiculo_reg="2024-01-15"
    )

@pytest.mark.django_db
def test_vehiculos_api(vehiculo):
    client = APIClient()

    # Realizamos la petición GET al endpoint de vehiculos
    url = reverse('vehiculo-list')  # Asumimos que el nombre del endpoint es 'vehiculo-list'
    response = client.get(url)

    # Verificamos que el código de estado sea 200 OK
    assert response.status_code == 200

    # Verificamos que el formato de la respuesta sea JSON
    assert response['Content-Type'] == 'application/json'

    # Verificamos que la respuesta contenga los campos correctos
    data = response.json()
    assert len(data) == 1  # Verificamos que se haya devuelto un solo vehículo

    # Verificamos que el vehículo tenga los campos correctos
    assert data[0]['vehiculo_placa'] == "ABC123"
    assert data[0]['vehiculo_marca']['marca_nombre'] == "Toyota"
    assert data[0]['vehiculo_estado']['estado_nombre'] == "Activo"
    assert data[0]['vehiculo_año_fabri'] == 2018
    assert data[0]['vehiculo_max_dist_dia'] == "400.00"
    assert data[0]['vehiculo_capacidad'] == "1500.00"
    assert data[0]['vehiculo_reg'] == "2024-01-15"
    assert data[0]['vehiculo_color']['color_nombre'] == "Rojo"

    # Verificamos que los IDs de marca, estado y color estén presentes y sean correctos
    assert data[0]['vehiculo_marca_id'] == marca_toyota.id
    assert data[0]['vehiculo_estado_id'] == estado_activo.id
    assert data[0]['vehiculo_color_id'] == color_rojo.id
