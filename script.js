"use strict";

const siteHeader = document.querySelector("#site-header");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector("#nav-links");
const scrollProgress = document.querySelector("#scroll-progress");
const mobileQuery = window.matchMedia("(max-width: 820px)");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const setMenu = (isOpen) => {
  if (!navToggle || !navLinks || !siteHeader) return;
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
  navLinks.classList.toggle("is-open", isOpen);
  siteHeader.classList.toggle("menu-open", isOpen);
  document.body.classList.toggle("menu-open", isOpen);
};

navToggle?.addEventListener("click", () => {
  setMenu(navToggle.getAttribute("aria-expanded") !== "true");
});

navLinks?.addEventListener("click", (event) => {
  if (event.target.closest("a")) setMenu(false);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenu(false);
});

document.addEventListener("click", (event) => {
  if (!mobileQuery.matches || navToggle?.getAttribute("aria-expanded") !== "true") return;
  if (!siteHeader?.contains(event.target)) setMenu(false);
});

mobileQuery.addEventListener("change", (event) => {
  if (!event.matches) setMenu(false);
});

let scrollTicking = false;
const updateHeader = () => {
  siteHeader?.classList.toggle("is-scrolled", window.scrollY > 24);
  if (scrollProgress) {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0;
    scrollProgress.style.transform = `scaleX(${progress})`;
  }
  scrollTicking = false;
};

window.addEventListener("scroll", () => {
  if (!scrollTicking) {
    window.requestAnimationFrame(updateHeader);
    scrollTicking = true;
  }
}, { passive: true });

updateHeader();
const markLoaded = () => window.requestAnimationFrame(() => document.body.classList.add("is-loaded"));
if (document.readyState === "complete") markLoaded();
else window.addEventListener("load", markLoaded, { once: true });

const hero = document.querySelector("#inicio");
const heroVideo = document.querySelector("#hero-video");
const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
const dataConstrained = Boolean(connection?.saveData || ["slow-2g", "2g"].includes(connection?.effectiveType));

if (hero && heroVideo && !reducedMotion.matches && !dataConstrained) {
  let heroVisible = true;
  let sourcesReady = false;
  let loadScheduled = false;

  const playHeroVideo = () => {
    if (!heroVisible || document.hidden) return;
    if (!sourcesReady) {
      heroVideo.querySelectorAll("source[data-src]").forEach((source) => {
        source.src = source.dataset.src;
        source.removeAttribute("data-src");
      });
      heroVideo.load();
      sourcesReady = true;
    }
    heroVideo.play().catch(() => {});
  };

  const scheduleHeroVideo = () => {
    if (loadScheduled || sourcesReady) return;
    loadScheduled = true;
    const queuePlayback = () => {
      const run = () => {
        loadScheduled = false;
        playHeroVideo();
      };
      if ("requestIdleCallback" in window) window.requestIdleCallback(run, { timeout: 1800 });
      else window.setTimeout(run, 600);
    };
    if (document.readyState === "complete") queuePlayback();
    else window.addEventListener("load", queuePlayback, { once: true });
  };

  heroVideo.addEventListener("loadeddata", () => heroVideo.classList.add("is-ready"), { once: true });

  if ("IntersectionObserver" in window) {
    const heroVideoObserver = new IntersectionObserver(([entry]) => {
      heroVisible = entry.isIntersecting;
      if (heroVisible) {
        if (sourcesReady) heroVideo.play().catch(() => {});
        else scheduleHeroVideo();
      } else {
        heroVideo.pause();
      }
    }, { threshold: .08 });
    heroVideoObserver.observe(hero);
  }

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) heroVideo.pause();
    else if (heroVisible && sourcesReady) heroVideo.play().catch(() => {});
  });

  scheduleHeroVideo();
}

const year = document.querySelector("#current-year");
if (year) year.textContent = String(new Date().getFullYear());

