// Yes button: open modal
const yesButton = document.getElementById("yesButton");
const yesModal = document.getElementById("yesModal");
const closeModalButton = document.getElementById("closeModalButton");

function openYesModal() {
  yesModal.classList.add("visible");
  yesModal.setAttribute("aria-hidden", "false");
}

function closeYesModal() {
  yesModal.classList.remove("visible");
  yesModal.setAttribute("aria-hidden", "true");
}

yesButton.addEventListener("click", openYesModal);
closeModalButton.addEventListener("click", closeYesModal);
yesModal.addEventListener("click", (e) => {
  if (e.target === yesModal) {
    closeYesModal();
  }
});

// Playful "No" button that dodges the cursor and never really works
const noButton = document.getElementById("noButton");
let noTimeout = null;

function randomPositionWithinParent() {
  const parent = noButton.parentElement;
  const parentRect = parent.getBoundingClientRect();
  const btnRect = noButton.getBoundingClientRect();

  const maxLeft = Math.max(parentRect.width - btnRect.width, 0);
  const maxTop = Math.max(parentRect.height - btnRect.height, 0);

  const newLeft = Math.random() * maxLeft;
  const newTop = Math.random() * maxTop;

  noButton.style.position = "relative";
  noButton.style.left = `${newLeft}px`;
  noButton.style.top = `${newTop}px`;
}

function vanishAndReappear() {
  noButton.style.opacity = "0";
  noButton.style.pointerEvents = "none";

  if (noTimeout) {
    window.clearTimeout(noTimeout);
  }

  noTimeout = window.setTimeout(() => {
    randomPositionWithinParent();
    noButton.style.opacity = "1";
    noButton.style.pointerEvents = "auto";
  }, 600 + Math.random() * 800);
}

// Move on hover / focus / touch
["mouseenter", "focus"].forEach((ev) => {
  noButton.addEventListener(ev, vanishAndReappear);
});

noButton.addEventListener(
  "touchstart",
  (e) => {
    e.preventDefault();
    vanishAndReappear();
  },
  { passive: false },
);

// Guard any click attempts so it never "works"
noButton.addEventListener("click", (e) => {
  e.preventDefault();
  vanishAndReappear();
});

// Initial small offset so positioning changes feel playful
window.addEventListener("load", () => {
  noButton.style.transition =
    "opacity 0.25s ease, transform 0.18s ease, left 0.25s ease, top 0.25s ease";
});

