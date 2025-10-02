import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
    try {
        //here we just use a static key, but in real world we can use user ID or IP address
        const {success} = await ratelimit.limit("my-rate-limit")

        if (!success) {
            return res.status(429).json({
                message: "Too many requests, please try again later."
            });
        }

        next();
    } catch (error) {
        console.error("Rate limiting error:", error);
        next(error);
    }
};

export default rateLimiter;