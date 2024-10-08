from django.shortcuts import render
from rest_framework import generics
from .models import PuntoEntrega
from .serializers import PuntoEntregaSerializer

class PuntoEntregaListCreate(generics.ListCreateAPIView):
    queryset = PuntoEntrega.objects.all()
    serializer_class = PuntoEntregaSerializer
