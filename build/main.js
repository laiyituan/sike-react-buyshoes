// Thw app component
"use strict";

var productsData = {
    "jameson-vulc": {
        id: "jameson-vulc",
        name: "Jameson Vulc",
        price: 64.99,
        imagePath: "img/shoes/jameson-vulc-brown-gum-orig.png",
        gender: "man"
    },

    "marana-x-hook-ups": {
        id: "marana-x-hook-ups",
        name: "Marana X Hook-Up",
        price: 79.99,
        imagePath: "img/shoes/marana-x-hook-ups-black-orig.png",
        gender: "man"
    },

    "jameson-e-lite": {
        id: "jameson-e-lite",
        name: "Jameson E-Lite",
        price: 69.99,
        imagePath: "img/shoes/jameson-e-lite-maroon-orig.png",
        gender: "man"
    },

    "jameson-e-lite-julian-davidson-4": {
        id: "jameson-e-lite-julian-davidson-4",
        name: "Jameson E-Lite Julian Davidson",
        price: 74.99,
        imagePath: "img/shoes/jameson-e-lite-julian-davidson-4-black-gum-orig.png",
        gender: "man"
    },

    "scout-womens-6": {
        id: "scout-womens-6",
        name: "Scout Women's",
        imagePath: "img/shoes/scout-womens-6-teal-orig.png",
        price: 59.99,
        gender: "woman"
    },

    "scout-womens-coco-ho-5": {
        id: "scout-womens-coco-ho-5",
        name: "Scout Women's Coco Ho",
        imagePath: "img/shoes/scout-womens-coco-ho-5-olive-white-orig.png",
        price: 59.99,
        gender: "woman"
    },

    "jameson-2-womens-8": {
        id: "jameson-2-womens-8",
        name: "Jameson 2 Women's",
        imagePath: "img/shoes/jameson-2-womens-8-black-white-gum-orig.png",
        price: 59.99,
        gender: "woman"
    },

    "corby-womens-2": {
        id: "corby-womens-2",
        name: "Corby Women's",
        imagePath: "img/shoes/corby-womens-2-tan-white-orig.png",
        price: 44.99,
        gender: "woman"
    }
};

var cartItemsData = {
    "jameson-vulc": {
        id: "jameson-vulc",
        quantity: 1
    },

    "scout-womens-6": {
        id: "scout-womens-6",
        quantity: 2
    }
};

var App = React.createClass({
    displayName: "App",

    componentDidMount: function componentDidMount() {
        var toggle = React.findDOMNode(this.refs.toggle);

        toggle.addEventListener("click", function () {
            document.body.classList.toggle("js-show-right-sidebar");
        });
    },
    render: function render() {
        return React.createElement(
            "div",
            { className: "site" },
            React.createElement(
                "div",
                { className: "site__main" },
                React.createElement(
                    "div",
                    { className: "site__left-sidebar" },
                    React.createElement(SiteTitle, null)
                ),
                React.createElement(
                    "div",
                    { className: "site__content" },
                    React.createElement(Products, null)
                )
            ),
            React.createElement(
                "div",
                { className: "site__right-sidebar" },
                React.createElement(Cart, null),
                React.createElement(Checkout, null),
                React.createElement(
                    "a",
                    { className: "site__right-sidebar-toggle", ref: "toggle" },
                    React.createElement("img", { src: "img/arrow-icon.svg" })
                )
            )
        );
    }
});

var SiteTitle = React.createClass({
    displayName: "SiteTitle",

    render: function render() {
        return React.createElement(
            "h2",
            { className: "site__heading" },
            "Buy Some Shoes"
        );
    }
});

var Product = React.createClass({
    displayName: "Product",

    buildCartOpt: function buildCartOpt() {
        var id = this.props.product.id;
        if (cartItemsData[id]) {
            return React.createElement(QuantityContorl, { item: cartItemsData[id], variant: "gray" });
        } else {
            return React.createElement(
                "a",
                { href: "#", className: "product__add" },
                React.createElement("img", { src: "img/cart-icon.svg", alt: true, className: "product__add__icon" })
            );
        }
    },
    render: function render() {
        var _props$product = this.props.product;
        var name = _props$product.name;
        var price = _props$product.price;
        var imagePath = _props$product.imagePath;

        return React.createElement(
            "div",
            { className: "product" },
            React.createElement(
                "div",
                { className: "product__display" },
                React.createElement("img", { src: imagePath, alt: name, className: "product__img" }),
                this.buildCartOpt(),
                React.createElement(
                    "div",
                    { className: "product__price" },
                    price
                )
            ),
            React.createElement(
                "div",
                { className: "product__description" },
                React.createElement(
                    "div",
                    { className: "product__name" },
                    name
                ),
                React.createElement("img", { src: "img/heart.svg", alt: true, className: "product__heart" })
            )
        );
    }
});

