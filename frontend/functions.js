/*REQUETE AJAX*/

function ajaxGet(url, callback) {
    let req = new XMLHttpRequest();
    req.open("GET", url);
    req.addEventListener("load", function(){
        if(req.status >= 200 && req.status < 400) {
            //Appelle la fonction callback en lui passant la réponse de la requête
            callback(req.responseText);
            console.log("c'est bon");
        } else {
            console.error(req.status + " " + req.statusText + " " + url);
        }
    });
    req.addEventListener("error", function (){
        console.error("Erreur réseau avec l'URL " + url);
    });
    req.send(null);
}


/*DISPLAY PRODUCTS - INDEX*/
function displayProducts(products) {
    let articleList = document.getElementById('article-list');
    let html = '<div class="row">';
    for(let product of products) {
        html += `<div class="article-item px-lg-2 col-sm-6">`;
        html += `<div class="article-top"><img src="${product.imageUrl}"/>`;
        html += `<div class="article-info"><h2>${product.name}</h2>`;
        html += `<h3>${product.price}</h3>`;
        html += `<a class="view-teddy btn btn-primary" id="${product._id}" href="produit.html?id=${product._id}&name=${product.name}"> Voir le produit </a></div></div>`;
        html += `<p>${product.description}</p>`;
        html += `<p> <strong>Couleurs : </strong>${product.colors}</p>`;
        html += `</div>`;
    }
    html += '</div>';
    articleList.innerHTML = html;
}

function displayProduct(product) {
    let productDetails = document.getElementById('produit-details');
    let selectForm = document.getElementById('teddies-colors');
    let options = product.colors;
    let html = '';
    html += `<div class="article-item col">`;
    html += `<div class="article-top page-produit"><img src="${product.imageUrl}"/>`;
    html += `<div class="article-info"><h2>${product.name}</h2>`;
    html += `<h3>${product.price}</h3>`;
    html += `<p>${product.description}</p>`;
    html += `<p> <strong>Couleurs : </strong>${product.colors}</p></div></div>`;
    html += `</div>`;
    productDetails.innerHTML = html;
    let formHtml='';
    for (let i of options) {
        formHtml += `<option value="${i}">${i}</option>`;
    }
    selectForm.innerHTML = formHtml;
}

const requestTeddies = () => {
    ajaxGet(path + '/teddies', (responseText) => {
        let products = JSON.parse(responseText);
        displayProducts(products);
        let elements = document.getElementsByClassName('view-teddy');
        for (let element of elements) {
            element.addEventListener('click', function(event) {
                requestTeddy(element.id);
            })
        }
    }) 
}