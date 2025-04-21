function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const role = document.getElementById("userRole").value;

   //sample admin account details
   const adminUsername = 'thisRandomAdmin';
   const adminPassword = 'obnoxiousPassword';
 
   // our login without validation just sample 
   if (username && password) {
     if (role === "student") {
       window.location.href = "student-dashboard.html";
     } else if (role === "admin") {
       if (username != adminUsername){
         feedback.innerHTML = `<h4>Invalid Username</h4>`;
         return;
       } 
       if (password != adminPassword) {
         feedback.innerHTML = `<h4>Invalid Password</h4>`;
         return;
       }
       window.location.href = "admin-dashboard.html";
     }
   } else {
     feedback.innerHTML = `<h4>Fill out all fields</h4>`
   }
}
