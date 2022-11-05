import React, { useState, useEffect } from 'react';
import Posts from './Posts';
import { Link } from "react-router-dom"
import Pagination from './Pagination';
import axios from 'axios';
import '../App.css';


const Home = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResult, setSearchResult] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
            setPosts(res.data);
            setLoading(false);
        };

        fetchPosts();
    }, []);

    const searchData = (val) => {
        setSearchTerm(val);
        if (searchTerm !== '') {
            const filteredPosts = posts.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchTerm.toLowerCase());
            })
            setSearchResult(filteredPosts);
        }
        else {
            setSearchResult(posts);
        }

    }


    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currPosts = searchTerm.length > 1 ? searchResult : posts;
    const currentPosts = currPosts.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);



    return (<div>

        

        <div className='container mt-5'>
        <Link to="/lazy" className='text-primary mt-2'><b>For Lazy loading feature click here</b></Link>
            <h2 className='text-secondary mt-5 mb-2'>Search</h2>
            <input type="text" onChange={(e) => searchData(e.target.value)} placeholder="Search...." />
            <h1 className='text-primary mb-3 mt-5'>My Blog</h1>
            <Posts posts={currentPosts} loading={loading} />
            <Pagination
                postsPerPage={postsPerPage}
                totalPosts={currPosts.length}
                paginate={paginate}
            />
            
        </div>
    </div>
    );
};

export default Home;
