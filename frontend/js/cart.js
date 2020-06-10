let totalPrice = 0;

for (let product of getCart()) {
    console.log(product);

    ajaxGet(path + '/teddies/' + product, (responseText) => {
        displayCart(JSON.parse(responseText));
        
    })
}
let products = getCart();
console.log(products);


async function ajaxPost(contactObject) {
    var request = new XMLHttpRequest();
    var url = path + '/teddies/order';
    console.log(contactObject);
    request.onreadystatechange = function(){
        if(this.status >= 200) {
            let requestResult = JSON.parse(request.response);
            window.localStorage.setItem('order-id', JSON.stringify(requestResult.orderId));
        }
    }
    request.open("POST", url);
    request.setRequestHeader("Content-Type", "application/json;charset=UTL-8");
    request.send(JSON.stringify(contactObject));
    
    
}


document.getElementById('submit-cart').addEventListener('click', function (event) {
    event.preventDefault();
    ajaxPost({
        contact: {
            firstName: document.getElementById("surname").value,
            lastName: document.getElementById("name").value,
            address: document.getElementById("adress").value,
            city: document.getElementById("city").value,
            email: document.getElementById("email").value,
        },
        products: products
    })
    .then(function() {
        window.localStorage.setItem('total-price', JSON.stringify(totalPrice));
        window.localStorage.setItem('order-content', JSON.stringify(products));
        window.setTimeout(function() {
            window.location = "order.html";}, 2000);
        
    })
});