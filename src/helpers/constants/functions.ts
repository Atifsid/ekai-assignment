export const getRandomHexColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return `#${randomColor.padStart(6, '0')}`;
}

export const generateFontAndAccentColors = (baseColor: string) => {
    const r = parseInt(baseColor.slice(1, 3), 16);
    const g = parseInt(baseColor.slice(3, 5), 16);
    const b = parseInt(baseColor.slice(5, 7), 16);

    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    const fontColor = luminance > 128 ? "#000000" : "#FFFFFF";

    const accentColor = `#${(255 - r).toString(16).padStart(2, "0")}${(255 - g).toString(16).padStart(2, "0")
        }${(255 - b).toString(16).padStart(2, "0")}`;

    return { fontColor, accentColor };
};