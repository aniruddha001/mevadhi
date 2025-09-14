export default async function pageshandler(req, res) {
    try {
        const response = await fetch('https://www.mahitiinmarathi.in/staging/wp-json/wp/v2/posts?_embed');
        const blogPosts = await response.json();

        res.status(200).json({ blogPosts });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch menus' });
    }
}
