// STARBURN
// For fans of Bust-A-Move and Bejeweled.
// Chill. All positive validation & satisfying interactions.
// Pixabay Public Domain Videos: 215694, 215697, 215695, 215762, 138556-769988117
// Pixabay Audio IDs: 132244, 110241, 217007, 5642, 315904, 491630, 159065, 469493, 351436, 10376, 110624, 525518, 5688, 377648
// FUTURE OPTIONS: https://gsap.com/docs/v3/

$(function () {

    // Safari + Low Power Mode check for video
    $('.starvideo').each(function () {
        var video = $(this);
        var sources = video.find('source');
        sources.each(function () {
            var src = $(this).data('src');
            $(this).attr('src', src);
        });
        video[0].load();
    });

    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    document.getElementById('starloop').play().then(() => {
        // Low Power Mode Off and/or not Safari. Show Video.
        $('video#starloop, #stargallery video').fadeIn().css({
            display: 'block'
        });
    }).catch((error) => {
        if (error.name === 'NotAllowedError') {
            // Low Power Mode On. Hide Video.
            if (isSafari) {}
        }
    });

    /* Black Hole Character */
    const bh = document.getElementById('blackhole');

    // INTERSECTING COLLISION CODE
    let counter = 0;
    let requestID;

    function updateLoop() {
        document.querySelectorAll('button.star').forEach(function (btn) {
            if (isColliding(bh, btn)) {
                $(btn).addClass('burn');
                setTimeout(function () {
                    $(btn).remove();
                }, 500);
            }
        });
        requestID = requestAnimationFrame(updateLoop);
        $('#starnum').text((num_stars - $('button.star').length));
        if (parseInt($('#starnum').text()) == parseInt($('#startotal').text())) {
            console.log('YOU WON!');
            cancelAnimationFrame(requestID);

            $('#blackhole').fadeOut();
            var h = '<h1>You won.</h1><p>The universe is gone.</p><hr><p>Spawn another universe and eat the stars again?</p><p>Or slumber in the void?</p><button id="spawn">Spawn</button><button id="slumber">Slumber</button>'
            $('#starwelcome').html(h).fadeIn();
        }
    }

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

    // TIE TO MOUSEMOVE + TOUCHMOVE
    let num_stars = 100;

    function eatstars() {

        // Random Star Field
        $('#startotal').text(num_stars);
        for (let i = 0; i < num_stars; i++) {
            let star = '<button class="star s' + (Math.floor(Math.random() * 3) + 1) + ' c' + (Math.floor(Math.random() * 5) + 1) + '" style="top: ' + (Math.floor(Math.random() * 95) + 1) + '%; left: ' + (Math.floor(Math.random() * 95) + 1) + '%;" id="star' + i + '">&bull;</button>';
            $(star).appendTo('#starburn');
        }

        // Black Hole MC
        $('#starcounter, #blackhole').fadeIn();
        bh.focus();

        // Eat Stars
        document.addEventListener('pointermove', (e) => {
            bh.style.left = `${e.clientX}px`;
            bh.style.top = `${e.clientY}px`;
        });
        const div = document.getElementById('draggableDiv');
        let offsetX, offsetY;
        bh.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const touch = e.targetTouches[0];
            offsetX = touch.clientX - bh.offsetLeft;
            offsetY = touch.clientY - bh.offsetTop;
        });
        bh.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const touch = e.targetTouches[0];
            bh.style.left = (touch.clientX - offsetX) + 'px';
            bh.style.top = (touch.clientY - offsetY) + 'px';
        }, {
            passive: false
        });
    }

    $('#starstart').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        num_stars = $('#numstars').val();
        $('#blackhole').addClass($('#bhsize').val());
        $('#starwelcome').fadeOut();
        if ($('#starvid').prop('checked')) {
            $('.starvideo').hide();
        }
        if ($('#starsong').val() != 'no') {
            const song = new Audio('music/' + $('#starsong').val());
            song.play();
            song.loop = true;
        }
        eatstars();
        updateLoop();
    });


    // SPAWN OR SLUMBER AFTER WIN
    $('body').on('click', '#spawn', function () {
        window.location.reload();
    });
    $('body').on('click', '#slumber', function () {
        $('#starwelcome').html('<p class="done">Sweet dreams.</p>');
        $('#starburn, #starloop, #stargallery').fadeOut();
        $('body').addClass('slumber');
    });

});
