function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const role = document.getElementById("userRole").value;

  // Basic sample login (replace this with real validation if needed)
  if (username && password) {
    if (role === "student") {
      window.location.href = "student-dashboard.html";
    } else if (role === "admin") {
      window.location.href = "admin-dashboard.html";
    }
  } else {
    alert("Please fill in all fields.");
  }
}
