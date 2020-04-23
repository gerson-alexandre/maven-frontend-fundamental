$(document).ready(function() {
    //courses owl carousel start
    var coursesCarousel = $("#owl-courses");
    //custom  settings for courses'  owl carousel 
    coursesCarousel.owlCarousel({
        responsive:{
        0:{
            items:1
        },
        678:{
            items:2
        },
        991:{
            items:3
        }
    },
        navigation : true,
        loop:true,
        autoplay:true,
        autoplayTimeout:8000,
        autoplaySpeed:800,
        autoplayHouverPause:true,
        dots:false,
        autoWidth:false,
        animateIn: true,
        padding:40

    });
    
    //Next course naviagation 
    $('.next-course').click(function() {
        coursesCarousel.trigger('next.owl.carousel');
    });
    //courses owl carousel end
    //*********************************************************************************

    //Testimonial owl carousel start
    var testimonialCarousel = $('.testimonial-carousel');
            
    $('.testimonial-carousel').owlCarousel({
        loop:true,
        margin:10,
        responsiveClass:true,
        items:1,
        center: true,
        dots:false,
        autoplay:true,
        autoplayTimeout:8000,
        autoplaySpeed:800,
        autoplayHouverPause:true,
        autoWidth:false,
        nav:false,
        responsive:{
            0:{
                items:1
            },
            500:{
                items:1
            },
            1000:{
                items:1
            }
        }
    })

    //Next testimony navegatiom  
    $('.next-testimony').click(function() {
        testimonialCarousel.trigger('next.owl.carousel');

    });
     //Testimonial owl carousel end
    //********************************************************************************* 

   
});
//Testimonial owl carousel end

