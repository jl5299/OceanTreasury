document.addEventListener('DOMContentLoaded', function() {
  var form = document.getElementById('early-access-form');
  
  form.addEventListener('submit', function(e) {
      e.preventDefault();
      console.log('Form submission intercepted');
      
      var formData = new FormData(form);
      var jsonData = {};
      
      formData.forEach(function(value, key){
          jsonData[key] = value;
      });
      
      jsonData['Consent'] = document.getElementById('consent-checkbox').checked ? 'Yes' : 'No';
      
      console.log('Sending data:', JSON.stringify(jsonData));
      
      fetch('https://script.google.com/macros/s/AKfycbyeDpQBvYkudormv-y8SARKH0_5qfNvzhrSugiHDwCWQy0R-S_OCwXEFupKQVH8Q6ud/exec', {
          method: 'POST',
          mode: 'no-cors', // This is important to avoid CORS issues
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(jsonData)
      })
      .then(response => {
          console.log('Response received:', response);
          if (response.type === 'opaque') {
              // Due to 'no-cors' mode, we can't access the response content
              // We'll assume success if we got here
              alert('We will be in touch soon!');
              form.reset();
          } else {
              return response.json();
          }
      })
      .then(data => {
          if (data) {
              console.log('Response data:', data);
              if (data.result === "success") {
                  alert('We will be in touch soon!');
                  form.reset();
              } else {
                  alert('An error occurred: ' + (data.message || 'Unknown error'));
              }
          }
      })
      .catch((error) => {
          console.error('Error:', error);
          alert('An error occurred. Please try again.');
      });
  });
});

document.addEventListener('DOMContentLoaded', function() {
    var faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(function(question) {
        question.addEventListener('click', function() {
            this.classList.toggle('active');
            var answer = this.nextElementSibling;
            if (answer.style.display === 'block') {
                answer.style.display = 'none';
            } else {
                answer.style.display = 'block';
            }
        });
    });
});



document.addEventListener('DOMContentLoaded', (event) => {
    const burgerMenu = document.getElementById('burger-menu');
    const mainNav = document.getElementById('main-nav');

    burgerMenu.addEventListener('click', () => {
        mainNav.classList.toggle('active');
    });

    // Close menu when a link is clicked
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('active');
        });
    });
});