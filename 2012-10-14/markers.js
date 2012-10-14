#!/usr/bin/env node
/* The MIT License
 
    Copyright (c) 2011 Jim Schubert

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.
*/
var p = require('util').puts;

try {
    var probe = require('canvas');
}catch(e) {
    p("Cannot find node-canvas module.");
    p("Did you install dependencies:\n");
    p("\tnpm install -d");
    process.exit();
}

var fs = require('fs');
var Canvas = require('canvas');
var Image = Canvas.Image;

var canvas, ctx, baseImage, outImage, img;

var init = function() {
    // our working image is 35x35, we want 10x10 sheet of sprites
    canvas = new Canvas(35*10,35*10);
    ctx = canvas.getContext('2d');
    baseImage = __dirname + '/base.png';
    outImage = __dirname + '/markers.png';

    // pre-load the image
    img = new Image;
    img.onload = function() {
        processImage(fileProcessingComplete);
    };

    img.src = baseImage;
};

var processImage = function(cb) {
    ctx.font = 'normal 12px Impact';
    ctx.textAlign = 'center';
    var color = [255, 255, 0, 235];

    // use a temp Canvas and Context of 35x35 size.
    var tempCanvas = new Canvas(35,35);
    var tempCtx = tempCanvas.getContext('2d');

    for(var magnitude = 0; magnitude <= 100; magnitude++) {
        var y = 35 * Math.floor(magnitude/10),
            x = ( 35*(magnitude % 10) );

        // This increments the color slightly
        if(magnitude % 5 == 0){
            color[1] = color[1] - 13;
        }

        tempCtx.drawImage(img, 0, 0, 35,35);
        var imgData = tempCtx.getImageData(0, 0, 35, 35);
        var data = imgData && imgData.data;
        if(data) {
            try {
                for(var pixel=0;pixel<data.length;pixel=pixel+4) {
                    var red = data[pixel]
                    var green = data[pixel+1];
                    var blue = data[pixel+2];
                    var alpha = data[pixel+3];

                    if(red == 255 && green == 255 && blue == 255) {
                        data[pixel] = color[0];
                        data[pixel+1] = color[1];
                        data[pixel+2] = color[2];
                        data[pixel+3] = color[3];
                    }
                }
            } catch (err) { console.error(err.message); }

            // Write our temp image data to the final canvas context
            /* imageData, dx, dy, sx, sy, sw, sh */
            ctx.putImageData(imgData,x,y,0,0, 35, 35);
        }

        ctx.fillText("" + parseFloat(magnitude / 10, 1), x + (35/2), y + (35/2), 35);
    }

    if(typeof cb === "function") {
        cb.call(this);
    }
}

var fileProcessingComplete = function() {
    var out = fs.createWriteStream(outImage),
    stream = canvas.createPNGStream();

    stream.on('data', function(chunk){
      out.write(chunk);
    });

    // when PNG stream is done, drain WriteStream
    stream.on('end', function(){
      p('saved ' + outImage);
      out.destroySoon();
    });
};

init();
