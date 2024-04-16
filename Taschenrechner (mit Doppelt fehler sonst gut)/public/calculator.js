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
        history.unshift(`${display.value} = ${result}`);  // Ändere push zu unshift
        if (history.length > 10) history.pop();  // Ändere shift zu pop
        display.value = result;
        calculationDone = true;
        viewHistory();  // Automatischer Aufruf von viewHistory
    } catch (e) {
        alert('Fehlerhafte Eingabe!');
        clearDisplay();
    }
}

function viewHistory() {
    const historyDiv = document.getElementById('history');
    historyDiv.innerHTML = ''; // Leere den Verlauf, bevor neue Einträge hinzugefügt werden.
    history.forEach(entry => {
        const p = document.createElement("p");
        p.innerText = entry;
        p.addEventListener('click', function() {
            const equation = entry.split(' = ')[0]; // Extrahiere die Gleichung vor dem Gleichheitszeichen.
            document.getElementById('display').value = equation;
            calculationDone = false; // Setze den Zustand zurück, um weitere Eingaben zu ermöglichen.
        });
        historyDiv.append(p); // Füge den neuen Eintrag oben in der Liste hinzu.
    });
}

document.addEventListener('keydown', function(event) {
    if (event.key >= '0' && event.key <= '9') {
        appendToDisplay(event.key);
    } else if (event.key === '/' || event.key === '*' || event.key === '-' || event.key === '+') {
        appendToDisplay(event.key);
    } else if (event.key === 'Enter' || event.key === '=') {
        calculate();
        event.preventDefault();
    } else if (event.key === 'Escape' || event.key === 'Backspace') {
        clearDisplay();
    }
});
