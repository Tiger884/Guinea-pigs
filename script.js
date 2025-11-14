// Плавная прокрутка к якорям
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Экран загрузки отключен (можно включить, раскомментировав код ниже)
/*
window.addEventListener('load', () => {
    requestAnimationFrame(() => {
        const loader = document.createElement('div');
        loader.id = 'page-loader';
        loader.innerHTML = '<div class="loader-content"><div class="paw-loader">🐾</div><p>Загружаем пушистое творчество...</p></div>';
        loader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #E8D5C4 0%, #D4C4B0 100%);
            z-index: 10000;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: opacity 0.5s ease;
            will-change: opacity;
        `;
        
        const style = document.createElement('style');
        style.textContent = `
            .loader-content {
                text-align: center;
            }
            .paw-loader {
                font-size: 4rem;
                animation: bounce 1s ease-in-out infinite;
            }
            .loader-content p {
                font-size: 1.2rem;
                color: #6B4423;
                margin-top: 20px;
                animation: fadeInUp 1s ease-out;
            }
        `;
        document.head.appendChild(style);
        
        document.body.insertBefore(loader, document.body.firstChild);
        
        requestAnimationFrame(() => {
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    if (loader.parentNode) {
                        loader.remove();
                    }
                }, 500);
            }, 800);
        });
    });
});
*/

// Анимация появления элементов при прокрутке
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Применяем анимацию к карточкам
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.master-card, .gallery-item, .info-section');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Анимация для кнопки покупки
    const buyButton = document.querySelector('.buy-button');
    if (buyButton) {
        buyButton.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) translateY(-3px)';
        });
        
        buyButton.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
        });

        buyButton.addEventListener('click', function() {
            alert('🎨 Thanks for your interest in our fluffy artists\' work! A shop is coming soon.');
        });
    }

    // Анимация галереи при наведении
    const galleryItems = document.querySelectorAll('.gallery-item img, .photo-gallery img');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            // Простой lightbox эффект
            const overlay = document.createElement('div');
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.9);
                z-index: 1000;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
            `;
            
            const img = document.createElement('img');
            img.src = this.src;
            img.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                border-radius: 15px;
                box-shadow: 0 5px 30px rgba(255,255,255,0.3);
            `;
            
            overlay.appendChild(img);
            document.body.appendChild(overlay);
            
            overlay.addEventListener('click', function() {
                document.body.removeChild(overlay);
            });
        });
    });

    // Приветственное сообщение в консоли
    console.log('🐾 Welcome to Artist Paws! Art from fluffy paws! 🎨');
});

// Изменение стиля заголовка при прокрутке
let lastScroll = 0;
let ticking = false;

window.addEventListener('scroll', () => {
    lastScroll = window.pageYOffset;
    
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const header = document.querySelector('header');
            
            if (lastScroll > 100) {
                header.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
                header.style.background = 'rgba(255, 255, 255, 0.98)';
            } else {
                header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
                header.style.background = 'rgba(255, 255, 255, 0.95)';
            }
            
            ticking = false;
        });
        
        ticking = true;
    }
});

// Анимация для sticky note
const stickyNote = document.querySelector('.sticky-note');
if (stickyNote) {
    setInterval(() => {
        const currentRotation = parseInt(stickyNote.style.transform.replace(/[^\d-]/g, '')) || -3;
        const newRotation = currentRotation === -3 ? 2 : -3;
        stickyNote.style.transition = 'transform 2s ease-in-out';
        stickyNote.style.transform = `rotate(${newRotation}deg)`;
    }, 3000);
}

