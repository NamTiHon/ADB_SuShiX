let users = [];  // Temporary in-memory database for testing

// Function to retrieve user by email
const getUserByEmail = (email) => {
    return users.find(user => user.email === email);  // Find user by email
};

// Function to create a new user
const createUser = ({ email, password, name }) => {
    const user = { id: users.length + 1, email, password, name };  // Add user details and ID
    users.push(user);  // Push the new user into the array (simulating DB storage)
    return user;  // Return the created user
};

const getAllUsers = () => {
    return users; // Returns the array of all users
};

export { getUserByEmail, createUser, getAllUsers };
