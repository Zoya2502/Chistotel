// ==========================================
// 1. ПУЗЫРЬКИ ДЛЯ МЕНЮ (КОСМИЧЕСКАЯ ПАЛИТРА)
// ==========================================
function createBubbles() {
    const container = document.getElementById('bubbles');
    const colors = [
        '#ffffff', // Белый (звезды)
        '#7b8fa3', // Серый (город)
        '#aebcd1', // Лунный голубой
        '#2b3a42'  // Темный акцент
    ]; 
    const bubbleCount = 30;

    for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        
        // Рандомный размер (от 5 до 25px)
        const size = Math.random() * 20 + 5; 
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        
        // Рандомный цвет и позиция
        bubble.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        bubble.style.left = `${Math.random() * 100}%`;
        
        // Прозрачность для глубины
        bubble.style.opacity = Math.random() * 0.5 + 0.1;
        
        // Скорость анимации
        bubble.style.animationDuration = `${Math.random() * 10 + 10}s`; 
        bubble.style.animationDelay = `${Math.random() * 5}s`;
        
        container.appendChild(bubble);
    }
}
// Запускаем создание пузырьков
createBubbles();


// ==========================================
// 2. ДАННЫЕ НОВЕЛЛЫ (СЦЕНАРИЙ)
// ==========================================
const slides = [
    {
        speaker: "ПУШИЦА",
        text: "— Стоишь прямо, говоришь красиво, смотришь вдаль так, будто весь мир ждёт твоего шага… но я вижу, как ты ищешь глазами не корону и не аплодисменты, а что-то совсем другое. Скажи честно - если это сон и никто не осудит, ради кого ты вышел на эту сцену?",
        bg: "img/novel_bg.jpg",
        showLeft: false,
        showRight: true
    },
    {
        speaker: "ЧИСТОТЕЛ",
        text: "— Я думал, что люблю саму игру - этот свет, ощущение, что весь мир затаил дыхание, что я могу быть выше, чем есть. Но чем дольше стою здесь, тем яснее понимаю: вся мантия, сияние, даже звёзды над головой - просто декорации. Я вышел не ради величия. Я вышел, потому что хотел увидеть, как ты смотришь на меня, когда я перестаю прятаться за ролью.",
        bg: "img/novel_bg.jpg",
        showLeft: true,
        showRight: false
    },
    {
        speaker: "ПУШИЦА",
        text: "— Тогда не играй короля. Просто будь собой. И если это сон, если нет ни зрителей, ни правил… будь рядом со мной, как и я рядом с тобой. Ведь ты моё счастье.",
        bg: "img/novel_bg.jpg",
        showLeft: true,
        showRight: true
    },
    {
        speaker: "ЧИСТОТЕЛ",
        text: "— Тогда я выбираю тебя. Даже если это просто сон. Даже если всё вокруг - игра и иллюзия. Я не хочу других ролей, кроме этой - быть твоим счастьем.",
        bg: "img/novel_bg.jpg",
        showLeft: true,
        showRight: true
    },
    {
        speaker: "",
        text: "Свет сияния постепенно тускнеет. Чистотел открывает глаза - перед ним настоящий снег и ночное небо. А рядом, на снегу, сидит Пушица. Он улыбается, сон и явь слились в одно мгновение",
        bg: "img/eyes_bg.jpg",
        isCG: true, // Флаг: это специальная картинка
        showLeft: false,
        showRight: false
    }
];


// ==========================================
// 3. ЛОГИКА НОВЕЛЛЫ
// ==========================================
let currentSlide = 0;

// Экраны
const menuScreen = document.getElementById('menu-screen');
const novelScreen = document.getElementById('novel-screen');
const gameScreen = document.getElementById('game-screen');

// Элементы новеллы
const bgLayer = document.getElementById('novel-bg');
const cgLayer = document.getElementById('cg-layer');
const charLeft = document.getElementById('char-left');
const charRight = document.getElementById('char-right');
const speakerName = document.getElementById('speaker-name');
const speechText = document.getElementById('speech-text');
const dialogueBox = document.getElementById('dialogue-box');

// --- Старт из Меню ---
document.getElementById('start-btn').addEventListener('click', () => {
    menuScreen.classList.remove('active');
    novelScreen.classList.add('active');
    renderSlide(0);
});