// Функция создания конфетти (оптимизировано для мобильных)
function createConfetti(e) {
    const colors = ['#FF6B9D', '#FFD700', '#4ECDC4', '#45B7D1', '#FFA07A'];
    const isMobile = window.innerWidth <= 768;
    const confettiCount = isMobile ? 15 : 30; // Меньше конфетти на мобильных
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: ${isMobile ? '6px' : '10px'};
            height: ${isMobile ? '6px' : '10px'};
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            animation: confettiFall ${Math.random() * 2 + 1}s ease-out forwards;
        `;
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 3000);
    }
}

// Добавляем CSS анимацию для конфетти
if (!document.getElementById('confetti-animation')) {
    const style = document.createElement('style');
    style.id = 'confetti-animation';
    style.textContent = `
        @keyframes confettiFall {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(${window.innerHeight}px) rotate(${Math.random() * 720}deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Функция создания плавающих лапок (только для десктопа)
function createFloatingPaws() {
    if (window.innerWidth <= 768) return; // Не создаем на мобильных
    
    const pawCount = 5;
    const paws = ['🐾', '🎨', '✨'];
    
    for (let i = 0; i < pawCount; i++) {
        const paw = document.createElement('div');
        paw.textContent = paws[Math.floor(Math.random() * paws.length)];
        paw.style.cssText = `
            position: fixed;
            font-size: ${Math.random() * 30 + 20}px;
            left: ${Math.random() * 100}vw;
            top: ${Math.random() * 100}vh;
            opacity: 0.1;
            pointer-events: none;
            z-index: 1;
            animation: floatRandom ${Math.random() * 10 + 10}s ease-in-out infinite;
        `;
        document.body.appendChild(paw);
    }
    
    // Добавляем CSS анимацию для плавающих элементов
    if (!document.getElementById('float-animation')) {
        const style = document.createElement('style');
        style.id = 'float-animation';
        style.textContent = `
            @keyframes floatRandom {
                0%, 100% {
                    transform: translate(0, 0) rotate(0deg);
                }
                25% {
                    transform: translate(50px, -50px) rotate(90deg);
                }
                50% {
                    transform: translate(-30px, 30px) rotate(180deg);
                }
                75% {
                    transform: translate(40px, 50px) rotate(270deg);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Эффект параллакса (оптимизирован с requestAnimationFrame)
function addParallaxEffect() {
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const heroImage = document.querySelector('.hero-main-image');
                if (heroImage) {
                    heroImage.style.transform = `translate3d(0, ${scrolled * 0.3}px, 0)`;
                }
                ticking = false;
            });
            ticking = true;
        }
    });
}

// Улучшенный просмотр изображений
function createImageViewer(img, e) {
    // Trace image viewer opening
    const viewerSpan = window.ArtistPawsTracer ? 
        window.ArtistPawsTracer.startSpan('image.viewer.open', {
            'image.src': img.src,
            'image.alt': img.alt || 'no-alt'
        }) : null;
    
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0);
        z-index: 1000;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        transition: background 0.3s ease;
    `;
    
    const imageContainer = document.createElement('div');
    imageContainer.style.cssText = `
        transform: scale(0);
        transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    `;
    
    const displayImg = document.createElement('img');
    displayImg.src = img.src;
    displayImg.style.cssText = `
        max-width: 90%;
        max-height: 90vh;
        border-radius: 15px;
        box-shadow: 0 10px 50px rgba(255,255,255,0.3);
        border: 5px solid white;
    `;
    
    imageContainer.appendChild(displayImg);
    overlay.appendChild(imageContainer);
    document.body.appendChild(overlay);
    
    // Анимация появления
    setTimeout(() => {
        overlay.style.background = 'rgba(0,0,0,0.95)';
        imageContainer.style.transform = 'scale(1)';
        
        if (viewerSpan) {
            window.ArtistPawsTracer.endSpan(viewerSpan, {
                'viewer.status': 'opened'
            });
        }
    }, 10);
    
    overlay.addEventListener('click', function() {
        const closeSpan = window.ArtistPawsTracer ? 
            window.ArtistPawsTracer.startSpan('image.viewer.close') : null;
        
        imageContainer.style.transform = 'scale(0)';
        overlay.style.background = 'rgba(0,0,0,0)';
        setTimeout(() => {
            document.body.removeChild(overlay);
            if (closeSpan) {
                window.ArtistPawsTracer.endSpan(closeSpan);
            }
        }, 300);
    });
}

// Эффект следа курсора (только на десктопе)
let cursorTrail = [];
const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

if (!isMobileDevice && window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
        if (Math.random() > 0.8) { // Не создаем след на каждом движении
            const trail = document.createElement('div');
            const emoji = ['🐾', '✨', '🎨'][Math.floor(Math.random() * 3)];
            trail.textContent = emoji;
            trail.style.cssText = `
                position: fixed;
                left: ${e.clientX}px;
                top: ${e.clientY}px;
                font-size: 20px;
                pointer-events: none;
                z-index: 9998;
                animation: fadeOut 1s ease-out forwards;
                transform: translate(-50%, -50%);
            `;
            document.body.appendChild(trail);
            
            cursorTrail.push(trail);
            if (cursorTrail.length > 10) {
                const oldTrail = cursorTrail.shift();
                if (oldTrail && oldTrail.parentNode) {
                    oldTrail.parentNode.removeChild(oldTrail);
                }
            }
            
            setTimeout(() => {
                if (trail.parentNode) {
                    trail.parentNode.removeChild(trail);
                }
            }, 1000);
        }
    });
}

// Добавляем CSS анимацию для следа
if (!document.getElementById('cursor-trail-animation')) {
    const style = document.createElement('style');
    style.id = 'cursor-trail-animation';
    style.textContent = `
        @keyframes fadeOut {
            0% {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
            }
            100% {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.5);
            }
        }
    `;
    document.head.appendChild(style);
}

// Добавляем эффект дрожания для кнопок при наведении
document.querySelectorAll('.buy-button').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.animation = 'wiggle 0.5s ease-in-out';
    });
    button.addEventListener('animationend', function() {
        this.style.animation = 'pulseAnimation 2s ease-in-out infinite';
    });
});

