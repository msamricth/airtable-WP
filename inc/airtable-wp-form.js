document.addEventListener('DOMContentLoaded', function() {
    const script = document.createElement('script');
    script.src = 'https://widget.cloudinary.com/v2.0/global/all.js';
    document.head.appendChild(script);
});

const formContainer = document.querySelector('.airtable-WP--form-container');
const form = document.querySelector('.airtable-form');

function uploadToCloudinary(file) {
    return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'preset'); // Replace with your actual upload preset
        formData.append('cloud_name', 'dp1qyhhlo'); // Replace with your actual cloud name

        console.log('Uploading to Cloudinary with formData:', formData);
        fetch('https://api.cloudinary.com/v1_1/dp1qyhhlo/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log('Cloudinary response:', data);
            if (data.secure_url) {
                const secureUrl = data.secure_url.replace(/\\/g, '');
                resolve({ url: secureUrl, filename: file.name });
            } else {
                reject('Upload failed');
            }
        })
        .catch(error => {
            reject(error);
        });
    });
}

function populateFormFromAirtable() {
    if (form) {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);

        const airtableWp = window.airtableWpSettingsObject || {};
        const airtableApiKey = airtableWp.apiKey;
        const airtableBaseId = airtableWp.baseId;
        const airtableTableName = airtableWp.tableName;

        if (urlParams.has('recID')) {
            const recID = urlParams.get('recID');

            fetch(`https://api.airtable.com/v0/${airtableBaseId}/${airtableTableName}/${recID}`, {
                headers: {
                    'Authorization': `Bearer ${airtableApiKey}`
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data && data.fields) {
                    document.querySelectorAll('input').forEach(input => {
                        if (data.fields[input.name]) {
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
        contactFormSuccess = contactFormBlock.querySelector('.visible-only-if-sent');
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
            contactFormInstance.addEventListener('submit', async function (event) {
                contactFormInstance.classList.add('submitting');
                event.preventDefault(); // Prevent the default form submission

                const formData = new FormData(contactFormInstance);
                const formObject = {};
                console.log(formData);
                for (const [key, value] of formData.entries()) {
                    if (value instanceof File && value.size > 0) {
                        try {
                            const fileData = await uploadToCloudinary(value);
                            formObject[key] = [fileData]; // Array with the file data object
                        } catch (error) {
                            console.error('File upload error:', error);
                            contactFormInstance.classList.remove('submitting');
                            return;
                        }
                    } else if (typeof value === 'string' && value.trim() !== '') {
                        formObject[key] = value;
                    }
                }

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
                .then(response => response.text())
                .then(responseText => {
                    console.log('Response text:', responseText);
                    let data;
                    try {
                        data = JSON.parse(responseText);
                    } catch (error) {
                        console.error('Error parsing JSON:', error);
                        throw new Error('Invalid JSON response');
                    }
                    if (data.success) {
                        let record_id = data.data.record_id;
                        if (record_id) {
                            const editLink = document.createElement('a');
                            editLink.href = window.location.href + '?recID=' + record_id;
                            editLink.innerText = 'Edit your information';
                            contactFormEditURL.appendChild(editLink);
                        }
                        contactFormInstance.classList.remove('submitting');
                        contactFormInstance.classList.add('sent');
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
