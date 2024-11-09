# Create your models here.
from django.db import models

class Cliente(models.Model):
    cliente_id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    telefono = models.CharField(max_length=15)
    region = models.CharField(max_length=50)

class Producto(models.Model):
    producto_id = models.AutoField(primary_key=True)
    tipo = models.CharField(max_length=50)
    peso = models.DecimalField(max_digits=10, decimal_places=2)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    registro = models.DateTimeField(auto_now_add=True)
    nombre = models.CharField(max_length=100)
    marca = models.CharField(max_length=50)

class Ubicacion(models.Model):
    ubicacion_id = models.AutoField(primary_key=True)
    referencia = models.CharField(max_length=102)
    latitud = models.DecimalField(max_digits=22, decimal_places=18)
    longitud = models.DecimalField(max_digits=22, decimal_places=18)

class Pedido(models.Model):
    pedido_id = models.AutoField(primary_key=True)
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    registro = models.DateField(auto_now_add=True)
    ubicacion = models.ForeignKey(Ubicacion, on_delete=models.CASCADE)
    peso_total = models.DecimalField(max_digits=10, decimal_places=3)
    estado = models.CharField(max_length=20)
    volumen = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)  # Nuevo campo

class Linea(models.Model):
    pedido = models.ForeignKey(Pedido, on_delete=models.CASCADE)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    cantidad = models.IntegerField()

    class Meta:
        unique_together = ('pedido', 'producto')

class Usuario(models.Model):
    usuario_id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    contacto = models.CharField(max_length=100, unique=True)
    region = models.CharField(max_length=50, default="Desconocida")
    contraseña = models.CharField(max_length=100)
    rol = models.CharField(max_length=50, default="conductor")
    tipo_documento = models.CharField(max_length=50, default="DNI")
    documento = models.CharField(max_length=50, default="00000000")
    fecha_nacimiento = models.DateField(null=True, blank=True, default="2000-01-01")
    telefono = models.CharField(max_length=15, default="0000000000")

class Vehiculo(models.Model):
    placa = models.CharField(max_length=10, primary_key=True)
    soat = models.CharField(max_length=50)
    marca = models.CharField(max_length=50)
    modelo = models.CharField(max_length=50)
    color = models.CharField(max_length=30)
    registro = models.DateField(auto_now_add=True) 
    año_fabricacion = models.IntegerField()
    maximo_recorrido_diario = models.DecimalField(max_digits=10, decimal_places=2) 
    maxima_capacidad = models.DecimalField(max_digits=10, decimal_places=2) 
    total_recorrido = models.DecimalField(max_digits=15, decimal_places=2)  
    capacidad = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    estado = models.CharField(max_length=20)
   
class Conductor(models.Model):
    usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE, primary_key=True)
    vehiculo = models.ForeignKey(Vehiculo, on_delete=models.CASCADE)
    breve = models.CharField(max_length=20)
    estado = models.CharField(max_length=20)

class Recorrido(models.Model):
    recorrido_id = models.AutoField(primary_key=True)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    vehiculo = models.ForeignKey(Vehiculo, on_delete=models.CASCADE)
    hora_salida = models.TimeField()
    fecha = models.DateField()
    hora_entrada = models.TimeField()
    estado = models.CharField(max_length=20)

class Envio(models.Model):
    envio_id = models.AutoField(primary_key=True)
    pedido = models.ForeignKey(Pedido, on_delete=models.CASCADE)
    registro = models.CharField(max_length=50)
    estado = models.CharField(max_length=20)
    recorrido = models.ForeignKey(Recorrido, on_delete=models.CASCADE)
    hora_llegada = models.TimeField()
    anticipado = models.BooleanField()
