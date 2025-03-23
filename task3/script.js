document.addEventListener("DOMContentLoaded", function() {
    const themeToggle = document.getElementById("theme-toggle");
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });

    // 🎯 AI Insights Simulation
    const insights = [
        "📈 Market is showing strong upward momentum!",
        "📉 Volatility is increasing, expect market shifts.",
        "🔍 RSI indicates an overbought condition.",
        "💡 Moving averages suggest a bullish trend!"
    ];
    document.getElementById("insight-text").innerText = insights[Math.floor(Math.random() * insights.length)];

    // 📊 Chart.js - Real-time Data Chart
    const ctx = document.getElementById("dataChart").getContext("2d");
    let chartData = {
        labels: ["1", "2", "3", "4", "5"],
        datasets: [{
            label: "Stock Price ($)",
            data: [100, 105, 110, 115, 120],
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 2
        }]
    };

    let myChart = new Chart(ctx, {
        type: "line",
        data: chartData,
        options: { responsive: true }
    });

    // 🔄 Live Data Updates
    setInterval(() => {
        let newData = Math.floor(Math.random() * 50) + 80;
        chartData.labels.push(chartData.labels.length + 1);
        chartData.datasets[0].data.push(newData);
        if (chartData.labels.length > 10) {
            chartData.labels.shift();
            chartData.datasets[0].data.shift();
        }
        myChart.update();
    }, 2000);

    // 📂 CSV Export Function
    window.exportCSV = function() {
        let csvContent = "data:text/csv;charset=utf-8,Time,Price\n";
        chartData.labels.forEach((label, index) => {
            csvContent += `${label},${chartData.datasets[0].data[index]}\n`;
        });
        let encodedUri = encodeURI(csvContent);
        let link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "financial_data.csv");
        document.body.appendChild(link);
        link.click();
    };

    // 📄 PDF Export Function
    window.exportPDF = function() {
        let canvas = document.getElementById("dataChart");
        let imgData = canvas.toDataURL("image/png");
        let pdf = new jsPDF();
        pdf.text("Financial Data Chart", 10, 10);
        pdf.addImage(imgData, "PNG", 10, 20, 180, 100);
        pdf.save("financial_data.pdf");
    };

    // 🖱️ Drag & Drop Widgets
    const widgets = document.querySelectorAll(".widget");
    widgets.forEach(widget => {
        widget.addEventListener("dragstart", function(e) {
            e.dataTransfer.setData("text", e.target.id);
        });
    });

    const dashboard = document.querySelector(".widgets");
    dashboard.addEventListener("dragover", function(e) {
        e.preventDefault();
    });

    dashboard.addEventListener("drop", function(e) {
        let draggedWidget = document.getElementById(e.dataTransfer.getData("text"));
        dashboard.appendChild(draggedWidget);
    });
});
