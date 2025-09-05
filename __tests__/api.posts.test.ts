import request from 'supertest';

describe('Posts API', () => {
    const apiUrl = 'http://localhost:3000/api/posts';

    it('GET /api/posts returns paginated posts', async () => {
        const res = await request(apiUrl).get('?page=1&limit=2');
        expect(res.status).toBe(200);
        if (res.status === 200) {
            expect(res.body).toHaveProperty('posts');
            expect(res.body).toHaveProperty('pagination');
            expect(Array.isArray(res.body.posts)).toBe(true);
            expect(res.body.pagination).toHaveProperty('currentPage', 1);
            expect(res.body.pagination).toHaveProperty('postsPerPage', 2);
        }
    });

    it('POST /api/posts creates a post', async () => {
        const postData = { title: 'Test', content: 'Test content', tags: ['test'] };
        const res = await request(apiUrl).post('').send(postData);
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('post');
        expect(res.body.post.title).toBe('Test');
    });

    it('PUT /api/posts updates a post', async () => {
        const postData = { title: 'Test', content: 'Test content', tags: ['test'] };
        const savedPost = await request(apiUrl).post('').send(postData);
        const postId = savedPost.body.post?._id;
        const updateData = { title: 'Updated Title' };
        const res = await request(apiUrl + `?id=${postId}`).put('').send(updateData);
        expect(res.status).toBe(200);
    });

    it('DELETE /api/posts deletes a post', async () => {
        const postData = { title: 'To Delete', content: 'Delete me', tags: ['delete'] };
        const savedPost = await request(apiUrl).post('').send(postData);
        const postId = savedPost.body.post?._id;
        const res = await request(apiUrl + `/${postId}`).delete('');
        expect(res.status).toBe(200);
    });
});
