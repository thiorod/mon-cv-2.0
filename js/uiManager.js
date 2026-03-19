// js/uiManager.js - Version corrigée

// Compteurs
let compteurExperiences = 0;
let compteurFormations = 0;
let compteurLangues = 0;

// Fonction pour attacher les écouteurs d'événements à un élément
function attacherEcouteurs(element) {
    if (!element) return;
    
    // Attacher les écouteurs pour l'aperçu
    element.querySelectorAll('input, textarea, select').forEach(input => {
        input.addEventListener('input', mettreAJourPreview);
    });
}

function ajouterExperience() {
    compteurExperiences++;
    const conteneur = document.getElementById('conteneur-experiences');
    
    const div = document.createElement('div');
    div.className = 'experience-item';
    div.dataset.index = compteurExperiences;
    
    div.innerHTML = `
        <h4>Expérience ${compteurExperiences}</h4>
        <div class="form-row">
            <label>Entreprise <span class="required">*</span></label>
            <input type="text" class="entreprise-input" required>
        </div>
        <div class="form-row">
            <label>Poste <span class="required">*</span></label>
            <input type="text" class="poste-input" required>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div class="form-row">
                <label>Date début <span class="required">*</span></label>
                <input type="month" class="date-debut-input" required>
            </div>
            <div class="form-row">
                <label>Date fin</label>
                <input type="month" class="date-fin-input">
            </div>
        </div>
        <div class="form-row">
            <label>Description</label>
            <textarea class="description-input" rows="3" placeholder="Décrivez vos missions..."></textarea>
        </div>
        <button type="button" class="btn-remove" onclick="this.closest('.experience-item').remove(); mettreAJourPreview();">🗑️ Supprimer</button>
        <hr>
    `;
    
    conteneur.appendChild(div);
    
    // Attacher les écouteurs aux nouveaux champs
    attacherEcouteurs(div);
}

function ajouterFormation() {
    compteurFormations++;
    const conteneur = document.getElementById('conteneur-formations');
    
    const div = document.createElement('div');
    div.className = 'formation-item';
    div.dataset.index = compteurFormations;
    
    div.innerHTML = `
        <h4>Formation ${compteurFormations}</h4>
        <div class="form-row">
            <label>Établissement <span class="required">*</span></label>
            <input type="text" class="ecole-input" required>
        </div>
        <div class="form-row">
            <label>Diplôme <span class="required">*</span></label>
            <input type="text" class="diplome-input" required>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div class="form-row">
                <label>Année début</label>
                <input type="number" class="annee-debut-input" placeholder="2020">
            </div>
            <div class="form-row">
                <label>Année fin</label>
                <input type="number" class="annee-fin-input" placeholder="2023">
            </div>
        </div>
        <button type="button" class="btn-remove" onclick="this.closest('.formation-item').remove(); mettreAJourPreview();">🗑️ Supprimer</button>
        <hr>
    `;
    
    conteneur.appendChild(div);
    
    // Attacher les écouteurs aux nouveaux champs
    attacherEcouteurs(div);
}

function ajouterLangue() {
    compteurLangues++;
    const conteneur = document.getElementById('conteneur-langues');
    
    const div = document.createElement('div');
    div.className = 'langue-item';
    div.dataset.index = compteurLangues;
    
    div.innerHTML = `
        <h4>Langue ${compteurLangues}</h4>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div class="form-row">
                <label>Langue</label>
                <input type="text" class="langue-nom-input" placeholder="Ex: Français, Anglais">
            </div>
            <div class="form-row">
                <label>Niveau</label>
                <select class="langue-niveau-input">
                    <option value="">Sélectionnez un niveau</option>
                    <option value="Débutant (A1)">Débutant (A1)</option>
                    <option value="Élémentaire (A2)">Élémentaire (A2)</option>
                    <option value="Intermédiaire (B1)">Intermédiaire (B1)</option>
                    <option value="Intermédiaire avancé (B2)">Intermédiaire avancé (B2)</option>
                    <option value="Avancé (C1)">Avancé (C1)</option>
                    <option value="Courant (C2)">Courant (C2)</option>
                    <option value="Natif">Natif</option>
                </select>
            </div>
        </div>
        <button type="button" class="btn-remove" onclick="this.closest('.langue-item').remove(); mettreAJourPreview();">🗑️ Supprimer</button>
        <hr>
    `;
    
    conteneur.appendChild(div);
    
    // Attacher les écouteurs aux nouveaux champs
    attacherEcouteurs(div);
}


function viderTousLesChamps() {
    document.getElementById('nom-complet').value = '';
    document.getElementById('titre').value = '';
    document.getElementById('adresse').value = '';
    document.getElementById('telephone').value = '';
    document.getElementById('email').value = '';
    document.getElementById('resume').value = '';
    document.getElementById('competences-techniques').value = '';
    document.getElementById('centres-interet').value = '';
    document.getElementById('linkedin').value = '';
    document.getElementById('github').value = '';
    document.getElementById('portfolio').value = '';
    
    document.getElementById('conteneur-experiences').innerHTML = '';
    document.getElementById('conteneur-formations').innerHTML = '';
    document.getElementById('conteneur-langues').innerHTML = '';
    
    compteurExperiences = 0;
    compteurFormations = 0;
    compteurLangues = 0;
}

