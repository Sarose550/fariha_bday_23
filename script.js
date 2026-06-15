function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const grid = document.getElementById("grid");
const errorEl = document.getElementById("error");
const verifyBtn = document.getElementById("verify-btn");
const reloadBtn = document.getElementById("reload-btn");
const captchaEl = document.getElementById("captcha");
const successEl = document.getElementById("success");
const signoffEl = document.getElementById("signoff");

let round1Images = [];
let round2Images = [];
let round = 1;
let selected = new Set();

function renderGrid(images) {
  grid.innerHTML = "";
  selected = new Set();
  images.forEach((src, idx) => {
    const cell = document.createElement("button");
    cell.type = "button";
    cell.className = "grid-cell";
    cell.dataset.idx = idx;
    cell.innerHTML = `
      <img src="${src}" alt="" loading="eager" decoding="async" />
      <div class="check" aria-hidden="true">
        <svg viewBox="0 0 24 24"><path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/></svg>
      </div>
    `;
    cell.addEventListener("click", () => {
      if (selected.has(idx)) {
        selected.delete(idx);
        cell.classList.remove("selected");
      } else {
        selected.add(idx);
        cell.classList.add("selected");
      }
    });
    grid.appendChild(cell);
  });
}

function showError(msg) {
  errorEl.textContent = msg;
  errorEl.hidden = false;
}

function hideError() {
  errorEl.hidden = true;
}

reloadBtn.addEventListener("click", () => {
  const images = round === 1 ? round1Images : round2Images;
  renderGrid(images);
  hideError();
});

verifyBtn.addEventListener("click", () => {
  if (round === 1) {
    showError("Please try again.");
    round = 2;
    setTimeout(() => {
      renderGrid(round2Images);
      hideError();
    }, 900);
    return;
  }

  if (selected.size !== 9) {
    showError("Please select all matching images.");
    return;
  }

  captchaEl.hidden = true;
  successEl.hidden = false;
  signoffEl.hidden = false;
});

async function init() {
  try {
    const res = await fetch("images/manifest.json");
    if (!res.ok) {
      throw new Error(`Failed to load manifest (${res.status})`);
    }

    const allImages = await res.json();
    if (allImages.length !== 18) {
      showError(`Expected 18 images, found ${allImages.length}.`);
      verifyBtn.disabled = true;
      return;
    }

    const shuffled = shuffle(allImages);
    round1Images = shuffled.slice(0, 9);
    round2Images = shuffled.slice(9, 18);
    renderGrid(round1Images);
  } catch (err) {
    showError("Could not load images. Try refreshing the page.");
    verifyBtn.disabled = true;
    console.error(err);
  }
}

init();
