import { PhotoDetailsProps } from "./PhotoDetailsProps";
import "./styles.scss";

const PhotoDetails: React.FC<PhotoDetailsProps> = ({ title, name }) => {
  return (
    <div className="photoDetails">
      <div data-testid={"title_id"} className={"title"}>
        {title || "Unknown"}
      </div>
      <hr />
      <div data-testid={"name_id"} className={"name"}>
        {name || "Unknown"}
      </div>
    </div>
  );
};

export default PhotoDetails;
