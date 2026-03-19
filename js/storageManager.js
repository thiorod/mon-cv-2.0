// js/storageManager.js - Gestion du localStorage et des CV

function sauvegarderBrouillon() {
    const saveBtn = document.getElementById('save-cv');
    if (saveBtn.style.display === 'inline-block') return;
    
    const experiences = [];
    document.querySelectorAll('.experience-item').forEach(exp => {
        experiences.push({
            entreprise: exp.querySelector('.entreprise-input')?.value || '',
            poste: exp.querySelector('.poste-input')?.value || '',
            dateDebut: exp.querySelector('.date-debut-input')?.value || '',
            dateFin: exp.querySelector('.date-fin-input')?.value || '',
            description: exp.querySelector('.description-input')?.value || ''
        });
    });
    
    const formations = [];
    document.querySelectorAll('.formation-item').forEach(formation => {
        formations.push({
            ecole: formation.querySelector('.ecole-input')?.value || '',
            diplome: formation.querySelector('.diplome-input')?.value || '',
            anneeDebut: formation.querySelector('.annee-debut-input')?.value || '',
            anneeFin: formation.querySelector('.annee-fin-input')?.value || ''
        });
    });
    
    const langues = [];
    document.querySelectorAll('.langue-item').forEach(langue => {
        langues.push({
            nom: langue.querySelector('.langue-nom-input')?.value || '',
            niveau: langue.querySelector('.langue-niveau-input')?.value || ''
        });
    });
    
    const data = {
        nom: document.getElementById('nom-complet')?.value || '',
        titre: document.getElementById('titre')?.value || '',
        adresse: document.getElementById('adresse')?.value || '',
        telephone: document.getElementById('telephone')?.value || '',
        email: document.getElementById('email')?.value || '',
        resume: document.getElementById('resume')?.value || '',
        competencesTech: document.getElementById('competences-techniques')?.value || '',
        centresInteret: document.getElementById('centres-interet')?.value || '',
        linkedin: document.getElementById('linkedin')?.value || '',
        github: document.getElementById('github')?.value || '',
        portfolio: document.getElementById('portfolio')?.value || '',
        template: document.getElementById('template-select')?.value || 'simple',
        experiences: experiences,
        formations: formations,
        langues: langues
    };
    
    localStorage.setItem('cvBrouillon', JSON.stringify(data));
    console.log('✅ Brouillon sauvegardé');
}

function restaurerSauvegarde() {
    const saveBtn = document.getElementById('save-cv');
    if (saveBtn && saveBtn.style.display === 'inline-block') return;

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('load')) {
        localStorage.removeItem('cvBrouillon');
        return;
    }

    const sauvegardeJson = localStorage.getItem('cvBrouillon');
    if (!sauvegardeJson) return;

    const nomActuel = document.getElementById('nom-complet')?.value || '';
    if (nomActuel) return;

    if (confirm('Voulez-vous restaurer votre dernier brouillon ?')) {
        try {
            const data = JSON.parse(sauvegardeJson);
            
            document.getElementById('nom-complet').value = data.nom || '';
            document.getElementById('titre').value = data.titre || '';
            document.getElementById('adresse').value = data.adresse || '';
            document.getElementById('telephone').value = data.telephone || '';
            document.getElementById('email').value = data.email || '';
            document.getElementById('resume').value = data.resume || '';
            document.getElementById('competences-techniques').value = data.competencesTech || '';
            document.getElementById('centres-interet').value = data.centresInteret || '';
            document.getElementById('linkedin').value = data.linkedin || '';
            document.getElementById('github').value = data.github || '';
            document.getElementById('portfolio').value = data.portfolio || '';
            
            if (data.template) {
                document.getElementById('template-select').value = data.template;
                document.getElementById('cv-preview').className = 'cv-preview template-' + data.template;
            } else {
                document.getElementById('template-select').value = 'simple';
                document.getElementById('cv-preview').className = 'cv-preview template-simple';
            }
            
            if (data.experiences?.length) {
                document.getElementById('conteneur-experiences').innerHTML = '';
                compteurExperiences = 0;
                data.experiences.forEach(exp => {
                    ajouterExperience();
                    const last = document.querySelector('.experience-item:last-child');
                    if (last) {
                        last.querySelector('.entreprise-input').value = exp.entreprise || '';
                        last.querySelector('.poste-input').value = exp.poste || '';
                        last.querySelector('.date-debut-input').value = exp.dateDebut || '';
                        last.querySelector('.date-fin-input').value = exp.dateFin || '';
                        last.querySelector('.description-input').value = exp.description || '';
                    }
                });
            } else {
                ajouterExperience();
            }
            
            if (data.formations?.length) {
                document.getElementById('conteneur-formations').innerHTML = '';
                compteurFormations = 0;
                data.formations.forEach(formation => {
                    ajouterFormation();
                    const last = document.querySelector('.formation-item:last-child');
                    if (last) {
                        last.querySelector('.ecole-input').value = formation.ecole || '';
                        last.querySelector('.diplome-input').value = formation.diplome || '';
                        last.querySelector('.annee-debut-input').value = formation.anneeDebut || '';
                        last.querySelector('.annee-fin-input').value = formation.anneeFin || '';
                    }
                });
            } else {
                ajouterFormation();
            }
            
            if (data.langues?.length) {
                document.getElementById('conteneur-langues').innerHTML = '';
                compteurLangues = 0;
                data.langues.forEach(langue => {
                    ajouterLangue();
                    const last = document.querySelector('.langue-item:last-child');
                    if (last) {
                        last.querySelector('.langue-nom-input').value = langue.nom || '';
                        last.querySelector('.langue-niveau-input').value = langue.niveau || '';
                    }
                });
            } else {
                ajouterLangue();
            }
            
            mettreAJourPreview();
            console.log('✅ Brouillon restauré');
        } catch (e) {
            console.error('Erreur restauration:', e);
        }
    }
}

