# Generated by Django 5.1.2 on 2024-11-30 19:38

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0001_initial"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="vehiculo",
            name="vehiculo_estado",
        ),
        migrations.AlterField(
            model_name="pedido",
            name="pedido_estado",
            field=models.ForeignKey(
                blank=True,
                default=1,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                to="api.estado",
            ),
        ),
        migrations.AlterField(
            model_name="usuario",
            name="usuario_estado",
            field=models.ForeignKey(
                blank=True,
                default=10,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                to="api.estado",
            ),
        ),
        migrations.CreateModel(
            name="RegistroVehiculo",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("registro", models.DateField(auto_now_add=True)),
                (
                    "estado_id",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        to="api.estado",
                    ),
                ),
                (
                    "vehiculo_id",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="api.vehiculo"
                    ),
                ),
            ],
            options={
                "unique_together": {("vehiculo_id", "estado_id")},
            },
        ),
    ]