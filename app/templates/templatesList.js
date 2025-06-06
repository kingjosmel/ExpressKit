// app/templates/templatesList.js
const templatesList = [
  {
    id: "controllers",
    title: "Controllers",
    category: "Core Templates",
    description: "Reusable Express controller structure for RESTful APIs",
    sections: [
      {
        heading: "Basic CRUD Controller",
        body: "A standard controller pattern with all CRUD operations, error handling, and async/await syntax.",
        code: `const User = require('../models/User');
  
  class UserController {
    // GET /api/users
    async getAllUsers(req, res) {
      try {
        const users = await User.find().select('-password');
        res.json({
          success: true,
          data: users
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: 'Server error',
          error: error.message
        });
      }
    }
  
    // GET /api/users/:id
    async getUserById(req, res) {
      try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
          return res.status(404).json({
            success: false,
            message: 'User not found'
          });
        }
        res.json({
          success: true,
          data: user
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: 'Server error',
          error: error.message
        });
      }
    }
  
    // POST /api/users
    async createUser(req, res) {
      try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json({
          success: true,
          data: user,
          message: 'User created successfully'
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          message: 'Validation error',
          error: error.message
        });
      }
    }
  
    // PUT /api/users/:id
    async updateUser(req, res) {
      try {
        const user = await User.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true, runValidators: true }
        ).select('-password');
        
        if (!user) {
          return res.status(404).json({
            success: false,
            message: 'User not found'
          });
        }
        
        res.json({
          success: true,
          data: user,
          message: 'User updated successfully'
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          message: 'Update failed',
          error: error.message
        });
      }
    }
  
    // DELETE /api/users/:id
    async deleteUser(req, res) {
      try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
          return res.status(404).json({
            success: false,
            message: 'User not found'
          });
        }
        res.json({
          success: true,
          message: 'User deleted successfully'
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: 'Server error',
          error: error.message
        });
      }
    }
  }
  
  module.exports = new UserController();`,
      },
    ],
  },
  {
    id: "routes",
    title: "Routes",
    category: "Core Templates",
    description:
      "Clean route organization patterns with proper separation of concerns",
    sections: [
      {
        heading: "Modular Route Structure",
        body: "Organized route files with middleware, validation, and controller separation for maintainable APIs.",
        code: `const express = require('express');
  const router = express.Router();
  const userController = require('../controllers/userController');
  const auth = require('../middleware/auth');
  const validate = require('../middleware/validate');
  const { userValidation } = require('../validation/userValidation');
  
  // Public routes
  router.post('/register', validate(userValidation.register), userController.register);
  router.post('/login', validate(userValidation.login), userController.login);
  
  // Protected routes (require authentication)
  router.use(auth); // Apply auth middleware to all routes below
  
  router.get('/', userController.getAllUsers);
  router.get('/:id', validate(userValidation.getUserById), userController.getUserById);
  router.put('/:id', validate(userValidation.updateUser), userController.updateUser);
  router.delete('/:id', validate(userValidation.deleteUser), userController.deleteUser);
  
  // Admin only routes
  router.use(require('../middleware/adminAuth'));
  router.get('/admin/stats', userController.getAdminStats);
  
  module.exports = router;`,
      },
      {
        heading: "Route Handler with Error Handling",
        body: "Individual route handlers with comprehensive error handling and response formatting.",
        code: `const express = require('express');
  const router = express.Router();
  const asyncHandler = require('../utils/asyncHandler');
  
  // Async wrapper to catch errors automatically
  router.get('/users', asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, search } = req.query;
    
    const query = search 
      ? { name: { $regex: search, $options: 'i' } }
      : {};
      
    const users = await User.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });
      
    const total = await User.countDocuments(query);
    
    res.json({
      success: true,
      data: users,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  }));
  
  // Route with parameter validation
  router.get('/users/:id', 
    param('id').isMongoId().withMessage('Invalid user ID'),
    asyncHandler(async (req, res) => {
      const user = await User.findById(req.params.id);
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }
      
      res.json({
        success: true,
        data: user
      });
    })
  );
  
  module.exports = router;`,
      },
    ],
  },
  {
    id: "models",
    title: "Models (Mongoose)",
    category: "Core Templates",
    description:
      "Mongoose schema patterns with validation, middleware, and methods",
    sections: [
      {
        heading: "User Model with Authentication",
        body: "Complete user model with password hashing, validation, and instance methods for authentication.",
        code: `const mongoose = require('mongoose');
  const bcrypt = require('bcryptjs');
  const jwt = require('jsonwebtoken');
  
  const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [50, 'Name cannot exceed 50 characters']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      validate: {
        validator: function(email) {
          return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
        },
        message: 'Please enter a valid email'
      }
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false // Don't include in queries by default
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },
    avatar: {
      type: String,
      default: null
    },
    isActive: {
      type: Boolean,
      default: true
    },
    lastLogin: {
      type: Date,
      default: null
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
  }, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  });
  
  // Hash password before saving
  userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
      return next();
    }
    
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });
  
  // Instance method to check password
  userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  
  // Instance method to generate JWT token
  userSchema.methods.getSignedJwtToken = function() {
    return jwt.sign(
      { id: this._id, role: this.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );
  };
  
  // Instance method to generate password reset token
  userSchema.methods.getResetPasswordToken = function() {
    const resetToken = crypto.randomBytes(20).toString('hex');
    
    this.resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
      
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
    
    return resetToken;
  };
  
  // Static method to find by credentials
  userSchema.statics.findByCredentials = async function(email, password) {
    const user = await this.findOne({ email }).select('+password');
    
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }
    
    return user;
  };
  
  module.exports = mongoose.model('User', userSchema);`,
      },
    ],
  },
  {
    id: "middlewares",
    title: "Middlewares",
    category: "Core Templates",
    description:
      "Common middleware patterns for authentication, validation, and error handling",
    sections: [
      {
        heading: "Authentication Middleware",
        body: "JWT-based authentication middleware with token verification and user attachment.",
        code: `const jwt = require('jsonwebtoken');
  const User = require('../models/User');
  
  const auth = async (req, res, next) => {
    try {
      let token;
      
      // Get token from header
      if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
      } else if (req.cookies.token) {
        token = req.cookies.token;
      }
      
      if (!token) {
        return res.status(401).json({
          success: false,
          message: 'Access denied. No token provided.'
        });
      }
      
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Get user from database
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Token is not valid'
        });
      }
      
      if (!user.isActive) {
        return res.status(401).json({
          success: false,
          message: 'User account is deactivated'
        });
      }
      
      req.user = user;
      next();
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({
          success: false,
          message: 'Token is not valid'
        });
      } else if (error.name === 'TokenExpiredError') {
        return res.status(401).json({
          success: false,
          message: 'Token has expired'
        });
      }
      
      res.status(500).json({
        success: false,
        message: 'Server error',
        error: error.message
      });
    }
  };
  
  module.exports = auth;`,
      },
      {
        heading: "Error Handling Middleware",
        body: "Centralized error handling middleware with custom error classes and logging.",
        code: `const ErrorResponse = require('../utils/errorResponse');
  
  const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;
    
    // Log to console for dev
    console.log(err);
    
    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
      const message = 'Resource not found';
      error = new ErrorResponse(message, 404);
    }
    
    // Mongoose duplicate key
    if (err.code === 11000) {
      const message = 'Duplicate field value entered';
      error = new ErrorResponse(message, 400);
    }
    
    // Mongoose validation error
    if (err.name === 'ValidationError') {
      const message = Object.values(err.errors).map(val => val.message);
      error = new ErrorResponse(message, 400);
    }
    
    // JWT errors
    if (err.name === 'JsonWebTokenError') {
      const message = 'Not authorized to access this route';
      error = new ErrorResponse(message, 401);
    }
    
    if (err.name === 'TokenExpiredError') {
      const message = 'Token expired';
      error = new ErrorResponse(message, 401);
    }
    
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Server Error',
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
  };
  
  module.exports = errorHandler;`,
      },
    ],
  },
  {
    id: "database-connection",
    title: "Database Connection",
    category: "Database Templates",
    description:
      "MongoDB connection setup with Mongoose and environment configuration",
    sections: [
      {
        heading: "MongoDB Connection",
        body: "Robust MongoDB connection with Mongoose, error handling, and connection events.",
        code: `const mongoose = require('mongoose');
  
  const connectDB = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        maxPoolSize: 10, // Maximum number of connections
        serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
        socketTimeoutMS: 45000, // Close connections after 45 seconds of inactivity
        bufferCommands: false, // Disable mongoose buffering
        bufferMaxEntries: 0 // Disable mongoose buffering
      });
  
      console.log(\`MongoDB Connected: \${conn.connection.host}\`.cyan.underline.bold);
    } catch (error) {
      console.error(\`Error: \${error.message}\`.red.underline.bold);
      process.exit(1);
    }
  };
  
  // Connection events
  mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to MongoDB');
  });
  
  mongoose.connection.on('error', (err) => {
    console.log(\`Mongoose connection error: \${err}\`);
  });
  
  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
  });
  
  // Close connection on app termination
  process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('Mongoose connection closed through app termination');
    process.exit(0);
  });
  
  module.exports = connectDB;`,
      },
      {
        heading: "Database Configuration",
        body: "Environment-based database configuration with multiple connection options.",
        code: `// config/database.js
  const mongoose = require('mongoose');
  
  const dbConfig = {
    development: {
      uri: process.env.MONGO_URI_DEV || 'mongodb://localhost:27017/expresskit_dev',
      options: {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        maxPoolSize: 5,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000
      }
    },
    production: {
      uri: process.env.MONGO_URI,
      options: {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        maxPoolSize: 20,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        ssl: true,
        sslValidate: true
      }
    },
    test: {
      uri: process.env.MONGO_URI_TEST || 'mongodb://localhost:27017/expresskit_test',
      options: {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        maxPoolSize: 5
      }
    }
  };
  
  const connectDB = async () => {
    const env = process.env.NODE_ENV || 'development';
    const config = dbConfig[env];
    
    if (!config.uri) {
      throw new Error(\`MongoDB URI not found for environment: \${env}\`);
    }
    
    try {
      await mongoose.connect(config.uri, config.options);
      console.log(\`MongoDB Connected [\${env}]: \${mongoose.connection.host}\`);
    } catch (error) {
      console.error('MongoDB connection failed:', error);
      process.exit(1);
    }
  };
  
  module.exports = { connectDB, dbConfig };`,
      },
    ],
  },
  {
    id: "login-register",
    title: "Login/Register",
    category: "Authentication Templates",
    description:
      "Complete authentication system with registration, login, and token management",
    sections: [
      {
        heading: "Authentication Controller",
        body: "Complete auth controller with user registration, login, logout, and profile management.",
        code: `const User = require('../models/User');
  const asyncHandler = require('../middleware/asyncHandler');
  const ErrorResponse = require('../utils/errorResponse');
  
  // @desc    Register user
  // @route   POST /api/auth/register
  // @access  Public
  const register = asyncHandler(async (req, res, next) => {
    const { name, email, password } = req.body;
  
    // Create user
    const user = await User.create({
      name,
      email,
      password
    });
  
    sendTokenResponse(user, 200, res);
  });
  
  // @desc    Login user
  // @route   POST /api/auth/login
  // @access  Public
  const login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
  
    // Validate email & password
    if (!email || !password) {
      return next(new ErrorResponse('Please provide an email and password', 400));
    }
  
    // Check for user
    const user = await User.findOne({ email }).select('+password');
  
    if (!user) {
      return next(new ErrorResponse('Invalid credentials', 401));
    }
  
    // Check if password matches
    const isMatch = await user.matchPassword(password);
  
    if (!isMatch) {
      return next(new ErrorResponse('Invalid credentials', 401));
    }
  
    // Update last login
    user.lastLogin = new Date();
    await user.save({ validateBeforeSave: false });
  
    sendTokenResponse(user, 200, res);
  });
  
  // @desc    Log user out / clear cookie
  // @route   GET /api/auth/logout
  // @access  Private
  const logout = asyncHandler(async (req, res, next) => {
    res.cookie('token', 'none', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true
    });
  
    res.status(200).json({
      success: true,
      data: {},
      message: 'User logged out successfully'
    });
  });
  
  // @desc    Get current logged in user
  // @route   GET /api/auth/me
  // @access  Private
  const getMe = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);
  
    res.status(200).json({
      success: true,
      data: user
    });
  });
  
  // @desc    Update user details
  // @route   PUT /api/auth/updatedetails
  // @access  Private
  const updateDetails = asyncHandler(async (req, res, next) => {
    const fieldsToUpdate = {
      name: req.body.name,
      email: req.body.email
    };
  
    const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
      new: true,
      runValidators: true
    });
  
    res.status(200).json({
      success: true,
      data: user
    });
  });
  
  // @desc    Update password
  // @route   PUT /api/auth/updatepassword
  // @access  Private
  const updatePassword = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');
  
    // Check current password
    if (!(await user.matchPassword(req.body.currentPassword))) {
      return next(new ErrorResponse('Password is incorrect', 401));
    }
  
    user.password = req.body.newPassword;
    await user.save();
  
    sendTokenResponse(user, 200, res);
  });
  
  // Get token from model, create cookie and send response
  const sendTokenResponse = (user, statusCode, res) => {
    // Create token
    const token = user.getSignedJwtToken();
  
    const options = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true
    };
  
    if (process.env.NODE_ENV === 'production') {
      options.secure = true;
    }
  
    res.status(statusCode)
      .cookie('token', token, options)
      .json({
        success: true,
        token,
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
  };
  
  module.exports = {
    register,
    login,
    logout,
    getMe,
    updateDetails,
    updatePassword
  };`,
      },
    ],
  },
  {
    id: "password-reset",
    title: "Password Reset",
    category: "Authentication Templates",
    description:
      "Secure password reset functionality with email tokens and validation",
    sections: [
      {
        heading: "Password Reset Controller",
        body: "Complete password reset implementation with token generation, email sending, and secure reset process.",
        code: `const crypto = require('crypto');
  const User = require('../models/User');
  const asyncHandler = require('../middleware/asyncHandler');
  const ErrorResponse = require('../utils/errorResponse');
  const sendEmail = require('../utils/sendEmail');
  
  // @desc    Forgot password
  // @route   POST /api/auth/forgotpassword
  // @access  Public
  const forgotPassword = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
  
    if (!user) {
      return next(new ErrorResponse('There is no user with that email', 404));
    }
  
    // Get reset token
    const resetToken = user.getResetPasswordToken();
  
    await user.save({ validateBeforeSave: false });
  
    // Create reset url
    const resetUrl = \`\${req.protocol}://\${req.get(
      'host'
    )}/api/auth/resetpassword/\${resetToken}\`;
  
    const message = \`
      <h1>You have requested a password reset</h1>
      <p>Please click the link below to reset your password:</p>
      <a href="\${resetUrl}" clicktracking=off>\${resetUrl}</a>
      <p>This link will expire in 10 minutes.</p>
      <p>If you did not request this, please ignore this email.</p>
    \`;
  
    try {
      await sendEmail({
        email: user.email,
        subject: 'Password Reset Request',
        message
      });
  
      res.status(200).json({
        success: true,
        message: 'Password reset email sent'
      });
    } catch (err) {
      console.log(err);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
  
      await user.save({ validateBeforeSave: false });
  
      return next(new ErrorResponse('Email could not be sent', 500));
    }
  });
  
  // @desc    Reset password
  // @route   PUT /api/auth/resetpassword/:resettoken
  // @access  Public
  const resetPassword = asyncHandler(async (req, res, next) => {
    // Get hashed token
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(req.params.resettoken)
      .digest('hex');
  
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
    });
  
    if (!user) {
      return next(new ErrorResponse('Invalid or expired token', 400));
    }
  
    // Set new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
  
    // Log the password reset
    console.log(\`Password reset successful for user: \${user.email}\`);
  
    sendTokenResponse(user, 200, res);
  });
  
  // @desc    Verify reset token
  // @route   GET /api/auth/resetpassword/:resettoken
  // @access  Public
  const verifyResetToken = asyncHandler(async (req, res, next) => {
    // Get hashed token
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(req.params.resettoken)
      .digest('hex');
  
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
    });
  
    if (!user) {
      return next(new ErrorResponse('Invalid or expired token', 400));
    }
  
    res.status(200).json({
      success: true,
      message: 'Token is valid',
      data: {
        email: user.email
      }
    });
  });
  
  // Get token from model, create cookie and send response
  const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();
  
    const options = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true
    };
  
    if (process.env.NODE_ENV === 'production') {
      options.secure = true;
    }
  
    res.status(statusCode)
      .cookie('token', token, options)
      .json({
        success: true,
        token,
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
  };
  
  module.exports = {
    forgotPassword,
    resetPassword,
    verifyResetToken
  };`,
      },
    ],
  },
  // {
  //     id: "jwt-middleware",
  //     title: "JWT Authentication Middleware",
  //     category: "Authentication Templates",
  //     description: "Comprehensive JWT middleware with role-based access control",
  //     sections: [
  //       {
  //         heading: "JWT Authentication Middleware",
  //         body: "Advanced JWT middleware with role-based access control, token refresh, and security features.",
  //         code: `const jwt = require('jsonwebtoken');
  //   const User = require('../models/User');
  //   const asyncHandler = require('./asyncHandler');
  //   const ErrorResponse = require('../utils/errorResponse');

  //   // Protect routes
  //   const protect = asyncHandler(async (req, res, next) => {
  //     let token;

  //     if (
  //       req.headers.authorization &&
  //       req.headers.authorization.startsWith('Bearer')
  //     ) {
  //       token = req.headers.authorization.split(' ')[1];
  //     } else if (req.cookies.token) {
  //       token = req.cookies.token;
  //     }

  //     if (!token) {
  //       return next(new ErrorResponse('Not authorized to access this route', 401));
  //     }

  //     try {
  //       const decoded = jwt.verify(token, process.env.JWT_SECRET);

  //       const user = await User.findById(decoded.id);
  //       if (!user) {
  //         return next(new ErrorResponse('User not found', 401));
  //       }

  //       if (!user.isActive) {
  //         return next(new ErrorResponse('User deactivated', 401));
  //       }

  //       req.user = user;
  //       next();
  //     } catch (err) {
  //       if (err.name === 'TokenExpiredError') {
  //         return next(new ErrorResponse('Token expired', 401));
  //       }
  //       if (err.name === 'JsonWebTokenError') {
  //         return next(new ErrorResponse('Invalid token', 401));
  //       }
  //       return next(new ErrorResponse('Not authorized', 401));
  //     }
  //   });

  //   // Grant access to roles
  //   const authorize = (...roles) => {
  //     return (req, res, next) => {
  //       if (!roles.includes(req.user.role)) {
  //         return next(
  //           new ErrorResponse(`Role ${req.user.role} not authorized`, 403)
  //         );
  //       }
  //       next();
  //     };
  //   };

  //   // Optional auth
  //   const optionalAuth = asyncHandler(async (req, res, next) => {
  //     let token;

  //     if (
  //       req.headers.authorization &&
  //       req.headers.authorization.startsWith('Bearer')
  //     ) {
  //       token = req.headers.authorization.split(' ')[1];
  //     } else if (req.cookies.token) {
  //       token = req.cookies.token;
  //     }

  //     if (token) {
  //       try {
  //         const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //         const user = await User.findById(decoded.id);
  //         if (user && user.isActive) {
  //           req.user = user;
  //         }
  //       } catch (err) {
  //         console.log('Optional auth failed:', err.message);
  //       }
  //     }

  //     next();
  //   });

  //   // Rate limiting for auth endpoints
  //   const authRateLimit = (maxAttempts = 5, windowMs = 15 * 60 * 1000) => {
  //     const attempts = new Map();

  //     return (req, res, next) => {
  //       const ip = req.ip || req.connection.remoteAddress;
  //       const key = `${ip}:${req.path}`;
  //       const now = Date.now();

  //       if (!attempts.has(key)) {
  //         attempts.set(key, { count: 1, resetTime: now + windowMs });
  //         return next();
  //       }

  //       const attempt = attempts.get(key);

  //       if (now > attempt.resetTime) {
  //         attempts.set(key, { count: 1, resetTime: now + windowMs });
  //         return next();
  //       }

  //       if (attempt.count >= maxAttempts) {
  //         return res.status(429).json({ error: 'Too many requests. Try again later.' });
  //       }

  //       attempt.count++;
  //       attempts.set(key, attempt);
  //       next();
  //     };
  //   };

  //   module.exports = { protect, authorize, optionalAuth, authRateLimit };`
  //       }
  //     ]
  //   },
  {
    id: "input-validation",
    title: "Input Validation",
    category: "Advanced Templates",
    description: "Template for input validation using express-validator.",
    sections: [
      {
        heading: "Input Validation with express-validator",
        body: "Use this middleware to validate incoming request data with express-validator.",
        code: `const { check, validationResult } = require('express-validator');
      
      const validateUserInput = [
        check('email', 'Please provide a valid email').isEmail(),
        check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
        (req, res, next) => {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
          }
          next();
        }
      ];
      
      module.exports = validateUserInput;`,
      },
    ],
  },
  {
    id: "stripe-integration",
    title: "Stripe Payment Integration",
    category: "Advanced Templates",
    description: "Basic template to handle payments using Stripe.",
    sections: [
      {
        heading: "Stripe Payment Integration",
        body: "Use this basic Stripe integration to accept payments in your Express.js app.",
        code: `const express = require('express');
      const router = express.Router();
      const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
      
      router.post('/create-checkout-session', async (req, res) => {
        try {
          const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: req.body.items,
            mode: 'payment',
            success_url: \`\${process.env.CLIENT_URL}/success\`,
            cancel_url: \`\${process.env.CLIENT_URL}/cancel\`,
          });
      
          res.status(200).json({ id: session.id });
        } catch (error) {
          console.error('Stripe error:', error);
          res.status(500).json({ error: 'Something went wrong' });
        }
      });
      
      module.exports = router;`,
      },
    ],
  },
];

export default templatesList;
