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
function dragAndDrop(formContainer, fieldContainer, baseId, apiKey, tableName, formCode) {
  formContainer.addEventListener('dragover', function (event) {
    event.preventDefault();
  });
  formContainer.addEventListener('drop', function (event) {
    event.preventDefault();
    const fieldName = event.dataTransfer.getData('text/plain');
    const fieldType = event.dataTransfer.getData('application/field-type');
    console.log('fieldName:', fieldName); // Log fieldName
    console.log('fieldType:', fieldType); // Log fieldType

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
    inputElement.classList.add('form-control');
    inputElement.setAttribute('name', fieldName); // Set input element name to match field name
    inputElement.placeholder = fieldName;
    formContainer.appendChild(inputElement);
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

/***/ "./src/forms/forms.js":
/*!****************************!*\
  !*** ./src/forms/forms.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _form_builder_fetchAirtableSchema_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./form-builder/fetchAirtableSchema.js */ "./src/forms/form-builder/fetchAirtableSchema.js");
/* harmony import */ var _form_builder_createFormComponent_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./form-builder/createFormComponent.js */ "./src/forms/form-builder/createFormComponent.js");
/* harmony import */ var _form_builder_dragAndDrop_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./form-builder/dragAndDrop.js */ "./src/forms/form-builder/dragAndDrop.js");



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
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      action: 'save_airtable_form',
      formTitle: formTitle,
      formConfig: formConfig
    })
  }).then(response => response.json()).then(data => {
    if (data.success) {
      alert('Form saved successfully');
    } else {
      alert('Error saving form: ' + data.data);
    }
  }).catch(error => {
    console.error('Error saving form:', error);
    alert('Error saving form');
  });
}
document.addEventListener('DOMContentLoaded', initializeForm);

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