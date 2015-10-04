function makeCartScrollNicely(){
    var cart = document.querySelector('.cart__content'),
        content = document.querySelector('.site__content');

    Ps.initialize(cart);
    Ps.initialize(content);

}

window.onload = function() {
    var $toggle = document.querySelector(".site__right-sidebar-toggle");
    $toggle.addEventListener("click",function() {
      document.body.classList.toggle("js-show-right-sidebar");
    });
    
    console.log("page loaded");
    makeCartScrollNicely();
};