import React, { useState, useEffect, useRef, useCallback } from 'react';
import usePostSearch from "./usePostSearch.js"
import "../App.css";




const Lazy = () => {

    const[query, setQuery] = useState('');
    const [pageNumber, setPageNumber] = useState(1);
    const {posts, hasMore, loading, error} = usePostSearch(query, pageNumber);

    const observer = useRef();
    const lastPostElementRef = useCallback(node => {
        if(loading) return;
        if(observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting && hasMore){
                setPageNumber(prevPageNumber => prevPageNumber + 1)
            }
        })
        if(node) observer.current.observe(node);
    }, [loading, hasMore]);

    function handleSearch(e){
        setQuery(e.target.value);
        setPageNumber(1);
    }

    return (
      <>
      <div className='container mt-5'>
      <h6  className = 'text-primary mb-3 mt-5'> Had to Change API as previous API had less number of elements, infinite search was not visible properly</h6>
      <h8 className = 'text-primary mb-3 mt-5 mb-7'>Might take time to Fetch as component is heavy</h8><br/>
        <input type="text" value={query} onChange={handleSearch}></input>
      {posts.map((book, index) => {
        if (posts.length === index + 1) {
          return <div ref={lastPostElementRef} key={book}>{book}</div>
        } else {
          return <div key={book}>{book}</div>
        }
      })}
      <div>{loading && 'Loading...'}</div>
      <div>{error && 'Error'}</div>
      </div>
      </>
    );
}

export default Lazy