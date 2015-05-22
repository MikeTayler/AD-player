//
// Simple drum player for Analogue Drums
//
// Get the name of the kit from the id on the body tag
// use it in the path to the samples.

var kitFolder = $('body').attr('id');

// Setup samples 
ion.sound({
    sounds: [{
        name: "kick",
        volume: 0.3
    }, {
        name: "snare",
        volume: 0.4
    }, {
        name: "hiHat",
        volume: 0.3
    }, {
        name: "rimClick",
        volume: 0.3
    }, {
        name: "tom1",
        volume: 0.3
    }, {
        name: "tom2",
        volume: 0.3
    }, {
        name: "tom3",
        volume: 0.3
    }, {
        name: "crash1",
        volume: 0.4
    }, {
        name: "blank",
        volume: 0
    }],
    volume: 0.5,
    path: "assets/" + kitFolder.substring(2) + "/",
    multiplay: true,
    preload: true
});

// Kit configurations
$(document).ready(function() {
    var kitA = "<div class='a-tom1 drum'></div><div class='a-tom2 drum'></div>",
        kitB = "<div class='b-tom1 drum'></div><div class='b-tom2 drum'></div><div class='b-tom3 drum'></div>",
        kitC = "<div class='c-tom1 drum'></div><div class='c-tom2 drum'></div><div class='c-tom3 drum'></div><div class='c-tom4 drum'></div>",
        kitD = "<div class='d-tom1 drum'></div><div class='d-tom2 drum'></div><div class='d-tom3 drum'></div><div class='d-tom4 drum'></div><div class='d-tom5 drum'></div>";
    if (kitFolder.substring(0, 1) === 'a') {
        $(kitA).insertAfter('.snare');
    } else if (kitFolder.substring(0, 1) === 'b') {
        $(kitB).insertAfter('.snare');
    } else if (kitFolder.substring(0, 1) === 'c') {
        $(kitC).insertAfter('.snare');
    } else if (kitFolder.substring(0, 1) === 'd') {
        $(kitD).insertAfter('.snare');
    }

});

// Keyboard event setup
$(document).keypress(function(e) {

    var drum;

    // Assign sample to keyboard key
    switch (e.which) {
        case 102:
            drum = 'kick';
            break;
        case 107:
            drum = 'snare';
            break;
        case 106:
            drum = 'hiHat';
            break;
        case 108:
            drum = 'rimClick';
            break;
        case 117:
            drum = 'tom1';
            break;
        case 105:
            drum = 'tom2';
            break;
        case 111:
            drum = 'tom3';
            break;
        case 121:
            drum = 'crash1';
            break;
        default:
            drum = 'blank';
    }

    // Get the drum and keyboard key
    var drumAndKeyboard = $('.' + drum + ',' + '.keyboard-' + drum);

    // Play sample - ion magik
    ion.sound.play(drum);

    // Toggle classes to make drums and kyboard animate
    drumAndKeyboard.addClass('hit').delay(50).queue(function(next) {
        drumAndKeyboard.removeClass('hit');
        next();
    });
});