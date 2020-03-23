import { useState, useEffect } from "react";

export const useFetch = (url, options) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url, options);
      const data = await response.json();
      const [item] = data;
      setData(item);
      setLoading(false);
    };
    fetchData();
  }, []);
  console.log({data});
  return { data, loading };
};

/* 
  const updateProducts = async () => {
    const { data, error } = await fetch('/.netlify/functions/skuList')
      .then(response => response.json())
      .catch(error => console.error(error))

    if (error) {
      console.error(error)
    }

    const [liveProducts, liveSkus] = processStripeData(data, products)
    setProducts(liveProducts)
    setSkus(liveSkus)
  }

*/