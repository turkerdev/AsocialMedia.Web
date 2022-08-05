import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";
import { z } from "zod";
import { environment } from "../utils/environment";

export function GenerateGoogleClient() {
  return new google.auth.OAuth2({
    clientId: environment.GOOGLE_CLIENT_ID,
    clientSecret: environment.GOOGLE_CLIENT_SECRET,
    redirectUri: environment.GOOGLE_REDIRECT_URI,
  });
}

export function GenerateGoogleUrl(auth: OAuth2Client) {
  return auth.generateAuthUrl({
    scope: [
      "https://www.googleapis.com/auth/youtube.upload",
      "https://www.googleapis.com/auth/youtube",
    ],
    access_type: "offline",
    prompt: "consent",
  });
}

export async function ExchangeGoogleCode(auth: OAuth2Client, code: string) {
  const { tokens: data } = await auth.getToken(code);

  const schema = z.object({
    access_token: z.string(),
    refresh_token: z.string(),
  });

  return await schema.parseAsync(data);
}
