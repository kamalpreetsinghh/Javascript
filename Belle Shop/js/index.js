$(function() {
    loadData();

    $("#openCart").on("click", function(){
        goToCart();
    });

   
});

var loadData = function(){
    let apiURL = "https://makeup-api.herokuapp.com/api/v1/products.json";
    jQuery.get(apiURL, function(data, status){
        $("#loaderDiv").hide();
        var itemDiv = "";
        for(let index = 0; index < 90; index++){
            itemDiv = `
                <div class="grid-item">
                    <img src="${data[index].image_link}" class="product-image" />
                    <h2> ${data[index].name} </h2>
                    <button type="button" id="${data[index].id}" class="btn itemDetails">View Details</button>
                </div>
            `;
            $("#cosmeticsDiv").append(itemDiv);
        }
        $(".itemDetails").on("click", function(){
            viewDetails(this);
        });
    });
}

var viewDetails = function(buttonElement) {
    localStorage.setItem("productID", $(buttonElement).attr("id"))
    let url = window.location.pathname.split("/");
    url[url.length - 1] = "itemdetail.html";
    url = url.join("/");
    window.location.href = url;
}

var goToCart = function(){
    let url = window.location.pathname.split("/");
    url[url.length - 1] = "cart.html";
    url = url.join("/");
    window.location.href = url;
}