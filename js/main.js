/*=========================================================================

Template Name: HARPY - Personal Portfolio Template
Author: PhyDev
Author Link: https://themeforest.net/user/phydev;
Version: 1.0
Design and Developed by: PhyDev

NOTE: This is the custom javascript file for the template

=========================================================================*/

$(function(){
"use strict";

  // Define Some Elements
  	var allWindow = $(window),
        body = $('body'),
        top = allWindow.scrollTop(),
        sideNav = $(".sideNav"),
        navList = $(".nav-list");

        body.append('<div class="color-scheme-panel-con effect"><a href="#" id="color-scheme-btn" class="btn-s main-color-bg"><i class="fa fa-cogs"></i></a><div class="color-scheme-panel"><h2 class="color-scheme-title">CHOOSE TEMPLATE COLOR</h2><ul class="scheme-colors">  <li class="btn-s"><a href="#" class="color-scheme-gold-bg color-scheme-gold change-color"></a></li>  <li class="btn-s"><a href="#" class="color-scheme-reds-bg color-scheme-reds change-color"></a></li> <li class="btn-s"><a href="#" class="color-scheme-green-bg color-scheme-green change-color"></a></li> <li class="btn-s"><a href="#" class="color-scheme-blue-bg color-scheme-blue change-color"></a></li> <li class="btn-s"><a href="#" class="color-scheme-purplin-bg color-scheme-purplin change-color"></a></li> <li class="btn-s"><a href="#" class="color-scheme-vine-bg color-scheme-vine change-color"></a></li>  <li class="btn-s"><a href="#" class="color-scheme-orange-bg color-scheme-orange change-color"></a></li>  <li class="btn-s"><a href="#" class="color-scheme-aqua-bg color-scheme-aqua change-color"></a></li>  <li class="btn-s"><a href="#" class="color-scheme-netflix-bg color-scheme-netflix change-color"></a></li>  <li class="btn-s"><a href="#" class="color-scheme-pink-bg color-scheme-pink change-color"></a></li>  <li class="btn-s"><a href="#" class="color-scheme-dark-bg color-scheme-dark change-color"></a></li>  <li class="btn-s"><a href="#" class="color-scheme-water-bg color-scheme-water change-color"></a></li>  </ul><p>You can also create your own color scheme in a Second.</p></div></div>');

/*------------------------------------------------
  Javascript Function for The Preloader
--------------------------------------------------*/

    allWindow.on("load", function() {

        var preloader = $('.loader-con');

        preloader.fadeOut('slow');
        allWindow.scrollTop(0);
    });

/*-----------------------------------------------------
  Javascript Function To check Aniamtion support
-------------------------------------------------------*/

    var animation = false,
    animationstring = 'animation',
    keyframeprefix = '',
    domPrefixes = 'Webkit Moz O ms Khtml'.split(' '),
    pfx  = '',
    elm = document.createElement('div');

    if( elm.style.animationName !== undefined ) { animation = true; }

    if( animation === false ) {
      for( var i = 0; i < domPrefixes.length; i++ ) {
        if( elm.style[ domPrefixes[i] + 'AnimationName' ] !== undefined ) {
          pfx = domPrefixes[ i ];
          animationstring = pfx + 'Animation';
          keyframeprefix = '-' + pfx.toLowerCase() + '-';
          animation = true;
          break;
        }
      }
    }


/*----------------------------------------------------------------------
  Javascript Function For SMOOTH SCROLLING
-----------------------------------------------------------------------*/

      // Select all links with hashes
      $('a.scroll').on('click', function(event) {
          // On-page links
          if ( location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname ) {
            // Figure out element to scroll to
            var target = $(this.hash),
                speed= $(this).data("speed") || 800;
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

            // Does a scroll target exist?
            if (target.length) {
              // Only prevent default if animation is actually gonna happen
              event.preventDefault();
              $('html, body').animate({
                scrollTop: target.offset().top + 4
              }, speed);
            }
          }
      });


/*----------------------------------------------------------------
  Javascript Function For Change active Class on navigation bar
-----------------------------------------------------------------*/

    var sections = $('section');

    // Define ChangeClass Function
    function ChangeClass() {

      top = allWindow.scrollTop();

        $.each(sections, function(i,val) {

          var section = $(this),
              section_top = section.offset().top,
              bottom = section_top + section.height();

            if (top >= section_top && top <= bottom) {

              var naItems = navList.find('li');

              $.each(naItems ,function(i,val) {
                var item = $(this);
                item.removeClass("active");
              });

              navList.find('li [href="#' + section.attr('id') + '"]').closest('li').addClass('active');
            }

        });

    } // End of ChangeClass Function


/*--------------------------------------------
  Javascript Function FOR SIDENAV MENU
--------------------------------------------*/

    var navBarOpenBtn = $(".sideNav-btn");

    function removeClasses() {
      body.removeClass("sideNav-open");
      $( ".after-menu-nav" ).remove();
    }

    navBarOpenBtn.on('click',function (e) {

      e.preventDefault();
      body.addClass("sideNav-open");
      sideNav.after("<div class='after-menu-nav'></div>");
      
    });

    var sideNavLinks = navList.find("a.scroll");
    $.each( sideNavLinks, function( i, val ) {

      $(this).on("click", function(e) { removeClasses(); });

    });

    $(document).on('click', function(e) {

      var condition = body.hasClass('sideNav-open') && !navBarOpenBtn.is(e.target) && !sideNav.is(e.target) && navBarOpenBtn.has(e.target).length === 0 && sideNav.has(e.target).length === 0 ;
      if ( condition ) { removeClasses(); }

    });


/*---------------------------------------------------
  Javascript Function FOR PARALLAX EFFECT
---------------------------------------------------*/

    // create variables
    var backgrounds = $('.parallax');

    function parallax() {

      // for each of background parallax element
      $.each( backgrounds, function( i, val ) {

        var backgroundObj = $(this),
          backgroundObjTop = backgroundObj.offset().top,
          backgroundHeight = backgroundObj.height();

        // update positions
        top = allWindow.scrollTop();

          var yPos = ((top - backgroundObjTop))/2;

          if ( yPos <= backgroundHeight + backgroundObjTop ) {
            backgroundObj.css({
              backgroundPosition: '50% ' + yPos + 'px'
            });
          }
        
      });
    };


/*-----------------------------------------------------
  Javascript for initialize text Typer
-------------------------------------------------------*/
    
    // initialize text Typer Only in Modern browsers
    if (animation) {

      var text = $('#home .typer-title'),
          textOne = "i'm ui/ux designer",
          textTwo = "let's work together",
          textThree = "i can create awesome stuff";

          if (!!$.prototype.typer) {
            text.typer([textOne,textTwo,textThree]);
          }
    }
    

/*----------------------------------------------------------------------
 Javascript Function Initialize Particules
-----------------------------------------------------------------------*/

    if ( typeof particlesJS !== "undefined") {

      //Function to convert hex format to a rgb color
      function rgb2hex(rgb) {
        rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
        return (rgb && rgb.length === 4) ? "#" +
        ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
      }

      var particlesColor = $(".main-color").css("color"),
        particlesColorHex = rgb2hex(particlesColor);
        
      particlesJS('particles-js',
      
        {
          "particles": {
            "number": {
              "value": 80,
              "density": {
                "enable": true,
                "value_area": 600
              }
            },
            "color": {
              "value": particlesColorHex,
            },
            "shape": {
              "type": "circle",
              "stroke": {
                "width": 0,
                "color": "#888"
              },
              "polygon": {
                "nb_sides": 5
              },
              "image": {
                "src": "img/github.svg",
                "width": 100,
                "height": 100
              }
            },
            "opacity": {
              "value": 0.7,
              "random": false,
              "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
              }
            },
            "size": {
              "value": 4,
              "random": true,
              "anim": {
                "enable": false,
                "speed": 40,
                "size_min": 0.1,
                "sync": false
              }
            },
            "line_linked": {
              "enable": true,
              "distance": 150,
              "color": "#888",
              "opacity": 0.4,
              "width": 1
            },
            "move": {
              "enable": true,
              "speed": 5,
              "direction": "bottom",
              "random": false,
              "straight": false,
              "out_mode": "out",
              "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
              }
            }
          },
          "interactivity": {
            "detect_on": "canvas",
            "events": {
              "onhover": {
                "enable": true,
                "mode": "repulse"
              },
              "onclick": {
                "enable": true,
                "mode": "push"
              },
              "resize": true
            },
            "modes": {
              "grab": {
                "distance": 400,
                "line_linked": {
                  "opacity": 1
                }
              },
              "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
              },
              "repulse": {
                "distance": 200
              },
              "push": {
                "particles_nb": 4
              },
              "remove": {
                "particles_nb": 2
              }
            }
          },
          "retina_detect": true,
          "config_demo": {
            "hide_card": false,
            "background_color": "#b61924",
            "background_image": "",
            "background_position": "50% 50%",
            "background_repeat": "no-repeat",
            "background_size": "cover"
          }
        }

      );
    }

    
