import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
    try {
        // we donot have authentication i.e "user_id" in our project so we here use "my-limit-key"
        const {success} = await ratelimit.limit("my-limit-key");

        if(!success) return res.status(429).json({message: "Too many requests"});

        next();
    } catch (error) {
        console.log("Error in rate limiting", error);
        next(error);
    }
}

export default rateLimiter