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

// Additional holiday themes for UK and Ukraine
themes['newyear'] = {
    name: 'New Year',
    emojis: ['🎉', '🎆', '🥂'],
    colors: { bgGradient: 'linear-gradient(135deg,#FFEDD5 0%,#FFE4E1 100%)', headerBg: 'rgba(255,255,255,0.96)' }
};

themes['uk-bonfire'] = {
    name: 'Bonfire Night',
    emojis: ['🎆','🎇','🔥'],
    colors: { bgGradient: 'linear-gradient(135deg,#1F2937 0%,#0B1221 100%)', headerBg: 'rgba(15,15,15,0.92)' }
};

themes['st-patrick'] = {
    name: 'St Patrick',
    emojis: ['🍀','🌈'],
    colors: { bgGradient: 'linear-gradient(135deg,#E8F5E9 0%,#C8E6C9 100%)', headerBg: 'rgba(255,255,255,0.95)' }
};

themes['ua-independence'] = {
    name: 'Ukraine Independence',
    emojis: ['🇺🇦','🎉'],
    colors: { bgGradient: 'linear-gradient(135deg,#0057B7 0%,#FFD400 100%)', headerBg: 'rgba(255,255,255,0.95)' }
};


// Determine current season/holiday
function getCurrentSeason() {
    const now = new Date();
    const month = now.getMonth(); // 0-11
    const day = now.getDate();

    // Auto-detect holiday themes (UK + Ukraine)
    // Helper
    const isSame = (mm, dd) => month === mm && day === dd;

    // New Year
    if (isSame(0, 1)) return 'newyear';

    // Christmas (Western)
    if (isSame(11, 25)) return 'christmas';

    // Boxing day/Christmas period: 26th December
    if (isSame(11, 26)) return 'christmas';

    // Ukrainian Orthodox Christmas (Jan 7)
    if (isSame(0, 7)) return 'christmas';

    // Ukraine Independence Day
    if (isSame(7, 24)) return 'ua-independence';

    // St Patrick's Day (Mar 17)
    if (isSame(2, 17)) return 'st-patrick';

    // Bonfire Night (Nov 5 - UK)
    if (isSame(10, 5)) return 'uk-bonfire';

    // Default seasonal logic as before: Christmas window
    if (month === 11 || (month === 0 && day <= 15)) return 'christmas';
    
    // Обычная логика (раскомментируйте после теста):
    // Christmas/New Year: December 1 - January 15
    // if (month === 11 || (month === 0 && day <= 15)) {
    //     return 'christmas';
    // }
    
    // Default theme for other times
    return 'default';
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { themes, getCurrentSeason };
}
