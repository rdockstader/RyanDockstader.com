$(document).ready(function() {
    
    /* STICKY NAVIGATION */
    $('.js--section-education').waypoint(function(direction) {
        if(direction == "down") {
            $('nav').addClass("sticky");
        } else {
            $('nav').removeClass("sticky");
        }
    }, {
        offset: "150px;"
    });
    
    /* SCROLL ON BUTTONS */
    $(".js--scroll-to-start").click(function() {
       $('html, body').animate({scrollTop: $('.js--section-education').offset().top}, 1000)
    });
    
    /* NAVIGATION SCROLL */
    $('a[href*="#"]:not(.modal-link)')
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function(event) {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    event.preventDefault();
                    $('html, body').animate({scrollTop: target.offset().top }, 1000, function() {
                        var $target = $(target);
                        $target.focus();
                        if ($target.is(":focus")) {
                            return false;
                        } else {
                            $target.attr('tabindex','-1');
                            $target.focus();
                        };
                    });
                }
            }
        });
    
    /* ANIMATIONS ON SCROLL */
    $('#pixel-div').waypoint(function(direction){
        //console.log("got here");
        $('#pixel-div').addClass('animated fadeInRight');
    }, {
        offset: '50%'
    });
    $('#headshot-div').waypoint(function(direction){
        //console.log("got here");
        $('#headshot-div').addClass('animated fadeInLeft');
    }, {
        offset: '70%'
    });

    
    /* MOBILE NAVIGATION */
    $(".js--nav-icon").click(function() {
        var nav = $('.js--main-nav');
        var icon = $(".js--nav-icon i");
        
        nav.slideToggle(200);
        if (icon.hasClass('ion-navicon-round')) {
            icon.addClass('ion-close-round');
            icon.removeClass('ion-navicon-round');
            nav.addClass('main-nav-expanded')
        } else {
            icon.removeClass('ion-close-round');
            icon.addClass('ion-navicon-round');
            nav.removeClass('main-nav-expanded')
        }
    });
});





