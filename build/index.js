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
enqueueStyle();
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
  withSelect
} = wp.data;
registerBlockType('airtable-wp/dynamic-form-builder', {
  title: 'Airtable WP',
  icon: 'editor-table',
  category: 'widgets',
  edit({
    fields
  }) {
    const [formData, setFormData] = useState({});
    const handleChange = event => {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value
      });
    };
    const handleSubmit = event => {
      event.preventDefault();
      // Send formData to Airtable using your preferred method (e.g., fetch API)
      console.log('Form data submitted:', formData);
    };
    useEffect(() => {
      createFormComponent();
    }, []);
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
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
      id: "form-container",
      onSubmit: handleSubmit
    }, fields && fields.map && fields.map(field => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Fragment, {
      key: field.name
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
      htmlFor: field.name
    }, field.name), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
      type: "text",
      id: field.name,
      name: field.name,
      value: formData[field.name] || '',
      onChange: handleChange
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
      type: "submit"
    }, "Submit"))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      id: "form-code-container"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("textarea", {
      id: "form-code"
    }))));
  },
  save() {
    // Save function not needed for this example
    return null;
  }
});

// Retrieve Airtable fields using withSelect HOC
withSelect(select => {
  const {
    getEntityRecords
  } = select('core');
  return {
    fields: getEntityRecords('postType', 'airtable-field') // Adjust postType and taxonomy as needed
  };
});
function createFormComponent() {
  const container = document.getElementById('form-code-container');
  if (container) {
    // Logic to append elements to the container
  } else {
    console.error('Container element not found');
  }
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

  //if (fieldContainer && formContainer && formCode) {
  const airtableWpSettings = window.airtableWpSettingsObject || {}; // Update object name here
  const apiKey = airtableWpSettings.apiKey || '';
  const baseId = airtableWpSettings.baseId || '';
  const tableName = airtableWpSettings.tableName || '';
  const encounteredFields = new Set(); // Set to store encountered field names

  (0,_form_builder_fetchAirtableSchema_js__WEBPACK_IMPORTED_MODULE_0__["default"])(apiKey, baseId, tableName).then(fields => {
    fields.forEach(field => (0,_form_builder_createFormComponent_js__WEBPACK_IMPORTED_MODULE_1__["default"])(field, fieldContainer, encounteredFields));
    (0,_form_builder_dragAndDrop_js__WEBPACK_IMPORTED_MODULE_2__["default"])(formContainer, fieldContainer, baseId, apiKey, tableName, formCode);
    addEventListeners(fieldContainer); // Pass fieldContainer to addEventListeners
  }).catch(error => {
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