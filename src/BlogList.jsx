import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Menu from './Menu';

function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const Navigate = useNavigate();

  useEffect(()=>{
    axios.get("/api/v1/blogs").then((response) => {
      setBlogs(response.data)
  }).catch((err) => {
      console.log("-----inside catch", err)
  })
  },[])

  const handleViewBlog=(id)=>{
   Navigate(`/blog/${id}`)
  }
  return (
    <>
      <Menu></Menu>
    <div className='container mt-4'>
    <div className='row'>
      <div className='text-center h1'>Blogs List</div>
    </div>
    <hr/>
    <div className='row'>
        {blogs.map(((blog, i) => {
            return (
              <div key={i} className='col-lg-4 col-md-6 col-sm-12 p-2'>
            <div className="card" style={{"height":"100%",backgroundColor:"#eae3e3"}}>
                <img className="card-img-top" style={{objectFit:'contain'}} height={300} src={blog.image} alt="product name" /><hr></hr>
                <div className="card-body">
                    <h2 className="card-title">{blog.title}</h2>
                    <h6 className="card-text">{blog.category}</h6>
                    <div dangerouslySetInnerHTML={{__html:blog.topContent.substring(0, 80).concat(" ......")}}/>
                    <div className='d-flex justify-content-around m-2'>
                    {/* <a href="#" className="btn btn-primary"><span className='align-content-center'>Add to Cart</span></a> */}
                    <button className='btn btn-primary m-1 w-100' onClick={()=> handleViewBlog(blog._id)}>Read Blog</button>
                    </div>
                    
                </div>
            </div>
        </div>
                )
        }))}
    </div>
</div>
    </>
  )
}

export default BlogList