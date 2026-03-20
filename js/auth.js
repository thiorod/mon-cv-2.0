// js/auth.js - Version simplifiée

function checkAuthStatus() {
    fetch('includes/check-auth.php')
        .then(r => r.json())
        .then(data => {
            const banner = document.getElementById('auth-banner');
            const saveBtn = document.getElementById('save-cv');
            
            if (data.authentifie) {
                banner.innerHTML = `
                    <span> Connecté en tant que <strong>${data.user.name}</strong></span>
                    <div>
                        <a href="#" onclick="showMyCVs()"> Mes CV</a>
                        <a href="includes/logout.php"> Déconnexion</a>
                    </div>
                `;
                saveBtn.style.display = 'inline-block';
                saveBtn.onclick = saveCurrentCV;
                
                const urlParams = new URLSearchParams(window.location.search);
                const loadId = urlParams.get('load');
                if (loadId) loadCV(loadId);
            } else {
                banner.innerHTML = `
                    <span>🔒 Vous n'êtes pas connecté</span>
                    <button onclick="showAuthModal()">Se connecter</button>
                `;
                saveBtn.style.display = 'none';
                
                const urlParams = new URLSearchParams(window.location.search);
                if (!urlParams.get('load')) {
                    setTimeout(restaurerSauvegarde, 500);
                }
            }
        });
}

function showAuthModal() {
    document.getElementById('auth-modal').style.display = 'block';
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('register-form').style.display = 'none';
}

function showRegister() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'block';
}

function showLogin() {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('register-form').style.display = 'none';
}

function registerUser() {
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    
    if (!name || !email || !password) {
        alert('Tous les champs sont requis');
        return;
    }
    
    if (!validerEmail(email)) {
        alert('Email invalide');
        return;
    }
    
    // ✅ Validation simplifiée : seulement 6 caractères
    if (password.length < 6) {
        alert('❌ Le mot de passe doit contenir au moins 6 caractères');
        return;
    }
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    
    fetch('includes/register.php', { method: 'POST', body: formData })
        .then(r => r.json())
        .then(data => {
            if (data.success) {
                alert('✅ Inscription réussie');
                document.getElementById('auth-modal').style.display = 'none';
                checkAuthStatus();
            } else {
                alert('❌ ' + data.message);
            }
        });
}

function loginUser() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    if (!email || !password) {
        alert('Email et mot de passe requis');
        return;
    }
    
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    
    fetch('includes/login.php', { method: 'POST', body: formData })
        .then(r => r.json())
        .then(data => {
            if (data.success) {
                alert('✅ Connexion réussie');
                document.getElementById('auth-modal').style.display = 'none';
                checkAuthStatus();
            } else {
                alert('❌ ' + data.message);
            }
        });
}

function showMyCVs() {
    window.location.href = 'dashboard/index.php';
}