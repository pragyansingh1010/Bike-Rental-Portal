const bikes = [
  {
    id: 1,
    brand: "Yamaha",
    model: "MT-15",
    type: "Sport",
    pricePerHour: 12,
    pricePerDay: 84,
    rating: 4.9,
    reviews: 128,
    engine: "155 cc",
    available: true
  },
  {
    id: 2,
    brand: "Royal Enfield",
    model: "Classic 350",
    type: "Classic",
    pricePerHour: 15,
    pricePerDay: 105,
    rating: 4.8,
    reviews: 214,
    engine: "349 cc",
    available: true
  },
  {
    id: 3,
    brand: "KTM",
    model: "Duke 390",
    type: "Sport",
    pricePerHour: 19,
    pricePerDay: 135,
    rating: 4.9,
    reviews: 176,
    engine: "373 cc",
    available: true
  },
  {
    id: 4,
    brand: "Royal Enfield",
    model: "Himalayan",
    type: "Adventure",
    pricePerHour: 18,
    pricePerDay: 126,
    rating: 4.7,
    reviews: 93,
    engine: "411 cc",
    available: true
  },
  {
    id: 5,
    brand: "Honda",
    model: "CB350",
    type: "Classic",
    pricePerHour: 15,
    pricePerDay: 99,
    rating: 4.8,
    reviews: 145,
    engine: "348 cc",
    available: true
  },
  {
    id: 6,
    brand: "Kawasaki",
    model: "Ninja 400",
    type: "Sport",
    pricePerHour: 23,
    pricePerDay: 160,
    rating: 4.9,
    reviews: 81,
    engine: "399 cc",
    available: false
  },
  {
    id: 7,
    brand: "Yamaha",
    model: "R15 V4",
    type: "Sport",
    pricePerHour: 17,
    pricePerDay: 118,
    rating: 4.7,
    reviews: 117,
    engine: "155 cc",
    available: true
  },
  {
    id: 8,
    brand: "Bajaj",
    model: "Dominar 400",
    type: "Cruiser",
    pricePerHour: 16,
    pricePerDay: 112,
    rating: 4.6,
    reviews: 74,
    engine: "373 cc",
    available: true
  },
  {
    id: 9,
    brand: "Vespa",
    model: "SXL 150",
    type: "Scooter",
    pricePerHour: 11,
    pricePerDay: 77,
    rating: 4.6,
    reviews: 62,
    engine: "150 cc",
    available: true
  },
  {
    id: 10,
    brand: "Triumph",
    model: "Street Twin",
    type: "Cruiser",
    pricePerHour: 25,
    pricePerDay: 175,
    rating: 4.9,
    reviews: 57,
    engine: "900 cc",
    available: false
  }
];

const key = {
  fav: "rr_favorites",
  book: "rr_bookings",
  theme: "rr_theme"
};

let favorites = JSON.parse(
  localStorage.getItem(key.fav) || "[]"
);

let bookings = JSON.parse(
  localStorage.getItem(key.book) || "[]"
);

let activeBike = null;


// ============================================================
// HELPERS
// ============================================================

const $ = selector => document.querySelector(selector);

const $$ = selector => [
  ...document.querySelectorAll(selector)
];

const money = value =>
  `$${Number(value).toLocaleString()}`;

const toastMessage = message => {
  const toast = $("#toast");

  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(
    () => toast.classList.remove("show"),
    2400
  );
};


// ============================================================
// LOCAL STORAGE
// ============================================================

function saveState() {
  localStorage.setItem(
    key.fav,
    JSON.stringify(favorites)
  );

  localStorage.setItem(
    key.book,
    JSON.stringify(bookings)
  );
}


// ============================================================
// BIKE CARD
// ============================================================

function cardTemplate(bike) {
  const liked = favorites.includes(bike.id);

  return `
    <article class="bike-card">

      <div class="bike-image">

        <button
          class="bike-heart ${liked ? "active" : ""}"
          data-fav="${bike.id}"
        >
          ${liked ? "♥" : "♡"}
        </button>

        <span class="bike-mini">
          ${bike.brand.toUpperCase()}<br>
          ${bike.model.toUpperCase()}
        </span>

      </div>

      <div class="bike-info">

        <div class="bike-meta">

          <span>${bike.type}</span>

          <span class="bike-rating">
            ★ ${bike.rating}
            <span>(${bike.reviews})</span>
          </span>

        </div>

        <h3>
          ${bike.brand} ${bike.model}
        </h3>

        <div class="bike-price">

          <strong>
            ${money(bike.pricePerDay)}
            <small>/ day</small>
          </strong>

          <span class="status ${bike.available ? "" : "cancelled"}">
            ${bike.available ? "Available" : "Booked"}
          </span>

        </div>

        <div class="bike-card-actions">

          <button
            class="outline-btn"
            data-details="${bike.id}"
          >
            View details
          </button>

          <button
            class="dark-btn"
            data-rent="${bike.id}"
          >
            Rent now
          </button>

        </div>

      </div>

    </article>
  `;
}


