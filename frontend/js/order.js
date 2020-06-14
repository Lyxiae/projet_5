let orderList = JSON.parse(window.localStorage.getItem('order-content'));

//DISPLAY ORDER
for (let product of orderList) {
    ajaxGet(path + '/teddies/' + product, (responseText) => {
        displayOrder(JSON.parse(responseText));
    })
}

//DISPLAY TOTAL PRICE AND ORDER ID
document.getElementById('total-price').innerHTML = window.localStorage.getItem('total-price');
document.getElementById('order-id-number').innerHTML = getParameterByName('id');
