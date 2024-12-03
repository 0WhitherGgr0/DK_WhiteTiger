-- Llenar tabla api_vehiculo
INSERT INTO api_vehiculo (vehiculo_placa, vehiculo_soat, vehiculo_año_fabri, vehiculo_max_dist_dia, vehiculo_capacidad, vehiculo_reg, vehiculo_color_id, vehiculo_marca_id, vehiculo_modelo_id) VALUES
('ABC123', 123456, 2018, 400, 15000, '2024-01-15', 1, 1, 1),
('DEF456', 654321, 2019, 450, 12000, '2024-01-20', 2, 2, 2),
('GHI789', 789123, 2020, 500, 18000, '2024-02-01', 3, 3, 3),
('JKL012', 321654, 2017, 350, 14000, '2024-02-15', 4, 4, 4),
('MNO345', 987654, 2021, 600, 20000, '2024-03-01', 5, 5, 5),
('PQR678', 112233, 2016, 300, 13000, '2024-03-10', 1, 1, 2),
('STU901', 445566, 2015, 250, 11000, '2024-04-01', 2, 2, 3),
('VWX234', 778899, 2022, 700, 22000, '2024-04-20', 3, 3, 4),
('YZA567', 334455, 2020, 550, 17000, '2024-05-05', 4, 4, 5),
('BCD890', 556677, 2023, 800, 25000, '2024-05-15', 5, 5, 1);

INSERT INTO api_documentousuario (docusuario_id, docusuario_valor, docusuario_tipo_id)
VALUES 
(3, '84123449', 1), -- Documento DNI
(4, '85123450', 1), -- Documento DNI
(5, '86123451', 2), -- Documento Pasaporte
(6, '87123452', 1), -- Documento DNI para chofer 1
(7, '88123453', 1), -- Documento DNI para chofer 2
(8, '89123454', 1), -- Documento DNI para chofer 3
(9, '90123455', 1), -- Documento DNI para chofer 4
(10, '91123456', 1); -- Documento DNI para chofer 5

-- Insertar usuarios, incluyendo 5 choferes
INSERT INTO api_usuario (usuario_id, usuario_nombre, usuario_apellido, usuario_contraseña, usuario_email, usuario_fecha_nac, usuario_telefono, usuario_registro, usuario_doc_id, usuario_estado_id, usuario_rol_id)
VALUES 
(3, 'Carlos', 'Pérez', 'password123', 'carlos.perez@example.com', '1990-05-20', '987654321', '2024-01-01', 3, 1, 1), -- Admin con estado 1
(4, 'María', 'García', 'securepass456', 'maria.garcia@example.com', '1985-03-15', '912345678', '2024-01-02', 4, 1, 3), -- Cliente con estado 1
(5, 'Juan', 'López', 'mystrongpass789', 'juan.lopez@example.com', '2000-07-10', '998877665', '2024-01-03', 3, 5, 3), -- Cliente con estado 2
(6, 'Pedro', 'Jiménez', 'choferpass101', 'pedro.jimenez@example.com', '1992-11-25', '933345678', '2024-01-04', 6, 1, 2), -- Chofer con estado 1
(7, 'Ana', 'Ramírez', 'choferpass102', 'ana.ramirez@example.com', '1988-09-15', '956789012', '2024-01-05', 7, 1, 2), -- Chofer con estado 1
(8, 'Luis', 'Hernández', 'choferpass103', 'luis.hernandez@example.com', '1994-04-30', '967890123', '2024-01-06', 8, 1, 2), -- Chofer con estado 1
(9, 'Elena', 'Martínez', 'choferpass104', 'elena.martinez@example.com', '1991-02-10', '980123456', '2024-01-07', 9, 2, 2), -- Chofer con estado 2
(10, 'Miguel', 'Sánchez', 'choferpass105', 'miguel.sanchez@example.com', '1983-08-20', '993456789', '2024-01-08', 10, 1, 2); -- Chofer con estado 1

INSERT INTO api_conductor (conductor_id, conductor_brevete, conductor_estado_id, usuario_id_id, vehiculo_placa_id)
VALUES
(2, 'B0012345', 1, 6, 'ABC123'), -- Conductor Pedro asignado al vehículo con placa 'ABC123'
(3, 'B0023456', 1, 7,'DEF456'), -- Conductor Ana asignado al vehículo con placa 'DEF456'
(4, 'B0034567', 1, 8, 'GHI789'), -- Conductor Luis asignado al vehículo con placa 'GHI789'
(5, 'B0045678', 2, 9,'JKL012'), -- Conductor Elena asignado al vehículo con placa 'JKL012'
(6, 'B0056789', 1, 10,'MNO345'); -- Conductor Miguel asignado al vehículo con placa 'MNO345'
