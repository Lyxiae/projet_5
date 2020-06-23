// GENERAUX
const basePath = 'http://localhost:3000/api';

// ELEMENTS HTML
const addToCart = document.getElementById('addToCart');

let productsIds = getCart();


/**
 * 
 * @param Object payload 
 * @param String url 
 * @param String verb 
 */
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


/**
 * Display the product list, one object at a time
 * @param Object product 
 * @param String elementId 
 */
function displayProductRow(product, elementId) {
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

function fetchCart() {
    let url = basePath + '/teddies';
    ajax({}, url, "GET")
    .then(function(data) {
        let allProducts = JSON.parse(data);
        for (let item of allProducts) {
            if (productsIds.includes(item._id)){
                displayProductRow(item, 'cart-list');
                calculatePrice(item);
            }
        }
    })
    .then(function(){
        displayPrice();
    })
}

function calculatePrice(product) {
    totalPrice += item.price;
}


/*
    Get parameter in URL
*/
function getParameter(name) {
    let url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    let results = regex.exec(url);
    if (!results) {
        return null;
    }

    if (!results[2]) {
        return '';
    } 

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

function displayPrice() {
    document.getElementById('total-price').innerHTML = totalPrice;
}