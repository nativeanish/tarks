import useArns from "../store/useArns";
import useCounter from "../store/useCounter";
import useProfile from "../store/useProfile";
import turbo from "./turbo";
import { SERVER_URL } from "../constants";
import { generateMetaTags, generatePage } from "./generate";
import { uuidv7 } from "uuidv7";
export default async function upload(theme: string) {
  useArns.setState({ loading: true });
  const arns = useArns.getState().arns;
  const check = await fetch(`${SERVER_URL}/check`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ subdomain: arns }),
  });
  useArns.setState({ loading: false });
  const res = await check.json();
  if (res.status === 0 && res.data === "Handle Not Register") {
    useCounter.setState({ counter: 1 });
    const uuid = uuidv7();
    const image = useProfile.getState().image;
    if (image && image.length > 0 && image.startsWith("data:image")) {
      const src = useProfile.getState().image_type;
      const buf = base64ToBuffer(image);
      if (buf) {
        const image_id = await turbo(buf, src);
        useProfile.setState({ image: `https://arweave.net/${image_id}` });
      } else {
        return;
      }
    }
    useCounter.setState({ counter: 2 });
    const page = generatePage(theme);
    if (!page) {
      useCounter.setState({ counter: 0 });
      return;
    }
    const metaTags = generateMetaTags({ uuid });
    const html = `<!DOCTYPE html><html lang="en"><head>${metaTags}</head><body>${page}</body></html>`;
    useCounter.setState({ counter: 3 });
    const check = await turbo(html, "text/html");
    console.log(check);
  } else {
    useArns.setState({ isAvailable: false });
    return;
  }
}
function base64ToBuffer(base64Image: string): Buffer | null {
  // Define a regex to match the data URL prefix for PNG, JPEG, JPG, GIF, and SVG
  const regex = /^data:image\/(png|jpeg|jpg|gif|svg\+xml);base64,/;

  // Remove the data URL prefix if it exists
  const match = base64Image.match(regex);
  if (match) {
    const base64Data = base64Image.replace(regex, "");

    // Convert base64 string to Buffer
    const buffer = Buffer.from(base64Data, "base64");
    return buffer;
  }

  // Return null if the format is unknown or invalid
  return null;
}
