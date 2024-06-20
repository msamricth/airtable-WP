
const formContainer = document.querySelector('.airtable-WP--form-container');
const form = document.querySelector('.airtable-form');
function ogSubmit() {
    document.addEventListener('DOMContentLoaded', function () {
        const form = document.querySelector('form.airtable-form');
        form.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent the default form submission

            const formData = new FormData(form);
            const dataFields = {};

            formData.forEach((value, key) => {
                dataFields[key] = value;
            });

            const data = {
                fields: dataFields
            };

            const airtableWp = window.airtableWpSettingsObject || {};
            const airtableApiKey = airtableWp.apiKey;
            const airtableBaseId = airtableWp.baseId;
            const airtableTableName = airtableWp.tableName;

            // Debugging information
            console.log('Airtable API Key:', airtableApiKey);
            console.log('Airtable Base ID:', airtableBaseId);
            console.log('Airtable Table Name:', airtableTableName);
            console.log('Form Data:', data);

            fetch(`https://api.airtable.com/v0/${airtableBaseId}/${airtableTableName}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${airtableApiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(response => {
                    if (!response.ok) {
                        return response.json().then(err => { throw err; });
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Success:', data);
                    alert('Form submitted successfully!');
                })
                .catch((error) => {
                    console.error('Error:', error);
                    alert('An error occurred while submitting the form.');
                });
        });
    });
}



function populateFormFromAirtable() {
    // Get the query string from the URL
    if (form) {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);



        const airtableWp = window.airtableWpSettingsObject || {};
        const airtableApiKey = airtableWp.apiKey;
        const airtableBaseId = airtableWp.baseId;
        const airtableTableName = airtableWp.tableName;

        if (urlParams.has('recID')) {
            const recID = urlParams.get('recID');
            //  ?recID="recfPJzVbCmRwOXN3"

            // Check if the 'email' parameter exists in the query string



            // Make AJAX request to fetch the Airtable record based on the email
            fetch(`https://api.airtable.com/v0/${airtableBaseId}/${airtableTableName}/${recID}`, {
                headers: {
                    'Authorization': `Bearer ${airtableApiKey}`
                }
            })
                .then(response => response.json())
                .then(data => {
                    // Check if record exists
                    if (data && data.fields) {
                        // Iterate over each field in the form
                        document.querySelectorAll('input').forEach(input => {
                            // Check if the field name matches a field in the Airtable record
                            if (data.fields[input.name]) {
                                // Fill out the form field with the value from the Airtable record
                                input.value = data.fields[input.name];
                            }
                        });
                    } else {
                        console.log('No record found for rec id:', recID);
                    }
                })
                .catch(error => {
                    console.error('Error fetching Airtable record:', error);
                });
        }
    }
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', populateFormFromAirtable);




















const contactFormBlocks = document.querySelectorAll('.airtable-WP');
let contactFormID, contactFormBtn, contactFormError, contactFormSuccess, contactFormInstance, contactFormSending, contactFormContainer, contactFormHoneyPot, contactFormEmail, contactFormEditURL;



