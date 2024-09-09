// backend/api/index.js
const express = require("express");
const { Courses } = require("../db");
const zod = require("zod");

const courseRouter = express.Router();

courseRouter.get("/allCourses", async (req, res) => {
  try {
    const courses = await Courses.find();

    if (!courses || courses.length === 0) {
      return res.status(404).json({ message: "No courses found" });
    }

    return res.status(200).json({ courses });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

courseRouter.get("/courses/topic/:topic", async (req, res) => {
  const { topic } = req.params;

  try {
    const courses = await Courses.find({
      topics: { $elemMatch: { topic: topic } },
    });

    if (!courses || courses.length === 0) {
      return res
        .status(404)
        .json({ message: `No courses found for the topic: ${topic}` });
    }

    return res.status(200).json({ courses });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

module.exports = courseRouter;
