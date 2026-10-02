import { useState, useEffect } from 'react';
import { restaurantApi } from '../api/restaurantApi';

export function useSearch(initialQuery = '') {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState({ restaurants: [], foodItems: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query || !query.trim()) {
      setResults({ restaurants: [], foodItems: [] });
      setLoading(false);
      return;
    }

    let isCurrent = true;
    setLoading(true);

    const timer = setTimeout(async () => {
      try {
        const data = await restaurantApi.searchAll(query);
        if (isCurrent) {
          setResults(data);
        }
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        if (isCurrent) {
          setLoading(false);
        }
      }
    }, 200);

    return () => {
      isCurrent = false;
      clearTimeout(timer);
    };
  }, [query]);

  return {
    query,
    setQuery,
    results,
    loading,
    clearSearch: () => setQuery(''),
  };
}
