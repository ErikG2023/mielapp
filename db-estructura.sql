-- Extensión UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tipo ENUM para categorías de gasto
CREATE TYPE categoria_gasto AS ENUM (
    'consulta_rutina',
    'emergencia',
    'medicamentos',
    'vacunas',
    'desparasitacion',
    'estetica',
    'alimentos',
    'accesorios',
    'otros'
);

-- Tabla de Mascotas
CREATE TABLE mascotas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre VARCHAR NOT NULL,
    raza VARCHAR NOT NULL,
    fecha_nacimiento DATE,
    peso DECIMAL,
    foto_url VARCHAR,
    creado_en TIMESTAMPTZ DEFAULT NOW(),
    actualizado_en TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de Proveedores de Servicios
CREATE TABLE proveedores_servicios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre VARCHAR NOT NULL,
    tipo VARCHAR NOT NULL, -- 'veterinaria', 'estetica', 'ambos'
    direccion VARCHAR,
    telefono VARCHAR,
    correo VARCHAR,
    sitio_web VARCHAR,
    notas TEXT,
    calificacion DECIMAL(2,1),
    es_favorito BOOLEAN DEFAULT false,
    creado_en TIMESTAMPTZ DEFAULT NOW(),
    actualizado_en TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de Visitas Veterinarias
