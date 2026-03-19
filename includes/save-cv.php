<?php
// includes/save-cv.php
require_once '../config/database.php';

header('Content-Type: application/json');

if (!estConnecte()) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Non authentifié']);
    exit();
}

// Fonction upload photo (comme dans ton ancien projet)
function uploadPhoto() {
    if (empty($_FILES['photo']['name'])) {
        return '';
    }
    
    $targetDir = __DIR__ . '/../uploads/';
    
    if (!file_exists($targetDir)) {
        mkdir($targetDir, 0777, true);
    }
    
    $fileName = time() . '_' . basename($_FILES['photo']['name']);
    $targetFile = $targetDir . $fileName;
    
    $imageFileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));
    $allowedTypes = ['jpg', 'jpeg', 'png', 'gif'];
    
    if (!in_array($imageFileType, $allowedTypes)) {
        return false;
    }
    
    if (move_uploaded_file($_FILES['photo']['tmp_name'], $targetFile)) {
        return 'uploads/' . $fileName;
    }
    
    return false;
}

try {
    // Récupérer l'ID (mise à jour ou création)
    $cvId = $_POST['id'] ?? null;
    
    // Upload de la photo
    $photoPath = uploadPhoto();
    
    // Récupérer les expériences, formations et langues (JSON)
    $experiences = isset($_POST['experiences']) ? json_decode($_POST['experiences'], true) : [];
    $formations = isset($_POST['formations']) ? json_decode($_POST['formations'], true) : [];
    $langues = isset($_POST['langues']) ? json_decode($_POST['langues'], true) : [];
    
    // Si pas de nouvelle photo mais qu'on a un ID (modification), conserver l'ancienne
    if (!$photoPath && $cvId) {
        $stmt = $pdo->prepare("SELECT donnees_cv FROM cvs WHERE id = ? AND utilisateur_id = ?");
        $stmt->execute([$cvId, $_SESSION['user_id']]);
        $oldCv = $stmt->fetch();
        if ($oldCv) {
            $oldData = json_decode($oldCv['donnees_cv'], true);
            $photoPath = $oldData['photo'] ?? '';
        }
    }
    
    // Construire les données à sauvegarder (TOUTES les sections)
    $contenu = [
        // Informations personnelles
        'nom' => $_POST['nom'] ?? '',
        'titre' => $_POST['titre'] ?? '',
        'adresse' => $_POST['adresse'] ?? '',
        'telephone' => $_POST['telephone'] ?? '',
        'email' => $_POST['email'] ?? '',
        
        // Résumé
        'resume' => $_POST['resume'] ?? '',
        
        // Compétences techniques
        'competencesTech' => $_POST['competencesTech'] ?? '',
        
        // Centres d'intérêt
        'centresInteret' => $_POST['centresInteret'] ?? '',
        
        // Réseaux sociaux
        'linkedin' => $_POST['linkedin'] ?? '',
        'github' => $_POST['github'] ?? '',
        'portfolio' => $_POST['portfolio'] ?? '',
        
        // Photo
        'photo' => $photoPath,
        
        // Sections dynamiques
        'experiences' => $experiences,
        'formations' => $formations,
        'langues' => $langues
    ];
    
    // Vérifier si c'est une mise à jour ou une création
    if ($cvId) {
        // ✅ MISE À JOUR
        $stmt = $pdo->prepare("
            UPDATE cvs 
            SET nom_cv = ?, donnees_cv = ?, template = ?, date_modification = NOW() 
            WHERE id = ? AND utilisateur_id = ?
        ");
        $stmt->execute([
            $_POST['nom_cv'],
            json_encode($contenu),
            $_POST['template'] ?? 'moderne',
            $cvId,
            $_SESSION['user_id']
        ]);
        
        echo json_encode(['success' => true, 'message' => 'CV mis à jour avec succès']);
    } else {
        // ✅ CRÉATION
        $stmt = $pdo->prepare("
            INSERT INTO cvs (utilisateur_id, nom_cv, donnees_cv, template, date_modification) 
            VALUES (?, ?, ?, ?, NOW())
        ");
        $stmt->execute([
            $_SESSION['user_id'],
            $_POST['nom_cv'],
            json_encode($contenu),
            $_POST['template'] ?? 'moderne'
        ]);
        
        echo json_encode(['success' => true, 'message' => 'CV créé avec succès']);
    }
    
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Erreur base de données: ' . $e->getMessage()]);
}
?>