const ALL_IMAGES = [
  "images/20250316_142801.jpeg",
  "images/IMG_0704.jpeg",
  "images/IMG_3589.jpeg",
  "images/IMG_3781.jpeg",
  "images/IMG_3887.jpeg",
  "images/IMG_3938.jpeg",
  "images/IMG_4003.jpeg",
  "images/IMG_4077.jpeg",
  "images/IMG_4217.jpeg",
  "images/IMG_4596.jpeg",
  "images/IMG_4862.jpeg",
  "images/IMG_4919.jpeg",
  "images/IMG_5686.jpeg",
  "images/IMG_7083.jpeg",
  "images/IMG_8082.jpeg",
  "images/IMG_9797.jpeg",
  "images/gradphotos5-10-25-177.jpeg",
  "images/lp_image.jpeg",
];

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

const shuffled = shuffle(ALL_IMAGES);
const round1Images = shuffled.slice(0, 9);
const round2Images = shuffled.slice(9, 18);

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

renderGrid(round1Images);