var Products = React.createClass({
    displayName: "Products",

    render: function render() {
        var products = [];

        for (var productId in productsData) {
            var product = productsData[productId];
            products.push(React.createElement(Product, {
                product: product,
                key: productId
            }));
        }

        return React.createElement(
            "div",
            { className: "products" },
            products
        );
    }
});

var QuantityContorl = React.createClass({
    displayName: "QuantityContorl",

    render: function render() {
        var _props$item = this.props.item;
        var id = _props$item.id;
        var quantity = _props$item.quantity;
        var variant = this.props.variant;

        var className = 'adjust-qty ' + (variant ? 'adjust-qty--' + variant : '');

        return React.createElement(
            "div",
            { className: className },
            React.createElement(
                "a",
                { className: "adjust-qty__button" },
                "-"
            ),
            React.createElement(
                "div",
                { className: "adjust-qty__number" },
                quantity
            ),
            React.createElement(
                "a",
                { className: "adjust-qty__button" },
                "+"
            )
        );
    }
});

var CartItem = React.createClass({
    displayName: "CartItem",

    render: function render() {
        var _props$cartItem = this.props.cartItem;
        var id = _props$cartItem.id;
        var quantity = _props$cartItem.quantity;
        var productProp = productsData[id];
        var name = productProp.name;
        var price = productProp.price;
        var imagePath = productProp.imagePath;

        return React.createElement(
            "div",
            { className: "cart-item" },
            React.createElement(
                "div",
                { className: "cart-item__top-part" },
                React.createElement(
                    "div",
                    { className: "cart-item__image" },
                    React.createElement("img", { src: imagePath })
                ),
                React.createElement(
                    "div",
                    { className: "cart-item__top-part__middle" },
                    React.createElement(
                        "div",
                        { className: "cart-item__title" },
                        name
                    ),
                    React.createElement(
                        "div",
                        { className: "cart-item__price" },
                        price + (quantity <= 1 ? '' : ' x ' + quantity)
                    )
                ),
                React.createElement("img", { className: "cart-item__trash", src: "img/trash-icon.svg" })
            ),
            React.createElement(
                "div",
                { className: "cart-item__qty" },
                React.createElement(QuantityContorl, { item: this.props.cartItem })
            )
        );
    }
});

var Cart = React.createClass({
    displayName: "Cart",

    componentDidMount: function componentDidMount() {
        var content = React.findDOMNode(this.refs.content);
        Ps.initialize(content);
    },
    render: function render() {
        var cartItems = [];

        for (var itemId in cartItemsData) {
            var item = cartItemsData[itemId];

            cartItems.push(React.createElement(CartItem, {
                cartItem: item,
                key: itemId
            }));
        }

        return React.createElement(
            "div",
            { className: "cart" },
            React.createElement(
                "h3",
                { className: "cart__title" },
                "Shopping Cart"
            ),
            React.createElement(
                "div",
                { className: "cart__content", ref: "content" },
                cartItems
            )
        );
    }
});

var Checkout = React.createClass({
    displayName: "Checkout",

    render: function render() {
        var subtotal = 0;

        for (var itemId in cartItemsData) {
            var item = cartItemsData[itemId];

            subtotal += productsData[item.id].price;
        }

        return React.createElement(
            "div",
            { className: "checkout" },
            React.createElement("hr", { className: "checkout__divider" }),
            React.createElement("input", { type: "text", className: "checkout__coupon-input", placeholder: "coupon code" }),
            React.createElement(
                "dl",
                { className: "checkout__amounts" },
                React.createElement(
                    "dt",
                    { className: "checkout__amount-title" },
                    React.createElement(
                        "strong",
                        null,
                        "Subtotal"
                    )
                ),
                React.createElement(
                    "dd",
                    { className: "checkout__amount-content" },
                    React.createElement(
                        "span",
                        { className: "checkout__amount" },
                        '$' + subtotal.toFixed(2)
                    )
                )
            ),
            React.createElement(
                "a",
                { href: "#", className: "checkout__btn" },
                React.createElement("img", { src: "img/cart-icon.svg", className: "checkout__cart-icon" }),
                React.createElement(
                    "span",
                    { className: "checkout__btn-text" },
                    "Checkout"
                )
            )
        );
    }
});

window.onload = function () {
    React.render(React.createElement(App, null), document.body);
};
/* cart-item__top-part */ /*<p className="checkout__coupon-msg">No such coupon code!</p> */ /*<dt className="checkout__amount-title">
                                                                                               Discount
                                                                                            </dt>
                                                                                            <dd className="checkout__amount-content">
                                                                                               <span className="checkout__amount">-%90.02</span>
                                                                                            </dd>*/ /*<span className="checkout__amount checkout__amount--strikeout">$450.12</span>
                                                                                                    <span className="checkout__amount checkout__amount--saving">$360.09</span>/*/
