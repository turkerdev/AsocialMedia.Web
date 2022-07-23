import { GetStaticProps, NextPage } from "next";
import { GoogleService } from "../services/google";

type Props = {
  youtubeUrl: string;
};

export const getStaticProps: GetStaticProps<Props> = () => {
  const youtubeUrl = GoogleService.generateUrl();

  return { props: { youtubeUrl } };
};

const Home: NextPage<Props> = (props) => {
  return (
    <>
      <a href={props.youtubeUrl}>YouTube New</a>
    </>
  );
};

export default Home;
