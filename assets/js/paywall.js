const modal = document.getElementById("paywallModal");

document.getElementById("downloadBtn").addEventListener("click", function() {

    const isProUser = localStorage.getItem("isProUser") === "true";

    if (!isProUser) {
        modal.classList.remove("hidden");
        return;
    }

    generatePDF();
});

document.getElementById("closeModal").addEventListener("click", function() {
    modal.classList.add("hidden");
});

document.getElementById("buyProBtn").addEventListener("click", function() {
    window.location.href = "https://your-lemonsqueezy-checkout-link";
});

function generatePDF() {

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const ad = document.getElementById("adRevenue").textContent;
    const affiliate = document.getElementById("affiliateRevenue").textContent;
    const brand = document.getElementById("brandRevenue").textContent;
    const total = document.getElementById("totalRevenue").textContent;

    doc.text("Creator Revenue Report", 20, 20);
    doc.text(`Ad Revenue: $${ad}`, 20, 40);
    doc.text(`Affiliate Revenue: $${affiliate}`, 20, 50);
    doc.text(`Brand Revenue: $${brand}`, 20, 60);
    doc.text(`Total Revenue: $${total}`, 20, 70);

    const canvas = document.getElementById("revenueChart");
    const imgData = canvas.toDataURL("image/png");

    doc.addImage(imgData, "PNG", 15, 90, 180, 80);

    doc.save("creator-revenue-report.pdf");
}