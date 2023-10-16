import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Test = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
    }, []); // The empty dependency array ensures this runs once after the initial render.

    const getExampleList = async () => {
        try {
            const response = await axios.post('/example/getExampleList');
            if (response.data.status === 'SUCCESS') {
                setData(response.data.data.exampleList);
            } else {
                // Handle the error if needed
            }
        } catch (error) {
            // Handle any network or request error
            console.error("Error fetching data:", error);
        }
    }

    return (
        <div>
            <button value={'조회'} onClick={getExampleList}>조 회</button>
            <table style={{ border: '1px solid black' }}>
                <thead>
                <tr>
                    <th>SEQ</th>
                    <th>제목</th>
                    <th>내용</th>
                </tr>
                </thead>
                <tbody>
                {data.map(({ seq, title, contents }) => (
                    <tr key={seq}>
                        <td>{seq}</td>
                        <td>{title}</td>
                        <td>{contents}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default Test;
