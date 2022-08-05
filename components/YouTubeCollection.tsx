import YouTubeCard from "./YouTubeCard";

export interface Props {
  channels: {
    id: string;
    platform_id: string;
    name: string;
    image: string;
  }[];
}

const YouTubeCollection: React.FC<Props> = (props) => {
  return (
    <div className="flex gap-3">
      {props.channels.map((channel) => (
        <YouTubeCard
          key={channel.id}
          platform_id={channel.platform_id}
          name={channel.name ?? ""}
          image={channel.image ?? ""}
        />
      ))}
    </div>
  );
};

export default YouTubeCollection;
