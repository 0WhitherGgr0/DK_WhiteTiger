from rest_framework import viewsets
from .models import Cliente, Producto, Ubicacion, Pedido, Linea, Usuario, Vehiculo, Conductor, Recorrido, Envio
from .serializers import ClienteSerializer, ProductoSerializer, UbicacionSerializer, PedidoSerializer, LineaSerializer, UsuarioSerializer, VehiculoSerializer, ConductorSerializer, RecorridoSerializer, EnvioSerializer

# Vista para Cliente
class ClienteViewSet(viewsets.ModelViewSet):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer

# Vista para Producto
class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer

# Vista para Ubicacion
class UbicacionViewSet(viewsets.ModelViewSet):
    queryset = Ubicacion.objects.all()
    serializer_class = UbicacionSerializer

# Vista para Pedido
class PedidoViewSet(viewsets.ModelViewSet):
    queryset = Pedido.objects.all()
    serializer_class = PedidoSerializer

# Vista para Linea
class LineaViewSet(viewsets.ModelViewSet):
    queryset = Linea.objects.all()
    serializer_class = LineaSerializer

# Vista para Usuario
class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

# Vista para Vehiculo
class VehiculoViewSet(viewsets.ModelViewSet):
    queryset = Vehiculo.objects.all()
    serializer_class = VehiculoSerializer

# Vista para Conductor
class ConductorViewSet(viewsets.ModelViewSet):
    queryset = Conductor.objects.all()
    serializer_class = ConductorSerializer

# Vista para Recorrido
class RecorridoViewSet(viewsets.ModelViewSet):
    queryset = Recorrido.objects.all()
    serializer_class = RecorridoSerializer

# Vista para Envio
class EnvioViewSet(viewsets.ModelViewSet):
    queryset = Envio.objects.all()
    serializer_class = EnvioSerializer
