import React, { useEffect, useState } from 'react';




function Contacts() {
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

export default Contacts