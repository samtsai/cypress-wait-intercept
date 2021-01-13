const fs = require("fs");
const Koa = require("koa");
const Router = require("@koa/router");
const multer = require("@koa/multer");
const bodyParser = require("koa-bodyparser");

const app = new Koa();
const router = new Router();
const upload = multer();

router.get("/", async (ctx) => {
  ctx.set("Content-Type", "text/html; charset=utf-8");
  ctx.body = fs.readFileSync("index.html");
});

router.post("/api", upload.single("form"), (ctx) => {
  ctx.body = { name: ctx.request.body.callerName };
});

app.use(bodyParser()).use(router.routes()).use(router.allowedMethods());

app.listen(3000);
