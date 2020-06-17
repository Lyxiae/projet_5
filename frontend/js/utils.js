// GENERAUX
const path = 'http://localhost:3000/api';

// ELEMENTS HTML
const commandResult = document.getElementById('command-recap');
const formId = document.getElementById('command-form');
const choice = document.getElementById('teddies-choice');
const colors = document.getElementById('teddies-colors');
const quantity = document.getElementById('quantity');
const addToCart = document.getElementById('addToCart');

// PAGE PANIER
let shoppingList = [];
let existingProducts = [];

/*REQUETE AJAX*/
function ajax(payload, url, verb) {
    return new Promise((resolve, reject) => {
        let req = new XMLHttpRequest();
        req.open(verb, url);
        req.addEventListener("load", function() {
            if(req.status >=200) {
                resolve(req.responseText);
            }else{
                reject(req.statusText);
            }
        });
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.send(payload);
    })
    
}

/*DISPLAY PRODUCT BASE - AFFICHAGE EN LISTE*/
function displayProductBase(product, elementId) {
    document.getElementById(elementId).innerHTML +=
    `<div class="row">
    <div class="article-item col">
        <div class="article-top page-produit">
            <img src="${product.imageUrl}"/>
            <div class="article-info">
                <h2>${product.name}</h2>
                <h3>${product.price}</h3>
            </div>
        </div>
        </div>
    </div>`;
}

/*DISPLAY PRODUCTS - INDEX*/
function displayProducts(products) {
    let articleList = document.getElementById('article-list');
    let html = '<div class="row">';
    for(let product of products) {
        html += `
        <div class="article-item px-lg-2 col-sm-6">
            <div class="article-top">
                <img src="${product.imageUrl}"/>
                <div class="article-info">
                    <h2>${product.name}</h2>
                    <h3>${product.price}</h3>
                    <a class="view-teddy btn btn-primary" id="${product._id} button-view" href="product.html?id=${product._id}"> Voir le produit </a>
                </div>
            </div>
            <p>${product.description}</p>
            <p> <strong>Couleurs : </strong>${product.colors}</p>
        </div>`;
    }
    html += '</div>';
    articleList.innerHTML = html;
    
}

/*DISPLAY PRODUCT - PAGE PRODUCT*/
function displayProduct(product) {
    let productDetails = document.getElementById('produit-details');
    let selectForm = document.getElementById('teddies-colors');
    let options = product.colors;
    productDetails.innerHTML = `
    <div class="article-item col">
        <div class="article-top page-produit">
            <img src="${product.imageUrl}"/>
            <div class="article-info">
                <h2>${product.name}</h2>
                <h3>${product.price}</h3>
                <p>${product.description}</p>
                <p> <strong>Couleurs : </strong>${product.colors}</p>
            </div>
        </div>
    </div>`;
    let formHtml='';
    for (let i of options) {
        formHtml += `<option value="${i}">${i}</option>`;
    }
    selectForm.innerHTML = formHtml;
    addToCart.setAttribute('data-product-id',product._id);
}

/*GET ID IN URL*/
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

/*CHECK IF CART HAS PRODUCTS*/
function cartHasProducts () {
    return !!window.localStorage.getItem('id-product');
}

/*GET CART CONTENT FROM LOCAL STORAGE*/
function getCart() {
    if (cartHasProducts()) {
        return JSON.parse(window.localStorage.getItem('id-product'));
    }
    return [];
}