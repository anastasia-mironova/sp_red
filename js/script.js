addEventListener("load", () => {
    setTimeout(preloaderRemove, 4000);
})
bdCanvas();

function preloaderRemove() {
    const animatedCircle = document.querySelector(".logo-internal-circle");
    animatedCircle.classList.remove("internal-animation");
    const preloaderElement = document.querySelector(".preloader");
    const logoElement = document.querySelector(".logo-title");
    logoElement.classList.add("logo-title-active");
    changeLocale();
    setTimeout(showContent, 3000)
}

function defineLocale() {
    return navigator.browserLanguage || navigator.language || navigator.userLanguage;
}
function changeLocale(lang) {
    const currentLang = lang || defineLocale();
    fetch('locale/locale.json')
        .then((response) => {
            return response.json();
        })
        .then((languageData) => {
            if (currentLang === "ru" || currentLang === "ru-RU") {
                changeText(languageData.ru, "ru");
            } else {
                if (currentLang === "en" || currentLang === "en-EN") {
                    changeText(languageData.en, "en");
                }
            }
        });
}

function changeText(languageOptions, locale) {
    const causeText = document.querySelector(".cause");
    if (locale === "ru") {
        causeText.innerHTML = '<span class="first-word-in-description">Привет.</span>' + languageOptions.mainInfo;
    }
    if (locale === "en") {
        causeText.innerHTML = '<span class="first-word-in-description">Hello.</span>' + languageOptions.mainInfo;
    }

    const pushText = document.querySelector(".push");
    pushText.innerHTML = languageOptions.buttonText;
    const headerText = document.querySelector(".title-block-contact");
    headerText.innerHTML = languageOptions.title;
    const contactText = document.querySelector(".contacts");
    contactText.innerHTML = languageOptions.contacts;
}
function showContent() {
    const preloaderElement = document.querySelector(".preloader");
    preloaderElement.remove();
    const stubElenment = document.querySelector(".main-stub");
    stubElenment.classList.add("active-stub");
    const mainContentElemet = document.querySelector(".wrapper");
    mainContentElemet.classList.add("main-content-animation");
    const menuElement = document.querySelector(".main-menu");
    menuElement.classList.add("main-content-animation");
}


document.querySelector(".language-change").addEventListener("click", () => {
    const languageChanging = document.querySelector(".language-change");
    if (languageChanging.classList.contains("ru")) {
        languageChanging.classList.remove("ru");
        languageChanging.classList.add("en");
        languageChanging.innerHTML = "EN";
        changeLocale("en");
    } else {
        if (languageChanging.classList.contains("en")) {
            languageChanging.classList.remove("en");
            languageChanging.classList.add("ru");
            languageChanging.innerHTML = "RU";
            changeLocale("ru");
        }
    }

})
function bdCanvas() {

    opts = {
        minRadius: 0.5,
        maxRadius: 1.4,
        colors: ["rgba(255, 255, 255, 0.7)", "rgba(252, 244, 201, 0.7)", "rgba(201, 252, 201, 0.7)", "rgba(201, 236, 252, 0.7)", "rgba(229, 201, 252, 0.7)", "rgba(252, 201, 201, 0.7)", "rgba(252, 201, 241, 0.7)", "rgba(252, 201, 201, 0.7)"],
        delay: 90,
        step: 0.1
    }

    let canvas = document.querySelector(".bdCanvas");

    resizeCanvas();

    function resizeCanvas() {

        w = canvas.width = document.documentElement.clientWidth;
        h = canvas.height = document.documentElement.clientHeight;
    }

    window.addEventListener("resize", function () {
        windowResize();
    })

    let check;

    function windowResize() {
        clearTimeout(check);
        check = setTimeout(function () {
            clearInterval(animations);
            resizeCanvas();
            setup();
        }, 100)
    }

    let ctx = canvas.getContext("2d");

    Stars = function (w, h) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.radius = opts.minRadius + Math.random() * (opts.maxRadius - opts.minRadius);
        this.color = opts.colors[[Math.round(Math.random() * opts.colors.length)]];
        this.vector = Math.round(Math.random()) || -1;

        this.draw = function () {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.closePath();
        }

        this.update = function () {
            this.check();
            this.radius += opts.step * this.vector;
        }

        this.check = function () {
            if (this.radius > opts.maxRadius || this.radius < opts.minRadius) {
                this.vector *= -1;
            }
        }
    }

    function setup() {
        arrStars = [];

        for (let i = 0; i < (w / 40) * (h / 40); i++) {
            arrStars.push(new Stars(w, h));
            arrStars[i].draw();
        }
        loop()
    }

    setup();

    function loop() {
        animations = setInterval(function () {
            ctx.clearRect(0, 0, w, h);
            for (let i = 0; i < arrStars.length; i++) {
                arrStars[i].update();
                arrStars[i].draw();
            }
        }, opts.delay);
    }

};
