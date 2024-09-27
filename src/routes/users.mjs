import { Router } from "express";
import { createUserValidationSchema } from "../utils/validationSchema.mjs";

import { checkSchema, matchedData, validationResult } from "express-validator";
import { hashPassword } from "../utils/helpers.mjs";
import User from '../models/users.mjs';

const router = Router();

router.post(
  "/api/users",
  checkSchema(createUserValidationSchema),
  async (req, res) => {
    const result= validationResult(req);
    if(!result.isEmpty())
        return res.status(400).send(result.array());

    const data=matchedData(req);
    
    data.password=hashPassword(data.password);

    const newUser=new User(data);
    await newUser.save();
    
    return res.status(201).send(newUser);

  }
);
router.get('/api/users', (req,res) => {
    console.log(req.session.id);
    req.sessionStore.get(req.session.id, (err,data) => {
        if(err)
            console.log(err);
        console.log("Session Store");
        console.log(data);
    })
    res.sendStatus(200);
})


export default router;