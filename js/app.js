//Creating  a typewriter function constructor
var TxtType = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function () {

    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) {
        delta /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;

    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 350;
    }

    setTimeout(function () {
        that.tick();
    }, delta);
};


window.onload = function () {

    var elements = document.getElementsByClassName('typewrite');

    for (var i = 0; i < elements.length; i++) {

        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');

        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.1em solid #4a90e2;  animation: caret 1s steps(1) infinite;} ";
    document.body.appendChild(css);
};
//========================================================================================================================
//End of type writer
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//Data Module
var courseController = (function () {

    //creating a function constructor
    let Course = function (id, title, description, price, img) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.img = img;
    };

    //creating a function prototype for shopping cart
    let ShoppingCart = function (id, title, description, price, img, quantity) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
        this.img = img;
    };

    //creating a data structure to put all data
    let data = {

        allItem: {
            course: [],
            shoppingCart: []
        },

        totalCourses: 0,
        CartTotalItems: 0,
        priceTotal: 0
    }

    //create some initial courses to be displayed on the page
    var course1 = new Course(1, 'Become a Full Stack web Developer', "12 Weeks Course - in Classroom", 26000, "none");
    var course2 = new Course(2, 'Become a Front End Developer', '4 Weeks Course - in Classroom', 12000, "none");
    var course3 = new Course(3, 'Become a Java Spring Boot Developer', "12 Weeks Course - in Classroom", 26000, "none");

    //Push the initial courses to the course object
    data.allItem.course.push(course1);
    data.allItem.course.push(course2);
    data.allItem.course.push(course3);

    return {

        addToItemQuantity: function (item) {
            //Increment the item/ course quantity by one
            data.allItem.shoppingCart[item].quantity += 1;

            var cartData = JSON.stringify(data.allItem.shoppingCart);
            localStorage.setItem('cartData', cartData);
        },

        addToCart: function (id, title, description, price, img, inCart) {

            var newItem, cartData;

            inCart = parseInt(inCart);
            newItem = new ShoppingCart(id, title, description, price, img, inCart);
            //push the new item to the data struture
            data.allItem.shoppingCart.push(newItem);

            cartData = JSON.stringify(data.allItem.shoppingCart);
            localStorage.setItem('cartData', cartData);

            return newItem;
        },

        //Delete data from the
        deleteItemFromCart: function(id){

            let ids, index, cartData;
            
            cartData = localStorage.getItem('cartData');
            cartData = JSON.parse(cartData);

            ids =  cartData.map(function(current){
                return current.id;
            });
           
            index = ids.indexOf(id);
       
            if(index !== -1){

                cartData.splice(index, 1);
                cartData = JSON.stringify(cartData);
                localStorage.setItem('cartData', cartData);       

            } else {
                console.log(" ID of the element to be deleted  not found ");
            }

        },

        //tesing function to log data in the console
        testing: function () {
            console.log(data);
        },

        getData: function () {
            return data;
        }
    }

})();


//*********************************************************************************************************************
//UI Module
var UIController = (function () {

    let DOMString = {
        cartIcon: 'cart',
        cartHover: 'shop-cart',
        cartItem: '#table-item',
        cartListItems: '#table-item',
        msg: "#no-data-msg",
        btnEnquiry: '.btn-enquery',
        cartPage: 'cart-page',
    }
    
    return {

        //testing insert adjacent html
        addListItem: function (obj) {
            let html, newHtml, element;
            //create an html string with placehode text 
            element = DOMString.cartItem;
            html = '<tr id="cart-list-item-%id%"><th class="align-middle "scope="row "><button class="btn-sm btn-danger fa fa-trash ">  Remove</button></th><td class="align-middle">%title%  <br/>%description%</td><td class="align-middle">%price%</td><td class="align-middle">%quantity%</td><td class="align-middle">Total </td></tr>';
            //replace the placeolder text with with the actual data
            newHtml = html.replace('%title%', obj.title);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%price%', obj.price);
            newHtml = newHtml.replace('%quantity%', obj.quantity);

            //insert the html in the UI
            document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
        },

        // reomve the deleted item form the UI
        removeListItem: function(selectorID){
            var element = document.getElementById(selectorID);
            element.parentNode.removeChild(element);
        },

        getCartInput: function () {
            return {}
        },

        getDOMString: function () {
            return DOMString;
        }
    }

})();

