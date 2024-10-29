const User = require('../models/userModals');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signUp = async (req, res) => {
    try {
        console.log('req.body: ', req.body);
        const { name, email, password } = req.body;
        
                if (!name || !email || !password) {
                    return res.status(400).json({ message: 'All fields are required.' });
                }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already in use' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const signupUser = new User({
            name,
            email,
            password: hashedPassword, 
        });
        const newUser = await signupUser.save();
        
        res.status(201).json({
            message: 'User registered successfully',
            user: { id: newUser._id, email: newUser.email  },
        });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        console.log('req.body: ', req.body);
        const { email, password } = req.body; 

        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign(
            { id: user._id, email: user.email },
            '4c237a2c708361e111344ddb246f813130f1cf5b06f73c6766e472a561aaaeb7',
        );

        res.status(200).json({
            message: 'User logged in successfully',
            user: { id: user._id, email: user.email }, 
            token 
        });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};
