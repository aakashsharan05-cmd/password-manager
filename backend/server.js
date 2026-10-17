require("dotenv").config();
const app = require("./src/app");

const conn = require("./src/db/db");

const PORT = process.env.PORT || 5000;

async function startServer() {
    try {
        await conn();

        app.listen(PORT, "0.0.0.0", () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Server startup error:", error);
    }
}

startServer();