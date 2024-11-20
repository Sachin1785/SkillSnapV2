const express = require('express');
const { getUsers, getUserById, createUser, updateUser } = require('../controllers/usercontroller');

const router = express.Router();

router.get('/', getUsers); // GET /api/users
router.get('/:id', getUserById); // GET /api/users/:id
router.post('/', createUser); // POST /api/users
router.put('/:id', updateUser); // PUT /api/users/:id

module.exports = router;
