// Mock Cafe Data Database
const INITIAL_CAFES = [
  {
    id: "beanspot-coffee",
    name: "빈스팟 커피 (BeanSpot Coffee)",
    rating: 4.8,
    reviewCount: 128,
    img: "cafe_beanspot.jpg",
    isOfficial: true,
    isFavorite: true,
    isVisited: true,
    x: 45, // percentage on map
    y: 55,
    visitors: ["혼자", "2명", "3-4명"],
    seats: ["바 좌석", "2인 테이블", "테라스"],
    scale: 65, // 보통~넓음
    tags: ["산미", "고소함", "핸드드립", "혼자", "작업", "와이파이", "콘센트", "반려동물"],
    dna: {
      "커피 맛": 95,
      "디저트": 85,
      "작업하기": 90,
      "데이트": 75,
      "분위기": 88,
      "조용함": 80,
      "사진 맛집": 72,
      "친절함": 92
    },
    reviews: [
      {
        user: "Bean Lover ⭐⭐⭐⭐⭐",
        date: "2일 전",
        text: "라떼가 정말 맛있었어요! 공간도 아늑하고 작업하기 정말 좋은 환경입니다. 사장님도 너무 친절하시네요.",
        tags: ["고소함", "작업", "콘센트"],
        stars: 5,
        reply: "방문해주셔서 감사합니다! 기분 좋은 하루 보내세요 ☕"
      },
      {
        user: "디저트 사냥꾼 ⭐⭐⭐⭐☆",
        date: "1주 전",
        text: "시그니처 드립 커피 향이 아주 풍부합니다. 휘낭시에도 겉바속촉 맛있는데 오후 늦게 가면 품절되네요.",
        tags: ["산미", "핸드드립", "혼자"],
        stars: 4
      }
    ],
    notice: "여름 한정 신메뉴 '콜드브루 토닉' 출시했습니다! 시원한 청량감을 느껴보세요."
  },
  {
    id: "espresso-zen",
    name: "에스프레소 젠 (Espresso Zen)",
    rating: 4.6,
    reviewCount: 84,
    img: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=400&q=80",
    isOfficial: false,
    isFavorite: false,
    isVisited: true,
    x: 22,
    y: 32,
    visitors: ["혼자", "2명"],
    seats: ["바 좌석", "2인 테이블"],
    scale: 25, // 작은 규모
    tags: ["고소함", "다크", "혼자", "데이트", "조용함", "와이파이"],
    dna: {
      "커피 맛": 98,
      "디저트": 50,
      "작업하기": 40,
      "데이트": 82,
      "분위기": 95,
      "조용함": 90,
      "사진 맛집": 80,
      "친절함": 88
    },
    reviews: [
      {
        user: "에스프레소 매니아 ⭐⭐⭐⭐⭐",
        date: "3일 전",
        text: "정통 에스프레소 바를 찾는다면 무조건 여기입니다. 조용하게 흘러나오는 재즈 음악과 커피 향이 완벽한 조화를 이룹니다.",
        tags: ["다크", "조용함", "혼자"],
        stars: 5
      }
    ]
  },
  {
    id: "cafe-de-noir",
    name: "카페 드 누아르 (Café de Noir)",
    rating: 4.5,
    reviewCount: 96,
    img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=400&q=80",
    isOfficial: true,
    isFavorite: false,
    isVisited: false,
    x: 72,
    y: 42,
    visitors: ["2명", "3-4명", "5-8명"],
    seats: ["2인 테이블", "4인 테이블", "소파석", "단체석"],
    scale: 85, // 넓음
    tags: ["디카페인", "고소함", "데이트", "공부", "케이크", "크로아상", "와이파이", "주차"],
    dna: {
      "커피 맛": 85,
      "디저트": 95,
      "작업하기": 70,
      "데이트": 90,
      "분위기": 92,
      "조용함": 65,
      "사진 맛집": 96,
      "친절함": 85
    },
    reviews: [
      {
        user: "디저트러버 ⭐⭐⭐⭐⭐",
        date: "5일 전",
        text: "초코 크로아상 진짜 최고예요... 카페도 넓고 감각적인 인테리어라 인스타 사진 건지기 너무 좋습니다.",
        tags: ["데이트", "케이크", "디저트"],
        stars: 5,
        reply: "예쁜 사진 남겨주셔서 감사합니다. 매주 주말 새로운 시즌 케이크가 출시되니 또 찾아주세요!"
      }
    ]
  },
  {
    id: "aroma-lab",
    name: "아로마 랩 (Aroma Lab)",
    rating: 4.7,
    reviewCount: 62,
    img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=400&q=80",
    isOfficial: false,
    isFavorite: false,
    isVisited: false,
    x: 58,
    y: 20,
    visitors: ["혼자", "2명", "3-4명"],
    seats: ["2인 테이블", "4인 테이블", "단체석"],
    scale: 95, // 매우 넓음
    tags: ["산미", "디카페인", "혼자", "작업", "공부", "와이파이", "콘센트", "휠체어 접근"],
    dna: {
      "커피 맛": 92,
      "디저트": 78,
      "작업하기": 95,
      "데이트": 60,
      "분위기": 82,
      "조용함": 92,
      "사진 맛집": 55,
      "친절함": 90
    },
    reviews: [
      {
        user: "노마드 코더 ⭐⭐⭐⭐⭐",
        date: "4일 전",
        text: "자리마다 콘센트가 거의 다 있어서 눈치 안 보고 코딩/과제하기 최고입니다. 카페 전용 와이파이 속도도 매우 빠르네요.",
        tags: ["작업", "콘센트", "와이파이"],
        stars: 5
      }
    ]
  }
];

