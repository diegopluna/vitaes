import { createRouteHandler } from "uploadthing/next";

import { vitaesFileRouter } from "./core";

export const { GET, POST } = createRouteHandler({
  router: vitaesFileRouter,
});
