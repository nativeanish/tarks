import { createDataItemSigner, message, result } from "@permaweb/aoconnect";
import { PROCESS } from "../constants";
import useProfile from "../store/useProfile";

export async function register(uuid: string, name: string, design: string) {
  const profile = {
    name: useProfile.getState().name,
    description: useProfile.getState().description,
    image: useProfile.getState().image,
    links: useProfile.getState().links,
  };
  const trans = await message({
    process: PROCESS,
    signer: createDataItemSigner(window.arweaveWallet),
    tags: [
      {
        name: "Action",
        value: "register",
      },
      {
        name: "id",
        value: uuid,
      },
      {
        name: "name",
        value: name,
      },
      {
        name: "design",
        value: design,
      },
    ],
    data: JSON.stringify(profile),
  });
  const res = await result({ process: PROCESS, message: trans });
  console.log(res);
}
