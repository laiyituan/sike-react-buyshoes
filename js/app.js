function makeCartScrollNicely(){
    var cart = document.querySelector('.cart__content'),
        content = document.querySelector('.site__content');

    Ps.initialize(cart);
    Ps.initialize(content);

}

window.onload = function() {
  console.log("page loaded");
  makeCartScrollNicely();
};