const cartItems = [
    {
     id:"wtuwtpo",
     productName: "Nike Sneaker",
     description: "A beautiful pair of nike sneaker",
     price: 100 ,
     imageUrl: "assets/baskets.png",
     isFavourite: false,
     quantity: 0,
    },

    {
        id:"twptiowsg",
        productName: "Nike Bag",
        description: "A beautiful pair of nike bag",
        price: 20 ,
        imageUrl: "assets/socks.png",
        isFavourite: true,
        quantity: 0,
       },
   
       {
        id:"gwrtyese",
        productName: "Nike Bag",
        description: "A beautiful pair of nike bag",
        price: 50 ,
        imageUrl: "assets/bag.png",
        isFavourite: false,
        quantity: 0,
       }   
];

// target product lists div
const productsListDiv = document.querySelector(".list-products");  
const totalPriceSpan = document.querySelector(".total")

// render cart items to the DOM
function renderCartItems() {

    console.log(cartItems)
    productsListDiv.innerHTML = "";
    totalPriceSpan.textContent = "";
    let productTotalPrice = 0;
    
    // loop through cart items array

    for (cartItem of cartItems){
        let itemPrice = cartItem.price * cartItem.quantity;
        productTotalPrice += itemPrice;
        totalPriceSpan.textContent = `$${productTotalPrice}`;


        // create a new card div
        const cartCard = document.createElement("div");
        cartCard.classList.add("card-body");

        cartCard.innerHTML = ` <div class="card-body">
            <div class="card" style="width: 18rem">
              <img
                src="${cartItem.imageUrl}"
                class="card-img-top"
                alt="baskets"
              />
              <div class="card-body">
                <h5 class="card-title">${cartItem.productName}</h5>
                <p class="card-text">${cartItem.description}</p>
                <h4 class="unit-price">${cartItem.price} $</h4>
                <div>
                  <i class="fas fa-plus-circle" value=${cartItem.id}></i>
                  <span class="quantity">${cartItem.quantity}</span>

                  <i class="fas fa-minus-circle" value=${cartItem.id}></i>
                </div>
                <div>
                  <i class="fas fa-trash-alt" value=${cartItem.id}></i>

                  ${
                    cartItem.isFavourite
                    ? `<i class="fas fa-heart heart" value=${cartItem.id}></i>`
                    : `<i class="fas fa-heart" value=${cartItem.id}></i>`
                  }


                </div>
              </div>
            </div>`;

            productsListDiv.appendChild(cartCard);      
    }


// select all products price / item increase btn
    const increaseItemBtn = document.getElementsByClassName("fa-plus-circle");
// select all products price / item decrease btn
    const decreaseItemBtn = document.getElementsByClassName("fa-minus-circle")
    // select all products price/ delete btn
    const deleteItemBtn = document.getElementsByClassName("fa-trash-alt");
    // select all products price//favorite item click
    const heartItemBtn = document.getElementsByClassName("fa-heart");


    // loop over the array of increaseItemBtn
    for (increaseBtn of increaseItemBtn) {
        increaseBtn.addEventListener("click" , increaseCartItemsPrice);
    }
// loop over the array of decreaseItemBtn
    for (decreaseBtn of decreaseItemBtn) {
        decreaseBtn.addEventListener("click", decreaseCartItemPrice);
    }
    // loop over the array of deleteItemBtn
    for (let deleteBtn of deleteItemBtn) {
        deleteBtn.addEventListener("click", deleteCartItem);
    }
    // loop over the array for favoriteItemBtn
    for (let heartItem of heartItemBtn) {
        heartItem.addEventListener("click", toggleFavourite);
      }
}
// call the renderCartItems function on the window load
window.addEventListener("load", renderCartItems);

// change cart items quantity and price
function increaseCartItemsPrice(event){
    // get id of the product
    const productId = event.target.getAttribute("value");
    // console.log(event.target.getAttribute("value"));

    // find the index of the product on the cart items array
    const foundProductIndex = cartItems.findIndex(
        (item)=> item.id === productId
    );

  

    // get the actual product on the cart items array by the products index 
    const productToUpdate = cartItems[foundProductIndex];

    // update quantity of product on the products objects
    const updatedProduct = {
        ...productToUpdate,
        quantity: (productToUpdate.quantity +=1),
    };
    // update cart items array with updated product
cartItems[foundProductIndex] = updatedProduct;


return renderCartItems();

}



function decreaseCartItemPrice(event){
    const productId = event.target.getAttribute("value");
        // find the index of the product on the cart items array
        const foundProductIndex = cartItems.findIndex(
            (item)=> item.id === productId
        );
    
      
    
        // get the actual product on the cart items array by the products index 
        const productToUpdate = cartItems[foundProductIndex];
    
        // delete quantity of product on the products objects
        const updatedProduct = {
            ...productToUpdate,
            quantity: productToUpdate.quantity > 0 ? productToUpdate.quantity -1 : 0,
        };

        // update cart items array with updated product
    cartItems[foundProductIndex] = updatedProduct;
    
    return renderCartItems();
 }

 function deleteCartItem(event) {
    const productId = event.target.getAttribute("value");
    // remove item from cart array
    const foundProductIndex = cartItems.findIndex(item => item.id === productId);
 if(foundProductIndex < 0) {
    return
 }
 cartItems.splice(foundProductIndex, 1)
 
   return renderCartItems();
 }

 function toggleFavourite(event) {
    const productId = event.target.getAttribute("value");
      // Toggle the isFavourite status of the found product
      // find the index of the product on the cart items array
    const foundProductIndex = cartItems.findIndex(
        (item)=> item.id === productId
    );

  

    // get the actual product on the cart items array by the products index 
    const productToUpdate = cartItems[foundProductIndex];

    // update quantity of product on the products objects
    const updatedProduct = {
        ...productToUpdate,
        isFavourite: productToUpdate.isFavourite ? false : true
    };
    // update cart items array with updated product
cartItems[foundProductIndex] = updatedProduct;

 return renderCartItems();
 }

 