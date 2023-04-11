let text_tokens = [];
let text_lines = [];

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
                segmentation();
                document.getElementById("logger").innerHTML = '<span class="infolog">Fichier chargé avec succès, ' + text_tokens.length + ' tokens et ' + text_lines.length + ' lignes non-vides dans le texte.</span>';
            }

            // on lit concrètement le fichier.
            // Cette lecture lancera automatiquement la fonction "onload" juste au-dessus.
            reader.readAsText(file);
        } else { // pas un fichier texte : message d'erreur.
            fileDisplayArea.innerText = "";
            document.getElementById("logger").innerHTML = '<span class="errorlog">Type de fichier non supporté !</span>';
        }
    });
}

function afficheCacheAide() {
    let aide = document.getElementById("aide");
    let boutonAide = document.getElementById("boutonAide");
    let display = aide.style.display;
    
    if (display === "none") {
        aide.style.display = "block";
        boutonAide.innerText = "Cacher l'aide";
    } else {
        aide.style.display = "none";
        boutonAide.innerText = "Afficher l'aide";
    }
}

function segmentation() {
    let text = document.getElementById("fileDisplayArea").innerText;
    let delim = document.getElementById("delimID").value;
    let display = document.getElementById("page-analysis");

    let regex_delim = new RegExp(
        "["
        + delim
            .replace("-", "\\-") // le tiret n'est pas à la fin : il faut l'échapper, sinon erreur sur l'expression régulière
            .replace("[", "\\[").replace("]", "\\]") // à changer sinon regex fautive, exemple : [()[]{}] doit être [()\[\]{}], on doit "échapper" les crochets, sinon on a un symbole ] qui arrive trop tôt.
        + "\\s" // on ajoute tous les symboles d'espacement (retour à la ligne, etc)
        + "]+" // on ajoute le + au cas où plusieurs délimiteurs sont présents : évite les tokens vides
    );

    let tokens_tmp = text.split(regex_delim);
    text_tokens = tokens_tmp.filter(x => x.trim() != ''); // on s'assure de ne garder que des tokens "non vides"

    text_lines = text.split(/[\r\n]+/gm);

    // global_var_tokens = tokens; // décommenter pour vérifier l'état des tokens dans la console développeurs sur le navigateur
    // display.innerHTML = tokens.join(" ");
}

function dictionnaire() {
    let comptes = new Map();
    let display = document.getElementById("page-analysis");

    for (let token of text_tokens) {
        comptes.set(token, (comptes.get(token) ?? 0) + 1);
    }
    
    let comptes_liste = Array.from(comptes);
    comptes_liste = comptes_liste.sort(function(a, b) {
        return b[1] - a[1]; // tri numérique inversé
    });

    let table = document.createElement("table");
    table.style.margin = "auto";
    let entete = table.appendChild(document.createElement("tr"));
    entete.innerHTML = "<th>mot</th><th>compte</th>";
    
    for (let [mot, compte] of comptes_liste) {
        let ligne_element = table.appendChild(document.createElement("tr"));
        let cellule_mot = ligne_element.appendChild(document.createElement("td"));
        let cellule_compte = ligne_element.appendChild(document.createElement("td"));
        cellule_mot.innerHTML = mot;
        cellule_compte.innerHTML = compte;
    }

    display.appendChild(table);
}

function upper() {
    let text = document.getElementById("changeCase").value;
    document.getElementById("returnCase").innerHTML = text.toUpperCase();
}

function lower() {
    let text = document.getElementById("changeCase").value;
    document.getElementById("returnCase").innerHTML = text.toLowerCase();
}

/* tentative de fonction grep()
function grep() {
    let matched_lines = []; // déclaration du pôle
    let pole = document.getElementById("poleID").value; // déclaration d'une liste vide qui contriendra les lignes avec le pôle
    let poleRegex = new RegExp(pole, "g")
    let display = document.getElementById("page-analysis"); // déclaration de la zone d'affichage de l'analyse

    for (let line of text_lines) {
        matched_lines.push(line.matchAll(pole)); // pour chaque ligne de la liste créée au chargement du fichier, on vérifie que la ligne possède le pôle en son sein. Si c'est le cas, la ligne est ajoutée à la liste des résultats
    };

    let table = document.createElement("table"); // Création d'un tableau pour affichage du résultat d'analyse
    table.style.margin = "auto";
    let entete = table.appendChild(document.createElement("tr"));
    entete.innerHTML = "<th>numéro de la ligne<th><th>lignes avec " + pole + "</th>";

    matched_lines.forEach(Element => {
        if (Element.match(poleRegex) === true) {
            let line_number = matched_lines.indexOf(line) + 1; 
            let ligne_element = table.appendChild(document.createElement("tr"));
            let cellule_numéro = ligne_element.appendChild(document.createElement("td"));
            let cellule_résultat = ligne_element.appendChild(document.createElement("td"));
            cellule_numéro = line_number;
            cellule_résultat.innerHTML = line .replace(pole, "<mark barckground-color ='red'>$&<mark>");
        };
    });
};
*/