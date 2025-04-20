const departments = [
  { name: "Library", status: "Pending" },
  { name: "Finance", status: "Approved" },
  { name: "Guidance", status: "Pending" },
  { name: "Registrar", status: "Pending" }
];

// Render departments if departmentList exists
function renderDepartments() {
  const list = document.getElementById("departmentList");
  if (!list) return;

  list.innerHTML = "";
  departments.forEach(dept => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${dept.name}</span>
      <strong>${dept.status}</strong>
    `;
    list.appendChild(li);
  });
}

// Logout redirect also
function logout() {
  window.location.href = "index.html";
}

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  if (sidebar) {
    sidebar.classList.toggle("active");
  }
}

function scrollNext() {
  const container = document.getElementById("feeCardContainer");
  if (container) {
    container.scrollBy({ left: 270, behavior: 'smooth' });
  }
}

function scrollMerch() {
  const container = document.getElementById("merchContainer");
  if (container) {
    container.scrollBy({ left: 300, behavior: 'smooth' });
  }
}

// Filter fee cards by status
function filterFees(status) {
  const cards = document.querySelectorAll('#feeCardContainer .fee-card');
  cards.forEach(card => {
    const feeStatus = card.getAttribute('data-status');
    card.style.display = (status === 'all' || status === feeStatus) ? 'inline-block' : 'none';
  });
}


window.onload = () => {
  renderDepartments(); 
};

const username = "Missy";
const welcomeText = document.getElementById("welcomeText");
if (welcomeText) {
  welcomeText.textContent = `Welcome, ${username}!`;
}
function openModal(name, price, isMerch = false) {
  document.getElementById("feeName").value = name;
  document.getElementById("amount").value = price;

  const submitBtn = document.querySelector(".payment-content button");
  submitBtn.textContent = isMerch ? "Buy Now" : "Pay Now";

  document.getElementById("paymentModal").style.display = "flex";
}