
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
    //Store all the DOM strings 
    let DOMString = {
      
    }

    return {

        getDOMString: function(){
            return DOMString;
        }
    }

})();



//********************************************************************************************************************
//Global App Controller
var controller = (function (courseCtrl, UICtrl ){
  
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

    }

    return {
        init: function(){
            console.log("Application has started");
            setupEventListener();
        }
    }

})(courseController, UIController);

controller.init();
