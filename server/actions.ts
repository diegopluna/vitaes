"use server"

import { signIn, signOut } from "@/auth"
import { CVProps } from "@/types/cv-types"
import { encode } from "urlencode";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";


export const signInWithGithub = async () => {
    await signIn("github")
}

export const handleSignOut = async () => {
    await signOut()
}

export const generatePDF = async (cvData: CVProps) => {
    const cvEncodedData = encode(JSON.stringify(cvData))
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
        margin: { top: "0.8cm", bottom: "1.8cm", left: "1.4cm", right: "1.4cm" },
    });
    await browser.close();

    return new Response(pdfBuffer, {
        headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename="${cvData.header.firstName}-Vitaes.pdf"`,
        },
    });
}