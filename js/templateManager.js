// js/templateManager.js - Gestion des templates

function appliquerTemplate(template) {
    const select = document.getElementById('template-select');
    const preview = document.getElementById('cv-preview');
    
    if (select) select.value = template || 'simple';
    if (preview) preview.className = 'cv-preview template-' + (template || 'simple');
}

function initTemplateSelector() {
    const selector = document.getElementById('template-select');
    if (selector) {
        selector.addEventListener('change', function(e) {
            appliquerTemplate(e.target.value);
        });
    }
}

function getTemplateActuel() {
    return document.getElementById('template-select')?.value || 'simple';
}