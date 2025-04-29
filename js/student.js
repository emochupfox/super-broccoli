//student list section
const students = [
  { name: "Balano, Missy E. M", id: "8888-99999", course: "BSCS", section: "2C", status: "Pending" },
  { name: "Anastacio, Mattjhevic", id: "202301234", course: "BSCS", section: "2C", status: "Pending" },
  { name: "Salilig, Gian", id: "202301245", course: "BSCS", section: "2C", status: "Pending" },
  { name: "Flore, JM", id: "202301256", course: "BSCS", section: "2C", status: "Pending" },
  { name: "Aleria, Angelo", id: "202301267", course: "BSCS", section: "2C", status: "Pending" },
  { name: "Bobon, Stephen", id: "202301278", course: "BSCS", section: "2C", status: "Pending" }
];

function loadStudents() {
  const tbody = document.getElementById('studentTableBody');
  tbody.innerHTML = "";

  students.forEach(student => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>${student.name}</td>
      <td>${student.id}</td>
      <td>${student.course}</td>
      <td>${student.section}</td>
      <td>${student.status}</td>
      <td>
        <button class="view-btn">View</button>
        <button class="edit-btn">Edit</button>
        <button class="remove-btn">Remove</button>
      </td>
    `;

    tbody.appendChild(tr);
  });
}

function logout() {
  if (confirm("Are you sure you want to logout?")) {
    window.location.href = "index.html";
  }
}

window.onload = loadStudents;
//
