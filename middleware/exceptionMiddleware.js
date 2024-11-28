const exceptionMiddleware = (err, req, res, next) => {
    console.error(err.stack); // Log the error stack trace
    res.status(500).json({ error: "Something went wrong!" }); // Respond with a generic error message
}

module.exports = { exceptionMiddleware };