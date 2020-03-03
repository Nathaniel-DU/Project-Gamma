require(`dotenv`).config();
const express = require(`express`);
const mongoose = require(`mongoose`);
const logger = require(`morgan`);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger(`dev`));

//Routes
const indexRouter = require(`./routes/index`);
app.use(`/`, indexRouter);

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    app.listen(PORT, () => {
        console.log(`Listening on http://localhost:${PORT}/`);
    });
}).catch(err => {
    if(err) {throw err;}
});
module.exports = app;