// Pro Access Flag
const isProUser = localStorage.getItem("isProUser") === "true";

function generateProjection(data) {

    const months = isProUser ? 12 : 3;

    let monthViews = data.views;
    const results = [];

    for (let i = 1; i <= months; i++) {

        const adRevenue =
            (monthViews / 1000) * data.cpm;

        const affiliateRevenue =
            monthViews *
            (data.affiliateCtr / 100) *
            (data.conversionRate / 100) *
            data.productPrice;

        const sponsorshipRevenue =
            data.brandDeals * data.brandFee;

        const totalRevenue =
            adRevenue +
            affiliateRevenue +
            sponsorshipRevenue;

        results.push({
            month: i,
            views: monthViews,
            adRevenue,
            affiliateRevenue,
            sponsorshipRevenue,
            totalRevenue
        });

        // Grow views for next month
        monthViews *= (1 + data.growthRate);
    }

    if (!isProUser) {
        alert("Upgrade to Pro to unlock full 12-month forecasting.");
    }

    return results;
}