/*-----------------------------------------------------
  Javascript Function for Animate Carts when scrolling
-----------------------------------------------------*/
  
    var carts = $(".animate-on-scroll");

    function animateCarts() {

      $.each(carts, function(i,val) {

        var cart = $(this),
            calssName = cart.data("animation");

        // Hide elements only if animations are Supported
        if (animation && !cart.hasClass(calssName)) {

          cart.css("opacity",0);

          var CartTop = cart.offset().top,
              bar = allWindow.scrollTop(),
              winH = allWindow.height() - 100;

          if (bar >= CartTop - winH) {

            cart.addClass(calssName);
            setTimeout(function() { cart.css("opacity",1); }, 1000);

          }
        }
      });
    }  // End of animateCarts Function 


/*-----------------------------------------------------------------
  Javascript Function for Count To And PROGRESS BAR LINES  SCRIPT
------------------------------------------------------------------*/

    var timerCon = $('.timer-con');

    //Count To function
    function timerFunction() {

      if ( timerCon.length ) {

        if (!timerCon.hasClass("done")) {

          var timerTop = timerCon.offset().top,
          top = allWindow.scrollTop(),
          winH = allWindow.height() - 100;

            if (top >= timerTop - winH) {
              timerCon.addClass("done");

              //initialize count to
               if (!!$.prototype.countTo) {
                $('.timer').countTo({speed:2500,refreshInterval: 50});
               }
              
            }
        }
      }
    } //End timerFunction Fuction


    var linesHead = $(".skills-section"),
        line = $(".progress-bar-line");

    //Progress Bars function
    function progressFunction(e) {

      if ( linesHead.length ) {

        if (!linesHead.hasClass("done")) {

          var linesHeadTop = linesHead.offset().top,
              top = allWindow.scrollTop(),
              winH = allWindow.height() - 160;

          if (top >= linesHeadTop - winH) {

            linesHead.addClass("done");
            $.each( line, function( i, val ) {

            var thisLine = $(this),
              value = thisLine.data("percent"),
              progressCont = $(thisLine).closest('.progress-bar-linear').find(".progress-cont span");

              thisLine.css("width",value + "%");
              progressCont.html(value + "%")

            });
          }
        }
      }
    } //End progressFunction Fuction


    function scrollFunctions() {
      ChangeClass();
      parallax();
      animateCarts();
      progressFunction();
      timerFunction();
    }

    // add Event listener to window
    allWindow.on('scroll', function() {
      scrollFunctions();
    }); 


