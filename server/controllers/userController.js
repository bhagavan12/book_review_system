const jwt = require('jsonwebtoken');
const User = require('../models/User');

const bcrypt = require('bcrypt');

var admin = require("firebase-admin");

// var serviceAccount = require('../tej-19-4-24-firebase-adminsdk-wrxi4-d47b0aa810.json');
var serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
// exports.logingoogle= async (req, res) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader?.startsWith('Bearer ')) {
//     return res.status(401).send('Unauthorized');
//   }

//   const idToken = authHeader.split('Bearer ')[1];

//   try {
//     const decodedToken = await admin.auth().verifyIdToken(idToken);
//     console.log('User verified:', decodedToken.uid);
    
//     // Proceed with session handling, etc.
//     res.send({ success: true, uid: decodedToken.uid });
//   } catch (err) {
//     console.error('Token verification failed:', err);
//     res.status(401).send('Unauthorized');
//   }
// }
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};
exports.loginGoogle = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).send('Unauthorized');
  }

  const idToken = authHeader.split('Bearer ')[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { uid, email, name } = decodedToken;

    let user = await User.findOne({ email });

    // // If user doesn't exist, register it
    // if (!user) {
    //   user = await User.create({
    //     name: name || "Google User",
    //     email,
    //     password: undefined,
    //     authType: "google",
    //     firebaseUid: uid,
    //   });
    // }

    const jwtToken = generateToken(user._id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: jwtToken, // Your own token, not Firebase's
      authType: user.authType,
    });
  } catch (err) {
    console.error('Google token verification failed:', err);
    res.status(401).send('Unauthorized');
  }
};

exports.registerUser = async (req, res) => {
    const { name, email, password, uid, authType } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        // Determine registration type
        const user = await User.create({
            name,
            email,
            password: password || undefined, // avoid setting empty password
            authType: authType || (password ? "manual" : "google"),
            firebaseUid: uid || null,
        });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            authType: user.authType,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
};

// Login User
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password, "loginUser api")
    try {
        const user = await User.findOne({ email });
        const ma = await user.matchPassword(password);
        console.log("user", user, ma);
        if (user && ma) {
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};

// Get User Profile
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        // console.log("profile user:",req.user._id);
        if (user) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching profile', error });
    }
};

exports.setPassword = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    try {
        const user = await User.findOne({ email });
        
        if (!user)
            return res.status(404).json({ message: 'User not found' });

        if (user.password)
            return res.status(400).json({ message: 'Password already set' });

        // const salt = await bcrypt.genSalt(10);
        // const hashedPassword = await bcrypt.hash(password, 10);
        
        user.password = password;
        // // user.authType = 'manual'; // Optional: if you track login method
        
        await user.save();
        
        res.status(200).json({ message: 'Password set successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to set password', error });
    }
};
    // Generate JWT Token
    
    // Register User
    // exports.registerUser = async (req, res) => {
    //     const { name, email, password } = req.body;
    
    //     try {
    //         const userExists = await User.findOne({ email });
    //         if (userExists) return res.status(400).json({ message: 'User already exists' });
    
    //         const user = await User.create({ name, email, password });
    //         res.status(201).json({
    //             _id: user._id,
    //             name: user.name,
    //             email: user.email,
    //             token: generateToken(user._id),
    //         });
    //     } catch (error) {
    //         res.status(500).json({ message: 'Error creating user', error });
    //     }
    // };