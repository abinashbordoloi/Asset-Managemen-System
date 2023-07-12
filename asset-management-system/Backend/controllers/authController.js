const { Pool } = require('pg');

// Create a new instance of the Pool for connecting to the PostgreSQL database
const pool = new Pool({
  connectionString: process.env.DB_CONNECTION_STRING, // Replace with your actual database connection string
});

const signup = async (req, res) => {
  // Implementation for user registration
  const { username, email, password } = req.body;

  // Perform validation on the received data
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Please provide all required fields.' });
  }

  try {
    // Save the user data to the database
    const query = `
      INSERT INTO users (username, email, password)
      VALUES ($1, $2, $3)
    `;
    const values = [username, email, password];

    await pool.query(query, values);

    // Send a response indicating successful registration
    res.json({ message: 'Registration successful!' });
  } catch (error) {
    console.error('Error occurred during user registration:', error);
    res.status(500).json({ error: 'An error occurred during user registration.' });
  }
};

const signin = async (req, res) => {

  // const user = {
  //   id: 123,
  //   username: 'john.doe',
  //   role: 'admin',
  // };



  // Implementation for user login
  const { email, password } = req.body;

  // Perform validation on the received data
  if (!email || !password) {
    return res.status(400).json({ error: 'Please provide email and password.' });
  }

  try {
    // Retrieve the user from the database based on the provided email
    const query = `
      SELECT * FROM users WHERE email = $1
    `;
    const values = [email];

    const { rows } = await pool.query(query, values);
    const user = rows[0];

    // Check if a user with the provided email exists
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    // Compare the provided password with the stored hashed password
    if (password !== user.password) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    // Authentication successful
    // Generate and return an authentication token or session information
    const authToken = generateToken(user);
 


    res.json({ authToken });
  } catch (error) {
    console.error('Error occurred during user authentication:', error);
    res.status(500).json({ error: 'An error occurred during user authentication.' });
  }
};

const signout = (req, res) => {
  // Placeholder implementation for user logout

  // Perform any necessary actions related to user logout, such as clearing session data or invalidating tokens
  // ...

  // Send a response indicating successful logout
  res.json({ message: 'Logout successful!' });
};

module.exports = {
  signup,
  signin,
  signout,
};