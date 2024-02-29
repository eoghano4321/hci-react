const express = require('express');
const bodyParser = require('body-parser');
const csv = require('csv-parser');
const fs = require('fs');
const bcrypt = require('bcrypt');

const cors = require('cors');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

// Endpoint to register a new user
app.post('/register', async (req, res) => {
    console.log("Registering user...");
  const { email, password } = req.body;

  // Load existing users from CSV
    const fileExists = fs.existsSync('users.csv');
    if (fileExists) {
        const existingUsers = await readCSV();

        // Check if email already exists
        if (existingUsers.some((user) => user.email === email)) {
            return res.status(400).json({ error: 'Email is already taken' });
        }
    }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Add the new user to the CSV
  const newUser = { email, password: hashedPassword };
  await writeCSV(newUser);

  res.status(201).json({ message: 'User registered successfully' });
});

// Endpoint to login
app.post('/login', async (req, res) => {
    console.log("Logging in user...");
  const { email, password } = req.body;

  // Load existing users from CSV
  const existingUsers = await readCSV();
  console.log(existingUsers);

  // Find the user with the provided email
  const user = existingUsers.find((u) => u.email == email);

  if (!user) {
    return res.status(401).json({ error: 'User not found' });
  }

  // Compare the provided password with the hashed password in the CSV
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (passwordMatch) {
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.post('/remove', async (req, res) => {
    console.log("Removing user...");
    const { email } = req.body;

    // Load existing users from CSV
    const existingUsers = await readCSV();
    console.log(existingUsers);

    // Find the user with the provided email
    const user = existingUsers.find((u) => u.email == email);

    if (!user) {
        return res.status(401).json({ error: 'User not found' });
    }

    // Remove the user from the CSV
    await removeUserFromCSV(email);

    res.status(200).json({ message: 'User removed successfully' });

});

app.get('/users', async (req, res) => {
    const existingUsers = await readCSV();
    res.status(200).json(existingUsers);
});

// Function to remove a user from the CSV file
const removeUserFromCSV = async (emailToRemove) => {
    try {
      // Read the current content of the CSV
      const existingUsers = await readCSV();
  
      // Filter out the user to remove
      const updatedUsers = existingUsers.filter((user) => user.email !== emailToRemove);
  
      // Write the updated content back to the CSV
      const csvContent = [`email,password`, ...updatedUsers.map((user) => `${user.email},${user.password}`)];
      await writeFile('users.csv', csvContent.join('\n'));
  
      console.log(`User with email ${emailToRemove} removed successfully`);
    } catch (error) {
      console.error('Error removing user from CSV:', error);
    }
  };
  

// Function to read the CSV file
const readCSV = () => {
  return new Promise((resolve, reject) => {
    const users = [];
    fs.createReadStream('users.csv')
      .pipe(csv())
      .on('data', (row) => users.push(row))
      .on('end', () => resolve(users))
      .on('error', reject);
  });
};

// Function to write to the CSV file
const writeCSV = async (data) => {
    try {
      // Check if the file already exists
      const fileExists = fs.existsSync('users.csv');
  
      // If the file exists, read its content and append the new data
      if (fileExists) {
        const csvContent = `\n${data.email},${data.password}`;//data.map((user) => `${user.email},${user.password}`);
        console.log(csvContent);
        await appendFile('users.csv', csvContent);
      } else {
        // If the file doesn't exist, write the column titles followed by the new data
        const csvContent = `email,password\n` + `${data.email},${data.password}`;
        await writeFile('users.csv', csvContent);
      }
  
      console.log('Data written to CSV successfully');
    } catch (error) {
      console.error('Error writing to CSV:', error);
    }
  };

  const writeFile = (filename, data) => {
    return new Promise((resolve, reject) => {
      fs.writeFile(filename, data, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  };

  const appendFile = (filename, data) => {
    return new Promise((resolve, reject) => {
      fs.appendFile(filename, data, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  };
  

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
