
    <script>
    /* --- Balloons and glitter effect --- */
    const canvas = document.getElementById('effects-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let balloons = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Balloon and glitter particle classes
    class Balloon {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.radius = 28 + Math.random() * 12;
            this.color = color;
            this.speed = 1 + Math.random() * 1.5;
            this.drift = (Math.random() - 0.5) * 1.2;
            this.alpha = 1;
        }
        draw(ctx) {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.beginPath();
            ctx.ellipse(this.x, this.y, this.radius * 0.7, this.radius, 0, 0, 2 * Math.PI);
            ctx.fillStyle = this.color;
            ctx.shadowColor = this.color;
            ctx.shadowBlur = 16;
            ctx.fill();
            // Balloon string
            ctx.beginPath();
            ctx.moveTo(this.x, this.y + this.radius);
            ctx.lineTo(this.x, this.y + this.radius + 32);
            ctx.strokeStyle = "#fff8";
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.restore();
        }
        update() {
            this.y -= this.speed;
            this.x += this.drift;
            this.alpha -= 0.002;
        }
    }

    class Glitter {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = 2 + Math.random() * 3;
            this.color = `hsl(${Math.random()*360}, 90%, 80%)`;
            this.alpha = 1;
            this.speedY = -1.5 - Math.random() * 1.5;
            this.speedX = (Math.random() - 0.5) * 2;
            this.gravity = 0.03;
        }
        draw(ctx) {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
            ctx.fillStyle = this.color;
            ctx.shadowColor = this.color;
            ctx.shadowBlur = 8;
            ctx.fill();
            ctx.restore();
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.speedY += this.gravity;
            this.alpha -= 0.012;
        }
    }

    // Generate balloons and glitter on picture click
    function spawnEffects(x, y) {
        const balloonColors = ['#ffb6c1', '#ffd6e0', '#baffc9', '#bae1ff', '#fff5ba', '#ffdfba'];
        for (let i = 0; i < 3; i++) {
            balloons.push(new Balloon(x + Math.random()*40-20, y + Math.random()*20-10, balloonColors[Math.floor(Math.random()*balloonColors.length)]));
        }
        for (let i = 0; i < 24; i++) {
            particles.push(new Glitter(x, y));
        }
    }

    // Animate balloons and glitter
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Balloons
        for (let i = balloons.length - 1; i >= 0; i--) {
            balloons[i].update();
            balloons[i].draw(ctx);
            if (balloons[i].alpha <= 0) balloons.splice(i, 1);
        }
        // Glitter
        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            particles[i].draw(ctx);
            if (particles[i].alpha <= 0) particles.splice(i, 1);
        }
        requestAnimationFrame(animate);
    }
    animate();

    // Add click event to pictures for effects
    document.querySelectorAll('.picture-card').forEach(card => {
        card.addEventListener('click', e => {
            // Get bounding rect for accurate position
            const rect = card.getBoundingClientRect();
            const x = rect.left + rect.width/2;
            const y = rect.top + rect.height/2;
            spawnEffects(x, y);
        });
    });
  
    </script>