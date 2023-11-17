import React, { useState, useEffect } from 'react';
import axios from 'axios';
const ListComp = ({ item }) => {
    const keyCol = Object.keys(item);
    console.log("ListComp start");
    return (
        <>
            {keyCol.map((data, index) => (
                <li key={index}>
                    {data} - {item[data]}
                </li>
            ))}
        </>
    );
};

const QueryList = () => {
    const [data, setData] = useState([]);
    const [query, setQuery] = useState('');

    const fetchData = async () => {
        console.log(query);
        try {
            const response = await axios.post('/example/getQueryList', { query });
            setData(response.data.data); // Corrected this line
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleQueryChange = (event) => {
        setQuery(event.target.value);
    };

    const handleFetchData = () => {
        fetchData();
    };

    useEffect(() => {
        // Only fetch data when the query changes
        if (query) {
            fetchData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query]);

    return (
        <div>
            <h1>Data List</h1>
            <div>
                <label htmlFor="queryInput">Enter Query:</label>
                <input
                    type="text"
                    id="queryInput"
                    value={query}
                    onChange={handleQueryChange}
                />
                <button onClick={handleFetchData}>Fetch Data</button>
            </div>
            <ul>
                {Array.isArray(data) ? (
                    data.map((item, index) => (
                        <ListComp key={index} item={item} />
                    ))
                ) : (
                    <li>No data available</li>
                )}
            </ul>
        </div>
    );
};

export default QueryList;

