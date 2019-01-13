const fs = require('fs');
const path = require('path');
const Koa = require('koa');
const Router = require('koa-router');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const compress = require('koa-compress');
const serveStatic = require('koa-static');

const Datastore = require('./Datastore');

const db = new Datastore({ filename: path.join(__dirname, '..', 'datastore.json') });

const HTTP_PORT = process.env.PORT || 3000;

const app = new Koa();

app.use(cors());
app.use(compress({
  threshold: 4096,
}));
app.use(bodyParser());

const router = new Router();

router.get('/projects', async (ctx) => {
  const result = await db.getProjects();
  ctx.response.body = result;
});

router.post('/projects', async (ctx) => {
  const attrs = ctx.request.body;
  const result = await db.createProject(attrs);
  ctx.response.body = result;
});

const swSource = fs.readFileSync(path.join(__dirname, '..', 'dist', 'assets', 'sw.js'));
router.get('/sw.js', async (ctx) => {
  ctx.response.type = 'application/javascript';
  ctx.response.body = swSource;
});

app.use(router.routes());
app.use(router.allowedMethods());

app.use(serveStatic(path.join(__dirname, '..', 'dist')));

app.listen(HTTP_PORT);
