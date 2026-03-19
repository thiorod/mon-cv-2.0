<?php
// dashboard/delete-cv.php
require_once '../config/database.php';

if (!estConnecte()) {
    header('Location: ../index.html');
    exit();
}

$id = $_GET['id'] ?? 0;

if ($id) {
    $stmt = $pdo->prepare("DELETE FROM cvs WHERE id = ? AND utilisateur_id = ?");
    $stmt->execute([$id, $_SESSION['user_id']]);
}

header('Location: index.php?deleted=1');
exit();
?>