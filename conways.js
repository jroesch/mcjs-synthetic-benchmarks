/* http://js1k.com/2013-spring/demo/1478 */


/* var b = document.body;
var c = document.getElementsByTagName('canvas')[0];
var a = c.getContext('2d'); */
		
// Screen setup
c.width = 520; c.height = 520;

var a = {
    clearRect: function(a, b, c, d) {},
    fillRect: function(a, b, c, d) {}
}


// Listeners
//onkeydown = keydown;
//addEventListener('mouseup', click);

// Loop
//setInterval(simulate, 100);

// Variables
var size = 64;
var map = new Array(size*size);
var started = false;

// Initial cells
map[519] = map[520] = map[521] = map[457] = map[392] = 1;

// Draw map
function drawMap() {
    a.clearRect(0,0,512,512);
    for (i = 0; i<size; ++i) {
        for (j = 0; j<size; ++j) {
            if (map[i*size+j]) {
                a.fillRect(j*8, i*8, 8, 8);
            }
        }
    }
}

// Simulate world
function simulate() {
    if (!started) return;
    
    // Clone map
    var clone = map.slice(0);
    
    for(y = 0; y<size; ++y) {
        for (x = 0; x<size; ++x) {
        
            // Count neighbors
            neighbors = 0;
            for (i = -1; i <= 1; ++i) {
                for (j = -1; j <= 1; ++j) {
                
                    if (!(i == 0 && j == 0) && y+i < size && y+i >= 0 && x+j < size && x+j >= 0) {
                        if (clone[(y+i)*size+x+j]) {
                            neighbors++;
                        }
                    }
                }
            }
            
            // Modify cells
            if (clone[y*size+x]) {
                if (neighbors > 3 || neighbors < 2) {
                    map[y*size+x] = 0;
                }
            } else {
                if (neighbors == 3) {
                    map[y*size+x] = 1;
                }
            }
        }
    }
    
    drawMap();
}

// Add cell
function click(event) {
    x = (event.clientX-8)/8|0;
    y = (event.clientY-8)/8|0;
    map[y*size+x] = 1;
    drawMap();
}

// Change started
function keydown(event) {
    started = !started;
}

// Draw initial map
drawMap();

/* Simulate here */
var i = 0;

/* do it many times */
while(i < 1000000) {
    /* every 10 turn the simulation on */
    if (i % 10 === 0) keydown();
    /* try and run the simulation */
    simulate();
    /* fire a random event */
    click({ clientX: Math.round(Math.random() * 520), 
            clientY: Math.round(Math.random() * 520) });
    i++;
}