// --- Клик по Диалогу (Переход дальше) ---
dialogueBox.addEventListener('click', () => {
    // ПРОВЕРКА: Если это последний слайд (с глазами)
    if (currentSlide === slides.length - 1) {
        
        // 1. Запускаем анимацию затемнения
        cgLayer.classList.remove('visible'); // Убираем видимость (начинает исчезать)
        cgLayer.classList.add('fading-out'); // Добавляем класс для затемнения
        
        // 2. Ждем 1.5 секунды (время анимации в CSS), потом переключаем на игру
        setTimeout(() => {
            startMiniGame();
        }, 1500);
        
        return; // Останавливаем выполнение, чтобы не сработал код ниже
    }

    // Обычный переход к следующему слайду
    currentSlide++;
    if (currentSlide < slides.length) {
        renderSlide(currentSlide);
    }
});

// --- Функция отрисовки слайда ---
function renderSlide(index) {
    const data = slides[index];
    
    // Текст
    speakerName.innerText = data.speaker;
    speechText.innerText = data.text;
    
    // ЛОГИКА ФОНА И CG (Картинки с глазами)
    if (data.isCG) {
        // Устанавливаем картинку
        cgLayer.src = data.bg;
        cgLayer.classList.remove('hidden');
        
        // Небольшая задержка, чтобы браузер успел отрисовать, а потом плавно показал
        setTimeout(() => {
            cgLayer.classList.add('visible'); // Плавное появление (opacity 0 -> 1)
        }, 50);
        
        bgLayer.style.opacity = 0; // Скрываем обычный фон
    } else {
        // Обычный слайд
        cgLayer.classList.remove('visible');
        cgLayer.classList.add('hidden');
        
        bgLayer.style.opacity = 1;
        bgLayer.style.backgroundImage = `url('${data.bg}')`;
    }
    
    // ЛОГИКА ПЕРСОНАЖЕЙ
    const leftIsVisible = data.showLeft;
    const rightIsVisible = data.showRight;
    
    if (leftIsVisible) charLeft.classList.remove('hidden');
    else charLeft.classList.add('hidden');
    
    if (rightIsVisible) charRight.classList.remove('hidden');
    else charRight.classList.add('hidden');

    // Центрирование (если персонаж один)
    const container = document.querySelector('.characters-container');
    if ((leftIsVisible && !rightIsVisible) || (!leftIsVisible && rightIsVisible)) {
        container.classList.add('solo-mode');
    } else {
        container.classList.remove('solo-mode');
    }
}


// ==========================================
// 4. ЛОГИКА МИНИ-ИГРЫ
// ==========================================
let clickCount = 0;
const gachaBtn = document.getElementById('gacha-btn');
const reelWindow = document.getElementById('reel-window');
const resultDisplay = document.getElementById('result-display');
const controls = document.getElementById('gacha-controls');

function startMiniGame() {
    novelScreen.classList.remove('active');
    gameScreen.classList.add('active');
    
    // СТРАХОВКА: Принудительно прячем результат и показываем ленту при старте
    // Чтобы не было накладок, если вдруг CSS не сработал
    resultDisplay.classList.add('hidden');
    reelWindow.classList.remove('hidden');
}

// Клик по кнопке "Крутить"
gachaBtn.addEventListener('click', () => {
    if (clickCount >= 3) return;

    clickCount++;
    
    // Эффект нажатия (кнопка чуть уменьшается)
    gachaBtn.style.transform = "scale(0.9)";
    setTimeout(()=> gachaBtn.style.transform = "scale(1)", 100);

    if (clickCount === 3) {
        runGachaSequence();
    }
});

function runGachaSequence() {
    // 1. Убираем кнопку управления
    controls.style.opacity = '0';
    gachaBtn.style.cursor = 'default';
    
    // 2. ГАРАНТИЯ: Лента видна, Результат скрыт
    reelWindow.classList.remove('hidden');
    resultDisplay.classList.add('hidden'); 
    
    // 3. Запускаем анимацию вращения
    reelWindow.classList.add('spinning');
    
    // 4. Ждем 2.5 секунды
    setTimeout(() => {
        // РЕЗКАЯ СМЕНА (чтобы избежать накладок)
        
        // Прячем ленту
        reelWindow.classList.add('hidden');
        reelWindow.classList.remove('spinning');
        
        // Показываем результат (запустится анимация фейерверка в CSS)
        resultDisplay.classList.remove('hidden');
        
    }, 2500);
}