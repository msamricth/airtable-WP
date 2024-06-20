/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/airtableBlock.js":
/*!*************************************!*\
  !*** ./src/blocks/airtableBlock.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

// Enqueue the stylesheet
function enqueueStyle() {
  const styleUrl = new URL('style.css', document.currentScript.src);
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = styleUrl.href;
  document.head.appendChild(link);
}

//enqueueStyle();

const {
  registerBlockType
} = wp.blocks;
const {
  Fragment
} = wp.element;
const {
  useState,
  useEffect
} = wp.element;
const {
  InspectorControls
} = wp.blockEditor;
const {
  PanelBody,
  SelectControl
} = wp.components;
registerBlockType('airtable-wp/dynamic-form-builder', {
  title: 'Airtable WP',
  icon: 'editor-table',
  category: 'widgets',
  attributes: {
    selectedForm: {
      type: 'string',
      default: ''
    }
  },
  edit({
    attributes,
    setAttributes
  }) {
    const [forms, setForms] = useState([]);
    useEffect(() => {
      const storedForms = JSON.parse(localStorage.getItem('airtableForms')) || [];
      setForms(storedForms);
    }, []);
    const formOptions = forms.map((form, index) => ({
      label: form.name,
      value: form.name
    }));
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PanelBody, {
      title: "Select Form"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SelectControl, {
      label: "Form",
      value: attributes.selectedForm,
      options: formOptions,
      onChange: value => setAttributes({
        selectedForm: value
      })
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      draggable: "false"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
      htmlFor: "filter-by-type"
    }, "Filter by Type:"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("select", {
      id: "filter-by-type"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
      value: "all"
    }, "All"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
      value: "singleLineText"
    }, "Text"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
      value: "email"
    }, "Email"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
      value: "date"
    }, "Date"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
      value: "singleSelect"
    }, "Select"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
      value: "Checkbox"
    }, "Checkbox"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
      value: "multipleAttachments"
    }, "File")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
      htmlFor: "search-field"
    }, "Search Fields:"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
      type: "text",
      id: "search-field",
      placeholder: "Search..."
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      id: "field-container"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      id: "form-builder-container"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("form", {
      id: "form-container"
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      id: "form-code-container"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("textarea", {
      id: "form-code"
    })))));
  },
  save() {
    return null; // Save function not needed for this example
  }
});
function createFormComponent(field, fieldContainer, encounteredFields) {
  if (encounteredFields.has(field.name)) {
    return; // Skip if the field has already been encountered
  }
  encounteredFields.add(field.name);
  const fieldElement = document.createElement('div');
  fieldElement.classList.add('form-component');
  fieldElement.setAttribute('data-field-name', field.name);
  fieldElement.setAttribute('data-field-type', field.type);
  const label = document.createElement('label');
  label.textContent = field.name;
  fieldElement.appendChild(label);
  let inputElement;
  switch (field.type) {
    case 'singleLineText':
    case 'email':
    case 'date':
      inputElement = document.createElement('input');
      inputElement.type = field.type === 'singleLineText' ? 'text' : field.type;
      break;
    case 'singleSelect':
      inputElement = document.createElement('select');
      // Add options for the select field (assuming field.options is an array of option values)
      field.options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option;
        inputElement.appendChild(optionElement);
      });
      break;
    case 'checkbox':
      inputElement = document.createElement('input');
      inputElement.type = 'checkbox';
      break;
    case 'multipleAttachments':
      inputElement = document.createElement('input');
      inputElement.type = 'file';
      break;
    default:
      inputElement = document.createElement('input');
      inputElement.type = 'text';
  }
  inputElement.name = field.name;
  fieldElement.appendChild(inputElement);
  fieldContainer.appendChild(fieldElement);
}

/***/ }),

