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



window.onload = () => {
  renderDepartments();
  setWelcomeText();
  updateFeeStatuses();
  renderReceipts();

  // Close dropdown if clicked outside
  window.addEventListener("click", function(event) {
    const dropdown = document.querySelector(".dropdown");
    const dropdownContent = document.querySelector(".dropdown-content");
    if (!dropdown.contains(event.target)) {
      if (dropdownContent) {
        dropdownContent.classList.remove("show");
      }
    }
  });
};

function renderReceipts() {
  const payments = getPayments();
  const tbody = document.getElementById("receiptTableBody");
  if (!tbody) return;

  tbody.innerHTML = "";

  payments.forEach(payment => {
    const tr = document.createElement("tr");

    tr.innerHTML = 
      '<td>#' + payment.receiptId + '</td>' +
      '<td>' + payment.name + '</td>' +
      '<td>₱' + payment.price.toLocaleString() + '</td>' +
      '<td>' + payment.datePaid + '</td>' +
      '<td><span class="status-label status-paid">' + payment.status + '</span></td>' +
      '<td><a href="' + payment.receiptFile + '" class="pay-btn" download>Download</a></td>';

    tbody.appendChild(tr);
  });

  paginateReceipts();
}

function getUsername() {
  let username = localStorage.getItem("username");
  if (!username) {
    username = prompt("Please enter your username (without @wmsu.ph):", "Missy");
    if (username) {
      // Check if user has existing payment history
      const allPayments = JSON.parse(localStorage.getItem("payments")) || {};
      if (!allPayments[username]) {
        // New user, initialize empty payment history
        allPayments[username] = [];
        localStorage.setItem("payments", JSON.stringify(allPayments));
      }
      localStorage.setItem("username", username);
      refreshDashboard();
    } else {
      username = "Guest";
    }
  }
  return username;
}

// Refresh dashboard UI after username change or payment update
function refreshDashboard() {
  updateFeeStatuses();
  renderReceipts();
  setWelcomeText();
}

// Set welcome text dynamically
function setWelcomeText() {
  const welcomeText = document.getElementById("welcomeText");
  if (welcomeText) {
    const username = getUsername();
    welcomeText.textContent = `Hello, ${username}!`;
  }
}

function toggleDropdown() {
  const dropdownContent = document.querySelector(".dropdown-content");
  if (dropdownContent) {
    dropdownContent.classList.toggle("show");
  }
}

function toggleNav() {
  const navLinks = document.getElementById("navLinks");
  if (navLinks) {
    navLinks.classList.toggle("show");
  }
  // Also hide dropdown-content when toggling nav
  const dropdownContent = document.querySelector(".dropdown-content");
  if (dropdownContent) {
    dropdownContent.classList.remove("show");
  }
}

// Payment data stored in localStorage key "payments" as an object keyed by username
// Each payment: { receiptId, name, price, datePaid, status, receiptFile }
function getPayments() {
  const username = getUsername();
  const allPayments = JSON.parse(localStorage.getItem("payments")) || {};
  return allPayments[username] || [];
}

function savePayments(payments) {
  const username = getUsername();
  const allPayments = JSON.parse(localStorage.getItem("payments")) || {};
  allPayments[username] = payments;
  localStorage.setItem("payments", JSON.stringify(allPayments));
}

// Generate unique receipt ID (random 9-digit number)
function generateReceiptId() {
  return Math.floor(100000000 + Math.random() * 900000000).toString();
}

// Update fee card status to paid if payment exists for current user
function updateFeeStatuses() {
  const payments = getPayments();
  const cards = document.querySelectorAll('#feeCardContainer .fee-card');
  cards.forEach(card => {
    const feeName = card.querySelector(".card-details p:first-child").textContent.trim();
    const payment = payments.find(p => p.name === feeName && p.status === "Paid");
    if (payment) {
      card.setAttribute("data-status", "paid");
      const statusLabel = card.querySelector(".status-label");
      if (statusLabel) {
        statusLabel.textContent = "Paid";
        statusLabel.classList.remove("status-pending");
        statusLabel.classList.add("status-paid");
      }
    } else {
      card.setAttribute("data-status", "pending");
      const statusLabel = card.querySelector(".status-label");
      if (statusLabel) {
        statusLabel.textContent = "Pending";
        statusLabel.classList.remove("status-paid");
        statusLabel.classList.add("status-pending");
      }
    }
  });
}

// Submit payment handler
function submitPayment(event) {
  event.preventDefault();
  const name = document.getElementById("feeName").value;
  const amountText = document.getElementById("amount").value;

  const price = parseFloat(amountText.replace(/[₱,]/g, ''));
  if (!name || isNaN(price)) {
    alert("Invalid payment details.");
    return;
  }

  // Create payment record
  const payments = getPayments();
  const receiptId = generateReceiptId();
  const datePaid = new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  const receiptFile = "assets/receipts/" + receiptId + ".jpg"; // Simulated receipt file path

  const paymentRecord = {
    receiptId,
    name,
    price,
    datePaid,
    status: "Paid",
    receiptFile
  };

  // Save payment
  payments.push(paymentRecord);
  savePayments(payments);

  // Update fee statuses on dashboard
  updateFeeStatuses();

  // Refresh receipts view to include new payment
  renderReceipts();

  alert("✅ Payment for \"" + name + "\" submitted successfully! Receipt #" + receiptId + " created.");
  closeModal();
}

// Animation pause/resume logic for fees section
// Removed to keep animation continuously running without pause on interaction
/*
const feeContainer = document.getElementById("feeCardContainer");
const feesSection = document.getElementById("feesSection");

let animationPaused = false;
let resumeTimeout = null;

function pauseAnimation() {
  if (!animationPaused) {
    feeContainer.classList.add("paused");
    animationPaused = true;
  }
  if (resumeTimeout) {
    clearTimeout(resumeTimeout);
  }
  resumeTimeout = setTimeout(function() {
    feeContainer.classList.remove("paused");
    animationPaused = false;
  }, 3000); // Resume after 3 seconds of no interaction
}

if (feesSection) {
  feesSection.addEventListener("click", pauseAnimation);
  feesSection.addEventListener("touchstart", pauseAnimation);
}
*/

// Close payment modal
function closeModal() {
  const modal = document.getElementById("paymentModal");
  if (modal) {
    modal.style.display = "none";
  }
}

// Animation fix: reset fee and merch cards position on animation end for smooth looping
function resetAnimationPosition(containerId, cardClass) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const cards = container.querySelectorAll(`.${cardClass}`);

  cards.forEach(card => {
    card.addEventListener('animationiteration', () => {
      // Reset position to start (e.g., left or right depending on animation)
      card.style.animation = 'none';
      // Force reflow
      void card.offsetWidth;
      // Restart animation
      card.style.animation = '';
    });
  });
}

// Initialize animation reset for fees and merch
document.addEventListener("DOMContentLoaded", () => {
  resetAnimationPosition('feeCardContainer', 'fee-card');
  resetAnimationPosition('merchContainer', 'merch-card');
});
