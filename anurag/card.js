const CONTACT = {
  fullName: "Anurag Jha",
  org: "Wildbook",
  title: "Founder",
  phone: "+917483735393",
  email: "hello@wildbook.in",
  url: "https://www.wildbook.in",
  instagram: "https://www.instagram.com/wildbook.in",
};

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
  document.querySelectorAll(".copy-btn").forEach((button) => {
    button.addEventListener("click", async () => {
      const value = button.getAttribute("data-copy");
      if (!value) return;

      const original = button.textContent;
      try {
        await copyText(value);
        button.textContent = "Copied";
        button.classList.add("is-copied");
      } catch {
        button.textContent = "Failed";
      }

      window.setTimeout(() => {
        button.textContent = original;
        button.classList.remove("is-copied");
      }, 1400);
    });
  });
}

document.getElementById("save-contact")?.addEventListener("click", downloadVCard);
setupCopyButtons();
