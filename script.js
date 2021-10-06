console.log("А кто это тут у нас F12 нажал?\nПривет всем веб-разработчикам!");

function Validate(textboxID) {
    var str = document.getElementById(textboxID).value;
    str = str.replace(/[A-Za-zА-Яа-яЁё]/, '');
    str = str.replace(/[+*\/\\\{\}\[\]"'!@#$%^&?№:;~,|<>`]/, '');
    if (str.split('.').length > 2)
        str = str.substring(0, str.length - 1);
    if (str.substring(0, 1) !== '-')
        str = str.replace('-', '');
    if ((str.substring(0, 1) === '-') && (str.length > 1) &&
        (str.substring(str.length - 1, str.length)) === '-')
        str = str.substring(0, str.length - 1);
    if (str.substring(0, 2) === '--')
        str = str.replace('--', '-');
    document.getElementById(textboxID).value = str;
}

let Clear = (textboxID) => document.getElementById(textboxID).value = '';

let GetValue = (textbox) => ((textbox.placeholder / 1) + (textbox.value / 1));

function Solve() {
    var textboxA = document.getElementById("textboxA");
    var textboxB = document.getElementById("textboxB");
    var textboxC = document.getElementById("textboxC");
    var div = document.getElementById("results");
    var resultStr;
    var coefA = GetValue(textboxA);
    var coefB = GetValue(textboxB);
    var coefC = GetValue(textboxC);
    resultStr = "<br>Введено квадратное уравнение:<br>";
    resultStr += coefA + "x<sup>2</sup>";
    resultStr += ((coefB < 0) ? " - " : " + ") + Math.abs(coefB) + "x";
    resultStr += ((coefC < 0) ? " - " : " + ") + Math.abs(coefC) + " = 0<br>";
    var discriminant = coefB * coefB - 4 * coefA * coefC;
    if (discriminant > 0) {
        var x1 = (-coefB + Math.sqrt(discriminant)) / (2 * coefA);
        var x2 = (-coefB - Math.sqrt(discriminant)) / (2 * coefA);
        resultStr += "<br>Уравнение имеет два вещественных корня:<br>";
        resultStr += "x<sub>1</sub> = " + x1 + "<br>";
        resultStr += "x<sub>2</sub> = " + x2 + "<br>";
    } else if (discriminant == 0) {
        var x = -coefB / (2 * coefA);
        resultStr += "<br>Уравнение имеет один вещественный корень:<br>";
        resultStr += "x = " + x + "<br>";
    } else if (discriminant < 0) {
        var checkbox = document.getElementById("checkboxComplex");
        if (checkbox.checked) {
            var x = -coefB / (2 * coefA);
            var x1im = Math.sqrt(-discriminant) / (2 * coefA);
            var x2im = -Math.sqrt(-discriminant) / (2 * coefA);
            resultStr += "<br>Уравнение имеет два комплексных корня:<br>";
            resultStr += "x<sub>1</sub> = " + x;
            resultStr += ((x1im < 0) ? " - " : " + ") + Math.abs(x1im) + "i<br>";
            resultStr += "x<sub>2</sub> = " + x;
            resultStr += ((x2im < 0) ? " - " : " + ") + Math.abs(x2im) + "i<br>";
        } else {
            resultStr += "<br>Уравнение не имеет вещественных корней<br>";
        }
    }
    div.innerHTML = "<text>" + resultStr + "</text>";
}