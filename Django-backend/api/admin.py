from django.contrib import admin
from .models import Cliente, Producto, Ubicacion, Pedido, Linea, Usuario, Vehiculo, Conductor, Recorrido, Envio

# Registra cada modelo en el panel de administración
admin.site.register(Cliente)
admin.site.register(Producto)
admin.site.register(Ubicacion)
admin.site.register(Pedido)
admin.site.register(Linea)
admin.site.register(Usuario)
admin.site.register(Vehiculo)
admin.site.register(Conductor)
admin.site.register(Recorrido)
admin.site.register(Envio)
