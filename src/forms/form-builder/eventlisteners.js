export default function fieldUIListeners() {
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

    })



    removeBTNs.forEach(function (removeBTN) {
        let fieldID = removeBTN.id;
        if (fieldID) {
            fieldID = fieldID.replace("remove-field-", "");
            let atField = document.getElementById('airtable-field-container-'+fieldID),
                parentThing = 'fieldUI-' + fieldID,
                fieldUI = document.getElementById(parentThing);
            removeBTN.addEventListener('click', function (event) {
                event.preventDefault();
                console.log('cliked')
                if (fieldUI) {
                    formContainer.removeChild(fieldUI);
                }
                if (atField) {
                    formContainer.removeChild(atField);
                }

            });
        }

    })
}