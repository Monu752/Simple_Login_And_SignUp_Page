const container = document.getElementById('container');

document.getElementById('signUp').addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

document.getElementById('signIn').addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});

document.getElementById('signupForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const first_name = document.getElementById('first_name').value;
    const last_name = document.getElementById('last_name').value;
    const email = document.getElementById('signup_email').value;
    const password = document.getElementById('signup_password').value;

    const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ first_name, last_name, email, password })
    });

    const data = await response.json();
    alert(data.message);
});

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login_email').value;
    const password = document.getElementById('login_password').value;

    const response = await fetch('http://localhost:3000/login', {   
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (data.token) {
        alert('Login successful');
        console.log('Token:', data.token);
    } else {
        alert('Login failed');
    }
});
