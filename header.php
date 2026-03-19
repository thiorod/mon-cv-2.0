<?php
// header.php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Définir le chemin de base
$basePath = '';
if (basename(dirname($_SERVER['PHP_SELF'])) === 'dashboard') {
    $basePath = '../';
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mon CV 2.0 - <?= $pageTitle ?? 'Accueil' ?></title>
    <link rel="stylesheet" href="<?= $basePath ?>style.css">
    <?php if (isset($extraStyles)): ?>
        <?= $extraStyles ?>
    <?php endif; ?>
</head>
<body>
    <div class="container">
        <?php if (isset($_SESSION['user_id']) && !isset($hideBanner)): ?>
            <div class="auth-banner" style="margin-top: 0;">
                <span> Connecté en tant que <strong><?= htmlspecialchars($_SESSION['user_name']) ?></strong></span>
                <div>              
                    <a href="<?= $basePath ?>includes/logout.php"> Déconnexion</a>
                </div>
            </div>
        <?php endif; ?>