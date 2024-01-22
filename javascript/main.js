const links = document.querySelectorAll('.experienceswarp__portolink glightboxcontainer');
links.forEach(function(link) {
  link.addEventListener('click', function(event) {
    event.stopPropagation();
  });
});
//mode dark
// Fonction pour activer/désactiver le mode "dark"
function toggleDarkMode() {
    var body = document.body;
    body.classList.toggle("dark-mode");
  }
  
  // Ajouter un gestionnaire d'événement pour le changement d'état de la case à cocher
  document.getElementById("switch").addEventListener("change", toggleDarkMode);


//Formulaire de contact
// Récupérez le formulaire et les éléments de la fenêtre modale personnalisée
const form = document.getElementById("formcontact");
const customModal = document.getElementById("customModal");
const modalMessage = document.getElementById("modalMessage");
const closeBtn = document.querySelector(".close-btn");

// Ajoutez un écouteur d'événement à la soumission du formulaire
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Empêche l'envoi du formulaire pour éviter le rafraîchissement de la page

  // Validation des champs côté client (ajoutez les validations nécessaires)
  const nameInput = document.getElementById("yourname");
  const emailInput = document.getElementById("yourmail");
  const commentInput = document.getElementById("comment");

  if (
    nameInput.value.trim() === "" ||
    emailInput.value.trim() === "" ||
    commentInput.value.trim() === ""
  ) {
    alert("Veuillez remplir tous les champs obligatoires.");
    return;
  }

  // Récupérer les données du formulaire
  var formData = new FormData(form);

  // Effectuer la requête Fetch
  fetch("contact.php", {
    method: "POST",
    body: formData,
  })
    .then(function (response) {
      return response.text(); // Récupérer la réponse en tant que texte
    })
    .then(function (responseText) {
      console.log(responseText); // Afficher la réponse dans la console
      // Autres actions à effectuer après le traitement du formulaire

      // Définissez le message dans la fenêtre modale
      const messageText = "Votre message a bien été envoyé! ";
      const additionalText = "Je vous répondrai dans les meilleurs délais.";
      modalMessage.innerText = messageText + additionalText;

      // Affichez la fenêtre modale personnalisée
      customModal.style.display = "block";

      // Réinitialisez les champs du formulaire après avoir affiché la fenêtre modale personnalisée
      form.reset();

      // Rechargez la page après quelques secondes (par exemple, 3 secondes)
      setTimeout(function () {
        customModal.style.display = "none";
        window.location.reload();
      }, 3000); // 3 secondes de délai avant le rechargement de la page
    })
    .catch(function (error) {
      console.error("Erreur lors de la requête AJAX :", error);
      alert("Une erreur s'est produite lors de l'envoi du formulaire.");
    });
});

// Ajoutez un écouteur d'événement pour fermer la fenêtre modale personnalisée
closeBtn.addEventListener("click", function () {
  customModal.style.display = "none";
});



//button telecharger
document.querySelectorAll(".button").forEach((button) => {
  let duration = 3000,
    svg = button.querySelector("svg"),
    svgPath = new Proxy(
      {
        y: null,
        smoothing: null,
      },
      {
        set(target, key, value) {
          target[key] = value;
          if (target.y !== null && target.smoothing !== null) {
            svg.innerHTML = getPath(target.y, target.smoothing, null);
          }
          return true;
        },
        get(target, key) {
          return target[key];
        },
      }
    );

  button.style.setProperty("--duration", duration);

  svgPath.y = 20;
  svgPath.smoothing = 0;

  button.addEventListener("click", (e) => {
    if (!button.classList.contains("loading")) {
      button.classList.add("loading");

      gsap.to(svgPath, {
        smoothing: 0.3,
        duration: (duration * 0.065) / 1000,
      });

      gsap.to(svgPath, {
        y: 12,
        duration: (duration * 0.265) / 1000,
        delay: (duration * 0.065) / 1000,
        ease: Elastic.easeOut.config(1.12, 0.4),
        onComplete: () => {
          if (!button.disabled) {
            window.location.href = button.href; // Rediriger vers l'URL du lien
            button.disabled = true; // Désactiver le bouton après le premier clic
          }
        },
      });

      setTimeout(() => {
        svg.innerHTML = getPath(0, 0, [
          [3, 14],
          [8, 19],
          [21, 6],
        ]);
      }, duration / 2);
    }

    e.preventDefault();
  });
});

