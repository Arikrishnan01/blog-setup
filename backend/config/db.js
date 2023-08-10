import mongoose from "mongoose";
import  colors  from "colors";

export const connectDB =async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);

        console.log(`MongoDB Connected`.underline.italic.blue);
    }
    catch (error) {
        console.log(`Error: ${error.message}`.red.bold);
        process.exit();
    }
};

// module.exports = connectDB;
// , {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }