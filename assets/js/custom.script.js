(function($) {
  "use strict";

  $(document).ready(function() {

    /* =========================================
       HEADER HEIGHT -> CSS var & JS var
       ========================================= */
    var NMA_HEADER_H = 0;
    function nmaSetHeaderGap(){
      var $h = $('.lgx-header-position-fixed, .lgx-header-position');
      if($h.length){
        NMA_HEADER_H = $h.outerHeight() || 80;
        document.documentElement.style.setProperty('--header-h', NMA_HEADER_H + 'px');
      }
    }
    nmaSetHeaderGap();
    $(window).on('load resize', nmaSetHeaderGap);
    setTimeout(nmaSetHeaderGap, 300); // por si el logo/fuentes tardan

    /* =========================================
       MENU SCROLL FIXED
       ========================================= */
    var s = $(".lgx-header-position-fixed, .lgx-header-position");
    var pos = s.position();

    $(window).on('scroll', function () {
      var windowpos = $(window).scrollTop();
      if (pos) {
        if (windowpos >= pos.top) {
          s.addClass("menu-onscroll");
        } else {
          s.removeClass("menu-onscroll");
        }
      }
      // si el header cambia de tamaño al hacer scroll, recalculamos
      nmaSetHeaderGap();
    });

    /* =========================================
       Circular CountDown
       ========================================= */
    if ($('#circular-countdown').length) {
      $("#circular-countdown").TimeCircles({
        "animation": "smooth",
        "bg_width": 1.0,
        "fg_width": 0.1,
        "circle_bg_color": "#ddd",
        "time": {
          "Days":   {"text":"Days",    "color":"#ec398b", "show":true},
          "Hours":  {"text":"Hours",   "color":"#fac400", "show":true},
          "Minutes":{"text":"Minutes", "color":"#00acee", "show":true},
          "Seconds":{"text":"Seconds", "color":"#483fa1", "show":true}
        }
      });
    }

    /* =========================================
       SITE PATH
       ========================================= */
    var lgx_path = window.location.protocol + '//' + window.location.host;
    var pathArray = window.location.pathname.split('/');
    for (var i = 1; i < (pathArray.length - 1); i++) {
      lgx_path += '/';
      lgx_path += pathArray[i];
    }

    /* =========================================
       COUNTER
       ========================================= */
    var lgxCounter = $('.lgx-counter');
    if (lgxCounter.length) {
      lgxCounter.counterUp({ delay: 10, time: 5000 });
    }

    /* =========================================
       Modal Video (con guard)
       ========================================= */
    if ($("#modalvideo").length) {
      var url = $("#modalvideo").attr('src');
      $("#modalvideo").attr('src', '');
      $("#lgx-modal").on('shown.bs.modal', function(){
        $("#modalvideo").attr('src', url);
      });
      $("#lgx-modal").on('hide.bs.modal', function(){
        $("#modalvideo").attr('src', '');
      });
    }

    /* =========================================
       Countdown numérico (multi-idioma)
       ========================================= */
    if ($('#lgx-countdown').length) {
      var dataTime = $('#lgx-countdown').data('date'); // Date Format : Y/m/d
      $('#lgx-countdown').countdown(dataTime, function(event) {
        if ($('[lang="es"]').is(":hidden")){
          $(this).html(event.strftime(
            '<span class="lgx-days">%D <i> Days </i></span> '+
            '<span class="lgx-hr">%H <i> Hour </i></span> '+
            '<span class="lgx-min">%M <i> Minu </i></span> '+
            '<span class="lgx-sec">%S <i> Seco </i></span><br><br>'
          ));
        } else {
          $(this).html(event.strftime(
            '<span class="lgx-days">%D <i> Dias </i></span> '+
            '<span class="lgx-hr">%H <i> Hor </i></span> '+
            '<span class="lgx-min">%M <i> Min </i></span> '+
            '<span class="lgx-sec">%S <i> Sec </i></span><br><br>'
          ));
        }
      });
    }

    /* =========================================
       SMOOTH SCROLL con offset del header
       ========================================= */
    $('a.lgx-scroll').on('click', function(event) {
      var $a = $(this);
      var href = $a.attr('href');
      if (!href || href.charAt(0) !== '#') return; // enlaces externos
      var $target = $(href);
      if (!$target.length) return;
      event.preventDefault();
      var topTo = Math.max(0, $target.offset().top - (NMA_HEADER_H || 80) - 10);
      $('html, body').stop().animate({ scrollTop: topTo }, 900, 'easeInOutExpo');
    });

    /* =========================================
       Magnific Popup (galería)
       ========================================= */
    $('.lgx-gallery-popup').magnificPopup({
      delegate: 'a',
      type: 'image',
      gallery: { enabled: true },
      image: { titleSrc: 'title' }
    });

    /* =========================================
       Instafeed (guard si existe contenedor)
       ========================================= */
    if($('#instafeed').length){
      var userFeed = new Instafeed({
        get: 'user',
        userId: '623597756',
        clientId: '02b47e1b98ce4f04adc271ffbd26611d',
        accessToken: '623597756.02b47e1.3dbf3cb6dc3f4dccbc5b1b5ae8c74a72',
        resolution: 'standard_resolution',
        template: '<a href="{{link}}" target="_blank" id="{{id}}"><img src="{{image}}" /></a>',
        sortBy: 'most-recent',
        limit: 8,
        links: false
      });
      userFeed.run();
    }

    /* =========================================
       Sliders (home / gallery / center / testimonial)
       ========================================= */
    if ($("#lgx-main-slider").length) {
      $("#lgx-main-slider").owlCarousel({
        margin:0, items:1, loop:true, animateOut:'fadeOut',
        autoplay:true, dots:false,
        navText:['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
        autoplayTimeout:5000, autoplaySpeed:500, nav:true, addClassActive:true
      });
    }

    if ($('#lgx-owlgallery').length) {
      $("#lgx-owlgallery").owlCarousel({
        margin:0, items:3, loop:true, autoplay:true, dots:false,
        navText:["<img src='./assets/img/arrow-left.png'>","<img src='./assets/img/arrow-right.png'>"],
        autoplayTimeout:5000, autoplaySpeed:500, nav:true, addClassActive:true,
        responsive:{ 0:{items:1}, 480:{items:2}, 992:{items:3} }
      });
    }

    if ($("#lgx-slider-center").length) {
      $("#lgx-slider-center").owlCarousel({
        margin:0, center:true, items:1, loop:true, autoplay:true, dots:false,
        navText:['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
        autoplayTimeout:5000, autoplaySpeed:500, nav:true, addClassActive:true,
        responsive:{ 991:{ items:2 } }
      });
    }

    if ($('#lgx-owltestimonial').length) {
      $("#lgx-owltestimonial").owlCarousel({
        margin:0, items:2, loop:true, autoplay:true, dots:true,
        navText:["<img src='./assets/img/arrow-left-ash.png'>","<img src='./assets/img/arrow-right-ash.png'>"],
        autoplayTimeout:5000, autoplaySpeed:500, nav:true, addClassActive:true,
        responsive:{ 0:{items:1}, 787:{items:1} }
      });
    }

    // HEADER DISPLAY FLEX ISSUE
    if ($(window).width() < 787) {
      $('#navbar').removeClass('lgx-collapse');
    }

    /* =========================================
       Typed Animations (guards)
       ========================================= */
    if($('#lgx-typed-string').length){
      $('#lgx-typed-string').typed({
        strings:["UX Conference 2019","UI Conference 2019","You learn Advance"],
        typeSpeed:10, startDelay:0, backSpeed:0, shuffle:false, backDelay:500,
        loop:true, loopCount:false, showCursor:true, cursorChar:"|", contentType:'html'
      });
    }

    if($('#lgx-typed-center').length){
      $('#lgx-typed-center').typed({
        strings:["Festival","World","Event"],
        typeSpeed:100, startDelay:0, backSpeed:0, shuffle:false, backDelay:500,
        loop:true, loopCount:false, showCursor:true, cursorChar:"|", contentType:'html'
      });
    }

    /* =========================================
       GOOGLE MAP (guard robusto)
       ========================================= */
    if (window.google && google.maps) {

      // Default map
      if ($('.map-canvas-default').length) {
        $(".map-canvas-default").googleMap({
          zoom: 8,
          coords: [40.7127, 74.0059],
          type: "ROADMAP",
          mouseZoom: false
        });

        $(".map-canvas-default").addMarker({
          coords: [40.7127, 74.0059],
          title: 'Eventpoint',
          text: '121 King St, Melbourne VIC 3000, Australia',
          icon: lgx_path + '/assets/img/map/map-icon.png'
        });
      }

      // Dark map
      if ($('.map-canvas-dark').length) {
        $(".map-canvas-dark").googleMap({
          zoom: 8,
          coords: [40.7127, 74.0059],
          type: "HYBRID",
          mouseZoom: false
        });

        $(".map-canvas-dark").addMarker({
          coords: [40.7127, 74.0059],
          title: 'Eventpoint',
          text: '121 King St, Melbourne VIC 3000, Australia',
          icon: lgx_path + '/assets/img/map/map-icon.png'
        });
      }
    }

    /* =========================================
       SUBSCRIPTION & AJAX SUBMISSION
       ========================================= */
    var isEmail = function (email) {
      var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      return regex.test(email);
    };

    $('form.lgx-subscribe-form').on('submit', function (evnt) {
      evnt.preventDefault();
      var $subform = $(this);
      var emailInput = $('form.lgx-subscribe-form').find('input#subscribe');

      if (!isEmail(emailInput.val())) {
        emailInput.css('color', '#f00');
        return false;
      }

      $.ajax({
        url: lgx_path + '/assets/php/subscribe.php',
        type: 'post',
        data: { 'email': emailInput.val().toLowerCase() },
        success: function (resp) {
          var parsed;
          try { parsed = $.parseJSON(resp); } catch(e){ parsed = {error:false, message:'¡Gracias por suscribirte!'}; }
          $('#lgx-subalert').addClass("alert alert-success lgx-sub-alert").html(parsed.message || '¡Gracias!');
          if (!parsed.error) { emailInput.css('color', '#0f0'); } else { emailInput.removeAttr('style'); }
        },
        error: function () {
          $('#lgx-subalert').addClass("alert alert-danger lgx-sub-alert").html('No se pudo completar la suscripción. Inténtalo más tarde.');
        }
      });

      $subform[0].reset();
    });

    $('form.subscribe-form input#subscribe').on('keyup', function () {
      this.style.color = (isEmail($(this).val())) ? '#f5832b' : '#f00';
    });

    /* =========================================
       CONTACT FORM Validation + Ajax
       ========================================= */
    var alertInterval; // store the timeout interval ID

    $('#lgx-form-modal').on('hide.bs.modal', function () {
      clearInterval(alertInterval);
    });

    var $contactForm = $('form.lgx-contactform');
    $contactForm.validate({
      submitHandler: function (form) {
        var $form = $(form);
        $.ajax({
          url: lgx_path + '/assets/php/contact.php',
          type: 'post',
          data: $form.serialize(),
          success: function (resp) {
            try {
              var ajaxResponse = $.parseJSON(resp);
              if (ajaxResponse.error) {
                for (var i = 0; i < ajaxResponse.error_field.length; i++) {
                  if ($('p#' + ajaxResponse.error_field[i] + '-error').length) {
                    $('p#' + ajaxResponse.error_field[i] + '-error').text(ajaxResponse.message[ajaxResponse.error_field[i]]);
                  } else {
                    $('#' + ajaxResponse.error_field[i]).after('<p id="' + ajaxResponse.error_field[i] + '-error" class="help-block">' + ajaxResponse.message[ajaxResponse.error_field[i]] + '</p>');
                  }
                }
              } else {
                $('.lgx-form-msg').removeClass('alert-danger').addClass('alert-success').text(ajaxResponse.message);
                $('#lgx-form-modal').modal('show');
                alertInterval = setInterval(function () { $('#lgx-form-modal').modal('hide'); }, 5000);
                $form[0].reset();
              }
            } catch (e) {
              $('.lgx-form-msg').removeClass('alert-success').addClass('alert-danger').text('Sorry, we are failed to contact with you. Please reload the page and try again.');
              $('#lgx-form-modal').modal('show');
              alertInterval = setInterval(function () { $('#lgx-form-modal').modal('hide'); }, 5000);
            }
          },
          error: function () {
            $('.lgx-form-msg').removeClass('alert-success').addClass('alert-danger').text('Sorry, we can not communicate with you. Please make sure you are connected with internet.');
            $('#lgx-form-modal').modal('show');
            alertInterval = setInterval(function () { $('#lgx-form-modal').modal('hide'); }, 5000);
          }
        });
        return false;
      },
      errorElement: 'p',
      errorClass: 'help-block',
      rules: {
        'lgxname':    { required: true, minlength: 3 },
        'lgxemail':   { required: true, email: true },
        'lgxsubject': { required: true, minlength: 5 },
        'lgxmessage': { required: true, minlength: 5 }
      }
    });

  }); // DOM READY

})(jQuery);
