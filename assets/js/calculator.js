document.getElementById('calculateBtn').addEventListener('click', function () {

    const views = parseFloat(document.getElementById('views').value) || 0;
    const cpm = parseFloat(document.getElementById('cpm').value) || 0;

    const affiliateCtr = parseFloat(document.getElementById('affiliateCtr').value) || 0;
    const conversionRate = parseFloat(document.getElementById('conversionRate').value) || 0;
    const productPrice = parseFloat(document.getElementById('productPrice').value) || 0;

    const brandDeals = parseFloat(document.getElementById('brandDeals').value) || 0;
    const brandFee = parseFloat(document.getElementById('brandFee').value) || 0;

    const growthRate =
        (parseFloat(document.getElementById('growthRate').value) || 0) / 100;

    // Current month revenue (Month 1)
    const adRevenue = (views / 1000) * cpm;
    const affiliateRevenue =
        views * (affiliateCtr / 100) *
        (conversionRate / 100) *
        productPrice;

    const sponsorshipRevenue = brandDeals * brandFee;

    const totalRevenue =
        adRevenue +
        affiliateRevenue +
        sponsorshipRevenue;

    // Update main revenue display
    document.getElementById('adRevenue').textContent = adRevenue.toFixed(2);
    document.getElementById('affiliateRevenue').textContent = affiliateRevenue.toFixed(2);
    document.getElementById('brandRevenue').textContent = sponsorshipRevenue.toFixed(2);
    document.getElementById('totalRevenue').textContent = totalRevenue.toFixed(2);

    // Generate structured projection
    const projections = generateProjection({
        views,
        cpm,
        affiliateCtr,
        conversionRate,
        productPrice,
        brandDeals,
        brandFee,
        growthRate
    });

    renderProjectionList(projections);
    renderChart(projections);
});


function renderProjectionList(projections) {

    let resultsHTML = "<ul>";

    projections.forEach(p => {
        resultsHTML += `
            <li>
                Month ${p.month}:
                $${p.totalRevenue.toFixed(2)}
            </li>
        `;
    });

    resultsHTML += "</ul>";

    document.getElementById("projectionResults").innerHTML = resultsHTML;
}