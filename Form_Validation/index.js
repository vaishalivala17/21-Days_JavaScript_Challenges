document.addEventListener('DOMContentLoaded', function() {
  const toggleBtns = document.querySelectorAll('.toggle-btn');
  const form = document.getElementById('authForm');
  const submitBtn = document.getElementById('submitBtn');
  const successMsg = document.getElementById('successMsg');
  const body = document.body;

  let currentMode = 'signup';

  // Set initial mode and class
  body.className = 'signup-mode';

  // Get all fields
  const fields = {
    name: document.getElementById('name'),
    email: document.getElementById('email'),
    password: document.getElementById('password'),
    confirmPassword: document.getElementById('confirmPassword')
  };

  // Map field names to error element IDs
  const errorIds = {
    name: 'nameError',
    email: 'emailError',
    password: 'passwordError',
    confirmPassword: 'confirmError'
  };

  // Define field order per mode
  function getFieldOrder() {
    return currentMode === 'signup' 
      ? ['name', 'email', 'password', 'confirmPassword']
      : ['email', 'password'];
  }

  // Password toggle functionality
  document.querySelectorAll('.toggle-password').forEach(btn => {
    btn.addEventListener('click', function() {
      const targetId = this.dataset.target;
      const field = document.getElementById(targetId);
      const icon = this.querySelector('i');
      if (field.type === 'password') {
        field.type = 'text';
        icon.className = 'fas fa-eye-slash';
      } else {
        field.type = 'password';
        icon.className = 'fas fa-eye';
      }
    });
  });

  // Validation functions
  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validatePassword(password) {
    return password.length >= 8 && /[A-Z]/.test(password) && /\d/.test(password);
  }

  function validateName(name) {
    return name.length >= 2 && /^[A-Za-z\s]+$/.test(name);
  }

  function showError(fieldName, message) {
    const field = fields[fieldName];
    const errorEl = document.getElementById(errorIds[fieldName]);
    if (field) field.classList.add('error');
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.add('show');
    }
  }

  function clearError(fieldName) {
    const field = fields[fieldName];
    const errorEl = document.getElementById(errorIds[fieldName]);
    if (field) field.classList.remove('error', 'success');
    if (errorEl) {
      errorEl.classList.remove('show');
      errorEl.textContent = '';
    }
  }

  function validateField(fieldName, showErrors) {
    const field = fields[fieldName];
    if (!field) return true;

    const value = field.value.trim();
    clearError(fieldName);

    if (value === '') return false;

    let isValid = true;
    let errorMessage = '';

    switch (fieldName) {
      case 'email':
        if (!validateEmail(value)) {
          isValid = false;
          errorMessage = 'Invalid email format';
        }
        break;
      case 'password':
        if (!validatePassword(value)) {
          isValid = false;
          errorMessage = '8+ chars, 1 uppercase, 1 digit';
        }
        break;
      case 'name':
        if (!validateName(value)) {
          isValid = false;
          errorMessage = 'Only letters, 2+ chars';
        }
        break;
      case 'confirmPassword':
        if (value !== fields.password.value) {
          isValid = false;
          errorMessage = "Passwords don't match";
        }
        break;
    }

    if (!isValid && showErrors) {
      showError(fieldName, errorMessage);
    }

    if (isValid) {
      field.classList.add('success');
    }

    return isValid;
  }

  // disable next fields until current is valid
  function updateFieldStates() {
    const order = getFieldOrder();
    
    let allPreviousValid = true;
    
    order.forEach((fieldName, index) => {
      const field = fields[fieldName];
      if (!field) return;

      // Enable if all previous fields are valid
      if (allPreviousValid) {
        field.disabled = false;
        // Validate current field to check if it's valid for unlocking next
        const isValid = validateField(fieldName, false);
        allPreviousValid = isValid;
      } else {
        field.disabled = true;
        field.value = '';
        clearError(fieldName);
      }
    });

    // Update submit button
    const allValid = order.every(fn => validateField(fn, false));
    submitBtn.disabled = !allValid;
    submitBtn.textContent = currentMode === 'signup' ? 'Sign Up' : 'Login';
  }

  // Toggle modes
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      toggleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      currentMode = btn.dataset.mode;
      body.className = currentMode + '-mode';

      // Clear all fields and errors
      Object.keys(fields).forEach(fieldName => {
        if (fields[fieldName]) {
          fields[fieldName].value = '';
          clearError(fieldName);
        }
      });
      
      updateFieldStates();
    });
  });

  // Field input updates states; blur shows errors
  Object.keys(fields).forEach(function(fieldName) {
    const field = fields[fieldName];
    if (field) {
      field.addEventListener('input', function() {
        updateFieldStates();
        // Show password and confirm password errors immediately while typing
        if ((fieldName === 'password' || fieldName === 'confirmPassword') && field.value.trim() !== '') {
          validateField(fieldName, true);
        }
      });
      field.addEventListener('blur', function() {
        validateField(fieldName, true);
      });
    }
  });

  // Form submit
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const order = getFieldOrder();
    let allValid = true;
    
    order.forEach(function(fieldName) {
      if (!fields[fieldName].value.trim()) {
        allValid = false;
        showError(fieldName, 'This field is required');
      } else if (!validateField(fieldName, true)) {
        allValid = false;
      }
    });

    if (allValid) {
      const message = currentMode === 'signup' ? 'Sign up successful!' : 'Login successful!';
      successMsg.textContent = message;
      successMsg.classList.remove('hidden');
      successMsg.classList.remove('show');
      setTimeout(function() { successMsg.classList.add('show'); }, 10);

      setTimeout(function() {
        successMsg.classList.remove('show');
        successMsg.classList.add('hidden');
        form.reset();
        Object.keys(fields).forEach(clearError);
        updateFieldStates();
      }, 2000);
    }
  });

  updateFieldStates();
});