/***/ "./src/forms/form-builder/createFormComponent.js":
/*!*******************************************************!*\
  !*** ./src/forms/form-builder/createFormComponent.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createFormComponent)
/* harmony export */ });
function createFormComponent(field, fieldContainer, encounteredFields) {
  const div = document.createElement('div');
  div.className = 'form-component';
  div.setAttribute('data-field-type', field.type);
  div.setAttribute('data-field-name', field.name);
  div.innerText = field.name;
  div.draggable = true;

  // Ensure fieldContainer is valid before appending
  if (fieldContainer) {
    fieldContainer.appendChild(div);
    encounteredFields.add(field.name);
  } else {
    console.error('Field container is null');
  }
}

/***/ }),

/***/ "./src/forms/form-builder/dragAndDrop.js":
/*!***********************************************!*\
  !*** ./src/forms/form-builder/dragAndDrop.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ dragAndDrop)
/* harmony export */ });
/* harmony import */ var _fieldUI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fieldUI */ "./src/forms/form-builder/fieldUI.js");

function dragAndDrop(formContainer, fieldContainer, baseId, apiKey, tableName, formCode) {
  formContainer.addEventListener('dragover', function (event) {
    event.preventDefault();
  });
  formContainer.addEventListener('drop', function (event) {
    event.preventDefault();
    const fieldName = event.dataTransfer.getData('text/plain');
    const fieldType = event.dataTransfer.getData('application/field-type');
    const fieldID = 'airtable-field-' + slugify(fieldName);
    console.log('fieldName:', fieldName); // Log fieldName
    console.log('fieldType:', fieldType); // Log fieldType

    function slugify(str) {
      return String(str).normalize('NFKD') // split accented characters into their base characters and diacritical marks
      .replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
      .trim() // trim leading or trailing whitespace
      .toLowerCase() // convert to lowercase
      .replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric characters
      .replace(/\s+/g, '-') // replace spaces with hyphens
      .replace(/-+/g, '-'); // remove consecutive hyphens
    }

    // Create input element based on field type
    let inputElement;
    switch (fieldType) {
      case 'email':
        inputElement = document.createElement('input');
        inputElement.type = 'email';
        break;
      case 'date':
        inputElement = document.createElement('input');
        inputElement.type = 'date';
        break;
      case 'textarea':
      case 'multilineText':
        inputElement = document.createElement('textarea');
        break;
      case 'checkbox':
        inputElement = document.createElement('input');
        inputElement.type = 'checkbox';
        inputElement.classList.add("form-check-input");

        // Create label for checkbox
        const labelElement = document.createElement('label');
        labelElement.innerText = fieldName; // Set label text to field name
        labelElement.setAttribute('for', fieldName); // Set 'for' attribute to match input ID

        labelElement.classList.add("form-check-label");
        // Append checkbox and label to a container div
        const checkboxContainer = document.createElement('div');
        checkboxContainer.classList.add("form-check");
        checkboxContainer.appendChild(inputElement);
        checkboxContainer.appendChild(labelElement);
        inputElement = checkboxContainer; // Set inputElement to the container div
        break;
      case 'select':
      case 'singleSelect':
        inputElement = document.createElement('select');
        inputElement.classList.add('form-select');
        // Retrieve options from Airtable schema
        fetch(`https://api.airtable.com/v0/meta/bases/${baseId}/tables`, {
          headers: {
            'Authorization': `Bearer ${apiKey}`
          }
        }).then(response => response.json()).then(data => {
          const table = data.tables.find(table => table.name === tableName);
          if (!table) {
            console.error('Table not found:', tableName);
            return;
          }
          const field = table.fields.find(field => field.name === fieldName);
          if (!field || !field.options || !field.options.choices) {
            console.error('Field or options not found for:', fieldName);
            return;
          }
          const choices = field.options.choices;
          choices.forEach(choice => {
            const optionElement = document.createElement('option');
            optionElement.value = choice.id || choice.name;
            optionElement.text = choice.name;
            inputElement.appendChild(optionElement);
          });
        }).catch(error => console.error('Error fetching Airtable schema:', error));
        break;
      case 'multipleSelects':
        const multipleSelectsContainer = document.createElement('div');
        multipleSelectsContainer.classList.add('mb-3');
        const multipleSelectsLabel = document.createElement('label');
        multipleSelectsLabel.innerText = fieldName;
        multipleSelectsLabel.setAttribute('for', fieldID);
        const multipleSelectsDescription = document.createElement('small');
        multipleSelectsDescription.classList.add('form-text', 'text-muted');
        fetch(`https://api.airtable.com/v0/meta/bases/${baseId}/tables`, {
          headers: {
            'Authorization': `Bearer ${apiKey}`
          }
        }).then(response => response.json()).then(data => {
          const table = data.tables.find(table => table.name === tableName);
          if (!table) {
            console.error('Table not found:', tableName);
            return;
          }
          const field = table.fields.find(field => field.name === fieldName);
          if (!field || !field.options || !field.options.choices) {
            console.error('Field or options not found for:', fieldName);
            return;
          }
          if (field.description) {
            multipleSelectsDescription.innerText = field.description;
            multipleSelectsContainer.appendChild(multipleSelectsDescription);
          }
          const choices = field.options.choices;
          choices.forEach(choice => {
            const choiceContainer = document.createElement('div');
            choiceContainer.classList.add('form-check');
            const checkboxElement = document.createElement('input');
            checkboxElement.type = 'checkbox';
            checkboxElement.id = slugify(choice.name);
            checkboxElement.name = fieldName;
            checkboxElement.value = choice.id || choice.name;
            checkboxElement.classList.add('form-check-input');
            const checkboxLabel = document.createElement('label');
            checkboxLabel.setAttribute('for', slugify(choice.name));
            checkboxLabel.innerText = choice.name;
            checkboxLabel.classList.add('form-check-label');
            choiceContainer.appendChild(checkboxElement);
            choiceContainer.appendChild(checkboxLabel);
            multipleSelectsContainer.appendChild(choiceContainer);
          });
        }).catch(error => console.error('Error fetching Airtable schema:', error));
        inputElement = multipleSelectsContainer;
        break;
      case 'image':
        inputElement = document.createElement('div');
        inputElement.innerText = 'Image Upload Field';
        inputElement.classList.add('image-upload-field');
        break;
      case 'file':
      case 'multipleAttachments':
        const multipleAttachmentsContainer = document.createElement('div');
        multipleAttachmentsContainer.classList.add("mb-3");
        inputElement = document.createElement('input');
        inputElement.type = 'file';
        inputElement.setAttribute('name', fieldName);
        // Create label for checkbox
        const multipleAttachmentslabelElement = document.createElement('label');
        multipleAttachmentslabelElement.innerText = fieldName; // Set label text to field name
        multipleAttachmentslabelElement.setAttribute('for', fieldName); // Set 'for' attribute to match input ID

        multipleAttachmentslabelElement.classList.add("form-label");
        // Append checkbox and label to a container div

        multipleAttachmentsContainer.appendChild(multipleAttachmentslabelElement);
        multipleAttachmentsContainer.appendChild(inputElement);
        inputElement = multipleAttachmentsContainer; // Set inputElement to the container div
        break;
      default:
        inputElement = document.createElement('input');
        inputElement.type = 'text';
    }
    inputElement.id = fieldID;
    const fieldContainer = document.createElement('div');
    inputElement.classList.add('form-control');
    inputElement.classList.add('mb-2');
    inputElement.setAttribute('name', fieldName); // Set input element name to match field name
    inputElement.placeholder = fieldName;
    fieldContainer.classList.add('airtable-field');
    fieldContainer.id = 'airtable-field-container-' + fieldID;
    fieldContainer.appendChild(inputElement);
    formContainer.appendChild(fieldContainer);
    (0,_fieldUI__WEBPACK_IMPORTED_MODULE_0__["default"])(formContainer, fieldID, inputElement);
    let formContentCode = formContainer.innerHTML;
    formCode.value = formContentCode;
  });
  fieldContainer.addEventListener('dragstart', function (event) {
    const fieldName = event.target.getAttribute('data-field-name');
    const fieldType = event.target.getAttribute('data-field-type');
    event.dataTransfer.setData("text/plain", fieldName);
    event.dataTransfer.setData("application/field-type", fieldType); // Set field type as application/field-type data
  });
}

