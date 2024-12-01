from django.urls import path, include
from rest_framework import routers
from . import views
from .views import RegistroVehiculoPlaca
from .views import RegistroConductorID

router = routers.DefaultRouter()

# Registrar todas las rutas para cada ViewSet
router.register(r'estados', views.EstadoViewSet)
router.register(r'roles-usuario', views.RolUsuarioViewSet)
router.register(r'tipos-documento', views.TipoDocumentoViewSet)
router.register(r'documentos-usuario', views.DocumentoUsuarioViewSet)
router.register(r'marcas', views.MarcaViewSet)
router.register(r'modelos', views.ModeloViewSet)
router.register(r'colores', views.ColorViewSet)
router.register(r'clientes', views.ClienteViewSet)
router.register(r'productos', views.ProductoViewSet)
router.register(r'ubicaciones', views.UbicacionViewSet)
router.register(r'pedidos', views.PedidoViewSet)
router.register(r'lineas', views.LineaViewSet)
router.register(r'usuarios', views.UsuarioViewSet)
router.register(r'vehiculos', views.VehiculoViewSet)
router.register(r'conductores', views.ConductorViewSet)
router.register(r'recorridos', views.RecorridoViewSet)
router.register(r'envios', views.EnvioViewSet)
router.register(r'registros-vehiculo',views.RegistroVehiculoViewSet)
router.register(r'registros-conductor',views.RegistroConductorViewSet)

# Incluir las rutas registradas en urlpatterns
urlpatterns = [
    path('', include(router.urls)),
    path('register/', views.register, name='register'),
    path('login/', views.login, name='login'),
    path('generate-key/', views.generate_key_endpoint, name='generate_key'),
    path('conductores/', views.create_conductor, name='create_conductor'),
    path('vehiculos/', views.create_vehiculo, name='create_vehiculo'),
    path('vehiculosEstados/<str:placa>/', RegistroVehiculoPlaca.as_view(), name='vehiculo_estados'),
    path('conductoresEstados/<str:id>/', RegistroConductorID.as_view(), name='conductor_estados')
]
