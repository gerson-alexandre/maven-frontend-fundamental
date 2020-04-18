$(document).ready(function() {
    //courses owl carousel start
    var coursesCarousel = $("#owl-courses");
    //custom  settings for courses'  owl carousel 
    coursesCarousel.owlCarousel({
        responsive:{
        0:{
            items:1
        },
        600:{
            items:2
        },
        1000:{
            items:3
        }
    },
        navigation : true,
        autoplay:true,
        autoplayTimeout:8000,
        autoplaySpeed:800,
        autoplayHouverPause:true,
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
        stahge: 0,
        dots:false,
        autoplay:true,
        autoplayTimeout:8000,
        autoplaySpeed:800,
        autoplayHouverPause:true,
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

