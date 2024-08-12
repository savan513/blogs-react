import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Menu from './Menu';

function Blog() {
  const [blog,setBlog] = useState({});
  const params = useParams();
  useEffect(()=>{
  const id = params.id;
  axios.get("/api/v1/blogs/"+id).then((response) => {
    setBlog(response.data)
}).catch((err) => {
    console.log("-----inside catch", err)
})
  },[])
  return (
    <>
      <Menu>
      </Menu>
      <div className='container mt-4'>
      <div className='row'>
        <div className='col-12'>
          <h1>{blog.title}</h1>
          <p>{(new Date(blog.date)).toLocaleDateString()} | <b>{blog.category}</b></p>
        </div>
      </div>
      <div className='row my-4'>
      <div className='col-12 text-center'>
        <img className='img' src={blog.image} height={500}></img>
      </div>
      <div className='row'>
        <div className='col-12'>
        <div className='mt-4' dangerouslySetInnerHTML={{__html:blog.topContent}}/>
        <div className='mt-4' dangerouslySetInnerHTML={{__html:blog.midContent}}/>
        <div className='mt-4' dangerouslySetInnerHTML={{__html:blog.bottomContent}}/>
        </div>
      </div>
      <div className='row text-center'>
      <div className='col-12'>
      <Link to="/">
      <button className='btn btn-primary w-25'>Go to Home Page</button>
      </Link>
      </div>
         
      </div>

      </div>
    </div>
    </>
  )
}

export default Blog