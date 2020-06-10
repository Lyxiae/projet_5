let orderList = JSON.parse(window.localStorage.getItem('order-content'));

for (let product of orderList) {
    console.log(product);
    ajaxGet(path + '/teddies/' + product, (responseText) => {
        displayOrder(JSON.parse(responseText));
    })
}

document.getElementById('total-price').innerHTML = window.localStorage.getItem('total-price');
document.getElementById('order-id-number').innerHTML = window.localStorage.getItem('order-id');