function getPoint(point, i, a, smoothing) {
  let cp = (current, previous, next, reverse) => {
    let p = previous || current,
      n = next || current,
      o = {
        length: Math.sqrt(Math.pow(n[0] - p[0], 2) + Math.pow(n[1] - p[1], 2)),
        angle: Math.atan2(n[1] - p[1], n[0] - p[0]),
      },
      angle = o.angle + (reverse ? Math.PI : 0),
      length = o.length * smoothing;
    return [
      current[0] + Math.cos(angle) * length,
      current[1] + Math.sin(angle) * length,
    ];
  };
  let cps = cp(a[i - 1], a[i - 2], point, false),
    cpe = cp(point, a[i - 1], a[i + 1], true);
  return `C ${cps[0]},${cps[1]} ${cpe[0]},${cpe[1]} ${point[0]},${point[1]}`;
}

function getPath(update, smoothing, pointsNew) {
  let points = pointsNew
    ? pointsNew
    : [
        [4, 12],
        [12, update],
        [20, 12],
      ];
  let d = points.reduce(
    (acc, point, i, a) =>
      i === 0
        ? `M ${point[0]},${point[1]}`
        : `${acc} ${getPoint(point, i, a, smoothing)}`,
    ""
  );
  return `<path d="${d}" />`;
}

