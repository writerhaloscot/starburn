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

    /* Random Star Field: Help from Safari AI Search: css js html create random star field that doesn't overlap */
    for (let i = 0; i < 200; i++) {
        let star = '<button class="star s' + (Math.floor(Math.random() * 3) + 1) + ' c' + (Math.floor(Math.random() * 5) + 1) + '" style="top: ' + (Math.floor(Math.random() * 95) + 1) + '%; left: ' + (Math.floor(Math.random() * 95) + 1) + '%;" type="button" id="star' + i + '">&bull;</button>';
        $(star).appendTo('#starburn');
    }

    $('body').on('click', '.star', function (e) {
        e.preventDefault();
        console.log('clicked star: ' + this.id);
        $(this).addClass('burn');
        setTimeout(function () {
            $(this).remove();
            console.log('ate star');
        }, 2000);
    });

    /* remove on click, but change to remove on intersect with character in timer, etc., or calmer without timer just get all of them, also:
    
            2D
            Collect 3 of each type of star?
            Need rocket (move with keyboard or bottom pad) to catch
            Need welcome screen
            Harder each round
            Random so different each time
            Different star colors have different points with counter
            Need og:image hosted on github like Skinless Bark
            */

    /* Starburn: choose how many stars to eat within limit on welcome screen, no timer, chill, all positive validation & satisfying interactions; you play as a black hole at the end of the universe, overlay looped timelapse forward & back of space in bg or particle something */
});
