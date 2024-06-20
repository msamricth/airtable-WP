import fetchAirtableSchema from './form-builder/fetchAirtableSchema.js';
import createFormComponent from './form-builder/createFormComponent.js';
import dragAndDrop from './form-builder/dragAndDrop.js';
import fieldUIListeners from './form-builder/eventlisteners.js'
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

    formContainer.innerHTML = formCode.value;
    fieldUIListeners();
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

}

document.addEventListener('DOMContentLoaded', initializeForm);


document.addEventListener('DOMContentLoaded', function () {
    const formContainer = document.getElementById('form-container');
    const formHtmlField = document.getElementById('_airtable_form_html');
    const editorWindow = document.querySelector('#content.wp-editor-area');

    // Function to update the hidden field
    function updateFormHtmlField() {

        const airtableFields = formContainer.querySelectorAll('.airtable-field');
        let airtableFormFields;

        airtableFields.forEach(function(airtableField){
            if(airtableFormFields){
                airtableFormFields = airtableFormFields + airtableField.innerHTML;
            } else {
                airtableFormFields = airtableField.innerHTML;
            }
        })
        
        let airtableForm = '<form class="airtable-form">';
        if(airtableFormFields){
            airtableForm =  airtableForm + airtableFormFields;
        }
        let submitButton = '<button type="submit" class="airtable-form-submit btn btn-primary">Submit</button>',
        honeypot = '<input size="40" maxlength="80" class="wpcf7-form-control d-none" id="honeypot" aria-invalid="false" value="" type="text" name="Name" style="display:none">'
        airtableForm =  airtableForm  +honeypot +submitButton+ '</form>';

        formHtmlField.value = formContainer.innerHTML;
        if(editorWindow){
            editorWindow.value = airtableForm;
        }
    }

    // Observe changes in the form container
    const observer = new MutationObserver(updateFormHtmlField);
    observer.observe(formContainer, { childList: true, subtree: true });

    // Update the hidden field initially
    updateFormHtmlField();
});
