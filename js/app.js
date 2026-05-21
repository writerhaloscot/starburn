$(function () {

    // Safari + Low Power Mode check for video
    // Pixabay Public Domain Videos: 215694.mp4, 215697.mp4, 215695.mp4, 215762.mp4, 138556-769988117.mp4
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    document.getElementById('starloop').play().then(() => {
        // Low Power Mode Off and/or not Safari. Show Video.
        $('video#starloop, #stargallery video').fadeIn().css({
            display: 'block'
        });
    }).catch((error) => {
        if (error.name === 'NotAllowedError') {
            // Low Power Mode On. Hide Video.
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
    bh.focus();

    // INTERSECTING COLLISION CODE
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

    // TIE TO MOUSEMOVE + TOUCHMOVE
    console.log('here, tied to pointer');
    document.addEventListener('pointermove', (e) => {
        bh.style.left = `${e.clientX}px`;
        bh.style.top = `${e.clientY}px`;
    });


    /* Need welcome screen - see html doc, hide controls/black hole/counter so just floating white text over maybe border opacity cool so video loads
            Random so different each time / difficulty random
            choose if want video & soothing audio before start so ADA? see Skinless Bark for audio
            if eat all the stars can either play again or download certificate or something fun
            */

    /* Starburn: choose how many stars to eat within limit on welcome screen, no timer, chill, all positive validation & satisfying interactions */
});