/***/ }),

/***/ "./src/forms/form-builder/eventlisteners.js":
/*!**************************************************!*\
  !*** ./src/forms/form-builder/eventlisteners.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ fieldUIListeners)
/* harmony export */ });
function fieldUIListeners() {
  const formContainer = document.getElementById('form-container');
  const placeholderbtns = formContainer.querySelectorAll('.field-ui--placeholder');
  const removeBTNs = formContainer.querySelectorAll('.field-ui--remove');
  placeholderbtns.forEach(function (placeholder) {
    let fieldID = placeholder.id;
    if (fieldID) {
      fieldID = fieldID.replace("placeholder-", "");
      let atField = document.getElementById(fieldID);
      placeholder.addEventListener('click', function (event) {
        event.preventDefault();
        const newPlaceholder = prompt('Enter new placeholder:');
        if (newPlaceholder) {
          atField.placeholder = newPlaceholder;
        }
      });
    }
  });
  removeBTNs.forEach(function (removeBTN) {
    let fieldID = removeBTN.id;
    if (fieldID) {
      fieldID = fieldID.replace("remove-field-", "");
      let atField = document.getElementById('airtable-field-container-' + fieldID),
        parentThing = 'fieldUI-' + fieldID,
        fieldUI = document.getElementById(parentThing);
      removeBTN.addEventListener('click', function (event) {
        event.preventDefault();
        console.log('cliked');
        if (fieldUI) {
          formContainer.removeChild(fieldUI);
        }
        if (atField) {
          formContainer.removeChild(atField);
        }
      });
    }
  });
}

