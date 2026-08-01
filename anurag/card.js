const CONTACT = {
  fullName: "Anurag Jha",
  org: "Wildbook",
  title: "Founder",
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

document.getElementById("save-contact")?.addEventListener("click", downloadVCard);
