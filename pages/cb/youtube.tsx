import { GetServerSideProps, NextPage } from "next";
import { z } from "zod";
import { DbService } from "../../services/db";
import { GoogleService } from "../../services/google";
import { YouTubeService } from "../../services/youtube";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const schema = z.object({ code: z.string() });
  const { code } = await schema.parseAsync(query);

  const { access_token, refresh_token } = await GoogleService.exchangeCode(
    code
  );

  const auth = GoogleService.generateClient();
  auth.setCredentials({ access_token, refresh_token });

  const { id } = await YouTubeService.getChannelData(auth);

  await DbService.upsertYoutubeChannel(id, access_token, refresh_token);

  return { redirect: { destination: "/", permanent: false } };
};

const CallbackYT: NextPage = () => {
  return <>Redirecting...</>;
};

export default CallbackYT;