// App State Management
let cafes = [];
let currentCafe = null;
let activeScreen = "screen-map";
let mySpotTab = "visited"; // 'visited' or 'favorites'
let selectedRating = 0;
let selectedWriteTags = [];
let activeFilters = {
  coffee: [],
  purpose: []
};
let searchQuery = "";

// Escape user-provided text before inserting it via innerHTML
function escapeHtml(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Initialize App
document.addEventListener("DOMContentLoaded", () => {
  // Load data from LocalStorage or use initials
  const storedCafes = localStorage.getItem("beanspot_cafes");
  if (storedCafes) {
    cafes = JSON.parse(storedCafes);
  } else {
    cafes = INITIAL_CAFES;
    localStorage.setItem("beanspot_cafes", JSON.stringify(cafes));
  }

  initRealTime();
  renderPins();
  setupEventListeners();
  initRadarChartGrid();
  lucide.createIcons();
});

// Update System Bar Clock
function initRealTime() {
  const timeEl = document.getElementById("real-time");
  const updateTime = () => {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    timeEl.textContent = `${hours}:${minutes}`;
  };
  updateTime();
  setInterval(updateTime, 60000);
}

// Render Pins on Map
function renderPins() {
  const mapCanvas = document.getElementById("map-canvas");
  
  // Clear existing pins (keep grid background)
  const existingPins = mapCanvas.querySelectorAll(".map-pin");
  existingPins.forEach(pin => pin.remove());

  // Filter cafes based on selected filters
  const filteredCafes = cafes.filter(cafe => {
    // Check coffee filter
    if (activeFilters.coffee.length > 0) {
      const match = activeFilters.coffee.some(tag => cafe.tags.includes(tag));
      if (!match) return false;
    }
    // Check purpose filter
    if (activeFilters.purpose.length > 0) {
      const match = activeFilters.purpose.some(tag => cafe.tags.includes(tag));
      if (!match) return false;
    }
    // Check search query (name or tag)
    if (searchQuery) {
      const matchesName = cafe.name.toLowerCase().includes(searchQuery);
      const matchesTag = cafe.tags.some(tag => tag.toLowerCase().includes(searchQuery));
      if (!matchesName && !matchesTag) return false;
    }
    return true;
  });

  // Inject pins
  filteredCafes.forEach(cafe => {
    const pin = document.createElement("div");
    pin.className = "map-pin";
    pin.style.left = `${cafe.x}%`;
    pin.style.top = `${cafe.y}%`;
    pin.setAttribute("data-id", cafe.id);

    if (currentCafe && currentCafe.id === cafe.id) {
      pin.classList.add("active-highlight");
    }

    const label = document.createElement("span");
    label.className = "pin-label";
    label.textContent = cafe.name.split(" ")[0]; // short name
    pin.appendChild(label);

    pin.addEventListener("click", () => {
      // Highlight pin
      mapCanvas.querySelectorAll(".map-pin").forEach(p => p.classList.remove("active-highlight"));
      pin.classList.add("active-highlight");
      
      // Load Detail
      loadCafeDetail(cafe.id);
    });

    mapCanvas.appendChild(pin);
  });
}

// Setup Interaction Listeners
function setupEventListeners() {
  // Bottom Tab navigation
  document.querySelectorAll(".tab-item").forEach(button => {
    button.addEventListener("click", (e) => {
      const targetScreen = button.getAttribute("data-target");
      switchScreen(targetScreen);

      // Manage active state of tabs
      document.querySelectorAll(".tab-item").forEach(t => t.classList.remove("active"));
      button.classList.add("active");
    });
  });

  // Back buttons
  document.getElementById("detail-back-btn").addEventListener("click", () => {
    switchScreen("screen-map");
    // Sync active tab
    document.querySelectorAll(".tab-item").forEach(t => t.classList.remove("active"));
    document.querySelector('[data-target="screen-map"]').classList.add("active");
  });

  document.getElementById("write-back-btn").addEventListener("click", () => {
    switchScreen("screen-detail");
  });

  // Search input filter
  const searchInput = document.getElementById("map-search-input");
  const clearSearchBtn = document.getElementById("clear-search");

  searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    clearSearchBtn.style.display = searchQuery.length > 0 ? "block" : "none";
    renderPins();
  });

  clearSearchBtn.addEventListener("click", () => {
    searchInput.value = "";
    searchQuery = "";
    clearSearchBtn.style.display = "none";
    renderPins();
  });

  // Filter Tag Chips
  document.querySelectorAll(".chip").forEach(chip => {
    chip.addEventListener("click", () => {
      const category = chip.getAttribute("data-category");
      const tag = chip.getAttribute("data-tag");

      chip.classList.toggle("active");

      if (chip.classList.contains("active")) {
        activeFilters[category].push(tag);
      } else {
        activeFilters[category] = activeFilters[category].filter(t => t !== tag);
      }

      renderPins();
    });
  });

  // Favorite Heart Toggle
  const heartBtn = document.getElementById("detail-heart-btn");
  heartBtn.addEventListener("click", () => {
    if (!currentCafe) return;
    currentCafe.isFavorite = !currentCafe.isFavorite;
    heartBtn.classList.toggle("liked", currentCafe.isFavorite);
    saveState();
  });

  // Visit Toggle
  const visitBtn = document.getElementById("detail-visit-btn");
  visitBtn.addEventListener("click", () => {
    if (!currentCafe) return;
    currentCafe.isVisited = !currentCafe.isVisited;
    visitBtn.classList.toggle("visited", currentCafe.isVisited);
    saveState();
  });

  // Review Write Panel Opener
  document.getElementById("open-write-review-btn").addEventListener("click", () => {
    if (!currentCafe) return;
    document.getElementById("write-cafe-name").textContent = currentCafe.name;
    
    // Reset inputs
    selectedRating = 0;
    selectedWriteTags = [];
    document.getElementById("review-text-input").value = "";
    document.querySelectorAll(".write-star").forEach(s => s.classList.remove("filled"));
    document.querySelectorAll(".write-tag-chip").forEach(c => c.classList.remove("selected"));

    switchScreen("screen-write-review");
  });

  // Stars rating Selector
  document.querySelectorAll(".write-star").forEach(star => {
    star.addEventListener("click", () => {
      selectedRating = parseInt(star.getAttribute("data-value"));
      document.querySelectorAll(".write-star").forEach(s => {
        const val = parseInt(s.getAttribute("data-value"));
        if (val <= selectedRating) {
          s.classList.add("filled");
        } else {
          s.classList.remove("filled");
        }
      });
    });
  });

  // Write Review Tag Chip selection
  document.querySelectorAll(".write-tag-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      const tag = chip.getAttribute("data-tag");
      chip.classList.toggle("selected");

      if (chip.classList.contains("selected")) {
        selectedWriteTags.push(tag);
      } else {
        selectedWriteTags = selectedWriteTags.filter(t => t !== tag);
      }
    });
  });

  // Submit review button
  document.getElementById("submit-review-btn").addEventListener("click", () => {
    if (!currentCafe) return;
    if (selectedRating === 0) {
      alert("별점을 선택해주세요!");
      return;
    }
    const text = document.getElementById("review-text-input").value.trim();
    if (!text) {
      alert("후기를 남겨주세요!");
      return;
    }

    // Append new review
    const newReview = {
      user: `익명 기여자 ${"⭐".repeat(selectedRating)}${"☆".repeat(5-selectedRating)}`,
      date: "방금 전",
      text: text,
      tags: [...selectedWriteTags],
      stars: selectedRating
    };

    currentCafe.reviews.unshift(newReview);

    // Update cafe statistics: fold the new rating into the running average
    // (reviews[] only holds a sample, so it can't be used to recompute the mean)
    const totalStars = currentCafe.rating * currentCafe.reviewCount + selectedRating;
    currentCafe.reviewCount += 1;
    currentCafe.rating = parseFloat((totalStars / currentCafe.reviewCount).toFixed(1));

    // Dynamic adjustment of Cafe DNA based on tags & rating
    selectedWriteTags.forEach(tag => {
      // mapping tags to dna attributes
      if (tag === "산미" || tag === "고소함" || tag === "핸드드립") {
        currentCafe.dna["커피 맛"] = Math.min(100, currentCafe.dna["커피 맛"] + 2);
      } else if (tag === "작업" || tag === "공부") {
        currentCafe.dna["작업하기"] = Math.min(100, currentCafe.dna["작업하기"] + 3);
        currentCafe.dna["조용함"] = Math.min(100, currentCafe.dna["조용함"] + 1);
      } else if (tag === "데이트") {
        currentCafe.dna["데이트"] = Math.min(100, currentCafe.dna["데이트"] + 3);
        currentCafe.dna["분위기"] = Math.min(100, currentCafe.dna["분위기"] + 2);
      }
    });

    saveState();
    
    // Refresh detail screen UI
    loadCafeDetail(currentCafe.id);
    switchScreen("screen-detail");
  });

  // My Spot Visited & Favorites toggles
  document.getElementById("tab-visited").addEventListener("click", () => {
    mySpotTab = "visited";
    document.getElementById("tab-visited").classList.add("active");
    document.getElementById("tab-favorites").classList.remove("active");
    renderMySpotList();
  });

  document.getElementById("tab-favorites").addEventListener("click", () => {
    mySpotTab = "favorites";
    document.getElementById("tab-favorites").classList.add("active");
    document.getElementById("tab-visited").classList.remove("active");
    renderMySpotList();
  });

  // Owner Portal Controls
  const certCheckbox = document.getElementById("owner-cert-checkbox");
  certCheckbox.addEventListener("change", (e) => {
    if (!currentCafe) {
      alert("먼저 지도에서 매장을 선택해주세요!");
      certCheckbox.checked = false;
      return;
    }
    currentCafe.isOfficial = e.target.checked;
    
    // Sync Header and details
    document.getElementById("header-cert-badge").style.display = currentCafe.isOfficial ? "flex" : "none";
    document.getElementById("detail-official-badge").style.display = currentCafe.isOfficial ? "flex" : "none";
    saveState();
  });

  // Owner Notice Submit
  document.getElementById("owner-notice-submit-btn").addEventListener("click", () => {
    if (!currentCafe) {
      alert("먼저 지도에서 매장을 선택해주세요!");
      return;
    }
    const noticeText = document.getElementById("owner-notice-input").value.trim();
    if (!noticeText) {
      alert("공지사항을 입력해주세요!");
      return;
    }

    currentCafe.notice = noticeText;
    saveState();
    alert("공지사항이 등록되었습니다! 카페 정보 화면에서 확인하실 수 있습니다.");
    document.getElementById("owner-notice-input").value = "";
    
    // Refresh Detail UI
    loadCafeDetail(currentCafe.id);
  });
}

