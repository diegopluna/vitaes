import { CVProps } from "@/types/cv-types";
import { encode } from 'urlencode';
import puppeteer from "puppeteer";
import chromium from 'chrome-aws-lambda';
import playwright from 'playwright-core';

// export async function POST(request: Request): Promise<Response> {
//     const data = await request.json() as CVProps
//     console.log()
//     const cvData = encode(JSON.stringify(data))
//     const browser = await puppeteer.launch()
//     const page = await browser.newPage()

//     //TODO: change the url to the actual url of the cv_only page
//     if (process.env.NODE_ENV === 'development') {
//         await page.goto(`http://localhost:3000/cv_only/${cvData}`)
//     } else {
//         await page.goto(`https://easycv-jet.vercel.app/cv_only/${cvData}`)
//     }
//     // await page.goto(`http://localhost:3000/cv_only/${cvData}`)
//     await page.emulateMediaType('screen')
//     const pdfBuffer = await page.pdf({format: 'A4'})
//     await browser.close()
//     return new Response(pdfBuffer, {
//         headers: {
//             'Content-Type': 'application/pdf',
//             'Content-Disposition': `attachment; filename="${data.header.firstName}-EasyCV.pdf"`
//         }
//     })
// }

export async function POST(request: Request): Promise<Response> {
    try {
        const data = await request.json() as CVProps
        console.log()
        const cvData = encode(JSON.stringify(data))

        const browser = await playwright.chromium.launch({
            args: [...chromium.args, "--font-render-hinting=none"],
            executablePath:
                process.env.NODE_ENV === 'production'
                    ? await chromium.executablePath
                    : "/usr/local/bin/chromium",
                headless:
                process.env.NODE_ENV === 'production'
                    ? chromium.headless
                    : true,
        })
        const context = await browser.newContext()
        const page = await context.newPage()

        const pdfUrl = process.env.NODE_ENV === 'production'
        ? `https://easycv-jet.vercel.app/cv_only/${cvData}`
        : `http://localhost:3000/cv_only/${cvData}`

        await page.goto(pdfUrl, {
            waitUntil: 'load'
        })

        const pdf = await page.pdf({
            path: `/tmp/${data.header.firstName}-EasyCV.pdf`,
            printBackground: true,
            format: 'A4',
        })
        await browser.close()
        return new Response(pdf, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="${data.header.firstName}-EasyCV.pdf"`
            },
            status: 200
        })
    } catch (e) {
        console.error(e)
        return new Response('Internal Server Error',{
            status: 500
        })
    }
    
}

