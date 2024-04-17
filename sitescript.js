const stars1 = document.getElementById('stars1');
const button1 = document.getElementById('button1');
const button2 = document.getElementById('button2');

document.addEventListener('mousemove', moveShip);
document.addEventListener('click', shoot);

stars1.addEventListener('animationiteration', () => {
    stars1.style.transform = 'translateY(0)';
});

button1.addEventListener('click', () => {
    window.open('https://www.google.com/search?q=fuck+you+meaning&oq=fuck+you+meaning&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBCDMwMjRqMGoxqAIAsAIA&sourceid=chrome&ie=UTF-8', '_blank');
});

button2.addEventListener('click', () => {

    window.open('https://www.google.com/search?q=ugly+meaning&sca_esv=d43f5111e59e559f&ei=aM4fZo-8OKenkdUP5vCroAM&udm=&ved=0ahUKEwiPkMKarcmFAxWnU6QEHWb4CjQQ4dUDCBA&uact=5&oq=ugly+meaning&gs_lp=Egxnd3Mtd2l6LXNlcnAiDHVnbHkgbWVhbmluZzIGEAAYBxgeMgYQABgHGB4yBhAAGAcYHjIGEAAYBxgeMgYQABgHGB4yBhAAGAcYHjIGEAAYBxgeMgYQABgHGB4yBhAAGAcYHjIIEAAYBxgeGA9I8wpQAFjfBHAAeACQAQCYAY4BoAHJA6oBAzEuM7gBA8gBAPgBAZgCBKACkwTCAggQABgHGB4YE8ICChAAGAcYHhgPGBOYAwCSBwMwLjSgB_8U&sclient=gws-wiz-serp', '_blank');
});

function moveShip(event) {
    const ship = document.getElementById('ship');
    ship.style.left = event.clientX - ship.offsetWidth / 2 + 'px';
    ship.style.top = event.clientY - ship.offsetHeight / 2 + 'px';
}

function shoot(event) {
    const x = event.clientX;
    let y = event.clientY;

    y -= 35;

    const projectile = document.createElement('div');
    projectile.classList.add('projectile');
    projectile.style.position = 'absolute';
    projectile.style.left = x - 5 + 'px';
    projectile.style.top = y - 16 + 'px';
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
        }
    }, 10);
}

function collision(projectile, button) {
    const projectileRect = projectile.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();
    
    return (
        projectileRect.right >= buttonRect.left &&
        projectileRect.left <= buttonRect.right &&
        projectileRect.bottom >= buttonRect.top &&
        projectileRect.top <= buttonRect.bottom
    );
}