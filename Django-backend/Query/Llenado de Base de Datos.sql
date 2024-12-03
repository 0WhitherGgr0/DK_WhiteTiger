CREATE DATABASE vrpdatos;
USE vrpdatos;

-- Llenar tabla api_estado
INSERT INTO api_estado (estado_id, estado_nombre) VALUES
(1, 'Recibido'),
(2, 'Asignado'),
(3, 'Devuelto'),
(4, 'Camino'),
(5, 'Entregado'),
(6, 'Sin asignar'),
(7, 'Libre'),
(8, 'Ocupado'),
(9, 'No disponible'),
(10, 'Disponible'),
(11, 'No entregado'),
(12, 'Creado'),
(13, 'Fallido'),
(14, 'Exito');


-- Llenar tabla api_marca
INSERT INTO api_marca (marca_id, marca_nombre) VALUES
(1, 'Toyota'),
(2, 'Hyundai'),
(3, 'Kia'),
(4, 'Nissan'),
(5, 'Chevrolet'),
(6, 'Ford'),
(7, 'Honda'),
(8, 'Mazda'),
(9, 'BMW'),
(10, 'Audi');

-- Llenar tabla api_modelo
INSERT INTO api_modelo (modelo_id, modelo_nombre) VALUES
(1, 'Corolla'),
(2, 'Elantra'),
(3, 'Rio'),
(4, 'Sentra'),
(5, 'Spark'),
(6, 'Focus'),
(7, 'Civic'),
(8, 'CX-5'),
(9, 'X5'),
(10, 'A3');

-- Llenar tabla api_color
INSERT INTO api_color (color_id, color_nombre) VALUES
(1, 'Rojo'),
(2, 'Negro'),
(3, 'Blanco'),
(4, 'Gris'),
(5, 'Azul'),
(6, 'Verde'),
(7, 'Amarillo'),
(8, 'Naranja'),
(9, 'Plata'),
(10, 'Marrón');

INSERT INTO api_tipodocumento (documento_tipo, documento_nombre)
VALUES 
(1, 'DNI'),
(2, 'Pasaporte'),
(3, 'Licencia');

INSERT INTO api_rolusuario (rol_tipo, rol_nombre)
VALUES 
(1,'Empleado'),
(2,'Conductor'),
(3,'admin');

-- Llenar tabla api_tipoproducto
INSERT INTO api_tipoproducto (tipo_id, tipo_nombre) VALUES
(1, 'Electrónica'),
(2, 'Ropa'),
(3, 'Alimentos'),
(4, 'Hogar'),
(5, 'Juguetes'),
(6, 'Herramientas'),
(7, 'Muebles'),
(8, 'Automotriz'),
(9, 'Deportes'),
(10, 'Salud'),
(11, 'Belleza'),
(12, 'Libros'),
(13, 'Cuidado personal'),
(14, 'Mascotas'),
(15, 'Oficina'),
(16, 'Viajes');

-- Llenar tabla api_producto
INSERT INTO api_producto (producto_id, producto_peso, producto_precio, producto_volumen, producto_nombre, producto_tipo_id) VALUES
(1, 1.50, 300.00, 0.50, 'Laptop Dell', 1),
(2, 0.75, 50.00, 0.30, 'Camiseta Nike', 2),
(3, 0.25, 5.00, 0.10, 'Pan de Avena', 3),
(4, 2.00, 120.00, 1.20, 'Sofa Cama', 4),
(5, 0.10, 20.00, 0.05, 'Pelota de Fútbol', 9),
(6, 1.00, 80.00, 0.60, 'Martillo de Acero', 6),
(7, 3.50, 500.00, 2.00, 'Silla Ejecutiva', 7),
(8, 0.85, 350.00, 0.80, 'Neumático Michelin', 8),
(9, 0.50, 40.00, 0.30, 'Raqueta de Tenis Wilson', 9),
(10, 0.20, 15.00, 0.10, 'Vitamínico', 10),
(11, 0.90, 250.00, 0.70, 'Cámara GoPro', 1),
(12, 1.20, 60.00, 0.45, 'Jeans Levi\'s', 2),
(13, 0.30, 3.50, 0.15, 'Galletas Oreo', 3),
(14, 0.50, 25.00, 0.40, 'Mesa de Comedor', 4),
(15, 0.30, 10.00, 0.20, 'Muñeca Barbie', 5),
(16, 0.20, 15.00, 0.10, 'Destornillador Philips', 6),
(17, 2.50, 400.00, 1.80, 'Silla de Oficina', 7),
(18, 1.10, 600.00, 1.50, 'Aire Acondicionado LG', 4),
(19, 0.70, 120.00, 0.55, 'Cámara Reflex Nikon', 1),
(20, 0.40, 50.00, 0.35, 'Balón de Baloncesto Spalding', 9),
(21, 1.30, 70.00, 0.80, 'Shampoo Pantene', 10),
(22, 0.90, 80.00, 0.50, 'Perfume Chanel', 11),
(23, 0.70, 30.00, 0.25, 'Libro de Harry Potter', 12),
(24, 0.15, 7.00, 0.10, 'Crema hidratante', 13),
(25, 1.50, 60.00, 0.65, 'Comedero para Perro', 14),
(26, 1.00, 110.00, 0.75, 'Lámpara de escritorio', 15),
(27, 0.80, 90.00, 0.60, 'Maleta de viaje', 16),
(28, 0.55, 18.00, 0.30, 'Cinturón de seguridad', 8),
(29, 2.20, 75.00, 1.40, 'Parrilla eléctrica', 6),
(30, 1.10, 220.00, 0.90, 'Tableta Samsung', 1);

INSERT INTO api_cliente (cliente_id, cliente_nombre, cliente_apellido, cliente_telefono) VALUES 
('1', 'Pipley', 'Ripley', '999098567');



