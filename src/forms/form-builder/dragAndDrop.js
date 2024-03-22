export default function dragAndDrop(formContainer,fieldContainer, baseId, apiKey, tableName, formCode) {
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
                })
                    .then(response => response.json())
                    .then(data => {
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
                    })
                    .catch(error => console.error('Error fetching Airtable schema:', error));
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