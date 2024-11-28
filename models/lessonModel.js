// Define the collection name for interacting with the database
const collectionName = 'lessons';

// Function to retrieve all lessons from the database
const getAllLessons = async () => {
    // Use the global database connection to fetch all documents in the 'lessons' collection
    return await global.db.collection(collectionName).find().toArray();
};

// Function to update a specific lesson in the database
const updateLesson = async (id, updateData) => {
    // Perform an update operation in the 'lessons' collection
    return await global.db
        .collection(collectionName)
        .updateOne(
            { _id: id }, // Filter to find the document by its ID
            { $set: updateData } // Update the document with the provided data
        );
};

// Function to search for lessons based on a search term, sorting, and ordering
const searchLessons = async (searchTerm, sortBy = "name", order = "asc") => {
    const sortOrder = order === "desc" ? -1 : 1; // Determine the sorting order (ascending or descending)
    const numericSearchTerm = parseFloat(searchTerm); // Try to parse the search term as a number

    // Build the search query
    const query = {};
    if (searchTerm && searchTerm.trim()) {
        // Use a logical OR to search in multiple fields (e.g., name, location)
        query.$or = [
            { name: { $regex: searchTerm, $options: "i" } }, // Case-insensitive match for 'name'
            { location: { $regex: searchTerm, $options: "i" } }, // Case-insensitive match for 'location'
        ];

        // If the search term is numeric, include exact matches for numeric fields
        if (!isNaN(numericSearchTerm)) {
            query.$or.push(
                { price: numericSearchTerm }, // Match numeric 'price'
                { seats: numericSearchTerm } // Match numeric 'seats'
            );
        }
    }

    try {
        // Perform the query, apply sorting, and convert results to an array
        return await global.db
            .collection(collectionName)
            .find(query)
            .sort({ [sortBy]: sortOrder }) // Sort results by the specified field and order
            .toArray();
    } catch (error) {
        // Log any errors that occur during the search operation
        console.error("Error searching lessons:", error);
        throw error; // Re-throw the error to be handled by the calling function
    }
};

// Export the functions to make them available for use in other parts of the application
module.exports = { getAllLessons, updateLesson, searchLessons };
