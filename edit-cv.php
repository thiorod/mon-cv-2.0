<?php
// edit-cv.php - Page de modification
session_start();
require_once 'config/database.php';

// Vérifier si l'utilisateur est connecté
if (!isset($_SESSION['user_id'])) {
    header('Location: index.html');
    exit;
}

// Récupérer l'ID depuis l'URL
$id = $_GET['id'] ?? 0;

// Sélectionner les données
$sql = "SELECT * FROM cvs WHERE id = ? AND utilisateur_id = ?";
$stmt = $pdo->prepare($sql);
$stmt->execute([$id, $_SESSION['user_id']]);
$cv = $stmt->fetch();

// Si le CV n'existe pas, rediriger
if (!$cv) {
    header('Location: dashboard/index.php');
    exit;
}

// Décoder les données JSON
$donnees = json_decode($cv['donnees_cv'], true);
if (!$donnees) {
    $donnees = [];
}

// Traitement de la modification
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['modifier'])) {
    // Récupérer les données du formulaire
    $nom = $_POST['nom'] ?? '';
    $titre = $_POST['titre'] ?? '';
    $adresse = $_POST['adresse'] ?? '';
    $telephone = $_POST['telephone'] ?? '';
    $email = $_POST['email'] ?? '';
    $resume = $_POST['resume'] ?? '';
    $competencesTech = $_POST['competences_techniques'] ?? '';
    $centresInteret = $_POST['centres_interet'] ?? '';
    $linkedin = $_POST['linkedin'] ?? '';
    $github = $_POST['github'] ?? '';
    $portfolio = $_POST['portfolio'] ?? '';
    
    // Mettre à jour les données
    $donnees['nom'] = $nom;
    $donnees['titre'] = $titre;
    $donnees['adresse'] = $adresse;
    $donnees['telephone'] = $telephone;
    $donnees['email'] = $email;
    $donnees['resume'] = $resume;
    $donnees['competencesTech'] = $competencesTech;
    $donnees['centresInteret'] = $centresInteret;
    $donnees['linkedin'] = $linkedin;
    $donnees['github'] = $github;
    $donnees['portfolio'] = $portfolio;
    
    // Requête UPDATE
    $sql = "UPDATE cvs SET nom_cv = ?, donnees_cv = ?, template = ?, date_modification = NOW() WHERE id = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        $cv['nom_cv'],
        json_encode($donnees),
        $_POST['template'] ?? 'simple',
        $id
    ]);
    
    // Redirection
    header('Location: dashboard/index.php?success=1');
    exit;
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Modifier mon CV</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        .preview-img {
            max-width: 150px;
            max-height: 150px;
            border-radius: 8px;
            margin-bottom: 15px;
        }
    </style>
</head>
<body>
    <div class="container mt-5">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2>✏️ Modifier mon CV</h2>
            <a href="dashboard/index.php" class="btn btn-secondary">← Retour</a>
        </div>
        
        <form method="post" class="mt-4" enctype="multipart/form-data">
            <!-- Informations personnelles -->
            <div class="card mb-3">
                <div class="card-header bg-primary text-white">
                    <h5 class="mb-0">Informations personnelles</h5>
                </div>
                <div class="card-body">
                    <div class="mb-3">
                        <label class="form-label">Nom complet <span class="text-danger">*</span></label>
                        <input type="text" name="nom" class="form-control" 
                               value="<?= htmlspecialchars($donnees['nom'] ?? '') ?>" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Titre professionnel</label>
                        <input type="text" name="titre" class="form-control" 
                               value="<?= htmlspecialchars($donnees['titre'] ?? '') ?>">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Adresse</label>
                        <input type="text" name="adresse" class="form-control" 
                               value="<?= htmlspecialchars($donnees['adresse'] ?? '') ?>">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Téléphone <span class="text-danger">*</span></label>
                        <input type="tel" name="telephone" class="form-control" 
                               value="<?= htmlspecialchars($donnees['telephone'] ?? '') ?>" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Email <span class="text-danger">*</span></label>
                        <input type="email" name="email" class="form-control" 
                               value="<?= htmlspecialchars($donnees['email'] ?? '') ?>" required>
                    </div>
                </div>
            </div>
            
            <!-- Résumé -->
            <div class="card mb-3">
                <div class="card-header bg-success text-white">
                    <h5 class="mb-0">Résumé professionnel</h5>
                </div>
                <div class="card-body">
                    <textarea name="resume" class="form-control" rows="3"><?= htmlspecialchars($donnees['resume'] ?? '') ?></textarea>
                </div>
            </div>
            
            <!-- Compétences techniques -->
            <div class="card mb-3">
                <div class="card-header bg-info text-white">
                    <h5 class="mb-0">Compétences techniques</h5>
                </div>
                <div class="card-body">
                    <input type="text" name="competences_techniques" class="form-control" 
                           value="<?= htmlspecialchars($donnees['competencesTech'] ?? '') ?>"
                           placeholder="Ex: JavaScript, PHP, React">
                    <small class="text-muted">Séparez par des virgules</small>
                </div>
            </div>
            
            <!-- Centres d'intérêt -->
            <div class="card mb-3">
                <div class="card-header bg-warning">
                    <h5 class="mb-0">Centres d'intérêt</h5>
                </div>
                <div class="card-body">
                    <input type="text" name="centres_interet" class="form-control" 
                           value="<?= htmlspecialchars($donnees['centresInteret'] ?? '') ?>"
                           placeholder="Ex: Lecture, Voyages, Sport">
                    <small class="text-muted">Séparez par des virgules</small>
                </div>
            </div>
            
            <!-- Réseaux sociaux -->
            <div class="card mb-3">
                <div class="card-header bg-secondary text-white">
                    <h5 class="mb-0">Réseaux sociaux</h5>
                </div>
                <div class="card-body">
                    <div class="mb-2">
                        <label>LinkedIn</label>
                        <input type="url" name="linkedin" class="form-control" 
                               value="<?= htmlspecialchars($donnees['linkedin'] ?? '') ?>"
                               placeholder="https://linkedin.com/in/...">
                    </div>
                    <div class="mb-2">
                        <label>GitHub</label>
                        <input type="url" name="github" class="form-control" 
                               value="<?= htmlspecialchars($donnees['github'] ?? '') ?>"
                               placeholder="https://github.com/...">
                    </div>
                    <div class="mb-2">
                        <label>Portfolio</label>
                        <input type="url" name="portfolio" class="form-control" 
                               value="<?= htmlspecialchars($donnees['portfolio'] ?? '') ?>"
                               placeholder="https://...">
                    </div>
                </div>
            </div>
            
          
           <!-- Template -->
<div class="card mb-3">
    <div class="card-header bg-dark text-white">
        <h5 class="mb-0">Template</h5>
    </div>
    <div class="card-body">
        <select name="template" class="form-select">
            <option value="simple" <?= ($cv['template'] ?? 'simple') == 'simple' ? 'selected' : '' ?>>Par défaut</option>
            <option value="bleu" <?= ($cv['template'] ?? '') == 'bleu' ? 'selected' : '' ?>>Template 1</option>
            <option value="vert" <?= ($cv['template'] ?? '') == 'vert' ? 'selected' : '' ?>>Template 2</option>
        </select>
    </div>
</div>
            <!-- Boutons -->
            <div class="d-flex gap-2 mb-5">
                <button type="submit" name="modifier" class="btn btn-primary btn-lg">Enregistrer les modifications</button>
                <a href="dashboard/index.php" class="btn btn-secondary btn-lg">Annuler</a>
            </div>
        </form>
    </div>
</body>
</html>