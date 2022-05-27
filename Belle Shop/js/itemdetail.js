$(function(){
    $("#productDiv").hide();
    loadItemDetails();

    $("#addToCartButton").on("click", function(){
        addToCart();
    });

    $("#openCart").on("click", function(){
        goToCart();
    });

    $("#minusButton").on("click", function(){
        decreaseQuantity();
    });

    $("#plusButton").on("click", function(){
        increaseQuantity();
    });
});

class Product {
    constructor(id, name, brand, price, currency, imageURL, tags, description, quantity) {
        this.id = id;
        this.name = name;
        this.brand = brand;
        this.price = price;
        this.currency = currency;
        this.imageURL = imageURL;
        this.tags = tags;
        this.description = description;
        this.quantity = quantity;
    }
}

var loadItemDetails = function (){
    let productID = localStorage.getItem("productID");
    let apiURL = `https://makeup-api.herokuapp.com/api/v1/products/${productID}.json`;
    jQuery.get(apiURL, function(data, status){
        $("#loaderDiv").hide();
        $("#productDiv").show();
        let quantity = 1;
        let product = new Product(data.id, data.name, data.brand, data.price, data.currency, 
            data.image_link, data.tags, data.description, quantity);
        setData(product);
    });
}

var setData = function (product) {
    if(product.price == "0.0"){
        product.price = "10.0";
    }
    $("#productImage").attr("src", product.imageURL);
    $("#productHeading").html(product.name.toUpperCase());
    $("#productHeading").attr("data-id", product.id);
    $("#brandHeading").html(`BRAND: ${product.brand.toUpperCase()}`);
    $("#productPrice").attr("data-price", product.price);
    $("#productPrice").html(`$${product.price * product.quantity} ${product.currency}`);
    $("#productPrice").attr("data-currency", product.currency);
    $("#productDescription").html(product.description);
}

var addToCart = function(){
    let id = $("#productHeading").attr("data-id");
    let name = $("#productHeading").html();
    let brand = $("#brandHeading").html();
    let price = $("#productPrice").attr("data-price");
    let currency = $("#productPrice").attr("data-currency");
    let imageURL = $("#productImage").attr("src"); 
    let description = $("#productDescription").html();
    let quantity = $("#productQuantity").val();

    let product = new Product(id, name, brand, price, currency, imageURL, [], description, quantity);
    
    let cartProducts = localStorage.getItem("cart");
    debugger;
    if(cartProducts == null || cartProducts.length == 0 || cartProducts == "") {
        cartProducts = [];
    } else{
        cartProducts = JSON.parse(cartProducts);
        cartProducts = cartProducts.filter((v) => v.id != id);
    }

    cartProducts.push(product);
    
    localStorage.setItem("cart", JSON.stringify(cartProducts));
    alert("Added to Cart");

    // let url = window.location.pathname.split("/");
    // url[url.length - 1] = "cart.html";
    // url = url.join("/");
    // window.location.href = url;
}

var increaseQuantity = function() {
    let quantity = parseInt($("#productQuantity").val());
    if(quantity < 5){
        quantity++
        $("#productQuantity").val(String(quantity));
        $("#productPrice").html(`$${$("#productPrice").attr("data-price") * 
        quantity} ${$("#productPrice").attr("data-currency")}`);
    }
}

var decreaseQuantity = function() {
    let quantity = parseInt($("#productQuantity").val());
    if(quantity > 1){
        quantity--
        $("#productQuantity").val(String(quantity));
        $("#productPrice").html(`$${$("#productPrice").attr("data-price") * 
        quantity} ${$("#productPrice").attr("data-currency")}`);
    }
}

var goToCart = function(){
    let url = window.location.pathname.split("/");
    url[url.length - 1] = "cart.html";
    url = url.join("/");
    window.location.href = url;
}