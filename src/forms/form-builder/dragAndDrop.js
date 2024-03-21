export default function dragAndDrop(formContainer, baseId, apiKey, tableName, formCode) {
    formContainer.addEventListener('dragover', function (event) {
        event.preventDefault();
    });

    formContainer.addEventListener('drop', function (event) {
        // Drag and drop functionality implementation here...
    });
}
