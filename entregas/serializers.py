from rest_framework import serializers
from .models import PuntoEntrega

class PuntoEntregaSerializer(serializers.ModelSerializer):
    class Meta:
        model = PuntoEntrega
        fields = ['id', 'nombre', 'latitud', 'longitud', 'fecha']
