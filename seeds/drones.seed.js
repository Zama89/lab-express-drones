// Iteration #1

const mongoose = require("mongoose");
const Drone = require("../models/Drone.model");

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://localhost/lab-express-drones";

const drones = [
  { name: "Creeper XL 500", propellers: 3, maxSpeed: 12 },
  { name: "Racer 57", propellers: 4, maxSpeed: 20 },
  { name: "Courier 3000i", propellers: 6, maxSpeed: 18 },
];

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log(`MongodB`);
  })
  .then(() => {
    Drone.insertedDrones(drones);
  })
  .then((insertedDrones) => {
    console.log(`New ${insertedDrones.length} drones into DB`);
  })
  .then(() => {
    mongoose.connection.close();
  })
  .catch((err) => console.log(`An error occurred while creating drones from the DB: ${err}`));
