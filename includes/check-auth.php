<?php
// includes/check-auth.php
require_once '../config/database.php';

header('Content-Type: application/json');

if (estConnecte()) {
    echo json_encode([
        'success' => true,
        'authentifie' => true,
        'user' => [
            'id' => $_SESSION['user_id'],
            'name' => $_SESSION['user_name'],
            'email' => $_SESSION['user_email']
        ]
    ]);
} else {
    echo json_encode([
        'success' => true,
        'authentifie' => false
    ]);
}
?>