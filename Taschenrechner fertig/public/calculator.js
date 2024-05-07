document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    fetchHistory();
});

document.addEventListener('keydown', function(event) {
    const display = document.getElementById('display');
    // Focus on the display when a relevant key is pressed but do not append
    if (event.key >= '0' && event.key <= '9' || "+-/*".includes(event.key) || event.key === '.') {
        display.focus();
        event.preventDefault(); // Prevent default to handle the key input manually
        appendToDisplay(event.key);
    }

    if (document.activeElement === display) {
        switch(event.key) {
            case 'Enter':
            case '=':
                calculate();
                event.preventDefault(); // Stop form submission
                break;
            case 'Escape':
                clearDisplay();
                break;
            case 'Backspace':
                deleteLastDigit();
                event.preventDefault(); // Prevent default backspace behavior
                break;
        }
    }
});

function calculate() {
    const display = document.getElementById('display');
    const expression = display.value;
    try {
        const result = eval(expression);
        display.value = result;
        postCalculation(expression, result);
        fetchHistory();
        calculationDone = true;  // Set flag to true when calculation is done
    } catch (e) {
        console.error('Invalid input! Error:', e.message);
        alert('Invalid input!');
        display.value = '';
    }
}

function postCalculation(expression, result) {
    fetch('/save-calculation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ expression, result }),
    })
    .then(response => response.json())
    .then(data => console.log('Calculation posted:', data))
    .catch(error => console.error('Error saving calculation:', error));
}

function fetchHistory() {
    fetch('/get-history')
    .then(response => response.json())
    .then(data => {
        const historyDiv = document.getElementById('history');
        historyDiv.innerHTML = ''; // Clear current history
        data.forEach(entry => {
            const p = document.createElement('p');
            p.innerText = `${entry.expression} = ${entry.result}`;
            historyDiv.appendChild(p);
        });
        console.log('History updated:', data);
    })
    .catch(error => console.error('Error fetching history:', error));
}

let calculationDone = false; // Flag to check if the last action was a calculation

function appendToDisplay(value) {
    const display = document.getElementById('display');
    if (calculationDone) {
        display.value = '';
        calculationDone = false;
    }
    display.value += value;
}

function clearDisplay() {
    document.getElementById('display').value = '';
    calculationDone = false; // Reset flag on clear
}

function deleteLastDigit() {
    const display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
}
