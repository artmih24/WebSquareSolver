console.log("А кто это тут у нас F12 нажал?\nПривет всем веб-разработчикам!");

function Validate(textboxID) {
    var str = document.getElementById(textboxID).value;
    str = str.replace(/[A-Za-zА-Яа-яЁё]/, '');
    str = str.replace(/[+*\/\\\{\}\[\]\(\) _"'!@#$%^&?№:;~,|<>`]/, '');
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
    var resultDiv = document.getElementById("results");
    var resultHTML;
    var coefficientA = GetValue(textboxA);
    var coefficientB = GetValue(textboxB);
    var coefficientC = GetValue(textboxC);
    resultHTML = "<br>Введено квадратное уравнение:<br>";
    resultHTML += coefficientA + "x<sup>2</sup>";
    resultHTML += ((coefficientB < 0) ? " - " : " + ") + Math.abs(coefficientB) + "x";
    resultHTML += ((coefficientC < 0) ? " - " : " + ") + Math.abs(coefficientC) + " = 0<br>";
    var discriminant = coefficientB * coefficientB - 4 * coefficientA * coefficientC;
    if (discriminant > 0) {
        if (coefficientA != 0) {
            var x1 = (-coefficientB + Math.sqrt(discriminant)) / (2 * coefficientA);
            var x2 = (-coefficientB - Math.sqrt(discriminant)) / (2 * coefficientA);
            resultHTML += "<br>Уравнение имеет два вещественных корня:<br>";
            resultHTML += "x<sub>1</sub> = " + x1 + "<br>";
            resultHTML += "x<sub>2</sub> = " + x2 + "<br>";
        } else {
            if (coefficientB != 0) {
                var x = -coefficientC / coefficientB;
                resultHTML += "<br>Уравнение имеет один вещественный корень:<br>";
                resultHTML += "x = " + x + "<br>";
            } else {
                resultHTML += "<br>Коэффициенты A и B равны 0<br>";
                resultHTML += "Уравнение не имеет решений<br>";
            }
        }
    } else if (discriminant == 0) {
        if (coefficientA != 0) {
            var x = -coefficientB / (2 * coefficientA);
            resultHTML += "<br>Уравнение имеет один вещественный корень:<br>";
            resultHTML += "x = " + x + "<br>";
        } else {
            if (coefficientC != 0) {
                resultHTML += "<br>Коэффициенты A и B равны 0<br>";
                resultHTML += "Уравнение не имеет решений<br>";
            } else {
                resultHTML += "<br>Все введенные коэффициенты равны 0<br>";
                resultHTML += "x - любое число<br>";
            }
        }
    } else if (discriminant < 0) {
        var checkbox = document.getElementById("checkboxComplex");
        if (checkbox.checked) {
            if (coefficientA != 0) {
                var x = -coefficientB / (2 * coefficientA);
                var x1im = Math.sqrt(-discriminant) / (2 * coefficientA);
                var x2im = -Math.sqrt(-discriminant) / (2 * coefficientA);
                resultHTML += "<br>Уравнение имеет два комплексных корня:<br>";
                resultHTML += "x<sub>1</sub> = " + ((x != 0) ? x : "");
                resultHTML += ((x1im < 0) ? ((x != 0) ? " - " : "-") : ((x != 0) ? " + " : ""));
                resultHTML += Math.abs(x1im) + "i<br>";
                resultHTML += "x<sub>2</sub> = " + ((x != 0) ? x : "");
                resultHTML += ((x2im < 0) ? ((x != 0) ? " - " : "-") : ((x != 0) ? " + " : ""));
                resultHTML += Math.abs(x2im) + "i<br>";
            } else {
                if (coefficientB != 0) {
                    var x = -coefficientC / coefficientB;
                    resultHTML += "<br>Уравнение имеет один вещественный корень:<br>";
                    resultHTML += "x = " + x + "<br>";
                } else {
                    resultHTML += "<br>Коэффициенты A и B равны 0<br>";
                    resultHTML += "Уравнение не имеет решений<br>";
                }
            }
        } else {
            resultHTML += "<br>Уравнение не имеет вещественных корней<br>";
        }
    }
    resultDiv.innerHTML = "<text>" + resultHTML + "</text><br><br>";
}