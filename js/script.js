

// ЕЛЕМЕНТИ САЙТУ

const character = document.getElementById("character");
const movementNext = document.getElementById("movementNext");
const movementMessage = document.getElementById("movementMessage");

const music = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicButton");

const interactionText = document.getElementById("interaction-text");


// ПЕРЕХОДИ МІЖ ЕКРАНАМИ

function showScreen(screenId) {
    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });

    const nextScreen = document.getElementById(screenId);

    if (nextScreen) {
        nextScreen.classList.add("active");
        window.scrollTo(0, 0);
    }

    if (screenId !== "screen3") {
        hideInteraction();
    }
}


// КНОПКИ ПЕРЕХОДІВ

document.querySelectorAll("[data-next]").forEach(button => {
    button.addEventListener("click", () => {
        showScreen(button.dataset.next);

        });
});


// МУЗИКА

musicButton.addEventListener("click", async () => {
    if (music.paused) {
        try {
            await music.play();
            musicButton.textContent = "♫ Вимкнути музику";
        } catch (error) {
            musicButton.textContent = "Не вдалося відтворити";
        }
    } else {
        music.pause();
        musicButton.textContent = "♫ Увімкнути музику";
    }
});

music.addEventListener("play", () => {
    musicButton.textContent = "♫ Вимкнути музику";
});

music.addEventListener("pause", () => {
    musicButton.textContent = "♫ Увімкнути музику";
});


// КООРДИНАТИ ПЕРСОНАЖА

let characterPositionX = 40;
let characterPositionY = 50;

character.style.left = characterPositionX + "%";
character.style.bottom = characterPositionY + "%";


// ОБ'ЄКТИ ТА ЇХНІ КООРДИНАТИ

const objects = [
    {
        name: "window",
        x: 45,
        y: 60,
        radius: 8,
        message: "Віконце...також сумка з офігенними пінами"
    },
    {
        name: "mask",
        x: 80,
        y: 35,
        radius: 5,
        message: "SPIDER-MAN’S NAME IS DANYA!!!"
    },
    {
        name: "bed",
        x: 20,
        y: 40,
        radius: 8,
        message: "Тільки-но впасти і спати.."
    },
    {
        name: "bed2",
        x: 13,
        y: 55,
        radius: 10,
        message: "Ну ліжко як ліжко...але тут постери біля нього і якась іграшка.."
    },
    {
        name: "candle",
        x: 90,
        y: 13,
        radius: 8,
        message: "Може тут є ще щось глянути перш ніж піти..."
    },
    {
        name: "fnaf",
        x: 33,
        y: 8,
        radius: 8,
        message: "Файв найтс ет фреддіс..."
    },
    {
        name: "notebook",
        x: 80,
        y: 55,
        radius: 7,
        message: "Пора грати в фортнайт"
    },
    {
        name: "exit",
        x: 60,
        y: 3,
        radius: 7,
        message: "Вихід з кімнати...зараз він не обов'язковий.."
    }
];


// ПОКАЗ ТА ПРИХОВУВАННЯ ПОВІДОМЛЕНЬ

function showInteraction(object) {
    interactionText.textContent = object.message;
}

function hideInteraction() {
    interactionText.textContent = "";
}


// ПЕРЕВІРКА НАБЛИЖЕННЯ ДО ПРЕДМЕТІВ

function checkNearbyObjects() {

    let nearbyObject = null;

    for (const object of objects) {

        const distance = Math.sqrt(
            Math.pow(characterPositionX - object.x, 2) +
            Math.pow(characterPositionY - object.y, 2)
        );

        if (distance <= object.radius) {
            nearbyObject = object;
            break;
        }
    }

    if (nearbyObject) {
        showInteraction(nearbyObject);
    } else {
        hideInteraction();
    }
}


// РУХ ПЕРСОНАЖА

function moveCharacter(direction) {

    const step = 5;

    if (direction === "left") {
        characterPositionX -= step;
    }

    if (direction === "right") {
        characterPositionX += step;
    }

    if (direction === "up") {
        characterPositionY += step;
    }

    if (direction === "down") {
        characterPositionY -= step;
    }

    // Обмеження руху персонажа
    characterPositionX = Math.max(0, Math.min(90, characterPositionX));
    characterPositionY = Math.max(0, Math.min(85, characterPositionY));

    character.style.left = characterPositionX + "%";
    character.style.bottom = characterPositionY + "%";

    // Перевіряємо наближення до предметів
    checkNearbyObjects();

    // Перевіряємо, чи персонаж дійшов до виходу
    if (characterPositionX >= 85 && characterPositionY <= 15) {

        movementMessage.textContent = "Ти знайшов вихід!";

        movementNext.hidden = false;
    }
}


// КЛАВІАТУРА ПК

document.addEventListener("keydown", (event) => {

    if (!document.getElementById("screen3").classList.contains("active")) {
        return;
    }

    const keys = {
        "ArrowLeft": "left",
        "ArrowRight": "right",
        "ArrowUp": "up",
        "ArrowDown": "down",
        "a": "left",
        "d": "right",
        "w": "up",
        "s": "down"
    };

    const direction = keys[event.key];

    if (direction) {
        event.preventDefault();
        moveCharacter(direction);
    }
});


// КНОПКИ ДЛЯ ТЕЛЕФОНУ

document.querySelectorAll("[data-move]").forEach(button => {

    button.addEventListener("click", () => {

        if (!document.getElementById("screen3").classList.contains("active")) {
            return;
        }

        moveCharacter(button.dataset.move);
    });
});


// ПОЧАТИ СПОЧАТКУ

document.getElementById("restartButton").addEventListener("click", () => {

    // Зупиняємо музику
    music.pause();
    music.currentTime = 0;

    musicButton.textContent = "♫ Увімкнути музику";

    // Повертаємо персонажа на початкову позицію
    characterPositionX = 40;
    characterPositionY = 50;

    character.style.left = characterPositionX + "%";
    character.style.bottom = characterPositionY + "%";

    // Скидаємо повідомлення та вихід
    hideInteraction();

    movementNext.hidden = true;

    movementMessage.textContent =
        "Використовуй стрілочки або кнопки на клавіатурі";

    // Повертаємося на початковий екран
    showScreen("intro");
});
