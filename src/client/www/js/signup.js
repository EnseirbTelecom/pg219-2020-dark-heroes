function signup() {
    const first_name = document.querySelector('#first_name').value;
    const last_name = document.querySelector('#last_name').value;
    const email = document.querySelector('#email').value;
    const pseudo = document.querySelector('#pseudo').value;
    const birth_date = document.querySelector('#birth_date').value;
    const gender = document.querySelector('#gender').value;
    const password = document.querySelector('#password').value;
    const confirm_password = document.querySelector('#confirm_password').value;

    const queryData = this.signup_request();
    console.log('dans la fonction')
    fetch(queryData.url, {
            method: queryData.method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password,
                first_name: first_name,
                last_name: last_name,
                birthday: "13 /02/1998",
                gender: gender,
                password: password
            })
        })
        .catch(err => this.$app.dialog.alert('Error ' + err))
        .finally(() => {
            this.$router.navigate("/");
        });
}

function signup_request() {
    return {
        url: "http://localhost:3000/Users",
        method: "POST"
    }
}