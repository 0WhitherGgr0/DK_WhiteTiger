from django.contrib import admin
from .models import(
    Cliente, Producto, Ubicacion, Pedido, Linea, Usuario, Vehiculo, Conductor, Recorrido, Envio,
    Estado, RolUsuario, TipoDocumento, DocumentoUsuario, Marca, Modelo, Color
)

# Registra cada modelo en el panel de administración

@admin.register(Cliente)
class ClienteAdmin(admin.ModelAdmin):
    list_display = ('cliente_id', 'cliente_nombre', 'cliente_apellido', 'cliente_telefono', 'cliente_registro')
    search_fields = ('cliente_nombre', 'cliente_apellido', 'cliente_telefono')
    list_filter = ('cliente_registro',)

@admin.register(Producto)
class ProductoAdmin(admin.ModelAdmin):
    list_display = ('producto_id', 'producto_nombre', 'producto_tipo', 'producto_precio', 'producto_volumen', 'producto_registro')
    search_fields = ('producto_nombre',)
    list_filter = ('producto_tipo', 'producto_registro')

@admin.register(Ubicacion)
class UbicacionAdmin(admin.ModelAdmin):
    list_display = ('ubicacion_id', 'referencia', 'latitud', 'longitud')
    search_fields = ('referencia',)

@admin.register(Pedido)
class PedidoAdmin(admin.ModelAdmin):
    list_display = ('pedido_id', 'cliente_id', 'pedido_estado', 'pedido_precio', 'pedido_registro')
    search_fields = ('cliente_id__cliente_nombre',)
    list_filter = ('pedido_estado', 'pedido_registro')

@admin.register(Linea)
class LineaAdmin(admin.ModelAdmin):
    list_display = ('pedido_id', 'producto_id', 'precio_total', 'cantidad')
    search_fields = ('pedido_id__pedido_id', 'producto_id__producto_nombre')

@admin.register(Usuario)
class UsuarioAdmin(admin.ModelAdmin):
    list_display = ('usuario_id', 'usuario_nombre', 'usuario_apellido', 'usuario_email', 'usuario_estado')
    search_fields = ('usuario_nombre', 'usuario_apellido', 'usuario_email')
    list_filter = ('usuario_estado',)

@admin.register(Vehiculo)
class VehiculoAdmin(admin.ModelAdmin):
    list_display = ('vehiculo_placa', 'vehiculo_soat', 'vehiculo_marca', 'vehiculo_modelo', 'vehiculo_año_fabri', 'vehiculo_estado')
    search_fields = ('vehiculo_placa', 'vehiculo_marca__marca_nombre', 'vehiculo_modelo__modelo_nombre')
    list_filter = ('vehiculo_estado', 'vehiculo_año_fabri')

@admin.register(Conductor)
class ConductorAdmin(admin.ModelAdmin):
    list_display = ('conductor_id', 'vehiculo_placa', 'conductor_brevete', 'conductor_estado', 'usuario_id')
    search_fields = ('conductor_brevete', 'vehiculo_placa__vehiculo_placa', 'usuario_id__usuario_nombre')

@admin.register(Recorrido)
class RecorridoAdmin(admin.ModelAdmin):
    list_display = ('recorrido_id', 'conductor_id', 'vehiculo_id', 'recorrido_carga', 'recorrido_distancia', 'recorrido_estado', 'recorrido_fecha_salida')
    search_fields = ('conductor_id__conductor_id', 'vehiculo_id__vehiculo_placa')
    list_filter = ('recorrido_estado', 'recorrido_fecha_salida')

@admin.register(Envio)
class EnvioAdmin(admin.ModelAdmin):
    list_display = ('envio_id', 'recorrido_id', 'pedido_id', 'envio_estado', 'envio_hra_entrega', 'envio_registro')
    search_fields = ('recorrido_id__recorrido_id', 'pedido_id__pedido_id')
    list_filter = ('envio_estado', 'envio_registro')

@admin.register(Estado)
class EstadoAdmin(admin.ModelAdmin):
    list_display = ('estado_id', 'estado_nombre')
    search_fields = ('estado_nombre',)

@admin.register(RolUsuario)
class RolUsuarioAdmin(admin.ModelAdmin):
    list_display = ('rol_tipo', 'rol_nombre')
    search_fields = ('rol_nombre',)

@admin.register(TipoDocumento)
class TipoDocumentoAdmin(admin.ModelAdmin):
    list_display = ('documento_tipo', 'documento_nombre')
    search_fields = ('documento_nombre',)

@admin.register(DocumentoUsuario)
class DocumentoUsuarioAdmin(admin.ModelAdmin):
    list_display = ('docusuario_id', 'docusuario_valor', 'docusuario_tipo')
    search_fields = ('docusuario_valor', 'docusuario_tipo__documento_nombre')

@admin.register(Marca)
class MarcaAdmin(admin.ModelAdmin):
    list_display = ('marca_id', 'marca_nombre')
    search_fields = ('marca_nombre',)

@admin.register(Modelo)
class ModeloAdmin(admin.ModelAdmin):
    list_display = ('modelo_id', 'modelo_nombre')
    search_fields = ('modelo_nombre',)

@admin.register(Color)
class ColorAdmin(admin.ModelAdmin):
    list_display = ('color_id', 'color_nombre')
    search_fields = ('color_nombre',)