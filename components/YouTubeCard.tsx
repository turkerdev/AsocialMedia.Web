import Image from "next/future/image";

interface Props {
  platform_id: string;
  name: string;
  image: string;
}

const YouTubeCard: React.FC<Props> = (props) => {
  function copyPlatformId() {
    navigator.clipboard.writeText(props.platform_id);
  }

  return (
    <div className="inline-flex flex-col w-32 rounded shadow">
      <Image
        src={props.image}
        width={88}
        height={88}
        className="mx-auto border-b pb-2 mt-2"
        alt="img"
      />
      <p className="text-center my-1">{props.name}</p>
      <p
        title={props.platform_id}
        className="text-sm px-1 truncate mt-auto"
        onClick={copyPlatformId}
      >
        {props.platform_id}
      </p>
    </div>
  );
};

export default YouTubeCard;
