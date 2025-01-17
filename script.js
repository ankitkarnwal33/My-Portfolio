"use strict";

// Lazy loading image.
const images = document.querySelectorAll("img[data-src]");
const handleImage = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener("load", () => {
    entry.target.classList.remove("layer_blur");
  });
  observer.unobserve(entry.target);
};
const imageObserver = new IntersectionObserver(handleImage, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});

images.forEach((img) => imageObserver.observe(img));

// Implementing Navigation
const allSections = document.querySelectorAll(".section");
const navLinks = document.querySelectorAll("#nav--list_items_item");
navLinks.forEach((item) => {
  item.addEventListener("click", (event) => {
    event.preventDefault();
    if (event.target.classList.contains("link")) {
      const id = event.target.getAttribute("href");
      document.querySelector(`${id}`).scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Revealing sections on scroll.

const sectionAll = document.querySelectorAll(".section--hidden");

const handleRevealSections = function (entries, observer) {
  const [entry] = entries;
  entries.forEach((ent) => {
    if (!ent.isIntersecting) return;
    ent.target.classList.remove("section--hidden");
  });
};

const sectionRevealObserver = new IntersectionObserver(handleRevealSections, {
  root: null,
  threshold: 0,
});

sectionAll.forEach((section) => sectionRevealObserver.observe(section));

const header = document.getElementById("header");
header.addEventListener("click", (e) => {
  if (e.target.classList.contains("project")) {
    document.getElementById("section-2").scrollIntoView({ behavior: "smooth" });
  }
});

const stickyObserver = new IntersectionObserver(handleStickyNav, {
  root: null,
  threshold: 0,
});

stickyObserver.observe(header);
