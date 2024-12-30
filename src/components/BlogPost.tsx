import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Post {
  id: number;
  title: string;
  content: string;
}


const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/posts/${id}`).then((response) => {
      setPost(response.data);
    });
  }, [id]);

  const handleDelete = () => {
    axios.delete(`http://localhost:5000/posts/${id}`).then(() => {
      navigate('/');
    });
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div>
      <h1 >{post.title}</h1>
      <p>{post.content}</p>
      <button onClick={handleDelete}>Delete</button>
      
    </div>
  );
};

export default BlogPost;
