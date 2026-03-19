<?php
// includes/get-cv.php
require_once '../config/database.php';

header('Content-Type: application/json');

if (!estConnecte()) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Non authentifié']);
    exit();
}

$id = $_GET['id'] ?? 0;

if (!$id) {
    echo json_encode(['success' => false, 'message' => 'ID manquant']);
    exit();
}

try {
    $stmt = $pdo->prepare("SELECT * FROM cvs WHERE id = ? AND utilisateur_id = ?");
    $stmt->execute([$id, $_SESSION['user_id']]);
    $cv = $stmt->fetch();
    
    if (!$cv) {
        echo json_encode(['success' => false, 'message' => 'CV non trouvé']);
        exit();
    }
    
    // Décoder les données JSON
    $donnees = json_decode($cv['donnees_cv'], true);
    if ($donnees === null) {
        $donnees = [];
    }
    
    $response = [
        'success' => true,
        'cv' => [
            'id' => $cv['id'],
            'nom_cv' => $cv['nom_cv'],
            'template' => $cv['template'],
            'date_modification' => $cv['date_modification'],
            'contenu' => $donnees
        ]
    ];
    
    echo json_encode($response);
    
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Erreur base de données']);
}
?>