/*----- Menu Elements -----*/

const menuButtons = document.querySelectorAll(
    '#primary-navigation button[aria-controls]'
);

const navToggle = document.querySelector('.nav-toggle');

const navigation = document.getElementById('primary-navigation');

/*----- Open / Close Menu -----*/

function setMenuOpen(button, isOpen) {
    const menuId = button.getAttribute('aria-controls');
    const menu = document.getElementById(menuId);

    if (!menu) {
        console.error(`Menu not found: #${menuId}`);
        return;
    }

    button.setAttribute('aria-expanded', String(isOpen));
    menu.hidden = !isOpen;

    if (!isOpen) {
        menu
            .querySelectorAll('button[aria-controls]')
            .forEach((nestedButton) => setMenuOpen(nestedButton, false));
    }
}

/*----- Menu Button Clicks -----*/

menuButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const isOpen = button.getAttribute('aria-expanded') === 'true';
        setMenuOpen(button, !isOpen);
    });
});

/*----- Click Outside -----*/

document.addEventListener('click', (event) => {
    if (!event.target.closest('#primary-navigation')) {
        menuButtons.forEach((button) => setMenuOpen(button, false));
    }
});

/*----- Escape Key -----*/
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        menuButtons.forEach((button) => setMenuOpen(button, false));
        navigation.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
    }
});

/*----- Mobile Navigation Toggle -----*/

navToggle.addEventListener('click', () => {
    const isOpen =
        navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute(
        'aria-expanded',
        String(!isOpen)
    );

    navigation.classList.toggle('open', !isOpen);
});

