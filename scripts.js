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

  // Script to submit Early Access Form
  document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('early-access-form');
    var submitBtn = document.getElementById('submitBtn');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Form submission intercepted');
        
        // Set button to loading state
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        
        var formData = new FormData(form);
        var jsonData = {};
        
        formData.forEach(function(value, key){
            jsonData[key] = value;
        });
        
        jsonData['Consent'] = document.getElementById('consent-checkbox').checked ? 'Yes' : 'No';
        
        console.log('Sending data:', JSON.stringify(jsonData));
        
        fetch('https://script.google.com/macros/s/AKfycbyeDpQBvYkudormv-y8SARKH0_5qfNvzhrSugiHDwCWQy0R-S_OCwXEFupKQVH8Q6ud/exec', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonData)
        })
        .then(response => {
            console.log('Response received:', response);
            if (response.type === 'opaque') {
                showAlertAndReload('Thank you for your submission. We will be in touch soon!');
            } else {
                return response.json();
            }
        })
        .then(data => {
            if (data) {
                console.log('Response data:', data);
                if (data.result === "success") {
                    showAlertAndReload('Thank you for your submission. We will be in touch soon!');
                } else {
                    alert('An error occurred: ' + (data.message || 'Unknown error'));
                }
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        })
    });

    function showAlertAndReload(message) {
        alert(message);
        window.location.reload();
    }
});