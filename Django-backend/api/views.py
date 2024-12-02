from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import ListAPIView
from django.shortcuts import get_object_or_404

from .models import (
    Cliente, Producto, Ubicacion, Pedido, Linea, Usuario, Vehiculo, Conductor, Recorrido, Envio,
    Estado, RolUsuario, TipoDocumento, DocumentoUsuario, Marca, Modelo, Color, RegistroVehiculo, RegistroConductor
)
from .serializers import (
    ClienteSerializer, ProductoSerializer, UbicacionSerializer, PedidoSerializer, LineaSerializer,
    UsuarioSerializer, VehiculoSerializer, ConductorSerializer, RecorridoSerializer, EnvioSerializer,
    EstadoSerializer, RolUsuarioSerializer, TipoDocumentoSerializer, DocumentoUsuarioSerializer,
    MarcaSerializer, ModeloSerializer, ColorSerializer, RegistroVehiculoSerializer, RegistroConductorSerializer
)
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from mysql.connector import connect, Error
from Crypto.Cipher import AES
from Crypto.Protocol.KDF import PBKDF2
from Crypto.Util.Padding import unpad
from Crypto.Hash import SHA256
import base64
import hmac
import os
import bcrypt
import json
import re
from .models import Usuario
from django.db.utils import IntegrityError

SECRET_KEY = os.getenv('SECRET_KEY', 'elSyDaMeConsume')

def generate_salt_and_key():
    salt = os.urandom(16)
    key = PBKDF2(SECRET_KEY, salt, dkLen=32, count=1000)
    return key, salt

def decrypt_data(encrypted_data):
    try:
        ciphertext_base64 = encrypted_data['ciphertext']
        ciphertext = base64.b64decode(ciphertext_base64)
        salt = bytes.fromhex(encrypted_data['salt'])
        iv = bytes.fromhex(encrypted_data['iv'])
        hmac_provided = encrypted_data['hmac']

        key = PBKDF2(SECRET_KEY.encode('utf-8'), salt, dkLen=32, count=1000, hmac_hash_module=SHA256)

        hmac_calculated = hmac.new(key, ciphertext_base64.encode(), SHA256).hexdigest()
        print("Salt (hex):", salt.hex())
        print("IV (hex):", iv.hex())
        print("Ciphertext (Base64):", ciphertext_base64)
        print("HMAC calculado:", hmac_calculated)
        print("HMAC proporcionado:", hmac_provided)
        
        if hmac_calculated != hmac_provided:
            raise ValueError("HMAC no coincide. Los datos pueden estar comprometidos.")

        cipher = AES.new(key, AES.MODE_CBC, iv)
        decrypted = unpad(cipher.decrypt(ciphertext), AES.block_size)

        return json.loads(decrypted.decode('utf-8'))

    except Exception as e:
        raise ValueError("Error en el descifrado de los datos")

