let cart = [];

document.addEventListener("DOMContentLoaded", () => {
  applyStoreConfig();
  renderCatalog("all");
  setupFilters();
  setupCartDrawer();
  setupInquiryForm();
});

function applyStoreConfig() {
  document.getElementById("headerBrandName").textContent = MILL_CONFIG.businessName;
  document.getElementById("headerTagline").textContent = MILL_CONFIG.tagline;
  document.getElementById("displayHours").textContent = MILL_CONFIG.openingHours;
  document.getElementById("displayUpdatedDate").textContent = MILL_CONFIG.ratesUpdatedDate;

  document.getElementById("heroMapsLink").href = MILL_CONFIG.mapsUrl;
  document.getElementById("locName").textContent = MILL_CONFIG.businessName;
  document.getElementById("locAddress").textContent = MILL_CONFIG.address;
  document.getElementById("locHours").textContent = MILL_CONFIG.openingHours;

  const phoneLink = document.getElementById("locPhoneLink");
  phoneLink.textContent = MILL_CONFIG.displayPhone;
  phoneLink.href = `tel:+${MILL_CONFIG.whatsappNumber}`;

  document.getElementById("locMapsBtn").href = MILL_CONFIG.mapsUrl;
  document.getElementById("footerBrand").textContent = MILL_CONFIG.businessName;
  document.getElementById("footerAddress").textContent = MILL_CONFIG.address;
}

function renderCatalog(filterCategory) {
  const grid = document.getElementById("catalogGrid");
  grid.innerHTML = "";

  const filtered = CATALOG_ITEMS.filter(item =>
    filterCategory === "all" ? true : item.category === filterCategory
  );

  filtered.forEach(item => {
    const priceDisplay =
      item.price !== null
        ? `<span class="price-value">₹${item.price} <small class="muted">/ ${item.unit}</small></span>`
        : `<span class="price-value market-rate">Market Rate <small class="muted">(${item.unit})</small></span>`;

    const actionButton = item.inStock
      ? `<button class="btn btn-primary" onclick="addItemToCart('${item.id}')">+ Add</button>`
      : `<button class="btn btn-outline" disabled>Out of Stock</button>`;

    const card = document.createElement("article");
    card.className = "product-card";
    card.innerHTML = `
      <div>
        <span class="product-tag">${formatCategory(item.category)}</span>
        <h3>${item.name}</h3>
        <div class="local-name">${item.localName}</div>
        <p class="product-note">${item.note}</p>
      </div>
      <div class="price-row">
        ${priceDisplay}
        ${actionButton}
      </div>
    `;
    grid.appendChild(card);
  });
}

function formatCategory(cat) {
  const labels = {
    spice: "Spice Powder",
    flour: "Fresh Flour",
    combo: "NRI & Travel Combo",
    grinding: "Custom Milling"
  };
  return labels[cat] || cat;
}

function setupFilters() {
  const buttons = document.querySelectorAll(".filter-btn");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderCatalog(btn.dataset.filter);
    });
  });
}

function addItemToCart(itemId) {
  const product = CATALOG_ITEMS.find(p => p.id === itemId);
  if (!product) return;

  const existing = cart.find(c => c.id === itemId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  updateCartUI();
  openCart();
}

function changeQty(itemId, delta) {
  const index = cart.findIndex(c => c.id === itemId);
  if (index === -1) return;

  cart[index].qty += delta;
  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }
  updateCartUI();
}

function updateCartUI() {
  const countEl = document.getElementById("cartCount");
  const itemsEl = document.getElementById("cartItems");
  const subtotalEl = document.getElementById("cartSubtotal");

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  countEl.textContent = totalItems;

  if (cart.length === 0) {
    itemsEl.innerHTML = `<p class="muted">Your order list is empty. Add items from the rate card to begin.</p>`;
    subtotalEl.textContent = "₹0";
    return;
  }

  let fixedTotal = 0;
  let hasMarketRateItem = false;

  itemsEl.innerHTML = cart
    .map(item => {
      if (item.price !== null) {
        fixedTotal += item.price * item.qty;
      } else {
        hasMarketRateItem = true;
      }

      const linePrice =
        item.price !== null ? `₹${item.price * item.qty}` : "Market Rate";

      return `
        <div class="cart-item">
          <div>
            <strong>${item.name}</strong>
            <div class="muted" style="font-size:0.82rem;">${item.unit} • ${linePrice}</div>
          </div>
          <div class="qty-controls">
            <button class="qty-btn" onclick="changeQty('${item.id}', -1)" aria-label="Decrease quantity">-</button>
            <span>${item.qty}</span>
            <button class="qty-btn" onclick="changeQty('${item.id}', 1)" aria-label="Increase quantity">+</button>
          </div>
        </div>
      `;
    })
    .join("");

  subtotalEl.textContent = hasMarketRateItem
    ? `₹${fixedTotal} + Market Rate items`
    : `₹${fixedTotal}`;
}

function setupCartDrawer() {
  const backdrop = document.getElementById("cartBackdrop");

  document.getElementById("openCartBtn").addEventListener("click", openCart);
  document.getElementById("closeCartBtn").addEventListener("click", closeCart);
  backdrop.addEventListener("click", closeCart);

  document.getElementById("whatsappOrderBtn").addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Please add at least one item to your order list first.");
      return;
    }

    const zone = document.getElementById("checkoutZone").value;
    const city = document.getElementById("checkoutCity").value.trim() || "Not specified";

    const lines = cart.map((item, idx) => {
      const rateText =
        item.price !== null ? `₹${item.price * item.qty}` : "Market Rate";
      return `${idx + 1}. ${item.name} (${item.unit}) x ${item.qty} — ${rateText}`;
    });

    const message =
      `Hello ${MILL_CONFIG.businessName},
` +
      `I would like to place an order / confirm today's rates:

` +
      `${lines.join("
")}

` +
      `Pickup / Delivery Mode: ${zone}
` +
      `Location / City: ${city}

` +
      `Please confirm availability, live market rates, and final total.`;

    const waUrl = `https://wa.me/${MILL_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank");
  });
}

function openCart() {
  document.getElementById("cartDrawer").classList.add("open");
  document.getElementById("cartBackdrop").classList.add("open");
}

function closeCart() {
  document.getElementById("cartDrawer").classList.remove("open");
  document.getElementById("cartBackdrop").classList.remove("open");
}

function setupInquiryForm() {
  const form = document.getElementById("inquiryForm");
  const feedback = document.getElementById("formFeedback");

  form.addEventListener("submit", e => {
    e.preventDefault();
    const name = document.getElementById("inqName").value.trim();
    const phone = document.getElementById("inqPhone").value.trim();
    const zone = document.getElementById("inqZone").value;
    const details = document.getElementById("inqMessage").value.trim();

    const message =
      `Hello ${MILL_CONFIG.businessName},
` +
      `New Website Inquiry:
` +
      `Name: ${name}
` +
      `Contact: ${phone}
` +
      `Destination: ${zone}
` +
      `Requirement: ${details}`;

    feedback.textContent = "Opening WhatsApp with your inquiry...";
    const waUrl = `https://wa.me/${MILL_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank");
    form.reset();
  });
}
