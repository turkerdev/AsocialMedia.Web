import { TBasicSchema } from "../../publisher/basic/schema";
import { TBasicRequestSchema } from "../../schema/basicRequest";
import { DbService } from "../../services/db";

type RequestChannels_YT = TBasicRequestSchema["destination"]["youtube"];
type RequestChannel_YT = RequestChannels_YT[number];

type Channels_YT = TBasicSchema["destination"]["youtube"];
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

type TConvert = (c: TBasicRequestSchema) => Promise<TBasicSchema>;
export const basicConvert: TConvert = async (data) => {
  const youtube = await getTokensById_YT(data.destination.youtube);
  return {
    asset: data.asset,
    destination: {
      youtube,
    },
  };
};
