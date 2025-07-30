INSERT INTO DIETS (ID, CONTENT, DESCRIPTION, TITLE, TYPE) VALUES
(1, 'Desayuno: huevos revueltos con aguacate. Almuerzo: pollo a la plancha con verduras. Cena: salmón con espárragos.', 'Dieta alta en grasas saludables y baja en carbohidratos', 'Dieta Keto', 'CARNE'),
(2, 'Desayuno: avena con frutas. Almuerzo: ensalada de quinoa. Cena: tofu con arroz integral.', 'Dieta basada en plantas sin productos animales', 'Dieta Vegana', 'VEGANO'),
(3, 'Desayuno: yogur con granola. Almuerzo: pechuga de pollo con arroz. Cena: pescado con ensalada.', 'Plan equilibrado con proteínas, carbohidratos y grasas', 'Dieta Balanceada', 'CARNE'),
(4, 'Desayuno: batido de proteínas. Almuerzo: carne magra con arroz. Cena: claras de huevo con espinaca.', 'Dieta rica en proteínas para ganar masa muscular', 'Dieta de Volumen', 'CARNE'),
(5, 'Desayuno: té verde y frutas. Almuerzo: ensalada con atún. Cena: sopa de verduras.', 'Baja en calorías para promover la pérdida de grasa', 'Dieta de Definición', 'CARNE');

INSERT INTO ROUTINES (ID, CONTENT, DESCRIPTION, LEVEL, TITLE) VALUES
(1, 'Lunes: Sentadillas, press banca. Miércoles: Peso muerto, dominadas. Viernes: Fondos, remo con barra.', 'Rutina de cuerpo completo para principiantes', 'INFERIOR', 'Full Body Principiante'),
(2, 'Lunes: Pecho y tríceps. Martes: Espalda y bíceps. Jueves: Piernas. Viernes: Hombros y abdomen.', 'División clásica para intermedios', 'MEDIO', 'Split de 4 días'),
(3, 'Lunes a sábado: entrenamiento por grupos musculares con intensidad y superseries.', 'Programa avanzado de hipertrofia', 'SUPERIOR', 'Rutina Avanzada de Volumen'),
(4, 'Entrenamiento funcional con ejercicios de peso corporal: burpees, sentadillas, flexiones, planchas.', 'Ideal para hacer en casa sin equipamiento', 'INFERIOR', 'Rutina Funcional en Casa'),
(5, 'Alterna entre cardio de alta intensidad y fuerza muscular en circuito.', 'Quema grasa y mejora resistencia', 'MEDIO', 'Rutina HIIT + Fuerza');


INSERT INTO PRODUCTS (ID, CATEGORY, DESCRIPTION, IMAGE_URL, NAME, PRICE, SIZE) VALUES
(1, 'Suplemento', 'Proteína whey para recuperación muscular post-entreno', 'https://example.com/images/whey.png', 'Whey Protein 2lb', 49.99, '2lb'),
(2, 'Accesorio', 'Guantes de entrenamiento con agarre antideslizante', 'https://example.com/images/gloves.png', 'Guantes de Gimnasio', 14.99, 'Talla M'),
(3, 'Suplemento', 'Creatina monohidratada para fuerza y potencia', 'https://example.com/images/creatine.png', 'Creatina 300g', 19.99, '300g'),
(4, 'Ropa', 'Camiseta deportiva de secado rápido', 'https://example.com/images/shirt.png', 'Camiseta DryFit', 24.99, 'L'),
(5, 'Accesorio', 'Botella shaker con compartimento para suplementos', 'https://example.com/images/shaker.png', 'Shaker 600ml', 9.99, '600ml');

INSERT INTO users (email, password, name, age, role) VALUES 
('admin@gymfit.com', '$2a$12$PBH4W6ceIBv1O/G77kqP6eLz91k1s0bvvgnT4bH26GwtA7OCjzYvy', 'Administrador', 30, 'ADMIN');
