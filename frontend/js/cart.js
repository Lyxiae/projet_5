for (let product of getCart()) {
    console.log(product);

    ajaxGet(path + '/teddies/' + product, (responseText) => {
        displayCart(JSON.parse(responseText));
    })
}
let products = getCart();
console.log(products);

async function ajaxPost (contactObject) {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            console.log(this.status);
            let json = JSON.parse(request.responseText);
            document.getElementById('result').innerHTML = json.postData.text;
        }else{
            console.log('issue with')
        }
    }
    request.open("POST", path + '/teddies/order', true);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(contactObject));
    console.log(contactObject);
    request.send(contactObject);
};



document.getElementById('submit-cart').addEventListener('click', function (event) {
    event.preventDefault();
    console.log(products);
    let contact = {
        surname: document.getElementById("surname").value,
        name: document.getElementById("name").value,
        adress: document.getElementById("adress").value,
        city: document.getElementById("city").value,
        email: document.getElementById("email").value,
        products: products
    }
    console.log(contact);
    console.log(JSON.stringify(contact));
    ajaxPost(contact);
});