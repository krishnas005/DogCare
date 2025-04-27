import mongoose from 'mongoose';

const connect = async () => {
    if (mongoose.connections[0].readyState) {
        console.log("Already connected");
        return;
    }
    mongoose.set('strictQuery', true);
    await mongoose.connect("mongodb+srv://krishnas05:krishnas005@cluster9.fayoinr.mongodb.net/", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    }).then(() => {
        console.log('Database connected');
    }).catch((err) => {
        console.error('Database connection error:', err);
        throw err;
    });
};

export default connect;
