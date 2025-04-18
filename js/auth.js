<<<<<<< HEAD
function login() {
    const role = document.getElementById('userRole').value;
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
  
    if (!username || !password) {
      alert("Please enter both username and password.");
      return;
    }
  
    // Simple mock validation — for demo only
    if (role === "student") {
      window.location.href = "student-dashboard.html";
    } else if (role === "admin") {
      window.location.href = "admin-dashboard.html";
    }
  }
=======
function login() {
    const role = document.getElementById('userRole').value;
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
  
    if (!username || !password) {
      alert("Please enter both username and password.");
      return;
    }
  
    // Simple mock validation — for demo only
    if (role === "student") {
      window.location.href = "student-dashboard.html";
    } else if (role === "admin") {
      window.location.href = "admin-dashboard.html";
    }
  }
>>>>>>> d23461fac134d25602d3243322bdc12d737b5547
  