/*-------------------------------------------
 Magnific Popup Portfolio Initializing
-------------------------------------------*/
    $(".popup-youtube").magnificPopup({
        type: 'iframe'
      });

    $('.popup-link').magnificPopup({
      type: 'image',
      removalDelay: 300,
      mainClass: 'mfp-fade',
      gallery:{
          enabled:true
      },
    });
    
    $('.pf-gallery-popuap').magnificPopup({
      type: 'image',
      removalDelay: 300,
      mainClass: 'mfp-fade',
      gallery:{
          enabled:true
      },  
      zoom: {
        enabled: true,
        duration: 300,
        easing: 'ease-in-out',
      }
    });

/*------------------------------------------------------
  Javascript Function for filtering portfolio items
--------------------------------------------------------*/

    var portfolioItems = $('.work-item'),
        menu = $('#work-list'),
        menuItems = $('.filter'),
        filterItems = function(ev) {

          var target = $(this);
          // Prevent the default link behavior 
          ev.preventDefault();

          // return if already current
          if (target.hasClass("filter-active")) {
            return false;
          }

          // remove current
          var activeLink = menu.find('.filter-active');

              activeLink.removeClass('filter-active');

          // set current
          target.addClass('filter-active');

          $.each( portfolioItems, function( i, val ) {

              var portfolioItem = $(this);

              if ( target.data("filter") === "all" ) {

                portfolioItem.removeClass('filtered');
                setTimeout(function () { portfolioItem.css("display","block"); },500);


              } else if ( !portfolioItem.hasClass( target.data("filter") ) ) {

                portfolioItem.addClass('filtered');
                setTimeout(function() { portfolioItem.css("display","none"); },500);

              } else {

                portfolioItem.removeClass('filtered');
                setTimeout(function () { portfolioItem.css("display","block"); },500);

              }
          });
        };

    $.each( menuItems, function( i, val ) {
      $(this).on("click",filterItems);
    });