function saveCurrentCV() {
    const nomCV = prompt('Nom de ce CV :', 'Mon CV');
    if (!nomCV) return;
    
    if (!validerFormulaire()) {
        alert('Veuillez corriger les erreurs avant de sauvegarder');
        return;
    }
    
    const formData = new FormData();
    
    const urlParams = new URLSearchParams(window.location.search);
    const cvId = urlParams.get('load');
    if (cvId) formData.append('id', cvId);
    
    formData.append('nom_cv', nomCV);
    formData.append('template', document.getElementById('template-select').value || 'simple');
    formData.append('nom', document.getElementById('nom-complet')?.value || '');
    formData.append('titre', document.getElementById('titre')?.value || '');
    formData.append('adresse', document.getElementById('adresse')?.value || '');
    formData.append('telephone', document.getElementById('telephone')?.value || '');
    formData.append('email', document.getElementById('email')?.value || '');
    formData.append('resume', document.getElementById('resume')?.value || '');
    formData.append('competencesTech', document.getElementById('competences-techniques')?.value || '');
    formData.append('centresInteret', document.getElementById('centres-interet')?.value || '');
    formData.append('linkedin', document.getElementById('linkedin')?.value || '');
    formData.append('github', document.getElementById('github')?.value || '');
    formData.append('portfolio', document.getElementById('portfolio')?.value || '');
    
    const photoInput = document.getElementById('photo-upload');
    if (photoInput.files.length > 0) {
        formData.append('photo', photoInput.files[0]);
    }
    
    const experiences = [];
    document.querySelectorAll('.experience-item').forEach(exp => {
        experiences.push({
            entreprise: exp.querySelector('.entreprise-input')?.value || '',
            poste: exp.querySelector('.poste-input')?.value || '',
            dateDebut: exp.querySelector('.date-debut-input')?.value || '',
            dateFin: exp.querySelector('.date-fin-input')?.value || '',
            description: exp.querySelector('.description-input')?.value || ''
        });
    });
    formData.append('experiences', JSON.stringify(experiences));
    
    const formations = [];
    document.querySelectorAll('.formation-item').forEach(formation => {
        formations.push({
            ecole: formation.querySelector('.ecole-input')?.value || '',
            diplome: formation.querySelector('.diplome-input')?.value || '',
            anneeDebut: formation.querySelector('.annee-debut-input')?.value || '',
            anneeFin: formation.querySelector('.annee-fin-input')?.value || ''
        });
    });
    formData.append('formations', JSON.stringify(formations));
    
    const langues = [];
    document.querySelectorAll('.langue-item').forEach(langue => {
        langues.push({
            nom: langue.querySelector('.langue-nom-input')?.value || '',
            niveau: langue.querySelector('.langue-niveau-input')?.value || ''
        });
    });
    formData.append('langues', JSON.stringify(langues));
    
    fetch('includes/save-cv.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('✅ CV sauvegardé avec succès !');
            localStorage.removeItem('cvBrouillon');
            setTimeout(() => window.location.href = 'dashboard/index.php', 1500);
        } else {
            alert('❌ Erreur : ' + data.message);
        }
    })
    .catch(error => {
        console.error('Erreur:', error);
        alert('Erreur de communication');
    });
}

