/* =========================================
   VARIABLES
========================================= */

const pages =
    document.querySelectorAll(".page");

const music =
    document.getElementById("bgMusic");

let currentPage = 1;


/* =========================================
   GO TO PAGE
========================================= */

function goToPage(number) {

    const oldPage =
        document.getElementById(
            "page" + currentPage
        );

    const newPage =
        document.getElementById(
            "page" + number
        );


    if (!newPage) return;


    oldPage.classList.remove("active");

    newPage.classList.add("active");

    currentPage = number;


    /* Scroll to top */

    newPage.scrollTop = 0;


    /* Start text animation */

    revealPageText(newPage);


    /* Music rules */

    if (number >= 4) {

        fadeOutMusic();

    }

}


/* =========================================
   ENVELOPE
========================================= */

const envelope =
    document.getElementById("envelope");


envelope.addEventListener(
    "click",
    function() {

        if (
            envelope.classList.contains("open")
        ) {

            return;

        }


        envelope.classList.add("open");


        /*
            IMPORTANT:
            The user has touched the screen,
            so this is the perfect moment to
            start the BGM.
        */

        music.volume = 0.65;

        music.currentTime = 0;


        music.play().catch(
            function(error) {

                console.log(
                    "Music playback:",
                    error
                );

            }
        );


        /*
            Give the envelope enough time
            to open before moving forward.
        */

        setTimeout(
            function() {

                goToPage(2);

            },
            2300
        );

    }
);


/* =========================================
   TEXT REVEAL
========================================= */

function revealPageText(page) {

    const elements =
        page.querySelectorAll(
            ".reveal"
        );


    elements.forEach(
        function(element, index) {

            element.classList.remove(
                "visible"
            );


            setTimeout(
                function() {

                    element.classList.add(
                        "visible"
                    );

                },
                400 + index * 1000
            );

        }
    );

}


/* =========================================
   FADE MUSIC
========================================= */

function fadeOutMusic() {

    if (music.paused) return;


    const fadeTime = 1500;

    const startingVolume =
        music.volume;

    const steps = 30;

    const interval =
        fadeTime / steps;

    let step = 0;


    const fade =
        setInterval(
            function() {

                step++;

                music.volume =
                    startingVolume *
                    (1 - step / steps);


                if (step >= steps) {

                    clearInterval(fade);

                    music.pause();

                    music.currentTime = 0;

                    music.volume =
                        startingVolume;

                }

            },
            interval
        );

}


/* =========================================
   CAKE
========================================= */

const wishButton =
    document.getElementById(
        "wishButton"
    );


wishButton.addEventListener(
    "click",
    function() {

        const cake =
            document.querySelector(
                ".cake"
            );


        const finalMessage =
            document.getElementById(
                "finalMessage"
            );


        cake.classList.add(
            "blown"
        );


        wishButton.style.display =
            "none";


        finalMessage.classList.add(
            "show"
        );


        createConfetti();

    }
);


/* =========================================
   CONFETTI
========================================= */

function createConfetti() {

    const pieces = 100;


    for (
        let i = 0;
        i < pieces;
        i++
    ) {

        const confetti =
            document.createElement(
                "div"
            );


        confetti.style.position =
            "fixed";


        confetti.style.width =
            "7px";


        confetti.style.height =
            "7px";


        confetti.style.left =
            Math.random() * 100 + "vw";


        confetti.style.top =
            "-10px";


        const colors = [

            "#c9a86a",
            "#e8ddf5",
            "#fffdf7",
            "#b9a3d4"

        ];


        confetti.style.background =
            colors[
                Math.floor(
                    Math.random() *
                    colors.length
                )
            ];


        confetti.style.zIndex =
            "100";


        document.body.appendChild(
            confetti
        );


        const duration =
            2000 +
            Math.random() * 3000;


        confetti.animate(

            [

                {
                    transform:
                        "translateY(0) rotate(0deg)"
                },

                {
                    transform:
                        "translateY(110vh) rotate(720deg)"
                }

            ],

            {

                duration:
                    duration,

                easing:
                    "ease-out"

            }

        );


        setTimeout(
            function() {

                confetti.remove();

            },
            duration
        );

    }

}


/* =========================================
   INITIAL TEXT
========================================= */

revealPageText(
    document.getElementById("page2")
);