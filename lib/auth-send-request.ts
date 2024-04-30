import VitaesMagicLink from "@/emails/magic-link";
import { Resend } from "resend";

interface SendVerificationRequestParams {
  identifier: string;
  url: string;
  provider: {
    server: string;
    from: string;
  };
}

export const sendVerification = async (
  params: SendVerificationRequestParams
) => {
  let {
    identifier: email,
    url,
    provider: { server, from },
  } = params;
  try {
    const resend = new Resend(process.env.AUTH_RESEND_KEY)!;
    await resend.emails.send({
      from: from,
      to: email,
      subject: `Sign in to Vitaes`,
      react: VitaesMagicLink({ url, host: "Vitaes" }),
    });
  } catch (error) {
    console.error(error);
  }
};

// export async function sendVerificationRequest(params: any) {
//   const { identifier: to, provider, url, theme } = params;
//   const { host } = new URL(url);
//   const res = await fetch("https://api.resend.com/emails", {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${provider.apiKey}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       from: provider.from,
//       to,
//       subject: `Sign in to ${host}`,
//       text: text({ url, host }),
//       html: VitaesMagicLink({ url, host }),
//     }),
//   });

//   if (!res.ok)
//     throw new Error("Resend error: " + JSON.stringify(await res.json()));
// }

// function text({ url, host }: { url: string; host: string }) {
//   return `Sign in to ${host}\n${url}\n\n`;
// }
