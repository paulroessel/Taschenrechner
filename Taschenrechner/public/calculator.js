let history = [];
let calculationDone = false; 

function appendToDisplay(value) {
    if (calculationDone) {
        document.getElementById('display').value = '';
        calculationDone = false;
    }
    document.getElementById('display').value += value;
}

function clearDisplay() {
    document.getElementById('display').value = '';
    calculationDone = false;
}

function calculate() {
    try {
        const display = document.getElementById('display');
        const result = eval(display.value);
        history.push(`${display.value} = ${result}`);
        if (history.length > 10) history.shift(); 
        display.value = result;
        calculationDone = true; 
    } catch (e) {
        alert('Fehlerhafte Eingabe!');
        clearDisplay();
    }
}

function viewHistory() {
    const historyDiv = document.getElementById('history');
    historyDiv.innerHTML = ''; 
    history.forEach(entry => {
        const p = document.createElement("p");
        p.innerText = entry;
        historyDiv.appendChild(p);
    });
}




