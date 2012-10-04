function drawStar(context) {
    // initialize our variables
    var posX = 25;
    var posY = 25;
    var starAngle = 2.0 * (Math.PI / 5.0);
    var nextIndex = 2;
    var control = Math.PI / 3;
    var radians = Math.cos(control) * starAngle + Math.sin(control) * starAngle;

    // this caches the original canvas state
    context.save();

    context.lineWidth = 6;

    // this moves origin 0,0 to our desired location
    context.translate(posX, posY);

    // Rotate to a point where the star appears straight
    context.rotate(6);

    // We want a yellowish star.
    context.strokeStyle = "rgba(255,200,30,0.9)";

    // puts the 2d drawing context into drawing mode
    context.beginPath();

    // Math.
    var lastX = Math.cos(0),
        lastY = Math.sin(0);
    context.moveTo(lastX, lastY);
    for (var counter = 1; counter < 7; counter++) {
        lastX = Math.cos(nextIndex * starAngle);
        lastY = Math.sin(nextIndex * starAngle);
        context.lineTo(lastX, lastY);
        nextIndex = (nextIndex + 2) % 5;
    }

    // stroke our shape
    context.stroke();

    // tells 2d drawing context we're done drawing
    context.closePath();

    // restores canvas state (e.g. origin and other settings)
    context.restore();
}

function drawHeart(context) {
    var radians = 45;
    var posX = 50;
    var posY = 50;

    // baseLen is essentially a scale indicator
    // e.g. length of the *square* part of a heart
    var baseLen = 8;

    context.save();

    // this moves origin 0,0 to our desired location
    context.translate(posX, posY);

    // optional: use context.rotate(0) to visualize
    // how we're drawing the heart using a square
    // and two half-circles
    context.rotate(4);

    // We want a pinkish heart.
    context.fillStyle = "rgba(255,100,100,0.9)";

    // puts the 2d drawing context into drawing mode
    context.beginPath();
    context.moveTo(-baseLen, 0);
    context.arc(0, 0, baseLen, 0, Math.PI, false);
    context.lineTo(baseLen, 0);
    context.arc(baseLen, -baseLen, baseLen, Math.PI * 90 / 180, Math.PI * 270 / 180, true);
    context.lineTo(baseLen, -baseLen * 2);
    context.lineTo(-baseLen, -baseLen * 2);
    context.lineTo(-baseLen, 0);

    // Fill the heart
    context.fill();

    // tells 2d drawing context we're done drawing
    context.closePath();

    // restores canvas state (e.g. origin and other settings)
    context.restore();
}

function init() {
    var canvas = document.getElementById("workspace");
    var context = canvas && canvas.getContext && canvas.getContext("2d");

    if (context) {
        drawStar(context);
        drawHeart(context);
    }
}

document.addEventListener("DOMContentLoaded", init, false);​
