// Enqueue the stylesheet
function enqueueStyle() {
    const styleUrl = new URL('style.css', document.currentScript.src);
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = styleUrl.href;
    document.head.appendChild(link);
}

//enqueueStyle();

const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { useState, useEffect } = wp.element;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, SelectControl } = wp.components;

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
    edit({ attributes, setAttributes }) {
        const [forms, setForms] = useState([]);

        useEffect(() => {
            const storedForms = JSON.parse(localStorage.getItem('airtableForms')) || [];
            setForms(storedForms);
        }, []);

        const formOptions = forms.map((form, index) => ({
            label: form.name,
            value: form.name
        }));

        return (
            <Fragment>
                <InspectorControls>
                    <PanelBody title="Select Form">
                        <SelectControl
                            label="Form"
                            value={attributes.selectedForm}
                            options={formOptions}
                            onChange={(value) => setAttributes({ selectedForm: value })}
                        />
                    </PanelBody>
                </InspectorControls>
                <div draggable="false">
                    <Fragment>
                        {/* Filter by type */}
                        <label htmlFor="filter-by-type">Filter by Type:</label>
                        <select id="filter-by-type">
                            <option value="all">All</option>
                            <option value="singleLineText">Text</option>
                            <option value="email">Email</option>
                            <option value="date">Date</option>
                            <option value="singleSelect">Select</option>
                            <option value="Checkbox">Checkbox</option>
                            <option value="multipleAttachments">File</option>
                        </select>

                        {/* Search field */}
                        <label htmlFor="search-field">Search Fields:</label>
                        <input type="text" id="search-field" placeholder="Search..." />

                        <div id="field-container">
                            {/* Render fields dynamically based on the fields prop */}
                        </div>

                        {/* Form builder container */}
                        <div id="form-builder-container">
                            <form id="form-container">
                                {/* Form fields will be dynamically rendered here */}
                            </form>
                        </div>

                        {/* Code view container */}
                        <div id="form-code-container">
                            <textarea id="form-code"></textarea>
                        </div>
                    </Fragment>
                </div>
            </Fragment>
        );
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
