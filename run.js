var time = 0,
    startTime = 0,
    interval = 0,
    words = $('.words p'),
    inputs = $('.words input'),
    form = forms[localStorage.getItem('formType')],
    controlWords = [],
    testWord = '';

// Countdown from 3
interval = setInterval(function() {
    $('.timer').text(3 - (++time) + '...');

    if(time === 3) { // Countdown over, start game
        $('.words').css('display', 'block');   
        $('.timer').text('GO!');

        $('#blank1').focus();

        time = 0;
        startTime = Math.floor(performance.now());
        clearInterval(interval);

        interval = setInterval(update, 0);
    }
}, 1000);

// Change time on timer, and check for correct completion
function update() {
    time = Math.floor(performance.now() - startTime) / 1000;
    $('.timer').html('GO!<br>' + time.toFixed(3) + 's');
    
    checkDone();
}

function checkDone() {
    var good = true; // True if all inputs filled out correctly
    for(var i = 0; i < inputs.length; i++) {
        var value = inputs[i].value;

        if(controlWords[i] === '_') {
            if(value !== testWord[0] && value !== testWord[1]) {
                good = false;
            }
        } else if(value !== controlWords[i]) {
            good = false;
        }
    }

    if(good) { // If the form is completed, stop the game
        clearInterval(interval);
        $('.timer').html('Your time:<br>' + time.toFixed(3) + 's');

        $('#done').css('display', 'none'); // Button will disappear on click
        
        inputs.css({
            'color': '#111177',
            'border-bottom': 'none'
        });

        inputs.prop('readonly', true); 
    }
}

// Loop through all <p> tags that go before their respective <input> tags
for(var i = 0; i < words.length; i += 2) {
    var word = form[i / 2];

    if(word.indexOf('-') > -1) {
        words[i].innerText = word.split('-')[0];        
        controlWords.push(word.split('-')[1][0]);
    } else {
        words[i].innerText = word.split('_')[0];

        controlWords.push('_');
        testWord = word.split('_')[1].substr(0, 2);
    }
}

// Loop through all <p> tags that go after their respective <input> tags
for(var i = 1; i < words.length; i += 2) {
    var word = form[(i - 1) / 2];

    if (word.indexOf('-') > -1) {
        words[i].innerText = (word.split('-')[1] || '').slice(1);        
    } else {
        words[i].innerText = (word.split('_')[1] || '').slice(2);
    }
}