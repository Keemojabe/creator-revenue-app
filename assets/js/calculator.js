document.getElementById('calculateBtn').addEventListener('click', function() {
    // Get inputs
    const views = parseFloat(document.getElementById('views').value) || 0;
    const cpm = parseFloat(document.getElementById('cpm').value) || 0;
    const affiliateCtr = parseFloat(document.getElementById('affiliateCtr').value) || 0;
    const conversionRate = parseFloat(document.getElementById('conversionRate').value) || 0;
    const productPrice = parseFloat(document.getElementById('productPrice').value) || 0;
    const brandDeals = parseFloat(document.getElementById('brandDeals').value) || 0;
    const brandRate = parseFloat(document.getElementById('brandRate').value) || 0;

    // Calculate revenues
    const adRevenue = (views / 1000) * cpm;
    const affiliateRevenue = views * (affiliateCtr/100) * (conversionRate/100) * productPrice;
    const brandRevenue = brandDeals * brandRate;

    const totalRevenue = adRevenue + affiliateRevenue + brandRevenue;

    // Update results
    document.getElementById('adRevenue').textContent = adRevenue.toFixed(2);
    document.getElementById('affiliateRevenue').textContent = affiliateRevenue.toFixed(2);
    document.getElementById('brandRevenue').textContent = brandRevenue.toFixed(2);
    animateValue(document.getElementById('totalRevenue'), 0, totalRevenue, 1000);
    animateValue(document.getElementById('adRevenue'), 0, adRevenue, 1000);
    animateValue(document.getElementById('affiliateRevenue'), 0, affiliateRevenue, 1000);
    animateValue(document.getElementById('brandRevenue'), 0, brandRevenue, 1000);
});