// Добавляем touch-события для мобильных устройств
if ('ontouchstart' in window) {
    // Улучшаем взаимодействие с карточками на touch-устройствах
    document.querySelectorAll('.master-card').forEach(card => {
        card.addEventListener('touchstart', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        card.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    });
    
    // Добавляем обратную связь для кнопок
    document.querySelectorAll('.buy-button, button, a').forEach(elem => {
        elem.addEventListener('touchstart', function() {
            this.style.opacity = '0.8';
        });
        elem.addEventListener('touchend', function() {
            this.style.opacity = '1';
        });
    });
    
    // Предотвращаем масштабирование двойным тапом на изображениях
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('touchstart', function(e) {
            if (e.touches.length > 1) {
                e.preventDefault();
            }
        });
    });
}

// Оптимизация для ориентации устройства
window.addEventListener('orientationchange', function() {
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 100);
});

// =============== THEME MANAGER FOR SEASONAL THEMES ===============
class ThemeManager {
    constructor() {
        this.currentTheme = this.getCurrentSeason();
        this.init();
    }

    getCurrentSeason() {
        if (typeof getCurrentSeason === 'function') {
            return getCurrentSeason();
        }
        // Fallback if themes.js не загружен
        const now = new Date();
        const month = now.getMonth();
        const day = now.getDate();
        
        if (month === 11 || (month === 0 && day <= 15)) {
            return 'christmas';
        }
        return 'default';
    }

    init() {
        // Trace theme initialization
        if (window.ArtistPawsTracer) {
            const themeSpan = window.ArtistPawsTracer.startSpan('theme.init', {
                'theme.name': this.currentTheme
            });
            
            try {
                // Применяем тему при загрузке
                this.applyTheme(this.currentTheme);
                
                // Инициализируем сезонные эффекты
                if (this.currentTheme === 'christmas') {
                    this.initSnowfall();
                }
                
                window.ArtistPawsTracer.endSpan(themeSpan, {
                    'theme.applied': 'success',
                    'snowfall.enabled': this.currentTheme === 'christmas'
                });
            } catch (error) {
                window.ArtistPawsTracer.endSpan(themeSpan, {
                    'theme.applied': 'error',
                    'error.message': error.message
                });
                throw error;
            }
        } else {
            // Применяем тему при загрузке
            this.applyTheme(this.currentTheme);
            
            // Инициализируем сезонные эффекты
            if (this.currentTheme === 'christmas') {
                this.initSnowfall();
            }
        }
    }