@api_view(['POST'])
def register(request):
    data = request.data
    try:
        telefono = data.get("usuario_telefono")
        if not telefono or not re.match(r'^\d{9}$', telefono):
            return Response({"message": "El número de teléfono debe contener exactamente 9 dígitos."}, status=status.HTTP_400_BAD_REQUEST)
        # Obtener los datos enviados por el frontend
        nombre = data.get('usuario_nombre')
        apellido = data.get('usuario_apellido')
        email = data.get('usuario_email')
        fecha_nac = data.get('usuario_fecha_nac')        
        telefono = data.get('usuario_telefono')

        # Descifrar y hashear la contraseña
        # decrypted_data = decrypt_data(data['usuario_contraseña'])
        # password = decrypted_data['usuario_contraseña'].encode('utf-8')
        # hashed_password = bcrypt.hashpw(password, bcrypt.gensalt())

        #Borrar esta parte
        password = data.get('usuario_contraseña').encode('utf-8')
        hashed_password = bcrypt.hashpw(password, bcrypt.gensalt())
        #****************************************************
        
        # Verificar si el usuario ya existe
        if Usuario.objects.filter(usuario_email=email).exists():
            return Response({"message": "Usuario ya registrado"}, status=status.HTTP_400_BAD_REQUEST)

        # Buscar el rol "conductor" en la base de datos
        try:
            rol_conductor = RolUsuario.objects.get(rol_nombre="conductor")
        except RolUsuario.DoesNotExist:
            return Response({"message": "El rol 'empleado' no existe en la base de datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        # Crear un nuevo usuario con valores predeterminados en los campos adicionales
        usuario = Usuario(
            usuario_nombre=nombre,
            usuario_apellido=apellido,
            usuario_email=email,
            usuario_contraseña=hashed_password.decode('utf-8'),
            usuario_fecha_nac=fecha_nac,
            usuario_telefono=telefono,
            usuario_rol=rol_conductor,  # Asignar el rol dinámicamente
        )
        usuario.save()

        return Response({"message": "Usuario registrado exitosamente"}, status=status.HTTP_201_CREATED)

    except Exception as e:
        return Response({"message": f"Error al registrar el usuario: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def login(request):
    data = request.data
    try:
        # Verificar que los datos requeridos están presentes
        email = data.get('usuario_email')
        
        password = data.get('usuario_contraseña').encode('utf-8')
        # encrypted_password = data.get('usuario_contraseña')

        if not email or not password: # encrypted_password:
            return Response({"message": "Faltan campos obligatorios"}, status=status.HTTP_400_BAD_REQUEST)

        # Descifrar la contraseña
        # decrypted_data = decrypt_data(encrypted_password)
        # if not isinstance(decrypted_data, dict) or 'usuario_contraseña' not in decrypted_data:
        #     return Response({"message": "Error al descifrar la contraseña"}, status=status.HTTP_400_BAD_REQUEST)

        # password = decrypted_data['usuario_contraseña'].encode('utf-8')

        # Verificar si el usuario existe y si la contraseña es correcta
        usuario = Usuario.objects.filter(usuario_email=email).first()
        if usuario and bcrypt.checkpw(password, usuario.usuario_contraseña.encode('utf-8')):
            # Asegurar que los datos del usuario sean serializables
            usuario_data = {
                "rol": usuario.usuario_rol.rol_nombre if usuario.usuario_rol else "Sin rol asignado",
                "nombre": usuario.usuario_nombre,
                "contacto": usuario.usuario_telefono or "No disponible",  # Manejo de campos nulos
                "id": usuario.usuario_id,
            }
            return Response({
                "message": "Inicio de sesión exitoso",
                "user": usuario_data
            }, status=status.HTTP_200_OK)
        else:
            return Response({"message": "Credenciales incorrectas"}, status=status.HTTP_401_UNAUTHORIZED)

    except Exception as e:
        # Registro detallado del error para depuración
        print(f"Error en el proceso de inicio de sesión: {e}")
        return Response({"message": "Error en el proceso de inicio de sesión, por favor intente nuevamente."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(['GET'])
def generate_key_endpoint(request):
    """Endpoint para enviar el salt al frontend."""
    _, salt = generate_salt_and_key()
    return Response({'salt': salt.hex()}, status=status.HTTP_200_OK)

@api_view(['POST'])
def create_conductor(request):
    serializer = ConductorSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'success': True, 'data': serializer.data}, status=status.HTTP_201_CREATED)
    else:
        return Response({'success': False, 'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
def create_vehiculo(request):
    serializer = VehiculoSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'success': True, 'data': serializer.data}, status=status.HTTP_201_CREATED)
    else:
        return Response({'success': False, 'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class UbicacionPedido(ListAPIView):
    serializer_class = UbicacionSerializer
    def get_queryset(self):
        pedido = self.kwargs['id']
        ubicacion = Pedido.objects.get(pedido_id = pedido) 
        return Ubicacion.objects.filter(ubicacion_id=ubicacion.ubicacion_id.ubicacion_id)

class PedidosRuta(ListAPIView):
    serializer_class = EnvioSerializer
    def get_queryset(self):
        recorrido = self.kwargs['id']
        return Envio.objects.filter(recorrido_id=recorrido)

class RegistroConductorID(ListAPIView):
    serializer_class = RegistroConductorSerializer
    def get_queryset(self):
        conductor = self.kwargs['id']
        return RegistroConductor.objects.filter(conductor_id=conductor)

class RegistroVehiculoPlaca(ListAPIView):
    serializer_class = RegistroVehiculoSerializer
    def get_queryset(self):
        vehiculo = self.kwargs['placa']
        return RegistroVehiculo.objects.filter(vehiculo_placa=vehiculo)

class RegistroConductorViewSet(viewsets.ModelViewSet):
    queryset = RegistroConductor.objects.all()
    serializer_class = RegistroConductorSerializer

class RegistroVehiculoViewSet(viewsets.ModelViewSet):
    queryset = RegistroVehiculo.objects.all()
    serializer_class = RegistroVehiculoSerializer

class EstadoViewSet(viewsets.ModelViewSet):
    queryset = Estado.objects.all()
    serializer_class = EstadoSerializer

class RolUsuarioViewSet(viewsets.ModelViewSet):
    queryset = RolUsuario.objects.all()
    serializer_class = RolUsuarioSerializer

class TipoDocumentoViewSet(viewsets.ModelViewSet):
    queryset = TipoDocumento.objects.all()
    serializer_class = TipoDocumentoSerializer

class DocumentoUsuarioViewSet(viewsets.ModelViewSet):
    queryset = DocumentoUsuario.objects.all()
    serializer_class = DocumentoUsuarioSerializer

class MarcaViewSet(viewsets.ModelViewSet):
    queryset = Marca.objects.all()
    serializer_class = MarcaSerializer

class ModeloViewSet(viewsets.ModelViewSet):
    queryset = Modelo.objects.all()
    serializer_class = ModeloSerializer

class ColorViewSet(viewsets.ModelViewSet):
    queryset = Color.objects.all()
    serializer_class = ColorSerializer

class ClienteViewSet(viewsets.ModelViewSet):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer

class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer

class UbicacionViewSet(viewsets.ModelViewSet):
    queryset = Ubicacion.objects.all()
    serializer_class = UbicacionSerializer

class PedidoViewSet(viewsets.ModelViewSet):
    queryset = Pedido.objects.all()
    serializer_class = PedidoSerializer

class LineaViewSet(viewsets.ModelViewSet):
    queryset = Linea.objects.all()
    serializer_class = LineaSerializer

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

class VehiculoViewSet(viewsets.ModelViewSet):
    queryset = Vehiculo.objects.all()
    serializer_class = VehiculoSerializer
    # lookup_field = 'vehiculo_placa'
class ConductorViewSet(viewsets.ModelViewSet):
    queryset = Conductor.objects.all()
    serializer_class = ConductorSerializer
    
class RecorridoViewSet(viewsets.ModelViewSet):
    queryset = Recorrido.objects.all()
    serializer_class = RecorridoSerializer

class EnvioViewSet(viewsets.ModelViewSet):
    queryset = Envio.objects.all()
    serializer_class = EnvioSerializer
