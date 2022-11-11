async function loginUser() {
    try {
        const data = {
            email: $('#exampleLoginInputEmail').val(),
            password: $('#exampleLoginInputPassword').val(),
        };

        console.log(data);

        if (isEmpty(data)) {
            alert('All fields are required');
            return;
        }

        if (!isEmail(data.email)) {
            alert('Email is not valid');
            return;
        }

        const request = await fetch('http://localhost:8080/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const response = await request.text();

        if (response !== 'FAIL') {
            localStorage.setItem('token', response);
            localStorage.setItem('email', data.email);
            window.location.href = 'users.html';
        } else {
            alert('The credentials are incorrect. Please try again.');
        }
    } catch (error) {
        alert('Something went wrong, please try again');
    }
}
