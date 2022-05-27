$(function(){
    loadHistory()
})

var loadHistory = function(){
    let purchasedProducts = JSON.parse(localStorage.getItem("purchasedProducts"));
    let productPrices = JSON.parse(localStorage.getItem("price"));
    if(purchasedProducts != null && purchasedProducts.length > 0) {
        for (let i = 0; i < purchasedProducts.length; i++){
            let array = purchasedProducts[i];
            
            let productHTML = "";
            for(let j = 0; j< array.length; j++){
                let purchasedProduct = `
                <div class="purchasedProdDiv">
                    <img class="cartImage" src="${array[j].imageURL}" />
                    <div class="prodDetailsDiv">
                        <div class="innerProdDetailsDiv">
                            <h2 id="productName" class="margin-bottom-cart"> ${array[j].name} </h2>
                            <h3 id="productBrand" class="margin-bottom-cart"> Brand : ${array[j].brand}</h3>
                            <p class="margin-bottom-cart" data-price="${array[j].price}" 
                                data-currency="${array[j].currency}" id="price_${i}">
                                Price : $${array[j].price * array[j].quantity} ${array[j].currency}
                            </p>
                            <p class="purchasedQuantity">
                                Quantity: ${array[j].quantity}
                            </p>
                        </div>
                    </div>
                </div>
            `;
            
            productHTML = productHTML + purchasedProduct; 
            }
            let priceDiv = `
                <div id="totalDiv">
                    <p>
                    <span>Subtotal: </span>
                    <span>${productPrices[i].subtotal}</span>
                    </p>
                    <p>
                    <span>Tax:</span>
                    <span>${productPrices[i].tax}</span>
                    </p>
                    <p>
                    <span>Discount: </span>
                    <span>${productPrices[i].discount}</span>
                    </p>
                    <p>
                    <span>Total: </span>
                    <span>${productPrices[i].totalPrice}</span>
                    </p>
                </div>
            `;
            productHTML = productHTML + priceDiv
            let div = `<div class="prodDiv border border-dark">${productHTML}</div>
            `; 
            $("#purchasedProductsDiv").append(div);
        }
    } 
}