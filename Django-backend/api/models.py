from django.db import models 
from django.db.models.signals import post_save
from django.dispatch import receiver

class Estado(models.Model):
    estado_id = models.AutoField(primary_key=True) 
    estado_nombre = models.CharField(max_length=255, null=False, blank=False) 

    def __str__(self):
        return self.estado_nombre

class RolUsuario(models.Model):
    rol_tipo = models.AutoField(primary_key=True)  
    rol_nombre = models.CharField(max_length=255, null=False, blank=False)  

    def __str__(self):
        return self.rol_nombre


class TipoDocumento(models.Model):
    documento_tipo = models.AutoField(primary_key=True)  
    documento_nombre = models.CharField(max_length=255, null=False, blank=False)  

    def __str__(self):
        return self.documento_nombre

class DocumentoUsuario(models.Model):
    docusuario_id = models.AutoField(primary_key=True)  
    docusuario_valor = models.IntegerField(null=False, blank=False)  
    docusuario_tipo = models.ForeignKey(TipoDocumento, on_delete=models.CASCADE)  

    def __str__(self):
        return f"{self.docusuario_valor} ({self.docusuario_tipo})"

class Cliente(models.Model):
    cliente_id = models.AutoField(primary_key=True) 
    cliente_nombre = models.CharField(max_length=255, null=False, blank=False) 
    cliente_apellido = models.CharField(max_length=255, null=False, blank=False) 
    cliente_registro = models.DateField(auto_now_add=True)  
    cliente_telefono = models.CharField(max_length=11, unique=True, null=False, blank=False) 

    def __str__(self):
        return f"{self.cliente_nombre} {self.cliente_apellido}"

class Marca(models.Model):
    marca_id = models.AutoField(primary_key=True)  
    marca_nombre = models.CharField(max_length=255, null=False, blank=False)  

    def __str__(self):
        return self.marca_nombre

class Modelo(models.Model):
    modelo_id = models.AutoField(primary_key=True)  
    modelo_nombre = models.CharField(max_length=255, null=False, blank=False)  

    def __str__(self):
        return self.modelo_nombre

class Color(models.Model):
    color_id = models.AutoField(primary_key=True) 
    color_nombre = models.CharField(max_length=255, null=False, blank=False)  

    def __str__(self):
        return self.color_nombre
    
class Vehiculo(models.Model):
    vehiculo_placa = models.CharField(max_length=7, primary_key=True)
    vehiculo_soat = models.IntegerField(null=False, blank=False)
    vehiculo_marca = models.ForeignKey(Marca, on_delete=models.SET_NULL, null=True, blank=True)
    vehiculo_modelo = models.ForeignKey(Modelo, on_delete=models.SET_NULL, null=True, blank=True)
    vehiculo_color = models.ForeignKey(Color, on_delete=models.SET_NULL, null=True, blank=True)
    vehiculo_año_fabri = models.PositiveSmallIntegerField(null=True, blank=True)
    vehiculo_max_dist_dia = models.DecimalField(max_digits=8, decimal_places=2, null=False, blank=False)
    vehiculo_capacidad = models.DecimalField(max_digits=8, decimal_places=2, null=False, blank=False)
    vehiculo_reg = models.DateField(null=False, blank=False, auto_now_add=True)

    def __str__(self):
        return self.vehiculo_placa

class TipoProducto(models.Model):
    tipo_id = models.AutoField(primary_key=True)  
    tipo_nombre = models.CharField(max_length=255, null=False, blank=False) 

    def __str__(self):
        return self.tipo_nombre

class Producto(models.Model):
    producto_id = models.AutoField(primary_key=True)  
    producto_tipo = models.ForeignKey(TipoProducto, on_delete=models.SET_NULL, null=True, blank=True)  
    producto_peso = models.DecimalField(max_digits=6, decimal_places=2, null=False, blank=False)  
    producto_precio = models.DecimalField(max_digits=8, decimal_places=2, null=False, blank=False)  
    producto_registro = models.DateField(auto_now_add=True, null=False, blank=False)  
    producto_volumen = models.DecimalField(max_digits=6, decimal_places=2, null=False, blank=False)  
    producto_nombre = models.CharField(max_length=255, null=True, blank=True)  

    def __str__(self):
        return self.producto_nombre


class Ubicacion(models.Model):
    ubicacion_id = models.AutoField(primary_key=True)  
    referencia = models.CharField(max_length=100, null=True, blank=True) 
    latitud = models.DecimalField(max_digits=22, decimal_places=18, null=False, blank=False)  
    longitud = models.DecimalField(max_digits=22, decimal_places=18, null=False, blank=False)  

    def __str__(self):
        return self.referencia

class Usuario(models.Model):
    usuario_id = models.AutoField(primary_key=True)  
    usuario_nombre = models.CharField(max_length=255, null=False, blank=False) 
    usuario_apellido = models.CharField(max_length=255, null=False, blank=False)  
    usuario_contraseña = models.CharField(max_length=200, null=False, blank=False)  
    usuario_email = models.CharField(max_length=100, null=False, blank=False)  
    usuario_fecha_nac = models.DateField(null=True, blank=True)  
    usuario_rol = models.ForeignKey(
        RolUsuario, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True,
        default=1
    )
    usuario_doc = models.ForeignKey(DocumentoUsuario, on_delete=models.SET_NULL, null=True, blank=True)  
    usuario_telefono = models.CharField(max_length=11, null=True, blank=True)  
    usuario_estado = models.ForeignKey(Estado, on_delete=models.SET_NULL, null=True, blank=True, default=10)
    usuario_registro = models.DateField(auto_now_add=True, null=False, blank=False)  

    def __str__(self):
        return f"{self.usuario_nombre} {self.usuario_apellido}"


