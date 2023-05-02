import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase-config';
import DisplayPost from './DisplayPost';

const Home = () => {
    const [allPosts, setAllPosts] = useState([]);
    const postRef = collection(db, 'post');
    const [search, setSearch] = useState(null);
    const [searchResult, setSearchResult] = useState([]);

    useEffect(() => {
        if(allPosts && search) {
            setSearchResult(allPosts.filter((item)=>item.user.toLowerCase().includes(search.toLowerCase()) || item.prompt.toLowerCase().includes(search.toLowerCase())));
        }
    }, [search])

    useEffect(() => {
        const getPosts = async () => {
            await getDocs(postRef)
            .then(data=>setAllPosts(data.docs.map(docs=>({...docs.data(), id: docs.id}))))
        }
        getPosts();
    }, []);
  return (
        <section className='max-w-7xl max-30px-auto'>
        <h1 className='font-extrabold text-[50px]'>Community <span>Showcase</span> </h1>
        <p className='mt-2 text-[15px] max-w-[500px]'>Search for similar prompts and hover over the images to view the prompt.</p>
        
        <div className='generate-form mt-3'>
            <input 
                type='text' 
                placeholder='Search your prompt...' 
                name='search' 
                onChange={e=>setSearch(e.target.value)}
                value={search} 
            />
        </div>
        
        <div className='m-10'>

            <div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3'>
                {search && searchResult ? searchResult.map(post => (
                    <DisplayPost post={post} />
                ))
                :allPosts && allPosts.map(post => (
                    <DisplayPost post={post} />
                ))}

            </div>
        </div>
        </section>
  );
}

export default Home;