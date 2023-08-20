const fs = require("node:fs");

const MIME_TYPE = {
  html: "text/html",
  ico: "image/vnd.microsoft.icon",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  gif: "image/gif",
  pdf: "application/pdf",
  css: "text/css",
  js: "text/javascript",
  json: "application/json"
};

const getContentHeaders = (extensionType) => ({ "Content-Type": MIME_TYPE[extensionType] });

const HEADERS = {
  html: getContentHeaders("html"),
  ico: getContentHeaders("ico"),
  jpg: getContentHeaders("jpg"),
  jpeg: getContentHeaders("jpeg"),
  gif: getContentHeaders("gif"),
  css: getContentHeaders("css"),
  js: getContentHeaders("js"),
  json: getContentHeaders("json"),
  pdf: { ...getContentHeaders("pdf"), "Content-Disposition": "attachment" }
};

const getHeaders = (filepath) => {
  const extension = filepath.split(".").at(-1);
  return HEADERS[extension];
};


const serveFile = (filepath, response) => {
  fs.readFile(filepath, (error, body) => {
    if (error) {
      response.statusCode = 404;
      response.end("Not Found");
      return;
    };

    response.writeHead(200, getHeaders(filepath));
    response.end(body);
  });
};

const defaultHandler = (request, response) => {
  const path = "." + request.url;
  serveFile(path, response);
};

const serveHomePage = (request, response) => {
  const { config: { PATHS } } = request.context;
  serveFile(PATHS.HOME_PAGE, response);
};

const setupRoutes = (router) => {
  router.fallback(defaultHandler);
  router.route("/", "GET", serveHomePage);

};

module.exports = { setupRoutes };