import asyncHandler from '../middleware/asyncHandler.js'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

// @desc Auth user and get token
// @route Post /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id)

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})
// @desc Register user
// @route post /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  const userExits = await User.findOne({ email })
  if (userExits) {
    res.status(400)
    throw new Error('User Already Exits')
  }
  const user = await User.create({
    name,
    email,
    password,
  })
  if (user) {
    generateToken(res, user._id)
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(400)
    throw new Error('Invalid User Data')
  }
})
// @desc Logout user/clear cookie
// @route post /api/users/logout
// @access private
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  })
  res.status(200).json({ message: 'Logged out Successfully' })
})

// @desc Get user Profile
// @route GET /api/users/profile
// @access private

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc update user Profile
// @route PUT /api/users/profile
// @access private

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = req.body.password
    }
    const updatedUser = await user.save()
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc Get users
// @route GET /api/users
// @access private/admin

const getUsers = asyncHandler(async (req, res) => {
  res.send('get users')
})

// @desc Get users by ID
// @route GET /api/users/:id
// @access private/admin

const getUsersById = asyncHandler(async (req, res) => {
  res.send('get user by Id')
})
// @desc delete users
// @route delete /api/users/:id
// @access private/admin

const deleteUsers = asyncHandler(async (req, res) => {
  res.send('delete users')
})

// @desc update users
// @route PUT /api/users/:id
// @access private/admin

const updateUsers = asyncHandler(async (req, res) => {
  res.send('update users')
})

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUsers,
  getUsersById,
  updateUsers,
}
