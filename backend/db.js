const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    "mongodb+srv://pushkar1713:cUHs92AswtTclzXK@cluster0.w6lkxlt.mongodb.net/hackarcode"
  );
  console.log("connnected to database sucessfuly");
}

const topicSchema = new mongoose.Schema({
  topic: {
    type: String,
  },
});

const userCourseSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  course_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  liked: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ["completed", "plan to watch", "watching"],
    required: true,
    default: "plan to watch",
  },
});

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    maxLength: 100,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 5,
    maxLength: 30,
  },
});

const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
  },
  _id: {
    type: Number,
    required: true,
  },
  courseDesc: {
    type: String,
    required: true,
  },
  courseProvider: {
    type: String,
    required: true,
  },
  coursePlatform: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
    default: () => Math.floor(Math.random() * 5) + 1,
  },

  topics: [topicSchema],
});

const User = mongoose.model("User", userSchema);
const Courses = mongoose.model("Course", courseSchema);
const UserCourse = mongoose.model("UserCourse", userCourseSchema);
const topics = mongoose.model("topics", topicSchema);

module.exports = {
  User,
  Courses,
  UserCourse,
};
