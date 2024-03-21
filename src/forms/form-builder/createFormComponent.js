export default function createFormComponent(field, fieldContainer, encounteredFields) {
    const component = document.createElement('div');
    component.classList.add('form-component');
    component.draggable = true;
    component.setAttribute('data-field-name', field.name); // Add field name as data attribute
    component.setAttribute('data-field-type', field.type); // Add field type as data attribute
    component.innerText = field.name;
    fieldContainer.appendChild(component);
    encounteredFields.add(field.name); // Add field to encountered set
}
