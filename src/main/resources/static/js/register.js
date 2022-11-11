async function registerUser() {
    try {
        const data = {
            nombre: $('#exampleFirstName').val(),
            apellido: $('#exampleLastName').val(),
            email: $('#exampleInputEmail').val(),
            telefono: $('#exampleInputPhone').val(),
            password: $('#exampleInputPassword').val(),
        };
        console.log(data);
        const password2 = $('#exampleRepeatPassword').val();

        if (isEmpty(data)) {
            alert('All fields except phone number are required');
            return;
        }

        if (!isEmail(data.email)) {
            alert('Email is not valid');
            return;
        }

        if (data.password !== password2) {
            alert('Passwords do not match');
            return;
        }

        await fetch('http://localhost:8080/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        alert('User created successfully');
        window.location.href = 'index.html';
    } catch (error) {
        alert('Something went wrong, please try again');
    }
}
