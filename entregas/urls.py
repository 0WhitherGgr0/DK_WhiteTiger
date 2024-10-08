from django.urls import path
from .views import PuntoEntregaListCreate

urlpatterns = [
    path('puntos-entrega/', PuntoEntregaListCreate.as_view(), name='puntos-entrega'),
]
