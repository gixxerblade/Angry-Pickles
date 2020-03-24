import { useState, useEffect } from "react";

export const useFetch = (url, options) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url, options);
      const data = await response.json();
      const { data: order } = data;
      setData(order);
      setLoading(false);
      console.log("Fetch Data: ", order);
    };
    fetchData();
  }, []);
  return { data, loading };
};

