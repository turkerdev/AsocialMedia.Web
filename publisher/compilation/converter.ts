// import { TShortsRequestSchema } from "../../schema/shortsRequest";
// import { DbService } from "../../services/db";
// import { TShortsSchema } from "./schema";

import { TCompilationRequestSchema } from "../../schema/compilationRequest";
import { DbService } from "../../services/db";
import { TCompilationSchema } from "./schema";

type RequestChannels_YT = TCompilationRequestSchema["destination"]["youtube"];
type RequestChannel_YT = RequestChannels_YT[number];

type Channels_YT = TCompilationSchema["destination"]["youtube"];
type Channel_YT = Channels_YT[number];

type TPredicate = (c: RequestChannel_YT) => Promise<Channel_YT>;
const predicate: TPredicate = async ({ id }) => {
  const { access_token, refresh_token } =
    await DbService.findYoutubeChannelById(id);
  return {
    access_token,
    refresh_token,
  };
};

type TGetTokensById = (c: RequestChannels_YT) => Promise<Channels_YT>;
const getTokensById_YT: TGetTokensById = async (channels) => {
  const mapper = channels.map(predicate);
  const promise = Promise.all(mapper);
  const data = await promise;
  return data;
};

type TConvert = (c: TCompilationRequestSchema) => Promise<TCompilationSchema>;
export const compilationConvert: TConvert = async (data) => {
  const youtube = await getTokensById_YT(data.destination.youtube);
  return {
    assets: data.assets,
    destination: {
      youtube,
    },
  };
};
