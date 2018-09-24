const Router = require("koa-router");
const axios = require("axios");
const MemoryFs = require("memory-fs");
const webpack = require("webpack");
const VueServerRenderer = require("vue-server-renderer");
const path = require("path");
const fs = require("fs");

const serverRender = require("./server-render");
const serverConfig = require("../../build/webpack.config.server");

const serverComiler = webpack(serverConfig);
const mfs = new MemoryFs();

serverComiler.outputFileSystem = mfs; // 将输出的文件放入内存中

let bundle;
serverComiler.watch({}, (err, stats) => {
  if (err) throw err;
  stats = stats.toJson();
  stats.errors.forEach(err => console.log(err, '错误'));
  stats.warnings.forEach(message => console.log(message, '警告'));

  const bundlePath = path.join(
    serverConfig.output.path,
    "vue-ssr-server-bundle.json"
  );
  bundle = JSON.parse(mfs.readFileSync(bundlePath, "utf-8"));
  console.log("bundle build reset");
});

const handleSSR = async (ctx) => {
  if (!bundle) {
    ctx.body = "wating";
    return;
  }

  const clientManifestResp = await axios.get(
    "http://127.0.0.1:8080/public/vue-ssr-client-manifest.json"
  );

  const clientManifest = clientManifestResp.data;

  const template = fs.readFileSync(
    path.join(__dirname, "../server.template.ejs"),
    'utf-8'
  );

  const renderer = VueServerRenderer.createBundleRenderer(bundle, {
    inject: false,
    clientManifest
  });
  await serverRender(ctx, renderer, template);
};

const router = new Router();
router.get("*", handleSSR);

module.exports = router;
