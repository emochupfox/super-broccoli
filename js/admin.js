//pagination in stud management..merged
const students = [
    { name: "Balano, Missy E. M", id: "8888-99999", course: "BSCS", year: "2C", status: "Pending" },
    { name: "Anastacio, Mattjhevic", id: "202301234", course: "BSCS", year: "2C", status: "Pending" },
    { name: "Salilig, Gian", id: "202301245", course: "BSCS", year: "2C", status: "Pending" },
    { name: "Flore, JM", id: "202301256", course: "BSCS", year: "2C", status: "Pending" },
    { name: "Aleria, Angelo", id: "202301267", course: "BSCS", year: "2C", status: "Pending" },
    { name: "Bobon, Stephen", id: "202301278", course: "BSCS", year: "2C", status: "Pending" },
    { name: "Felix, Cyrell", id: "202301289", course: "BSCS", year: "2C", status: "Pending" },
    { name: "Manolo, Kyle", id: "202301282", course: "BSCS", year: "2C", status: "Pending" },
    // Add more as needed
  ];
  
  const rowsPerPage = 5;
  let currentPage = 1;
  
  function renderTable() {
    const tbody = document.getElementById("studentTableBody");
    tbody.innerHTML = "";
  
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedStudents = students.slice(start, end);
  
    paginatedStudents.forEach(student => {
      tbody.innerHTML += `
        <tr>
          <td>${student.name}</td>
          <td>${student.id}</td>
          <td>${student.course}</td>
          <td>${student.year}</td>
          <td>${student.status}</td>
          <td>
            <button class="btn-view">View</button>
            <button class="btn-edit">Edit</button>
            <button class="btn-remove">Remove</button>
          </td>
        </tr>
      `;
    });
  
    renderPagination();
  }
  
  function renderPagination() {
    const pagination = document.getElementById("paginationControls");
    pagination.innerHTML = "";
  
    const totalPages = Math.ceil(students.length / rowsPerPage);
  
    for (let i = 1; i <= totalPages; i++) {
      pagination.innerHTML += `
        <button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="goToPage(${i})">${i}</button>
      `;
    }
  }
  
  function goToPage(page) {
    currentPage = page;
    renderTable();
  }
  
  window.onload = renderTable;
  