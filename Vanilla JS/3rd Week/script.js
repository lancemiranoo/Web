document.getElementById('calculateTax').addEventListener('click', () => {
    const income = parseFloat(document.getElementById('income').value) || 0;
    const deductions = parseFloat(document.getElementById('deductions').value) || 0;

    // Check if income is valid
    if (isNaN(income) || income <= 0) {
        document.getElementById('result').innerText = 'Please enter a valid income.';
        return; // Exit the function if income is invalid
    }
        
    // Calculate taxable income
    const taxableIncome = Math.max(0, income - deductions);

    // Calculates the tax
    const calculateTax = (income) => {
        let tax = 0;

        // 10% for income between $10,001 and $40,000
        if (income > 10000) {
            tax = income * 0.1;
        }

        // 20% for income between $40,001 and $100,000
        if (income > 40000) {
            tax = income * 0.2;
        }

        // 30% for income over $100,000
        if (income > 100000) {
            tax = income * 0.3;
        }

        // No tax for income up to $10,000
        return tax;
    };

    // Calculate the tax based on taxable income
    const tax = calculateTax(taxableIncome);

    // Display the calculated tax
    document.getElementById('result').innerText = `Your tax liability is $${tax.toFixed(2)}`;
});

// Set focus on the income input when the page loads
window.onload = () => {
    document.getElementById('income').focus(); 
};

// Clear the input and the result
document.getElementById('reset').addEventListener('click', () => {
   document.getElementById('income').value = " ";
   document.getElementById('deductions').value = " ";
   document.getElementById('result').innerText = " ";
   });