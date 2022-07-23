import { google } from "googleapis";
import { z } from "zod";
import { environment } from "../utils/environment";

export class GoogleService {
  static generateClient() {
    const client = new google.auth.OAuth2({
      clientId: environment.GOOGLE_CLIENT_ID,
      clientSecret: environment.GOOGLE_CLIENT_SECRET,
      redirectUri: environment.GOOGLE_REDIRECT_URI,
    });

    return client;
  }

  static generateUrl() {
    const client = this.generateClient();
    const url = client.generateAuthUrl({
      scope: [
        "https://www.googleapis.com/auth/youtube.upload",
        "https://www.googleapis.com/auth/youtube",
      ],
      access_type: "offline",
    });

    return url;
  }

  static async exchangeCode(code: string) {
    const client = this.generateClient();
    const { tokens: data } = await client.getToken(code);

    const schema = z.object({
      access_token: z.string(),
      refresh_token: z.string(),
    });

    const tokens = await schema.parseAsync(data);
    return tokens;
  }
}
