// ===========================================
// Name: utilsChart.js
// Description: Contains the chart functions
// ===========================================


// Functions for Bar Chart ===================================================================
function generateBarInputs(barsCount, container) {
    container.innerHTML = ""; // Clear previous inputs

    // Field for incremental values
    let incValues = createNumberInput(`incValues`, `Incremental values of gridlines (10-100)`);
    incValues.setAttribute("min", "10");
    incValues.setAttribute("max", "100");
    container.appendChild(incValues);

    // Append X number of inputs
    for (let i = 0; i < barsCount; i++) {
        let labelInput = createTextInput(`barLabel${i}`, `Label for Bar ${i + 1}`);
        let valueInput = createNumberInput(`barValue${i}`, `Value for Bar ${i + 1} (Max 400)`, 400);
        container.appendChild(labelInput);
        container.appendChild(valueInput);
    }
    
    // Field for y-axis label
    let ylabel = createTextInput(`ylabel`, `Label for y-axis`);
    container.appendChild(ylabel);
}

// Functions for Pie Chart ===================================================================
function generateSectorInputs(sectorsCount, container) {
    if (sectorsCount < 2 || sectorsCount > 6) {
        alert("Please enter a number between 2 and 6.");
        return;
    }

    container.innerHTML = ""; // Clear previous inputs

    // Field for total value of pie chart
    let totalValueInput = createNumberInput(`totalValueID`, `Total value of pie chart`);
    container.appendChild(totalValueInput);

    // listeners for the totalvalue
    totalValueInput.addEventListener("input", () => {
        sectorSum = calculateSectorSum(sectorsCount - 1);
        updateLastSectorValue(sectorsCount, sectorSum, totalValueInput);
    });

    let sectorSum = 0;
    for (let i = 0; i < sectorsCount - 1; i++) {
        let labelInput = createTextInput(`sectorLabel${i}`, `Label for Sector ${i + 1}`);
        let valueInput = createNumberInput(`sectorValue${i}`, `Value for Sector ${i + 1}`, 0);

        // Add listeners for the input sectors
        valueInput.addEventListener("input", () => {
            sectorSum = calculateSectorSum(sectorsCount - 1);
            updateLastSectorValue(sectorSum, totalValueInput);
        });

        container.appendChild(labelInput);
        container.appendChild(valueInput);
    }

    let lastLabelInput = createTextInput(`sectorLabel${sectorsCount - 1}`, "Label for Last Sector");
    container.appendChild(lastLabelInput);

    let lastValueDisplay = createNumberInput(`lastSectorValue`, "Value for Last Sector");
    lastValueDisplay.setAttribute("disabled", "true");
    container.appendChild(lastValueDisplay);

    // Calculates the Sum of the Sectors
    function calculateSectorSum(sectorsCount) {
        let sum = 0;
        for (let i = 0; i < sectorsCount; i++) {
            let value = parseFloat(document.getElementById(`sectorValue${i}`).value) || 0;
            sum += value;
        }
        return sum;
    }
}

function updateLastSectorValue(sectorSum, totalValueInput) {
    let remaining = totalValueInput.value - sectorSum;
    let lastValueDisplay = document.getElementById(`lastSectorValue`);
    lastValueDisplay.value = `${Math.max(0, remaining)}`;
}

function replaceCirclesWithRects() {
    const circles = document.querySelectorAll("#chartContainer svg circle"); // Select all circles

    circles.forEach((circle) => {
      const cx = circle.getAttribute("cx"); // X position
      const cy = circle.getAttribute("cy"); // Y position
      const r = circle.getAttribute("r");   // Radius

      // Create a <rect> element
      const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      rect.setAttribute("x", cx - r);
      rect.setAttribute("y", cy - r);
      rect.setAttribute("width", r * 2);
      rect.setAttribute("height", r * 2);
      rect.setAttribute("fill", circle.getAttribute("fill")); // Preserve color

      circle.parentNode.replaceChild(rect, circle); // Replace <circle> with <rect>
    });
}