// ============================================================
// RENDER CARDS
// ============================================================

function renderCards(list, target) {

  $(target).innerHTML = list.length
    ? list.map(cardTemplate).join("")
    : `
      <div class="empty-state">
        <strong>No bikes found</strong>
        Try changing your filters or search term.
      </div>
    `;
}


// ============================================================
// EXPLORE / FILTERS
// ============================================================

function renderExplore() {

  const query =
    $("#bikeSearch").value.toLowerCase();

  const type =
    $("#typeFilter").value;

  const brand =
    $("#brandFilter").value;

  const max =
    Number($("#priceFilter").value);

  const available =
    $("#availableFilter").checked;

  let list = bikes.filter(
    bike =>
      `${bike.brand} ${bike.model}`
        .toLowerCase()
        .includes(query) &&

      (type === "all" ||
        bike.type === type) &&

      (brand === "all" ||
        bike.brand === brand) &&

      bike.pricePerDay <= max &&

      (!available || bike.available)
  );

  const sort =
    $("#sortFilter").value;

  if (sort === "low") {
    list.sort(
      (a, b) =>
        a.pricePerDay - b.pricePerDay
    );
  }

  if (sort === "high") {
    list.sort(
      (a, b) =>
        b.pricePerDay - a.pricePerDay
    );
  }

  if (sort === "rating") {
    list.sort(
      (a, b) =>
        b.rating - a.rating
    );
  }

  $("#resultCount").textContent =
    `${list.length} bike${
      list.length !== 1 ? "s" : ""
    }`;

  renderCards(
    list,
    "#exploreGrid"
  );
}


// ============================================================
// FAVORITES
// ============================================================

function renderFavorites() {

  renderCards(
    bikes.filter(
      bike => favorites.includes(bike.id)
    ),
    "#favoritesGrid"
  );

  $("#favoriteCount").textContent =
    favorites.length;
}


// ============================================================
// RENTALS
// ============================================================

function renderRentals(tab = "all") {

  let list = bookings.filter(
    booking =>
      tab === "all" ||
      booking.status === tab
  );

  $("#rentalsList").innerHTML =
    list.length
      ? list
          .map(item => {

            const bike = bikes.find(
              bike =>
                bike.id === item.bikeId
            );

            return `
              <article class="rental-card">

                <div class="rental-thumb">
                  ${bike.brand}<br>
                  ${bike.model}
                </div>

                <div>

                  <h3>
                    ${bike.brand} ${bike.model}
                  </h3>

                  <p>
                    ${item.start}
                    →
                    ${item.end}
                    ·
                    ${item.location}
                  </p>

                  <small>
                    Booking ID ${item.id}
                    · Booked today
                  </small>

                </div>

                <div class="rental-side">

                  <span class="status ${item.status}">
                    ${item.status}
                  </span>

                  <strong>
                    ${money(item.total)}
                  </strong>

                  <button
                    class="text-link"
                    data-cancel="${item.id}"
                  >
                    ${
                      item.status === "upcoming"
                        ? "Cancel booking"
                        : "View booking"
                    }
                    →
                  </button>

                </div>

              </article>
            `;

          })
          .join("")
      : `
        <div class="empty-state">
          <strong>
            ${
              tab === "all"
                ? "No rentals yet"
                : `No ${tab} rentals yet`
            }
          </strong>

          Your next great ride is waiting.
        </div>
      `;
}


// ============================================================
// PAGE NAVIGATION
// ============================================================

function showPage(page) {

  $$(".page-section").forEach(
    section =>
      section.classList.remove("active")
  );

  $(`#${page}Page`)
    .classList.add("active");

  $$("[data-page]").forEach(
    link =>
      link.classList.toggle(
        "active",
        link.dataset.page === page
      )
  );

  if (page === "explore") {
    renderExplore();
  }

  if (page === "favorites") {
    renderFavorites();
  }

  if (page === "rentals") {
    renderRentals();
  }

  if (page === "dashboard") {
    renderDashboard();
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


