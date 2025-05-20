import { FC } from "react";

interface TagItemProps {
  data: {
    attributes: {
      name: { [lang: string]: string };
    };
  };
}
const TagItem: FC<TagItemProps> = ({ data }) => {
  return (
    <span className="border-gray-600 border-1 bg-gray-400 rounded-3xl text-[7px] px-2">
      {" "}
      {data.attributes.name.en}
    </span>
  );
};

export default TagItem;
