// backend route to save data
/*
const express = require('express');
const cors = require('cors'); 
//const mysql = require('mysql2');
const mysql = require('mysql2/promise'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
const port = 5000;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'memory',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

const secretKey = 'bommul';
// Start the server


app.use(express.json());
app.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Hash the user's password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Insert user data into the database
    db.query(
      'INSERT INTO registeruser(username, email, password) VALUES (?, ?, ?)',
      [username, email, passwordHash],
      (err) => {
        if (err) {
          console.error('Error registering user:', err);
          res.status(500).json({ message: 'Registration failed' });
        } else {
          res.json({ message: 'User registered successfully' });
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
  db.query('SELECT * FROM registeruser WHERE email = ?', [email], async (err, results) => {
      if (err) {
        console.error('Error fetching user:', err);
        res.status(500).json({ message: 'Login failed' });
        return;
      }

      if (results.length === 0) {
        res.status(401).json({ message: 'Authentication failed' });
        return;
      }

      const user = results[0];

      // Compare the hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        res.status(401).json({ message: 'Authentication failed' });
        return;
      }

      // Generate a JWT token
      const token = jwt.sign({ userId: user.id, email: user.email }, secretKey, {
        expiresIn: '1h',
      });

      res.json({ message: 'Login successful', token });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.post('/api/userData', (req, res) => {
  const {name, desc } = req.body;

  const sql = 'INSERT INTO  user(name, `desc`) VALUES (?,?)';

  db.query(sql, [name,desc], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).json({ message: 'Server error' });
      return;
    }

    console.log('Inserted user data:', result);
    res.status(201).json({ message: 'Data inserted successfully' });
  });
});

app.get('/api/userData', (req, res) => {
  const sql = 'SELECT * FROM user';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).json({ message: 'Server error' });
      return;
    }

    console.log('Fetched user data:', results);
    res.json(results);
  });
});
app.post('/like/add', async (req, res) => {
  try {
    const { userid, itemid } = req.body;

    // Check if the user has already liked the item
    const existingLike =  db.query('SELECT * FROM likes WHERE userid = ? AND itemid = ?', [userid, itemid]);

    if (existingLike.length === 0) {
      // User hasn't liked the item before, so insert a new like
       db.query('INSERT INTO likes (userid, itemid, likecount) VALUES (?, ?, 1)', [userid, itemid]);
      console.log("like added");
    } else {
      // User has liked the item before, so do nothing (or you can update timestamps, etc.)
     db.query('DELETE FROM likes WHERE userid = ? AND itemid = ?', [userid, itemid]);
    }
    }

   catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/like/count/:itemid', async (req, res) => {
  try {
    const { itemid } = req.params;

    // Retrieve the total like count for the item
    const [result] = await db.query('SELECT SUM(likecount) AS total_likes FROM likes WHERE itemid = ?', [itemid]);

    const totalLikes = result[0].total_likes || 0;

    res.json({ totalLikes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
*/
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise'); // Import the promise-based mysql2
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
const port = 5000;

// Create a connection pool using mysql2/promise
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'memory',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const secretKey = 'bommul';

app.use(express.json());

app.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Hash the user's password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Insert user data into the database using async/await
    const [result] = await pool.query('INSERT INTO registeruser(username, email, password) VALUES (?, ?, ?)', [
      username,
      email,
      passwordHash,
    ]);

    res.json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const [results] = await pool.query('SELECT * FROM registeruser WHERE email = ?', [email]);

    if (results.length === 0) {
      res.status(401).json({ message: 'Authentication failed' });
      return;
    }

    const user = results[0];

    // Compare the hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      res.status(401).json({ message: 'Authentication failed' });
      return;
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id, email: user.email }, secretKey, {
      expiresIn: '1h',
    });
   
    res.json({ message: 'Login successful',  token, userId: user.id  });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/userData', async (req, res) => {
  try {
    const { name, desc } = req.body;

    // Insert user data into the database using async/await
    const [result] = await pool.query('INSERT INTO user(name, `desc`) VALUES (?, ?)', [name, desc]);

    res.status(201).json({ message: 'Data inserted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/userData', async (req, res) => {
  try {
    const sql = 'SELECT * FROM user';
    
    // Execute the query using async/await
    const [results] = await pool.query(sql);
    
    console.log('Fetched user data:', results);
    res.json(results);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
app.get('/api/winner', async (req, res) => {
  try {
    const sql = 'SELECT * FROM user where likecount=(select Max(likecount) from user)';
    
    // Execute the query using async/await
    const [results] = await pool.query(sql);
    
   
    // Check if a result was found
    if (results.length === 0) {
      res.status(404).json({ message: 'No items found' });
      return;
    }

    const maxLikeCountItem = results[0];
    res.json(maxLikeCountItem);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
/*
app.post('/like/add', async (req, res) => {
  try {
    const { userid, itemid } = req.body;

    // Check if the user has already liked the item
    const [existingLike] = await pool.query('SELECT * FROM likes WHERE userid = ? AND itemid = ?', [userid, itemid]);

    if (existingLike.length === 0) {
      // User hasn't liked the item before, so insert a new like
      await pool.query('INSERT INTO likes (userid, itemid, likecount) VALUES (?, ?, 1)', [userid, itemid]);
      console.log("like added");
    } else {
      // User has liked the item before, so do nothing (or you can update timestamps, etc.)
      await pool.query('DELETE FROM likes WHERE userid = ? AND itemid = ?', [userid, itemid]);
    }

    res.json({ message: 'Like updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/like/count/:itemid', async (req, res) => {
  try {
    const { itemid } = req.params;

    // Retrieve the total like count for the item
    const [result] = await pool.query('SELECT SUM(likecount) AS total_likes FROM likes WHERE itemid = ?', [itemid]);

    const totalLikes = result[0].total_likes || 0;

    res.json({ totalLikes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});*/
app.post('/api/:itemId/like', async (req, res) => {
  const itemId = req.params.itemId;

  try {
    // Check if the item exists
    const [rows] = await pool.query('SELECT * FROM user WHERE iduser = ?', [itemId]);

    if (rows.length === 0) {
      res.status(404).json({ message: 'Item not found' });
      return;
    }

    // Toggle like (increment or decrement likecount)
    await pool.query('UPDATE user SET likecount = likecount + 1 WHERE iduser = ?', [itemId]);
    const [updatedLikeCountResult] =await pool.query('select likecount as total_likes from user where iduser=?' , [itemId]);
    const updatedLikeCount = updatedLikeCountResult[0].total_likes || 0;
    res.json({ message: 'Like updated successfully' ,totallikes:updatedLikeCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.post('/api/:itemId/dislike', async (req, res) => {
  const itemId = req.params.itemId;

  try {
    // Check if the item exists
    const [rows] = await pool.query('SELECT * FROM user WHERE iduser = ?', [itemId]);

    if (rows.length === 0) {
      res.status(404).json({ message: 'Item not found' });
      return;
    }

    // Toggle like (increment or decrement likecount)
    await pool.query('UPDATE user SET likecount = likecount - 1 WHERE iduser = ?', [itemId]);
    const [updatedLikeCountResult] =await pool.query('select likecount as total_likes from user where iduser=?' , [itemId]);
    const updatedLikeCount = updatedLikeCountResult[0].total_likes || 0;
    res.json({ message: 'Like updated successfully' ,totallikes:updatedLikeCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
