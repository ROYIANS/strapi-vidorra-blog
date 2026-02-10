export default function () {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const grain = (size, name, color) => {
        canvas.width = size;
        canvas.height = size;

        ctx.fillStyle = color;

        for (let x = 0; x < size; x++) {
            for (let y = 0; y < size; y++) {
                if (Math.random() > 0.5) {
                    ctx.fillRect(x, y, 1, 1);
                }
            }
        }

        canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            document.documentElement.style.setProperty(name, `url(${url})`);
        });
    }

    const isDark = document.documentElement.classList.contains("dark");
    const grainColor = isDark ? 'hsla(0,0%,7%,0.14)' : 'hsla(36, 33%, 97%, 0.1375)'
    grain(256, "--grain-square-white-opacity-blend", grainColor);
}