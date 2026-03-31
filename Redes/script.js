// === Intersection Observer for fade-in animations ===
document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // === Accordion functionality ===
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const body = item.querySelector('.accordion-body');
      const isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.accordion-item').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.accordion-body').style.maxHeight = '0';
      });

      // Toggle current
      if (!isOpen) {
        item.classList.add('open');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });

  // === Active nav on scroll ===
  const sections = document.querySelectorAll('.section[id]');
  const navLinks = document.querySelectorAll('.sticky-nav a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      if (scrollY >= top) current = section.getAttribute('id');
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) link.classList.add('active');
    });
  });

  // === IP interactive demo ===
  const ipBtn = document.getElementById('generateIP');
  if (ipBtn) {
    ipBtn.addEventListener('click', () => {
      const parts = Array.from({length: 4}, () => Math.floor(Math.random() * 256));
      const ip = parts.join('.');
      const resultEl = document.getElementById('ipResult');
      
      let tipo = '';
      if (parts[0] === 10) tipo = '🏠 Clase A Privada';
      else if (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) tipo = '🏢 Clase B Privada';
      else if (parts[0] === 192 && parts[1] === 168) tipo = '🏠 Clase C Privada';
      else if (parts[0] >= 1 && parts[0] <= 126) tipo = '🌐 Clase A Pública';
      else if (parts[0] >= 128 && parts[0] <= 191) tipo = '🌐 Clase B Pública';
      else if (parts[0] >= 192 && parts[0] <= 223) tipo = '🌐 Clase C Pública';
      else tipo = '⚡ Reservada/Especial';

      resultEl.innerHTML = `
        <div style="font-family: 'JetBrains Mono', monospace; font-size: 1.5rem; color: #3b82f6; margin-bottom: 0.5rem;">${ip}</div>
        <div style="color: #94a3b8; font-size: 0.9rem;">${tipo}</div>
      `;
      resultEl.style.animation = 'none';
      resultEl.offsetHeight;
      resultEl.style.animation = 'fadeInUp 0.4s ease';
    });
  }

  // === DNS demo ===
  const dnsBtn = document.getElementById('dnsLookup');
  if (dnsBtn) {
    dnsBtn.addEventListener('click', () => {
      const domains = {
        'google.com': '142.250.80.46',
        'youtube.com': '142.250.185.78',
        'github.com': '140.82.121.4',
        'facebook.com': '157.240.1.35',
        'amazon.com': '54.239.28.85',
        'netflix.com': '54.74.73.31',
        'twitter.com': '104.244.42.193'
      };

      const input = document.getElementById('dnsInput').value.toLowerCase().trim();
      const result = document.getElementById('dnsResult');

      if (domains[input]) {
        result.innerHTML = `✅ <strong>${input}</strong> → <span style="color:#3b82f6;font-family:'JetBrains Mono',monospace">${domains[input]}</span>`;
      } else if (input) {
        const fakeIP = Array.from({length: 4}, () => Math.floor(Math.random() * 256)).join('.');
        result.innerHTML = `🔍 <strong>${input}</strong> → <span style="color:#f59e0b;font-family:'JetBrains Mono',monospace">${fakeIP}</span> <small>(simulado)</small>`;
      } else {
        result.innerHTML = '⚠️ Escribe un dominio primero';
      }
    });
  }
});

// CSS animation for demos
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);
