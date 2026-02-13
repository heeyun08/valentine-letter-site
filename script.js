const PAGE_PASSWORD = "0618"; // 원하는 비밀번호로 바꿔 사용하세요.
const authScreen = document.getElementById("authScreen");
const protectedContent = document.getElementById("protectedContent");
const passwordInput = document.getElementById("passwordInput");
const unlockBtn = document.getElementById("unlockBtn");
const authMessage = document.getElementById("authMessage");
const envelopeBtn = document.getElementById("envelopeBtn");
const envelopeHint = document.querySelector(".hint");
const surpriseSection = document.getElementById("surpriseSection");
const previewImages = document.querySelectorAll(".preview-image");
const imageModal = document.getElementById("imageModal");
const imageModalImg = document.getElementById("imageModalImg");
const closeImageModalBtn = document.getElementById("closeImageModalBtn");
const downloadImageBtn = document.getElementById("downloadImageBtn");
const copyImageBtn = document.getElementById("copyImageBtn");
const imageActionMessage = document.getElementById("imageActionMessage");

let currentImageSrc = "";
let currentImageName = "";
let fireworkTimeoutId = 0;
// const CURSOR_TRAIL_EMOJIS = ["💖", "💝", "🎁", "🎉", "🍬", "✨", "🍫"];
// const CURSOR_TRAIL_INTERVAL_MS = 45;
// const CURSOR_TRAIL_MAX_ACTIVE = 26;
// let lastCursorTrailAt = 0;
// let activeCursorTrailCount = 0;

function waitForFonts(timeoutMs = 1600) {
  if (!(document.fonts && document.fonts.ready)) {
    return Promise.resolve();
  }

  return Promise.race([
    document.fonts.ready.catch(() => undefined),
    new Promise((resolve) => {
      window.setTimeout(resolve, timeoutMs);
    })
  ]);
}

async function unlockPage() {
  await waitForFonts();
  authScreen.classList.add("hidden");
  protectedContent.classList.remove("hidden");
  protectedContent.classList.remove("revealed");
  window.requestAnimationFrame(() => {
    protectedContent.classList.add("revealed");
  });
  passwordInput.value = "";
  authMessage.textContent = "";
}

function checkPassword() {
  if (passwordInput.value === PAGE_PASSWORD) {
    unlockPage();
    return;
  }

  authMessage.textContent = "비밀번호가 올바르지 않아요.";
  passwordInput.focus();
  passwordInput.select();
}

unlockBtn.addEventListener("click", checkPassword);
passwordInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    checkPassword();
  }
});

envelopeBtn.addEventListener("click", () => {
  const isHidden = surpriseSection.classList.contains("hidden");

  if (isHidden) {
    envelopeBtn.classList.remove("burst");
    void envelopeBtn.offsetWidth;
    envelopeBtn.classList.add("burst");
    window.clearTimeout(fireworkTimeoutId);
    fireworkTimeoutId = window.setTimeout(() => {
      envelopeBtn.classList.remove("burst");
    }, 850);
    envelopeHint?.classList.add("hidden");
    surpriseSection.classList.remove("hidden");
    surpriseSection.classList.add("show");
    envelopeBtn.classList.add("open");
  } else {
    window.clearTimeout(fireworkTimeoutId);
    envelopeBtn.classList.remove("burst");
    envelopeHint?.classList.remove("hidden");
    surpriseSection.classList.add("hidden");
    surpriseSection.classList.remove("show");
    envelopeBtn.classList.remove("open");
  }
});

// function spawnCursorTrailEmoji(clientX, clientY) {
//   const now = Date.now();
//   if (now - lastCursorTrailAt < CURSOR_TRAIL_INTERVAL_MS) {
//     return;
//   }
//   if (activeCursorTrailCount >= CURSOR_TRAIL_MAX_ACTIVE) {
//     return;
//   }
//
//   lastCursorTrailAt = now;
//   const emoji = document.createElement("span");
//   emoji.className = "cursor-emoji";
//   emoji.textContent = CURSOR_TRAIL_EMOJIS[Math.floor(Math.random() * CURSOR_TRAIL_EMOJIS.length)];
//   emoji.style.left = `${clientX}px`;
//   emoji.style.top = `${clientY}px`;
//   emoji.style.setProperty("--drift-x", `${Math.round(Math.random() * 64 - 32)}px`);
//   emoji.style.setProperty("--drift-y", `${Math.round(-44 - Math.random() * 44)}px`);
//   emoji.style.setProperty("--spin", `${Math.round(Math.random() * 50 - 25)}deg`);
//
//   activeCursorTrailCount += 1;
//   emoji.addEventListener("animationend", () => {
//     emoji.remove();
//     activeCursorTrailCount -= 1;
//   });
//
//   document.body.appendChild(emoji);
// }
//
// document.addEventListener("mousemove", (event) => {
//   spawnCursorTrailEmoji(event.clientX, event.clientY);
// });
//
// document.addEventListener(
//   "touchmove",
//   (event) => {
//     const touch = event.touches[0];
//     if (touch) {
//       spawnCursorTrailEmoji(touch.clientX, touch.clientY);
//     }
//   },
//   { passive: true }
// );

function openImageModal(imageElement) {
  currentImageSrc = imageElement.src;
  currentImageName = imageElement.src.split("/").pop() || "image";
  imageModalImg.src = imageElement.src;
  imageModalImg.alt = imageElement.alt;
  imageActionMessage.textContent = "";
  imageModal.classList.remove("hidden");
  imageModal.classList.add("show");
}

function closeImageModal() {
  imageModal.classList.add("hidden");
  imageModal.classList.remove("show");
  imageModalImg.src = "";
  imageModalImg.alt = "";
  imageActionMessage.textContent = "";
  currentImageSrc = "";
  currentImageName = "";
}

previewImages.forEach((image) => {
  if (image.dataset.modalDisabled === "true") {
    return;
  }
  image.addEventListener("click", () => {
    openImageModal(image);
  });
});

closeImageModalBtn.addEventListener("click", closeImageModal);

downloadImageBtn.addEventListener("click", () => {
  if (!currentImageSrc) {
    return;
  }

  const link = document.createElement("a");
  link.href = currentImageSrc;
  link.download = currentImageName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  imageActionMessage.textContent = "이미지 다운로드를 시작했어요.";
});

copyImageBtn.addEventListener("click", async () => {
  if (!currentImageSrc) {
    return;
  }

  if (window.ClipboardItem && navigator.clipboard && navigator.clipboard.write) {
    try {
      const response = await fetch(currentImageSrc);
      const imageBlob = await response.blob();
      const clipboardItem = new ClipboardItem({
        [imageBlob.type]: imageBlob
      });
      await navigator.clipboard.write([clipboardItem]);
      imageActionMessage.textContent = "이미지를 클립보드에 복사했어요.";
    } catch (error) {
      imageActionMessage.textContent = "이미지 복사에 실패했어요.";
    }
    return;
  }

  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(currentImageSrc);
      imageActionMessage.textContent = "이미지 주소를 복사했어요.";
    } catch (error) {
      imageActionMessage.textContent = "링크 복사에 실패했어요.";
    }
    return;
  }

  imageActionMessage.textContent = "이 브라우저는 복사 기능을 지원하지 않아요.";
});

imageModal.addEventListener("click", (event) => {
  if (event.target === imageModal) {
    closeImageModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !imageModal.classList.contains("hidden")) {
    closeImageModal();
  }
});