class Conductor(models.Model):
    conductor_id = models.AutoField(primary_key=True) 
    vehiculo_placa = models.ForeignKey(Vehiculo, on_delete=models.CASCADE)  
    conductor_brevete = models.CharField(max_length=9, null=False, blank=False) 
    conductor_estado = models.ForeignKey(Estado, on_delete=models.SET_NULL, null=True, blank=True)  
    usuario_id = models.ForeignKey(Usuario, on_delete=models.CASCADE)  

    def __str__(self):
        return f"Conductor {self.conductor_id}"



class Pedido(models.Model):
    pedido_id = models.AutoField(primary_key=True) 
    cliente_id = models.ForeignKey(Cliente, on_delete=models.CASCADE)  
    pedido_registro = models.DateField(auto_now_add=True, null=False, blank=False)  
    ubicacion_id = models.ForeignKey(Ubicacion, on_delete=models.CASCADE)  
    pedido_peso = models.DecimalField(max_digits=6, decimal_places=2, null=False, blank=False) 
    pedido_estado = models.ForeignKey(Estado, on_delete=models.SET_NULL, null=True, blank=True, default=1)  
    pedido_volumen = models.DecimalField(max_digits=6, decimal_places=2, null=False, blank=False)  
    pedido_precio = models.DecimalField(max_digits=8, decimal_places=2, null=False, blank=False)  
    pedido_fallos = models.IntegerField(null=False, blank=False, default=0)  

    def __str__(self):
        return f"Pedido {self.pedido_id}"
    
class Linea(models.Model):
    pedido_id = models.ForeignKey(Pedido, on_delete=models.CASCADE)  
    producto_id = models.ForeignKey(Producto, on_delete=models.CASCADE)  
    precio_total = models.DecimalField(max_digits=8, decimal_places=2, null=False, blank=False)  
    cantidad = models.IntegerField(null=False, blank=False)  

    class Meta:
        unique_together = ('pedido_id', 'producto_id')

    def __str__(self):
        return f"Linea de Pedido {self.pedido_id}"
    
class RegistroVehiculo(models.Model):
    vehiculo_placa = models.ForeignKey(Vehiculo, on_delete=models.CASCADE)  
    estado_id = models.ForeignKey(Estado, on_delete=models.SET_NULL, null=True, blank=True)  
    registro = models.DateField(auto_now_add=True, null=False, blank=False)  

    class Meta:
        unique_together = ('vehiculo_placa', 'estado_id')

    def __str__(self):
        return f"Registro Estado Conductor {self.vehiculo_placa}"
    
class RegistroConductor(models.Model):
    conductor_id = models.ForeignKey(Conductor, on_delete=models.CASCADE)  
    estado_id = models.ForeignKey(Estado, on_delete=models.SET_NULL, null=True, blank=True)  
    registro = models.DateField(auto_now_add=True, null=False, blank=False)  

    class Meta:
        unique_together = ('conductor_id', 'estado_id')

    def __str__(self):
        return f"Registro Estado Conductor {self.conductor_id}"


class Recorrido(models.Model):
    recorrido_id = models.AutoField(primary_key=True)  
    conductor_id = models.ForeignKey(Conductor, on_delete=models.CASCADE)  
    vehiculo_id = models.ForeignKey(Vehiculo, on_delete=models.CASCADE)  
    recorrido_carga = models.DecimalField(max_digits=8, decimal_places=2, null=False, blank=False) 
    recorrido_distancia = models.DecimalField(max_digits=8, decimal_places=2, null=False, blank=False) 
    recorrido_estado = models.ForeignKey(Estado, on_delete=models.SET_NULL, null=True, blank=True)  
    recorrido_fecha_salida = models.DateField(null=True, blank=True)  
    recorrido_hra_salida = models.TimeField(null=True, blank=True) 
    recorrido_registro = models.DateField(auto_now_add=True, null=False, blank=False)  

    def __str__(self):
        return f"Recorrido {self.recorrido_id}"

class Envio(models.Model):
    envio_id = models.AutoField(primary_key=True)  
    recorrido_id = models.ForeignKey(Recorrido, on_delete=models.CASCADE)  
    pedido_id = models.ForeignKey(Pedido, on_delete=models.CASCADE)  
    envio_anterior = models.IntegerField(null=True, blank=True)  
    envio_estado = models.ForeignKey(Estado, on_delete=models.SET_NULL, null=True, blank=True)  
    envio_hra_entrega = models.DateTimeField(null=True, blank=True)  
    envio_registro = models.DateField(auto_now_add=True, null=False, blank=False) 

    def __str__(self):
        return f"Envio {self.envio_id}"

@receiver(post_save, sender=Vehiculo)
def crearEstadosVehiculo(sender, instance, created, **kwargs):
    print(instance)
    if created: 
        RegistroVehiculo.objects.create(
            vehiculo_placa = instance,
            estado_id = Estado.objects.get(estado_id = 6)
        )
        RegistroVehiculo.objects.create(
            vehiculo_placa = instance,
            estado_id = Estado.objects.get(estado_id = 9)
        )

@receiver(post_save, sender=Conductor)
def crearEstadosVehiculo(sender, instance, created, **kwargs):
    print(instance)
    if created: 
        RegistroConductor.objects.create(
            conductor_id = instance,
            estado_id = Estado.objects.get(estado_id = 6)
        )
        RegistroConductor.objects.create(
            conductor_id = instance,
            estado_id = Estado.objects.get(estado_id = 9)
        )