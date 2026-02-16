// --- 1. ПУЗЫРЬКИ (ПАЛИТРА НУАР/КОСМОС) ---
function createBubbles() {
    const container = document.getElementById('bubbles');
    const colors = [
        '#ffffff', // Чистый белый (звезды/свет)
        '#7b8fa3', // Серый шифер (город)
        '#aebcd1', // Лунный голубой
        '#2b3a42'  // Темный акцент
    ]; 
    const bubbleCount = 30;

    for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        
        // Размер поменьше, как пылинки или далекие огни
        const size = Math.random() * 20 + 5; 
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        
        bubble.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        bubble.style.left = `${Math.random() * 100}%`;
        
        // Разная прозрачность для глубины
        bubble.style.opacity = Math.random() * 0.5 + 0.1;
        
        bubble.style.animationDuration = `${Math.random() * 10 + 10}s`; // Очень медленно
        bubble.style.animationDelay = `${Math.random() * 5}s`;
        
        container.appendChild(bubble);
    }
}
createBubbles();

// --- 2. ДАННЫЕ НОВЕЛЛЫ ---
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
        isCG: true,
        showLeft: false,
        showRight: false
    }
];

// --- 3. ЛОГИКА ---
let currentSlide = 0;
const menuScreen = document.getElementById('menu-screen');
const novelScreen = document.getElementById('novel-screen');
const gameScreen = document.getElementById('game-screen');

const bgLayer = document.getElementById('novel-bg');
const cgLayer = document.getElementById('cg-layer');
const charLeft = document.getElementById('char-left');
const charRight = document.getElementById('char-right');
const speakerName = document.getElementById('speaker-name');
const speechText = document.getElementById('speech-text');
const dialogueBox = document.getElementById('dialogue-box'); // Теперь это text-block

document.getElementById('start-btn').addEventListener('click', () => {
    menuScreen.classList.remove('active');
    novelScreen.classList.add('active');
    renderSlide(0);
});

dialogueBox.addEventListener('click', () => {
    currentSlide++;
    if (currentSlide < slides.length) {
        renderSlide(currentSlide);
    } else {
        startMiniGame();
    }
});

function renderSlide(index) {
    const data = slides[index];
    
    // Текст
    speakerName.innerText = data.speaker; // Если имя пустое, блок схлопнется (почти)
    speechText.innerText = data.text;
    
    // ФОН и CG
    if (data.isCG) {
        cgLayer.src = data.bg;
        cgLayer.classList.remove('hidden');
        bgLayer.style.opacity = 0;
    } else {
        cgLayer.classList.add('hidden');
        bgLayer.style.opacity = 1;
        bgLayer.style.backgroundImage = `url('${data.bg}')`;
    }
    
    // ПЕРСОНАЖИ
    const leftIsVisible = data.showLeft;
    const rightIsVisible = data.showRight;
    
    if (leftIsVisible) charLeft.classList.remove('hidden');
    else charLeft.classList.add('hidden');
    
    if (rightIsVisible) charRight.classList.remove('hidden');
    else charRight.classList.add('hidden');

    const container = document.querySelector('.characters-container');
    if ((leftIsVisible && !rightIsVisible) || (!leftIsVisible && rightIsVisible)) {
        container.classList.add('solo-mode');
    } else {
        container.classList.remove('solo-mode');
    }
}

// --- 4. ИГРА ---
function startMiniGame() {
    novelScreen.classList.remove('active');
    gameScreen.classList.add('active');
    
    // СТРАХОВКА: Насильно прячем результат и показываем ленту при старте
    document.getElementById('result-display').classList.add('hidden');
    document.getElementById('reel-window').classList.remove('hidden');
}

let clickCount = 0;
const gachaBtn = document.getElementById('gacha-btn');
const reelWindow = document.getElementById('reel-window');
const resultDisplay = document.getElementById('result-display');

gachaBtn.addEventListener('click', () => {
    if (clickCount >= 3) return;

    clickCount++;
    gachaBtn.style.transform = "scale(0.9)";
    setTimeout(()=> gachaBtn.style.transform = "scale(1)", 100);

    if (clickCount === 3) {
        runGachaSequence();
    }
});

function runGachaSequence() {
    const controls = document.getElementById('gacha-controls');
    const reel = document.getElementById('reel-window');
    const result = document.getElementById('result-display');

    // 1. Убираем кнопку
    controls.style.opacity = '0';
    gachaBtn.style.cursor = 'default';
    
    // 2. ГАРАНТИЯ: Лента видна, Результат скрыт
    reel.classList.remove('hidden');
    result.classList.add('hidden'); // Прячем кота, если он вдруг вылез
    
    // 3. Запускаем анимацию
    reel.classList.add('spinning');
    
    // 4. Через 2.5 секунды меняем местами
    setTimeout(() => {
        // Резко скрываем ленту
        reel.classList.add('hidden');
        reel.classList.remove('spinning');
        
        // Резко показываем результат
        result.classList.remove('hidden');
        
    }, 2500);
}