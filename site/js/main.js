/* SortedLaunch: mobile nav + contact form handling. Loaded with defer. */
(function () {
  'use strict';

  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  var form = document.getElementById('contact-form');
  if (!form) { return; }

  var status = document.getElementById('form-status');
  var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function setInvalid(field, invalid) {
    var wrap = field.closest('.field');
    if (wrap) { wrap.classList.toggle('is-invalid', invalid); }
    field.setAttribute('aria-invalid', invalid ? 'true' : 'false');
  }

  function validate() {
    var ok = true;
    var name = form.querySelector('[name="name"]');
    var email = form.querySelector('[name="email"]');
    var message = form.querySelector('[name="message"]');

    var nameOk = name.value.trim().length >= 2;
    setInvalid(name, !nameOk); ok = ok && nameOk;

    var emailOk = emailRe.test(email.value.trim());
    setInvalid(email, !emailOk); ok = ok && emailOk;

    var msgOk = message.value.trim().length >= 20;
    setInvalid(message, !msgOk); ok = ok && msgOk;

    return ok;
  }

  function showStatus(kind, text) {
    status.className = 'form-status is-' + kind;
    status.textContent = text;
    status.focus();
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validate()) {
      showStatus('error', 'Please fix the highlighted fields and try again.');
      return;
    }
    var honeypot = form.querySelector('[name="_gotcha"]');
    if (honeypot && honeypot.value) { return; }

    var action = form.getAttribute('action') || '';
    if (action.indexOf('FORM_ID') !== -1) {
      showStatus('error', 'This form is not connected yet. Use the GitHub or LinkedIn links on this page to reach me.');
      return;
    }

    var button = form.querySelector('button[type="submit"]');
    button.disabled = true;
    button.textContent = 'Sending...';

    fetch(action, {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(form)
    }).then(function (res) {
      if (res.ok) {
        form.reset();
        showStatus('success', 'Thanks. Your message is in. I will reply by email.');
      } else {
        return res.json().then(function (data) {
          var msg = (data && data.errors) ? data.errors.map(function (x) { return x.message; }).join(', ') : 'Something went wrong. Please try again.';
          showStatus('error', msg);
        });
      }
    }).catch(function () {
      showStatus('error', 'Network problem. Please try again.');
    }).finally(function () {
      button.disabled = false;
      button.textContent = 'Send message';
    });
  });

  ['name', 'email', 'message'].forEach(function (n) {
    var el = form.querySelector('[name="' + n + '"]');
    if (el) { el.addEventListener('input', function () { if (el.getAttribute('aria-invalid') === 'true') { validate(); } }); }
  });
})();
