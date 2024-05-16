const registerForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form');
const dashboard = document.getElementById('dashboard');
const message = document.getElementById('message');
const checkInDetails = document.getElementById('check-in-details');
const checkInTime = document.getElementById('check-in-time');

// Default username and password
const defaultUsername = 'student';
const defaultPassword = 'password';

// Register form submission
if (registerForm) {
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = registerForm['name'].value;
    const email = registerForm['email'].value;
    const address = registerForm['address'].value;
    const studentNumber = registerForm['studentNumber'].value;
    const phone = registerForm['phone'].value;

    if (name === '' || email === '' || address === '' || studentNumber === '' || phone === '') {
      message.textContent = 'Please fill in all the required fields.';
      return;
    }

    const user = { name, email, address, studentNumber, phone };
    localStorage.setItem('user', JSON.stringify(user));

    message.textContent = 'Registration successful! Redirecting to dashboard...';
    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 2000);
  });
}

// Login form submission
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = loginForm['email'].value;
    const password = loginForm['password'].value;

    const user = JSON.parse(localStorage.getItem('user'));

    // Check if default username and password are used
    if (email === defaultUsername && password === defaultPassword) {
      message.textContent = 'Login successful! Redirecting to dashboard...';
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 2000);
    } else {
      message.textContent = 'Invalid email or password.';
    }
  });
}
