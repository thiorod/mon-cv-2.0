
-- Script de création de la base de données pour Mon CV 2.0


-- Création de la base de données
CREATE DATABASE IF NOT EXISTS cv_generator CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

USE cv_generator;

-- Table des utilisateurs
CREATE TABLE IF NOT EXISTS utilisateurs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    mot_de_passe VARCHAR(255) NOT NULL,
    date_inscription DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table des CV
CREATE TABLE IF NOT EXISTS cvs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    utilisateur_id INT NOT NULL,
    nom_cv VARCHAR(100) NOT NULL,
    donnees_cv JSON NOT NULL,
    template VARCHAR(50) DEFAULT 'simple',
    date_creation DATETIME DEFAULT CURRENT_TIMESTAMP,
    date_modification DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Index 
CREATE INDEX idx_utilisateur_id ON cvs(utilisateur_id);
CREATE INDEX idx_nom_cv ON cvs(nom_cv);