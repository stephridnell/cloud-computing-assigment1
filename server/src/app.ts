import express, { Application, Request, Response } from "express";

const app: Application = express();

const port: number = 8081;

app.get("/", (req: Request, res: Response) => {
  res.send({ hello: "there" });
});

app.listen(port, function () {
  console.log(`Listening on port ${port} !`);
});
