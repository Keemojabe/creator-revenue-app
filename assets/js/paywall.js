// ----------------------------
// User Access Control
// ----------------------------

// Set to false to test modal for free users
let isProUser = false;

// DOM elements
const downloadBtn = document.getElementById('downloadBtn');
const modal = document.getElementById('paywallModal');
const closeModal = document.getElementById('closeModal');
const buyBtn = document.getElementById('buyProBtn');

// ----------------------------
// Download PDF
// ----------------------------
downloadBtn.addEventListener('click', () => {
    if (!isProUser) {
        // Show modal for free users
        modal.classList.remove('hidden');
    } else {
        generatePDF();
    }
});

// ----------------------------
// Modal buttons
// ----------------------------
closeModal.addEventListener('click', () => {
    modal.classList.add('hidden');
});

if (buyBtn) {
    buyBtn.addEventListener('click', () => {
        window.open("https://your-lemonsqueezy-checkout-url.com", "_blank");
    });
}

// ----------------------------
// PDF Generation using jsPDF
// ----------------------------
function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Creator Revenue Report", 20, 20);

    const adRevenue = document.getElementById('adRevenue')?.textContent || "0.00";
    const affiliateRevenue = document.getElementById('affiliateRevenue')?.textContent || "0.00";
    const brandRevenue = document.getElementById('brandRevenue')?.textContent || "0.00";
    const totalRevenue = document.getElementById('totalRevenue')?.textContent || "0.00";

    doc.setFontSize(14);
    doc.text(`Ad Revenue: $${adRevenue}`, 20, 40);
    doc.text(`Affiliate Revenue: $${affiliateRevenue}`, 20, 50);
    doc.text(`Brand Revenue: $${brandRevenue}`, 20, 60);
    doc.text(`Total Revenue: $${totalRevenue}`, 20, 80);

    doc.save("Revenue_Report.pdf");
}