// ===========================================
// Name: chartGenerator.js
// Description: Function to generate charts
// ===========================================

function drawChart() {
    let type = document.getElementById("chartType").value;
    let title = document.getElementById("chartTitle").value;
    let ylabel;
    let ticks = [0];
    let data = [["Label", "Value"]];
    let options;

    // Prepare chart data
    if (type === "pie") {
        // Get number of sectors
        let sectors = parseInt(document.getElementById("sectors").value);
        let sectorSum = 0;

        // Prepare data
        for (let i = 0; i < sectors - 1; i++) {
            let label = document.getElementById(`sectorLabel${i}`).value;
            let value = parseFloat(document.getElementById(`sectorValue${i}`).value) || 0;
            data.push([label, value]);
            sectorSum += value;
        }

        let totalValue = document.getElementById('totalValueID').value;
        let lastLabel = document.getElementById(`sectorLabel${sectors - 1}`).value;
        let lastValue = Math.max(0, totalValue - sectorSum);
        data.push([lastLabel, lastValue]);

    } else { // type === "bar"
        // Update data array to cater bar configuration [Label, Value, Color, Annotation]
        data = [["Label", "Value", { role: 'style' }, { role: 'annotation' }]];

        // Get number of bars
        let bars = parseInt(document.getElementById("bars").value);
        let maxValue = 0;
        ylabel = document.getElementById("ylabel").value;

        // Prepare data
        const barChartColors = ["#3366CC", "#DC3912", "#FF9900", "#109618", "#990099", "#0099C6"];
        for (let i = 0; i < bars; i++) {
            let label = document.getElementById(`barLabel${i}`).value;
            let value = Math.min(parseFloat(document.getElementById(`barValue${i}`).value) || 0, 400);
            data.push([label, value, barChartColors[i], value]);
            maxValue = Math.max(maxValue, value); // Get maxValue for ticks
        }

        // Set default interval to 10 if empty
        var userInterval = parseInt(document.getElementById('incValues').value) || 10;

        // Generate gridline values dynamically (ticks) to set minValue and maxValue programatically
        let loopStop = Math.min(maxValue + userInterval, 400);  // Limit loopstop to 400
        for (var i = userInterval; i <= loopStop; i += userInterval) {
            ticks.push(i);
        }
        
    }

    // Prepare chart data
    let chartData = google.visualization.arrayToDataTable(data);

    // Prepare chart configuration
    if (type === "pie") {
        options = {
            legend: { 
                position: "right", 
                textStyle: { fontSize: 14 },
                alignment: "center"
            },
            chartArea: { 
                left: "15%",
                width: "100%",
                height: "100%" 
            },  
            width: "720", // setting the container to 763
            height: "720" // makes pie diameter exactly 400 (within 300-500px)
        };
    } else { // type === "bar"
        options = {
            legend: { position: "none" },
            vAxis: {
                gridlines: { color: '#ccc' }, // Enables horizontal gridlines
                ticks: ticks, // minValue and maxValue inside
                title: ylabel,  // Label for the y-axis
            },
            height: 500,
        };
    }

    // Prepare the chart type
    let chart = type === "pie"
        ? new google.visualization.PieChart(document.getElementById("chartContainer"))
        : new google.visualization.ColumnChart(document.getElementById("chartContainer"));

    // Draw the chart
    chart.draw(chartData, options);

    // Add chart title
    document.getElementById("userTitle").innerHTML = title;

    // Show chart container
    document.getElementsByClassName("container")[0].style.visibility = "visible";

    // If pie, wait for chart to render, then replace legend <circle> with <rect>
    if (type === "pie") {
        setTimeout(() => { replaceCirclesWithRects(); }, 500);
    }
}

