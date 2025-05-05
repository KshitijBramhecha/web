const number1 = document.getElementById("num1") as HTMLInputElement;
const number2 = document.getElementById("num2") as HTMLInputElement;
const printResult = document.getElementById("result") as HTMLOutputElement;

function calculate(operation: string) {
    const a = parseFloat(number1.value);
    const b = parseFloat(number2.value);
    let result: number;

    switch (operation) {
        case "Add":
            result = a + b;
            break;
        case "Sub":
            result = a - b;
            break;
        case "Mult":
            result = a * b;
            break;
        case "Divide":
            result = b !== 0 ? a / b : NaN;
            break;
        default:
            result = NaN;
    }

    printResult.textContent = isNaN(result) ? "Invalid input" : result.toString();
}

["Add", "Sub", "Mult", "Divide"].forEach(op => {
    const btn = document.getElementById(op) as HTMLButtonElement;
    btn.addEventListener("click", () => calculate(op));
});