function loadCV(id) {
    console.log('📥 Chargement ID:', id);
    localStorage.removeItem('cvBrouillon');
    
    fetch('includes/get-cv.php?id=' + id)
        .then(r => r.json())
        .then(data => {
            if (!data.success) {
                alert('Erreur: ' + data.message);
                return;
            }
            
            const contenu = data.cv.contenu || {};
            
            viderTousLesChamps();
            
            document.getElementById('nom-complet').value = contenu.nom || '';
            document.getElementById('titre').value = contenu.titre || '';
            document.getElementById('adresse').value = contenu.adresse || '';
            document.getElementById('telephone').value = contenu.telephone || '';
            document.getElementById('email').value = contenu.email || '';
            document.getElementById('resume').value = contenu.resume || '';
            document.getElementById('competences-techniques').value = contenu.competencesTech || '';
            document.getElementById('centres-interet').value = contenu.centresInteret || '';
            document.getElementById('linkedin').value = contenu.linkedin || '';
            document.getElementById('github').value = contenu.github || '';
            document.getElementById('portfolio').value = contenu.portfolio || '';
            
            document.getElementById('template-select').value = data.cv.template || 'simple';
            document.getElementById('cv-preview').className = 'cv-preview template-' + (data.cv.template || 'simple');
            
            const photoPreview = document.getElementById('photo-preview');
            if (contenu.photo && contenu.photo !== '' && contenu.photo !== '#') {
                photoPreview.src = contenu.photo;
                photoPreview.style.display = 'block';
                document.getElementById('remove-photo').style.display = 'block';
            } else {
                photoPreview.style.display = 'none';
                document.getElementById('remove-photo').style.display = 'none';
            }
            
            if (contenu.experiences?.length) {
                contenu.experiences.forEach(exp => {
                    ajouterExperience();
                    const last = document.querySelector('.experience-item:last-child');
                    if (last) {
                        last.querySelector('.entreprise-input').value = exp.entreprise || '';
                        last.querySelector('.poste-input').value = exp.poste || '';
                        last.querySelector('.date-debut-input').value = exp.dateDebut || '';
                        last.querySelector('.date-fin-input').value = exp.dateFin || '';
                        last.querySelector('.description-input').value = exp.description || '';
                    }
                });
            } else {
                ajouterExperience();
            }
            
            if (contenu.formations?.length) {
                contenu.formations.forEach(formation => {
                    ajouterFormation();
                    const last = document.querySelector('.formation-item:last-child');
                    if (last) {
                        last.querySelector('.ecole-input').value = formation.ecole || '';
                        last.querySelector('.diplome-input').value = formation.diplome || '';
                        last.querySelector('.annee-debut-input').value = formation.anneeDebut || '';
                        last.querySelector('.annee-fin-input').value = formation.anneeFin || '';
                    }
                });
            } else {
                ajouterFormation();
            }
            
            if (contenu.langues?.length) {
                contenu.langues.forEach(langue => {
                    ajouterLangue();
                    const last = document.querySelector('.langue-item:last-child');
                    if (last) {
                        last.querySelector('.langue-nom-input').value = langue.nom || '';
                        last.querySelector('.langue-niveau-input').value = langue.niveau || '';
                    }
                });
            } else {
                ajouterLangue();
            }
            
            mettreAJourPreview();
            alert('✅ CV chargé !');
        });
}