    setTheme(themeName) {
        this.currentTheme = themeName;
        this.applyTheme(themeName);
        
        // Удаляем старые снежинки
        document.querySelectorAll('.snowflake').forEach(s => s.remove());
        
        // Добавляем снежинки для рождественской темы
        if (themeName === 'christmas') {
            this.initSnowfall();
        }
        
        // Обновляем активную кнопку
        document.querySelectorAll('.theme-switcher button').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.theme === themeName);
        });
    }

    applyTheme(themeName) {
        // Trace theme application
        if (window.ArtistPawsTracer) {
            const spanId = window.ArtistPawsTracer.startSpan('theme.apply', {
                'theme.name': themeName,
                'theme.previous': document.body.getAttribute('data-theme') || 'none'
            });
            
            document.body.setAttribute('data-theme', themeName);
            
            // Обновляем эмодзи для cursor trail
            if (typeof themes !== 'undefined' && themes[themeName]) {
                this.updateCursorEmojis(themes[themeName].emojis);
            }
            
            window.ArtistPawsTracer.endSpan(spanId, {
                'theme.emojis_updated': typeof themes !== 'undefined' && themes[themeName]
            });
        } else {
            document.body.setAttribute('data-theme', themeName);
            
            // Обновляем эмодзи для cursor trail
            if (typeof themes !== 'undefined' && themes[themeName]) {
                this.updateCursorEmojis(themes[themeName].emojis);
            }
        }
    }

    updateCursorEmojis(emojis) {
        // Обновляем глобальный массив эмодзи для cursor trail
        window.seasonalEmojis = emojis;
    }

    initSnowfall() {
        // Trace snowfall initialization
        if (window.ArtistPawsTracer) {
            const spanId = window.ArtistPawsTracer.startSpan('snowfall.init', {
                'window.width': window.innerWidth
            });
            
            // Создаем снегопад только на desktop
            if (window.innerWidth <= 768) {
                window.ArtistPawsTracer.endSpan(spanId, {
                    'snowfall.enabled': false,
                    'reason': 'mobile_device'
                });
                return;
            }

            const snowflakeCount = 20;
            for (let i = 0; i < snowflakeCount; i++) {
                setTimeout(() => {
                    this.createSnowflake();
                }, i * 200);
            }

            // Периодически добавляем новые снежинки
            setInterval(() => {
                if (window.innerWidth > 768 && document.body.getAttribute('data-theme') === 'christmas') {
                    this.createSnowflake();
                }
            }, 3000);
            
            window.ArtistPawsTracer.endSpan(spanId, {
                'snowfall.enabled': true,
                'snowflake.count': snowflakeCount
            });
        } else {
            // Создаем снегопад только на desktop
            if (window.innerWidth <= 768) return;

            const snowflakeCount = 20;
            for (let i = 0; i < snowflakeCount; i++) {
                setTimeout(() => {
                    this.createSnowflake();
                }, i * 200);
            }

            // Периодически добавляем новые снежинки
            setInterval(() => {
                if (window.innerWidth > 768 && document.body.getAttribute('data-theme') === 'christmas') {
                    this.createSnowflake();
                }
            }, 3000);
        }
    }

    createSnowflake() {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.textContent = ['❄️', '⛄', '✨'][Math.floor(Math.random() * 3)];
        snowflake.style.left = Math.random() * 100 + 'vw';
        snowflake.style.animationDuration = (Math.random() * 3 + 5) + 's';
        snowflake.style.opacity = Math.random() * 0.6 + 0.4;
        
        document.body.appendChild(snowflake);

        // Удаляем снежинку после анимации
        setTimeout(() => {
            if (snowflake.parentNode) {
                snowflake.parentNode.removeChild(snowflake);
            }
        }, parseFloat(snowflake.style.animationDuration) * 1000);
    }
}

// Инициализируем ThemeManager при загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
    const themeManager = new ThemeManager();
    
    // Создаём переключатель тем в футере
    const footer = document.querySelector('footer');
    if (footer) {
        const switcher = document.createElement('div');
        switcher.className = 'theme-switcher';
        switcher.innerHTML = `
            <span style="margin-right: 10px;">Theme:</span>
            <button data-theme="default" class="${themeManager.currentTheme === 'default' ? 'active' : ''}">🍂 Autumn</button>
            <button data-theme="christmas" class="${themeManager.currentTheme === 'christmas' ? 'active' : ''}">❄️ Winter</button>
        `;
        footer.appendChild(switcher);
        
        // Обработчики кликов
        switcher.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('click', () => {
                themeManager.setTheme(btn.dataset.theme);
            });
        });
    }
    
    // Делаем доступным глобально для отладки
    window.themeManager = themeManager;
});

// Обновляем cursor trail для использования сезонных эмодзи
const originalCursorTrailCode = document.querySelector('script');
if (!isMobileDevice && window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
        if (Math.random() > 0.8) {
            const trail = document.createElement('div');
            const emojis = window.seasonalEmojis || ['🐾', '✨', '🎨'];
            const emoji = emojis[Math.floor(Math.random() * emojis.length)];
            trail.textContent = emoji;
            trail.style.cssText = `
                position: fixed;
                left: ${e.clientX}px;
                top: ${e.clientY}px;
                font-size: 20px;
                pointer-events: none;
                z-index: 9998;
                animation: fadeOut 1s ease-out forwards;
                transform: translate(-50%, -50%);
            `;
            document.body.appendChild(trail);
            
            setTimeout(() => {
                if (trail.parentNode) {
                    trail.parentNode.removeChild(trail);
                }
            }, 1000);
        }
    });
}
