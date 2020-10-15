const express = require("express");
const nunjucks = require("nunjucks");
const logger = require("morgan");
const bodyParser = require("body-parser");

const admin = require("./routes/admin");
const contacts = require("./routes/contacts");

const app = express();
const port = 3000;

nunjucks.configure("template", {
  autoescape: true, // prevents executing html tags from users
  express: app,
});

// 미들웨어 셋팅
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("express start");
});

const vipMiddleware = (req, res, next) => {
  console.log("최우선 미들웨어");
  next();
};

app.use("/admin", vipMiddleware, admin);
app.use("/contacts", contacts);

app.listen(port, () => {
  console.log("Express listening on port", port);
});
