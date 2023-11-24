const getUsers = "SELECT * FROM users;";
const getUsersById = "SELECT * FROM users WHERE id = $1;";
const getUsersByEmail = "SELECT * FROM users WHERE email = $1;";
const addUser = "INSERT INTO users (username, email, password) VALUES ($1, $2, $3);";
const updateUser = "UPDATE users SET username = $2, email = $3 WHERE id = $1;"
const deleteUser = "DELETE FROM users WHERE id = $1;"

module.exports = {
    getUsers,
    getUsersById,
    getUsersByEmail,
    addUser,
    updateUser,
    deleteUser
};
