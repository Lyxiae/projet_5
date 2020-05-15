
const articleList = document.getElementById('article-list');
const commandResult = document.getElementById('command-recap');
const formId = document.getElementById('command-form');
const choice = document.getElementById('teddies-choice');
const colors = document.getElementById('teddies-colors');
const quantity = document.getElementById('quantity');

/* REQUETE LISTE DE PRODUITS */
const productId = [];
const idUrl = [];
const requestTeddies = () => {
    var request = new XMLHttpRequest();
    request.open("GET", "http://localhost:3000/api/teddies");
    request.send();
    request.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            let response = JSON.parse(this.responseText);
            console.log(response);
            let html = '<div class="row">';
            for(let product of response) {
                html += '<div class="article-item px-lg-2 col-sm-6">';
                html += '<div class="article-top"><img src="' + product.imageUrl + '"/>';
                html += '<div class="article-info"><h2>' + product.name + '</h2>';
                html += '<h3>' + product.price + '</h3>';
                html += '<a class="btn btn-primary" href="http://localhost:3000/api/teddies/' + product._id + '"> Voir le produit </a></div></div>';
                html += '<p>' + product.description + '</p>';
                html += '<p> <strong>Couleurs : </strong>' + product.colors + '</p>';
                html += '</div>';
                productId.push(product._id);
            }
            html += '</div>';
            articleList.innerHTML = html;
            console.log(productId);
            for (let i in productId) {
                idUrl.push ("http://localhost:3000/api/teddies/:_" + productId[i]);
            }
            console.log(idUrl);
            return idUrl
        }
    };
}


async function logId () {
    const result = await requestTeddies();
    console.log(result);
    console.log(idUrl);
    console.log(productId);
    
}

logId()
.then(console.log(productId.length));
/*
function requestById () {
    var request = new XMLHttpRequest();
    request.onreadystatechange = async function() {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            let response = JSON.parse(this.responseText);
            console.log(response);
        }
};
request.open("GET", "http://localhost:3000/api/teddies/:_" + productId[0]);
request.send();
}
*/


/* REQUETE POST SEND */
/*
const sendCommand = () => {
    let encodedData = {
        modele : choice.value,
        couleur : colors.value,
        nombre : quantity.value
    };
    console.log(encodedData);
    let dataToSend = JSON.stringify(encodedData);
    console.log(dataToSend);
    var request = new XMLHttpRequest();
    
    request.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            let json = JSON.parse(request.responseText);
            document.getElementById('commandResult').innerHTML = json.postData.text;
        }
    }

    request.open("POST", "http://localhost:3000/api/teddies/order");
    request.setRequestHeader("Content-Type", "application/json");
    request.send(dataToSend);
    
};
*/

