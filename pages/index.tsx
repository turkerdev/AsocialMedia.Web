import { GetStaticProps, NextPage } from "next";
import Image from "next/future/image";
import { DbService } from "../services/db";
import { GoogleService } from "../services/google";

type youtubeChannel = {
  id: string;
  platform_id: string;
  name: string | null;
  photo: string | null;
};

type Props = {
  youtubeUrl: string;
  youtubeChannels: youtubeChannel[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const youtubeUrl = GoogleService.generateUrl();
  const allYoutubeChannels = await DbService.getAllYoutubeChannels();

  return {
    props: {
      youtubeUrl,
      youtubeChannels: allYoutubeChannels.map((channel) => ({
        id: channel.id,
        platform_id: channel.platform_id,
        name: channel.name,
        photo: channel.image,
      })),
    },
  };
};

const Home: NextPage<Props> = (props) => {
  return (
    <div className="p-5">
      <div>
        <div className="flex gap-x-3 border-b border-neutral-600 mb-3 py-3">
          <p className="text-3xl">YouTube</p>
          <a
            href={props.youtubeUrl}
            className="bg-black rounded text-white self-center px-2 py-1"
          >
            New
          </a>
        </div>
        <div className="flex gap-3">
          {props.youtubeChannels.map((channel) => (
            <div
              key={channel.id}
              className="inline-flex flex-col w-32 rounded shadow"
            >
              <Image
                src={channel.photo ?? ""}
                width={88}
                height={88}
                className="mx-auto border-b pb-2 mt-2"
                alt="img"
              />
              <p className="text-center my-1">{channel.name}</p>
              <p
                title={channel.platform_id}
                className="text-sm px-1 truncate mt-auto"
                onClick={() =>
                  navigator.clipboard.writeText(channel.platform_id)
                }
              >
                {channel.platform_id}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
