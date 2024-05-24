const stars1 = document.getElementById('stars1');
const button1 = document.getElementById('button1');
const button2 = document.getElementById('button2');
const button3 = document.getElementById('button3');
const button4 = document.getElementById('button4');
const button5 = document.getElementById('button5');
const star = document.getElementById('star');
const comet = document.getElementById('comet');

let starHits = 0;
let starInterval;

document.addEventListener('click', shoot);

stars1.addEventListener('animationiteration', () => {
    stars1.style.transform = 'translateY(0)';
});

button1.addEventListener('click', () => {
    window.open('https://www.google.com/mars/', '_blank');
});

button2.addEventListener('click', () => {
    window.open('https://www.google.com/moon/', '_blank');
});

button3.addEventListener('click', () => {
    window.open('https://www.google.com/search?q=do+a+barrel+roll', '_blank');
});

button4.addEventListener('click', () => {
    window.open('https://www.google.com/search?q=solitaire', '_blank');
});

button5.addEventListener('click', () => {
    window.open('https://www.google.com/search?q=joke+meaning', '_blank');
});

function shoot(event) {
    const shipRect = document.getElementById('ship').getBoundingClientRect();
    const x = shipRect.left + shipRect.width / 2 - 5;
    let y = shipRect.top - 16;

    const projectile = document.createElement('div');
    projectile.classList.add('projectile');
    projectile.style.position = 'absolute';
    projectile.style.left = x + 'px';
    projectile.style.top = y + 'px';
    projectile.style.width = '10px';
    projectile.style.height = '32px';
    projectile.style.backgroundImage = "url('images/shot.png')";
    document.body.appendChild(projectile);

    const interval = setInterval(() => {
        y -= 5;
        projectile.style.top = y + 'px';

        if (y < 0) {
            clearInterval(interval);
            projectile.remove();
        } else if (collision(projectile, button1)) {
            clearInterval(interval);
            projectile.remove();
            button1.click();
        } else if (collision(projectile, button2)) {
            clearInterval(interval);
            projectile.remove();
            button2.click();
        } else if (collision(projectile, button3)) {
            clearInterval(interval);
            projectile.remove();
            button3.click();
        } else if (collision(projectile, button4)) {
            clearInterval(interval);
            projectile.remove();
            button4.click();
        } else if (collision(projectile, button5)) {
            clearInterval(interval);
            projectile.remove();
            button5.click();
        } else if (collision(projectile, star)) {
            clearInterval(interval);
            projectile.remove();
            starHit();
        }
    }, 10);
}

function collision(projectile, target) {
    const projectileRect = projectile.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    return (
        projectileRect.right >= targetRect.left &&
        projectileRect.left <= targetRect.right &&
        projectileRect.bottom >= targetRect.top &&
        projectileRect.top <= targetRect.bottom
    );
}

function starHit() {
    starHits += 1;
    star.style.display = 'none';

    if (starHits >= 3) {
        starHits = 0;
        clearInterval(starInterval);
        comet.style.display = 'block';
        comet.style.right = '-100px';
        document.body.style.animation = 'flashBackground 4s';

        const cometInterval = setInterval(() => {
            const currentRight = parseInt(comet.style.right, 10);
            comet.style.right = currentRight + 10 + 'px';

            if (currentRight > window.innerWidth) {
                clearInterval(cometInterval);
                comet.style.display = 'none';
                comet.style.right = '-100px';
                document.body.style.backgroundColor = 'black';
                starInterval = setInterval(showStar, 10000);
            }
        }, 20);
    }
}

function showStar() {
    star.style.display = 'block';
}

starInterval = setInterval(showStar, 10000);

