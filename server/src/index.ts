import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import session from 'express-session';
import morgan from 'morgan';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { check, validationResult } from 'express-validator';
import UserDAO from './dao/userDAO';

const PORT = process.env.PORT || 3001;

const app = express();

const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) return next();
  return res.status(400).json({ message: 'ERROR !! ::= not authenticated' });
};

// Middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use('/static', express.static('public'));

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};
app.use(cors(corsOptions));

// Local strategy with Passport
passport.use(new LocalStrategy(async function verify(username: string, password: string, cb) {
  try {    
    const user = await UserDAO.getUser(username, password);
    
    if (!user) return cb(null, false, { message: 'Incorrect username or password.' });
    return cb(null, user);
  } catch (err) {
    return cb(err);
  }
}));

passport.serializeUser(function (user: Express.User, cb) {
  cb(null, { username: (user as { username: string }).username });
});

passport.deserializeUser(function (user: Express.User, cb) {
  cb(null, user);
});

// Needed for enabling cookies interaction.
app.use(session({
  secret: 'this_is_a_secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Imposta a true se utilizzi HTTPS
    maxAge: 1000 * 60 * 60 * 24, // Durata della sessione (1 giorno)
  }
}));

// Needed for enabling session into Passport.
app.use(passport.initialize());
app.use(passport.session());

// @Function to login the user.
// index.ts

app.post('/login',
  [check('username').isString().notEmpty(), check('password').isString().notEmpty()],
  (req: Request, res: Response, next: NextFunction): void => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return; // Stop execution if there are validation errors
    }

    passport.authenticate('local', (err: any, user: Express.User, info: any) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        res.status(401).send(info);
        return; // Early return when user is not authenticated
      }

      req.login(user, (err) => {
        if (err) {
          return next(err);
        }

        console.log('user', user);
        res.status(201).json(user); // Invia l'oggetto utente con il ruolo
      });
    })(req, res, next);
  }
);

app.get('/api/check-auth', (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ authenticated: true, user: req.user });
  } else {
    res.status(401).json({ authenticated: false });
  }
});

// @Function to logout the user.
app.post('/logout', (req: Request, res: Response) => {
  req.logout(() => {
    res.status(200).end();
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
