from django.db import migrations


def insert_example_data(apps, schema_editor):
    # Obtener modelos dinámicamente
    Estado = apps.get_model('api', 'Estado')
    RolUsuario = apps.get_model('api', 'RolUsuario')
    TipoDocumento = apps.get_model('api', 'TipoDocumento')
    DocumentoUsuario = apps.get_model('api', 'DocumentoUsuario')
    Cliente = apps.get_model('api', 'Cliente')
    Marca = apps.get_model('api', 'Marca')
    Modelo = apps.get_model('api', 'Modelo')
    Color = apps.get_model('api', 'Color')
    Vehiculo = apps.get_model('api', 'Vehiculo')
    TipoProducto = apps.get_model('api', 'TipoProducto')
    Producto = apps.get_model('api', 'Producto')
    Ubicacion = apps.get_model('api', 'Ubicacion')
    Usuario = apps.get_model('api', 'Usuario')
    Conductor = apps.get_model('api', 'Conductor')
    Pedido = apps.get_model('api', 'Pedido')
    Linea = apps.get_model('api', 'Linea')
    Recorrido = apps.get_model('api', 'Recorrido')
    Envio = apps.get_model('api', 'Envio')

    # Datos iniciales para cada tabla
    estados = [
        'Activo', 'Inactivo', 'Pendiente', 'Completado'
    ]
    roles = [
        'Administrador', 'Conductor', 'Cliente'
    ]
    tipos_documento = [
        'DNI', 'Pasaporte', 'Licencia'
    ]
    colores = [
        'Rojo', 'Azul', 'Verde', 'Negro', 'Blanco'
    ]
    marcas = [
        'Toyota', 'Ford', 'BMW', 'Mercedes'
    ]
    modelos = [
        'Corolla', 'Focus', 'X5', 'C-Class'
    ]
    tipos_producto = [
        'Electrónicos', 'Alimentos', 'Ropa'
    ]

    # Crear ejemplos para Estado
    estado_objs = [Estado(estado_nombre=e) for e in estados]
    Estado.objects.bulk_create(estado_objs)

    # Crear ejemplos para RolUsuario
    rol_objs = [RolUsuario(rol_nombre=r) for r in roles]
    RolUsuario.objects.bulk_create(rol_objs)

    # Crear ejemplos para TipoDocumento
    tipo_doc_objs = [TipoDocumento(documento_nombre=d) for d in tipos_documento]
    TipoDocumento.objects.bulk_create(tipo_doc_objs)

    # Crear ejemplos para Cliente
    cliente = Cliente.objects.create(
        cliente_nombre="Juan",
        cliente_apellido="Pérez",
        cliente_telefono="12345678901"
    )

    # Crear ejemplos para Marca y Modelo
    marca_objs = [Marca(marca_nombre=m) for m in marcas]
    Marca.objects.bulk_create(marca_objs)

    modelo_objs = [Modelo(modelo_nombre=m) for m in modelos]
    Modelo.objects.bulk_create(modelo_objs)

    # Crear ejemplos para Color
    color_objs = [Color(color_nombre=c) for c in colores]
    Color.objects.bulk_create(color_objs)

    # Crear ejemplos para Vehículo
    vehiculo = Vehiculo.objects.create(
        vehiculo_placa="ABC1234",
        vehiculo_soat=123456,
        vehiculo_marca=Marca.objects.first(),
        vehiculo_modelo=Modelo.objects.first(),
        vehiculo_color=Color.objects.first(),
        vehiculo_año_fabri=2020,
        vehiculo_max_dist_dia=500.00,
        vehiculo_capacidad=1500.00,
        vehiculo_estado=Estado.objects.first()
    )

    # Crear ejemplos para TipoProducto y Producto
    tipo_producto_objs = [TipoProducto(tipo_nombre=t) for t in tipos_producto]
    TipoProducto.objects.bulk_create(tipo_producto_objs)

    producto = Producto.objects.create(
        producto_tipo=TipoProducto.objects.first(),
        producto_peso=2.5,
        producto_precio=150.00,
        producto_volumen=0.25,
        producto_nombre="Laptop"
    )

    # Crear ejemplos para Ubicación
    ubicacion = Ubicacion.objects.create(
        referencia="Calle Falsa 123",
        latitud=-12.0464,
        longitud=-77.0428
    )

    # Crear ejemplos para Usuario
    usuario = Usuario.objects.create(
        usuario_nombre="Carlos",
        usuario_apellido="González",
        usuario_contraseña="password123",
        usuario_email="carlos@example.com",
        usuario_telefono="1234567890",
        usuario_estado=Estado.objects.first()
    )

    # Crear ejemplos para Conductor
    conductor = Conductor.objects.create(
        vehiculo_placa=vehiculo,
        conductor_brevete="ABC12345",
        usuario_id=usuario
    )

    # Crear ejemplos para Pedido
    pedido = Pedido.objects.create(
        cliente_id=cliente,
        ubicacion_id=ubicacion,
        pedido_peso=25.5,
        pedido_volumen=0.75,
        pedido_precio=100.00
    )

    # Crear ejemplos para Línea
    Linea.objects.create(
        pedido_id=pedido,
        producto_id=producto,
        precio_total=150.00,
        cantidad=1
    )

    # Crear ejemplos para Recorrido
    recorrido = Recorrido.objects.create(
        conductor_id=conductor,
        vehiculo_id=vehiculo,
        recorrido_carga=150.00,
        recorrido_distancia=50.00,
        recorrido_estado=Estado.objects.first()
    )

    # Crear ejemplos para Envío
    Envio.objects.create(
        recorrido_id=recorrido,
        pedido_id=pedido,
        envio_estado=Estado.objects.first()
    )


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),  # Ajusta según corresponda
    ]

    operations = [
        migrations.RunPython(insert_example_data),
    ]
