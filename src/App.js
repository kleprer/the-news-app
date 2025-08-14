import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNews } from './store/newsSlice';
import NewsCard from './Components/NewsCard';
import Header from './Components/Header';

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
      { threshold: 0.7 }
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
      <Header />
      {items.map((item, index) => (
        <NewsCard item = { item } />
      ))}
      {error && <p>Error: {error}</p>}
      <div ref={observeRef} style={{ height: '10px' }} />
    </div>
  );
}

export default App;
