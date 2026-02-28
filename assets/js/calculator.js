// ----------------------------
// Currency support
// ----------------------------
const currencySelect = document.getElementById('currency');
let currencySymbol = currencySelect.value; // initial selection

currencySelect.addEventListener('change', () => {
    currencySymbol = currencySelect.value;
    calculateRevenue(); // recalc on currency change
});

// ----------------------------
// Example: calculate revenue
// ----------------------------
function calculateRevenue() {
    const views = parseFloat(document.getElementById('views').value) || 0;
    const cpm = parseFloat(document.getElementById('cpm').value) || 0;
    const affiliateCtr = parseFloat(document.getElementById('affiliateCtr').value) || 0;
    const conversionRate = parseFloat(document.getElementById('conversionRate').value) || 0;
    const productPrice = parseFloat(document.getElementById('productPrice').value) || 0;
    const brandDeals = parseFloat(document.getElementById('brandDeals').value) || 0;
    const brandRate = parseFloat(document.getElementById('brandRate').value) || 0;
    const growthRate = parseFloat(document.getElementById('growthRate').value) || 0;

    // Revenue calculations
    const adRevenue = (views / 1000) * cpm;
    const affiliateRevenue = views * (affiliateCtr/100) * (conversionRate/100) * productPrice;
    const brandRevenue = brandDeals * brandRate;
    const totalRevenue = adRevenue + affiliateRevenue + brandRevenue;

    // Update results dynamically
    updateResults(adRevenue, affiliateRevenue, brandRevenue, totalRevenue);

    // TODO: optionally update chart
}

// ----------------------------
// Update DOM with animation
// ----------------------------
function updateResults(adRevenue, affiliateRevenue, brandRevenue, totalRevenue) {
    animateValue(document.getElementById('adRevenue'), 0, adRevenue, 1000, currencySymbol);
    animateValue(document.getElementById('affiliateRevenue'), 0, affiliateRevenue, 1000, currencySymbol);
    animateValue(document.getElementById('brandRevenue'), 0, brandRevenue, 1000, currencySymbol);
    animateValue(document.getElementById('totalRevenue'), 0, totalRevenue, 1000, currencySymbol);
}

// ----------------------------
// Animate number helper
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
// Download PDF using jsPDF
// ----------------------------
const downloadBtn = document.getElementById('downloadBtn');
downloadBtn.addEventListener('click', () => {
    if (!isProUser) {
        // Show paywall modal
        document.getElementById('paywallModal').classList.remove('hidden');
    } else {
        generatePDF();
    }
});

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

// ----------------------------
// Paywall modal close
// ----------------------------
document.getElementById('closeModal').addEventListener('click', () => {
    document.getElementById('paywallModal').classList.add('hidden');
});