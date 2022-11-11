function isEmail(emailAdress) {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (emailAdress.match(regex)) {
        return true;
    } else {
        return false;
    }
}

function isEmpty(data) {
    return Object.values(data).some(
        (x) => x === null || x === undefined || x === ''
    );
}

function getHeaders() {
    return {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
    };
}
