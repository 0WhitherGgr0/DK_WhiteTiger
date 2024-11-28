import pytest
from rest_framework.test import APIClient
from api.models import Estado, Marca, Modelo, Color, Vehiculo
from django.urls import reverse

# Fixtures
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
def test_vehiculo_detalle_api(vehiculo):
    """Test para verificar los detalles del vehículo con placa 'ABC123'"""
    client = APIClient()

    # Realizamos la petición GET al endpoint de vehiculos con placa específica
    url = "http://127.0.0.1:8000/api/v1/vehiculos/ABC123/"
    response = client.get(url)

    # Verificamos que el código de estado sea 200 OK
    assert response.status_code == 200

    # Verificamos que la respuesta sea JSON
    assert response['Content-Type'] == 'application/json'

    # Verificamos que la respuesta contenga los campos correctos
    data = response.json()

    # Verificamos los datos de la respuesta con los datos almacenados en la base de datos
    assert data['vehiculo_placa'] == vehiculo.vehiculo_placa
    assert data['vehiculo_marca']['marca_id'] == vehiculo.vehiculo_marca.pk  # Cambié 'id' por 'pk'
    assert data['vehiculo_marca']['marca_nombre'] == vehiculo.vehiculo_marca.marca_nombre
    assert data['vehiculo_estado']['estado_id'] == vehiculo.vehiculo_estado.id
    assert data['vehiculo_estado']['estado_nombre'] == vehiculo.vehiculo_estado.estado_nombre
    assert data['vehiculo_estado_id'] == vehiculo.vehiculo_estado.id
    assert data['vehiculo_color_id'] == vehiculo.vehiculo_color.id
    assert data['vehiculo_marca_id'] == vehiculo.vehiculo_marca.pk  # Cambié 'id' por 'pk'
    assert data['vehiculo_soat'] == vehiculo.vehiculo_soat
    assert data['vehiculo_año_fabri'] == vehiculo.vehiculo_año_fabri
    assert data['vehiculo_max_dist_dia'] == str(vehiculo.vehiculo_max_dist_dia)
    assert data['vehiculo_capacidad'] == str(vehiculo.vehiculo_capacidad)
    assert data['vehiculo_reg'] == vehiculo.vehiculo_reg.strftime('%Y-%m-%d')
    assert data['vehiculo_modelo'] == vehiculo.vehiculo_modelo.id
    assert data['vehiculo_color'] == vehiculo.vehiculo_color.id

