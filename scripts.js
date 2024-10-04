// FAQ Script
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const item = question.closest('.faq-item');
        item.classList.toggle('active');
    });
  });
  
  // Script to handle input placeholder behavior for the get early access form
  document.querySelectorAll('.input-group input').forEach(input => {
    input.addEventListener('focus', function() {
        this.placeholder = '';
    });
    input.addEventListener('blur', function() {
        if (this.value === '') {
            this.placeholder = 'Example Name';
        }
    });
  });