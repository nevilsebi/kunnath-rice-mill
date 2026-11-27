let cart = [];
let selectedVariants = {};
let activeCategory = "all";
let searchTerm = "";

document.addEventListener("DOMContentLoaded", () => {
  CATALOG_ITEMS.forEach(item => {
    selectedVariants[item.id] = 0;
  });

  applyStoreConfig();
  renderCatalog();
  renderNriBuilder();
  setupControls();
  setupCartDrawer();
  setupInquiryForm();
});

function applyStoreConfig() {
  document.getElementById("headerBrandName").textContent = MILL_CONFIG.businessName;
  document.getElementById("headerTagline").textContent = MILL_CONFIG.tagline;
  document.getElementById("displayHours").textContent = MILL_CONFIG.openingHours;
  document.getElementById("topUpdatedDate").textContent = MILL_CONFIG.ratesUpdatedDate;

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

function renderCatalog() {
  const grid = document.getElementById("catalogGrid");
  grid.innerHTML = "";

  const filtered = CATALOG_ITEMS.filter(item => {
    const matchesCat = activeCategory === "all" || item.category === activeCategory;
    const query = searchTerm.toLowerCase();
    const matchesSearch =
      !query ||
      item.name.toLowerCase().includes(query) ||
      item.localName.toLowerCase().includes(query) ||
      item.note.toLowerCase().includes(query);
    return matchesCat && matchesSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `<p class="muted">No matching items found. Try clearing your search filter.</p>`;
    return;
  }

  filtered.forEach(item => {
    const chosenIdx = selectedVariants[item.id] || 0;
    const chosenVariant = item.variants[chosenIdx];

    const pillsHtml = item.variants
      .map(
        (v, idx) => `
        <button
          type="button"
          class="variant-pill ${idx === chosenIdx ? "selected" : ""}"
          onclick="selectVariant('${item.id}', ${idx})"
        >
          ${v.label}
        </button>`
      )
      .join("");

    const priceDisplay =
      chosenVariant.price !== null
        ? `<span class="price-value">₹${chosenVariant.price}</span>`
        : `<span class="price-value market-rate">Market Rate (${chosenVariant.label})</span>`;

    const actionButton = item.inStock
      ? `<button type="button" class="btn btn-primary" onclick="addSelectedToCart('${item.id}')">+ Add to Order</button>`
      : `<button type="button" class="btn btn-outline" disabled>Out of Stock</button>`;

    const card = document.createElement("article");
    card.className = "product-card";
    card.innerHTML = `
      <div>
        <div class="product-media">
          <span class="media-badge">${item.badge}</span>
          <img
            src="${item.image}"
            alt="${item.name}"
            onerror="this.outerHTML='<div class=\'media-fallback\'><strong>${item.name}</strong><span>${item.localName}</span></div>'"
          />
        </div>
        <div class="product-body">
          <div>
            <h3>${item.name}</h3>
            <div class="local-name">${item.localName}</div>
          </div>
          <p class="product-note">${item.note}</p>
          <div class="variant-group">
            <span class="variant-label">Select Pack / Bulk Size:</span>
            <div class="variant-pills">${pillsHtml}</div>
          </div>
        </div>
      </div>
      <div class="product-footer">
        ${priceDisplay}
        ${actionButton}
      </div>
    `;
    grid.appendChild(card);
  });
}

function selectVariant(itemId, variantIndex) {
  selectedVariants[itemId] = variantIndex;
  renderCatalog();
}

function setupControls() {
  const buttons = document.querySelectorAll(".filter-btn");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeCategory = btn.dataset.filter;
      renderCatalog();
    });
  });

  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", e => {
    searchTerm = e.target.value.trim();
    renderCatalog();
  });
}

function renderNriBuilder() {
  const container = document.getElementById("nriChecklist");
  const shippableItems = CATALOG_ITEMS.filter(item => item.category !== "grinding");

  container.innerHTML = shippableItems
    .map(item => {
      const options = item.variants
        .map(
          (v, idx) =>
            `<option value="${idx}" data-weight="${v.weightKg}">${v.label}${
              v.price !== null ? ` (₹${v.price})` : " (Market)"
            }</option>`
        )
        .join("");

      return `
        <div class="nri-check-item">
          <label class="nri-check-left">
            <input type="checkbox" class="nri-item-cb" data-id="${item.id}" onchange="updateNriWeight()" />
            <div>
              <strong style="font-size:0.92rem; display:block;">${item.name}</strong>
              <span class="muted" style="font-size:0.78rem;">${item.localName}</span>
            </div>
          </label>
          <select class="nri-weight-select" id="nri-sel-${item.id}" onchange="updateNriWeight()">
            ${options}
          </select>
        </div>
      `;
    })
    .join("");

  document.getElementById("addCustomNriBtn").addEventListener("click", () => {
    const checkedBoxes = document.querySelectorAll(".nri-item-cb:checked");
    if (checkedBoxes.length === 0) {
      alert("Please tick at least one item to build your provision box.");
      return;
    }

    checkedBoxes.forEach(cb => {
      const itemId = cb.dataset.id;
      const selectEl = document.getElementById(`nri-sel-${itemId}`);
      const variantIdx = parseInt(selectEl.value, 10);
      addItemWithVariant(itemId, variantIdx, false);
    });

    document.getElementById("checkoutZone").value = "NRI / International & Flight Pack";
    updateCartUI();
    openCart();
  });
}

