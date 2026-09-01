import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();
const app = express();

//middleware
app.use(cors({
    // donot write http://localhost:5173/, last wala slash error dega
    origin: "http://localhost:5173",
})) // origin hamesha ratelimiter se phle rkhna cuz rateLimiter response bhejega and cors defined nhi hoga then error ayega isiliye
app.use(express.json    ()); //to get access to req.body
app.use(rateLimiter);

// app.use(cors()) -> to accept from every single url, but for our case it's defined in above

//more of custom middleware
// app.use((req, res, next) => {
    //     console.log(`Req method is ${req.method} and url is ${req.url}`);
    //     next();
    // });
    
    const PORT = process.env.PORT || 5001;
    
    app.use("/api/notes", notesRoutes);

// Once database is connected then only start to listen
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server running in port:", PORT);
    });
});

