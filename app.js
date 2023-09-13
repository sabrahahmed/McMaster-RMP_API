const ratings = require('@mtucourses/rate-my-professors').default;
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

const MCMASTER_ID = "U2Nob29sLTE0NDA=";

async function getProf(name) {
    try {
        const professors = await ratings.searchTeacher(name, MCMASTER_ID);
        if (!professors || professors.length === 0) {
            return 'N/A'; 
        }
        const prof = await ratings.getTeacher(professors[0].id);
        return prof;
    } catch (error) {
        console.error('An error occurred:', error);
        throw error;
    }
}

app.use(express.json());

app.use(cors());

// Get prof rating 
app.get('/api/getProf/:name', async (req, res) => {
    const { name } = req.params;
    try {
        const prof = await getProf(name);
        res.json({ prof });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
