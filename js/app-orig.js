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
    const speed = 1;
    console.log(speed);
    bh.focus();


    // CONTROLS
    var clickTimer;

    $('#starcontrol button').on('mousedown touchstart', function (e) {
        $(this).trigger('click');
        clickTimer = setInterval(function () {
            $(e.target).trigger('click');
        }, 50);
    }).on('mouseup mouseleave touchend', function () {
        clearInterval(clickTimer);
    });
    $('#starcontrol button').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $('#starcontrol button').removeClass('active');
    });
    $('#starcontrol button[data-link="#up"]').on('click', function (e) {
        move_bh_up();
    });
    $('#starcontrol button[data-link="#down"]').on('click', function (e) {
        move_bh_down();
    });
    $('#starcontrol button[data-link="#left"]').on('click', function (e) {
        move_bh_left();
    });
    $('#starcontrol button[data-link="#right"]').on('click', function (e) {
        move_bh_right();
    });

    $(document).keydown(function (e) {
        $('#starcontrol button').removeClass('active');
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
        $('#starcontrol button[data-link="#up"]').addClass('active');
        $('#starcontrol button[data-link="#down"]').removeClass('disabled');
        if ((btmPos + speed) >= 98) {
            btmPos = 98;
            $('#starcontrol button[data-link="#up"]').addClass('disabled');
        } else {
            btmPos += speed;
        }
        move_bh();
    }

    function move_bh_down() {
        $('#starcontrol button[data-link="#down"]').addClass('active');
        $('#starcontrol button[data-link="#up"]').removeClass('disabled');
        if ((btmPos - speed) <= 0) {
            btmPos = 0;
            $('#starcontrol button[data-link="#down"]').addClass('disabled');
        } else {
            btmPos -= speed;
        }
        move_bh();
    }

    function move_bh_left() {
        $('#starcontrol button[data-link="#left"]').addClass('active');
        $('#starcontrol button[data-link="#right"]').removeClass('disabled');
        if ((leftPos - speed) <= 0) {
            leftPos = 0;
            $('#starcontrol button[data-link="#left"]').addClass('disabled');
        } else {
            leftPos -= speed;
        }
        move_bh();
    }

    function move_bh_right() {
        $('#starcontrol button[data-link="#right"]').addClass('active');
        $('#starcontrol button[data-link="#left"]').removeClass('disabled');
        if ((leftPos + speed) >= 98) {
            leftPos = 98;
            $('#starcontrol button[data-link="#right"]').addClass('disabled');
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
                }, 500);
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

    /* HTML INSIDE #starburn */
    /*
        <nav id="starcontrol">
            <button data-link="#up" type="button">Up</button>
            <button data-link="#down" type="button" class="disabled">Down</button>
            <button data-link="#left" type="button" class="disabled">Left</button>
            <button data-link="#right" type="button">Right</button>
        </nav>
    */

    /* CSS FOR #starcontrol */
    /* 
        #starcontrol {
            position: absolute;
            z-index: 99;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(255, 255, 255, 0.15);
            text-align: center;
            padding: 0.75vw;
        }

        #starcontrol button {
            cursor: pointer;
            appearance: none;
            border: 0;
            outline: 0;
            background: transparent;
            color: #fff;
            text-decoration: none;
            text-transform: uppercase;
            font-size: 1vw;
            letter-spacing: 0.2vw;
            padding: 0 0.5vw;
        }

        #starcontrol button:hover,
        #starcontrol button:focus,
        #starcontrol button:active,
        #starcontrol button.active {
            text-decoration: none;
            outline: 0;
            color: #ff4757;
        }

        #starcontrol button.disabled {
            pointer-events: none;
            opacity: 0.4;
            color: #fff !important;
        }

        @media (max-width: 1024px) {
            #starcontrol {
                padding: 1.5vw;
            }

            #starcontrol button {
                font-size: 1.5vw;
                letter-spacing: 0.25vw;
                padding: 0 0.75vw;
            }
        }

        @media (max-width: 768px) {
            #starcontrol {
                padding: 2vw;
            }

            #starcontrol button {
                font-size: 2.5vw;
                letter-spacing: 0.3vw;
                padding: 0 1vw;
            }
        }
    */

});
