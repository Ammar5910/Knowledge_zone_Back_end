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

    try {
        return await global.db
            .collection(collectionName)
            .find({
                $or: [
                    { name: { $regex: searchTerm, $options: "i" } },
                    { location: { $regex: searchTerm, $options: "i" } },
                    { price: isNaN(numericSearchTerm) ? undefined : numericSearchTerm }, // Exact match for price
                    { seats: isNaN(numericSearchTerm) ? undefined : numericSearchTerm }, // Exact match for seats
                ],
            })
            .sort({ [sortBy]: sortOrder })
            .toArray();
    } catch (error) {
        console.error("Error searching lessons:", error);
        throw error;
    }
};

module.exports = { getAllLessons, updateLesson, searchLessons };
