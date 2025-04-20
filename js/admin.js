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
    const tbody = document.querySelector(".student-table tbody");
    tbody.innerHTML = "";
  
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const pageStudents = students.slice(start, end);
  
    for (const student of pageStudents) {
      tbody.innerHTML += `
        <tr>
          <td>${student.name}</td>
          <td>${student.id}</td>
          <td>${student.course}</td>
          <td>${student.section}</td>
          <td>${student.status}</td>
          <td>
            <button class="view-btn" onclick="openModal()">View</button>
            <button class="edit-btn">Edit</button>
            <button class="remove-btn">Remove</button>
          </td>
        </tr>
      `;
    }
  }
  
  function renderPagination() {
    const pagination = document.getElementById("pagination");
    const pageCount = Math.ceil(students.length / rowsPerPage);
  
    pagination.innerHTML = "";
  
    for (let i = 1; i <= pageCount; i++) {
      const btn = document.createElement("button");
      btn.textContent = i;
      btn.classList.add("page-btn");
      if (i === currentPage) btn.classList.add("active");
      btn.addEventListener("click", () => {
        currentPage = i;
        renderTablePage(currentPage);
        renderPagination();
      });
      pagination.appendChild(btn);
    }
  }
  
  // Modal handlers
  function openModal() {
    document.getElementById('viewModal').style.display = 'block';
  }
  function closeModal() {
    document.getElementById('viewModal').style.display = 'none';
  }
  window.onclick = function(event) {
    const modal = document.getElementById('viewModal');
    if (event.target === modal) closeModal();
  };
  
  window.onload = function() {
    renderTablePage(currentPage);
    renderPagination();
  };
  
  function openModal() {
    document.getElementById('viewModal').style.display = 'block';
  }
  function closeModal() {
    document.getElementById('viewModal').style.display = 'none';
  }
  window.onclick = function(event) {
    const modal = document.getElementById('viewModal');
    if (event.target === modal) {
      closeModal();
    }
  };

// --------THIS IS FOR STUD FEE -----
// Load existing fees from localStorage or initialize as empty
let feeList = JSON.parse(localStorage.getItem("feeList")) || [];

// Save to localStorage
function saveFees() {
  localStorage.setItem("feeList", JSON.stringify(feeList));
}

// Render the fee table
function renderFees() {
  const tbody = document.querySelector("#feeTable tbody");
  tbody.innerHTML = "";

  if (feeList.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;">No fees added yet.</td></tr>';
    return;
  }

  feeList.forEach((fee, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${fee.name}</td>
      <td>₱${fee.amount.toLocaleString()}</td>
      <td>${fee.semester}</td>
      <td>${fee.dueDate}</td>
      <td>${fee.status}</td>
      <td>
        <button onclick="removeFee(${index})" class="remove-btn">Remove</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

// Add fee from form
function addFee(event) {
  event.preventDefault();

  const name = document.getElementById("feeName").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const semester = document.getElementById("semester").value;
  const dueDate = document.getElementById("dueDate").value;

  feeList.push({
    name,
    amount,
    semester,
    dueDate,
    status: "Active"
  });

  saveFees();
  renderFees();
  document.getElementById("feeForm").reset();
}

// Remove fee
function removeFee(index) {
  if (confirm("Are you sure you want to delete this fee?")) {
    feeList.splice(index, 1);
    saveFees();
    renderFees();
  }
}

// Initial load
window.onload = renderFees;
