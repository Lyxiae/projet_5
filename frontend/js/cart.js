let chosenProducts = JSON.parse(localStorage.getItem('id-product'));
let productCart = document.getElementById('cart-list');
let cartContent = ``;

console.log(chosenProducts);


console.log(cartContent);



let result;

for (let product of chosenProducts) {
    console.log(product);
    ajaxGet(path + '/teddies/' + product, (responseText) => {
        result = JSON.parse(responseText);
        console.log(result);
        displayCart(result); 
        productCart.innerHTML = cartContent;
    }) 
}
