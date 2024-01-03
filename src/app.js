const express = require("express");
const urlRouter = require("./url/url.router");
const usesRouter = require("./uses/uses.router");

const app = express();

app.use(express.json());
app.use("/urls", urlRouter)
app.use("/uses", usesRouter)

app.use((req, res, next) => {
    return next({ status: 404, message: `Not found: ${req.originalUrl}` });
});

app.use((err, req, res, next) => {
    const { status = 500, message = "Something went wrong!" } = err;
    res.status(status).json({ error: message });
})

// TODO: Add code to meet the requirements and make the tests pass.

module.exports = app;
