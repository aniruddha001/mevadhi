// pages/api/menus.js

export default async function handler(req, res) {
    try {
        const response = await fetch('https://www.mahitiinmarathi.in/staging/wp-json/custom/v1/menus');
        const menus = await response.json();

        res.status(200).json({ menus }); // ✅ Send proper response
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch menus' });
    }
}
