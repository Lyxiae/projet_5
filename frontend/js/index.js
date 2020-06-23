/* REQUETE LISTE DE PRODUITS */
let url = basePath + '/teddies';

ajax({}, url, "GET")
.then(function(data) {
    let products = JSON.parse(data);
    displayProducts(products);
})


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