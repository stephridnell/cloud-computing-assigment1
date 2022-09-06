import express, { Application, Request, Response } from "express";
import { quickstart } from "./datastore";

const app: Application = express();

const port: number = 8081;

quickstart();

app.get("/", (req: Request, res: Response) => {
  res.send({ hello: "there" });
});

app.listen(port, function () {
  console.log(`Listening on port ${port} !`);
});
