import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    const post = await response.json();
    return NextResponse.json(post);
}

//localhost:3000/api/blog