/***/ }),

/***/ "./src/forms/form-builder/fetchAirtableSchema.js":
/*!*******************************************************!*\
  !*** ./src/forms/form-builder/fetchAirtableSchema.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ fetchAirtableSchema)
/* harmony export */ });
function fetchAirtableSchema(apiKey, baseId, tableName) {
  return fetch(`https://api.airtable.com/v0/meta/bases/${baseId}/tables`, {
    headers: {
      'Authorization': `Bearer ${apiKey}`
    }
  }).then(response => response.json()).then(data => {
    const table = data.tables.find(table => table.name === tableName);
    if (!table) {
      console.error('Table not found:', tableName);
      return [];
    }
    return table.fields.filter(field => {
      // Exclude fields with specific types
      const excludedTypes = ['createdTime', 'updatedTime', 'formula', 'multipleLookupValues', 'multipleRecordLinks'];
      return !excludedTypes.includes(field.type);
    });
  }).catch(error => {
    console.error('Error fetching Airtable schema:', error);
    return [];
  });
}

/***/ }),

/***/ "./src/forms/form-builder/fieldUI.js":
/*!*******************************************!*\
  !*** ./src/forms/form-builder/fieldUI.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ initFieldUI)
/* harmony export */ });
function initFieldUI(formContainer, fieldID, inputElement) {
  // Create a UI around the dropped element
  const fieldUI = document.createElement('div');
  fieldUI.classList.add('field-ui');
  fieldUI.id = 'fieldUI-' + fieldID;

  // Change placeholder
  const changePlaceholderButton = document.createElement('button');
  changePlaceholderButton.id = 'placeholder-' + fieldID;
  changePlaceholderButton.classList.add('field-ui--placeholder');
  changePlaceholderButton.innerText = 'Change Placeholder';
  changePlaceholderButton.name = inputElement.id;
  changePlaceholderButton.addEventListener('click', function (event) {
    event.preventDefault();
    const newPlaceholder = prompt('Enter new placeholder:');
    if (newPlaceholder) {
      inputElement.placeholder = newPlaceholder;
    }
  });
  fieldUI.appendChild(changePlaceholderButton);

  // Sort field
  const sortFieldButton = document.createElement('button');
  sortFieldButton.innerText = 'Sort Field';
  sortFieldButton.addEventListener('click', function () {
    const direction = prompt('Enter direction (asc/desc):');
    if (direction && (direction === 'asc' || direction === 'desc')) {
      // Implement sorting logic
      // For example, you can use the 'direction' value to sort the fields in the formContainer
    }
  });
  fieldUI.appendChild(sortFieldButton);

  // Remove field
  const removeFieldButton = document.createElement('a');
  removeFieldButton.innerText = 'Remove Field';
  removeFieldButton.id = 'remove-field-' + fieldID;
  removeFieldButton.href = "#";
  removeFieldButton.classList.add('field-ui--remove');
  removeFieldButton.name = inputElement.id;
  removeFieldButton.addEventListener('click', function (event) {
    event.preventDefault();
    formContainer.removeChild(inputElement);
    formContainer.removeChild(fieldUI);
  });
  fieldUI.appendChild(removeFieldButton);
  formContainer.appendChild(fieldUI);
}

