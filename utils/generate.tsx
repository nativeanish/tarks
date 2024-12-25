import useProfile from "../store/useProfile";
import ReactDOMServer from "react-dom/server";
import ClassicLight from "../theme/ClassicLight";
import { IconType } from "react-icons/lib";
type Link = {
  name: string;
  url: string;
  icon: IconType;
  uuid: string;
  iconName: string;
  className: string;
  arweave: Array<string>;
};
export function generate(propss: {
  name: string;
  image: string;
  description: string;
  links: Array<Link>;
}) {
  const data = ReactDOMServer.renderToStaticMarkup(
    <ClassicLight
      name={propss.name}
      image={propss.image}
      description={propss.description}
      links={propss.links}
    />
  );
  console.log(data);
}
