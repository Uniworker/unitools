const root = document
const pick = root.querySelector.bind(root)
const sc = pick('#sc').innerHTML = '60'
const ms = pick('#ms').innerHTML = '000'
var current = 0, record = 0, savedRandom = null, started = false
var text = ["Агнец у вас должен быть без порока, мужеского пола, однолетний; возьмите его от овец, или от коз, и пусть он хранится у вас до четырнадцатого дня сего месяца: тогда пусть заколет его все собрание общества Израильского вечером, и пусть возьмут от крови его и помажут на обоих косяках и на перекладине дверей в домах, где будут есть его; пусть съедят мясо его в сию самую ночь, испеченное на огне; с пресным хлебом и с горькими травами пусть съедят его; не ешьте от него недопеченного, или сваренного в воде, но ешьте испеченное на огне, голову с ногами и внутренностями; не оставляйте от него до утра; но оставшееся от него до утра сожгите на огне.",
"Рождество Иисуса Христа было так: по обручении Матери Его Марии с Иосифом, прежде нежели сочетались они, оказалось, что Она имеет во чреве от Духа Святаго. Иосиф же муж Ее, будучи праведен и не желая огласить Ее, хотел тайно отпустить Ее. Но когда он помыслил это, - се, Ангел Господень явился ему во сне и сказал: Иосиф, сын Давидов! не бойся принять Марию, жену твою, ибо родившееся в Ней есть от Духа Святаго; родит же Сына, и наречешь Ему имя Иисус, ибо Он спасет людей Своих от грехов их. А все сие произошло, да сбудется реченное Господом через пророка, который говорит: се, Дева во чреве приимет и родит Сына, и нарекут имя Ему Еммануил, что значит: с нами Бог.",
"И сказал Господь Бог: не хорошо быть человеку одному; сотворим ему помощника, соответственного ему. Господь Бог образовал из земли всех животных полевых и всех птиц небесных, и привел к человеку, чтобы видеть, как он назовет их, и чтобы, как наречет человек всякую душу живую, так и было имя ей. И нарек человек имена всем скотам и птицам небесным и всем зверям полевым; но для человека не нашлось помощника, подобного ему. И навел Господь Бог на человека крепкий сон; и, когда он уснул, взял одно из ребр его, и закрыл то место плотию. И создал Господь Бог из ребра, взятого у человека, жену, и привел ее к человеку. И сказал человек: вот, это кость от костей моих и плоть от плоти моей; она будет называться женою, ибо взята от мужа. Потому оставит человек отца своего и мать свою и прилепится к жене своей; и будут одна плоть.",
"Он был презрен и умален пред людьми, муж скорбей и изведавший болезни, и мы отвращали от Него лице свое; Он был презираем, и мы ни во что ставили Его. Но Он взял на Себя наши немощи и понес наши болезни; а мы думали, что Он был поражаем, наказуем и уничижен Богом. Но Он изъязвлен был за грехи наши и мучим за беззакония наши; наказание мира нашего было на Нем, и ранами Его мы исцелились. Все мы блуждали, как овцы, совратились каждый на свою дорогу: и Господь возложил на Него грехи всех нас. Он истязуем был, но страдал добровольно и не открывал уст Своих; как овца, веден был Он на заклание, и как агнец пред стригущим его безгласен, так Он не отверзал уст Своих.",
"В восьмой день пришли обрезать младенца и хотели назвать его, по имени отца его, Захариею. На это мать его сказала: нет, а назвать его Иоанном. И сказали ей: никого нет в родстве твоем, кто назывался бы сим именем. И спрашивали знаками у отца его, как бы он хотел назвать его. Он потребовал дощечку и написал: Иоанн имя ему. И все удивились. И тотчас разрешились уста его и язык его, и он стал говорить, благословляя Бога. И был страх на всех живущих вокруг них; и рассказывали обо всем этом по всей нагорной стране Иудейской. Все слышавшие положили это на сердце своем и говорили: что будет младенец сей? И рука Господня была с ним.",
"И ты, Вифлеем-Ефрафа, мал ли ты между тысячами Иудиными? из тебя произойдет Мне Тот, Который должен быть Владыкою в Израиле и Которого происхождение из начала, от дней вечных. Посему Он оставит их до времени, доколе не родит имеющая родить; тогда возвратятся к сынам Израиля и оставшиеся братья их. И станет Он, и будет пасти в силе Господней, в величии имени Господа Бога Своего, и они будут жить безопасно, ибо тогда Он будет великим до краев земли. И будет Он мир. Когда Ассур придет в нашу землю и вступит в наши чертоги, мы выставим против него семь пастырей и восемь князей. И будут они пасти землю Ассура мечом и землю Немврода в самых воротах ее, и Он-то избавит от Ассура, когда тот придет в землю нашу и когда вступит в пределы наши.",
"И Ангелу Лаодикийской церкви напиши: так говорит Аминь, свидетель верный и истинный, начало создания Божия: знаю твои дела; ты ни холоден, ни горяч; о, если бы ты был холоден, или горяч! Но, как ты тепл, а не горяч и не холоден, то извергну тебя из уст Моих. Ибо ты говоришь: 'я богат, разбогател и ни в чем не имею нужды '; а не знаешь, что ты несчастен, и жалок, и нищ, и слеп, и наг. Советую тебе купить у Меня золото, огнем очищенное, чтобы тебе обогатиться, и белую одежду, чтобы одеться и чтобы не видна была срамота наготы твоей, и глазною мазью помажь глаза твои, чтобы видеть. Кого Я люблю, тех обличаю и наказываю. Итак будь ревностен и покайся. Се, стою у двери и стучу: если кто услышит голос Мой и отворит дверь, войду к нему, и буду вечерять с ним, и он со Мною."
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