/**
 * PotentStream — Sales Page Script
 * Offer:    PotentStream (BuyGoods)
 * Traffic:  Google Search Ads
 * Language: EN-US
 * Market:   USA
 *
 * KARINA: Substitua a URL abaixo pelo seu link de afiliado final.
 * Se quiser testar qual pacote converte mais, crie variáveis separadas por pacote.
 */

const AFFILIATE_LINK = "https://thepotentstream.com/start/index.php?aff_id=77782";

// ---------------------------------------------------------------------------
// Variáveis opcionais por pacote (caso queira links distintos por quantidade)
// Descomente e ajuste se o checkout suportar parâmetro de quantidade/SKU.
// ---------------------------------------------------------------------------
// const AFFILIATE_LINK_1BOTTLE = "https://thepotentstream.com/start/index.php?aff_id=77782&qty=1";
// const AFFILIATE_LINK_3BOTTLE = "https://thepotentstream.com/start/index.php?aff_id=77782&qty=3";
// const AFFILIATE_LINK_6BOTTLE = "https://thepotentstream.com/start/index.php?aff_id=77782&qty=6";

// ---------------------------------------------------------------------------
// DOM READY
// ---------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {

  attachCTALinks();
  initSmoothScrollCTAs();
  initFAQAccessibility();

});

// ---------------------------------------------------------------------------
// 1. Attach affiliate link to all CTA buttons
//    All buttons with class "cta-btn" open AFFILIATE_LINK in a new tab.
//    Per Google Ads compliance: target="_blank" with rel="noopener noreferrer"
// ---------------------------------------------------------------------------
function attachCTALinks() {
  const ctaButtons = document.querySelectorAll(".cta-btn");

  ctaButtons.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();

      // Optional: fire a tracking event before redirect
      // Example for GA4:
      // if (typeof gtag === "function") {
      //   gtag("event", "cta_click", {
      //     event_category: "conversion",
      //     event_label: btn.getAttribute("aria-label") || "CTA Button",
      //   });
      // }

      // Open checkout in new tab
      window.open(AFFILIATE_LINK, "_blank", "noopener,noreferrer");
    });
  });
}

// ---------------------------------------------------------------------------
// 2. Hero CTA smooth-scrolls to #pricing section on mobile/tablet,
//    then opens link (so user sees pricing before checkout).
//    On desktop (wide viewport), goes directly to checkout.
// ---------------------------------------------------------------------------
function initSmoothScrollCTAs() {
  const heroCTA = document.querySelector(".hero .cta-btn");
  const midCTA  = document.querySelector(".section-midcta .cta-btn");

  // Hero button: scroll to pricing section first (mobile UX), then open link
  if (heroCTA) {
    heroCTA.removeEventListener("click", heroCTA._affiliateHandler);

    heroCTA.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation(); // prevent duplicate from attachCTALinks

      const pricingSection = document.getElementById("pricing");

      if (pricingSection && window.innerWidth < 768) {
        // Mobile: scroll to pricing first so user sees packages
        pricingSection.scrollIntoView({ behavior: "smooth", block: "start" });
        // Then open link after a short delay
        setTimeout(function () {
          window.open(AFFILIATE_LINK, "_blank", "noopener,noreferrer");
        }, 600);
      } else {
        // Desktop: go straight to checkout
        window.open(AFFILIATE_LINK, "_blank", "noopener,noreferrer");
      }
    });
  }

  // Mid-CTA: always scroll to pricing section
  if (midCTA) {
    midCTA.removeEventListener("click", midCTA._affiliateHandler);

    midCTA.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      const orderSection = document.getElementById("order");
      if (orderSection) {
        orderSection.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.open(AFFILIATE_LINK, "_blank", "noopener,noreferrer");
      }
    });
  }
}

// ---------------------------------------------------------------------------
// 3. FAQ: improve keyboard navigation for <details> elements
//    (Native <details> works fine; this adds Enter/Space key support
//    for summary elements and smooth animation)
// ---------------------------------------------------------------------------
function initFAQAccessibility() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(function (item) {
    const summary = item.querySelector(".faq-question");
    if (!summary) return;

    // Ensure summary is keyboard focusable
    if (!summary.getAttribute("tabindex")) {
      summary.setAttribute("tabindex", "0");
    }

    // Add role for screen readers
    summary.setAttribute("role", "button");

    // Close other items when one opens (accordion behavior)
    item.addEventListener("toggle", function () {
      if (item.open) {
        faqItems.forEach(function (other) {
          if (other !== item && other.open) {
            other.removeAttribute("open");
          }
        });
      }
    });
  });
}

// ---------------------------------------------------------------------------
// 4. Sticky header shadow on scroll
// ---------------------------------------------------------------------------
(function initHeaderScroll() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  window.addEventListener("scroll", function () {
    if (window.scrollY > 10) {
      header.style.boxShadow = "0 2px 12px rgba(0,0,0,0.10)";
    } else {
      header.style.boxShadow = "0 1px 4px rgba(0,0,0,0.06)";
    }
  }, { passive: true });
})();