const planCards = [...document.querySelectorAll("[data-plan-card]")];
const planSelect = document.querySelector("#sim-plan");
const daysInput = document.querySelector("#sim-days");
const form = document.querySelector("#simulator-form");
const totalOutput = document.querySelector("#sim-total");
const detailOutput = document.querySelector("#sim-detail");
const savingsOutput = document.querySelector("#sim-savings");
const errorOutput = document.querySelector("#sim-error");
const whatsappButton = document.querySelector("#sim-whatsapp");
const simulator = document.querySelector("#simulador");
const discountTiers = [...document.querySelectorAll("[data-discount-tier]")];
const whatsappNumber = "5595981121572";

const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL"
});

const plans = new Map(planCards.map((card) => [card.dataset.planId, {
  id: card.dataset.planId,
  name: card.dataset.planName,
  price: Number(card.dataset.price),
  card
}]));

if (planSelect) {
  plans.forEach((plan) => {
    const option = document.createElement("option");
    option.value = plan.id;
    option.textContent = `${plan.name} — ${currency.format(plan.price)}/dia`;
    planSelect.append(option);
  });
}

const getDiscount = (days) => {
  if (days >= 30) return { rate: .3, tier: 30, label: "Mensal (30%)" };
  if (days >= 14) return { rate: .2, tier: 14, label: "Quinzenal (20%)" };
  if (days >= 7) return { rate: .1, tier: 7, label: "Semanal (10%)" };
  return { rate: 0, tier: 0, label: "Sem desconto" };
};

const formatMessageCurrency = (value) => `R$ ${value.toLocaleString("pt-BR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})}`;

const animateResult = () => {
  if (reducedMotion.matches || !("animate" in Element.prototype)) return;
  [totalOutput, detailOutput, savingsOutput].forEach((element, index) => {
    if (!element || element.hidden) return;
    element.getAnimations().forEach((animation) => animation.cancel());
    element.animate([
      { opacity: .45, transform: "translateY(6px)", filter: "blur(2px)" },
      { opacity: 1, transform: "translateY(0)", filter: "blur(0)" }
    ], {
      duration: 240,
      delay: index * 35,
      easing: "cubic-bezier(.23, 1, .32, 1)"
    });
  });
};

const setSimulatorEnabled = (enabled) => {
  if (!whatsappButton) return;
  whatsappButton.classList.toggle("is-disabled", !enabled);
  whatsappButton.setAttribute("aria-disabled", String(!enabled));
  whatsappButton.tabIndex = enabled ? 0 : -1;
  if (!enabled) {
    whatsappButton.removeAttribute("href");
    whatsappButton.removeAttribute("target");
    whatsappButton.removeAttribute("rel");
  }
};

const updateSelectedCard = (planId) => {
  planCards.forEach((card) => {
    card.classList.toggle("is-selected", card.dataset.planId === planId);
  });
};

const showError = (message = "") => {
  if (!errorOutput) return;
  errorOutput.textContent = message;
};

