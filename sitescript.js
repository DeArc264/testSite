document.addEventListener('mousemove', moveShip);

function moveShip(event) {
    const ship = document.getElementById('ship');
    ship.style.left = event.clientX - ship.offsetWidth / 2 + 'px';
    ship.style.top = event.clientY - ship.offsetHeight / 2 + 'px';
}