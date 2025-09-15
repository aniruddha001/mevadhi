export default async function handler(req, res) {
    try {
        const { categories } = req.query;

        // if categories is undefined → fetch all posts
        const wpUrl = categories
            ? `https://www.mahitiinmarathi.in/staging/wp-json/wp/v2/posts?categories=${categories}&_embed`
            : `https://www.mahitiinmarathi.in/staging/wp-json/wp/v2/posts?_embed`;

        const response = await fetch(wpUrl);

        if (!response.ok) {
            const text = await response.text();
            return res.status(response.status).json({ error: text });
        }

        const blogPosts = await response.json();
        res.status(200).json({ blogPosts: Array.isArray(blogPosts) ? blogPosts : [] });
    } catch (err) {
        res.status(500).json({ blogPosts: [], error: err.message });
    }
}
