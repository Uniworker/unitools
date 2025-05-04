"use strict"

const root = document
const pick = root.querySelector.bind(root)
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

window.onload = function() {
    showParticles(settings)
    pick('#url').addEventListener('input', function(e) {
        const url = e.currentTarget.value.trim()
        const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/
        url.match(urlRegex) ? pick('#qrmaker').disabled = false : pick('#qrmaker').disabled = true
    })
    pick('#qrmaker').addEventListener('click', function(e) {
        pick('#qrField').parentNode.classList.remove('sr-only')
        setQRCode()
    })
}

function setQRCode() {
    const link = pick('#url').value
    if (link) {
        const qr = new QRious({
            background: '#fef9e7',
            element: pick('#qrField'),
            foreground: '#0a0a0a',
            size: 300,
            value: link
        })
    }
}