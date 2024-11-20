const express = require('express');
const { getUsers, getUserById, createUser, updateUser } = require('../controllers/usercontroller');

const router = express.Router();

router.get('/', getUsers); // GET /api/users
router.get('/:_id', getUserById); // GET /api/users/:_id
router.post('/', createUser); // POST /api/users
router.put('/:_id', updateUser); // PUT /api/users/:_id

module.exports = router;
