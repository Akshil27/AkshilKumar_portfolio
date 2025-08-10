// Wait for the DOM to load before running scripts
document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('metric-chart').getContext('2d');
    let currentChart;

    // Define illustrative datasets for each metric
    const chartData = {
        inventory: {
            type: 'line',
            title: 'Inventory Forecast vs. Actual',
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [
                {
                    label: 'Actual Demand',
                    data: [520, 540, 510, 560, 570, 590],
                    borderColor: '#005da6',
                    backgroundColor: 'rgba(0, 93, 166, 0.1)',
                    tension: 0.3,
                },
                {
                    label: 'Forecast Demand',
                    data: [500, 520, 530, 550, 565, 580],
                    borderColor: '#e8b006',
                    backgroundColor: 'rgba(232, 176, 6, 0.1)',
                    tension: 0.3,
                }
            ]
        },
        orders: {
            type: 'line',
            title: 'Order Fulfilment & Stockout Rate',
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [
                {
                    label: 'On‑time Delivery (%)',
                    data: [80, 82, 85, 87, 89, 92],
                    borderColor: '#005da6',
                    backgroundColor: 'rgba(0, 93, 166, 0.1)',
                    tension: 0.3,
                },
                {
                    label: 'Stockout Rate (%)',
                    data: [15, 14, 12, 11, 9, 8],
                    borderColor: '#e8b006',
                    backgroundColor: 'rgba(232, 176, 6, 0.1)',
                    tension: 0.3,
                }
            ]
        },
        risk: {
            type: 'bar',
            title: 'Financial Risk Exposure',
            labels: ['Credit Risk', 'Operational Risk', 'Market Risk'],
            datasets: [
                {
                    label: 'Risk Exposure ($K)',
                    data: [120, 180, 80],
                    backgroundColor: ['#005da6', '#e8b006', '#003366'],
                }
            ]
        }
    };

    /**
     * Render a new chart based on the selected metric.
     * @param {string} metric Key of the dataset to display
     */
    function renderChart(metric) {
        const data = chartData[metric];
        const config = {
            type: data.type,
            data: {
                labels: data.labels,
                datasets: data.datasets,
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                    title: {
                        display: true,
                        text: data.title,
                        padding: {
                            top: 10,
                            bottom: 20
                        },
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        };
        // Destroy any existing chart before creating a new one
        if (currentChart) {
            currentChart.destroy();
        }
        currentChart = new Chart(ctx, config);
    }

    // Initialize with the default metric
    renderChart('inventory');

    // Update the chart when a new metric is selected
    const metricSelect = document.getElementById('metric-select');
    metricSelect.addEventListener('change', (e) => {
        renderChart(e.target.value);
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('.navbar a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const section = document.querySelector(targetId);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ----------------------------
    // Prosacco directive charts
    // These charts summarise key insights from the Prosacco directive project.  Values were
    // aggregated from the provided Excel files (forecasted sales, initial inventory and
    // customer reports).
    const forecastLabels = ['Week 40','Week 41','Week 42','Week 43','Week 44','Week 45','Week 46','Week 47','Week 48'];
    const forecastData = [14052, 19696, 19214, 13904, 13820, 16456, 22604, 14172, 20826];
    const inventoryLabels = ['FP2020','FP3055','HB0156','HB1016','HT1045','HT1064','HT2054','OB1265','OF1060','OF2035','OP8025','OY2545'];
    const inventoryData = [4063, 2032, 148, 4974, 121, 138, 187, 130, 32, 185, 2073, 4250];
    const customerLabels = ['Customer2','Customer5','Customer1','Customer12','Customer9'];
    const customerData = [304000, 203875, 185875, 20875, 9375];

    // Render Forecasted Sales per Week chart
    const forecastCtx = document.getElementById('forecast-chart').getContext('2d');
    new Chart(forecastCtx, {
        type: 'line',
        data: {
            labels: forecastLabels,
            datasets: [
                {
                    label: 'Forecasted Sales (units)',
                    data: forecastData,
                    borderColor: '#005da6',
                    backgroundColor: 'rgba(0, 93, 166, 0.1)',
                    tension: 0.3
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom' },
                title: {
                    display: true,
                    text: 'Forecasted Sales by Week',
                    font: { size: 14, weight: 'bold' }
                }
            },
            scales: {
                y: { beginAtZero: true }
            }
        }
    });

    // Render Initial Inventory chart
    const inventoryCtx = document.getElementById('inventory-chart').getContext('2d');
    new Chart(inventoryCtx, {
        type: 'bar',
        data: {
            labels: inventoryLabels,
            datasets: [
                {
                    label: 'Available Quantity (week 39)',
                    data: inventoryData,
                    backgroundColor: inventoryLabels.map((_, idx) => idx % 2 === 0 ? '#003366' : '#005da6'),
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                title: {
                    display: true,
                    text: 'Initial Inventory by SKU (Week 39)',
                    font: { size: 14, weight: 'bold' }
                }
            },
            scales: {
                y: { beginAtZero: true }
            }
        }
    });

    // Render Top Customers chart
    const customerCtx = document.getElementById('customer-chart').getContext('2d');
    new Chart(customerCtx, {
        type: 'bar',
        data: {
            labels: customerLabels,
            datasets: [
                {
                    label: 'Sales (USD)',
                    data: customerData,
                    backgroundColor: ['#003366','#005da6','#e8b006','#0073e6','#ffd966'],
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                title: {
                    display: true,
                    text: 'Top Customers by Sales',
                    font: { size: 14, weight: 'bold' }
                }
            },
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
});