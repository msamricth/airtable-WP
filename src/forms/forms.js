import fetchAirtableSchema from './form-builder/fetchAirtableSchema.js';
import createFormComponent from './form-builder/createFormComponent.js';
import dragAndDrop from './form-builder/dragAndDrop.js';

document.addEventListener('DOMContentLoaded', function () {
    const fieldContainer = document.getElementById('field-container');
    const formContainer = document.getElementById('form-container');
    const formCode = document.getElementById('form-code');
    const airtableWpSettings = airtableWpSettingsObject || {}; // Update object name here
    const apiKey = airtableWpSettings.apiKey || '';
    const baseId = airtableWpSettings.baseId || '';
    const tableName = airtableWpSettings.tableName || '';
    const encounteredFields = new Set(); // Set to store encountered field names

    fetchAirtableSchema(apiKey, baseId, tableName).then(fields => {
        fields.forEach(field => createFormComponent(field, fieldContainer, encounteredFields));
        dragAndDrop(formContainer, baseId, apiKey, tableName, formCode);
    });


  // Filter fields by field type
  const filterByType = document.getElementById('filter-by-type');
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

  // Search for fields
  const searchField = document.getElementById('search-field');
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
  const formBuilderTab = document.getElementById('form-builder-tab');
  const codeViewTab = document.getElementById('code-view-tab');
  const formBuilderContainer = document.getElementById('form-builder-container');
  const formCodeContainer = document.getElementById('form-code-container');

  formBuilderTab.addEventListener('click', () => {
    formBuilderContainer.style.display = 'block';
    formCodeContainer.style.display = 'none';
    formBuilderTab.classList.add('active');
    codeViewTab.classList.remove('active');
  });

  codeViewTab.addEventListener('click', () => {
    formBuilderContainer.style.display = 'none';
    formCodeContainer.style.display = 'block';
    codeViewTab.classList.add('active');
    formBuilderTab.classList.remove('active');
  });
});