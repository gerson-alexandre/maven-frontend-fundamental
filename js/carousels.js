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

   
});
//Testimonial owl carousel end