//********************************************************************************************************************
//Global App Controller
var controller = (function (courseCtrl, UICtrl) {

    let DOM = UICtrl.getDOMString();
    var cartIcon = document.getElementById(DOM.cartIcon);
    let shoopingCart = document.getElementById(DOM.cartHover);
    let cartItem = document.querySelector(DOM.cartItem);
    let btnEnquiry =document.querySelectorAll(DOM.btnEnquiry);
    let cartPage  = document.getElementById(DOM.cartPage);

    var setupEventListener = function () {
       
        if(cartItem){
            document.querySelector(DOM.cartItem).addEventListener('click', ctrlDeleteItem);
        }
        if(cartPage){
            cartPage.addEventListener('click', onloadPopulateCartList)
            console.log('you are on the cart Page');
        }
        
        cartIcon.addEventListener('mouseover', showCartOnHover );      

        ctrlAddItemToCart();
        
    }

    var showCartOnHover = function(event){

        if (shoopingCart.style.display === 'none') {
            shoopingCart.style.display = 'block';
        } else {
            shoopingCart.style.display = 'none';
        }

    }
    
    var ctrlAddItemToCart = function(){
        var newCartItem;
           
        for (let item = 0; item < btnEnquiry.length; item ++) {

            btnEnquiry[item].addEventListener('click', function () {
                let cartItems = localStorage.getItem('cartItems');
                let data = courseCtrl.getData();

                cartItems = parseInt(cartItems);

                if (cartItems) {

                    localStorage.setItem('cartItems', cartItems + 1);
                    document.querySelector('.nav-item span').textContent = cartItems + 1;
                    totalCartCost(newCartItem);
                    //check if the course item has already been added to cart 
                    if (data.allItem.shoppingCart[item]) {
                        courseCtrl.addToItemQuantity(item);
                    } else {
                        //add the item  to cart for the first time and set the qantity to be 1
                        newCartItem = courseCtrl.addToCart(data.allItem.course[item].id, data.allItem.course[item].title, data.allItem.course[item].description, data.allItem.course[item].price, data.allItem.course[item].img, 1);
                        totalCartCost(newCartItem);
                    }

                } else {

                    localStorage.setItem('cartItems', 1);
                    document.querySelector('.nav-item span').textContent = 1;
                    newCArtItem = courseCtrl.addToCart(data.allItem.course[item].id, data.allItem.course[item].title, data.allItem.course[item].description, data.allItem.course[item].price, data.allItem.course[item].img, 1);
                    totalCartCost(newCartItem);                    
                }

            });

        }
    };

    function totalCartCost(cartItem) {

        let totalCost = localStorage.getItem('totalCost');

        if (totalCost != null) {
            totalCost = parseInt(totalCost);

        } 
    };
    
    var ctrlDeleteItem = function(event){

        let itemID, splitID, id;

        itemID = event.target.parentNode.parentNode.id;
        
        if(itemID){

            splitID = itemID.split('-');
            id = parseInt(splitID[3]);
            //delete from data structure
            courseCtrl.deleteItemFromCart(id);
            //delete from the UI
            UICtrl.removeListItem(itemID);
            //update the the total Items in the Navbar
        }
        
    };

    function onloadPopulateCartList() {

        let html, newHtml, cartData;
       
        cartData = localStorage.getItem('cartData');
        cartData = JSON.parse(cartData);

        if (cartData) {
            //loop througth the cart object and display it on the cart page
            for (item = 0; item < cartData.length; item ++) {

                html = '<tr id="cart-list-item-%id%"><th class="align-middle "scope="row "><button class="btn-sm btn-danger fa fa-trash ">  Remove</button></th><td class="align-middle">%title%  <br/>%description%</td><td class="align-middle">%price%</td><td class="align-middle">%quantity%</td><td class="align-middle">Total </td></tr>';
                //replace the placeolder text with with the actual data
                newHtml = html;
                newHtml = newHtml.replace('%id%', cartData[item].id);
                newHtml = newHtml.replace('%title%', cartData[item].title);
                newHtml = newHtml.replace('%description%', cartData[item].description);
                newHtml = newHtml.replace('%quantity%', cartData[item].quantity);
                newHtml = newHtml.replace('%price%', cartData[item].price);
                //insert the html in the UI
                document.querySelector(DOM.cartListItems).insertAdjacentHTML("beforeend", newHtml);
            }

        } else {
            //display no data msg
            html = '<div class="text-center"><h4>You have not added anything to Cart</h4></div>'
            document.querySelector(DOM.msg).insertAdjacentHTML("beforeend", html);
        }

    }

    function OnloadCartItems() {

        var cartTotal = localStorage.getItem('cartItems');

        if (cartTotal) {
            document.querySelector('.nav-item span').textContent = cartTotal;
        }
    }

    return {
        init: function () {
            console.log("Application has started");
            setupEventListener();
            OnloadCartItems();
            //onloadPopulateCartList();
        }
    }

})(courseController, UIController);

controller.init();