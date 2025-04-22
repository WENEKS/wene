
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const section = document.querySelector(this.getAttribute('href'));
        section.scrollIntoView({ behavior: 'smooth' });
    });
});


window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(255, 255, 255, 0.9)';
        nav.style.backdropFilter = 'blur(10px)';
    } else {
        nav.style.background = 'white';
        nav.style.backdropFilter = 'none';
    }
});


const filterButtons = document.querySelectorAll('.filter-btn');
const products = document.querySelectorAll('.product');

filterButtons.forEach(button => {
    button.addEventListener('click', async () => {
        const category = button.dataset.filter;
        
        if (button.classList.contains('active')) return;
        
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        await Promise.all([...products].map(product => {
            product.style.opacity = '0';
            product.style.transform = 'scale(0.95)';
            return new Promise(resolve => setTimeout(resolve, 200));
        }));

        products.forEach(product => {
            if (category === 'all' || product.dataset.category === category) {
                product.style.display = 'grid';
                requestAnimationFrame(() => {
                    product.style.opacity = '1';
                    product.style.transform = 'scale(1)';
                });
            } else {
                product.style.display = 'none';
            }
        });
    });
});




document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.setAttribute('aria-label', 'Toggle menu');
    mobileMenuBtn.innerHTML = '☰';
    
    const nav = document.querySelector('nav');
    nav.appendChild(mobileMenuBtn);

    const navUl = nav.querySelector('ul');
    
    mobileMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navUl.classList.toggle('show');
        mobileMenuBtn.innerHTML = navUl.classList.contains('show') ? '✕' : '☰';
    });


    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && navUl.classList.contains('show')) {
            navUl.classList.remove('show');
            mobileMenuBtn.innerHTML = '☰';
        }
    });
});




document.querySelectorAll('.product').forEach(product => {
    product.addEventListener('click', () => {
        const isExpanded = product.classList.contains('expanded');
        
        document.querySelectorAll('.product').forEach(p => {
            p.classList.remove('expanded');
            p.style.gridColumn = '';
        });
        
        if (!isExpanded) {
            product.classList.add('expanded');
            product.style.gridColumn = '1 / -1';
        }
    });
});