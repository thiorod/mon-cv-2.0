<?php
// dashboard/index.php
$pageTitle = "Tableau de bord";
require_once '../header.php';

require_once '../config/database.php';

if (!estConnecte()) {
    header('Location: ../index.html');
    exit();
}

// Récupérer les CV de l'utilisateur
$stmt = $pdo->prepare("SELECT id, nom_cv, template, date_modification FROM cvs WHERE utilisateur_id = ? ORDER BY date_modification DESC");
$stmt->execute([$_SESSION['user_id']]);
$cvs = $stmt->fetchAll();
?>

<style>
    .dashboard-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 30px 0;
    }
    .dashboard-header h1 {
        color: white;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
        font-size: 2rem;
    }
    .cvs-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 20px;
        margin-top: 20px;
    }
    .cv-card {
        background: white;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        padding: 20px;
        transition: transform 0.3s, box-shadow 0.3s;
        border: none;
    }
    .cv-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 40px rgba(0,0,0,0.3);
    }
    .cv-card h3 {
        color: #667eea;
        margin-bottom: 10px;
        font-size: 1.3rem;
    }
    .cv-card p {
        color: #666;
        font-size: 0.9rem;
        margin-bottom: 15px;
    }
    .cv-actions {
        display: flex;
        gap: 10px;
        margin-top: 15px;
    }
    .btn-load {
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        padding: 8px 15px;
        border: none;
        border-radius: 10px;
        cursor: pointer;
        flex: 1;
        text-align: center;
        text-decoration: none;
        transition: all 0.3s ease;
        box-shadow: 0 4px 10px rgba(102, 126, 234, 0.3);
    }
    .btn-load:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 15px rgba(102, 126, 234, 0.4);
    }
    .btn-delete {
        background: #e74c3c;
        color: white;
        padding: 8px 15px;
        border: none;
        border-radius: 10px;
        cursor: pointer;
        flex: 1;
        text-align: center;
        text-decoration: none;
        transition: all 0.3s ease;
        box-shadow: 0 4px 10px rgba(231, 76, 60, 0.3);
    }
    .btn-delete:hover {
        background: #c0392b;
        transform: translateY(-2px);
        box-shadow: 0 6px 15px rgba(231, 76, 60, 0.4);
    }
    .btn-new {
        background: linear-gradient(135deg, #27ae60, #2ecc71);
        color: white;
        padding: 12px 25px;
        border: none;
        border-radius: 10px;
        cursor: pointer;
        text-decoration: none;
        display: inline-block;
        font-weight: 600;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(39, 174, 96, 0.3);
    }
    .btn-new:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(39, 174, 96, 0.4);
    }
    .success-message {
        background: #d4edda;
        color: #155724;
        padding: 15px;
        border-radius: 10px;
        margin: 20px 0;
        border-left: 4px solid #27ae60;
        box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    }
    .no-cvs {
        text-align: center;
        padding: 50px;
        background: white;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        border: none;
    }
    .no-cvs p {
        margin-bottom: 20px;
        color: #666;
        font-size: 1.1rem;
    }
</style>

<div class="dashboard-header">
    <h1> Mon CV 2.0 - Mes CV</h1>
    <div>
        <a href="../index.html" class="btn-new">➕ Nouveau CV</a>
    </div>
</div>

<?php if (isset($_GET['success'])): ?>
    <div class="success-message">✅ CV modifié avec succès !</div>
<?php endif; ?>

<?php if (isset($_GET['deleted'])): ?>
    <div class="success-message">✅ CV supprimé avec succès !</div>
<?php endif; ?>

<?php if (empty($cvs)): ?>
    <div class="no-cvs">
        <p>Vous n'avez pas encore de CV.</p>
        <a href="../index.html" class="btn-new">Créer mon premier CV</a>
    </div>
<?php else: ?>
    <div class="cvs-grid">
        <?php foreach ($cvs as $cv): ?>
            <div class="cv-card">
                <h3><?= htmlspecialchars($cv['nom_cv']) ?></h3>
                <p>
                    Template: <?= ucfirst($cv['template']) ?><br>
                    Modifié le : <?= date('d/m/Y H:i', strtotime($cv['date_modification'])) ?>
                </p>
                <div class="cv-actions">
                    <a href="../index.html?load=<?= $cv['id'] ?>" class="btn-load"> Charger</a>
                    <a href="delete-cv.php?id=<?= $cv['id'] ?>" class="btn-delete" onclick="return confirm('Supprimer ce CV définitivement ?')"> Supprimer</a>
                </div>
            </div>
        <?php endforeach; ?>
    </div>
<?php endif; ?>

<?php
require_once '../footer.php';
?>