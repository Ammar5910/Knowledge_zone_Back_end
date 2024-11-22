const collectionName = 'classes';

const getAllLessons = async () => {
    return await global.db.collection(collectionName).find().toArray();
};

const updateLesson = async (id, updateData) => {
    return await global.db
        .collection(collectionName)
        .updateOne({ _id: id }, { $set: updateData });
};

module.exports = { getAllLessons, updateLesson };
