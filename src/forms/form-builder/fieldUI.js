export default function initFieldUI(formContainer, fieldID, inputElement) {

    // Create a UI around the dropped element
    const fieldUI = document.createElement('div');
    fieldUI.classList.add('field-ui');
    fieldUI.id = 'fieldUI-'+fieldID;

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
    removeFieldButton.href="#";
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
