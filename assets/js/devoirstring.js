// Déclarations des variables nécessaires à l'exercice
var firstName = "";
var lastName = "";
// exercice 1

function prenom() {
    // on récupère le prénom on le met dans l'élément avec id holder1
    // compléter le code ici
    firstName = document.getElementById("prenom").value;
    document.getElementById("holder1").innerHTML = firstName;
}

function nomdefamille() {
    // on récupère le nom on le met dans l'élément avec id holder1
    // compléter le code ici
    lastName = document.getElementById("nomDeFamille").value;
    document.getElementById("holder1").innerHTML = lastName;
}

function nomcomplet() {
    // on concatène prénom et nom pour afficher le nom entier et on met le résultat dans l'élément avec id holder1
    // compléter le code ici
    firstName = document.getElementById("prenom").value;
    lastName = document.getElementById("nomDeFamille").value;
    document.getElementById("holder1").innerHTML = firstName + " " + lastName;
}

// exercice 2
function segmentText() {
    // on récupère le texte de l'élément d'id texte, on le découpe et on le place dans l'élément avec id holder2
    // compléter le code ici
    let text = document.getElementById("texte").value; // On récupère le contenue de la zone de texte
    let lower = text.toLowerCase(); // On met tout le texte en minuscule
    let cleaned = lower.replace(/[^A-Za-z0-9]+/g, " "); // On remplace les caractères spéciaux par des espaces
    let split = cleaned.split(" ") // On sépare les mots avec des virgules en prenant les espaces comme limite
    document.getElementById("holder2").innerHTML = split.join("/"); // On affiche comme résultat le texte découpé en mots.
}
