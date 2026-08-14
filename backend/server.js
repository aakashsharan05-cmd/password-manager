require("dotenv").config();

const app = require("./src/app");
const conn = require("./src/db/db");

const PORT = 3000;

async function startServer() {
    try {
        await conn();

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Database connection failed:", error);
    }
}

startServer();