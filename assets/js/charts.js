let revenueChartInstance;

function renderChart(projections) {

    const isProUser = localStorage.getItem("isProUser") === "true";

    if (!isProUser) {
        alert("Charts are available in Pro mode.");
        return;
    }

    const ctx = document
        .getElementById("revenueChart")
        .getContext("2d");

    if (revenueChartInstance) {
        revenueChartInstance.destroy();
    }

    revenueChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: projections.map(p => `Month ${p.month}`),
            datasets: [{
                label: "Projected Revenue",
                data: projections.map(p => p.totalRevenue),
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    labels: { color: "#f1f5f9" }
                }
            },
            scales: {
                x: {
                    ticks: { color: "#f1f5f9" }
                },
                y: {
                    ticks: { color: "#f1f5f9" }
                }
            }
        }
    });
}