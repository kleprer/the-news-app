import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNews } from './store/newsSlice';

function App() {
  const dispatch = useDispatch();
  const { items, loading, error, hasMore } = useSelector((state) => state.news);
  const observeRef = useRef();
 

  useEffect(() => {
    if (loading || !hasMore) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          dispatch(fetchNews(items.length));
        }
      },
      { threshold: 1.0 }
    );

    if (observeRef.current) {
      observer.observe(observeRef.current);
    }

    return () => {
      if (observeRef.current) {
        observer.unobserve(observeRef.current);
      }
    };

  }, [items.length])




  return (
    <div className="App">
      <h1>News</h1>
      {items.map((item, index) => (
        <div key={`${item.id}-${index}`} className="news-item">
          <h3>{item.title}</h3>
          <p>{item.body}</p>
        </div>
      ))}
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div ref={observeRef} style={{ height: '10px' }} />
    </div>
  );
}

export default App;
