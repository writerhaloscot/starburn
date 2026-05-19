$(function () {

    /* Random Star Field: Help from Safari AI Search: css js html create random star field that doesn't overlap */
    for (let i = 0; i < 200; i++) {
        let star = '<button class="star s' + (Math.floor(Math.random() * 3) + 1) + ' c' + (Math.floor(Math.random() * 5) + 1) + '" style="top: ' + (Math.floor(Math.random() * 95) + 1) + '%; left: ' + (Math.floor(Math.random() * 95) + 1) + '%;" type="button" id="star' + i + '">&bull;</button>';
        $(star).appendTo('#starburn');
    }

    $('body').on('click', '.star', function (e) {
        e.preventDefault();
        console.log('clicked star: ' + this.id);
        this.remove();
    });

    /* remove on click, but change to remove on intersect with character in timer, etc., or calmer without timer just get all of them, also:
    
            2D
            Collect 3 of each type of star?
            Need CSS star flare animation (search) for when burn out
            Need rocket (move with keyboard or bottom pad) to catch
            Need welcome screen
            Harder each round
            Random so different each time
            Different star colors have different points with counter
            Need og:image hosted on github like Skinless Bark
            */
});
