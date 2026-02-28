// ----------------------------
// Currency support
// ----------------------------
let currencySymbol = "$"; // default
const currencySelect = document.getElementById('currency');
currencySelect.addEventListener('change', () => {
    currencySymbol = currencySelect.value;
    calculateRevenue(); // recalc to update display
});

// ----------------------------
// Example: updating revenue outputs dynamically
// ----------------------------
function updateResults(adRevenue, affiliateRevenue, brandRevenue, totalRevenue) {
    const adEl = document.getElementById('adRevenue');
    const affEl = document.getElementById('affiliateRevenue');
    const brandEl = document.getElementById('brandRevenue');
    const totalEl = document.getElementById('totalRevenue');

    animateValue(adEl, 0, adRevenue, 1000, currencySymbol);
    animateValue(affEl, 0, affiliateRevenue, 1000, currencySymbol);
    animateValue(brandEl, 0, brandRevenue, 1000, currencySymbol);
    animateValue(totalEl, 0, totalRevenue, 1000, currencySymbol);
}

// ----------------------------
// animateValue helper
// ----------------------------
function animateValue(el, start, end, duration, symbol = "$") {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        el.textContent = symbol + (start + (end - start) * progress).toFixed(2);
        if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
}

// ----------------------------
// PDF Generation
// ----------------------------
function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Creator Revenue Report", 20, 20);

    const adRevenue = document.getElementById('adRevenue').textContent;
    const affiliateRevenue = document.getElementById('affiliateRevenue').textContent;
    const brandRevenue = document.getElementById('brandRevenue').textContent;
    const totalRevenue = document.getElementById('totalRevenue').textContent;

    doc.setFontSize(14);
    doc.text(`Ad Revenue: ${adRevenue}`, 20, 40);
    doc.text(`Affiliate Revenue: ${affiliateRevenue}`, 20, 50);
    doc.text(`Brand Revenue: ${brandRevenue}`, 20, 60);
    doc.text(`Total Revenue: ${totalRevenue}`, 20, 80);

    doc.save("Revenue_Report.pdf");
}