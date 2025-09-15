// hooks/useFetch.js
import { useState, useEffect } from 'react';

const useFetch = (url, dataKey = null) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const json = await response.json();
                //setData(dataKey ? json[dataKey] : json);
                setData(dataKey ? json[dataKey] || [] : json || []);

            } catch (err) {
                console.error(`Client error fetching ${url}:`, err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, loading, error };
};

export default useFetch;
