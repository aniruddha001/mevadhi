export default async function handler(req, res) {
    try {
        const response = await fetch('https://mahitiinmarathi.in/staging/wp-json/wp/v2/categories');

        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.status}`);
        }

        const categories = await response.json();

        const nonEmptyCategories = categories.filter(cat => cat.count > 0);

        res.status(200).json({ categories: nonEmptyCategories });
    } catch (err) {
        console.error('API error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