// Switch Screens helper
function switchScreen(screenId) {
  // Hide active screen
  document.querySelectorAll(".app-screen").forEach(screen => {
    screen.classList.remove("active");
  });
  
  // Show new screen
  const target = document.getElementById(screenId);
  target.classList.add("active");
  activeScreen = screenId;

  // Set Title in header
  const titleEl = document.getElementById("current-screen-title");
  if (screenId === "screen-map") {
    titleEl.textContent = "지도 탐색";
  } else if (screenId === "screen-detail") {
    titleEl.textContent = "카페 상세";
  } else if (screenId === "screen-write-review") {
    titleEl.textContent = "리뷰 작성";
  } else if (screenId === "screen-my-spot") {
    titleEl.textContent = "내 스팟";
    renderMySpotList();
  } else if (screenId === "screen-owner") {
    titleEl.textContent = "사장님 공간";
    loadOwnerPanelState();
  }
}

// Load Cafe Detail Screen Data
function loadCafeDetail(cafeId) {
  const cafe = cafes.find(c => c.id === cafeId);
  if (!cafe) return;

  currentCafe = cafe;

  // Set Cert Badges
  document.getElementById("header-cert-badge").style.display = cafe.isOfficial ? "flex" : "none";
  document.getElementById("detail-official-badge").style.display = cafe.isOfficial ? "flex" : "none";

  // Name & Image
  document.getElementById("detail-name").textContent = cafe.name;
  const imgEl = document.getElementById("detail-img");
  imgEl.src = cafe.img;
  imgEl.onerror = () => {
    imgEl.src = "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=400&q=80"; // fallback
  };

  // Heart & Visited buttons styling
  document.getElementById("detail-heart-btn").classList.toggle("liked", cafe.isFavorite);
  document.getElementById("detail-visit-btn").classList.toggle("visited", cafe.isVisited);

  // Rating & Review counts
  document.getElementById("detail-rating-text").textContent = `${cafe.rating} (${cafe.reviewCount}개 리뷰)`;

  // Info pills - Recommended visitors
  const visitorContainer = document.getElementById("detail-visitors-pills");
  visitorContainer.innerHTML = "";
  ["혼자", "2명", "3-4명", "5-8명", "9명+"].forEach(v => {
    const pill = document.createElement("span");
    pill.className = "info-pill";
    pill.textContent = v;
    if (cafe.visitors.includes(v)) {
      pill.classList.add("active");
    }
    visitorContainer.appendChild(pill);
  });

  // Info pills - Seat shapes
  const seatsContainer = document.getElementById("detail-seats-pills");
  seatsContainer.innerHTML = "";
  ["바 좌석", "2인 테이블", "4인 테이블", "단체석", "소파석", "테라스"].forEach(s => {
    const pill = document.createElement("span");
    pill.className = "info-pill";
    pill.textContent = s;
    if (cafe.seats.includes(s)) {
      pill.classList.add("active");
    }
    seatsContainer.appendChild(pill);
  });

  // Scale Bar (Space size)
  document.getElementById("detail-scale-fill").style.width = `${cafe.scale}%`;

  // Filter Chips / Tags
  const tagsContainer = document.getElementById("detail-tags");
  tagsContainer.innerHTML = "";
  cafe.tags.forEach(tag => {
    const pill = document.createElement("span");
    pill.className = "tag-pills";
    pill.textContent = tag;
    tagsContainer.appendChild(pill);
  });

  // Radar Chart Values Polygon
  renderRadarValues(cafe.dna);

  // Reviews List rendering
  const reviewsList = document.getElementById("detail-reviews-list");
  reviewsList.innerHTML = "";

  // Inject announcement notice if available
  if (cafe.notice) {
    const noticeCard = document.createElement("div");
    noticeCard.className = "review-card";
    noticeCard.style.border = "1px solid var(--color-accent-gold)";
    noticeCard.style.background = "rgba(233, 216, 166, 0.05)";
    noticeCard.innerHTML = `
      <div class="review-user-row">
        <span class="review-user" style="color: var(--color-accent-gold); display: flex; align-items: center; gap: 4px;">
          <i data-lucide="megaphone" style="width: 14px; height: 14px;"></i> 매장 공지사항
        </span>
      </div>
      <p class="review-text" style="color: var(--color-text-light); font-weight: 500;">${escapeHtml(cafe.notice)}</p>
    `;
    reviewsList.appendChild(noticeCard);
  }

  // Inject Reviews
  if (cafe.reviews && cafe.reviews.length > 0) {
    cafe.reviews.forEach(review => {
      const card = document.createElement("div");
      card.className = "review-card";

      let starsHtml = "";
      for (let i = 1; i <= 5; i++) {
        if (i <= review.stars) {
          starsHtml += `<i data-lucide="star"></i>`;
        } else {
          starsHtml += `<i data-lucide="star" class="empty"></i>`;
        }
      }

      let tagsHtml = "";
      if (review.tags && review.tags.length > 0) {
        tagsHtml = `
          <div class="review-tags">
            ${review.tags.map(t => `<span class="review-tag">${escapeHtml(t)}</span>`).join("")}
          </div>
        `;
      }

      let replyHtml = "";
      if (review.reply) {
        replyHtml = `
          <div class="owner-reply-box">
            <div class="owner-reply-header"><i data-lucide="corner-down-right" style="width: 12px; height: 12px; display: inline-block; vertical-align: middle;"></i> 사장님 답변</div>
            <p class="owner-reply-text">${escapeHtml(review.reply)}</p>
          </div>
        `;
      }

      card.innerHTML = `
        <div class="review-user-row">
          <span class="review-user">${escapeHtml(review.user)}</span>
          <span class="review-date">${escapeHtml(review.date)}</span>
        </div>
        <div class="review-stars">${starsHtml}</div>
        <p class="review-text">${escapeHtml(review.text)}</p>
        ${tagsHtml}
        ${replyHtml}
      `;

      reviewsList.appendChild(card);
    });
  } else {
    reviewsList.innerHTML = `<div class="empty-state"><p>첫 번째 신뢰 리뷰를 작성해보세요!</p></div>`;
  }

  lucide.createIcons();
  switchScreen("screen-detail");
}

