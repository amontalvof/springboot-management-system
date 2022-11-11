// Call the dataTables jQuery plugin
$(document).ready(function () {
    cargarUsuarios();
    actualizarEmailDelUsuario();
    actualizarCopyRight();
});

async function cargarUsuarios() {
    try {
        const response = await fetch('http://localhost:8080/api/users', {
            method: 'GET',
            headers: getHeaders(),
        });
        const data = await response.json();
        let html = '';
        for (const iterator of data) {
            html += `<tr>
                        <td>${iterator.id}</td>
                        <td>${iterator.nombre} ${iterator.apellido}</td>
                        <td>${iterator.email}</td>
                        <td>${iterator.telefono || '-'}</td>
                        <td>
                            <a 
                                href="#" 
                                onclick="eliminarUsuario(${iterator.id})" 
                                class="btn btn-danger btn-circle btn-sm"
                            >
                                <i class="fas fa-trash"></i>
                            </a>
                        </td>
                    </tr>`;
        }
        document.querySelector('#usuarios tbody').innerHTML = html;
    } catch (error) {
        window.location.href = 'index.html';
    }
}

async function eliminarUsuario(id) {
    try {
        if (!confirm('Do you want to delete this user?')) return;
        await fetch(`http://localhost:8080/api/user/${id}`, {
            method: 'DELETE',
            headers: getHeaders(),
        });
        location.reload();
    } catch (error) {
        alert('Something went wrong, please try again');
    }
}

function logout() {
    localStorage.clear();
    window.location.href = 'index.html';
}

function actualizarEmailDelUsuario() {
    document.getElementById('txt-email-usuario').innerHTML = localStorage.email;
}

function actualizarCopyRight() {
    document.getElementById(
        'txt-copy-right'
    ).innerHTML = `Copyright &copy; Management System ${new Date().getFullYear()}`;
}
