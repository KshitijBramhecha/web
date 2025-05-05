var number1 = document.getElementById("num1");
var number2 = document.getElementById("num2");
var printResult = document.getElementById("result");
function calculate(operation) {
    var a = parseFloat(number1.value);
    var b = parseFloat(number2.value);
    var result;
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
["Add", "Sub", "Mult", "Divide"].forEach(function (op) {
    var btn = document.getElementById(op);
    btn.addEventListener("click", function () { return calculate(op); });
});
