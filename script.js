console.log('app.js: DOMContentLoaded event fired');

const registerForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form');
const dashboard = document.getElementById('dashboard');
const message = document.getElementById('message');
const checkInButton = document.getElementById('check-in-button');
const checkOutButton = document.getElementById('check-out-button');
const logoutButton = document.getElementById('logout-button');
const checkInDetails = document.getElementById('check-in-details');
const checkInTime = document.getElementById('check-in-time');
 
document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
  
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

// Login form submission
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = loginForm['email'].value;
  const password = loginForm['password'].value;

  const user = JSON.parse(localStorage.getItem('user'));

  if (email === user.email && password === 'password') {
    message.textContent = 'Login successful! Redirecting to dashboard...';
    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 2000);
  } else {
    message.textContent = 'Invalid email or password.';
  }
});

// Display user details on dashboard
function displayUserDetails() {
  const user = JSON.parse(localStorage.getItem('user'));
  const userDetails = document.getElementById('user-details');

  userDetails.innerHTML = `
    <p>Name: ${user.name}</p>
    <p>Email: ${user.email}</p>
    <p>Address: ${user.address}</p>
    <p>Student number: ${user.studentNumber}</p>
    <p>Phone: ${user.phone}</p>
  `;

  const checkInButton = document.getElementById('check-in-button');
  const logoutButton = document.getElementById('logout-button');

  if (checkInButton.style.display === 'none') {
    checkInButton.style.display = 'block';
    logoutButton.style.display = 'block';
  }
}

// Check in button click
const checkInButton = document.getElementById('check-in-button');

checkInButton.addEventListener('click', () => {
  const checkInTime = new Date().toLocaleString();
  const checkInDetails = document.getElementById('check-in-details');
  const checkOutButton = document.getElementById('check-out-button');

  checkInDetails.style.display = 'block';
  checkInDetails.querySelector('#check-in-time').textContent = checkInTime;
  checkOutButton.style.display = 'block';

  // Save check-in time to local storage
  localStorage.setItem('checkInTime', checkInTime);
});

// Check out button click
const checkOutButton = document.getElementById('check-out-button');

checkOutButton.addEventListener('click', () => {
  const checkInDetails = document.getElementById('check-in-details');

  checkInDetails.style.display = 'none';
  checkOutButton.style.display = 'none';

  // Remove check-in time from local storage
  localStorage.removeItem('checkInTime');
});

// Logout button click
const logoutButton = document.getElementById('logout-button');
logoutButton.addEventListener('click', () => {
  localStorage.removeItem('user');
  window.location.href = 'login.html';
});

// Check if user is logged in on dashboard load
if (localStorage.getItem('user')) {
  displayUserDetails();

  // Display check-in time if it exists
  const checkInTime = localStorage.getItem('checkInTime');
  if (checkInTime) {
    const checkInDetails = document.getElementById('check-in-details');
    const checkInTimeElement = document.getElementById('check-in-time');

    checkInDetails.style.display = 'block';
    checkInTimeElement.textContent = checkInTime;
    checkOutButton.style.display = 'block';
  }
// Save the registration data in the local storage
localStorage.setItem('lastRegisteredName', registerForm.elements['name'].value);
localStorage.setItem('lastRegisteredEmail', registerForm.elements['email'].value);

} else {
    window.location.href = 'dashboard.html';
}

document.addEventListener('DOMContentLoaded', () => {
    const checkInButton = document.getElementById('check-in-button');
  const checkOutButton = document.getElementById('check-out-button');
  const logoutButton = document.getElementById('logout-button');
  const recordsList = document.getElementById('records-list');

  checkInButton.addEventListener('click', () => {
    console.log('Check-in button:', checkInButton);
    handleCheckInButtonClick();
  });

  checkOutButton.addEventListener('click', () => {
    console.log('Check-out button:', checkOutButton);
    handleCheckOutButtonClick();
  });

  logoutButton.addEventListener('click', () => {
    console.log('Logout button:', logoutButton);
    sessionStorage.clear();
    window.location.href = 'login.html';
  });
  
    function handleCheckInButtonClick() {
      const now = new Date();
      const time = now.toLocaleTimeString();
      const date = now.toLocaleDateString();
  
      localStorage.setItem('lastCheckInTime', time);
      localStorage.setItem('lastCheckInDate', date);
  
      // Show the check-out button
      checkOutButton.style.display = 'block';
    }
  
    function handleCheckOutButtonClick() {
      const now = new Date();
      const time = now.toLocaleTimeString();
      const date = now.toLocaleDateString();
  
      const record = {
        name: getLastRegisteredName(),
        email: getLastRegisteredEmail(),
        checkInTime: getLastCheckInTime(),
        checkOutTime: time,
        checkInDate: getLastCheckInDate(),
        checkOutDate: date
      };
  
      records.push(record);
      displayRecords();
  
      // Get the last record from the records array
      const lastRecord = records[records.length - 1];
  
      // Update the check-out time and date for the last record
      lastRecord.checkOutTime = time;
      lastRecord.checkOutDate = date;
  
      // Display the updated records
      displayRecords();
  
      // Hide the check-out button
      checkOutButton.style.display = 'none';
  
      // Clear the last check-in time and date
      localStorage.removeItem('lastCheckInTime');
      localStorage.removeItem('lastCheckInDate');
  
      // Clear the last registered name and email
      localStorage.removeItem('lastRegisteredName');
      localStorage.removeItem('lastRegisteredEmail');
  
      alert('You have checked out! Your record has been saved.');
    }
  
    function getLastCheckInTime() {
      return localStorage.getItem('lastCheckInTime') || 'N/A';
    }
  
    function getLastCheckInDate() {
      return localStorage.getItem('lastCheckInDate') || 'N/A';
    }
  
    function getLastRegisteredName() {
      return localStorage.getItem('lastRegisteredName') || 'N/A';
    }
  
    function getLastRegisteredEmail() {
      return localStorage.getItem('lastRegisteredEmail') || 'N/A';
    }
  
    function displayRecords() {
      if (recordsList) {
        recordsList.innerHTML = '';
  
        records.forEach((record, index) => {
          const listItem = document.createElement('li');
          listItem.innerHTML = `
            <strong>Record ${index + 1}</strong><br>
            Name: ${record.name}<br>
            Email: ${record.email}<br>
            Check-in: ${record.checkInDate} ${record.checkInTime}<br>
            Check-out: ${record.checkOutDate} ${record.checkOutTime}
          `;
          recordsList.appendChild(listItem);
        });
      } else {
        console.error('Error: records-list element not found');
      }
    }
    });
}
});