const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const mongoURI = process.env.MONGO_URL || "mongodb://localhost:27017";

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");

    const Schema = mongoose.Schema;
    const userSchema = new Schema({
      name: String,
      email: String,
    });

    const User = mongoose.model("User", userSchema);

    app.post("/users", (req, res) => {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
      });

      newUser
        .save()
        .then((user) => res.json(user))
        .catch((err) => console.log(err));
    });
  })
  .catch((err) => console.log(err));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
