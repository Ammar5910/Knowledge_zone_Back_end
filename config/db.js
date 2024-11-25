// Import the MongoClient class from the MongoDB driver
const { MongoClient } = require('mongodb');

// Define an asynchronous function to connect to MongoDB
const connectDB = async () => {
    try {
        // Create a new MongoClient instance using the connection string from environment variables
        const client = new MongoClient(process.env.MONGO_URI, {
            useNewUrlParser: true, // Use the new URL parser for MongoDB connection strings
            useUnifiedTopology: true, // Enables the new Unified Topology layer for better performance and reliability
        });

        // Attempt to establish a connection to the MongoDB server
        await client.connect();
        
        // Log a success message to the console
        console.log('Connected to MongoDB Atlas');

        // Make the database available globally by storing it in a global variable
        // 'knowledge_zone' is the name of the database to interact with
        global.db = client.db('knowledge_zone');
    } catch (error) {
        // Log an error message if the connection fails
        console.error('Error connecting to MongoDB:', error);

        // Exit the process with a failure code (1) to indicate the error
        process.exit(1);
    }
};

// Export the connectDB function to make it available for import in other files
module.exports = { connectDB };
