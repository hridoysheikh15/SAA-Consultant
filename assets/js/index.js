/* ============================================================
   M-HEXAD SOLUTION — LUXURY MM2H CONSULTANCY
   Centralized JavaScript / jQuery
   ============================================================ */

$(function () {

    /* --------------------------------------------------------
       AOS INIT
    -------------------------------------------------------- */
    AOS.init({
        duration: 750,
        easing: 'ease-out-cubic',
        once: true,
        offset: 60
    });

    /* --------------------------------------------------------
       NAVBAR: TRANSPARENT → SOLID ON SCROLL
    -------------------------------------------------------- */
    const $nav = $('#mainNav');

    $(window).on('scroll.nav', function () {
        if ($(this).scrollTop() > 60) {
            $nav.addClass('scrolled');
        } else {
            $nav.removeClass('scrolled');
        }
    }).trigger('scroll.nav');

    /* --------------------------------------------------------
       ACTIVE NAV LINK
    -------------------------------------------------------- */
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    $('#mainNav .nav-link').each(function () {
        const href = $(this).attr('href');
        if (href === currentPage) {
            $(this).addClass('active');
        }
    });

    /* --------------------------------------------------------
       SCROLL TO TOP
    -------------------------------------------------------- */
    const $scrollTop = $('#scrollTop');

    $(window).on('scroll.top', function () {
        if ($(this).scrollTop() > 400) {
            $scrollTop.addClass('visible');
        } else {
            $scrollTop.removeClass('visible');
        }
    });

    $scrollTop.on('click', function () {
        $('html, body').animate({ scrollTop: 0 }, 600, 'swing');
    });

    /* --------------------------------------------------------
       ANIMATED COUNTERS
    -------------------------------------------------------- */
    function animateCounter($el) {
        const target = parseInt($el.data('target'), 10);
        const suffix = $el.data('suffix') || '';
        const duration = 2000;
        const step = duration / target;
        let current = 0;

        const timer = setInterval(function () {
            current++;
            $el.text(current + suffix);
            if (current >= target) {
                clearInterval(timer);
                $el.text(target + suffix);
            }
        }, Math.max(step, 10));
    }

    // Intersection Observer polyfill-friendly via scroll check
    let countersStarted = false;

    function checkCounters() {
        if (countersStarted) return;
        const $counters = $('.counter-number');
        if ($counters.length === 0) return;

        const first = $counters[0];
        const rect = first.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            countersStarted = true;
            $counters.each(function () {
                animateCounter($(this));
            });
        }
    }

    $(window).on('scroll.counters', checkCounters);
    setTimeout(checkCounters, 500);

    /* --------------------------------------------------------
       HERO BACKGROUND PARALLAX (subtle)
    -------------------------------------------------------- */
    if ($('#hero .hero-bg').length) {
        $(window).on('scroll.parallax', function () {
            const scrolled = $(this).scrollTop();
            $('#hero .hero-bg').css('transform', 'scale(1.03) translateY(' + scrolled * 0.25 + 'px)');
        });
    }

    /* --------------------------------------------------------
       TESTIMONIAL CAROUSEL (simple jQuery slider)
    -------------------------------------------------------- */
    if ($('#testimonialCarousel').length) {
        let tCurrentIndex = 0;
        const $tItems = $('#testimonialCarousel .t-slide');
        const tTotal = $tItems.length;

        if (tTotal > 1) {
            $tItems.hide().first().show();

            setInterval(function () {
                $tItems.eq(tCurrentIndex).fadeOut(400, function () {
                    tCurrentIndex = (tCurrentIndex + 1) % tTotal;
                    $tItems.eq(tCurrentIndex).fadeIn(400);
                });
            }, 5000);

            $('#tPrev').on('click', function () {
                $tItems.eq(tCurrentIndex).fadeOut(300, function () {
                    tCurrentIndex = (tCurrentIndex - 1 + tTotal) % tTotal;
                    $tItems.eq(tCurrentIndex).fadeIn(300);
                });
            });

            $('#tNext').on('click', function () {
                $tItems.eq(tCurrentIndex).fadeOut(300, function () {
                    tCurrentIndex = (tCurrentIndex + 1) % tTotal;
                    $tItems.eq(tCurrentIndex).fadeIn(300);
                });
            });
        } else {
            $tItems.show();
        }
    }

    /* --------------------------------------------------------
       FAQ SEARCH
    -------------------------------------------------------- */
    $('#faqSearch').on('input', function () {
        const query = $(this).val().toLowerCase().trim();
        $('.accordion-luxury .accordion-item').each(function () {
            const text = $(this).text().toLowerCase();
            if (query === '' || text.includes(query)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });

    /* --------------------------------------------------------
       CONTACT / CONSULTATION FORM SUBMIT
    -------------------------------------------------------- */
    $('#consultationForm, #contactForm').on('submit', function (e) {
        e.preventDefault();
        const $btn = $(this).find('[type="submit"]');
        const originalText = $btn.html();
        $btn.html('<i class="fa fa-spinner fa-spin me-2"></i>Sending...').prop('disabled', true);

        setTimeout(function () {
            $btn.html('<i class="fa fa-check me-2"></i>Message Sent!');
            setTimeout(function () {
                $btn.html(originalText).prop('disabled', false);
            }, 3000);
        }, 1800);
    });

    /* --------------------------------------------------------
       NEWSLETTER FORM
    -------------------------------------------------------- */
    $('#newsletterForm').on('submit', function (e) {
        e.preventDefault();
        const $input = $(this).find('input[type="email"]');
        const $btn = $(this).find('button');
        $btn.html('<i class="fa fa-check"></i>').addClass('btn-success');
        $input.val('Subscribed!').prop('disabled', true);
        setTimeout(function () {
            $btn.html('Subscribe').removeClass('btn-success');
            $input.val('').prop('disabled', false).attr('placeholder', 'Enter your email');
        }, 3500);
    });

    /* --------------------------------------------------------
       SMOOTH INTERNAL LINKS
    -------------------------------------------------------- */
    $('a[href^="#"]').on('click', function (e) {
        const target = $(this).attr('href');
        if (target === '#' || target === '#!') return;
        const $target = $(target);
        if ($target.length) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: $target.offset().top - 80
            }, 700, 'swing');
        }
    });

    /* --------------------------------------------------------
       MOBILE MENU CLOSE ON LINK CLICK
    -------------------------------------------------------- */
    $('.navbar-nav .nav-link').on('click', function () {
        if ($('#navbarMain').hasClass('show')) {
            $('#navbarToggler').trigger('click');
        }
    });

    /* --------------------------------------------------------
       HERO SCROLL INDICATOR
    -------------------------------------------------------- */
    $('.hero-scroll-indicator').on('click', function () {
        const nextSection = $('#hero').next('section, div');
        if (nextSection.length) {
            $('html, body').animate({ scrollTop: nextSection.offset().top - 80 }, 700);
        }
    });

    /* --------------------------------------------------------
       PROCESS STEP HOVER HIGHLIGHT
    -------------------------------------------------------- */
    $('.process-step-card').on('mouseenter', function () {
        $('.process-step-card').not($(this)).css('opacity', '0.6');
    }).on('mouseleave', function () {
        $('.process-step-card').css('opacity', '1');
    });

    /* --------------------------------------------------------
       BLOG SEARCH
    -------------------------------------------------------- */
    $('.search-widget form').on('submit', function (e) {
        e.preventDefault();
        const q = $(this).find('input').val().trim();
        if (q) {
            alert('Searching for: ' + q);
        }
    });

    /* --------------------------------------------------------
       REFRESH AOS ON WINDOW RESIZE
    -------------------------------------------------------- */
    $(window).on('resize', function () {
        AOS.refresh();
    });

});
