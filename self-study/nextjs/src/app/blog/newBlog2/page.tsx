'use client'

import { useState, useEffect } from 'react';

export default function NewBlog2() {
    const [count, setCount] = useState(0);
    const [input, setInput] = useState('');
    const [post, setPost] = useState<{ title: string, body: string } | null>(null);
    
    useEffect(() => {
        console.log('count', count);
    }, [count]);

    // 示例：获取文章数据
    const fetchPost = async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
            const data = await response.json();
            setPost(data);
        } catch (error) {
            console.error('Failed to fetch post:', error);
        }
    };

    return (
        <div>
            <h1>New Blog2 Page</h1>
            
            <h2>Counter Section</h2>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
            
            <h2>Input Section</h2>
            <label htmlFor="text-input">Enter text:</label>
            <input 
                id="text-input"
                type="text" 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                placeholder="Type something..."
            />
            <p>Input: {input}</p>
            
            <h2>Post Section</h2>
            <button onClick={fetchPost}>Fetch Post</button>
            {post ? (
                <div>
                    <div><strong>Title:</strong> {post.title}</div>
                    <div><strong>Body:</strong> {post.body}</div>
                </div>
            ) : (
                <p>No post loaded. Click &quot;Fetch Post&quot; to load data.</p>
            )}
        </div>
    );
}