const calculate = () => {
  if (!planSelect || !daysInput || !totalOutput || !detailOutput || !savingsOutput || !whatsappButton) return;

  const plan = plans.get(planSelect.value);
  const days = Number(daysInput.value);
  const validDays = Number.isInteger(days) && days >= 1 && days <= 365;

  updateSelectedCard(plan?.id ?? "");

  if (!plan) {
    showError(planSelect.value ? "Plano inválido. Selecione outra opção." : "");
    totalOutput.textContent = currency.format(0);
    detailOutput.textContent = "Selecione um plano para calcular.";
    savingsOutput.hidden = true;
    discountTiers.forEach((tier) => tier.removeAttribute("aria-current"));
    setSimulatorEnabled(false);
    return;
  }

  if (!validDays) {
    showError("Informe de 1 a 365 diárias.");
    totalOutput.textContent = currency.format(0);
    detailOutput.textContent = "Corrija o período para calcular.";
    savingsOutput.hidden = true;
    discountTiers.forEach((tier) => tier.removeAttribute("aria-current"));
    setSimulatorEnabled(false);
    return;
  }

  showError();
  const { rate, tier, label } = getDiscount(days);
  const subtotal = plan.price * days;
  const discountValue = subtotal * rate;
  const total = subtotal - discountValue;
  const dailyWord = days === 1 ? "diária" : "diárias";

  totalOutput.textContent = currency.format(total);
  detailOutput.textContent = `${days} ${dailyWord} × ${currency.format(plan.price)}${rate ? ` · ${Math.round(rate * 100)}% de desconto` : ""}`;
  savingsOutput.hidden = rate === 0;
  savingsOutput.textContent = rate ? `Você economiza ${currency.format(discountValue)}` : "";
  animateResult();

  discountTiers.forEach((item) => {
    if (Number(item.dataset.discountTier) === tier) item.setAttribute("aria-current", "true");
    else item.removeAttribute("aria-current");
  });

  let message = "Olá! Tenho interesse na locação de Starlink.\n\n";
  message += `📋 Plano: ${plan.name}\n`;
  message += `📅 Diárias: ${days}\n`;
  if (rate > 0) message += `🏷️ Desconto: ${label}\n`;
  message += `💰 Total estimado: ${formatMessageCurrency(total)}`;
  whatsappButton.href = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(message)}`;
  whatsappButton.target = "_blank";
  whatsappButton.rel = "noopener";
  setSimulatorEnabled(true);
};

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  calculate();
});

planSelect?.addEventListener("change", calculate);
daysInput?.addEventListener("input", calculate);

planCards.forEach((card) => {
  card.querySelector("[data-select-plan]")?.addEventListener("click", () => {
    if (!planSelect) return;
    planSelect.value = card.dataset.planId;
    calculate();
    simulator?.scrollIntoView({ behavior: reducedMotion.matches ? "auto" : "smooth", block: "center" });
    window.setTimeout(() => planSelect.focus({ preventScroll: true }), reducedMotion.matches ? 0 : 420);
  });
});

whatsappButton?.addEventListener("click", (event) => {
  if (whatsappButton.getAttribute("aria-disabled") === "true") event.preventDefault();
});

calculate();

const registerMotionGroup = (selector, variant = "up", delayStep = 55) => {
  document.querySelectorAll(selector).forEach((target, index) => {
    target.dataset.motion = variant;
    target.style.setProperty("--motion-delay", `${Math.min(index, 5) * delayStep}ms`);
  });
};

registerMotionGroup(".section-heading > *");
registerMotionGroup(".plan-card", "scale", 65);
registerMotionGroup(".simulator > *", "up", 90);
registerMotionGroup(".process-list > li", "right", 70);
registerMotionGroup(".experience-media", "left");
registerMotionGroup(".experience-copy > *", "up", 60);
registerMotionGroup(".photo-grid figure", "scale", 55);
registerMotionGroup(".faq-list details", "up", 45);
registerMotionGroup(".final-cta-content > *", "up", 70);
registerMotionGroup(".footer-main > *", "up", 55);
registerMotionGroup(".commercial-note");

const revealTargets = [...document.querySelectorAll("[data-motion]")];
if (reducedMotion.matches || !("IntersectionObserver" in window)) {
  revealTargets.forEach((target) => target.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: .14, rootMargin: "0px 0px -7%" });
  revealTargets.forEach((target) => revealObserver.observe(target));
}
document.documentElement.classList.add("motion-ready");
const sectionLinks = [...document.querySelectorAll('.nav-links a[href^="#"]')];
const sections = sectionLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window && sections.length) {
  const sectionObserver = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    sectionLinks.forEach((link) => {
      const active = link.getAttribute("href") === `#${visible.target.id}`;
      if (active) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
  }, { rootMargin: "-20% 0px -65%", threshold: [0, .2, .5] });
  sections.forEach((section) => sectionObserver.observe(section));
}
