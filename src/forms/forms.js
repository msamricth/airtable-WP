import fetchAirtableSchema from './form-builder/fetchAirtableSchema.js';
import createFormComponent from './form-builder/createFormComponent.js';
import dragAndDrop from './form-builder/dragAndDrop.js';

function initializeForm() {
    const fieldContainer = document.getElementById('field-container');
    const formContainer = document.getElementById('form-container');
    const formCode = document.getElementById('form-code');

    //if (fieldContainer && formContainer && formCode) {
        const airtableWpSettings = window.airtableWpSettingsObject || {}; // Update object name here
        const apiKey = airtableWpSettings.apiKey || '';
        const baseId = airtableWpSettings.baseId || '';
        const tableName = airtableWpSettings.tableName || '';
        const encounteredFields = new Set(); // Set to store encountered field names

        fetchAirtableSchema(apiKey, baseId, tableName)
            .then(fields => {
                fields.forEach(field => createFormComponent(field, fieldContainer, encounteredFields));
                dragAndDrop(formContainer, fieldContainer, baseId, apiKey, tableName, formCode);
                addEventListeners(fieldContainer); // Pass fieldContainer to addEventListeners
            })
            .catch(error => {
                console.error('Error fetching Airtable schema:', error);
            });

}

function addEventListeners(fieldContainer) {
    // Filter fields by field type
    const filterByType = document.getElementById('filter-by-type');
    if (filterByType) {
        filterByType.addEventListener('change', function () {
            const selectedType = filterByType.value;
            const formComponents = fieldContainer.getElementsByClassName('form-component');

            for (let i = 0; i < formComponents.length; i++) {
                const fieldType = formComponents[i].getAttribute('data-field-type');
                if (selectedType === 'all' || fieldType === selectedType) {
                    formComponents[i].style.display = '';
                } else {
                    formComponents[i].style.display = 'none';
                }
            }
        });
    }

    // Search for fields
    const searchField = document.getElementById('search-field');
    if (searchField) {
        searchField.addEventListener('input', function () {
            const searchTerm = searchField.value.toLowerCase();
            const formComponents = fieldContainer.getElementsByClassName('form-component');

            for (let i = 0; i < formComponents.length; i++) {
                const fieldName = formComponents[i].getAttribute('data-field-name').toLowerCase();
                if (fieldName.includes(searchTerm)) {
                    formComponents[i].style.display = '';
                } else {
                    formComponents[i].style.display = 'none';
                }
            }
        });
    }
}

function checkAirtableBlock() {
  const airtableBlock = document.querySelector('[data-type="airtable-wp/dynamic-form-builder"]');
  if (airtableBlock) {
      initializeForm(); // Initialize the form functionality
  } else {
      setTimeout(checkAirtableBlock, 500); // Check again after 500ms if not found
  }
}

// Start checking for the Airtable block
checkAirtableBlock();