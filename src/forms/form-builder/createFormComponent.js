export default function createFormComponent(field, fieldContainer, encounteredFields) {
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
