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

router.post("/emotion/receive-emotion/audio", async(req, res) => { 
  console.log(req.body);
  return res.status(200).send("Success");
})

router.post("/emotion/receive-emotion/face", async(req, res) => {
  console.log(req.body);
  return res.status(200).send("Success");
})

router.post("/api/user/capture", async (req, res) => {
  const id = req.user._id;
  console.log("id", id);
  const { emotions } = req.body;

  try {
    const foundVid = await Videodata.findOne({ user: id });

    if (!foundVid) {
      const newVid = new Videodata({ user: id });
      newVid.emotions.push(emotions);
      await newVid.save();
      return res.status(201).send(newVid);
    } 

    else {
      foundVid.emotions.push(emotions);
      await foundVid.save();
      return res.status(200).send(foundVid);
    }
  }

  catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

export default router;
