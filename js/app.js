"use strict";

const root = document
const pick = root.querySelector.bind(root)
const pickAll = root.querySelectorAll.bind(root)
const viewport = window.innerWidth || root.documentElement.clientWidth;
const tools = pickAll('#tools li');
const settings = {
    "particles": {
        "number": {
            "value": 160,
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": "#fef9e7"
        },
        "shape": {
            "type": "circle",
            "stroke": {
                "width": 0,
                "color": "#000000"
            },
            "polygon": {
                "nb_sides": 5
            },
            "image": {
                "src": "img/github.svg",
                "width": 100,
                "height": 100
            }
        },
        "opacity": {
            "value": 1,
            "random": true,
            "anim": {
                "enable": true,
                "speed": 1,
                "opacity_min": 0,
                "sync": false
            }
        },
        "size": {
            "value": 3,
            "random": true,
            "anim": {
                "enable": false,
                "speed": 4,
                "size_min": 0.3,
                "sync": false
            }
        },
        "line_linked": {
            "enable": false,
            "distance": 150,
            "color": "#ffffff",
            "opacity": 0.4,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 1,
            "direction": "none",
            "random": true,
            "straight": false,
            "out_mode": "out",
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 600
            }
        }
    },
    "interactivity": {
        "detect_on": "window",
        "events": {
            "onhover": {
                "enable": false,
                "mode": "repulse"
            },
            "onclick": {
                "enable": true,
                "mode": "repulse"
            },
            "resize": true
        },
        "modes": {
            "grab": {
                "distance": 300,
                "line_linked": {
                    "opacity": 1
                }
            },
            "bubble": {
                "distance": 300,
                "size": 15,
                "duration": 2,
                "opacity": 2,
                "speed": 3
            },
            "repulse": {
                "distance": 300
            },
            "push": {
                "particles_nb": 4
            },
            "remove": {
                "particles_nb": 4
            }
        }
    },
    "retina_detect": true
}

/* Elements performance optimisation
if (document.readyState == 'loading' || document.readyState == 'interactive') {
  document.getElementById('button').style.willChange = 'transform';
  tools.forEach(function (tool, i) {
    tools[i].style.willChange = 'transform, opacity';
  });
}
*/
function showParticles(settings) {
    return particlesJS('particles', settings)
}

window.onload = function () {
    pick('#sound').volume = 0.25
    showParticles(settings)
    let lastTouchTime = 0;
    root.addEventListener('touchstart', function () {
        lastTouchTime = new Date();
        root.body.classList.remove('hovered');
    }, true);
    root.addEventListener('mousemove', function () {
        if (new Date() - lastTouchTime < 500) return;
        root.body.classList.add('hovered');
    }, true);
    pick('#menu').addEventListener('click', function (e) {
        e.currentTarget.classList.toggle('--closed');
        e.currentTarget.classList.toggle('--open');
        let menuItem = function(i) {
            showItem(i)
        }
        for (let i = 0; i < tools.length; i++) {
            menuItem(i);
        }
    });
};

function showItem(item) {
    let distance = item * (360 / tools.length);
    if (pick('#menu').classList.contains('--open')) {
        tools[item].firstChild.classList.remove('sr-only');
        viewport > 767 ? tools[item].firstChild.style.cssText = 'height:64px;width:64px;margin-left:-200px;' : tools[item].firstChild.style.cssText = 'height:64px;width:64px;margin-left:-150px;';
        setRotation(tools[item], distance);
    } else {
        setRotation(tools[item], '-360');
        tools[item].firstChild.style.color = 'transparent';
        setTimeout(function () {
            tools[item].firstChild.classList.add('sr-only');
        }, 500);
    }
}

function setRotation(item, longitude) {
    item.style.transform = "rotate(".concat(longitude, "deg)");
    item.querySelector('a span').style.transform = "rotate(-".concat(longitude, "deg)");
}