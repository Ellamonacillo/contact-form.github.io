const form = document.querySelector("form");
const successMessage = document.querySelector('.success-message');

// Errors
const errors = {
    'first-name': document.querySelector('#first-error'),
    'last-name': document.querySelector('#last-error'),
    'email': document.querySelector('#email-error'),
    'query': document.querySelector('#query-error'),
    'message': document.querySelector('#message-error'),
    'consent': document.querySelector('#consent-error')
};

// Validators
const validators = {
    'first-name': value => value.trim() !== '',
    'last-name': value => value.trim() !== '',
    'email': value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    'query': value => value !== '',
    'message': value => value.trim() !== '',
    'consent': value => value,
};

// Show/Hide Errors
function toggleError(field, show) {
    const errorElement = errors[field];
    if (!errorElement) return;
    errorElement.hidden = !show;
    errorElement.setAttribute('aria-hidden', String(!show));
}

// Handling submit form
function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    let hasErrors = false;

    successMessage.hidden = true;
    successMessage.setAttribute('aria-hidden', 'true');

    for (const field in validators) {
        const value = formData.get(field) || '';
        const isValid = validators[field](value);
        toggleError(field, !isValid);
        if (!isValid) hasErrors = true;
    }

    if (!hasErrors) {
        successMessage.hidden = false;
        successMessage.setAttribute('aria-hidden', 'false');
        successMessage.focus();
        form.reset();

        Object.keys(errors).forEach(field => toggleError(field, false));

        setTimeout(() => {
            successMessage.hidden = true;
            successMessage.setAttribute('aria-hidden', 'true');
        }, 5000);
    }
}

// Add function to form
form.addEventListener('submit', handleSubmit);