var prices = document.querySelectorAll(".price");
var plusBtns = document.querySelectorAll(".plus");
var minusBtns = document.querySelectorAll(".minus");
var qtyValues = document.querySelectorAll(".qty");

var checkoutBtn = document.querySelector(".checkout-btn");

plusBtns.forEach(function(plusBtn,index){
    var currentPrice = parseInt(prices[index].textContent);
    plusBtn.addEventListener("click",function(){
        qtyValues[index].value = parseInt(qtyValues[index].value) + 1;
        prices[index].style.color = "red";
        
        prices[index].textContent = currentPrice * qtyValues[index].value;
    });
});

minusBtns.forEach(function(minusBtn,index){
    // var price = parseInt(prices[index].textContent);
    minusBtn.addEventListener("click",function(){
        if (qtyValues[index].value > 0){

            var currentPrice = parseInt(prices[index].textContent);
            var initialPrice = currentPrice / qtyValues[index].value;

            qtyValues[index].value = parseInt(qtyValues[index].value) - 1;
            prices[index].textContent = currentPrice - initialPrice;
            if(currentPrice == initialPrice){
                prices[index].style.color = "black";
                prices[index].textContent = initialPrice;
            };
        };
    });
});



checkoutBtn.addEventListener("click",function(){
    var cartData = [];
    var total = 0;
    var wpNumber = document.querySelector(".wp-number").value;
    var carts = document.querySelectorAll(".cart");
    carts.forEach(function(cart,index){
        var price = parseInt(prices[index].textContent);
        var name = cart.querySelector("h3").textContent;
        var qty = cart.querySelector(".qty").value;
        if (qty > 0){
            total = total + (price / qty) * qty;
            cartData.push(name + " " + price / qty + " টাকা (" + price / qty + " * " + qty + ") = " + price  + " টাকা");
        };
    });
    var cartDataWithNum = [];
    for(var i = 0; i < cartData.length ; i++){
        cartDataWithNum.push(i + 1 + "/ " + cartData[i]);
    };

    var cartText = cartDataWithNum.join("\n");
    cartText ="আপনার Whatsapp নামবার "+ wpNumber + "\n" +"\n"  + cartText + "\n = টোটাল " + total;

    // for copy text to clipboard start
    var tempTextarea = document.createElement("textarea");
    tempTextarea.value = cartText;
    document.body.appendChild(tempTextarea);
    tempTextarea.select();
    document.execCommand("copy");
    document.body.removeChild(tempTextarea);
    // for copy text to clipboard end

    alert("অর্ডার লিস্ট দোকানদারের কাছে পাঠানো হয়েছে। " + "\n " + "এবং অর্ডার লিস্ট ক্লিপবোর্ডে কপি হয়েছে:- " + "\n" + cartText);

    // for redirect to whatsapp with copied order list start 
    var whatsappLink = "https://wa.me/97450285571?text=" + encodeURIComponent(cartText);
    checkoutBtn.href = whatsappLink;
    // for redirect to whatsapp with copied order list end 
});


