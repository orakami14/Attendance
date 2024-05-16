 // Handle student form submission
const logoutButton = document.getElementById('logout');
studentForm.addEventListener('submit', (event) => {
  event.preventDefault();

  // Get the student data from the form inputs
  const name = studentForm.elements['name'].value;
  const number = studentForm.elements['number'].value;
  const city = studentForm.elements['city'].value;

  // Add the student data to the table body
  const studentRow = document.createElement('tr');
  studentRow.innerHTML = `
    <td>${number}</td>
    <td>${name}</td>
    <td>${number}</td>
    <td>${city}</td>
    <td>Present</td>
    <td>${new Date().toLocaleString()}</td>
  `;
  document.getElementById('studentTableBody').appendChild(studentRow);

  // Clear the form inputs
  studentForm.reset();
});

logoutButton.addEventListener('click', () => {
    // Clear the student data from the table body
    document.getElementById('studentTableBody').innerHTML = '';
  
    // Clear the form inputs
    studentForm.reset();
  
    // Redirect the user to the login page
    window.location.href = 'login.html';
  });

    