function mettreAJourPreview() {
    const preview = document.getElementById('cv-preview');
    
    const nom = document.getElementById('nom-complet')?.value || 'Votre nom';
    const titre = document.getElementById('titre')?.value || 'Titre professionnel';
    const adresse = document.getElementById('adresse')?.value || '';
    const telephone = document.getElementById('telephone')?.value || '';
    const email = document.getElementById('email')?.value || '';
    const resume = document.getElementById('resume')?.value || '';
    const competencesTech = document.getElementById('competences-techniques')?.value || '';
    const centresInteret = document.getElementById('centres-interet')?.value || '';
    const linkedin = document.getElementById('linkedin')?.value || '';
    const github = document.getElementById('github')?.value || '';
    const portfolio = document.getElementById('portfolio')?.value || '';
    
    const photoPreview = document.getElementById('photo-preview');
    const photoSrc = photoPreview.style.display !== 'none' ? photoPreview.src : '';
    
    let html = `
        <div class="cv-container">
            <div class="cv-left">
    `;
    
    if (photoSrc) {
        html += `<img src="${photoSrc}" alt="Photo de profil">`;
    } else {
        html += `<img src="https://via.placeholder.com/150" alt="Photo de profil">`;
    }
    
    html += `
        <h2>Informations personnelles</h2>
        <ul>
            <li><strong>Nom :</strong> ${nom}</li>
            <li><strong>Titre :</strong> ${titre}</li>
            ${adresse ? `<li><strong>Adresse :</strong> ${adresse}</li>` : ''}
            ${telephone ? `<li><strong>Téléphone :</strong> ${formaterTelephone(telephone)}</li>` : ''}
            ${email ? `<li><strong>Email :</strong> ${email}</li>` : ''}
        </ul>
    `;
    
    if (competencesTech) {
        const techList = competencesTech.split(',').map(c => c.trim()).filter(c => c);
        if (techList.length > 0) {
            html += `<h2>Compétences techniques</h2><ul>`;
            techList.forEach(comp => {
                html += `<li>${comp}</li>`;
            });
            html += `</ul>`;
        }
    }
    
    const langues = document.querySelectorAll('.langue-item');
    if (langues.length > 0) {
        html += `<h2>Langues</h2><ul>`;
        langues.forEach(langue => {
            const nomLangue = langue.querySelector('.langue-nom-input')?.value;
            const niveau = langue.querySelector('.langue-niveau-input')?.value;
            if (nomLangue) {
                html += `<li><strong>${nomLangue} :</strong> ${niveau || 'Non spécifié'}</li>`;
            }
        });
        html += `</ul>`;
    }
    
    if (centresInteret) {
        const centresList = centresInteret.split(',').map(c => c.trim()).filter(c => c);
        if (centresList.length > 0) {
            html += `<h2>Centres d'intérêt</h2><ul>`;
            centresList.forEach(centre => {
                html += `<li>${centre}</li>`;
            });
            html += `</ul>`;
        }
    }
    
    if (linkedin || github || portfolio) {
        html += `<h2>Réseaux sociaux</h2><ul>`;
        if (linkedin) html += `<li><a href="${linkedin}" target="_blank">LinkedIn</a></li>`;
        if (github) html += `<li><a href="${github}" target="_blank">GitHub</a></li>`;
        if (portfolio) html += `<li><a href="${portfolio}" target="_blank">Portfolio</a></li>`;
        html += `</ul>`;
    }
    
    html += `
            </div>
            <div class="cv-right">
                <h1>${nom}</h1>
                <h3>${titre}</h3>
    `;
    
    if (resume) {
        html += `
            <div class="cv-section">
                <h2>Résumé professionnel</h2>
                <p>${resume.replace(/\n/g, '<br>')}</p>
            </div>
        `;
    }
    
    const experiences = document.querySelectorAll('.experience-item');
    if (experiences.length > 0) {
        html += `<div class="cv-section"><h2>Expériences professionnelles</h2>`;
        experiences.forEach(exp => {
            const entreprise = exp.querySelector('.entreprise-input')?.value || 'Entreprise';
            const poste = exp.querySelector('.poste-input')?.value || 'Poste';
            const dateDebut = exp.querySelector('.date-debut-input')?.value || '';
            const dateFin = exp.querySelector('.date-fin-input')?.value || '';
            const description = exp.querySelector('.description-input')?.value || '';
            
            const dateDebutFormatee = dateDebut ? dateDebut.split('-').reverse().join('/') : '';
            const dateFinFormatee = dateFin ? dateFin.split('-').reverse().join('/') : 'présent';
            
            html += `<div class="cv-item">`;
            html += `<h4>${poste}</h4>`;
            html += `<div class="item-subtitle">${entreprise}</div>`;
            html += `<div class="item-date">${dateDebutFormatee} - ${dateFinFormatee}</div>`;
            if (description) html += `<div class="item-description">${description.replace(/\n/g, '<br>')}</div>`;
            html += `</div>`;
        });
        html += `</div>`;
    }
    
    const formations = document.querySelectorAll('.formation-item');
    if (formations.length > 0) {
        html += `<div class="cv-section"><h2>Formations</h2>`;
        formations.forEach(formation => {
            const ecole = formation.querySelector('.ecole-input')?.value || 'Établissement';
            const diplome = formation.querySelector('.diplome-input')?.value || 'Diplôme';
            const anneeDebut = formation.querySelector('.annee-debut-input')?.value || '';
            const anneeFin = formation.querySelector('.annee-fin-input')?.value || '';
            
            html += `<div class="cv-item">`;
            html += `<h4>${diplome}</h4>`;
            html += `<div class="item-subtitle">${ecole}</div>`;
            html += `<div class="item-date">${anneeDebut} - ${anneeFin || 'présent'}</div>`;
            html += `</div>`;
        });
        html += `</div>`;
    }
    
    html += `
            </div>
        </div>
    `;
    
    preview.innerHTML = html;
}