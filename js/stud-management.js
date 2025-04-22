const students = [
  { name: "Balano, Missy E. M", id: "8888-99999", course: "BSCS", section: "2C", status: "Pending" },
  { name: "Anastacio, Mattjhevic", id: "202301234", course: "BSCS", section: "2C", status: "Pending" },
  { name: "Salilig, Gian", id: "202301245", course: "BSCS", section: "2C", status: "Pending" },
  { name: "Flore, JM", id: "202301256", course: "BSCS", section: "2C", status: "Pending" },
  { name: "Aleria, Angelo", id: "202301267", course: "BSCS", section: "2C", status: "Pending" },
  { name: "Bobon, Stephen", id: "202301278", course: "BSCS", section: "2C", status: "Pending" },
  { name: "Felix, Cyrell", id: "202301289", course: "BSCS", section: "2C", status: "Pending" },
  { name: "Manolo, Kyle", id: "202301282", course: "BSCS", section: "2C", status: "Pending" }
];

const rowsPerPage = 6;
let currentPage = 1;

function renderTablePage(page) {
  const tbody = document.getElementById("studentTableBody");
  tbody.innerHTML = "";

  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const pageStudents = students.slice(start, end);

  pageStudents.forEach((student, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.id}</td>
      <td>${student.course}</td>
      <td>${student.section}</td>
      <td>${student.status}</td>
      <td>
        <button class="view-btn" onclick="openModal(${start + index})">View</button>
        <button class="edit-btn">Edit</button>
        <button class="remove-btn">Remove</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function renderPagination() {
  const pageCount = Math.ceil(students.length / rowsPerPage);
  const container = document.getElementById("pagination");
  container.innerHTML = "";

  for (let i = 1; i <= pageCount; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.classList.add("page-btn");
    if (i === currentPage) btn.classList.add("active");
    btn.onclick = () => {
      currentPage = i;
      renderTablePage(currentPage);
      renderPagination();
    };
    container.appendChild(btn);
  }
}

function openModal(index) {
  const student = students[index];
  document.getElementById("modalName").textContent = student.name;
  document.getElementById("modalID").textContent = student.id;
  document.getElementById("modalCourse").textContent = student.course;
  document.getElementById("modalSection").textContent = student.section;
  document.getElementById("modalStatus").textContent = student.status;
  document.getElementById("viewModal").style.display = "block";
}

function closeModal() {
  document.getElementById("viewModal").style.display = "none";
}

window.onclick = function (event) {
  const modal = document.getElementById("viewModal");
  if (event.target === modal) {
    closeModal();
  }
};

window.onload = () => {
  renderTablePage(currentPage);
  renderPagination();
};

// Logout function
function logout() {
  if (confirm("Are you sure you want to logout?")) {
    window.location.href = "index.html";
  }
}
