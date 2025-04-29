document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
      card.addEventListener('mousemove', handleMouseMove);
      
      card.addEventListener('mouseleave', handleMouseLeave);
      card.addEventListener('mouseout', handleMouseLeave);
      
      card.addEventListener('click', function(e) {
        if (!e.target.closest('.project-link')) {
          const demoLink = this.querySelector('.demo-link');
          if (demoLink) {
            demoLink.classList.add('pulse');
            
            setTimeout(() => {
              demoLink.classList.remove('pulse');
            }, 700);
          }
        }
      });
    });
    
    function handleMouseMove(e) {
      const card = this;
      const cardRect = card.getBoundingClientRect();
      
      const mouseX = e.clientX - cardRect.left;
      const mouseY = e.clientY - cardRect.top;
      
      const rotateY = ((mouseX / cardRect.width) - 0.5) * 10; 
      const rotateX = ((mouseY / cardRect.height) - 0.5) * -10; 
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
      
      const intensity = 0.2;
      const lx = (mouseX / cardRect.width - 0.5) * 100;
      const ly = (mouseY / cardRect.height - 0.5) * 100;
      
      card.style.background = `linear-gradient(
        ${135 + lx / 10}deg,
        var(--bg-alt) 0%,
        var(--bg-alt) 80%,
        rgba(255, 255, 255, ${intensity}) 100%
      )`;
    }
    
    function handleMouseLeave() {
      this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
      this.style.background = 'var(--bg-alt)';
    }
    
    const style = document.createElement('style');
    style.textContent = `
      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
      }
      
      .project-link.pulse {
        animation: pulse 0.7s ease-in-out;
        box-shadow: 0 0 15px var(--color-accent);
      }
      
      .project-card {
        transition: transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
      }
      
      .tech-stack {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-top: 1rem;
      }
    `;
    document.head.appendChild(style);
  });