function formsInit() {
    contactFormBlocks.forEach(function (contactFormBlock) {
        contactFormBtn = contactFormBlock.querySelector('button[type="submit"]');
        contactFormEmail = contactFormBlock.querySelector('input[type="email"]');
        contactFormID = contactFormBlock.id;
        contactFormBtn.disabled = true;


        contactFormContainer = contactFormBlock.querySelector('.hidden-only-if-sent');
        contactFormSuccess = contactFormBlock.querySelector('.visible-only-if-sent');//visible-only-if-sent
        contactFormError = contactFormBlock.querySelector('.visible-only-if-error');
        contactFormSending = contactFormBlock.querySelector('.visible-only-if-sending');
        contactFormHoneyPot = contactFormBlock.querySelector('.honeypot');
        contactFormEditURL = contactFormSuccess.querySelector('.airtable-edit-url');
        contactFormInstance = contactFormContainer.querySelector('.airtable-form');
        console.log(contactFormInstance)


        checkHoneyPot(contactFormHoneyPot, contactFormBtn);
        emailValidation(contactFormEmail, contactFormBtn, contactFormHoneyPot);


        let contactFormStatusSuccess, contactFormStatusInvalid, contactFormStatusSending;

        onClassChange(contactFormInstance, (observer) => {
            contactFormStatusSending = contactFormInstance.classList.contains('submitting');
            contactFormStatusSuccess = contactFormInstance.classList.contains('sent');
            contactFormStatusInvalid = contactFormInstance.classList.contains('failed');

            if (contactFormStatusSending) {
                contactFormContainer.classList.add = 'fade-out';
                contactFormContainer.style.display = 'none';
                contactFormSending.style.display = 'block';
                contactFormSending.classList.add = 'animate';
            }

            if (contactFormStatusSuccess) {
                contactFormSending.classList.add = 'fade-out';
                contactFormSending.style.display = 'none';
                contactFormSuccess.style.display = 'block';
                contactFormSuccess.classList.add = 'animate';
                observer.disconnect();
            }

            if (contactFormStatusInvalid) {
                contactFormContainer.classList.add = 'fade-out';
                contactFormContainer.style.display = 'none';
                contactFormError.style.display = 'block';
                contactFormError.classList.add = 'animate';
                observer.disconnect();
            }

        });

        if (contactFormInstance) {
            contactFormInstance.addEventListener('submit', function (event) {
                contactFormInstance.classList.add('submitting');
                event.preventDefault(); // Prevent the default form submission

                const formData = new FormData(form);
                const formObject = {};
                formData.forEach((value, key) => {
                    if (value.trim() !== '') { // Only add the field if it's not empty
                        formObject[key] = value;
                    }
                });
                const fileInputs = contactFormInstance.querySelectorAll('.awp-file');
                fileInputs.forEach(function (fileInput) {

                    // Check if a file was selected
                    if (fileInput.files.length > 0) {
                        // Append the file to the formData
                        let label = fileInput.querySelector('label').textContent;
                        console.log(label)
                        formObject[label] = fileInput.files[0];
                    }
                })
                fetch(airtable_wp_ajax_url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    },
                    body: new URLSearchParams({
                        action: 'save_form_config',
                        form_data: JSON.stringify(formObject),
                    }),
                })
                    .then(response => response.json())

                    .then(data => {
                        if (data.success) {
                            let record_id = data.data.record_id;
                            if (record_id) {
                                const editLink = document.createElement('a');
                                editLink.href = window.location.href + '?recID=' + record_id;
                                editLink.innerText = 'Edit your information';
                                contactFormEditURL.appendChild(editLink);

                            }
                            form.classList.remove('submitting');

                            form.classList.add('sent');
                            console.log('Form submitted successfully:', data);

                        } else {

                            console.error('Error submitting form:', data.message, data);
                        }
                    })
                    .catch(error => {
                        console.error('Error submitting form:', error);
                    });
            });
        }
    });


    expandTextAreaPattern();


}
function onClassChange(node, callback) {
    let lastClassString = node.classList.toString();

    const mutationObserver = new MutationObserver((mutationList) => {
        for (const item of mutationList) {
            if (item.attributeName === "class") {
                const classString = node.classList.toString();
                if (classString !== lastClassString) {
                    callback(mutationObserver);
                    lastClassString = classString;
                    break;
                }
            }
        }
    });

    mutationObserver.observe(node, { attributes: true });

    return mutationObserver;
}


function emailValidation(contactFormEmail, contactFormBtn, contactFormHoneyPot) {

    if (contactFormEmail) {
        contactFormBtn.disabled = true;
        contactFormEmail.addEventListener('input', function (evt) {
            var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
            if (testEmail.test(this.value)) checkHoneyPot(contactFormHoneyPot, contactFormBtn);
            else contactFormBtn.disabled = true;
        });
    }
}


function checkHoneyPot(honeyPot, contactFormBtn, $class = null) {
    if (honeyPot && honeyPot.value) {
        contactFormBtn.disabled = true;
    } else {
        contactFormBtn.disabled = false;
    }
}

function expandTextAreaPattern() {

    function calcHeight(value) {
        var numberOfLineBreaks = (value.match(/\n/g) || []).length;
        var heightVar = 30;
        var newHeight = heightVar + numberOfLineBreaks * heightVar + 12 + 2;
        return newHeight;
    }

    var textareaEX = document.querySelector("textarea.form-control");

    if (textareaEX) {
        textareaEX.addEventListener("keyup", function () {
            textareaEX.style.height = calcHeight(textareaEX.value) + "px";
        });
    }

    var cf7Formtextarea = document.querySelector('.wpcf7-textarea');

    if (cf7Formtextarea) {
        cf7Formtextarea.addEventListener('keyup', function () {
            pageCheck();
            this.style.overflow = 'hidden';
            this.style.height = 0;
            this.style.height = this.scrollHeight + 'px';
        }, false);
    }
}

if (contactFormBlocks) {
    document.addEventListener('DOMContentLoaded', formsInit);
}
