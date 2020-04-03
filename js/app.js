
//Creating  a typewriter function constructor
var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;

    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 350;
    }

    setTimeout(function() {
        that.tick();
    }, delta);
};


window.onload = function() {
    
    var elements = document.getElementsByClassName('typewrite');
    
    for (var i=0; i<elements.length; i++) {
        
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
var courseController = (function(){

    //creating a function constructor
    let Course = function(id, title, description, price, img){
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.img = img;
    };
    
    //creating a function prototype for shopping cart
    let ShoppingCart = function(id, title, description, price, img, quantity){
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
        this.img = img;
    };

    //creating a data structure to put all data
    let data = {

        allItem:{
            course: [],
            shoppingCart: []
        },

        totalCourses: 0,
        CartTotalItems: 0,
        priceTotal: 0
    }
   
    //create some initial courses to be displayed on the page
    var course1 = new Course(1, 'Become a Full Stack web Developer', "12 Weeks Course - in Classroom", 26000,"none");
    var course2 = new Course(2, 'Become a Front End Developer', '4 Weeks Course - in Classroom', 12000,"none");
    var course3 = new Course(3, 'Become a Java Spring Boot Developer', "12 Weeks Course - in Classroom", 26000,"none");

    //Push the initial courses to the course object
    data.allItem.course.push(course1);
    data.allItem.course.push(course2);
    data.allItem.course.push(course3);
   
    return {
        
        addToItemQuantity: function(item){
            //Increment the item/ course quantity by one
            data.allItem.shoppingCart[item].quantity += 1;
        },

        addToCart: function(id, title, description, price, img, inCart){

            var newItem;
            inCart = parseInt(inCart);
            newItem = new ShoppingCart(id, title, description, price, img, inCart);
            //push the new item to the data struture
            data.allItem.shoppingCart.push(newItem);   
           
            return newItem;
        },
        //tesing function to log data in the console
        testing: function(){
            console.log(data);
        },
        
        getData: function(){
            return data;
        }
    }

})();


//*********************************************************************************************************************
//UI Module
var UIController = (function(){

    let DOMString = {
        tableItem: '#table-item'
    }

    return {
        
        //testing insert adjacent html
        addListItem: function(obj){
            let html, newHtml, element;
            //create an html string with placehode text 
            element = DOMString.tableItem;
            html  = '<tr id="item_1"><th scope="row"></th><td class="align-middle">%title%  <br/>%description%</td><td class="align-middle">%price%</td><td class="align-middle">%quantity%</td><td class="align-middle">Total </td></tr>'
            //replace the placeolder text with with the actual data
            newHtml  = html.replace('%title%', obj.title);
            newHtml  = newHtml.replace('%description%', obj.description);
            newHtml  = newHtml.replace('%price%', obj.price);
            newHtml  = newHtml.replace('%quantity%', obj.quantity);
           
            //insert the html in the UI
            document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
        },

        getCartInput: function(){
            return{
            }
        },

        getDOMString: function(){
            return DOMString;
        }
    }

})();

//********************************************************************************************************************
//Global App Controller
var controller = (function (courseCtrl, UICtrl ){

    let btnEnquiry = document.querySelectorAll('.btn-enquery');
    var cart = document.getElementById('cart');
    let shoopingCart = document.getElementById('shop-cart');
    
    var setupEventListener = function(){
       
       
        //show  shopping cart on mousehover
        cart.addEventListener('mouseover', function(event){
            event.preventDefault();
            
            if(shoopingCart.style.display === 'none'){
               
                shoopingCart.style.display ='block';
           
            } else {
               
                shoopingCart.style.display ='none';
           
            }
          
        });

        //Calcualate the total Cost of the items in the cart                     
        function totalCartCost(cartItem){
            
            let totalCost = localStorage.getItem('totalCost');
        
            if(totalCost != null){
                totalCost =  parseInt(totalCost);
          
            }else {
              
            }
        };

       function addItemToCart(){
            
            var newCArtItem, cartData;
            //loop to get the the index of the clicked button
            for(let item = 0; item < btnEnquiry.length; item ++){
                
                btnEnquiry[item].addEventListener('click', function(){
                
                    var cartTotal = localStorage.getItem('cartItems');
                    let data = courseCtrl.getData();
                    cartTotal = parseInt(cartTotal);
                
                    if(cartTotal) {

                        localStorage.setItem('cartItems', cartTotal + 1);
                        document.querySelector('.nav-item span').textContent = cartTotal + 1;
                        totalCartCost(newCArtItem);
                        //check if the course item has already been added to cart 
                        if(data.allItem.shoppingCart[item]){
                            courseCtrl.addToItemQuantity(item);
                        } else {
                            //add the item  to cart for the first time and set the qantity to be 1
                            newCArtItem = courseCtrl.addToCart(data.allItem.course[item].id, data.allItem.course[item].title, data.allItem.course[item].description, data.allItem.course[item].price, data.allItem.course[item].img,  1 );
                            totalCartCost(newCArtItem);
                            UICtrl.addListItem(newCArtItem);
                        }

                    } else {        

                        localStorage.setItem('cartItems', 1 );
                        document.querySelector('.nav-item span').textContent = 1;
                        newCArtItem = courseCtrl.addToCart(data.allItem.course[item].id, data.allItem.course[item].title, data.allItem.course[item].description, data.allItem.course[item].price, data.allItem.course[item].img,  1 );
                        totalCartCost(newCArtItem);
                        UICtrl.addListItem(newCArtItem);

                    }

                    cartData  = JSON.stringify(data.allItem.shoppingCart);
                    localStorage.setItem('cartData',cartData);
                     
                });
               
            }
       };

       addItemToCart();
    }

    function onloadPopulateCartList(){
       
        var cartData = localStorage.getItem('cartData');
        cartData = JSON.parse(cartData);
      
        if(cartData){

            console.log(cartData);

            for(item =0; item < cartData.length; item ++){
                console.log("THere is something in the shooping Cart");
             
                let field = cartData.map(({ title }) => title);
                console.log(field);
            }

        } else {

            console.log("There is nothing in the shopping Cart");
            
        }
    }

    function OnloadCartItems(){

        var cartTotal = localStorage.getItem('cartItems');
        
        if(cartTotal){
            document.querySelector('.nav-item span').textContent = cartTotal;
        }
    }

    return {
        init: function(){
            console.log("Application has started");
            setupEventListener();
            OnloadCartItems();
            onloadPopulateCartList();
        }
    }

})(courseController, UIController);

controller.init();
