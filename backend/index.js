const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'your_password',
    database: 'user_auth_db'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

// User Signup
app.post('/signup', async (req, res) => {
    const { first_name, last_name, email, password } = req.body;

    // Encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = 'INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)';
    db.query(sql, [first_name, last_name, email, hashedPassword], (err, result) => {
        if (err) throw err;
        res.status(201).json({ message: 'User registered successfully!' });
    });
});

// User Login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], async (err, result) => {
        if (err) throw err;
        
        if (result.length === 0) {
            return res.status(400).json({ message: 'Invalid user' });
        }

        const user = result[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid user' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user.id, email: user.email }, 'secret_key', { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });
    });
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
