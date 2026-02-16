// --- 1. ДАННЫЕ НОВЕЛЛЫ ---
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

// --- 2. ЭЛЕМЕНТЫ И ЗВУК ---
let currentSlide = 0;
let clickCount = 0;

const novelTheme = document.getElementById('novel-theme');
const gameTheme = document.getElementById('game-theme');
const drumrollSfx = document.getElementById('drumroll-sfx');
const winFanfareSfx = document.getElementById('win-fanfare-sfx');

// Базовая настройка громкости
if (novelTheme) novelTheme.volume = 0.4;
if (gameTheme) gameTheme.volume = 0.4;
if (drumrollSfx) drumrollSfx.volume = 0.6;
if (winFanfareSfx) winFanfareSfx.volume = 0.7;

// Универсальная функция плавного затухания
function fadeOut(audio) {
    if (!audio || audio.paused) return;
    let vol = audio.volume;
    const interval = setInterval(() => {
        if (vol > 0.05) {
            vol -= 0.05;
            audio.volume = vol;
        } else {
            clearInterval(interval);
            audio.pause();
            audio.currentTime = 0;
            audio.volume = 0.4; // Возвращаем громкость для будущего использования
        }
    }, 150);
}

// --- 3. ЛОГИКА НОВЕЛЛЫ ---
function renderSlide(index) {
    const data = slides[index];
    document.getElementById('speaker-name').innerText = data.speaker;
    document.getElementById('speech-text').innerText = data.text;
    
    const cgLayer = document.getElementById('cg-layer');
    const cgBlur = document.getElementById('cg-blur');
    const bgLayer = document.getElementById('novel-bg');

    if (data.isCG) {
        cgLayer.src = data.bg;
        cgBlur.style.backgroundImage = `url('${data.bg}')`;
        cgLayer.classList.remove('hidden');
        cgBlur.classList.remove('hidden');
        setTimeout(() => { cgLayer.classList.add('visible'); cgBlur.classList.add('visible'); }, 50);
        bgLayer.style.opacity = 0;
    } else {
        cgLayer.classList.add('hidden');
        bgLayer.style.opacity = 1;
        bgLayer.style.backgroundImage = `url('${data.bg}')`;
    }

    const left = document.getElementById('char-left');
    const right = document.getElementById('char-right');
    if (data.showLeft) left.classList.remove('hidden'); else left.classList.add('hidden');
    if (data.showRight) right.classList.remove('hidden'); else right.classList.add('hidden');
}

// Кнопка Старт в меню
document.getElementById('start-btn').addEventListener('click', () => {
    document.getElementById('menu-screen').classList.remove('active');
    document.getElementById('novel-screen').classList.add('active');
    renderSlide(0);
    if(novelTheme) novelTheme.play().catch(e => console.error("Звук заблокирован:", e));
});

// Клик по тексту (переход)
document.getElementById('dialogue-box').addEventListener('click', () => {
    if (currentSlide === slides.length - 1) {
        // Переход в игру
        document.getElementById('cg-layer').classList.remove('visible');
        document.getElementById('cg-blur').classList.remove('visible');
        fadeOut(novelTheme);
        setTimeout(startMiniGame, 1500);
        return;
    }
    currentSlide++;
    renderSlide(currentSlide);
});

// --- 4. ЛОГИКА ИГРЫ ---
function startMiniGame() {
    document.getElementById('novel-screen').classList.remove('active');
    document.getElementById('game-screen').classList.add('active');
    
    // Включаем музыку игры
    if (gameTheme) {
        gameTheme.currentTime = 0;
        gameTheme.play().catch(e => console.error("Не удалось запустить музыку игры:", e));
    }
}

document.getElementById('gacha-btn').addEventListener('click', () => {
    if (clickCount >= 3) return;
    clickCount++;
    
    // Анимация кнопки
    const btn = document.getElementById('gacha-btn');
    btn.style.transform = "scale(0.9)";
    setTimeout(() => btn.style.transform = "scale(1)", 100);

    if (clickCount === 3) {
        // Процесс выбивания
        document.getElementById('gacha-controls').style.opacity = '0';
        document.getElementById('reel-window').classList.add('spinning');
        
        // Включаем дробь (музыка игры НЕ выключается)
        if (drumrollSfx) {
            drumrollSfx.currentTime = 0;
            drumrollSfx.play().catch(e => {});
        }
        
        setTimeout(() => {
            // ФИНАЛ: персонаж выпал
            document.getElementById('reel-window').classList.add('hidden');
            document.getElementById('result-display').classList.remove('hidden');

            // Останавливаем дробь мгновенно
            if (drumrollSfx) {
                drumrollSfx.pause();
                drumrollSfx.currentTime = 0;
            }

            // Включаем победные фанфары
            if (winFanfareSfx) {
                winFanfareSfx.currentTime = 0;
                winFanfareSfx.play().catch(e => console.error("Ошибка фанфар:", e));
            }
        }, 2500);
    }
});

// Пузырьки
(function createBubbles() {
    const container = document.getElementById('bubbles');
    if(!container) return;
    for (let i = 0; i < 25; i++) {
        const b = document.createElement('div');
        b.className = 'bubble';
        b.style.left = Math.random() * 100 + '%';
        b.style.width = b.style.height = Math.random() * 15 + 5 + 'px';
        b.style.animationDuration = Math.random() * 10 + 7 + 's';
        b.style.backgroundColor = ['#fff', '#7b8fa3', '#aebcd1'][Math.floor(Math.random()*3)];
        container.appendChild(b);
    }
})();