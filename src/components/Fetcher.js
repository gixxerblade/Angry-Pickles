import { useState, useEffect } from "react";
export const useFetch = (url, options) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, options);
        const data = await response.json();
        const { data: order } = data;
        if (isSubscribed) {
          setData(order);
          setLoading(false);
          // console.log("Fetch Data: ", order);
          console.log('useFetch has run')
        }
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
    return () => setIsSubscribed(false);
  }, []);
  return { data, loading, error };
};