function updateNriWeight() {
  let totalKg = 0;
  document.querySelectorAll(".nri-item-cb:checked").forEach(cb => {
    const itemId = cb.dataset.id;
    const selectEl = document.getElementById(`nri-sel-${itemId}`);
    const selectedOpt = selectEl.options[selectEl.selectedIndex];
    totalKg += parseFloat(selectedOpt.dataset.weight || "0");
  });
  document.getElementById("nriTotalWeight").textContent = `${totalKg.toFixed(2)} kg`;
}

function addSelectedToCart(itemId) {
  const variantIdx = selectedVariants[itemId] || 0;
  addItemWithVariant(itemId, variantIdx, true);
}

function addItemWithVariant(itemId, variantIdx, shouldOpenDrawer) {
  const product = CATALOG_ITEMS.find(p => p.id === itemId);
  if (!product) return;
  const variant = product.variants[variantIdx];
  const cartKey = `${itemId}__${variant.label}`;

  const existing = cart.find(c => c.cartKey === cartKey);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      cartKey,
      id: itemId,
      name: product.name,
      packLabel: variant.label,
      weightKg: variant.weightKg,
      price: variant.price,
      qty: 1
    });
  }

  if (shouldOpenDrawer) {
    updateCartUI();
    openCart();
  }
}

function changeQty(cartKey, delta) {
  const index = cart.findIndex(c => c.cartKey === cartKey);
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
  const weightEl = document.getElementById("cartTotalWeight");

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalWeight = cart.reduce((sum, item) => sum + item.weightKg * item.qty, 0);

  countEl.textContent = totalItems;
  weightEl.textContent = `${totalWeight.toFixed(2)} kg`;

  if (cart.length === 0) {
    itemsEl.innerHTML = `<p class="muted">Your order list is empty. Select a pack size on any product card to add it.</p>`;
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
            <div class="muted" style="font-size:0.82rem;">Pack: ${item.packLabel} • ${linePrice}</div>
          </div>
          <div class="qty-controls">
            <button type="button" class="qty-btn" onclick="changeQty('${item.cartKey}', -1)" aria-label="Decrease quantity">-</button>
            <span>${item.qty}</span>
            <button type="button" class="qty-btn" onclick="changeQty('${item.cartKey}', 1)" aria-label="Increase quantity">+</button>
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

    const customerName = document.getElementById("checkoutName").value.trim() || "Customer";
    const zone = document.getElementById("checkoutZone").value;
    const city = document.getElementById("checkoutCity").value.trim() || "Not specified";
    const totalWeight = cart.reduce((sum, item) => sum + item.weightKg * item.qty, 0);

    const lines = cart.map((item, idx) => {
      const rateText =
        item.price !== null ? `₹${item.price * item.qty}` : "Market Rate";
      return `${idx + 1}. ${item.name} [${item.packLabel}] x ${item.qty} — ${rateText}`;
    });

    const message =
      `Hello ${MILL_CONFIG.businessName},
` +
      `I would like to place an order / confirm today's rates:

` +
      `Name: ${customerName}
` +
      `Delivery Mode: ${zone}
` +
      `Destination City / Country: ${city}
` +
      `Approx. Total Weight: ${totalWeight.toFixed(2)} kg

` +
      `Order Items:
${lines.join("
")}

` +
      `Please confirm availability, today's market rates, and final total.`;

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
    const buyerType = document.getElementById("inqType").value;
    const name = document.getElementById("inqName").value.trim();
    const phone = document.getElementById("inqPhone").value.trim();
    const city = document.getElementById("inqCity").value.trim();
    const details = document.getElementById("inqMessage").value.trim();

    const message =
      `Hello ${MILL_CONFIG.businessName},
` +
      `New Wholesale / NRI Inquiry:
` +
      `Buyer Type: ${buyerType}
` +
      `Name / Business: ${name}
` +
      `Contact: ${phone}
` +
      `Destination: ${city}
` +
      `Requirement: ${details}`;

    feedback.textContent = "Opening WhatsApp with your quote request...";
    const waUrl = `https://wa.me/${MILL_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank");
    form.reset();
  });
}
