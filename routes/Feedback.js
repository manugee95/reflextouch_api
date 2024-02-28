const express = require("express");
const { validateFeedback } = require("../validator");
const login_required = require("../middleware/auth")
const Feedback = require("../models/Feedback");
const multer = require("multer")
const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, "uploads/")
  },
  filename: function(req, file, cb){
    cb(null, file.originalname)
  }
})
const upload = multer({storage: storage})

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const feedback = await Feedback.find();
    res.send(feedback);
  } catch (err) {
    res.send("Error while Fetching Data");
  }
});

router.get("/:id", async(req, res)=>{
  try{
    const feedback = await Feedback.findById(req.params.id)
    if (!feedback) {
      return res.send("No feedback Found")
    }

    res.json(feedback)
  }catch(err){
    res.send(err)
  }
})

router.post("/", login_required, async (req, res) => {
  try {
    const { error } = validateFeedback(req.body);
    if (error) {
      return res.send(error.details[0].message);
    }

    let feedback = new Feedback({
      user: req.user._id,
      text: req.body.text,
      rating: req.body.rating,
    });

    feedback = await feedback.save();
    res.json(feedback);
  } catch (err) {
    res.send(err);
  }
});

router.put("/:id", login_required, async (req, res) => {
  try {
    const { error } = validateFeedback(req.body);
    if (error) {
      return res.send(error.details[0].message);
    }

    const feedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      {
        text: req.body.text,
        rating: req.body.rating,
      },
      { new: true }
    );

    if (!feedback) {
      return res.send("There's no feedback to update");
    }

    res.json(feedback);
  } catch (err) {
    res.send(err);
  }
});

router.delete("/:id", login_required, async(req, res)=>{
    try{
        const feedback = await Feedback.findByIdAndDelete(req.params.id)
        if (!feedback) {
            return res.send("No Feedback found")
        }

        res.json(feedback)
    }catch (err){
        res.send(err)
    }
})

module.exports = router;
