let revenueChart;
function updateRevenueChart(projection){
    const ctx = document.getElementById('revenueChart').getContext('2d');

    const labels = projection.map(p => `Month ${p.month}`);
    const totals = projection.map(p => parseFloat(p.total));

    if(revenueChart) revenueChart.destroy();

    revenueChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Total Revenue ($)',
                data: totals,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true
                }
            }
        }
    });
}