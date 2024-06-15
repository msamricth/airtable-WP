import fetchAirtableSchema from './form-builder/fetchAirtableSchema.js';
import createFormComponent from './form-builder/createFormComponent.js';
import dragAndDrop from './form-builder/dragAndDrop.js';

function initializeForm() {
    const fieldContainer = document.getElementById('field-container');
    const formContainer = document.getElementById('form-container');
    const formCode = document.getElementById('form-code');
    const formTitle = document.getElementById('form-title');

    const airtableWpSettings = window.airtableWpSettingsObject || {};
    const apiKey = airtableWpSettings.apiKey || '';
    const baseId = airtableWpSettings.baseId || '';
    const tableName = airtableWpSettings.tableName || '';
    const encounteredFields = new Set();

    fetchAirtableSchema(apiKey, baseId, tableName)
        .then(fields => {
            fields.forEach(field => createFormComponent(field, fieldContainer, encounteredFields));
            dragAndDrop(formContainer, fieldContainer, baseId, apiKey, tableName, formCode);
            addEventListeners(fieldContainer);
        })
        .catch(error => {
            console.error('Error fetching Airtable schema:', error);
        });
}

function addEventListeners(fieldContainer) {
    const filterByType = document.getElementById('filter-by-type');
    if (filterByType) {
        filterByType.addEventListener('change', function () {
            const selectedType = filterByType.value;
            const formComponents = fieldContainer.getElementsByClassName('form-component');
            for (let i = 0; i < formComponents.length; i++) {
                const fieldType = formComponents[i].getAttribute('data-field-type');
                formComponents[i].style.display = (selectedType === 'all' || fieldType === selectedType) ? '' : 'none';
            }
        });
    }

    const searchField = document.getElementById('search-field');
    if (searchField) {
        searchField.addEventListener('input', function () {
            const searchTerm = searchField.value.toLowerCase();
            const formComponents = fieldContainer.getElementsByClassName('form-component');
            for (let i = 0; i < formComponents.length; i++) {
                const fieldName = formComponents[i].getAttribute('data-field-name').toLowerCase();
                formComponents[i].style.display = fieldName.includes(searchTerm) ? '' : 'none';
            }
        });
    }

    const saveFormButton = document.getElementById('save-form-button');
    if (saveFormButton) {
        saveFormButton.addEventListener('click', function () {
            const formConfig = document.getElementById('form-code').value;
            const formTitle = document.getElementById('form-title').value;
            saveFormConfig(formTitle, formConfig);
        });
    }
}

function saveFormConfig(formTitle, formConfig) {
    fetch(airtableWpSettingsObject.ajaxUrl, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            action: 'save_airtable_form',
            formTitle: formTitle,
            formConfig: formConfig,
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Form saved successfully');
        } else {
            alert('Error saving form: ' + data.data);
        }
    })
    .catch(error => {
        console.error('Error saving form:', error);
        alert('Error saving form');
    });
}

document.addEventListener('DOMContentLoaded', initializeForm);
