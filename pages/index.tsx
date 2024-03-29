import { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import YouTubeCollection, {
  Props as YTCollectionProps,
} from "../components/YouTubeCollection";
import { GetAllChannels } from "../services/db";

type Props = {
  youtubeChannels: YTCollectionProps["channels"];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const allChannels = await GetAllChannels();
  const youtubeChannels = allChannels.filter((x) => x.platform === "YouTube");

  return {
    props: {
      youtubeChannels: youtubeChannels.map(
        ({ id, platform_id, name, image }) => ({
          id,
          platform_id,
          name: name ?? "",
          image: image ?? "",
        })
      ),
    },
  };
};

const Home: NextPage<Props> = (props) => {
  return (
    <div className="p-5">
      <div>
        <div className="flex gap-x-3 border-b border-neutral-600 mb-3 py-3">
          <p className="text-3xl">YouTube</p>
          <Link href="/api/oauth/goyoutube">
            <a className="bg-black rounded text-white self-center px-2 py-1">
              New
            </a>
          </Link>
        </div>
        <YouTubeCollection channels={props.youtubeChannels} />
      </div>
    </div>
  );
};

export default Home;
