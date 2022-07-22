import { TShortsRequestSchema } from "../../schema/shortsRequest";
import { findChannelById_YT } from "../../utils/db";
import { TShortsSchema } from "./schema";

type RequestChannels_YT = TShortsRequestSchema["destination"]["youtube"];
type RequestChannel_YT = RequestChannels_YT[number];

type Channels_YT = TShortsSchema["destination"]["youtube"];
type Channel_YT = Channels_YT[number];

type TPredicate = (c: RequestChannel_YT) => Promise<Channel_YT>;
const predicate: TPredicate = async ({ id }) => {
  const { access_token, refresh_token } = await findChannelById_YT(id);
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

type TConvert = (c: TShortsRequestSchema) => Promise<TShortsSchema>;
export const shortsConvert: TConvert = async (data) => {
  const youtube = await getTokensById_YT(data.destination.youtube);
  return {
    asset: data.asset,
    destination: {
      youtube,
    },
  };
};
