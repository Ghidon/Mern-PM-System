import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserContent from "../models/userContent.js";
import GoogleUserContent from "../models/googleUserContent.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await UserContent.findOne({ email });

    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist." });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials." });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "something went wrong." });
  }
};

export const signup = async (req, res) => {
  const { firstName, lastName, password, email, confirmPassword } = req.body;

  try {
    const existingUser = await UserContent.findOne({ email });

    if (existingUser)
      return res.status(400).json({ message: "User already exists." });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords don't match." });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserContent.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });
    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    });
    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "something went wrong." });
  }
};

export const googleSignup = async (req, res) => {
  const profile = req.body;

  const newUser = {
    _id: profile.googleId,
    name: profile.name,
    firstName: profile.givenName,
    lastName: profile.familyName,
    avatar: profile.imageUrl,
    email: profile.email,
  };

  try {
    let user = await GoogleUserContent.findOne({ googleId: profile.googleId });

    if (user) {
      return res.status(400).json({ message: "User already exists." });
    } else {
      await GoogleUserContent.create(newUser);
      res.status(200).json({ message: "User created." });
    }
  } catch (error) {
    res.status(500).json({ message: "something went wrong." });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await UserContent.find();
    const googleUsers = await GoogleUserContent.find();

    googleUsers.map((user) => users.push(user));

    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { id: _id } = req.params;
  const user = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No User with that id");

  const updatedUser = await UserContent.findByIdAndUpdate(
    _id,
    { ...user, _id },
    {
      new: true,
    }
  );

  res.json(updatedUser);
};

export const getUser = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No User with that id");
  try {
    const getUser = await UserContent.findById(_id);

    res.status(200).json(getUser);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
