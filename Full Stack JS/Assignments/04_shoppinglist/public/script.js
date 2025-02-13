google.charts.load("current", { packages: ["corechart"] });

document.getElementById("chartType").addEventListener("change", generateForm);

document.getElementById("chartForm").addEventListener("submit", function (event) {
    event.preventDefault();
    drawChart();
});

function generateForm() {
    let type = document.getElementById("chartType").value;
    let chartOptions = document.getElementById("chartOptions");
    chartOptions.innerHTML = ""; // Clear previous form inputs

    let title = document.createElement("input");
    title.setAttribute("type", "text");
    title.setAttribute("placeholder", "Chart Title");
    title.setAttribute("id", "chartTitle");
    chartOptions.appendChild(title);

    if (type === "pie") {
        chartOptions.appendChild(document.createTextNode(" Number of Sectors (2-6): "));
        let sectors = document.createElement("input");
        sectors.setAttribute("type", "number");
        sectors.setAttribute("id", "sectors");
        sectors.setAttribute("min", "2");
        sectors.setAttribute("max", "6");
        chartOptions.appendChild(sectors);

        // Create fields for pie chart sectors
        let sectorsContainer = document.createElement("div");
        sectorsContainer.setAttribute("id", "sectorsContainer");
        chartOptions.appendChild(sectorsContainer);

        sectors.addEventListener("input", () => {
            generateSectorInputs(sectors.value, sectorsContainer);
        });
    } else if (type === "bar") {
        chartOptions.appendChild(document.createTextNode(" Number of Bars (2-6): "));
        let bars = document.createElement("input");
        bars.setAttribute("type", "number");
        bars.setAttribute("id", "bars");
        bars.setAttribute("min", "2");
        bars.setAttribute("max", "6");
        chartOptions.appendChild(bars);

        // Create fields for bar chart bars
        let barsContainer = document.createElement("div");
        barsContainer.setAttribute("id", "barsContainer");
        chartOptions.appendChild(barsContainer);

        bars.addEventListener("input", () => {
            generateBarInputs(bars.value, barsContainer);
        });
    }
}

function generateSectorInputs(sectorsCount, container) {
    container.innerHTML = ""; // Clear previous inputs
    for (let i = 0; i < sectorsCount - 1; i++) { // Only ask for the first sector's label and value
        let labelInput = document.createElement("input");
        labelInput.setAttribute("type", "text");
        labelInput.setAttribute("placeholder", `Label for Sector ${i + 1}`);
        labelInput.setAttribute("id", `sectorLabel${i}`);
        container.appendChild(labelInput);

        let valueInput = document.createElement("input");
        valueInput.setAttribute("type", "number");
        valueInput.setAttribute("placeholder", `Value for Sector ${i + 1}`);
        valueInput.setAttribute("id", `sectorValue${i}`);
        valueInput.setAttribute("min", "0");
        container.appendChild(valueInput);
    }

    // Only ask for the last sector's label
    let lastLabelInput = document.createElement("input");
    lastLabelInput.setAttribute("type", "text");
    lastLabelInput.setAttribute("placeholder", "Label for Last Sector");
    lastLabelInput.setAttribute("id", `sectorLabel${sectorsCount - 1}`);
    container.appendChild(lastLabelInput);
}

function generateBarInputs(barsCount, container) {
    container.innerHTML = ""; // Clear previous inputs
    for (let i = 0; i < barsCount; i++) {
        let labelInput = document.createElement("input");
        labelInput.setAttribute("type", "text");
        labelInput.setAttribute("placeholder", `Label for Bar ${i + 1}`);
        labelInput.setAttribute("id", `barLabel${i}`);
        container.appendChild(labelInput);

        let valueInput = document.createElement("input");
        valueInput.setAttribute("type", "number");
        valueInput.setAttribute("placeholder", `Value for Bar ${i + 1} (Max 400)`);
        valueInput.setAttribute("id", `barValue${i}`);
        valueInput.setAttribute("min", "0");
        valueInput.setAttribute("max", "400");
        container.appendChild(valueInput);
    }
}

function drawChart() {
    let type = document.getElementById("chartType").value;
    let title = document.getElementById("chartTitle").value;
    let data = [["Label", "Value"]];
    let totalValue = 0; // Initialize total value

    if (type === "pie") {
        let sectors = parseInt(document.getElementById("sectors").value);
        let sectorSum = 0;

        // Get sector values and labels
        for (let i = 0; i < sectors - 1; i++) {
            let label = document.getElementById(`sectorLabel${i}`).value;
            let value = parseFloat(document.getElementById(`sectorValue${i}`).value) || 0;
            data.push([label, value]);
            sectorSum += value;
        }

        let lastLabel = document.getElementById(`sectorLabel${sectors - 1}`).value;
        let lastValue = 100 - sectorSum; // Calculate the last sector's value
        data.push([lastLabel, lastValue]);
        totalValue = sectorSum + lastValue; // Update total value
    } else if (type === "bar") {
        let bars = parseInt(document.getElementById("bars").value);
        for (let i = 0; i < bars; i++) {
            let label = document.getElementById(`barLabel${i}`).value;
            let value = Math.min(parseFloat(document.getElementById(`barValue${i}`).value) || 0, 400);
            data.push([label, value]);
            totalValue += value; // Update total value for bar chart
        }
    }

    let chartData = google.visualization.arrayToDataTable(data);
    let options = {
        title: title,
        titleTextStyle: {
            fontSize: 18,
            bold: true,
            color: "#333",
            alignment: "center"
        },
        legend: {
            position: 'right',
            alignment: 'center',
            maxLines: 1,
            textStyle: {
                fontSize: 12
            }
        }
    };

    let chart;
    let chartContainer = document.getElementById("chartContainer");
    chartContainer.innerHTML = "";

    if (type === "pie") {
        chart = new google.visualization.PieChart(chartContainer);
    } else {
        chart = new google.visualization.ColumnChart(chartContainer);
    }
    chart.draw(chartData, options);

    // Display total value
    displayTotalValue(totalValue);
}

function displayTotalValue(total) {
    let totalContainer = document.getElementById("totalValueContainer");
    totalContainer.innerHTML = `<strong>Total Value of Sectors: ${total}</strong>`;
}