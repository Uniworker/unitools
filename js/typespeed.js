const root = document
const pick = root.querySelector.bind(root)
const sc = pick('#sc').innerHTML = '60'
const ms = pick('#ms').innerHTML = '000'
var current = 0, record = 0, savedRandom = null, started = false
var text = ["Everyone has the right to freedom of thought, conscience and religion; this right includes freedom to change his religion or belief, and freedom, either alone or in community with others and in public or private, to manifest his religion or belief in teaching, practice, worship and observance. Everyone has the right to freedom of opinion and expression; this right includes freedom to hold opinions without interference and to seek, receive and impart information and ideas through any media and regardless of frontiers. Everyone has the right to freedom of peaceful assembly and association. No one may be compelled to belong to an association.",
"All human beings are born free and equal in dignity and rights. They are endowed with reason and conscience and should act towards one another in a spirit of brotherhood. Everyone is entitled to all the rights and freedoms set forth in this Declaration, without distinction of any kind, such as race, colour, sex, language, religion, political or other opinion, national or social origin, property, birth or other status. Furthermore, no distinction shall be made on the basis of the political, jurisdictional or international status of the country or territory to which a person belongs, whether it be independent, trust, non-self-governing or under any other limitation of sovereignty.",
"Everyone, as a member of society, has the right to social security and is entitled to realization, through national effort and international co-operation and in accordance with the organization and resources of each State, of the economic, social and cultural rights indispensable for his dignity and the free development of his personality. Any person has the right to work, to free choice of employment, to just and favourable conditions of work and to protection against unemployment. Everybody has the right to rest and leisure, including reasonable limitation of working hours and periodic holidays with pay."
]
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
window.onload = function() {
    showParticles(settings)
    pick('#current').innerHTML = current
    pick('#record').innerHTML = record
    pick("#maxtime").innerHTML = Number(sc)
    pick('#content').innerHTML = text[getRandom(text)]
    pick('#symbols').innerHTML = text[getRandom(text)].length
    pick('#refresh').addEventListener('click', (e) => {
        savedRandom = null
        pick('#content').innerHTML = text[getRandom(text)]
        pick('#symbols').innerHTML = text[getRandom(text)].length
    })
    pick('#text').addEventListener('input', (e) => {
        const typed = e.target.value           // what the user typed
        const target = text[getRandom(text)]   // the reference text
        const correctNext = target.substring(0, typed.length)

        if (typed !== correctNext) {
            e.target.value = typed.slice(0, typed.length - 1)
            return
        }
        pick('#refresh').disabled = true
        pick('#current').innerHTML = typed.length
        runApp(typed)
        if (typed.length > record) {
            record = typed.length
        }
    })

}
function showParticles(settings) {
    return particlesJS('particles', settings)
}
function getRandom(elem) {
    if(savedRandom === null) {
        savedRandom = Math.floor(Math.random() * elem.length)
    }
    return savedRandom
}
function runApp(t) {
    if (!started) {
        runTimer(Number(sc))
        started = true;
    }
    pick('#content').innerHTML = text[getRandom(text)].replace(t, `<g>${t}</g>`)
    return t
}
function resetAll() {
  setTimeout(() => {
    started = false
    pick('#refresh').disabled = false
    pick('#text').value = ''
    pick('#sc').innerHTML = '60'
    pick('#ms').innerHTML = '000'
    pick('#current').innerHTML = '0'
    pick('#record').innerHTML = record
    pick('#loader').remove()
    pick('#panel').style.cssText = 'background: transparent; opacity: 1; transition: all 0.5s linear'
  }, 2000)
  pick('#panel').style.cssText = 'background: rgba(0, 0, 0, 0.7); opacity: 0.3; transition: all 0.5s linear'
  let div = document.createElement('div')
  div.className = 'typetest__loader'
  div.id = 'loader'
  document.documentElement.append(div)
}
function runTimer(t = 60) {
  const miliseconds = 1000
  var seconds = t * miliseconds
  const step = 60
  var tick = setInterval(() => {
    seconds -= step
    const remaining_sc = Math.floor(seconds / miliseconds)
    const remaining_ms = seconds % miliseconds
    pick('#ms').innerHTML = remaining_ms
    pick('#sc').innerHTML = remaining_sc
    if (seconds <= 0) {
      resetAll()
      clearInterval(tick)
    }
  }, step)
}