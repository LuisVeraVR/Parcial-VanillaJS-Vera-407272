document.addEventListener("DOMContentLoaded", function () {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const style = document.createElement("style");
    style.textContent = `
      .experience-card, .project-card {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.7s ease-out;
      }
      
      .experience-card.animate, .project-card.animate {
        opacity: 1;
        transform: translateY(0);
      }
      
      .experience-card:nth-child(2) {
        transition-delay: 0.2s;
      }
      
      .experience-card:nth-child(3) {
        transition-delay: 0.4s;
      }
      
      .project-card:nth-child(1) {
        transition-delay: 0.1s;
      }
      
      .project-card:nth-child(2) {
        transition-delay: 0.3s;
      }
      
      .project-card:nth-child(3) {
        transition-delay: 0.5s;
      }
    `;
    document.head.appendChild(style);

    document
      .querySelectorAll(".experience-card, .project-card")
      .forEach((card) => {
        observer.observe(card);
      });
  });