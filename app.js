import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { User } from "./UserData/User.js"; 

mongoose.connect("mongodb://127.0.0.1:27017/UserInfo2")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ Connection Error:", err));

  const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/user/signup", async (req, res) => {
  try {
    const users = await User.find({}); 
    res.render("User", { message: null, users });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post("/user/signup", async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    // Check if email or username already exists
    const existingUser = await User.findOne({ $or: [{ email }, { userName }] });
    if (existingUser) {
      return res.send(`
        <h2>User or Email already exists. Please login.</h2>
        <a href="/user/login"><button>Go to Login</button></a>
      `);
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ userName, email, password: hashedPassword });
    await newUser.save();

    // Send friendly message with button to login
    res.send(`
      <h2>Welcome back ${newUser.userName}! You have signed up successfully.</h2>
      <p>You can now login to our app.</p>
      <a href="/user/login"><button>Go to Login</button></a>
    `);

  } catch (err) {
    res.status(500).send(err.message);
  }
});



app.get("/user/login",(req,res)=>{
    res.render("Login.ejs",{message : "Welcome to the Login Page"});
})

app.post("/user/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.send("Please enter a valid email!");
    }

   
    const match = await bcrypt.compare(password, existingUser.password);
    if (!match) {
      return res.send("Incorrect password. Try again!");
    }

    res.send(`Login successful! Welcome, ${existingUser.userName}`);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(8080, () => console.log("🚀 Server running on http://localhost:8080"));
