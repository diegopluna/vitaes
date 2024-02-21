import { CVProps } from "@/types/cv-types";
import { encode } from 'urlencode';
import puppeteer from "puppeteer-core";
import chromium from '@sparticuz/chromium'

export async function POST(request: Request): Promise<Response> {
    const data = await request.json() as CVProps
    const cvData = encode(JSON.stringify(data))
    console.log(cvData)
    chromium.setGraphicsMode = false
    const browser = await puppeteer.launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath(),
            headless: chromium.headless === true ? 'shell': true,
        }) 

    
    const page = await browser.newPage()

    //TODO: change the url to the actual url of the cv_only page
    if (process.env.NODE_ENV === 'development') {
        await page.goto(`http://localhost:3000/cv_only/${cvData}`)
    } else {
        await page.goto(`https://easycv-jet.vercel.app/cv_only/${cvData}`)
    }
    // await page.goto(`http://localhost:3000/cv_only/${cvData}`)
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