CREATE TABLE visitas_veterinarias (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    mascota_id UUID REFERENCES mascotas(id),
    proveedor_id UUID REFERENCES proveedores_servicios(id),
    fecha_visita DATE NOT NULL,
    nombre_veterinario VARCHAR,
    motivo VARCHAR NOT NULL,
    diagnostico TEXT,
    tratamiento TEXT,
    estado_salud VARCHAR CHECK (estado_salud IN ('excelente', 'bueno', 'regular', 'requiere_atencion', 'critico')),
    fecha_proxima_visita DATE,
    notas TEXT,
    peso DECIMAL,
    costo DECIMAL,
    categoria_gasto categoria_gasto,
    recordatorio_enviado BOOLEAN DEFAULT false,
    dias_recordatorio INTEGER DEFAULT 7,
    creado_en TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de Estética
CREATE TABLE estetica (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    mascota_id UUID REFERENCES mascotas(id),
    proveedor_id UUID REFERENCES proveedores_servicios(id),
    fecha_servicio DATE NOT NULL,
    nombre_estilista VARCHAR,
    tipo_servicio VARCHAR[],
    notas TEXT,
    costo DECIMAL,
    categoria_gasto categoria_gasto,
    fecha_proxima_cita DATE,
    recordatorio_enviado BOOLEAN DEFAULT false,
    dias_recordatorio INTEGER DEFAULT 7,
    creado_en TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de Vacunas y Desparasitaciones
CREATE TABLE vacunas_desparasitaciones (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    mascota_id UUID REFERENCES mascotas(id),
    proveedor_id UUID REFERENCES proveedores_servicios(id),
    tipo VARCHAR NOT NULL, -- 'vacuna' o 'desparasitacion'
    nombre VARCHAR NOT NULL,
    marca VARCHAR,
    numero_lote VARCHAR,
    fecha_aplicacion DATE NOT NULL,
    fecha_proxima_aplicacion DATE,
    aplicado_por VARCHAR,
    notas TEXT,
    costo DECIMAL,
    categoria_gasto categoria_gasto,
    recordatorio_enviado BOOLEAN DEFAULT false,
    dias_recordatorio INTEGER DEFAULT 7,
    creado_en TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para mejorar el rendimiento
CREATE INDEX idx_mascotas_nombre ON mascotas(nombre);
CREATE INDEX idx_visitas_mascota_fecha ON visitas_veterinarias(mascota_id, fecha_visita);
CREATE INDEX idx_estetica_mascota_fecha ON estetica(mascota_id, fecha_servicio);
CREATE INDEX idx_vacunas_mascota_fecha ON vacunas_desparasitaciones(mascota_id, fecha_aplicacion);
CREATE INDEX idx_proveedores_tipo ON proveedores_servicios(tipo);

-- Triggers para actualizar timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.actualizado_en = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_mascotas_updated_at
    BEFORE UPDATE ON mascotas
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_proveedores_updated_at
    BEFORE UPDATE ON proveedores_servicios
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();


-- DATA

-- Insertar mascota Miel
INSERT INTO mascotas (
    nombre,
    raza,
    fecha_nacimiento,
    peso,
    foto_url
) VALUES (
    'Miel',
    'Maltés',
    '2023-11-23',  -- Aproximadamente 4 meses de edad
    2.5,           -- Peso actual
    NULL           -- Pendiente de agregar foto
);

-- Insertar proveedores de servicios
INSERT INTO proveedores_servicios (
    nombre,
    tipo,
    direccion,
    telefono,
    correo,
    sitio_web,
    notas,
    calificacion,
    es_favorito
) VALUES 
(
    'Veterinaria El Pastor',
    'veterinaria',
    'Av. Principal 123',
    '555-1234',
    'elpastor@email.com',
    'www.elpastor.com',
    'Veterinaria principal de Miel',
    4.8,
    true
),
(
    'Pet Beauty Spa',
    'estetica',
    'Calle Mascota 456',
    '555-5678',
    'petbeauty@email.com',
    'www.petbeauty.com',
    'Estética preferida para Miel',
    4.5,
    true
),
(
    'Hospital Veterinario 24/7',
    'veterinaria',
    'Av. Central 789',
    '555-9012',
    'hospital@email.com',
    'www.hospitalvet.com',
    'Para emergencias',
    4.7,
    false
);

-- Insertar historial de visitas veterinarias
INSERT INTO visitas_veterinarias (
    mascota_id,
    proveedor_id,
    fecha_visita,
    fecha_proxima_visita,
    nombre_veterinario,
    motivo,
    diagnostico,
    tratamiento,
    estado_salud,
    notas,
    peso,
    costo,
    categoria_gasto
) VALUES 
(
    (SELECT id FROM mascotas WHERE nombre = 'Miel'),
    (SELECT id FROM proveedores_servicios WHERE nombre = 'Veterinaria El Pastor'),
    '2023-12-01',
    '2023-12-15',
    'Dr. García',
    'Primera revisión',
    'Cachorro saludable',
    'Inicio de calendario de vacunación',
    'excelente',
    'Primera visita al veterinario',
    1.8,
    50.00,
    'consulta_rutina'
),
(
    (SELECT id FROM mascotas WHERE nombre = 'Miel'),
    (SELECT id FROM proveedores_servicios WHERE nombre = 'Veterinaria El Pastor'),
    '2023-12-15',
    '2024-01-15',
    'Dr. García',
    'Seguimiento y vacunación',
    'Desarrollo normal',
    'Continuar con calendario de vacunación',
    'excelente',
    'Segunda visita',
    2.0,
    85.00,
    'consulta_rutina'
),
(
    (SELECT id FROM mascotas WHERE nombre = 'Miel'),
    (SELECT id FROM proveedores_servicios WHERE nombre = 'Veterinaria El Pastor'),
    '2024-01-15',
    '2024-02-15',
    'Dr. García',
    'Control mensual',
    'Crecimiento adecuado',
    'Continuar con alimentación actual',
    'bueno',
    'Tercer control',
    2.3,
    45.00,
    'consulta_rutina'
),
(
    (SELECT id FROM mascotas WHERE nombre = 'Miel'),
    (SELECT id FROM proveedores_servicios WHERE nombre = 'Veterinaria El Pastor'),
    '2024-02-15',
    '2024-03-15',
    'Dr. García',
    'Control y vacunación',
    'Desarrollo normal',
    'Siguiente vacuna en un mes',
    'bueno',
    'Cuarto control',
    2.5,
    85.00,
    'consulta_rutina'
),
-- Próxima cita (futura)
(
    (SELECT id FROM mascotas WHERE nombre = 'Miel'),
    (SELECT id FROM proveedores_servicios WHERE nombre = 'Veterinaria El Pastor'),
    CURRENT_DATE,
    CURRENT_DATE + INTERVAL '1 month',
    'Dr. García',
    'Control mensual y vacunación',
    'Pendiente',
    'Pendiente',
    'bueno',
    'Próximo control',
    2.5,
    85.00,
    'consulta_rutina'
);

-- Insertar historial de estética
INSERT INTO estetica (
    mascota_id,
    proveedor_id,
    fecha_servicio,
    fecha_proxima_cita,
    nombre_estilista,
    tipo_servicio,
    notas,
    costo,
    categoria_gasto
) VALUES 
(
    (SELECT id FROM mascotas WHERE nombre = 'Miel'),
    (SELECT id FROM proveedores_servicios WHERE nombre = 'Pet Beauty Spa'),
    '2024-01-10',
    '2024-02-10',
    'Ana',
    ARRAY['corte', 'baño', 'uñas'],
    'Primera sesión de estética',
    45.00,
    'estetica'
),
(
    (SELECT id FROM mascotas WHERE nombre = 'Miel'),
    (SELECT id FROM proveedores_servicios WHERE nombre = 'Pet Beauty Spa'),
    '2024-02-10',
    '2024-03-10',
    'Ana',
    ARRAY['corte', 'baño', 'uñas'],
    'Segundo corte',
    45.00,
    'estetica'
),
-- Próxima cita (futura)
(
    (SELECT id FROM mascotas WHERE nombre = 'Miel'),
    (SELECT id FROM proveedores_servicios WHERE nombre = 'Pet Beauty Spa'),
    CURRENT_DATE,
    CURRENT_DATE + INTERVAL '15 days',
    'Ana',
    ARRAY['corte', 'baño', 'uñas'],
    'Próximo corte programado',
    45.00,
    'estetica'
);

-- Insertar vacunas y desparasitaciones
INSERT INTO vacunas_desparasitaciones (
    mascota_id,
    proveedor_id,
    tipo,
    nombre,
    marca,
    fecha_aplicacion,
    fecha_proxima_aplicacion,
    aplicado_por,
    notas,
    costo,
    categoria_gasto
) VALUES 
(
    (SELECT id FROM mascotas WHERE nombre = 'Miel'),
    (SELECT id FROM proveedores_servicios WHERE nombre = 'Veterinaria El Pastor'),
    'vacuna',
    'Parvovirus inicial',
    'VanguardPlus',
    '2023-12-15',
    '2024-01-15',
    'Dr. García',
    'Primera dosis',
    35.00,
    'vacunas'
),
(
    (SELECT id FROM mascotas WHERE nombre = 'Miel'),
    (SELECT id FROM proveedores_servicios WHERE nombre = 'Veterinaria El Pastor'),
    'desparasitacion',
    'Desparasitación inicial',
    'Drontal',
    '2023-12-15',
    '2024-02-15',
    'Dr. García',
    'Primera desparasitación',
    20.00,
    'desparasitacion'
),
(
    (SELECT id FROM mascotas WHERE nombre = 'Miel'),
    (SELECT id FROM proveedores_servicios WHERE nombre = 'Veterinaria El Pastor'),
    'vacuna',
    'Parvovirus refuerzo',
    'VanguardPlus',
    '2024-01-15',
    '2024-02-15',
    'Dr. García',
    'Segunda dosis',
    35.00,
    'vacunas'
),
-- Próximas aplicaciones (futuras)
(
    (SELECT id FROM mascotas WHERE nombre = 'Miel'),
    (SELECT id FROM proveedores_servicios WHERE nombre = 'Veterinaria El Pastor'),
    'vacuna',
    'Polivalente',
    'VanguardPlus',
    CURRENT_DATE,
    CURRENT_DATE + INTERVAL '3 months',
    'Dr. García',
    'Próxima vacuna programada',
    35.00,
    'vacunas'
),
(
    (SELECT id FROM mascotas WHERE nombre = 'Miel'),
    (SELECT id FROM proveedores_servicios WHERE nombre = 'Veterinaria El Pastor'),
    'desparasitacion',
    'Desparasitación trimestral',
    'Drontal',
    CURRENT_DATE,
    CURRENT_DATE + INTERVAL '2 months',
    'Dr. García',
    'Próxima desparasitación programada',
    20.00,
    'desparasitacion'
);