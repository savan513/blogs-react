// src/components/Admin.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Button, Form, Spinner, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Admin = () => {
    const [blogs, setBlogs] = useState([]);
    const [form, setForm] = useState({
        title: '',
        image: '',
        topContent: '',
        midContent: '',
        bottomContent: '',
        category: '',
        subcategory: '',
        _id:''
    });
    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(true);
    const [password, setPassword] = useState('');

    const loadBlogs = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/v1/blogs');
            setBlogs(response.data);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        loadBlogs();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleCKEditorChange = (name, event, editor) => {
        const data = editor.getData();
        setForm({ ...form, [name]: data });
    };

    const handleFileChange = (e) => {
        setForm({ ...form, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        setLoading(true);
        try {
            const formData = new FormData();
            Object.keys(form).forEach(key => {
                formData.append(key, form[key]);
            });

            console.log(formData)

            if (editing) {
                await axios.put(`/api/v1/blogs/${form._id}`, formData);
            } else {
                await axios.post('/api/v1/blogs', formData);
            }

            
            setForm({
                title: '',
                image: '',
                topContent: '',
                midContent: '',
                bottomContent: '',
                category: '',
                subcategory: '',
                _id:''
            });
            setEditing(false);
            loadBlogs();
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    const handleEdit = (blog) => {
      console.log("inside handle edit......",blog)
      setForm({
        title: blog.title,
        image: '',
        topContent: blog.topContent,
        midContent: blog.midContent,
        bottomContent: blog.bottomContent,
        category: blog.category,
        subcategory: blog.subcategory,
        _id: blog._id
      });
      console.log("inside handle edit state data", form)
      setEditing(true);
    };

    const handleDelete = async (id) => {
        setLoading(true);
        try {
            await axios.delete(`/api/v1/blogs/${id}`);
            loadBlogs();
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (password === 'admin123') {
            setShowPasswordModal(false);
        } else {
            alert('Incorrect password');
        }
    };

    return (
        <div className="container mt-5">
            <Modal show={showPasswordModal} onHide={() => { }}>
                <Modal.Header>
                    <Modal.Title>Enter Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handlePasswordSubmit}>
                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <br/>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <h1 className="text-center">Admin Page</h1>
            {loading && <Spinner animation="border" />}
            <Form onSubmit={handleSubmit} className="mt-4">
                <Form.Group controlId="formTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formImage">
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                        type="file"
                        name="image"
                        onChange={handleFileChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formTopContent">
                    <Form.Label>Top Content</Form.Label>
                    <CKEditor
                        editor={ClassicEditor}
                        data={form.topContent}
                        onChange={(event, editor) => handleCKEditorChange('topContent', event, editor)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formMidContent">
                    <Form.Label>Mid Content</Form.Label>
                    <CKEditor
                        editor={ClassicEditor}
                        data={form.midContent}
                        onChange={(event, editor) => handleCKEditorChange('midContent', event, editor)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formBottomContent">
                    <Form.Label>Bottom Content</Form.Label>
                    <CKEditor
                        editor={ClassicEditor}
                        data={form.bottomContent}
                        onChange={(event, editor) => handleCKEditorChange('bottomContent', event, editor)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formCategory">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        type="text"
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formSubcategory">
                    <Form.Label>Subcategory</Form.Label>
                    <Form.Control
                        type="text"
                        name="subcategory"
                        value={form.subcategory}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-3">
                    {editing ? 'Update' : 'Create'} Blog
                </Button>
            </Form>

            <hr />

            <h2 className="text-center">Blogs</h2>
            <div className="row">
                {blogs.map((blog) => (
                  
                    <div className="col-md-4" key={blog._id}>
                        <div className="card mb-4">
                            <img src={blog.image} height={300} style={{objectFit:'contain'}} className="card-img-top" alt={blog.title} />
                            <div className="card-body">
                                <h5 className="card-title">{blog.title}</h5>
                                <p className="card-text">{blog.category}</p>
                                <Button variant="secondary" onClick={() => handleEdit(blog)}>
                                    Edit
                                </Button>
                                <Button variant="danger" onClick={() => handleDelete(blog._id)} className="ms-4">
                                    Delete
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Admin;
