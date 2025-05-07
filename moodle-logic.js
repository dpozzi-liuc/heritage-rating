
const images = [
  // Replace with actual image list from your GitHub repo
  ...Array.from({length: 20}, (_, i) => `https://dpozzi-liuc.github.io/heritage-rating/heritage/img${i+1}.png`),
  ...Array.from({length: 20}, (_, i) => `https://dpozzi-liuc.github.io/heritage-rating/not-heritage/img${i+1}.png`),
  ...Array.from({length: 10}, (_, i) => `https://dpozzi-liuc.github.io/heritage-rating/neutral/img${i+1}.png`)
];

let current = 0;
const responses = {};
const shuffled = images.sort(() => Math.random() - 0.5);

document.addEventListener("DOMContentLoaded", () => {
  const imgEl = document.getElementById("currentImage");
  const stars = document.querySelectorAll(".stars button");
  const nextBtn = document.getElementById("nextBtn");
  const thankyou = document.getElementById("thankyou");

  function loadImage() {
    if (current >= shuffled.length) {
      document.querySelector(".image-container").style.display = "none";
      thankyou.style.display = "block";
      sendData();
      return;
    }
    imgEl.src = shuffled[current];
    stars.forEach(s => s.classList.remove("selected"));
  }

  stars.forEach(button => {
    button.addEventListener("click", () => {
      const val = parseInt(button.dataset.value);
      responses[shuffled[current].replace("https://dpozzi-liuc.github.io/heritage-rating/", "")] = val;
      stars.forEach(s => s.classList.remove("selected"));
      button.classList.add("selected");
    });
  });

  nextBtn.addEventListener("click", () => {
    if (!responses.hasOwnProperty(shuffled[current].replace("https://dpozzi-liuc.github.io/heritage-rating/", ""))) {
      alert("Please select a rating before continuing.");
      return;
    }
    current++;
    loadImage();
  });

  loadImage();
});

function sendData() {
  const data = {
    userID: "UID_" + Date.now(),
    ageGroup: "Unknown",
    country: "Unknown",
    responses: responses
  };

  fetch("https://script.google.com/macros/s/AKfycbxu5CwsxSidExHkx3VVPzamRWfX_l4g_konsBFus8-wRgHh8bqwtTu7YmHlG8s7WoDR/exec", {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
}
