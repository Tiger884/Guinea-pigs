// Theme Configuration for Artist Paws
const themes = {
    default: {
        name: "Autumn Warmth",
        colors: {
            primary: "#6B4423",
            primaryBrown: "#8B4513",
            primaryLight: "#8B6F47",
            beigeLight: "#E8D5C4",
            beige: "#D2B48C",
            tan: "#DEB887",
            gold: "#FFD700",
            pink: "#FF6B9D",
            pinkDark: "#C06C84",
            bgGradient: "linear-gradient(135deg, #E8D5C4 0%, #D4C4B0 100%)",
            headerBg: "rgba(255, 255, 255, 0.95)",
            footerBg: "rgba(107, 68, 35, 0.9)",
            footerText: "#FFE4B5"
        },
        emojis: ["🐾", "🎨", "✨"],
        cursor: {
            default: "🐾",
            pointer: "🎨"
        }
    },
    christmas: {
        name: "Winter Wonderland",
        colors: {
            primary: "#4A5D7C",
            primaryBrown: "#6B8CAE",
            primaryLight: "#7BA3C5",
            beigeLight: "#E0F4FF",
            beige: "#B8D8E8",
            tan: "#C8E4F0",
            gold: "#A8DADC",
            pink: "#4A90E2",
            pinkDark: "#357ABD",
            bgGradient: "linear-gradient(135deg, #E0F4FF 0%, #C8E4F0 100%)",
            headerBg: "rgba(255, 255, 255, 0.98)",
            footerBg: "rgba(74, 93, 124, 0.9)",
            footerText: "#E0F4FF"
        },
        emojis: ["❄️", "⛄", "🎄", "✨", "🎁", "☃️"],
        cursor: {
            default: "❄️",
            pointer: "⛄"
        }
    }
};

// Determine current season/holiday
function getCurrentSeason() {
    const now = new Date();
    const month = now.getMonth(); // 0-11
    const day = now.getDate();
    
    // ВРЕМЕННО: Включаем Christmas тему для теста
    return 'christmas';
    
    // Обычная логика (раскомментируйте после теста):
    // Christmas/New Year: December 1 - January 15
    // if (month === 11 || (month === 0 && day <= 15)) {
    //     return 'christmas';
    // }
    
    // Default theme for other times
    // return 'default';
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { themes, getCurrentSeason };
}
