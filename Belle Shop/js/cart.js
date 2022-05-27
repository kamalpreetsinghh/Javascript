$(function(){
    console.log(JSON.parse(localStorage.getItem("cart")));
    loadCart();

    $(".delete").on("click", function(){
        removeFromCart(this);
    });

    $(".minus-button-cart").on("click", function(){
        decreaseQuantity(this);
    });

    $(".plus-button-cart").on("click", function(){
        increaseQuantity(this);
    });

    $("#checkoutButton").on("click", function(){
        checkout();
    });
})

var loadCart = function(){
    let cartProducts = JSON.parse(localStorage.getItem("cart"));
    if(cartProducts != null && cartProducts.length > 0) {
        $("#emptyCartDiv").hide();
        let price = 0;
        $.each(cartProducts, function(index, value) {
            price = price + value.price * value.quantity;
            let cartDiv = `
                <div class="prodDiv">
                    <img class="cartImage" src="${value.imageURL}" />
                    <div class="prodDetailsDiv">
                        <div class="innerProdDetailsDiv">
                            <h2 id="productName" class="margin-bottom-cart"> ${value.name} </h2>
                            <h3 id="productBrand" class="margin-bottom-cart"> Brand : ${value.brand}</h3>
                            <p class="margin-bottom-cart" data-price="${value.price}" 
                                data-currency="${value.currency}" id="price_${index}">
                                Price : $${value.price * value.quantity} ${value.currency}
                            </p>
                            <div class="margin-bottom-cart">
                                <button id="${index}" class="btn minus-button minus-button-cart">
                                    -
                                </button>
                                <input
                                type="text"
                                id="input_${index}"
                                value="${value.quantity}"
                                class="form-control width-30"
                                />
                                <button id="${index}" class="btn plus-button plus-button-cart">
                                    +
                                </button>
                          </div>
                        </div>
                        <div class="deleteDiv">
                            <button id="${index}" class="btn delete">
                                <img class="deleteImage" src="./assets/delete.png">
                            </button>
                        </div>
                    </div>
                </div>
            `;
            $("#cartDiv").append(cartDiv);
        });
        calculatePrice(price);
    } else {
        $("#emptyCartDiv").show();
        $("#checkoutDiv").hide();
        $("#totalDiv").hide();
    }
}

var removeFromCart = function(buttonElement){
    let productIndex = $(buttonElement).attr("id");
    let productsList = JSON.parse(localStorage.getItem("cart"));
    productsList.splice(productIndex, 1);
    localStorage.setItem("cart", JSON.stringify(productsList));
    document.location.reload(true);
}

var decreaseQuantity = function(thisElement){
    let id = $(thisElement).attr("id");
    let quantity = parseInt($( `#input_${id}`).val());
    let priceBefore = $(`#price_${id}`).attr("data-price") * quantity;

    if(quantity > 1){
        quantity--
        $(`#input_${id}`).val(String(quantity));
        let priceAfter = $(`#price_${id}`).attr("data-price") * quantity;
        $(`#price_${id}`).html(`Price : $${priceAfter} ${$(`#price_${id}`).attr("data-currency")}`);
        
        let price = $("#subtotalPrice").attr("data-subtotal");
        price = price - priceBefore + priceAfter;
        calculatePrice(price);

        let productsList = JSON.parse(localStorage.getItem("cart"));
        debugger;
        $.each(productsList, function(index, value){
            if(index == id){
                value.quantity = quantity;
            }
        });
        localStorage.setItem("cart", JSON.stringify(productsList));
    }
}

var increaseQuantity = function(thisElement){
    let id = $(thisElement).attr("id");
    let quantity = parseInt($( `#input_${id}`).val());
    let priceBefore = $(`#price_${id}`).attr("data-price") * quantity;

    if(quantity < 5){
        quantity++
        $(`#input_${id}`).val(String(quantity));
        let priceAfter = $(`#price_${id}`).attr("data-price") * quantity;
        $(`#price_${id}`).html(`Price : $${priceAfter} ${$(`#price_${id}`).attr("data-currency")}`);
        
        let price = $("#subtotalPrice").attr("data-subtotal");
        price = price - priceBefore + priceAfter;
        calculatePrice(price);

        let productsList = JSON.parse(localStorage.getItem("cart"));
        $.each(productsList, function(index, value){
            if(index == id){
                value.quantity = quantity;
            }
        });
        localStorage.setItem("cart", JSON.stringify(productsList));
    }
}

var calculatePrice = function(price){
    $("#subtotalPrice").html(`${Math.floor(price*100)/100} CAD`);
    $("#subtotalPrice").attr("data-subtotal", Math.floor(price * 100)/100);
    $("#tax").html(`${Math.floor(price * 0.13 * 100)/100} CAD`);

    let discount = 0.0;
    if(price > 150){
        discount = price * 0.30;
    }else if(price > 100){
        discount = price * 0.20;
    } else if(price > 75){
        discount = price * 0.10;
    }

    $("#discount").html(`${Math.floor(discount*100)/100} CAD`);
    $("#totalPrice").html(`${Math.floor((price + price * 0.13 - discount)*100)/100} CAD`);
}

var checkout = function(){
    let products = JSON.parse(localStorage.getItem('cart'));
    if(products != null || products.length > 0){
        localStorage.removeItem("cart");
        let purchasedProducts = JSON.parse(localStorage.getItem("purchasedProducts"));
        if(purchasedProducts == null){
            purchasedProducts = [];
        }
        purchasedProducts.push(products);
        localStorage.setItem("purchasedProducts", JSON.stringify(purchasedProducts));

        let price = {
            "subtotal": $("#subtotalPrice").html(),
            "tax": $("#tax").html(),
            "discount": $("#discount").html(),
            "totalPrice": $("#totalPrice").html()
        };

        let productsPrice = JSON.parse(localStorage.getItem("price"));
        if(productsPrice == null){
            productsPrice = [];
        }
        productsPrice.push(price);
        localStorage.setItem("price", JSON.stringify(productsPrice));

        let url = window.location.pathname.split("/");
        url[url.length - 1] = "purchasehistory.html";
        url = url.join("/");
        window.location.href = url;
    }
}