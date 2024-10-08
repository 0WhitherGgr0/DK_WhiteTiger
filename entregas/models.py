from django.db import models

# Create your models here.
class PuntoEntrega(models.Model):
    nombre = models.CharField(max_length=100)
    latitud = models.FloatField()
    longitud = models.FloatField()
    fecha = models.DateField()

    def __str__(self):
        return self.nombre