$(document).ready(function () {
  $('#loginBtn').on('click', function () {
    const username = $('#username').val().trim();
    const password = $('#password').val().trim();
    const role = $('#userRole').val();

    if (!username || !password) {
      alert("Please fill in all fields.");
      return;
    }

    if (!username.toLowerCase().endsWith("@wmsu.ph")) {
      alert("Only @wmsu.ph email addresses are allowed.");
      return;
    }

    // Store username without @wmsu.ph in localStorage
    const usernameWithoutDomain = username.toLowerCase().replace(/@wmsu\.ph$/, "");
    localStorage.setItem("username", usernameWithoutDomain);

    if (role === "student") {
      window.location.href = "student-dashboard.html";
    } else if (role === "admin") {
      window.location.href = "admin-dashboard.html";
    }
  });
});
