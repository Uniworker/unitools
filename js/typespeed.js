const root = document
const pick = root.querySelector.bind(root)
const sc = pick('#sc').innerHTML = '60'
const ms = pick('#ms').innerHTML = '000'
var current = 0, record = 0, savedRandom = null, started = false
var text = ["Агнец у вас должен быть без порока, мужеского пола, однолетний; возьмите его от овец, или от коз, и пусть он хранится у вас до четырнадцатого дня сего месяца: тогда пусть заколет его все собрание общества Израильского вечером, и пусть возьмут от крови его и помажут на обоих косяках и на перекладине дверей в домах, где будут есть его; пусть съедят мясо его в сию самую ночь, испеченное на огне; с пресным хлебом и с горькими травами пусть съедят его; не ешьте от него недопеченного, или сваренного в воде, но ешьте испеченное на огне, голову с ногами и внутренностями; не оставляйте от него до утра; но оставшееся от него до утра сожгите на огне.",
"Ешьте же его так: пусть будут чресла ваши препоясаны, обувь ваша на ногах ваших и посохи ваши в руках ваших, и ешьте его с поспешностью: это - Пасха Господня. А Я в сию самую ночь пройду по земле Египетской и поражу всякого первенца в земле Египетской, от человека до скота, и над всеми богами Египетскими произведу суд. Я Господь. И будет у вас кровь знамением на домах, где вы находитесь, и увижу кровь и пройду мимо вас, и не будет между вами язвы губительной, когда буду поражать землю Египетскую. И да будет вам день сей памятен, и празднуйте в оный праздник Господу во все роды ваши; как установление вечное празднуйте его.",
"Семь дней ешьте пресный хлеб; с самого первого дня уничтожьте квасное в домах ваших, ибо кто будет есть квасное с первого дня до седьмого дня, душа та истреблена будет из среды Израиля. И в первый день да будет у вас священное собрание, и в седьмой день священное собрание: никакой работы не должно делать в них; только что есть каждому, одно то можно делать вам. Наблюдайте опресноки, ибо в сей самый день Я вывел ополчения ваши из земли Египетской, и наблюдайте день сей в роды ваши, как установление вечное. С четырнадцатого дня первого месяца, с вечера ешьте пресный хлеб до вечера двадцать первого дня того же месяца."
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
window.onload = function () {
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
    if (savedRandom === null) {
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