CREATE SCHEMA IF NOT EXISTS proyectoTI;
USE proyectoTI;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    contraseña VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock varchar(100) NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE NO ACTION
);

INSERT INTO users (usuario, email, contraseña) VALUES
('Juan Perez', 'juan2000@example.com', 'password1'),
('Maria Quinteros', 'maryQ6@example.com', 'password2'),
('Jose García', 'garziajosee@example.com', 'password3'),
('Emma Martinez', 'Emii1234@example.com', 'password4'),
('Sol Fernandez', 'Solci14@example.com', 'password5');


INSERT INTO products (name, description, price, stock, user_id) VALUES
('European skirt', 'Pollera de gasa con sutiles pliegues', 100.00,35, 1),
('Top flower', 'Top con estampado de flor hawaiana', 200.00,33, 1),
('Short malaga', 'Bermuda de jean tiro bajo', 150.00,8, 2),
('Ghotic chocker', 'Collar con dije de corazon plateado', 250.00,19, 3),
('Valencia Boots', 'Botas negras con dije', 300.00,26, 4);
