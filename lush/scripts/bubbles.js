var randomMovement = 5;
var frequency = 5;
var size = 60;
var speed = 2;
var burst = 50;

var oldX;
var oldY;

setInterval(function () {
    deltaX = (oldX - mouseX) / (10 / speed) + ((Math.random() - .15) * randomMovement);
    deltaY = (oldY - mouseY) / (10 / speed) + ((Math.random() - .15) * randomMovement);

    oldX = mouseX;
    oldY = mouseY;

    var dimension = Math.random() * size;

    $('body').append('<div class="bubble" data-x="' + deltaX + '" data-y="' + deltaY + '" style="position:absolute;width:' + dimension + 'px;height:' + dimension + 'px;margin-left:' + parseInt(mouseX - (dimension / 2)) + 'px;margin-top:' + parseInt(mouseY - (dimension / 2)) + 'px;background-color:' + getRandomColor() + ';"></div>')

}, 200 / frequency);

setInterval(function () {

    $('.bubble').each(function (i) {
        if (parseInt($(this).css('width')) > 0) {
            var topM = parseInt($(this).css('margin-top')) + $(this).data('y');
            var leftM = parseInt($(this).css('margin-left')) + $(this).data('x');
            var newDimension = parseInt($(this).css('width')) - 1;
            $(this).css({
                'margin-top': topM,
                'margin-left': leftM,
                'width': newDimension,
                'height': newDimension
            });
        }
        else {
            $(this).remove();
        }
    })

}, 10);

$(document).on('click', function () {
    for (var i = 0; i < burst; i++) {
        randX = (Math.random() - .5) * 30;
        randY = (Math.random() - .5) * 30;
        var dimension = Math.random() * size;
        $('body').append('<div class="bubble" data-x="' + randX + '" data-y="' + randY + '" style="position:absolute;width:' + dimension + 'px;height:' + dimension + 'px;margin-left:' + parseInt(mouseX - (dimension / 2)) + 'px;margin-top:' + parseInt(mouseY - (dimension / 2)) + 'px;background-color:' + getRandomColor() + ';"></div>')
    }
});

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

$(document).mousemove(function (event) {
    mouseX = event.pageX;
    mouseY = event.pageY;
});