// My Spot View Renderer
function renderMySpotList() {
  const container = document.getElementById("my-spot-list");
  const emptyEl = document.getElementById("my-spot-empty");
  container.innerHTML = "";

  const filterProp = mySpotTab === "visited" ? "isVisited" : "isFavorite";
  const matchedCafes = cafes.filter(c => c[filterProp]);

  if (matchedCafes.length === 0) {
    emptyEl.style.display = "flex";
    return;
  } else {
    emptyEl.style.display = "none";
  }

  matchedCafes.forEach(cafe => {
    const card = document.createElement("div");
    card.className = "my-spot-card";
    
    card.innerHTML = `
      <div class="my-spot-info">
        <span class="my-spot-name">${escapeHtml(cafe.name)}</span>
        <span class="my-spot-rating">
          <i data-lucide="star" style="width:12px; height:12px; fill:var(--color-accent-gold); color:var(--color-accent-gold)"></i>
          ${cafe.rating} (${cafe.reviewCount})
        </span>
      </div>
      <i data-lucide="chevron-right" style="width: 18px; color: var(--color-text-muted)"></i>
    `;

    card.addEventListener("click", () => {
      loadCafeDetail(cafe.id);
    });

    container.appendChild(card);
  });

  lucide.createIcons();
}

// Load Owner State in panel
function loadOwnerPanelState() {
  if (currentCafe) {
    document.getElementById("owner-cert-checkbox").checked = currentCafe.isOfficial;
    document.getElementById("owner-notice-input").placeholder = currentCafe.notice 
      ? `현재 공지: "${currentCafe.notice}"`
      : "새로운 메뉴 출시, 영업시간 임시 변경 등 공지사항을 입력해 주세요.";
  } else {
    document.getElementById("owner-cert-checkbox").checked = false;
  }
}

