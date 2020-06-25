// GENERAUX
const basePath = 'http://localhost:3000/api';

/**
 * Fetch data via ajax.
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
 * Checks if the cart has products
 */
function cartHasProducts () {
    return !!window.localStorage.getItem('id-product');
}

/**
 * Displays order content in cart and order pages
 * @param Array products 
 */
function displayCartProducts(products) {
    for (let product of products) {
        document.getElementById('cart-list').innerHTML += displayProduct(product, 'row');
    }
}

/**
 * Master display function for every page. Different display depending on type
 * Type can be row, card or list.
 * @param Object product 
 * @param String type 
 */
function displayProduct (product, type = 'row') {
    if (type == 'row') {
        return `
            <div class="row">
            <div class="article-item col">
                <div class="article-top page-produit">
                    <img src="${product.imageUrl}"/>
                    <div class="article-info">
                        <h2>${product.name}</h2>
                        <h3>${product.price}</h3>
                    </div>
                </div>
                </div>
            </div>`
    }
    if (type == 'card') {
        return `
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
            </div>`
    }

    if (type == 'list') {
        return `
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
                </div>
            </div>`
    }
}

/**
 * Display order price in cart and order pages
 * @param Number total 
 */
function displayTotal(total) {
    document.getElementById('total-price').textContent = total;
}

/**
 * Returns all products objects in cart.
 */
function getProductsInCart(products) {
    let cartProductsIds = getCartProductIds();
    let cartProducts = [];

    for (let id of cartProductsIds) {
        let index = products.findIndex((product) => product._id == id);

        cartProducts.push(products[index]);
    }
    return cartProducts;
}

/**
 * Returns all products from the API. 
 */
function getAllProducts() {
    return new Promise((resolve, reject) => {
        ajax({}, basePath + '/teddies', "GET")
        .then(function(data) {
            resolve(JSON.parse(data));
        });
    });
}


/**
 * Gets products ids from cart in localStorage.
 */
function getCartProductIds() {
    if (cartHasProducts()) {
        return JSON.parse(window.localStorage.getItem('id-product'));
    }
    return [];
}


/**
 * Gets url parameter.
 * @param String name 
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

/**
 * Calculates the total price for the cart and the order.
 * @param Array products 
 */
function getTotal(products) {
    let total = 0;
    for (let product of products){
        total += product.price;
    }
    return total;
}


