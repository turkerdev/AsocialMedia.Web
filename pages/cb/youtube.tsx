import { GetServerSideProps, NextPage } from "next";
import { z } from "zod";
import { UpsertYouTubeChannel } from "../../services/db";
import {
  ExchangeGoogleCode,
  GenerateGoogleClient,
} from "../../services/google";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const schema = z.object({ code: z.string() });
  const { code } = await schema.parseAsync(query);

  const { access_token, refresh_token } = await ExchangeGoogleCode(
    GenerateGoogleClient(),
    code
  );

  await UpsertYouTubeChannel(access_token, refresh_token);

  return { redirect: { destination: "/", permanent: false } };
};

const CallbackYT: NextPage = () => {
  return <>Redirecting...</>;
};

export default CallbackYT;
