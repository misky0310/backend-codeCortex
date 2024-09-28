import { Router } from "express";
import { createUserValidationSchema } from "../utils/validationSchema.mjs";

import { checkSchema, matchedData, validationResult } from "express-validator";
import { hashPassword } from "../utils/helpers.mjs";
import User from "../models/users.mjs";
import Videodata from "../models/videoData.mjs";

const router = Router();

router.post(
  "/api/auth/signup",
  checkSchema(createUserValidationSchema),
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.status(400).send(result.array());

    const data = matchedData(req);

    data.password = hashPassword(data.password);

    const newUser = new User(data);
    await newUser.save();

    return res.status(201).send(newUser);
  }
);

router.post("/emotion/receive-emotion/audio", async (req, res) => {
  console.log(req.body);
  return res.status(200).send("Success");
});

router.post("/emotion/receive-emotion/face", async (req, res) => {
  console.log(req.body);
  return res.status(200).send("Success");
});

router.post("/api/user/capture", async (req, res) => {
  if (!req.user) {
    return res.status(401).send("Unauthorized");
  }

  const id = req.user._id;
  const { happy, sad, neutral } = req.body;

  const emotions = {
    happy: happy,
    sad: sad,
    neutral: neutral,
  };

  try {
    const updatedVid = await Videodata.findOneAndUpdate(
      { user: id },
      {
        $inc: {
          "emotions.happy": emotions.happy,
          "emotions.sad": emotions.sad,
          "emotions.neutral": emotions.neutral,
        },
      },
      {
        new: true,
        upsert: true,
      }
    );

    if (updatedVid.emotions.sad>=20) {
      return res.status(200).json({msg:'You seem to be sad. Would you like to talk to someone?'});
    }
    return res.status(200).send("Emotions updated");
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
});

router.get("/api/emotions", async (req, res) => {
  if (!req.user) {
    return res.status(401).send("Unauthorized");
  }

  const id = req.user._id;

  try {
    const foundUser = await Videodata.findOne({ user: id });
    const user = await User.findById(id);
    const username = user.username;

    const total =
      foundUser.emotions.happy +
      foundUser.emotions.sad +
      foundUser.emotions.neutral;

    const percentages = {
      happy: (foundUser.emotions.happy * 100) / total,
      sad: (foundUser.emotions.sad * 100) / total,
      neutral: (foundUser.emotions.neutral * 100) / total,
    };

    return res.status(200).json({
      username,
      emotions: foundUser.emotions,
      percentages,
      total,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error fetching emotions data");
  }
});

export default router;
