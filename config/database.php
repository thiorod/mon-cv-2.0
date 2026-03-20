<?php
// config/database.php

// Démarrer la session UNIQUEMENT si elle n'est pas déjà active
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

$host = 'localhost';
$dbname = 'cv_generator_test'; 
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch(PDOException $e) {
    die(json_encode(['success' => false, 'message' => 'Erreur de connexion BDD']));
}

function estConnecte() {
    return isset($_SESSION['user_id']);
}

function rediriger($url) {
    header("Location: $url");
    exit();
}
?>