const stars1 = document.getElementById('stars1');
document.addEventListener('mousemove', moveShip);
document.addEventListener('click', shoot);

stars1.addEventListener('animationiteration', () => {
    stars1.style.transform = 'translateY(0)';
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
        }
    }, 10);
}