"use strict";

const siteHeader = document.querySelector("#site-header");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector("#nav-links");
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
  scrollTicking = false;
};

window.addEventListener("scroll", () => {
  if (!scrollTicking) {
    window.requestAnimationFrame(updateHeader);
    scrollTicking = true;
  }
}, { passive: true });

updateHeader();
window.addEventListener("load", () => document.body.classList.add("is-loaded"), { once: true });

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
  if (days >= 30) return { rate: .3, tier: 30 };
  if (days >= 14) return { rate: .2, tier: 14 };
  if (days >= 7) return { rate: .1, tier: 7 };
  return { rate: 0, tier: 0 };
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
  const { rate, tier } = getDiscount(days);
  const subtotal = plan.price * days;
  const discountValue = subtotal * rate;
  const total = subtotal - discountValue;
  const dailyWord = days === 1 ? "diária" : "diárias";

  totalOutput.textContent = currency.format(total);
  detailOutput.textContent = `${days} ${dailyWord} × ${currency.format(plan.price)}${rate ? ` · ${Math.round(rate * 100)}% de desconto` : ""}`;
  savingsOutput.hidden = rate === 0;
  savingsOutput.textContent = rate ? `Você economiza ${currency.format(discountValue)}` : "";

  discountTiers.forEach((item) => {
    if (Number(item.dataset.discountTier) === tier) item.setAttribute("aria-current", "true");
    else item.removeAttribute("aria-current");
  });

  const message = `Olá! Quero verificar a disponibilidade do plano ${plan.name} para ${days} ${dailyWord}. Total estimado: ${currency.format(total)}.`;
  whatsappButton.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
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

const revealTargets = [...document.querySelectorAll("[data-reveal]")];
if (reducedMotion.matches || !("IntersectionObserver" in window)) {
  revealTargets.forEach((target) => target.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: .12, rootMargin: "0px 0px -8%" });
  revealTargets.forEach((target) => revealObserver.observe(target));
}

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
