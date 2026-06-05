"use strict";

var touches = [];
var cc = [];
var painter = 0;
var canvas = 0;
var color = 'white';
var colors = 0;
var isPressed = false;
var t0, t1 = 0;
const dpr = window.devicePixelRatio || 1;
window.onload = function (e) {
    showParticles(settings)
    t0 = performance.now();
    colors = document.querySelectorAll('button[data-color]');
    colors[0].style.boxShadow = "0 0 2px 4px ".concat(color);
    document.addEventListener('click', function (e) {
        if (e.target.hasAttribute('data-color')) {
            colors[0].style.boxShadow = 'none';
            e.target.style.boxShadow = "0 0 2px 4px ".concat(e.target.dataset.color);
            color = e.target.dataset.color;
            cc.push(color);
            for (var i = 0; i < colors.length; i++) {
                if (cc.length > 1 && colors[i].dataset.color == cc[cc.length - 2]) colors[i].style.boxShadow = 'none';
            }
            if (cc.length > 2) cc.shift(color);
            console.log(cc);
        }
        if (e.target.closest('#cleaner')) painter.clearRect(0, 0, canvas.width, canvas.height);
    });
    document.getElementById('resizer').addEventListener('change', function (e) {
        e.target.parentNode.parentNode.style.setProperty('--thickness', e.target.value)
        painter.lineWidth = e.target.value;
    })
    canvas = document.getElementById('canvas');
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    canvas.width = Math.round(window.innerWidth * dpr);
    canvas.height = Math.round(window.innerHeight * dpr);
    painter = canvas.getContext('2d');
    painter.scale(dpr, dpr);
    painter.lineWidth = document.getElementById('resizer').value;
    canvas.addEventListener('mousemove', handleMove);
    canvas.addEventListener('mousedown', handleDown);
    canvas.addEventListener('mouseup', handleUp);
    canvas.addEventListener('touchstart', handleStart, false);
    canvas.addEventListener('touchend', handleEnd, false);
    canvas.addEventListener('touchcancel', handleCancel, false);
    canvas.addEventListener('touchmove', handleTouchMove, false);
    function rect() { return canvas.getBoundingClientRect(); }
    function mousePosFromEvent(e) {
        const r = rect();
        return { x: e.clientX - r.left, y: e.clientY - r.top };
    }
    function touchPos(t) {
        const r = rect();
        return { x: t.clientX - r.left, y: t.clientY - r.top };
    }
    function handleDown(e) {
        isPressed = true;
        const p = mousePosFromEvent(e);
        painter.beginPath();
        painter.moveTo(p.x, p.y);
    }
    function handleMove(e) {
        if (!isPressed) return;
        const p = mousePosFromEvent(e);
        painter.lineTo(p.x, p.y);
        painter.strokeStyle = color;
        painter.stroke();
    }
    function handleUp() {
        isPressed = false;
    }
    function handleStart(e) {
        const changes = e.changedTouches;
        for (let i = 0; i < changes.length; i++) {
            const t = changes[i];
            e.preventDefault();
            touches.push(copyTouch(t));
            const p = touchPos(t);
            painter.beginPath();
            painter.moveTo(p.x, p.y);
        }
    }
    function handleTouchMove(e) {
        const changes = e.changedTouches;
        for (let i = 0; i < changes.length; i++) {
            const t = changes[i];
            const idx = ongoingTouchIndexById(t.identifier);
            if (idx >= 0) {
                e.preventDefault();
                const prev = touches[idx];
                const from = { x: prev.clientX - rect().left, y: prev.clientY - rect().top };
                const to = touchPos(t);
                painter.beginPath();
                painter.moveTo(from.x, from.y);
                painter.lineTo(to.x, to.y);
                painter.strokeStyle = color;
                painter.stroke();
                touches.splice(idx, 1, copyTouch(t));
            }
        }
    }
    function handleEnd(e) {
        const changes = e.changedTouches;
        for (let i = 0; i < changes.length; i++) {
            const t = changes[i];
            const idx = ongoingTouchIndexById(t.identifier);
            if (idx >= 0) {
                e.preventDefault();
                touches.splice(idx, 1);
            }
        }
    }
    function handleCancel(e) {
        e.preventDefault();
        var changes = e.changedTouches;
        for (var i; i < changes.length; i++) {
            touches.splice(i, 1);
        }
    }
    function copyTouch(touch) {
        return {
            identifier: touch.identifier,
            clientX: touch.clientX,
            clientY: touch.clientY
        };
    }
    function ongoingTouchIndexById(idToFind) {
        for (var i = 0; i < touches.length; i++) {
            var id = touches[i].identifier;
            if (id == idToFind) return i;
        }
        return -1;
    }
    t1 = performance.now();
    console.log("Loaded for ".concat(t1 - t0));
};
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
function showParticles(settings) {
    return particlesJS('particles', settings)
}