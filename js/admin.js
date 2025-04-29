const fees = [
  { name: "Computer Fees", amount: 500, semester: "2nd Sem 2024–2025", dueDate: "2025-04-22", status: "Active" },
  { name: "Aircon Fee", amount: 400, semester: "2nd Sem 2024–2025", dueDate: "2025-04-22", status: "Active" }
];

function loadFees() {
  const tbody = document.getElementById('feeTableBody');
  tbody.innerHTML = "";

  fees.forEach((fee, index) => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>${fee.name}</td>
      <td>₱${fee.amount}</td>
      <td>${fee.semester}</td>
      <td>${fee.dueDate}</td>
      <td>${fee.status}</td>
      <td><button class="remove-btn" onclick="removeFee(${index})">Remove</button></td>
    `;

    tbody.appendChild(tr);
  });
}

function addFee() {
  const name = document.getElementById('feeName').value.trim();
  const amount = document.getElementById('amount').value.trim();
  const semester = document.getElementById('semester').value.trim();
  const dueDate = document.getElementById('dueDate').value;

  if (!name || !amount || !semester || !dueDate) {
    alert("Please fill all fields!");
    return;
  }

  fees.push({ name, amount, semester, dueDate, status: "Active" });
  loadFees();

  // Clear fields
  document.getElementById('feeName').value = "";
  document.getElementById('amount').value = "";
  document.getElementById('semester').value = "";
  document.getElementById('dueDate').value = "";
}

function removeFee(index) {
  if (confirm("Are you sure you want to remove this fee?")) {
    fees.splice(index, 1);
    loadFees();
  }
}

function logout() {
  if (confirm("Are you sure you want to logout?")) {
    window.location.href = "index.html";
  }
}

window.onload = loadFees;


// Fake sample numbers (you can later connect with real database)
document.getElementById('totalStudents').textContent = "120";
document.getElementById('totalFees').textContent = "₱150,000";
document.getElementById('pendingRequests').textContent = "15";
document.getElementById('approvedRequests').textContent = "80";

function logout() {
  if (confirm("Are you sure you want to logout?")) {
    window.location.href = "index.html"; // redirect to login
  }
}


// =====================
// WE LOGOUT FUNCTION HERE
// =====================
function logout() {
  localStorage.clear(); 
  window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", () => {
  const feeNameInput = document.getElementById("feeName");
  const amountInput = document.getElementById("amount");
  const semesterInput = document.getElementById("semester");
  const dueDateInput = document.getElementById("dueDate");
  const feesTableBody = document.getElementById("feesTableBody");

  // ✅ Attach event listener instead of inline HTML onclick
  document.querySelector(".btn-green").addEventListener("click", () => {
    const name = feeNameInput.value.trim();
    const amount = amountInput.value.trim();
    const semester = semesterInput.value.trim();
    const dueDate = dueDateInput.value;

    if (!name || !amount || !semester || !dueDate) {
      alert("Please fill in all fields.");
      return;
    }

    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>${name}</td>
      <td>₱${parseFloat(amount).toLocaleString()}</td>
      <td>${semester}</td>
      <td>${dueDate}</td>
      <td><span class="status-label pending">Pending</span></td>
      <td><button class="remove-btn">Remove</button></td>
    `;

    feesTableBody.appendChild(newRow);

    // Clear form
    feeNameInput.value = "";
    amountInput.value = "";
    semesterInput.value = "";
    dueDateInput.value = "";

    // Attach remove handler to new button
    newRow.querySelector(".remove-btn").addEventListener("click", () => {
      if (confirm("Remove this fee?")) newRow.remove();
    });
  });
});
