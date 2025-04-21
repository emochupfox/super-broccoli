const paymentRequests = [
    { student: "Missy Balano", fee: "Tuition Fee", amount: "₱25,000", date: "2024-08-01", status: "Pending" },
    { student: "Gian Salilig", fee: "Library Fee", amount: "₱1,000", date: "2024-08-03", status: "Pending" },
    { student: "Mattjhevic Anastacio", fee: "Athlete Fee", amount: "₱2,000", date: "2024-08-04", status: "Pending" },
    { student: "Kyle Manolo", fee: "Graduation Fee", amount: "₱3,500", date: "2024-08-06", status: "Pending" },
    { student: "Angelo Aleria", fee: "ID Replacement", amount: "₱300", date: "2024-08-07", status: "Pending" },
    { student: "Stephen Bobon", fee: "Laboratory Fee", amount: "₱1,200", date: "2024-08-08", status: "Pending" },
    { student: "Cyrell Felix", fee: "Insurance", amount: "₱700", date: "2024-08-09", status: "Pending" },
    { student: "Kevin Caxiel", fee: "Medical Fee", amount: "₱850", date: "2024-08-10", status: "Pending" },
    { student: "John Cena", fee: "CSC Fee", amount: "₱500", date: "2024-08-11", status: "Pending" },
    { student: "JM Flore", fee: "Guidance Fee", amount: "₱450", date: "2024-08-12", status: "Pending" },
    { student: "Paul Dela Cruz", fee: "PE Uniform", amount: "₱850", date: "2024-08-13", status: "Pending" },
    { student: "Liza Manalo", fee: "Library Overdue", amount: "₱150", date: "2024-08-14", status: "Pending" },
    { student: "Mica Reyes", fee: "Toga Rental", amount: "₱1,000", date: "2024-08-15", status: "Pending" },
    { student: "Jomar Vicente", fee: "Student Council", amount: "₱250", date: "2024-08-16", status: "Pending" },
    { student: "Aira Santos", fee: "Thesis Binding", amount: "₱1,500", date: "2024-08-17", status: "Pending" }
  ];
  
  const rowsPerPage = 8;
  let currentPage = 1;
  
  function renderRequests() {
    const tbody = document.querySelector("#requestTable tbody");
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const pageData = paymentRequests.slice(start, end);
  
    tbody.innerHTML = "";
  
    pageData.forEach((req, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${req.student}</td>
        <td>${req.fee}</td>
        <td>${req.amount}</td>
        <td>${req.date}</td>
        <td><span class="status-label ${req.status.toLowerCase()}">${req.status}</span></td>
        <td>
          <button class="approve-btn" onclick="updateStatus(${start + index}, 'Approved')">Approve</button>
          <button class="decline-btn" onclick="updateStatus(${start + index}, 'Declined')">Decline</button>
        </td>
      `;
      tbody.appendChild(row);
    });
  
    renderPagination();
  }
  
  function renderPagination() {
    const pageCount = Math.ceil(paymentRequests.length / rowsPerPage);
    const container = document.getElementById("pagination");
    container.innerHTML = "";
  
    for (let i = 1; i <= pageCount; i++) {
      const btn = document.createElement("button");
      btn.textContent = i;
      btn.classList.add("page-btn");
      if (i === currentPage) btn.classList.add("active");
      btn.onclick = () => {
        currentPage = i;
        renderRequests();
      };
      container.appendChild(btn);
    }
  }
  
  function updateStatus(index, newStatus) {
    paymentRequests[index].status = newStatus;
    renderRequests();
  }
  
  window.onload = renderRequests;
  