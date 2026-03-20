// validations
function validerEmail(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
}

function validerTelephoneSenegal(telephone) {
    if (!telephone || telephone.trim() === '') return false;
    
    let clean = telephone.replace(/[\s\-\(\)]/g, '');
    if (clean.startsWith('+221')) clean = clean.substring(4);
    if (clean.startsWith('00221')) clean = clean.substring(5);
    if (clean.startsWith('0')) clean = clean.substring(1);
    
    if (!/^\d{9}$/.test(clean)) return false;
    
    const prefixe = clean.substring(0, 2);
    const prefixes = ['77', '78', '76', '70', '33', '75', '79', '72'];
    return prefixes.includes(prefixe);
}

function formaterTelephone(telephone) {
    if (!telephone) return '';
    let clean = telephone.replace(/[^\d+]/g, '');
    
    if (clean.startsWith('+221')) {
        const num = clean.substring(4);
        if (num.length === 9) {
            return `+221 ${num.substring(0,2)} ${num.substring(2,5)} ${num.substring(5)}`;
        }
    }
    
    const num = clean.replace(/\D/g, '');
    if (num.length === 9) {
        return `${num.substring(0,2)} ${num.substring(2,5)} ${num.substring(5)}`;
    }
    return telephone;
}

function evaluerForceMotDePasse(password) {
    if (password.length >= 6) {
        return 'medium';
    }
    return 'weak';
}

function afficherErreur(champId, message, type = 'error') {
    const champ = document.getElementById(champId);
    if (!champ) return;
    
    const formRow = champ.closest('.form-row');
    if (!formRow) return;
    
    const existingError = formRow.querySelector('.error-message');
    if (existingError) existingError.remove();
    
    formRow.classList.remove('success', 'error');
    
    if (message) {
        formRow.classList.add(type);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        formRow.appendChild(errorDiv);
        
        if (type === 'error') {
            champ.classList.add('shake');
            setTimeout(() => champ.classList.remove('shake'), 500);
        }
    } else if (type === 'success') {
        formRow.classList.add('success');
    }
}

function validerFormulaire() {
    let isValid = true;
    
    const nom = document.getElementById('nom-complet');
    if (!nom.value.trim()) {
        afficherErreur('nom-complet', 'Le nom complet est obligatoire');
        isValid = false;
    } else {
        afficherErreur('nom-complet', '', 'success');
    }
    
    const email = document.getElementById('email');
    if (!email.value.trim()) {
        afficherErreur('email', 'L\'email est obligatoire');
        isValid = false;
    } else if (!validerEmail(email.value)) {
        afficherErreur('email', 'Email invalide');
        isValid = false;
    } else {
        afficherErreur('email', '', 'success');
    }
    
    const telephone = document.getElementById('telephone');
    if (!telephone.value.trim()) {
        afficherErreur('telephone', 'Le téléphone est obligatoire');
        isValid = false;
    } else if (!validerTelephoneSenegal(telephone.value)) {
        afficherErreur('telephone', 'Numéro sénégalais invalide');
        isValid = false;
    } else {
        afficherErreur('telephone', '', 'success');
    }
    
    const experiences = document.querySelectorAll('.experience-item');
    if (experiences.length === 0) {
        alert('Ajoutez au moins une expérience professionnelle');
        isValid = false;
    }
    
    return isValid;
}

