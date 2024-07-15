const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const csurf = require('csurf');
const LocalStrategy = require("passport-local");
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const app = express();
const flash = require('connect-flash');
const bcrypt = require("bcrypt");
const MemoryStore = require('memorystore')(session);

const houseOwnerRouter = require("./router/HouseOwner");
const customerRouter = require("./router/Customer");
const houseRouter = require("./router/House");
const roomRouter = require("./router/room");
const bookRouter = require("./router/booking");

const path = require('path'); 
require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(flash());

const { HouseOwner,Customer } = require("./models");
app.use(session({
  secret: 'my-super-secret-key-54862547158632541257',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, 
  },
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Define Local Strategy
passport.use('houseowner-local', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, async (email, password, done) => {
  try {
    const houseOwner = await HouseOwner.findOne({ where: { email: email } });

    if (!houseOwner) {
      return done(null, false, { message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, houseOwner.password);

    if (isMatch) {
      return done(null, houseOwner);
    } else {
      return done(null, false, { message: 'Invalid password' });
    }
  } catch (error) {
    return done(null, false, {
      message: "Account does not exists for this mail",
    });
  }
}));
// Serialize and deserialize user
passport.use('customer-local', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, async (email, password, done) => {
  try {
    const customer = await Customer.findOne({ where: { email: email } });

    if (!customer) {
      return done(null, false, { message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, customer.password);

    if (isMatch) {
      return done(null, customer);
    } else {
      return done(null, false, { message: 'Invalid password' });
    }
  } catch (error) {
    return done(null, false, {
      message: "Account does not exists for this mail",
    });
  }
}));

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  console.log('Serializing user:', user);
  done(null, { id: user.id, type: user.constructor.name }); // Pass type to distinguish between models
});

passport.deserializeUser((obj, done) => {
  console.log('Deserializing user:', obj);
  const { id, type } = obj;

  if (type === 'HouseOwner') {
    HouseOwner.findByPk(id)
      .then(user => {
        console.log('Deserialized HouseOwner:', user);
        done(null, user);
      })
      .catch(err => {
        console.error('Failed to deserialize HouseOwner:', err);
        done(err);
      });
  } else if (type === 'Customer') {
    Customer.findByPk(id)
      .then(user => {
        console.log('Deserialized Customer:', user);
        done(null, user);
      })
      .catch(err => {
        console.error('Failed to deserialize Customer:', err);
        done(err);
      });
  } else {
    done(new Error('No such user type'));
  }
});


const csrfProtection = csurf({ cookie: true });

// CORS configuration
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
}));

// Route to get CSRF token
app.get('/api/get-csrf-token', csrfProtection, (req, res) => {
  const csrfToken = req.csrfToken();
  res.json({ csrfToken });
});


// Mount routers with CSRF protection
app.use("/Ho", houseOwnerRouter);
app.use("/Cu",  customerRouter);
app.use("/house",  houseRouter);
app.use("/",  roomRouter);
app.use("/",  bookRouter);


// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({
    message: 'Internal Server Error',
    error: err.message,
  });
});

module.exports = app;
