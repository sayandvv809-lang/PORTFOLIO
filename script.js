// File 3: script.js  (mostly same, small updates)
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({ duration: 1000, once: true, easing: 'ease-out-cubic' });

    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 80);
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            if (a.getAttribute('href') !== '#') {
                e.preventDefault();
                document.querySelector(a.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Contact form demo
    document.getElementById('contactForm')?.addEventListener('submit', e => {
        e.preventDefault();
        alert('Message sent! (In real Django app this would send email)');
        e.target.reset();
    });

    // Typing animation
    const typing = document.querySelector('.typing');
    const roles = ["Full Stack Developer", "React Specialist", "Django & Python Expert"];
    let idx = 0, char = 0, forward = true;

    function typeEffect() {
        typing.textContent = roles[idx].slice(0, char);
        if (forward) {
            char++;
            if (char > roles[idx].length) { forward = false; setTimeout(typeEffect, 1500); return; }
        } else {
            char--;
            if (char === 0) { forward = true; idx = (idx + 1) % roles.length; }
        }
        setTimeout(typeEffect, forward ? 70 : 35);
    }
    typeEffect();
});

// Calculator functions (same as before)
let calcDisplay;

function openCalculatorModal() {
    const modal = new bootstrap.Modal(document.getElementById('calculatorModal'));
    modal.show();
    setTimeout(() => {
        calcDisplay = document.getElementById('calc-display');
        calcDisplay.value = '0';
    }, 300);
}

function appendToDisplay(v) {
    if (!calcDisplay) return;
    calcDisplay.value = calcDisplay.value === '0' && v !== '.' ? v : calcDisplay.value + v;
}

function clearCalc() { if (calcDisplay) calcDisplay.value = '0'; }

function calculate() {
    if (!calcDisplay) return;
    try {
        let expr = calcDisplay.value.replace(/×/g,'*').replace(/÷/g,'/').replace(/−/g,'-');
        calcDisplay.value = eval(expr);
    } catch {
        calcDisplay.value = 'Error';
        setTimeout(() => { if (calcDisplay) calcDisplay.value = '0'; }, 1400);
    }
}

document.addEventListener('keydown', e => {
    const modal = document.getElementById('calculatorModal');
    if (!modal?.classList.contains('show')) return;
    if ('0123456789+-*/().'.includes(e.key)) appendToDisplay(e.key);
    if (e.key === 'Enter') calculate();
    if (e.key === 'Backspace') calcDisplay.value = calcDisplay.value.slice(0,-1) || '0';
    if (e.key === 'Escape') clearCalc();
});