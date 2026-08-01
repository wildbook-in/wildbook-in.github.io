const CONTACT = {
  fullName: "Anurag Jha",
  org: "Wildbook",
  title: "Founder",
  phone: "+917483735393",
  email: "hello@wildbook.in",
  url: "https://www.wildbook.in",
  instagram: "https://www.instagram.com/wildbook.in",
};

const CHECK_ICON = `
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 13l4 4L19 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
`;

function buildVCard() {
  return [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${CONTACT.fullName}`,
    `N:Jha;Anurag;;;`,
    `ORG:${CONTACT.org}`,
    `TITLE:${CONTACT.title}`,
    `TEL;TYPE=CELL:${CONTACT.phone}`,
    `EMAIL;TYPE=INTERNET:${CONTACT.email}`,
    `URL:${CONTACT.url}`,
    `URL;TYPE=Instagram:${CONTACT.instagram}`,
    "END:VCARD",
  ].join("\r\n");
}

function downloadVCard() {
  const blob = new Blob([buildVCard()], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "anurag-jha-wildbook.vcf";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

async function copyText(value) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const field = document.createElement("textarea");
  field.value = value;
  field.setAttribute("readonly", "");
  field.style.position = "fixed";
  field.style.opacity = "0";
  document.body.appendChild(field);
  field.select();
  document.execCommand("copy");
  field.remove();
}

function setupCopyButtons() {
  document.querySelectorAll(".field-copy").forEach((button) => {
    const originalLabel = button.getAttribute("aria-label") || "Copy";
    const originalIcon = button.innerHTML;

    button.addEventListener("click", async (event) => {
      event.preventDefault();
      event.stopPropagation();

      const value = button.getAttribute("data-copy");
      if (!value) return;

      try {
        await copyText(value);
        button.classList.add("is-copied");
        button.innerHTML = CHECK_ICON;
        button.setAttribute("aria-label", "Copied");
      } catch {
        button.setAttribute("aria-label", "Copy failed");
      }

      window.setTimeout(() => {
        button.classList.remove("is-copied");
        button.innerHTML = originalIcon;
        button.setAttribute("aria-label", originalLabel);
      }, 1400);
    });
  });
}

document.getElementById("save-contact")?.addEventListener("click", downloadVCard);
setupCopyButtons();
