$(function () {

    // Safari + Low Power Mode check for video
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    document.getElementById('starloop').play().then(() => {
        console.log('Low Power Mode Off and/or not Safari. Show Video.');
        $('video#starloop, #stargallery video').fadeIn().css({
            display: 'block'
        });
    }).catch((error) => {
        if (error.name === 'NotAllowedError') {
            console.log('Low Power Mode On. Hide Video.');
            if (isSafari) {
                console.log("This is Safari.");
            }
        }
    });

    /* Random Star Field */
    let num_stars = 200;
    $('#startotal').text(num_stars);
    for (let i = 0; i < num_stars; i++) {
        let star = '<button class="star s' + (Math.floor(Math.random() * 3) + 1) + ' c' + (Math.floor(Math.random() * 5) + 1) + '" style="top: ' + (Math.floor(Math.random() * 95) + 1) + '%; left: ' + (Math.floor(Math.random() * 95) + 1) + '%;" type="button" id="star' + i + '">&bull;</button>';
        $(star).appendTo('#starburn');
    }

    /* Black Hole Character */
    const bh = document.getElementById('blackhole');
    let btmPos = 0;
    let leftPos = 0;
    const speed = 5;
    bh.focus();


    // CONTROLS
    var clickTimer;

    $('#starcontrol a').on('mousedown touchstart', function (e) {
        $(this).trigger('click');
        clickTimer = setInterval(function () {
            $(e.target).trigger('click');
        }, 100);
    }).on('mouseup mouseleave touchend', function () {
        clearInterval(clickTimer);
    });
    $('#starcontrol a').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $('#starcontrol a').removeClass('active');
    });
    $('#starcontrol a[href="#up"]').on('click', function (e) {
        move_bh_up();
    });
    $('#starcontrol a[href="#down"]').on('click', function (e) {
        move_bh_down();
    });
    $('#starcontrol a[href="#left"]').on('click', function (e) {
        move_bh_left();
    });
    $('#starcontrol a[href="#right"]').on('click', function (e) {
        move_bh_right();
    });

    $(document).keydown(function (e) {
        $('#starcontrol a').removeClass('active');
        switch (e.code) {
            case 'ArrowUp':
                move_bh_up();
                break;
            case 'ArrowDown':
                move_bh_down();
                break;
            case 'ArrowLeft':
                move_bh_left();
                break;
            case 'ArrowRight':
                move_bh_right();
                break;
        }
    });

    function move_bh() {
        bh.style.bottom = btmPos + '%';
        bh.style.left = leftPos + '%';
    }

    function move_bh_up() {
        $('#starcontrol a[href="#up"]').addClass('active');
        $('#starcontrol a[href="#down"]').removeClass('disabled');
        if ((btmPos + speed) >= 98) {
            btmPos = 98;
            $('#starcontrol a[href="#up"]').addClass('disabled');
        } else {
            btmPos += speed;
        }
        move_bh();
    }

    function move_bh_down() {
        $('#starcontrol a[href="#down"]').addClass('active');
        $('#starcontrol a[href="#up"]').removeClass('disabled');
        if ((btmPos - speed) <= 0) {
            btmPos = 0;
            $('#starcontrol a[href="#down"]').addClass('disabled');
        } else {
            btmPos -= speed;
        }
        move_bh();
    }

    function move_bh_left() {
        $('#starcontrol a[href="#left"]').addClass('active');
        $('#starcontrol a[href="#right"]').removeClass('disabled');
        if ((leftPos - speed) <= 0) {
            leftPos = 0;
            $('#starcontrol a[href="#left"]').addClass('disabled');
        } else {
            leftPos -= speed;
        }
        move_bh();
    }

    function move_bh_right() {
        $('#starcontrol a[href="#right"]').addClass('active');
        $('#starcontrol a[href="#left"]').removeClass('disabled');
        if ((leftPos + speed) >= 98) {
            leftPos = 98;
            $('#starcontrol a[href="#right"]').addClass('disabled');
        } else {
            leftPos += speed;
        }
        move_bh();
    }

    // INTERSECTING COLLISION CODE
    // lightweight: https://caniuse.com/requestanimationframe
    let counter = 0;

    function updateLoop() {
        document.querySelectorAll('button.star').forEach(function (btn) {
            if (isColliding(bh, btn)) {
                $(btn).addClass('burn');
                setTimeout(function () {
                    $(btn).remove();
                }, 1000);
            }
        });
        requestAnimationFrame(updateLoop);
        $('#starnum').text((num_stars - $('button.star').length));
        // console.log('stars eaten so far: ' + (num_stars - $('button.star').length));
    }
    updateLoop();

    function isColliding(obj1, obj2) {
        const rect1 = obj1.getBoundingClientRect();
        const rect2 = obj2.getBoundingClientRect();

        return !(
            rect1.right < rect2.left ||
            rect1.left > rect2.right ||
            rect1.bottom < rect2.top ||
            rect1.top > rect2.bottom
        );
    }


    /* Need welcome screen - see html doc
            Random so different each time / difficulty random
            choose if want video & soothing audio before start so ADA? see Skinless Bark for audio
            if eat all the stars can either play again or download certificate or something fun
            */

    /* Starburn: choose how many stars to eat within limit on welcome screen, no timer, chill, all positive validation & satisfying interactions */
});