/*------------------------------------------------------
  Javascript Function for initialize owl carousel
--------------------------------------------------------*/

    if (!!$.prototype.owlCarousel) {

        $(".home-3 .home-carousel").owlCarousel({
          mouseDrag: false,
          nav: true,
          navText : [
            "<div class='main-color-bg home-slider-btn effect ver-center'><i class='fa fa-chevron-left center'></i><span></span></div>",
            "<div class='main-color-bg home-slider-btn effect ver-center'><i class='fa fa-chevron-right center'></i><span></span></div>"
          ],
          dots: true,
          items: 1,
          animateOut: 'fade-out',
          animateIn: 'slide-animation'
        });


        $(".testimonials-carousel").owlCarousel({
          dots: true,
          items: 1,
          loop: true,
          autoplay: true,
          autoplayHoverPause: true,
          autoplayTimeout: 3000
        });


        $(".blogs-carousel").owlCarousel({
          loop: true,
          margin: 20,
          autoplay: true,
          autoplayTimeout: 5000,
          autoplayHoverPause: true,
          responsive : {
              0 : {
                  items: 1,
              },
              720 : {
                  items: 2,
              },
              992 : {
                  items: 3,
              },
            }
        });


        $(".clients-carousel").owlCarousel({
          loop: true,
          margin: 30,
          autoplay: true,
          autoplayTimeout: 2800,
          autoplayHoverPause: true,
          responsive : {
              0 : {
                  items: 2,
              },
              400 : {
                  items: 3,
              },
              590 : {
                  items: 5,
              },
              720 : {
                  items: 6,
              },
            }
        });

    }

  /*====================================================================
  Javascript Function for SCHEME COLORS SCRIPT
  ======================================================================*/


  $("#color-scheme-btn").click(function (e) {
    e.preventDefault();
    $(".color-scheme-panel-con").toggleClass("color-scheme-panel-open");
  });



  var prevColor, prevBg,
    changeBtns = $(".change-color"),
    templateColorItems = $(".main-color"),
    templateBgColorItems = $(".main-color-bg"),
    changeClassBtns = $(".dl-btns");

  $.each( changeClassBtns, function( i, val ) {

    $(this).on("click",function (e) {
      e.preventDefault();

      var bodyClassList = $(this).attr("class").split(" "),
        bodyClass = bodyClassList[1];

      if ( body.hasClass(bodyClass) ) {
        e.preventDefault();
      } else if ( body.hasClass("light") ) {
        body.removeClass("light");
        body.addClass("dark");
      } else {
        body.removeClass("dark");
        body.addClass("light")
      }
    });
  });

  $.each( changeBtns, function( i, val ) {


    $(this).on("click",function (e) {

      e.preventDefault();

      var colorsArr = $(this).attr("class").split(" "),
        bgColor = colorsArr[0],
        color = colorsArr[1];

        $.each( templateColorItems, function( i, val ) {

        if ( $(this).hasClass("main-color") ) {

          $(this).removeClass("main-color");
          $(this).addClass(color);

        } else {

          if (!$(this).hasClass("change-color")) {

            $(this).removeClass(prevColor);
            $(this).addClass(color);

          }
        }
      });     

      $.each( templateBgColorItems, function( i, val ) {

        if ( $(this).hasClass("main-color-bg") ) {

          $(this).removeClass("main-color-bg");
          $(this).addClass(bgColor);

        } else {

          if (!$(this).hasClass("change-color")) {

            $(this).removeClass(prevBg);
            $(this).addClass(bgColor);

          }
        }     
      });

      templateColorItems = $("." + color);
      templateBgColorItems = $("." + bgColor);
      prevColor = color;
      prevBg = bgColor;
      
    });
  });


/*------------------------------------------------------------------------
 Javascript Function for Validate and Submit the CONTACT Form Using AJAX
-------------------------------------------------------------------------*/

    // Get the form.
    var form = $('#contact-form'),
        reg = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{3,4})$/,
        inputs = $(".input-field");

    function validateForm() {

      if ($(this).is("#email")) {

          var email = $(this).val(),
              res = reg.test(email);

          if (res) {
            $(".email-error").html("");
          } else {
            $(".email-error").html("please enter a valid email.");
            return false;
          }

      } else {

          var target = ($(this).attr("id")),
              targetMessage = $("."+target+"-error");

          if ($(this).val() === "") {

            targetMessage.html("please enter a valid "+target+".");
            return false;

          } else { 
            targetMessage.html(" ");
          }

      }
    } // End ValidateForm Function

    $.each(inputs, function( i, val ) {
      $(this).on("blur", validateForm);
    });

    // Get the messages div.
    var formMessages = $('#form-message');

    // Set up an event listener for the contact form.
    $(form).on('submit',function(event) {

      // Stop the browser from submitting the form.
      event.preventDefault();

      // Serialize the form data.
      var formData = $(form).serialize();

      // Submit the form using AJAX.
      $.ajax({
          type: 'POST',
          url: form.attr('action'),
          data: formData
      }).done(function(response) {

        // Make sure that the formMessages div has the 'success' class.
        formMessages.removeClass('error');
        formMessages.addClass('success');

        // Set the message text.
        formMessages.text(response);

        // Clear the form.
        $('#name').val('');
        $('#email').val('');
        $('#message').val('');

      }).fail(function(data) {

          // Make sure that the formMessages div has the 'error' class.
          formMessages.removeClass('success');
          formMessages.addClass('error');

          // Set the message text.
          if (data.responseText !== '') {
              formMessages.text(data.responseText);
          } else {
              formMessages.text('Sorry! An error occured and your message could not be sent.');
          }

      });
    });

});
    