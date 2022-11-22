const cart_items = document.querySelector('#cart .cart-items')

const parentContainer = document.getElementById('EcommerceContainer')
window.addEventListener('load', () => {
    console.log('loaded');

    axios.get('http://localhost:3000/products').then((products) => {
        console.log(products)
        products.data.products.forEach(product => {
            const productHtml = `
                <div id="album-${product.id}">
                    <h3>${product.title}</h3>
                    <div class="image-container">
                        <img class="prod-images" src=${product.imageUrl} alt="">
                    </div>
                                    <div class="prod-details">
                        <span>$<span>${product.price}</span></span>
                        <button onClick="addToCart(${product.id})" class="shop-item-button" type='button'>ADD TO CART</button>
                    </div>
                </div>`
                console.log(product.title)
            parentContainer.innerHTML += productHtml

        })
    })

})

    function addToCart(productId){
        axios.post('http://localhost:3000/cart',{productId:productId})
        .then((response)=>{
            if(response.status===200){

                showNotification(response.data.message)

            }
            else{
                throw new Error(response.data.message)
            }
           

        })
        .catch((errMsg)=>{
            console.log(errMsg)
            showNotification(errMsg)
        })
    }

    function showNotification(message, iserror){
        const container = document.getElementById('container');
        const notification = document.createElement('div');
        notification.style.backgroundColor = iserror ? 'red' : 'green';
        notification.classList.add('notification');
        notification.innerHTML = `<h4>${message}<h4>`;
        container.appendChild(notification);
        setTimeout(()=>{
            notification.remove();
        },2500)
    }



   

    function showProductsInCart(listofproducts){
        let total = 0 ; 
        cart_items.innerHTML = "";
        listofproducts.forEach(product => {
            const id = `album-${product.id}`;
            const name = product.title;
            const img_src = product.imageUrl;
            const price = product.price;
            total = total + +price ;
            document.querySelector('.cart-number').innerText = parseInt(document.querySelector('.cart-number').innerText)+1
            const cart_item = document.createElement('div');
            cart_item.classList.add('cart-row');
            cart_item.setAttribute('id',`in-cart-${id}`);
            cart_item.innerHTML = `
            <span class='cart-item cart-column'>
            <img class='cart-img' src="${img_src}" alt="">
                <span>${name}</span>
            </span>
            <span class='cart-price cart-column'>${price}</span>
            <form onsubmit='deleteCartItem(event, ${product.id})' class='cart-quantity cart-column'>
                <input type="text" value="1">
                <button>REMOVE</button>
            </form>`
            cart_items.appendChild(cart_item)
        })
    
         document.querySelector('.total-price').innerText = total  ;
    }

    document.addEventListener('click',(e)=>{
/*

        if (e.target.className=='shop-item-button'){
            const prodId = Number(e.target.parentNode.parentNode.id.split('-')[1]);
            axios.post('http://localhost:3000/cart', { productId: prodId}).then(data => {
                if(data.data.error){
                    throw new Error('Unable to add product');
                }
                showNotification(data.data.message, false);
            })
            .catch(err => {
                console.log(err);
                showNotification(err, true);
            });

            */

        if (e.target.className=='cart-btn-bottom' || e.target.className=='cart-bottom' || e.target.className=='cart-holder'){
        
                getCartDetails()
    
        }

        if (e.target.className=='cancel'){
            document.querySelector('#cart').style = "display:none;"
        }

        if (e.target.className=='purchase-btn'){
            if (parseInt(document.querySelector('.cart-number').innerText) === 0){
                alert('You have Nothing in Cart , Add some products to purchase !');
                return
            }
            alert('This Feature is yet to be completed ')
        }
        
    })


    /*

    function getCartDetails(){
        axios.get('http://localhost:3000/cart')

        .then(response=>{
            console.log("In getCartDetails"+response)

            if(response.status===200){
                response.data.products.forEach(product=>{
                    const CartContainer = document.getElementById('cart')
                    CartContainer.innerHTML+= `<li>${product.title}-${product.cartItem.quantity}-${product.price}`

                })
                document.querySelector('#cart').style='display:block'
            }
        })

        .catch(err=>{
            console.log()
        })
    }

    */

/*
    function getCartItems(){
        axios.get('http://localhost:3000/cart').then(Products => {
            console.log(Products+'in getcartItem')
                showProductsInCart(Products.data.products);
                document.querySelector('#cart').style = "display:block;"
    
            }).catch(err=>{
                showNotification(err, true);
            })
    }
    
    function showProductsInCart(listofproducts){
        console.log('inListProduct'+listofproducts)
        let total = 0 ; 
        cart_items.innerHTML = "";
        listofproducts.forEach(product => {
            const id = `album-${product.id}`;
            const name = product.title;
            const img_src = product.imageUrl;
            const price = product.price;
            total = total + +price ;
            document.querySelector('.cart-number').innerText = parseInt(document.querySelector('.cart-number').innerText)+1
            const cart_item = document.createElement('div');
            cart_item.classList.add('cart-row');
            cart_item.setAttribute('id',`in-cart-${id}`);
            cart_item.innerHTML = `
            <span class='cart-item cart-column'>
            <img class='cart-img' src="${img_src}" alt="">
                <span>${name}</span>
            </span>
            <span class='cart-price cart-column'>${price}</span>
            <form onsubmit='deleteCartItem(event, ${product.id})' class='cart-quantity cart-column'>
                <input type="text" value="1">
                <button>REMOVE</button>
            </form>`
            cart_items.appendChild(cart_item)
        })
    
         //document.querySelector('.total-price').innerText = total  ;
    }

    */


    function getCartDetails(){
        axios.get('http://localhost:3000/cart')

        .then(response=>{
           
            if(response.status===200){

                response.data.products.forEach(product=>{
                    
                    const CartContainer = document.getElementById('cart')
                    CartContainer.innerHTML+= `<li>${product.title}-${product.cartItem.quantity}-${product.price}</li>`
                    console.log(CartContainer)
                })
                document.querySelector('#cart').style = "display:block;"
            }
        })

        .catch(error=>{
            console.log(error)
        })
    }