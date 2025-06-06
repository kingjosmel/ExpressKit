// data/docsData.js

const docsList = [
  // 1. Getting Started with Express.js
  {
    id: "what-is-express",
    title: "What is Express.js?",
    sections: [
      {
        heading: "Intro to Express",
        body: `Express.js is a fast, unopinionated, and minimalist web framework for Node.js. It simplifies building server-side logic with features like routing, middleware, and templates. It’s widely used to build APIs and web applications.`,
      },
      {
        heading: "Why Choose Express?",
        body: "Because of its simplicity and flexibility, Express is one of the most popular frameworks for Node.js developers.",
      },
    ],
  },
  {
    id: "why-use-express",
    title: "Why Use Express.js?",
    sections: [
      {
        heading: "Key Advantages",
        body: `Express helps developers:
  - Quickly create web applications
  - Handle routing with ease
  - Integrate middleware functions
  - Build RESTful APIs`,
      },
      {
        heading: "Real-World Use",
        body: "Companies like Uber, Accenture, and IBM use Express for building web services and APIs.",
      },
    ],
  },
  {
    id: "installing-express",
    title: "Installing Express.js",
    sections: [
      {
        heading: "Requirements",
        body: "Make sure Node.js and npm are installed on your machine.",
      },
      {
        heading: "Installation Command",
        body: "You can install Express via npm:",
        code: "npm install express",
      },
      {
        heading: "Initialize a Project",
        body: "Before installing Express, create a new project folder and run:",
        code: "npm init -y",
      },
    ],
  },
  {
    id: "setup-first-app",
    title: "Setting Up Your First Express App",
    sections: [
      {
        heading: "Create an entry file",
        body: "Create a file called `index.js` and paste the following code:",
        code: `const express = require('express');
  const app = express();
  
  app.get('/', (req, res) => {
    res.send('Hello, Express!');
  });
  
  app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });`,
      },
      {
        heading: "Run Your App",
        body: "Start your server using Node:",
        code: "node index.js",
      },
    ],
  },
  // 2. Core Express Concepts
  {
    id: "understanding-routing",
    title: "Understanding Routing",
    sections: [
      {
        heading: "What is Routing?",
        body: "Routing refers to how an application’s endpoints (URIs) respond to client requests.",
      },
      {
        heading: "Example:",
        code: `app.get('/', (req, res) => {
    res.send('Home Page');
  });`,
      },
    ],
  },
  {
    id: "handling-http-methods",
    title: "Handling HTTP Methods (GET, POST, etc.)",
    sections: [
      {
        heading: "Example:",
        code: `app.post('/submit', (req, res) => {
    res.send('Form submitted');
  });`,
      },
    ],
  },
  {
    id: "using-middleware",
    title: "Using Middleware",
    sections: [
      {
        heading: "What is Middleware?",
        body: "Middleware functions have access to the request and response objects. They can execute any code, modify the request/response, and end the request-response cycle.",
      },
      {
        heading: "Example:",
        code: `app.use((req, res, next) => {
    console.log('Time:', Date.now());
    next();
  });`,
      },
    ],
  },
  {
    id: "error-handling",
    title: "Error Handling in Express",
    sections: [
      {
        heading: "Custom Error Handler",
        code: `app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });`,
      },
    ],
  },
  {
    id: "req-res-objects",
    title: "Working with Request and Response Objects",
    sections: [
      {
        heading: "Request Object",
        code: `app.get('/', (req, res) => {
    console.log(req.query);
  });`,
      },
      {
        heading: "Response Object",
        code: `res.send('Hello');`,
      },
    ],
  },
  // 3. Database Integration
  {
    id: "connect-mongodb",
    title: "Connecting to MongoDB",
    sections: [
      {
        heading: "Mongoose Connection",
        code: `const mongoose = require('mongoose');
  mongoose.connect('mongodb://localhost/mydb');`,
      },
    ],
  },
  {
    id: "mongoose-setup",
    title: "Using Mongoose with Express",
    sections: [
      {
        heading: "Define a Schema",
        code: `const UserSchema = new mongoose.Schema({ name: String });
  const User = mongoose.model('User', UserSchema);`,
      },
    ],
  },
  {
    id: "crud-operations",
    title: "CRUD Operations with Express and MongoDB",
    sections: [
      {
        heading: "Create User Example",
        code: `app.post('/users', async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.send(user);
  });`,
      },
    ],
  },
  // 4. Authentication and Security
  {
    id: "auth-setup",
    title: "Setting Up User Authentication (Login/Register)",
    sections: [
      {
        heading: "Register Example",
        code: `app.post('/register', async (req, res) => {
    // Validate and save user
  });`,
      },
    ],
  },
  {
    id: "password-reset",
    title: "Implementing Password Reset",
    sections: [
      {
        heading: "Reset Flow",
        body: "Generate a reset token, send via email, allow user to reset password.",
      },
    ],
  },
  {
    id: "secure-routes",
    title: "Securing Routes with Middleware",
    sections: [
      {
        heading: "Middleware Auth Check",
        code: `function auth(req, res, next) {
    if (!req.user) return res.status(401).send('Access denied');
    next();
  }`,
      },
    ],
  },
  {
    id: "jwt-auth",
    title: "Using JSON Web Tokens (JWT)",
    sections: [
      {
        heading: "JWT Flow",
        code: `const token = jwt.sign({ id: user._id }, 'secret');`,
      },
    ],
  },
  // 5. Advanced Features
  {
    id: "stripe-integration",
    title: "Integrating Stripe for Payments",
    sections: [
      {
        heading: "Stripe Example",
        code: `const stripe = require('stripe')('secret');
  app.post('/pay', async (req, res) => {
    const payment = await stripe.charges.create({...});
  });`,
      },
    ],
  },
  {
    id: "input-validation",
    title: "Input Validation in Express",
    sections: [
      {
        heading: "Using express-validator",
        code: `app.post('/user', [
    body('email').isEmail()
  ], (req, res) => {...});`,
      },
    ],
  },
  {
    id: "file-uploads",
    title: "File Uploads with Express",
    sections: [
      {
        heading: "Using multer",
        code: `const multer = require('multer');
  const upload = multer({ dest: 'uploads/' });
  app.post('/upload', upload.single('file'), (req, res) => {
    res.send('Uploaded');
  });`,
      },
    ],
  },
  {
    id: "restful-apis",
    title: "Building RESTful APIs with Express",
    sections: [
      {
        heading: "Example",
        code: `app.get('/users/:id', (req, res) => {
    res.send('User details');
  });`,
      },
    ],
  },
];

export default docsList;
