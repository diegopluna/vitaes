import { CVProps } from "@/types/cv-types";
import { encode } from 'urlencode';
import puppeteer from "puppeteer";

export async function POST(request: Request): Promise<Response> {
    const data = await request.json() as CVProps
    console.log()
    const cvData = encode(JSON.stringify(data))
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    //TODO: change the url to the actual url of the cv_only page
    await page.goto(`http://localhost:3000/cv_only/${cvData}`)
    await page.emulateMediaType('screen')
    const pdfBuffer = await page.pdf({format: 'A4'})
    await browser.close()
    return new Response(pdfBuffer, {
        headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="${data.header.firstName}-EasyCV.pdf"`
        }
    })
}

