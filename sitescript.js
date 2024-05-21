const stars1 = document.getElementById('stars1');
const button1 = document.getElementById('button1');
const button2 = document.getElementById('button2');
const button3 = document.getElementById('button3');
const button4 = document.getElementById('button4');
const button5 = document.getElementById('button5');
const littlestar = document.getElementById('little-star');
const comet = document.getElementById('comet');

let starsHit = 0;

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

    window.open('https://www.google.com/search?q=do+a+barrel+roll&sca_esv=d43f5111e59e559f&ei=o-UfZtXgOOCG9u8P-_a8qAs&udm=&gs_ssp=eJzj4tVP1zc0TIo3SMmuMKoyYPQSSMlXSFRISiwqSs1RKMrPyQEApoAKcw&oq=do+a+barrel&gs_lp=Egxnd3Mtd2l6LXNlcnAiC2RvIGEgYmFycmVsKgIIADIKEC4YgAQYigUYQzIKEAAYgAQYigUYQzIFEAAYgAQyChAAGIAEGIoFGEMyBRAAGIAEMgUQABiABDIKEAAYgAQYigUYQzIKEAAYgAQYigUYQzIFEAAYgAQyChAAGIAEGIoFGEMyGRAuGIAEGIoFGEMYlwUY3AQY3gQY4ATYAQFIyiFQAFjcEnAAeACQAQCYAasBoAGZCqoBAzQuN7gBAcgBAPgBAZgCC6AC2QrCAgsQLhiABBjHARjRA8ICDhAuGK8BGMcBGIAEGI4FwgIOEC4YgAQYxwEYrwEYjgXCAgsQLhiABBjHARivAcICBRAuGIAEwgINEC4YgAQYxwEY0QMYCpgDALoGBggBEAEYFJIHAzMuOKAHw3M&sclient=gws-wiz-serp#ip=1', '_blank');
});

button4.addEventListener('click', () => {

    window.open('https://www.google.com/search?q=solitaire&oq=solitaire&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBCDE3MzlqMGo0qAIAsAIB&sourceid=chrome&ie=UTF-8', '_blank');
});

button5.addEventListener('click', () => {

    window.open('https://www.google.com/search?q=joke+meaning&sca_esv=d43f5111e59e559f&ei=GOEfZpyuBLOJ9u8P_umTuA8&ved=0ahUKEwicmqaDv8mFAxWzhP0HHf70BPcQ4dUDCBA&uact=5&oq=joke+meaning&gs_lp=Egxnd3Mtd2l6LXNlcnAiDGpva2UgbWVhbmluZzIFEAAYgAQyBhAAGBYYHjIGEAAYFhgeMgYQABgWGB4yCBAAGBYYHhgPMggQABgWGB4YDzIGEAAYFhgeMgYQABgWGB4yBhAAGBYYHjIGEAAYFhgeSKG8KlDWE1j7GHAGeAGQAQCYAYYBoAGQBaoBAzIuNLgBA8gBAPgBAZgCCqACzQPCAgoQABhHGNYEGLADwgINEAAYgAQYigUYQxiwA8ICCRAAGIAEGA0YE8ICCBAAGAcYHhgTwgIGEAAYBxgemAMAiAYBkAYKkgcDOC4yoAeIIg&sclient=gws-wiz-serp', '_blank');
});


function shoot(event) {
    const shipRect = ship.getBoundingClientRect();
    const x = shipRect.left + shipRect.width / 2;
    let y = shipRect.top;

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
        } else if (collision(projectile, littlestar)){
            clearInterval(interval);
            projectile.remove();
            HitStar();
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

function HitStar(){
    starsHit += 1;
    littlestar.style.display = 'none';

    if(starsHit >= 3){
        starsHit = 0;
        comet.style.display = 'block';
        document.body.style.backgroundColor = 'blue';

        const cometInterval = setInterval(() => {
            const currentLeft = parseInt(meteor.style.left, 10);
            meteor.style.left = currentLeft + 10 + 'px';

            if (currentLeft > window.innerWidth) {
                clearInterval(meteorInterval);
                meteor.style.display = 'none';
                meteor.style.left = '-100px';
                document.body.style.backgroundColor = 'black';
            }
        }, 50);
    }
    
}

function showStar(){
    littlestar.style.display = 'block';
}

setInterval(showStar, 5000);