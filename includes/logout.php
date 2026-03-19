<?php
// includes/logout.php
require_once '../config/database.php';

session_destroy();
header('Location: ../index.html');
exit();
?>