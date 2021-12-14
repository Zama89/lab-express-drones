const express = require('express');
const router = express.Router();

const Drone = require("../models/Drone.model"); // require the Drone model here

router.get("/drones", (req, res, next) => {
  // Iteration #2: List the drones
  Drone.find()
  .then((returnedDrones) => {
    res.render("drones/list", {returnedDrones});
    console.log(returnedDrones);
  })
  .catch((error) => console.log("Error")); 
}); // ... your code here

router.get("/drones/create", (req, res, next) => {
  // Iteration #3: Add a new drone
  Drone.create()
  .then ((drone)=>{
    res.render("drones/create-form", {drone})
  })
  .catch(error => next(error)); 
}); // ... your code here

router.post("/drones/create", (req, res, next) => {
  // Iteration #3: Add a new drone
  const {name, propellers, maxSpeed} = req.body;
  Drone.create({name, propellers, maxSpeed})
  .then (()=>{
    res.redirect("/drones")
  })
  .catch(error => next(error));
}); // ... your code here


router.get("/drones/:id/edit", (req, res, next) => {
  // Iteration #4: Update the drone
  const {id} = req.params;
  
  Drone.findById(id)
  .then((droneUpdated)=>{
    res.render('drones/update-form.hbs', {drone:droneUpdated})
  })
  .catch(error => next(error));
});// ... your code here

router.post('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  const { id } = req.params;
  const { name, propellers, maxSpeed } = req.body;
  
  Drone.findByIdAndUpdate(id, { name, propellers, maxSpeed })
    .then(() => res.redirect("/drones"))
    .catch((error) => console.log("Error"));
});// ... your code here

router.post('/drones/:id/delete', (req, res, next) => {
  // Iteration #5: Delete the drone
  const {id} = req.params;
  Drone.findByIdAndDelete(id)
  .then(()=>{
    res.redirect('/drones')
  })
  .catch((error) => console.log("Error"));
});// ... your code here

module.exports = router;
