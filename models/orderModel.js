const { ObjectId } = require("mongodb");

const createOrder = async (customer, lessons, paymentMethod) => {

    const lessonCollection = global.db.collection("classes");
    const orderCollection = global.db.collection("orders");

    try {
        let totalValue = 0;

        // Validate lessons and calculate total value
        for (const lesson of lessons) {
            const lessonData = await lessonCollection.findOne({ _id: new ObjectId(lesson.lessonId) });

            if (!lessonData) {
                throw `Lesson with ID ${lesson.lessonId} not found`;
            }

            if (lessonData.seats < lesson.quantity) {
                throw `Not enough seats available for ${lessonData.name}`;
            }

            totalValue += lessonData.price * lesson.quantity;
        }

        // Create the order document
        const order = {
            customer,
            lessons: lessons.map((lesson) => ({
                lessonId: new ObjectId(lesson.lessonId),
                name: lesson.name,
                price: lesson.price,
                quantity: lesson.quantity
            })),
            totalValue,
            paymentMethod,
            orderDate: new Date()
        };

        // Insert order into the database
        await orderCollection.insertOne(order);

        // Update lesson availability
        for (const lesson of lessons) {
            await lessonCollection.updateOne(
                { _id: new ObjectId(lesson.lessonId) },
                { $inc: { seats: -lesson.quantity } }
            );
        }
    } catch (error) {
        console.error("Something went wrong:", error);
        throw error;
    }
};

module.exports = { createOrder };
