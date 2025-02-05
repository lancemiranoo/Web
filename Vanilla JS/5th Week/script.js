$ (document).ready(function(){
    $('#registrationForm').on('submit', function(event){
        event.preventDefault();
        $('error').text('');
        const username = $('username').val();
        const email = $('#email').val();
        const password = $('#password').val();

        // Validate inputs
        let isValid = true;

        // Validate username(must be at least 3 characters)
        if (username.length < 3) {
            $('usernameError').text('USername must be at least 3 characters long.');

        // Show error message
            isValid = false;
        }

        // Validate email format using a simple regex
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        validation
            if (!emailPattern.test(email)){
                $('#emailError').text('Please enter a valid email address.');
                isValid = false;
            }
            // Validate password (must be at least 6 characters)
            if (password.length <6){
                $('#passwordError').text('Password must be at least 6 characters long.');
                
                isValid = false;
            }
            // If all fields are valid, submit the form
            if (isValid){
                alert('Registration successful!')
            }

        })

    function checkPasswordStrength(password){
        let strength = 'weak';
        const lengthCriteria = password.length >= 6;
        const numberCriteria = /[0-9]/.test(password);
        const uppercaseCriteria = /[A-Z]/.test(password);
        const lowercaseCriteria = /[a-z]/.test(password);

        //Check the strength based on criteria
        if (lengthCriteria && numberCriteria && uppercaseCriteria && lowercaseCriteria){
            strength = 'Strong';
        }else if (lengthCriteria && (numberCriteria || uppercaseCriteria || lowercaseCriteria)){
            strength = 'Medium';
        }
        return strength;
    }
    // Event listerner for password input
    $('#password').on('input', function(){
        const password = $(this).val();
        const strength = checkPasswordStrength(password);

        $('#passwordStrength').text(`Password strength: ${strength}`);
        
    })
})

