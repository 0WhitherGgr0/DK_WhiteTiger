from rest_framework import serializers
from .models import (
    Cliente, Producto, Ubicacion, Pedido, Linea, Usuario, Vehiculo, Conductor, Recorrido, Envio,
    Estado, RolUsuario, TipoDocumento, DocumentoUsuario, Marca, Modelo, Color, RegistroVehiculo
)

class EstadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estado
        fields = ['estado_id', 'estado_nombre']

class RolUsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = RolUsuario
        fields = '__all__'

class TipoDocumentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoDocumento
        fields = '__all__'

class DocumentoUsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = DocumentoUsuario
        fields = '__all__'

class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = '__all__'

class MarcaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Marca
        fields = ['marca_id', 'marca_nombre']

class ModeloSerializer(serializers.ModelSerializer):
    class Meta:
        model = Modelo
        fields = '__all__'

class ColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Color
        fields = '__all__'

class VehiculoSerializer(serializers.ModelSerializer):
    vehiculo_marca = MarcaSerializer(read_only=True)
    vehiculo_estado = EstadoSerializer(read_only=True)
    vehiculo_color_id = serializers.PrimaryKeyRelatedField(
        source='vehiculo_color', read_only=True
    )
    vehiculo_marca_id = serializers.PrimaryKeyRelatedField(
        source='vehiculo_marca', read_only=True
    )

    class Meta:
        model = Vehiculo
        fields = '__all__'

class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = '__all__'

class UbicacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ubicacion
        fields = '__all__'

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'

class ConductorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Conductor
        fields = '__all__'

class PedidoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pedido
        fields = '__all__'

class LineaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Linea
        fields = '__all__'

class RecorridoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recorrido
        fields = '__all__'

class EnvioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Envio
        fields = '__all__'

class RegistroVehiculoSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegistroVehiculo
        fields = '__all__'