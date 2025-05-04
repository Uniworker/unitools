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

const ItemCtrl = ( function() {
  
  const Item = function(id, url, shortUrl) {
    this.id = id;
    this.url = url;
    this.shortUrl = shortUrl;
  }

  const data = {
    items: [
      { id: 0,
        url: '',
        shortUrl: ''}
    ],
    currentItem: null
  }

  return {
    logData: function () {
      return data;
    },
    addLink: async function (link) {
      let ID;
      if (data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }
      let shortLink = await ItemCtrl.generateLink(link)
      newItem = new Item(ID, link, shortLink);
      data.items.push(newItem);
      return newItem;
    },
    generateLink: async function (url) {
      return await fetch('https://url-shortener-service.p.rapidapi.com/shorten', {
        method: 'POST',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'X-RapidAPI-Key': 'a56d5544damsh258cedd1ff8904ep15d5b0jsn5efa4ae15590',
          'X-RapidAPI-Host': 'url-shortener-service.p.rapidapi.com'
        },
        body: new URLSearchParams({ url: `${url}` })
      })
        .then(response => response.json())
        .then(data => data.result_url)
        .catch(err => console.error(err));
    },
    getItemById: function (id) {
      let found = null;
      data.items.forEach(item => {
        if (item.id === id) {
          found = item;
        }
      });
      return found;
    },
    setCurrentLink: function (link) {
      data.currentItem = link;
      return data.currentItem.shortUrl;
    }
  }
})()

const UICtrl = (function() {
  const UISelectors = {
    linkInput: '#longlink',
    shortItBtn: '#shortener',
    linksContainer: '#list',
    errorMsg: '#error',
    copyLink: '#copy'
  }

  return {
    getSelectors: function() {
      return UISelectors;
    },
    getLinkInput: function() {
      return {
        longLink: document.querySelector(UISelectors.linkInput).value
      }
    },
    errorLink: function() {
      const errorMsg = document.querySelector(UISelectors.errorMsg)
      errorMsg.className = 'main__error'
      errorMsg.classList.add('active')
      setTimeout(() => {
        errorMsg.classList.remove('active')
      }, 2500)
      UICtrl.clearInput()
    },
    clearInput: function() {
      document.querySelector(UISelectors.linkInput).value = ''
    },
    addListLink: function(item) {
      const li =  document.createElement('li')
      li.className = 'list__link';
      li.classList.add('flex-grid')
      li.id = `link-${item.id}`;
      li.innerHTML = `<span class="link__long">${item.url}</span>
                      <span class="link__short">${item.shortUrl}</span>
                      <button class="link__btn btn btn--secondary" id="copy">Copy</button>`
      document.querySelector(UISelectors.linksContainer).insertAdjacentElement('beforeend', li)
    },
    copyShortLink: function(link) {
      const textarea = document.createElement('textarea')
      const copiedLink = link
      textarea.value = copiedLink
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      textarea.remove()
    },
    changeButton: function(el) {
      el.style.backgroundColor = '#3498db'
      el.style.borderColor = '#3498db'
      el.textContent = 'Copied'
    }
  }
})()

const App = (function(ItemCtrl, UICtrl) {
  const loadEventListeners = function() {
    const UISelectors = UICtrl.getSelectors()
    document.querySelector(UISelectors.shortItBtn).addEventListener('click', addLink)
    document.querySelector(UISelectors.linksContainer).addEventListener('click', copyLink)
  }

  const addLink = async function(e) {
    const input = UICtrl.getLinkInput()
    if(input.longLink !== false) {
      const re = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
      if(re.test(input.longLink) == false) {
        UICtrl.errorLink()
      } else if(re.test(input.longLink) == true) {
        const newLink = await ItemCtrl.addLink(input.longLink)
        UICtrl.addListLink(newLink)
        UICtrl.clearInput()
      }
    }
    e.preventDefault()
  }

  const copyLink = function(e) {
    if (e.target.classList.contains('link__btn')) {
      const linkId = e.target.parentNode.id
      const linkArr = linkId.split('-')
      const id = parseInt(linkArr[1])
      const linkToCopy = ItemCtrl.getItemById(id)
      const currentLink = ItemCtrl.setCurrentLink(linkToCopy)
      UICtrl.copyShortLink(currentLink)
      UICtrl.changeButton(e.target)
    }
  }

  return {
    init: function() {
      loadEventListeners();
    }
  }
})(ItemCtrl, UICtrl)

window.onload = function() {
  showParticles(settings)
  document.forms.sender.addEventListener('submit', function (e) {
    e.preventDefault();
  })
  App.init()
}