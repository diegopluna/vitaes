import { CVProps } from "@/types/cv-types";
import { encode } from "urlencode";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

export async function POST(request: Request): Promise<Response> {
  const data = (await request.json()) as CVProps;
  const cvData = encode(JSON.stringify(data));
  chromium.setGraphicsMode = false;
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless === true ? "shell" : true,
  });

  const page = await browser.newPage();

  await page.goto(`${process.env.APP_URL}/cv_only/${cvData}`);

  await page.emulateMediaType("screen");
  const pdfBuffer = await page.pdf({
    format: "A4",
    margin: { top: "0.8cm", bottom: "1.8cm" },
  });
  await browser.close();
  return new Response(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${data.header.firstName}-EasyCV.pdf"`,
    },
  });
}
