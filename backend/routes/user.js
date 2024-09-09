// backend/api/index.js
const express = require("express");
const { User, UserCourse, Courses } = require("../db");
const zod = require("zod");

const user = express.Router();

const signupBody = zod.object({
  email: zod.string().email(),
  username: zod.string(),
  password: zod.string(),
});

user.post("/user/signup", async (req, res) => {
  const obj = signupBody.safeParse(req.body);
  if (!obj.success) {
    return res.status(411).json({
      msg: "incorrect inputs",
    });
  }

  const existingUser = await User.findOne({
    username: req.body.username,
  });

  if (existingUser) {
    return res.status(411).json({
      msg: "the email is already taken",
    });
  }

  const newUser = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  res.json({
    msg: "user created successfully",
  });
});

const signinBody = zod.object({
  username: zod.string(),
  password: zod.string(),
});

user.post("/user/signin", async (req, res) => {
  const obj = signinBody.safeParse(req.body);
  if (!obj.success) {
    return res.status(411).json({
      msg: "incorrect inputs",
    });
  }

  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  if (user) {
    res.json({
      username: user.username,
      msg: "signin successful",
    });

    return;
  }
  res.status(411).json({
    msg: "error while logging in",
  });
});

user.post("/user/addCourse", async (req, res) => {
  try {
    const userId = req.body.user_id;
    const courseId = req.body.course_id;
    let course = await Courses.findOne({
      _id: courseId,
    });
    const response = await UserCourse.create({
      user_id: userId,
      course_id: courseId,
    });
    res.json({
      msg: "course added",
    });
  } catch (error) {
    res.status(500).json({ msg: "there is an error while adding the course" });
  }
});

user.get("/user/:userId/courses", async (req, res) => {
  const { userId } = req.params;

  try {
    const userCourses = await UserCourse.find({ user_id: userId });

    if (!userCourses || userCourses.length === 0) {
      return res
        .status(404)
        .json({ message: "No courses found for this user" });
    }

    const courseIds = userCourses.map((uc) => uc.course_id);

    const courses = await Courses.find({ _id: { $in: courseIds } });

    if (!courses || courses.length === 0) {
      return res
        .status(404)
        .json({ message: "No courses found in the course collection" });
    }

    return res.status(200).json({ courses });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

const userCourseSchema = zod.object({
  course_id: zod.string(),
  user_id: zod.string(),
  liked: zod.boolean().optional(),
  status: zod.enum(["completed", "plan to watch", "watching"]),
});

user.put("/user/updateCourse", async (req, res) => {
  try {
    const validatedData = userCourseSchema.parse(req.body);
    const { course_id, user_id, liked = false, status } = validatedData;
    let userCourse = await UserCourse.findOne({ user_id, course_id });
    userCourse.liked = liked;
    userCourse.status = status;
    await userCourse.save();
    return res
      .status(200)
      .json({ message: "User course updated successfully", userCourse });
  } catch (error) {
    if (error instanceof zod.ZodError) {
      return res
        .status(400)
        .json({ message: "Validation failed", errors: error.errors });
    }
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

module.exports = user;