//debut
const marioninit = (function () {
  "use strict";
  // variable
  var header = document.querySelector("#headermain");
  var body = document.querySelector("body");
  var continuousElements = document.getElementsByClassName("sectionblock");
  var counter = document.querySelectorAll(".counterwrap__counter");
  var counters = document.querySelectorAll(".counterwrap__counter");
  var mobilelink = document.querySelectorAll(".overlay__listnav li a");
  var mobilenav = document.querySelector(".navicon");
  var mainSection = document.querySelectorAll("main div.sectionblock");
  var menuSection = document.querySelectorAll(".navpage__wrap li a");
  var goup = document.querySelector(".scroll-top");
  var sliderskills = document.getElementById("sliderskills");
  var yearele = document.querySelector(".years");
  var btnContainer = document.getElementById("filterwrap");
  var btns = btnContainer.getElementsByTagName("li");
  var expe = document.getElementById("experienceswarp");
  var Shuffle = window.Shuffle;
  var wrapper;
  var dots;
  var typedText = document.querySelector("#typed-text");
  var cursor = document.querySelector(".cursor");
  var textArrayIndex = 0;
  var charIndex = 0;
  var textArray = [" Web Developer.", "et web mobile"];
  var year = new Date().getFullYear();
  var revealPoint = 150;
  var interval = 0;
  var loop = 0;

  //var burger = document.querySelector('.mobilenav');
  //detect mobile device
  const isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (
        isMobile.Android() ||
        isMobile.BlackBerry() ||
        isMobile.iOS() ||
        isMobile.Opera() ||
        isMobile.Windows()
      );
    },
  };
  // loadder page
  const loadder = function (e) {
    setTimeout(() => {
      document.querySelector(".preloader").style.display = "none";
    }, 1000);
  };
  // GLightbox
  const glight = function (e) {
   
    GLightbox();
  };
  
  // shuffle Experiences
  const experiences = function (e) {
    var myShuffle = new Shuffle(expe, {
      itemSelector: ".experienceswarp__item",
      buffer: 0,
      columnThreshold: 0.01,
      columnWidth: 0,
      delimiter: null,
      sizer: null,
      speed: 250,
      filterMode: Shuffle.FilterMode.ANY,
      group: Shuffle.ALL_ITEMS,
    });
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function (e) {
        document.querySelector(".active").classList.remove("active");
        document.querySelector(".active")
          ? document.querySelector(".active").classList.remove("active")
          : "";
        this.classList.add("active");
        myShuffle.filter(e.target.dataset.group);
      });
    }
  };
  //button lire la suite
  document.addEventListener("DOMContentLoaded", function () {
    const shortText = document.querySelector(".infoabout__short-text");
    const fullText = document.querySelector(".infoabout__full-text");
    const button = document.querySelector(".infoabout__button");

    // Cacher le texte complet au chargement de la page
    fullText.style.display = "none";

    // Gérer le clic sur le bouton
    button.addEventListener("click", function () {
      if (fullText.style.display === "none") {
        // Afficher le texte complet
        fullText.style.display = "block";
        button.innerHTML = "Réduire";
      } else {
        // Masquer le texte complet
        fullText.style.display = "none";
        button.innerHTML = "Lire la suite";
      }
    });
  });

  // scroll spy
  const scrolspy = function (e) {
    // for clickable event
    menuSection.forEach((v) => {
      v.onclick = () => {
        setTimeout(() => {
          menuSection.forEach((j) => j.classList.remove("activelink"));
          v.classList.add("activelink");
        }, 300);
      };
    });
    // for window scroll spy event
    window.onscroll = () => {
      mainSection.forEach((v, i) => {
        let rect = v.getBoundingClientRect().y;
        if (rect < window.innerHeight - 100) {
          menuSection.forEach((v) => v.classList.remove("activelink"));
          menuSection[i].classList.add("activelink");
        }
      });
    };
  };

  //animated typed init ------------------------
  const erase = function (e) {
    if (charIndex > 0) {
      cursor.classList.remove("blink");
      typedText.textContent = textArray[textArrayIndex].slice(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, 80);
    } else {
      cursor.classList.add("blink");
      textArrayIndex++;
      if (textArrayIndex > textArray.length - 1) {
        textArrayIndex = 0;
      }
      setTimeout(typeanimation, 1000);
    }
  };
  const typeanimation = function (e) {
    if (charIndex <= textArray[textArrayIndex].length - 1) {
      cursor.classList.remove("blink");
      typedText.textContent += textArray[textArrayIndex].charAt(charIndex);
      charIndex++;
      setTimeout(typeanimation, 120);
    } else {
      cursor.classList.add("blink");
      setTimeout(erase, 1000);
    }
  };
  /* scroll counter */
  counters.forEach(function (item) {
    item.counterAlreadyFired = false;
    item.counterSpeed = item.getAttribute("data-Speed") / 45;
    item.counterTarget = +item.innerText;
    item.counterCount = 0;
    item.counterStep = item.counterTarget / item.counterSpeed;
    item.updateCounter = function () {
      item.counterCount = item.counterCount + item.counterStep;
      item.innerText = Math.ceil(item.counterCount);
      if (item.counterCount < item.counterTarget) {
        setTimeout(item.updateCounter, item.counterSpeed);
      } else {
        item.innerText = item.counterTarget;
      }
    };
  });
  const counternumber = function () {
    const isScrolledIntoView = function (el) {
      var rect = el.getBoundingClientRect();
      var elemTop = rect.top;
      var elemBottom = rect.bottom;
      // Only completely visible elements return true:
      var isVisible = elemTop >= 0 && elemBottom <= window.innerHeight;
      // Partially visible elements return true:
      //isVisible = elemTop < window.innerHeight && elemBottom >= 0;
      return isVisible;
    };
    counter.forEach(function (item, id) {
      if (!isScrolledIntoView(item)) return;
      item.updateCounter();
      item.counterAlreadyFired = true;
    });
  };
  // click button menu burger
  const buttonclick = function (e) {
    // menu mobile toggle
    mobilenav.addEventListener(
      "click",
      function (e) {
        //your handler here
        this.classList.toggle("active");
        body.classList.toggle("openmenu");
      },
      false
    );
    // mobile link navigation
    for (var i = 0; i < mobilelink.length; i++) {
      mobilelink[i].addEventListener(
        "click",
        function (e) {
          mobilenav.classList.toggle("active");
          body.classList.toggle("openmenu");
        },
        false
      );
    }
  };

  // skillss slider
  const skillssslider = function (e) {
    function autoplay(run) {
      clearInterval(interval);
      interval = setInterval(() => {
        if (run && slider) {
          slider.next();
        }
      }, 5000);
    }

    function navigation(slider) {
      function markup(remove) {
        wrapperMarkup(remove);
        dotMarkup(remove);
      }

      function removeElement(elment) {
        elment.parentNode.removeChild(elment);
      }

      function createDiv(className) {
        var div = document.createElement("div");
        var classNames = className.split(" ");
        classNames.forEach((name) => div.classList.add(name));
        return div;
      }

      function wrapperMarkup(remove) {
        if (remove) {
          var parent = wrapper.parentNode;
          while (wrapper.firstChild)
            parent.insertBefore(wrapper.firstChild, wrapper);
          removeElement(wrapper);
          return;
        }
        wrapper = createDiv("navigation-wrapper");
        slider.container.parentNode.appendChild(wrapper);
        wrapper.appendChild(slider.container);
      }

      function dotMarkup(remove) {
        if (remove) {
          removeElement(dots);
          return;
        }
        dots = createDiv("dots");
        slider.track.details.slides.forEach((_e, idx) => {
          var dot = createDiv("dot");
          dot.addEventListener("click", () => slider.moveToIdx(idx));
          dots.appendChild(dot);
        });
        wrapper.appendChild(dots);
      }

      function updateClasses() {
        var slide = slider.track.details.rel;
        Array.from(dots.children).forEach(function (dot, idx) {
          idx === slide
            ? dot.classList.add("dot--active")
            : dot.classList.remove("dot--active");
        });
      }

      slider.on("created", () => {
        markup();
        updateClasses();
      });
      slider.on("optionsChanged", () => {
        markup(true);
        markup();
        updateClasses();
      });
      slider.on("slideChanged", () => {
        updateClasses();
      });
      slider.on("destroyed", () => {
        markup(true);
      });
    }

    var slider = new KeenSlider(
      sliderskills,
      {
        loop: true,
        mode: "free-snap",
        breakpoints: {
          "(min-width: 320px)": {
            slides: { perView: 1, spacing: 5 },
          },
          "(min-width: 400px)": {
            slides: { perView: 1, spacing: 5 },
          },
          "(min-width: 1000px)": {
            slides: { perView: 3, spacing: 20 },
          },
        },
        slides: {
          perView: 1,
          spacing: 20,
        },
        duration: 3000,
        dragStart: () => {
          autoplay(false);
        },
        dragEnd: () => {
          autoplay(true);
        },
      },
      [navigation]
    );
    sliderskills.addEventListener("mouseover", (e) => {
      autoplay(false);
    });
    sliderskills.addEventListener("mouseout", (e) => {
      autoplay(true);
    });
    autoplay(true);
  };
  // page scroll
  const scrollpage = function (e) {
    // add fixid class
    if (window.pageYOffset > 0) {
      header.classList.add("fixid");
    } else {
      header.classList.remove("fixid");
    }
  };
  //binds event ----------------------------
  const bindEvents = function (e) {
    // window onbuffer
    window.onbeforeunload = function (e) {
      // allways force page to scroll top on refresh
      window.scrollTo(0, 0);
    };
    // window load
    window.addEventListener("load", (e) => {
      // page load
      loadder();
    });
    // document load
    window.addEventListener("DOMContentLoaded", (e) => {
      // button event
      buttonclick();
      //type animation
      typeanimation();
      // slider skills
      skillssslider();
      // Experiences
      experiences();
      // glightbox
      glight();
      // year
      yearele.innerHTML = year;
    });
    window.addEventListener("scroll", (e) => {
      // scrollspy
      scrolspy();
      // scroll window
      scrollpage();
      // counter
      counternumber();
    });
  };

  // init - initilizes elements and events
  const AppInit = function (e) {
    bindEvents();
  };
  return {
    AppInit: AppInit,
  };
})();

//initilizing app
marioninit.AppInit();
