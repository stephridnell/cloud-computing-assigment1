import express, { Application, Request, Response } from "express";
import { quickstart } from "./datastore";

const app: Application = express();

const port: number = 8081;

quickstart();

app.get("/", (req: Request, res: Response) => {
  res.send({ hello: "there" });
});

app.post("/register", (req: Request, res: Response) => {
  const { id, username, password } = req.body;
  if (!id || !username || !password) {
    res.status(400).json({ error: "Missing required field" });
  }

  // check if ID already exists in DB
  if (false) {
    res.status(400).json({ error: "The ID already exists" });
  }

  // check if username already exists in DB
  if (false) {
    res.status(400).json({ error: "The username already exists" });
  }

  // all good, store credentials in firestore

  // upload the image to cloud storage

  res.sendStatus(200);
});

app.post("/auth/login", (req: Request, res: Response) => {
  const { id, password } = req.body;
  if (!id || !password) {
    res.status(400).json({ error: "ID or password is invalid" });
  }
  // check if user with these credentials exists
  if (false) {
    res.status(400).json({ error: "ID or password is invalid" });
  }

  res
    .status(200)
    .json({ user: { id: "123", username: "123", profileImage: "123" } });
});

app.listen(port, function () {
  console.log(`Listening on port ${port} !`);
});
