function upper() {
    let text = document.getElementById("changeCase").value;
    document.getElementById("returnCase").innerHTML = text.toUpperCase();
}

function lower() {
    let text = document.getElementById("changeCase").value;
    document.getElementById("returnCase").innerHTML = text.toLowerCase();
}

window.onload = function() {
    let fileInput = document.getElementById('fileInput');
    let fileDisplayArea = document.getElementById('fileDisplayArea');

    // On "écoute" si le fichier donné a été modifié.
    // Si on a donné un nouveau fichier, on essaie de le lire.
    fileInput.addEventListener('change', function(e) {
        // Dans le HTML (ligne 22), fileInput est un élément de tag "input" avec un attribut type="file".
        // On peut récupérer les fichiers données avec le champs ".files" au niveau du javascript.
        // On peut potentiellement donner plusieurs fichiers,
        // mais ici on n'en lit qu'un seul, le premier, donc indice 0.
        let file = fileInput.files[0];
        // on utilise cette expression régulière pour vérifier qu'on a bien un fichier texte.
        let textType = new RegExp("text.*");

        if (file.type.match(textType)) { // on vérifie qu'on a bien un fichier texte
            // lecture du fichier. D'abord, on crée un objet qui sait lire un fichier.
            var reader = new FileReader();

            // on dit au lecteur de fichier de placer le résultat de la lecture
            // dans la zone d'affichage du texte.
            reader.onload = function(e) {
                fileDisplayArea.innerText = reader.result;
            }

            // on lit concrètement le fichier.
            // Cette lecture lancera automatiquement la fonction "onload" juste au-dessus.
            reader.readAsText(file);    

            document.getElementById("logger").innerHTML = '<span class="infolog">Fichier chargé avec succès</span>';
        } else { // pas un fichier texte : message d'erreur.
            fileDisplayArea.innerText = "";
            document.getElementById("logger").innerHTML = '<span class="errorlog">Type de fichier non supporté !</span>';
        }
    });
}

function segmentText() {
    let delimiteur = document.getElementById("delimID").value
    let text = fileDisplayArea.innerText; // On récupère le contenue de la zone de texte
    let lower = text.toLowerCase(); // On met tout le texte en minuscule. 
    let cleaned = lower.replace(/[^A-Za-z0-9àâäéèêëîïôöùûüÿçÀÂÄÉÈÊËÎÏÔÖÙÛÜŸÇ]+/g, " "); // On remplace les caractères spéciaux par des espaces
    let split = cleaned.split(" "); // On sépare les mots avec des virgules en prenant les espaces comme limite
    document.getElementById("page-analysis").innerHTML = split.join(delimiteur); // On affiche comme résultat le texte découpé en mots.
}

function displayHelp() {
    let aide = document.getElementById("helpDiv");
    let paragraphe = document.createElement("p");
    paragraphe.setAttribute("id", "helpP");
    let aideTexte = "This is a test";
    aide.appendChild(paragraphe);
    paragraphe.innerHTML = aideTexte;
    document.getElementById("boutonAide").onclick = function() {clearHelp();};
}

function clearHelp() {
    document.getElementById("helpDiv").innerHTML ="";
    document.getElementById("boutonAide").onclick = function() {displayHelp();};
}