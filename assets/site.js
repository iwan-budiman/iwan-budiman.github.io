const root = document.documentElement;
const body = document.body;
const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector(".menu-toggle");
const navPanel = document.querySelector(".nav-panel");
const navLinks = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

root.classList.add("js");

function setMenuState(isOpen) {
  if (!menuToggle || !navPanel) {
    return;
  }

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  navPanel.classList.toggle("is-open", isOpen);
  body.classList.toggle("menu-open", isOpen);
}

menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") !== "true";
  setMenuState(isOpen);
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => setMenuState(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle?.getAttribute("aria-expanded") === "true") {
    setMenuState(false);
    menuToggle.focus();
  }
});

document.addEventListener("click", (event) => {
  if (
    menuToggle?.getAttribute("aria-expanded") === "true"
    && !event.target.closest(".site-nav")
  ) {
    setMenuState(false);
  }
});

const desktopNavigation = window.matchMedia("(min-width: 861px)");

function handleNavigationBreakpoint(event) {
  if (event.matches) {
    setMenuState(false);
  }
}

desktopNavigation.addEventListener?.("change", handleNavigationBreakpoint);

let headerIsScrolled;

function updateHeaderState() {
  const nextState = window.scrollY > 16;

  if (nextState === headerIsScrolled) {
    return;
  }

  headerIsScrolled = nextState;
  header?.classList.toggle("is-scrolled", nextState);
}

updateHeaderState();
window.addEventListener("scroll", updateHeaderState, { passive: true });

const revealItems = Array.from(document.querySelectorAll("[data-reveal]"));

function showAllRevealItems() {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

if (reducedMotion.matches || !("IntersectionObserver" in window)) {
  showAllRevealItems();
} else {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  }, {
    rootMargin: "0px 0px -8% 0px",
    threshold: 0.12
  });

  revealItems.forEach((item, index) => {
    item.style.setProperty("--reveal-order", String(index % 3));
    revealObserver.observe(item);
  });
}

const sectionTargets = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);
let sectionOffsets = [];

function cacheSectionOffsets() {
  sectionOffsets = sectionTargets.map((section) => ({
    id: section.id,
    top: section.offsetTop
  }));
  updateActiveNavigation();
}

function setActiveNavigation(id) {
  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${id}`;
    link.classList.toggle("is-active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

let navigationFrame;

function updateActiveNavigation() {
  const marker = window.scrollY + window.innerHeight * 0.42;
  let currentSection = null;

  sectionOffsets.forEach((section) => {
    if (section.top <= marker) {
      currentSection = section;
    }
  });

  setActiveNavigation(currentSection?.id);

  navigationFrame = undefined;
}

function requestNavigationUpdate() {
  if (navigationFrame) {
    return;
  }

  navigationFrame = window.requestAnimationFrame(updateActiveNavigation);
}

cacheSectionOffsets();
window.addEventListener("scroll", requestNavigationUpdate, { passive: true });
window.addEventListener("resize", () => {
  window.requestAnimationFrame(cacheSectionOffsets);
}, { passive: true });
window.addEventListener("load", cacheSectionOffsets, { once: true });
document.fonts?.ready?.then(cacheSectionOffsets);

const approachSteps = [
  {
    number: "01",
    kicker: "Start with the why",
    title: "Outcome frame",
    summary: "Clarify the business result, success measures, constraints, and stakeholder priorities before choosing technology.",
    outputs: ["Problem statement", "Success measures", "Decision boundaries"]
  },
  {
    number: "02",
    kicker: "Translate the need",
    title: "Capability map",
    summary: "Translate customer, colleague, risk, and operational needs into the capabilities the solution must support.",
    outputs: ["Capability view", "Journey touchpoints", "Ownership model"]
  },
  {
    number: "03",
    kicker: "Make trade-offs visible",
    title: "Options review",
    summary: "Compare realistic solution paths across value, complexity, risk, cost, reuse, and delivery confidence.",
    outputs: ["Option set", "Trade-off summary", "Recommended direction"]
  },
  {
    number: "04",
    kicker: "Connect the system",
    title: "Domain blueprint",
    summary: "Shape the target architecture across integration, data, security, resilience, cloud, and operational concerns.",
    outputs: ["Solution blueprint", "Integration patterns", "Key architecture decisions"]
  },
  {
    number: "05",
    kicker: "Make it deliverable",
    title: "Delivery roadmap",
    summary: "Turn architecture direction into delivery increments that teams can sequence, govern, and execute.",
    outputs: ["Transition states", "Dependency map", "Delivery guardrails"]
  },
  {
    number: "06",
    kicker: "Design for reality",
    title: "Operate & govern",
    summary: "Prepare the solution for production reality, including support, observability, governance, and AI guardrails where needed.",
    outputs: ["Operational readiness", "Control points", "Governance guardrails"]
  }
];

const approachTabs = Array.from(document.querySelectorAll(".approach-tab"));
const approachPanel = document.querySelector(".approach-panel");
let activeApproachIndex = 0;

function animateApproachPanel() {
  if (reducedMotion.matches || !approachPanel?.animate) {
    return;
  }

  approachPanel.animate(
    [
      { opacity: 0.45, transform: "translateY(5px)" },
      { opacity: 1, transform: "translateY(0)" }
    ],
    {
      duration: 190,
      easing: "cubic-bezier(0.22, 1, 0.36, 1)"
    }
  );
}

function renderApproachStep(index, shouldFocus = false) {
  const step = approachSteps[index];

  if (!step || !approachPanel || !approachTabs.length) {
    return;
  }

  activeApproachIndex = index;

  approachTabs.forEach((tab, tabIndex) => {
    const isActive = tabIndex === index;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
    tab.tabIndex = isActive ? 0 : -1;
  });

  approachPanel.setAttribute("aria-labelledby", approachTabs[index].id);
  approachPanel.querySelector(".panel-phase").textContent = `Phase ${step.number} / 06`;
  approachPanel.querySelector(".panel-number").textContent = step.number;
  approachPanel.querySelector(".panel-kicker").textContent = step.kicker;
  approachPanel.querySelector("h3").textContent = step.title;
  approachPanel.querySelector(".panel-summary").textContent = step.summary;

  const outputList = approachPanel.querySelector(".panel-outputs ul");
  const outputItems = step.outputs.map((output) => {
    const item = document.createElement("li");
    item.textContent = output;
    return item;
  });

  outputList.replaceChildren(...outputItems);
  animateApproachPanel();

  if (shouldFocus) {
    approachTabs[index].focus();
  }
}

approachTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => renderApproachStep(index));
  tab.addEventListener("keydown", (event) => {
    const handledKeys = ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End"];

    if (!handledKeys.includes(event.key)) {
      return;
    }

    event.preventDefault();
    let nextIndex = activeApproachIndex;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = (activeApproachIndex + 1) % approachTabs.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = (activeApproachIndex - 1 + approachTabs.length) % approachTabs.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = approachTabs.length - 1;
    }

    renderApproachStep(nextIndex, true);
  });
});

const year = document.querySelector("[data-year]");

if (year) {
  year.textContent = String(new Date().getFullYear());
}
