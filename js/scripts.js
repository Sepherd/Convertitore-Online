/****VARIABILI****/
let tabValue = 1;
let toConvert;
let converted;
let valueIn;
let valueOut;
let lunghezza = [
    ["Chilometro", "Metro", "Centimetro", "Millimetro", "Miglio", "Iarda", "Piede", "Pollice", "Miglio Nautico"],
    ["km", "m", "cm", "mm", "mi", "yd", "ft", "in", "nmi"]
]
let massa = [
    ["Tonnellata", "Chilogrammo", "Grammo", "Milligrammo", "Libbra", "Oncia"],
    ["t", "kg", "g", "mg", "lb", "oz."]
];
let temperatura = [
    ["Celsius", "Fahrenheit", "Kelvin"],
    ["°C", "°F", "K"]
];
let tabellaLunghezza = [
    [1, 1000, 1e+5, 1e+6, 1/1.609, 1093.61, 3280.84, 39370.1, 1/1.852],
    [1/1000, 1, 100, 1000, 1/1609, 1.09361, 3.28084, 39.3701, 1/1852],
    [1e-5, 1/100, 1, 10, 6.2137e-6, 1/91.44, 1/30.48, 1/2.54, 5,3996e-6],
    [1e-6, 1/1000, 1/10, 1, 6.2137e-7, 1/914.4, 1/304.8, 1/25.4, 5,3996e-7],
    [1.609, 1609.34, 160934, 1,609e+6, 1, 1760, 5280, 63360, 1/1.151],
    [1/1093.61, 1/1.09361, 91.44, 914.4, 1/1760, 1, 3, 36, 1/2025],
    [1/3281, 1/3.281, 30.48, 304.8, 1/5280, 1/3, 1, 12, 1/6076],
    [2,54e-5, 1/39.17, 2.54, 25.4, 1.5783e-5, 1/36, 1/12, 1, 1,3715e-5],
    [1.852, 1852, 185200, 1.852e+6, 1.15078, 2025.37, 6076.12, 72913.4, 1]
];
let tabellaMassa = [
    [1, 1000, 1e+6, 1e+9, 2204.62, 35274],
    [1/1000, 1, 1000, 1e+6, 2.20462, 35.274],
    [1e-6, 1/1000, 1, 1000, 1/454, 1/28.35],
    [1e-9, 1e-6, 1/1000, 1, 1/453592, 1/28350],
    [1/2205, 1/2.205, 454, 453592, 1, 16],
    [1/35274, 1/35.274, 28.35, 28350,  1/16, 1]
];
/*
let tabellaTemperatura = [
    [1, (9/5) + 32, (valueIn + 273.15)],
    [((valueIn - 32) * 5/9), 1, ((valueIn - 32) * 5/9 + 273.15)],
    [(valueIn - 273.15), ((valueIn - 273.15) * 9/5 + 32), 1]
];
*/
/****AVVIO****/
tipoConversione();

/****ACTIVE TAB****/

$("li").click(function() {
    $("li").removeClass("active");
    $(this).addClass("active");
    tabValue = $(this).val();
    $("#unitaIn").html("");
    $("#unitaOut").html("");
    tipoConversione();
});

/****MISURE SELEZIONATE****/

function tipoConversione() {
    switch (tabValue) {
        case 1:
            for (let i = 0; i < lunghezza[0].length; i++) {               
                $("#unitaIn").append("<option value = " + i + ">" + lunghezza[0][i] + "</option>");
                $("#unitaOut").append("<option value = " + i + ">" + lunghezza[0][i] + "</option>");                
            };            
            break;
        case 2:
            for (let i = 0; i < massa[0].length; i++) {               
                $("#unitaIn").append("<option value = " + i + ">" + massa[0][i] + "</option>");
                $("#unitaOut").append("<option value = " + i + ">" + massa[0][i] + "</option>");                
            };            
            break;
        case 3:
            for (let i = 0; i < temperatura[0].length; i++) {               
                $("#unitaIn").append("<option value = " + i + ">" + temperatura[0][i] + "</option>");
                $("#unitaOut").append("<option value = " + i + ">" + temperatura[0][i] + "</option>");                
            };            
            break;
        default:
            console.log("Qualcosa è andato storto. Aggiorna la pagina per provare a risolvere");
    }
    $("#unitaOut").val(1);
    toConvert = $("#unitaIn").val();
    converted = $("#unitaOut").val();
};


$("#unitaIn").change(function() {
    toConvert = $(this).val();
    if (toConvert == converted) {
         converted++;
        $("#unitaOut").val(converted);
    };
    if (tabValue == 1 && converted == lunghezza[0].length || tabValue == 2 && converted == massa[0].length || tabValue == 3 && converted == temperatura[0].length) {
        converted = 0;
        $("#unitaOut").val(converted);
    };
});

$("#unitaOut").change(function() {
    converted = $(this).val();
    if (converted == toConvert) {
        toConvert++
        $("#unitaIn").val(toConvert);
    }
    if (tabValue == 1 && toConvert == lunghezza[0].length || tabValue == 2 && toConvert == massa[0].length || tabValue == 3 && toConvert == temperatura[0].length) {
        toConvert = 0;
        $("#unitaIn").val(toConvert);
    }
});

/****CONVERSIONE****/

$("#converti").click(function(){
    if ($("#valueIn").val() != "") {
    conversione(valueIn, valueOut);
    };
});

$("#valueIn").keypress(function(event) {
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        //Il tasto INVIO ha ASCII uguale a 13
        conversione(valueIn, valueOut);
    }
});

/****RESET E COPIA****/

new ClipboardJS('#copia');

$("#reset").click(function(){
    $("#valori").html("");
    $("#valueIn").val("");
    $("#valueOut").val("");
});

/****FUNZIONE CONVERSIONE****/

function conversione(input, output) {
    input = $("#valueIn").val();
    if (tabValue == 1) {
        output = input * tabellaLunghezza[toConvert][converted];
        $("#valueOut").val(output);
        $("#valori").append("<p>" + input + " " + lunghezza[1][toConvert] + " = " + output + " " + lunghezza[1][converted] + "</p>");
    } else if (tabValue == 2) {
        output = input * tabellaMassa[toConvert][converted];
        $("#valueOut").val(output);
        $("#valori").append("<p>" + input + " " + massa[1][toConvert] + " = " + output + " " + massa[1][converted] + "</p>");
    } else {
        if (toConvert == 0) {
            if (converted == 1) {
                output = input * 9/5 + 32;
            } else {
                output = Number(input) + 273.15;
            };
        };
        if (toConvert == 1) {
            if (converted == 0) {
                    output = (input -32) * 5/9;
                } else {
                    output = Number((input -32)) * 5/9 + 273.15;
                };
        };
        if (toConvert == 2) {
            if (converted == 0) {
                output = Number(input) - 273.15;
            } else {
                output = Number((input) - 273.15) * 9/5 + 32;
            };
    };
        $("#valueOut").val(output);
        $("#valori").append("<p>" + input + " " + temperatura[1][toConvert] + " = " + output + " " + temperatura[1][converted] + "</p>");
    };
};
