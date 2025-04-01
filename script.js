// Mostrar cupón + confeti
function showCoupon() {
    const coupon = document.getElementById("coupon");
    coupon.classList.remove("hidden");
    coupon.classList.add("show");
    
    // Iniciar confeti
    startConfetti();
    
    // Ocultar botón inicial (opcional)
    document.querySelector(".container button").style.display = "none";
}

// Copiar código del cupón
function copyCode() {
    const code = document.getElementById("code").innerText;
    navigator.clipboard.writeText(code)
        .then(() => alert("¡Código copiado! 🎁"));
}

// Confeti (usando Canvas)
function startConfetti() {
    const canvas = document.getElementById("confetti");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ["#ff6b6b", "#4ecdc4", "#ffe66d", "#ff9ff3"];
    const confetti = [];

    // Crear confeti
    for (let i = 0; i < 150; i++) {
        confetti.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            size: Math.random() * 10 + 5,
            color: colors[Math.floor(Math.random() * colors.length)],
            speed: Math.random() * 3 + 2,
            rotation: Math.random() * 360
        });
    }

    // Animación
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        confetti.forEach(particle => {
            ctx.save();
            ctx.translate(particle.x, particle.y);
            ctx.rotate(particle.rotation * Math.PI / 180);
            ctx.fillStyle = particle.color;
            ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
            ctx.restore();

            particle.y += particle.speed;
            particle.rotation += 0.5;

            if (particle.y > canvas.height) {
                particle.y = -10;
                particle.x = Math.random() * canvas.width;
            }
        });

        requestAnimationFrame(animate);
    }

    animate();
}
