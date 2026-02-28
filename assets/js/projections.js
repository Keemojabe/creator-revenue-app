document.getElementById('calculateBtn').addEventListener('click', function() {
    const views = parseFloat(document.getElementById('views').value) || 0;
    const cpm = parseFloat(document.getElementById('cpm').value) || 0;
    const affiliateCtr = parseFloat(document.getElementById('affiliateCtr').value) || 0;
    const conversionRate = parseFloat(document.getElementById('conversionRate').value) || 0;
    const productPrice = parseFloat(document.getElementById('productPrice').value) || 0;
    const brandDeals = parseFloat(document.getElementById('brandDeals').value) || 0;
    const brandRate = parseFloat(document.getElementById('brandRate').value) || 0;
    const growthRate = parseFloat(document.getElementById('growthRate').value) || 0;

    const months = 12;
    let monthViews = views;
    const projection = [];

    for(let i=1; i<=months; i++){
        const adRevenue = (monthViews / 1000) * cpm;
        const affiliateRevenue = monthViews * (affiliateCtr/100) * (conversionRate/100) * productPrice;
        const brandRevenue = brandDeals * brandRate;
        const total = adRevenue + affiliateRevenue + brandRevenue;

        projection.push({
            month: i,
            adRevenue: adRevenue,
            affiliateRevenue: affiliateRevenue,
            brandRevenue: brandRevenue,
            total: total.toFixed(2)
        });

        // Increase views by growth rate
        monthViews *= (1 + growthRate/100);
    }

    // Display numeric results
    let resultsHTML = '<ul>';
    projection.forEach(p => {
        resultsHTML += `<li>Month ${p.month}: Total Revenue $${p.total}</li>`;
    });
    resultsHTML += '</ul>';
    document.getElementById('projectionResults').innerHTML = resultsHTML;

    // Update chart
    updateRevenueChart(projection);
});