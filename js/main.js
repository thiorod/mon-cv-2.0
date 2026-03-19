// js/main.js - Point d'entrée principal

document.addEventListener('DOMContentLoaded', function() {
    console.log('Mon CV 2.0 initialisé');
    
    // Initialisation des premières entrées
    if (typeof ajouterExperience === 'function') ajouterExperience();
    if (typeof ajouterFormation === 'function') ajouterFormation();
    if (typeof ajouterLangue === 'function') ajouterLangue();
    
    //  template par défaut
    if (typeof appliquerTemplate === 'function') {
        appliquerTemplate('simple');
    } else {
        document.getElementById('template-select').value = 'simple';
        document.getElementById('cv-preview').className = 'cv-preview template-simple';
    }
    
    // Initialiser le sélecteur de template
    if (typeof initTemplateSelector === 'function') {
        initTemplateSelector();
    }
    
    // Écouteurs des boutons d'ajout
    const btnExp = document.getElementById('ajouter-experience');
    if (btnExp && typeof ajouterExperience === 'function') {
        btnExp.addEventListener('click', ajouterExperience);
    }
    
    const btnForm = document.getElementById('ajouter-formation');
    if (btnForm && typeof ajouterFormation === 'function') {
        btnForm.addEventListener('click', ajouterFormation);
    }
    
    const btnLang = document.getElementById('ajouter-langue');
    if (btnLang && typeof ajouterLangue === 'function') {
        btnLang.addEventListener('click', ajouterLangue);
    }
    
    // Écouteur pour l'apeçu
    const form = document.getElementById('cv-form');
    if (form && typeof mettreAJourPreview === 'function') {
        form.addEventListener('input', mettreAJourPreview);
    }
    
    // Gestionnaire pour l'upload de photo
    const photoUpload = document.getElementById('photo-upload');
    if (photoUpload) {
        photoUpload.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                if (!file.type.match('image.*')) {
                    alert('Veuillez sélectionner une image valide');
                    return;
                }
                
                if (file.size > 2 * 1024 * 1024) {
                    alert('L\'image ne doit pas dépasser 2Mo');
                    return;
                }
                
                const reader = new FileReader();
                reader.onload = function(event) {
                    const preview = document.getElementById('photo-preview');
                    preview.src = event.target.result;
                    preview.style.display = 'block';
                    document.getElementById('remove-photo').style.display = 'block';
                    if (typeof mettreAJourPreview === 'function') mettreAJourPreview();
                };
                reader.readAsDataURL(file);
            }
        });
    }
    
    // Gestionnaire pour supprimer la photo
    const removePhoto = document.getElementById('remove-photo');
    if (removePhoto) {
        removePhoto.addEventListener('click', function() {
            document.getElementById('photo-upload').value = '';
            document.getElementById('photo-preview').src = '#';
            document.getElementById('photo-preview').style.display = 'none';
            this.style.display = 'none';
            if (typeof mettreAJourPreview === 'function') mettreAJourPreview();
        });
    }
    
    // Gestionnaire pour le téléchargement PDF
const downloadBtn = document.getElementById('download-pdf');
if (downloadBtn) {
    downloadBtn.addEventListener('click', function() {
        const element = document.getElementById('cv-preview');
        const template = document.getElementById('template-select').value;
        
        // Récupérer le nom de la personne pour personnaliser le fichier
        const nom = document.getElementById('nom-complet')?.value || 'CV';
        const nomFichier = nom.replace(/\s+/g, '_') + '.pdf';
        
        const opt = {
            margin:        [0.3, 0.3, 0.3, 0.3],
            filename:      nomFichier,
            image:         { type: 'jpeg', quality: 0.98 },
            html2canvas:   { scale: 1.5, logging: false },
            jsPDF:         { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        
        html2pdf().set(opt).from(element).save();
    });
}
    
    // Gestionnaire pour la validation du mot de passe
    const registerPassword = document.getElementById('register-password');
    if (registerPassword && typeof evaluerForceMotDePasse === 'function') {
        registerPassword.addEventListener('input', function() {
            const password = this.value;
            const force = evaluerForceMotDePasse(password);
            const barre = document.querySelector('.password-strength-bar');
            
            if (barre) {
                barre.className = 'password-strength-bar ' + force;
            }
        });
    }
    
    // Vérifier l'authentification
    if (typeof checkAuthStatus === 'function') {
        checkAuthStatus();
    }
    
    // Sauvegarde automatique
    setInterval(function() {
        const saveBtn = document.getElementById('save-cv');
        if (saveBtn && saveBtn.style.display !== 'inline-block') {
            if (typeof sauvegarderBrouillon === 'function') {
                sauvegarderBrouillon();
            }
        }
    }, 30000);
    
    // Première aperçu
    if (typeof mettreAJourPreview === 'function') {
        mettreAJourPreview();
    }
});

// Fermeture des modals
document.querySelectorAll('.close-modal').forEach(btn => {
    if (btn) {
        btn.onclick = function() {
            const modal = this.closest('.modal');
            if (modal) modal.style.display = 'none';
        };
    }
});

window.onclick = function(event) {
    if (event.target && event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
};