// Radar Chart Rendering Mechanics
const RADAR_KEYS = ["커피 맛", "디저트", "작업하기", "데이트", "분위기", "조용함", "사진 맛집", "친절함"];
const RADAR_CENTER = 100;
const RADAR_MAX_R = 75;

// Build background layout of radar chart
function initRadarChartGrid() {
  const svg = document.getElementById("radar-chart-svg");
  const levels = [25, 50, 75, 100];
  
  levels.forEach(level => {
    const poly = document.getElementById(`radar-ring-${level}`);
    const points = [];
    
    for (let i = 0; i < 8; i++) {
      const angle = i * (Math.PI / 4) - Math.PI / 2;
      const r = (level / 100) * RADAR_MAX_R;
      const x = RADAR_CENTER + r * Math.cos(angle);
      const y = RADAR_CENTER + r * Math.sin(angle);
      points.push(`${x},${y}`);
    }
    
    poly.setAttribute("points", points.join(" "));
  });

  // Axis lines & labels
  for (let i = 0; i < 8; i++) {
    const angle = i * (Math.PI / 4) - Math.PI / 2;
    
    // Axis line
    const xEnd = RADAR_CENTER + RADAR_MAX_R * Math.cos(angle);
    const yEnd = RADAR_CENTER + RADAR_MAX_R * Math.sin(angle);
    const axis = document.getElementById(`axis-line-${i}`);
    axis.setAttribute("x1", RADAR_CENTER);
    axis.setAttribute("y1", RADAR_CENTER);
    axis.setAttribute("x2", xEnd);
    axis.setAttribute("y2", yEnd);

    // Label position (slightly offset outward)
    const labelR = RADAR_MAX_R + 14;
    const xLabel = RADAR_CENTER + labelR * Math.cos(angle);
    const yLabel = RADAR_CENTER + labelR * Math.sin(angle);

    const labelsGroup = document.getElementById("radar-labels");
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", xLabel);
    text.setAttribute("y", yLabel);
    text.setAttribute("class", "radar-label");
    text.textContent = RADAR_KEYS[i];
    
    // adjust positioning details slightly based on angle
    if (i === 0) text.setAttribute("y", yLabel - 2);
    if (i === 4) text.setAttribute("y", yLabel + 2);
    if (i === 2 || i === 6) text.setAttribute("text-anchor", i === 2 ? "start" : "end");
    
    labelsGroup.appendChild(text);
  }
}

// Render active polygon based on data values
function renderRadarValues(dna) {
  const points = [];
  const dotsGroup = document.getElementById("radar-dots");
  dotsGroup.innerHTML = "";

  RADAR_KEYS.forEach((key, idx) => {
    const val = dna[key] || 50; // fallback
    const angle = idx * (Math.PI / 4) - Math.PI / 2;
    const r = (val / 100) * RADAR_MAX_R;
    const x = RADAR_CENTER + r * Math.cos(angle);
    const y = RADAR_CENTER + r * Math.sin(angle);

    points.push(`${x},${y}`);

    // Create dot
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    circle.setAttribute("r", 3);
    circle.setAttribute("class", "radar-dot");
    dotsGroup.appendChild(circle);
  });

  const poly = document.getElementById("radar-values");
  poly.setAttribute("points", points.join(" "));
}

// Save app state locally
function saveState() {
  localStorage.setItem("beanspot_cafes", JSON.stringify(cafes));
}
