const arrayEx1 = [" Don't stand so close to me", " A night in Bethlehem", " Dreamer's ball" ];

function exercice1() {
    arrayEx1.unshift(arrayEx1.pop());
    document.getElementById("exercice1Resultat").innerHTML = arrayEx1;
}


function exercice2() {
    let text = document.getElementById("texteExercice2").value;
    let upper = text.toUpperCase();
    let cleaned = upper.replace(/[^A-Za-z0-9àâäéèêëîïôöùûüÿçÀÂÄÉÈÊËÎÏÔÖÙÛÜŸÇ]+/g, " ");
    let split = cleaned.split(" ");
    document.getElementById("exercice2Resultat").innerHTML = split.join(" / ");
}


function exercice3() {
    let text = document.getElementById("texteExercice3").value;
    let cleaned = text.replace(/[^A-Za-z0-9àâäéèêëîïôöùûüÿçÀÂÄÉÈÊËÎÏÔÖÙÛÜŸÇ]+/g, " ");
    let split = cleaned.split(" ");
    let arrayForEach = [];
    split.forEach(element => {if (element.length >= 4) {arrayForEach.unshift(element)}});
    document.getElementById("exercice3Resultat").innerHTMl = arrayForEach.join(" / ");
}

var i = 0

function exercice4() {
    //document.getElementById("exercice4Resultat").innerHTML = ""
    let text = document.getElementById("texteExercice4").value;
    let cleaned = text.replace(/[^A-Za-z0-9àâäéèêëîïôöùûüÿçÀÂÄÉÈÊËÎÏÔÖÙÛÜŸÇ]+/g, " ");
    let split = cleaned.split(" ");
    let table = document.createElement("table");
    table.setAttribute("id", "tableauExercice4")
    let row = document.createElement("tr");
    row.setAttribute("id", "row" + i);
    let colonne = document.createElement("td");
    document.getElementById("exercice4Resultat").appendChild(table);
    document.getElementById("tableauExercice4").appendChild(row);
    let j = 0;
    split.forEach(element => {
        let colonne = document.createElement("td");
        colonne.setAttribute("id", "td" + j);
        colonne.innerHTML = element;
        document.getElementById("row" + i).appendChild(colonne);
        j ++;
    });
    i ++;
}