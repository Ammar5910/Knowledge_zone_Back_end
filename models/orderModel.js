// Import ObjectId to work with MongoDB object IDs
const { ObjectId } = require("mongodb");

// Function to create an order
const createOrder = async (customer, lessons, paymentMethod) => {
    // Get references to the 'lessons' and 'orders' collections
    const lessonCollection = global.db.collection("lessons");
    const orderCollection = global.db.collection("orders");

    try {
        let totalValue = 0; // Variable to calculate the total value of the order

        // Validate each lesson and calculate the total order value
        for (const lesson of lessons) {
            // Find the lesson document by its ID
            const lessonData = await lessonCollection.findOne({ _id: new ObjectId(lesson.lessonId) });

            // If the lesson doesn't exist, throw an error
            if (!lessonData) {
                throw `Lesson with ID ${lesson.lessonId} not found`;
            }

            // If there aren't enough available seats, throw an error
            if (lessonData.seats < lesson.quantity) {
                throw `Not enough seats available for ${lessonData.name}`;
            }

            // Accumulate the total value (price * quantity for each lesson)
            totalValue += lessonData.price * lesson.quantity;
        }

        // Create the order document with customer details, lesson details, and total value
        const order = {
            customer, // Customer information
            lessons: lessons.map((lesson) => ({
                lessonId: new ObjectId(lesson.lessonId), // Lesson ID as an ObjectId
                name: lesson.name, // Name of the lesson
                price: lesson.price, // Price per lesson
                quantity: lesson.quantity // Quantity of lessons
            })),
            totalValue, // Total cost of the order
            paymentMethod, // Payment method (e.g., credit card, PayPal)
            orderDate: new Date() // Record the current date as the order date
        };

        // Insert the order document into the 'orders' collection
        await orderCollection.insertOne(order);

        // Update the availability of seats for each lesson in the 'lessons' collection
        for (const lesson of lessons) {
            await lessonCollection.updateOne(
                { _id: new ObjectId(lesson.lessonId) }, // Match the lesson by its ID
                { $inc: { seats: -lesson.quantity } } // Decrement the seats by the quantity purchased
            );
        }
    } catch (error) {
        // Log the error to the console and re-throw it for further handling
        console.error("Something went wrong:", error);
        throw error;
    }
};

// Export the createOrder function for use in other parts of the application
module.exports = { createOrder };
