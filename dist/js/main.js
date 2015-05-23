//
// Simple drum player for Analogue Drums
//
// Get the name of the kit from the id on the body tag

var drumKit = $('body').attr('id');

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
        volume: 0.4
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
        name: "crash2",
        volume: 0.4
    }, {
        name: "blank",
        volume: 0
    }],
    volume: 0.5,
    path: "assets/" + drumKit.substring(2) + "/",
    multiplay: true,
    preload: true
});

// Tom configurations
$(document).ready(function() {
    var tomConfigNumber = Number(drumKit.substring(0, 1));
    var tomInstertPos = $('#keyboard li:nth-child(5)');
    var tomConfig = [
        "<div class='tom1 a-tom1 drum'></div><div class='tom2 a-tom2 drum'></div>",
        "<div class='tom1 b-tom1 drum'></div><div class='tom2 b-tom2 drum'></div><div class='tom3 b-tom3 drum'></div>",
        "<div class='tom1 c-tom1 drum'></div><div class='tom2 c-tom2 drum'></div><div class='tom3 c-tom3 drum'></div><div class='tom4 c-tom4 drum'></div>",
        "<div class='tom1 d-tom1 drum'></div><div class='tom2 d-tom2 drum'></div><div class='tom3 d-tom3 drum'></div><div class='tom4 d-tom4 drum'></div><div class='tom5 d-tom5 drum'></div>"
    ];
    var tomKeyboardConfig = [
        "<li class='player-key keyboard-tom1'>T1</li><li class='player-key keyboard-tom2'>T2</li><li>i</li><li>o</li><li>p</li>",
        "<li class='player-key keyboard-tom1'>T1</li><li class='player-key keyboard-tom2'>T2</li><li class='player-key keyboard-tom3'>T3</li><li>o</li><li>p</li>",
        "<li class='player-key keyboard-tom1'>T1</li><li class='player-key keyboard-tom2'>T2</li><li class='player-key keyboard-tom3'>T3</li><li class='player-key keyboard-tom4'>T4</li><li>p</li>",
        "<li class='player-key keyboard-tom1'>T1</li><li class='player-key keyboard-tom2'>T2</li><li class='player-key keyboard-tom3'>T3</li><li class='player-key keyboard-tom4'>T4</li><li class='player-key keyboard-tom5'>T5</li>"
    ];
    $(tomConfig[tomConfigNumber]).insertAfter('.snare');
    $(tomKeyboardConfig[tomConfigNumber]).insertAfter(tomInstertPos);
    console.log(tomInstertPos);
});

// Cymbal configurations
$(document).ready(function() {

});

// Rug color
$(document).ready(function() {
    $('.kit').addClass(drumKit.substring(2));
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
        case 121:
            drum = 'tom1';
            break;
        case 117:
            drum = 'tom2';
            break;
        case 105:
            drum = 'tom3';
            break;
        case 101:
            drum = 'crash1';
            break;
        case 114:
            drum = 'crash2';
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