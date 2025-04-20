// CHECKS CURRENT PAGE
const currentPath = window.location.pathname;

// =====================
// FEE MANAGEMENT
// =====================
if (currentPath.includes("admin-fees.html")) {
  let feeList = JSON.parse(localStorage.getItem("feeList")) || [];

  function saveFees() {
    localStorage.setItem("feeList", JSON.stringify(feeList));
  }

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

  function removeFee(index) {
    if (confirm("Are you sure you want to delete this fee?")) {
      feeList.splice(index, 1);
      saveFees();
      renderFees();
    }
  }

  window.onload = renderFees;
}
