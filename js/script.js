addEventListener("load", () => {
    setTimeout(preloaderRemove, 4000);
})
bdCanvas();

function preloaderRemove() {
    console.log("kek3")
    console.log("kek1")
    const animatedCircle = document.querySelector(".logo-internal-circle");
    animatedCircle.classList.remove("internal-animation");
    const preloaderElement = document.querySelector(".preloader");
    preloaderElement.insertAdjacentHTML("beforeend", '<span class="logo-title">SPUTNIK-RED</span>');
    setTimeout(showContent, 3000)
}
function showContent() {
    const preloaderElement = document.querySelector(".preloader");
    preloaderElement.remove();
    const stubElenment = document.querySelector(".main-stub");
    stubElenment.classList.add("active-stub");
    const mainContentElemet = document.querySelector(".wrapper");
    mainContentElemet.classList.add("main-content-animation");
}
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