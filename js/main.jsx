// Thw app component
let productsData = {
    "jameson-vulc": {
        id: "jameson-vulc",
        name: "Jameson Vulc",
        price: 64.99,
        imagePath: "img/shoes/jameson-vulc-brown-gum-orig.png",
        gender: "man",
    },

    "marana-x-hook-ups": {
        id: "marana-x-hook-ups",
        name: "Marana X Hook-Up",
        price: 79.99,
        imagePath: "img/shoes/marana-x-hook-ups-black-orig.png",
        gender: "man",
    },

    "jameson-e-lite": {
        id: "jameson-e-lite",
        name: "Jameson E-Lite",
        price: 69.99,
        imagePath: "img/shoes/jameson-e-lite-maroon-orig.png",
        gender: "man",
    },

    "jameson-e-lite-julian-davidson-4": {
        id: "jameson-e-lite-julian-davidson-4",
        name: "Jameson E-Lite Julian Davidson",
        price: 74.99,
        imagePath: "img/shoes/jameson-e-lite-julian-davidson-4-black-gum-orig.png",
        gender: "man",
    },

    "scout-womens-6": {
        id: "scout-womens-6",
        name: "Scout Women's",
        imagePath: "img/shoes/scout-womens-6-teal-orig.png",
        price: 59.99,
        gender: "woman",
    },

    "scout-womens-coco-ho-5": {
        id: "scout-womens-coco-ho-5",
        name: "Scout Women's Coco Ho",
        imagePath: "img/shoes/scout-womens-coco-ho-5-olive-white-orig.png",
        price: 59.99,
        gender: "woman",
    },

    "jameson-2-womens-8": {
        id: "jameson-2-womens-8",
        name: "Jameson 2 Women's",
        imagePath: "img/shoes/jameson-2-womens-8-black-white-gum-orig.png",
        price: 59.99,
        gender: "woman",
    },

    "corby-womens-2": {
        id: "corby-womens-2",
        name: "Corby Women's",
        imagePath: "img/shoes/corby-womens-2-tan-white-orig.png",
        price: 44.99,
        gender: "woman",
    },
};

let cartItemsData = {
    "jameson-vulc": {
        id: "jameson-vulc",
        quantity: 1,
    },

    "scout-womens-6": {
        id: "scout-womens-6",
        quantity: 2,
    },
};

let App = React.createClass({
    componentDidMount() {
        var toggle = React.findDOMNode(this.refs.toggle);

        toggle.addEventListener("click",function() {
          document.body.classList.toggle("js-show-right-sidebar");
        });
    },
    render() {
        return (
            <div className="site">
                <div className="site__main">
                    <div className="site__left-sidebar">
                        <SiteTitle />
                    </div>

                    <div className="site__content">
                        <Products />
                    </div>
                </div>

                <div className="site__right-sidebar">
                    <Cart />
                    <Checkout />

                    <a className="site__right-sidebar-toggle" ref="toggle">
                        <img src="img/arrow-icon.svg"/>
                    </a>
                </div>
            </div>
        );
    }
});

let SiteTitle = React.createClass({
    render() {
        return (
            <h2 className="site__heading">Buy Some Shoes</h2>
        );
    }
});

let Product = React.createClass({
    buildCartOpt() {
        var id = this.props.product.id;
        if(cartItemsData[id]){
            return (
                <QuantityContorl item={cartItemsData[id]} variant="gray" />
            );
        }else{
            return (
                <a href="#" className="product__add"><img src="img/cart-icon.svg" alt className="product__add__icon" /></a>
            );
        }
    },
    render() {
        let {name, price, imagePath} = this.props.product;

        return (
            <div className="product">
                <div className="product__display">
                    <img src={imagePath} alt={name} className="product__img" />
                    {this.buildCartOpt()}
                    <div className="product__price">{price}</div>
                </div>
                <div className="product__description">
                    <div className="product__name">{name}</div>
                    <img src="img/heart.svg" alt className="product__heart" />
                </div>
             </div>
        );
    }
});

let Products = React.createClass({
    render() {
        var products = [];

        for(let productId in productsData){
            let product = productsData[productId];
            products.push(
                <Product
                    product={product}
                    key={productId}
                />
            );
        }

        return (
            <div className="products">
                {products}
            </div>
        );
    }
});

let QuantityContorl = React.createClass({
    render() {
        let {id, quantity} = this.props.item,
            variant = this.props.variant;

        let className = 'adjust-qty ' + (variant ? 'adjust-qty--' + variant : '');

        return (
            <div className={className}>
                <a className="adjust-qty__button">-</a>
                <div className="adjust-qty__number">{quantity}</div>
                <a className="adjust-qty__button">+</a>
            </div>
        );
    }
});

let CartItem = React.createClass({
    render() {
        let {id, quantity} = this.props.cartItem,
            productProp = productsData[id],
            {name, price, imagePath} = productProp;

        return (
            <div className="cart-item">
                <div className="cart-item__top-part">
                    <div className="cart-item__image">
                        <img src={imagePath} />
                    </div>
                    <div className="cart-item__top-part__middle">
                        <div className="cart-item__title">
                            {name}
                        </div>
                        <div className="cart-item__price">
                            {price + (quantity <= 1 ? '' : ' x ' + quantity)}
                        </div>
                    </div>
                    <img className="cart-item__trash" src="img/trash-icon.svg" />
                </div>{/* cart-item__top-part */}
                <div className="cart-item__qty">
                    <QuantityContorl item={this.props.cartItem} />
                </div>
            </div>
        );
    }
});

let Cart = React.createClass({
    componentDidMount() {
        let content = React.findDOMNode(this.refs.content);
        Ps.initialize(content);
    },
    render() {
        var cartItems = [];

        for(let itemId in cartItemsData){
            let item = cartItemsData[itemId];

            cartItems.push(
                <CartItem
                    cartItem={item}
                    key={itemId}
                />
            );
        }

        return (
            <div className="cart">
                <h3 className="cart__title">Shopping Cart</h3>
                <div className="cart__content" ref="content">
                    {cartItems}
                </div>
            </div>
        );
    }
});

let Checkout = React.createClass({
    render() {
        var subtotal = 0;

        for(let itemId in cartItemsData){
            let item = cartItemsData[itemId];

            subtotal += productsData[item.id].price;
        }

        return (
            <div className="checkout">
                <hr className="checkout__divider" />
                <input type="text" className="checkout__coupon-input" placeholder="coupon code" />
                {/*<p className="checkout__coupon-msg">No such coupon code!</p> */}
                <dl className="checkout__amounts">
                    {/*<dt className="checkout__amount-title">
                        Discount
                    </dt>
                    <dd className="checkout__amount-content">
                        <span className="checkout__amount">-%90.02</span>
                    </dd>*/}
                    <dt className="checkout__amount-title">
                        <strong>Subtotal</strong>
                    </dt>
                    <dd className="checkout__amount-content">
                        <span className="checkout__amount">{'$' + subtotal.toFixed(2)}</span>
                        {/*<span className="checkout__amount checkout__amount--strikeout">$450.12</span>
                        <span className="checkout__amount checkout__amount--saving">$360.09</span>/*/}
                    </dd>
                </dl>
                <a href="#" className="checkout__btn">
                    <img src="img/cart-icon.svg" className="checkout__cart-icon" />
                    <span className="checkout__btn-text">Checkout</span>
                </a>
            </div>
        );
    }
});

window.onload = () => {
    React.render(<App/>, document.body);
};