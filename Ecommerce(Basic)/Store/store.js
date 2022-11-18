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
           

        })
        .catch((err)=>{
            console.log(err)
            showNotification(err.data.message)
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