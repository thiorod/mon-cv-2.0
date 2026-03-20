<?php
// includes/register.php - Version simplifiée
require_once '../config/database.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Méthode non autorisée']);
    exit();
}

$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';

if (empty($name) || empty($email) || empty($password)) {
    echo json_encode(['success' => false, 'message' => 'Tous les champs sont requis']);
    exit();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Email invalide']);
    exit();
}

// ✅ Validation simplifiée : seulement 6 caractères
if (strlen($password) < 6) {
    echo json_encode(['success' => false, 'message' => 'Le mot de passe doit contenir au moins 6 caractères']);
    exit();
}

try {
    // Vérifier si l'email existe déjà
    $stmt = $pdo->prepare("SELECT id FROM utilisateurs WHERE email = ?");
    $stmt->execute([$email]);
    
    if ($stmt->fetch()) {
        echo json_encode(['success' => false, 'message' => 'Cet email est déjà utilisé']);
        exit();
    }
    
    // Hasher le mot de passe
    $hash = password_hash($password, PASSWORD_DEFAULT);
    
    // Insérer le nouvel utilisateur
    $stmt = $pdo->prepare("INSERT INTO utilisateurs (nom, email, mot_de_passe, date_inscription) VALUES (?, ?, ?, NOW())");
    $stmt->execute([$name, $email, $hash]);
    
    $userId = $pdo->lastInsertId();
    
    // Connecter l'utilisateur automatiquement
    $_SESSION['user_id'] = $userId;
    $_SESSION['user_name'] = $name;
    $_SESSION['user_email'] = $email;
    
    echo json_encode([
        'success' => true,
        'message' => 'Inscription réussie',
        'user' => [
            'id' => $userId,
            'name' => $name,
            'email' => $email
        ]
    ]);
    
} catch (PDOException $e) {
    error_log("Erreur register: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Erreur base de données']);
}
?>