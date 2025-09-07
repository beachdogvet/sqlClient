- This project was designed with the intent of connecting and querying a MSSQL database.  
- It uses other project I created mssqlServer to connect to and query a MSSQL database.  
- I used  vite to create the project

#### Step 1: Update the Node.js project
- open mssqlServer node.js project in vscode
- run: npm install express cors
- update index.js
```
const express = require('express');
const cors = require('cors');
const sql = require('mssql');
const config = require('./dbConfig');

const app = express();
const PORT = 5000;

app.use(cors());

app.get('/api/data', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query('SELECT * FROM your_table_name');
    res.json(result.recordset);
  } catch (err) {
    console.error('SQL error', err);
    res.status(500).send('Server error');
  } finally {
    await sql.close();
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

#### Step 2: Create the client React project

- Start vscode
- Open a terminal session
- cd to project folder location and create a folder
- run: npx create-vite
    > - npm install

#### Step 3: Use Component to call node.js server
- Assuming your going to use App.jsx
- Enter the following code
```
import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/data')
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error('Fetch error:', err));
  }, []);

  return (
    <div>
      <h1>SQL Server Data</h1>
      <ul>
        {data.map((row, index) => (
          <li key={index}>{JSON.stringify(row)}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

```

#### Test
- Start node server:
    > node index.js
- Start React client app
    > npm run dev  
    
    > open the link in browser
        > - http://localhost:5173/
