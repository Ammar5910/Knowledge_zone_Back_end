const collectionName = 'classes';

const getAllLessons = async () => {
    return await global.db.collection(collectionName).find().toArray();
};

const updateLesson = async (id, updateData) => {
    return await global.db
        .collection(collectionName)
        .updateOne({ _id: id }, { $set: updateData });
};

const searchLessons = async (searchTerm, sortBy = "name", order = "asc") => {
    const sortOrder = order === "desc" ? -1 : 1; // Determine sort order
    const numericSearchTerm = parseFloat(searchTerm);

    // Build query based on searchTerm
    const query = {};
    if (searchTerm && searchTerm.trim()) {
        query.$or = [
            { name: { $regex: searchTerm, $options: "i" } },
            { location: { $regex: searchTerm, $options: "i" } },
        ];

        // Add numeric fields only if searchTerm is a number
        if (!isNaN(numericSearchTerm)) {
            query.$or.push(
                { price: numericSearchTerm }, // Exact match for price
                { seats: numericSearchTerm } // Exact match for seats
            );
        }
    }

    try {
        return await global.db
            .collection(collectionName)
            .find(query)
            .sort({ [sortBy]: sortOrder })
            .toArray();
    } catch (error) {
        console.error("Error searching lessons:", error);
        throw error;
    }
};

module.exports = { getAllLessons, updateLesson, searchLessons };
