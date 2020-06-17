var updateBtns = document.getElementsByClassName('update-cart')

for (i = 0; i < updateBtns.length; i ++ ) {
    updateBtns[i].addEventListener('click', function () {
        var productTd = this.dataset.product
        var action = this.dataset.action
        console.log('product', productTd, 'Action:', action)
        console.log('USER', user)
        if (user === 'AnonymousUser'){
            addCookieItem(productTd, action)
        }else{
            updateUserOrder(productTd, action)
        }

    })
}

function addCookieItem(productId, action) {
    console.log('Not logged in ...')

    if (action == 'add'){
        if (cart[productId] == undefined){
            cart[productId] = {'quantity':1}
        }else{
            cart[productId]['quantity'] += 1
        }
    }
    if(action == 'remove'){
        cart[productId]['quantity'] -=1

        if (cart[productId]['quantity'] <= 0){
            console.log('Remove item')
            delete  cart[productId]
        }
    }
    console.log('Cart:' , cart)
    document.cookie = 'cart=' + JSON.stringify(cart) + ";domain=;path=/"
    location.reload()
}

function updateUserOrder(productTd, action) {
    console.log('User is authenticated, sending data ...')

    var url = '/update_item/'

    fetch(url, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
        },
        body:JSON.stringify({'productId':productTd, 'action':action})
    })
        .then((response) =>{
            return response.json();
        })
        .then((data) =>{
            console.log('Data:', data)
            location.reload()
        });

}
