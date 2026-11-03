const display = document.getElementById('display');

function appendValue(val) {
    if (display.value === '0' && val !== '.') {
        display.value = val;
    } else {
        display.value += val;
    }
}

function clearDisplay() {
    display.value = '0';
}

function deleteLast() {
    if (display.value.length > 1) {
        display.value = display.value.slice(0, -1);
    } else {
        display.value = '0';
    }
}

function calculateResult() {
    try {
        let expression = display.value;
        if (expression === '') return;
        let result = eval(expression);
        if (result % 1 !== 0) {
            result = parseFloat(result.toFixed(4));
        }
        display.value = result;
    } catch (error) {
        display.value = 'Error';
    }
}