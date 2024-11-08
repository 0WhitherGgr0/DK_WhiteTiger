# Generated by Django 5.1.2 on 2024-11-08 18:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_usuario_contacto_alter_usuario_documento_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='pedido',
            name='volumen',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=10),
        ),
        migrations.AddField(
            model_name='vehiculo',
            name='maxima_capacidad',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=10),
        ),
        migrations.AddField(
            model_name='vehiculo',
            name='maximo_recorrido_diario',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=10),
        ),
        migrations.AddField(
            model_name='vehiculo',
            name='total_recorrido',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=15),
        ),
        migrations.AlterField(
            model_name='pedido',
            name='peso_total',
            field=models.DecimalField(decimal_places=3, max_digits=10),
        ),
        migrations.AlterField(
            model_name='pedido',
            name='registro',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='producto',
            name='registro',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='ubicacion',
            name='latitud',
            field=models.DecimalField(decimal_places=14, max_digits=18),
        ),
        migrations.AlterField(
            model_name='ubicacion',
            name='longitud',
            field=models.DecimalField(decimal_places=14, max_digits=18),
        ),
        migrations.AlterField(
            model_name='vehiculo',
            name='registro',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
