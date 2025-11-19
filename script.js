// Animate skill bars when visible
const bars = document.querySelectorAll('.bar');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      bar.style.width = bar.dataset.width;
      observer.unobserve(bar);
    }
  });
});

bars.forEach(bar => observer.observe(bar));

// Contact form validation
const form = document.getElementById('contactForm');
const status = document.getElementById('form-status');

form.addEventListener('submit', e => {
  e.preventDefault();
  status.textContent = "Message Sent Successfully!";
  status.style.color = "#00ff99";
  form.reset();
});
