// Shared AJAX Form Submission Handler — FormSubmit.co
document.addEventListener('DOMContentLoaded', function () {
  // Configuration for each form
  const forms = [
    {
      formId: 'contact-form',
      submitId: 'contact-submit',
      statusId: 'contact-form-status',
      sendingText: 'Sending...',
      successText: '✅ Message sent successfully! Thank you.',
      errorText: '⚠️ There was an error sending your message. Please try again or email us directly.'
    },
    {
      formId: 'subscribe-form',
      submitId: 'subscribe-submit',
      statusId: 'subscribe-form-status',
      sendingText: 'Subscribing...',
      successText: '✅ Successfully subscribed! Thank you.',
      errorText: '⚠️ There was an error. Please try again or email us directly.'
    }
  ];

  // Initialize each form
  forms.forEach(config => {
    const form = document.getElementById(config.formId);
    if (!form) return; // Skip if form not present on this page

    const submitBtn = document.getElementById(config.submitId);
    const statusDiv = document.getElementById(config.statusId);

    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      // UI State: Sending
      submitBtn.disabled = true;
      submitBtn.textContent = config.sendingText;
      statusDiv.textContent = '';
      statusDiv.className = 'form-status';

      try {
        const formData = new FormData(form);
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          statusDiv.textContent = config.successText;
          statusDiv.classList.add('success');
          form.reset();
        } else {
          throw new Error('Server responded with an error');
        }
      } catch (err) {
        statusDiv.textContent = config.errorText;
        statusDiv.classList.add('error');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = config.submitBtnText || form.querySelector('button[type="submit"]').dataset.originalText || 'Submit';
      }
    });

    // Preserve original button text for reset
    if (submitBtn) {
      submitBtn.dataset.originalText = submitBtn.textContent;
    }
  });
});
