const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");
const savedTheme = getStoredTheme();
const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
const initialTheme = savedTheme || (prefersDark ? "dark" : "light");

function getStoredTheme() {
  try {
    return localStorage.getItem("theme");
  } catch {
    return null;
  }
}

function storeTheme(theme) {
  try {
    localStorage.setItem("theme", theme);
  } catch {
    return;
  }
}

function setTheme(theme) {
  root.dataset.theme = theme;

  if (themeToggle) {
    const isDark = theme === "dark";
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
  }
}

setTheme(initialTheme);

themeToggle?.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  storeTheme(nextTheme);
  setTheme(nextTheme);
});

document.body.classList.add("js-enhanced");
const revealItems = document.querySelectorAll(".section, .card, .approach-board, .approach-step, .impact-card, .experience-item, .certification-card");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => {
    item.classList.add("reveal");
    revealObserver.observe(item);
  });
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const navLinks = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));
const navTargets = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

function setActiveNav(id) {
  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
  });
}

if ("IntersectionObserver" in window && navTargets.length) {
  const navObserver = new IntersectionObserver((entries) => {
    const visibleEntry = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (visibleEntry) {
      setActiveNav(visibleEntry.target.id);
    }
  }, {
    rootMargin: "-35% 0px -55% 0px",
    threshold: [0.01, 0.2, 0.5]
  });

  navTargets.forEach((target) => navObserver.observe(target));
}

const approachSteps = [
  {
    number: "01",
    title: "Outcome Frame",
    summary: "Clarify the business result, success measures, constraints, and stakeholder priorities before choosing technology.",
    outputs: ["Problem statement", "Success measures", "Decision boundaries"]
  },
  {
    number: "02",
    title: "Capability Map",
    summary: "Translate customer, colleague, risk, and operational needs into the capabilities the solution must support.",
    outputs: ["Capability view", "Journey touchpoints", "Ownership model"]
  },
  {
    number: "03",
    title: "Options Review",
    summary: "Compare realistic solution paths across value, complexity, risk, cost, reuse, and delivery confidence.",
    outputs: ["Option set", "Trade-off summary", "Recommended direction"]
  },
  {
    number: "04",
    title: "Domain Blueprint",
    summary: "Shape the target architecture across integration, data, security, resilience, cloud, and operational concerns.",
    outputs: ["Solution blueprint", "Integration patterns", "Key architecture decisions"]
  },
  {
    number: "05",
    title: "Delivery Roadmap",
    summary: "Turn architecture direction into delivery increments that teams can sequence, govern, and execute.",
    outputs: ["Transition states", "Dependency map", "Delivery guardrails"]
  },
  {
    number: "06",
    title: "Operate & Govern",
    summary: "Prepare the solution for production reality, including support, observability, governance, and AI guardrails where needed.",
    outputs: ["Operational readiness", "Control points", "AI and governance guardrails"]
  }
];

const approachButtons = Array.from(document.querySelectorAll(".approach-step"));
const approachDetail = document.querySelector(".approach-detail");
let activeApproachIndex = 0;

function renderApproachStep(index) {
  const step = approachSteps[index];

  if (!step || !approachDetail || !approachButtons.length) {
    return;
  }

  activeApproachIndex = index;

  approachButtons.forEach((button, buttonIndex) => {
    const isActive = buttonIndex === index;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
    button.tabIndex = isActive ? 0 : -1;
  });

  approachDetail.querySelector(".approach-detail-step").textContent = step.number;
  approachDetail.querySelector("h3").textContent = step.title;
  approachDetail.querySelector("p").textContent = step.summary;

  const outputList = approachDetail.querySelector("ul");
  outputList.replaceChildren(...step.outputs.map((output) => {
    const item = document.createElement("li");
    item.textContent = output;
    return item;
  }));
}

approachButtons.forEach((button, index) => {
  button.addEventListener("click", () => renderApproachStep(index));
  button.addEventListener("pointerenter", () => renderApproachStep(index));
  button.addEventListener("focus", () => renderApproachStep(index));
  button.addEventListener("keydown", (event) => {
    if (!["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End"].includes(event.key)) {
      return;
    }

    event.preventDefault();
    let nextIndex = activeApproachIndex;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = (activeApproachIndex + 1) % approachButtons.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = (activeApproachIndex - 1 + approachButtons.length) % approachButtons.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = approachButtons.length - 1;
    }

    renderApproachStep(nextIndex);
    approachButtons[nextIndex].focus();
  });
});

renderApproachStep(0);
