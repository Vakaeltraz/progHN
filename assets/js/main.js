function upper() {
    let text = document.getElementById("changeCase").value;
    document.getElementById("returnCase").innerHTML = text.toUpperCase();
}

function lower() {
    let text = document.getElementById("changeCase").value;
    document.getElementById("returnCase").innerHTML = text.toLowerCase();
}