/***/ }),

/***/ "./src/forms/forms.js":
/*!****************************!*\
  !*** ./src/forms/forms.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _form_builder_fetchAirtableSchema_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./form-builder/fetchAirtableSchema.js */ "./src/forms/form-builder/fetchAirtableSchema.js");
/* harmony import */ var _form_builder_createFormComponent_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./form-builder/createFormComponent.js */ "./src/forms/form-builder/createFormComponent.js");
/* harmony import */ var _form_builder_dragAndDrop_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./form-builder/dragAndDrop.js */ "./src/forms/form-builder/dragAndDrop.js");
/* harmony import */ var _form_builder_eventlisteners_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./form-builder/eventlisteners.js */ "./src/forms/form-builder/eventlisteners.js");




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
  (0,_form_builder_eventlisteners_js__WEBPACK_IMPORTED_MODULE_3__["default"])();
  (0,_form_builder_fetchAirtableSchema_js__WEBPACK_IMPORTED_MODULE_0__["default"])(apiKey, baseId, tableName).then(fields => {
    fields.forEach(field => (0,_form_builder_createFormComponent_js__WEBPACK_IMPORTED_MODULE_1__["default"])(field, fieldContainer, encounteredFields));
    (0,_form_builder_dragAndDrop_js__WEBPACK_IMPORTED_MODULE_2__["default"])(formContainer, fieldContainer, baseId, apiKey, tableName, formCode);
    addEventListeners(fieldContainer);
  }).catch(error => {
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
        formComponents[i].style.display = selectedType === 'all' || fieldType === selectedType ? '' : 'none';
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
    airtableFields.forEach(function (airtableField) {
      if (airtableFormFields) {
        airtableFormFields = airtableFormFields + airtableField.innerHTML;
      } else {
        airtableFormFields = airtableField.innerHTML;
      }
    });
    let airtableForm = '<form class="airtable-form">';
    if (airtableFormFields) {
      airtableForm = airtableForm + airtableFormFields;
    }
    let submitButton = '<button type="submit" class="airtable-form-submit btn btn-primary">Submit</button>',
      honeypot = '<input size="40" maxlength="80" class="wpcf7-form-control d-none" id="honeypot" aria-invalid="false" value="" type="text" name="Name" style="display:none">';
    airtableForm = airtableForm + honeypot + submitButton + '</form>';
    formHtmlField.value = formContainer.innerHTML;
    if (editorWindow) {
      editorWindow.value = airtableForm;
    }
  }

  // Observe changes in the form container
  const observer = new MutationObserver(updateFormHtmlField);
  observer.observe(formContainer, {
    childList: true,
    subtree: true
  });

  // Update the hidden field initially
  updateFormHtmlField();
});

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _blocks_airtableBlock_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./blocks/airtableBlock.js */ "./src/blocks/airtableBlock.js");
/* harmony import */ var _forms_forms_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./forms/forms.js */ "./src/forms/forms.js");


})();

/******/ })()
;
//# sourceMappingURL=index.js.map