import { message } from "@permaweb/aoconnect";
import Bowser from "bowser";
import generateWallet from "./wallet";
import { ArweaveSigner, createData } from "warp-arbundles";
import { JWKInterface } from "warp-arbundles/build/node/esm/src/interface-jwk";
import ShareButton from "./share";
import { uuidv7 } from "uuidv7";

declare global {
  interface Window {
    Arweave: any;
    solana: any;
    ethereum: any;
  }
}
var jwk;
var id: string;
var ip: string;
var signer: any;
const process = "nMM8c6RbcZ-ZXwhM2jVPOfDpT2cGTu-JHT7fFx05_iQ";
window.onload = async () => {
  // Page Load Time
  const navigationEntry = performance.getEntriesByType(
    "navigation"
  )[0] as PerformanceNavigationTiming;
  const loadTime =
    navigationEntry.domContentLoadedEventEnd - navigationEntry.startTime;
  console.log(`Page Load Time: ${loadTime}ms`);

  // Current Date
  const currentDate = Date.now();

  const agent = Bowser.getParser(window.navigator.userAgent);

  // Timezone
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  //Wallet
  const wallet = [];
  if (window.Arweave) {
    wallet.push("arweave");
  }
  if (window.solana) {
    wallet.push("solana");
  }
  if (window.ethereum) {
    wallet.push("ethereum");
  }
  console.log(`Wallet: ${wallet}`);

  //Page Id
  const _id = document.querySelector('meta[name="uuid"]') || "";
  id = uuidv7();
  //name
  const name = document.querySelector('meta[name="arns_name"]') || "";
  // IP Address
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    ip = data.ip;
  } catch (error) {
    console.error("Error fetching IP address:", error);
  }

  // const metaTag = document.querySelector('meta[name="uuid"]');

  jwk = (await generateWallet()).privateKey;
  signer = createDataItemSignerFromJWK(JSON.parse(JSON.stringify(jwk)));
  const trans = await message({
    signer: signer as any,
    process,
    tags: [
      {
        name: "Action",
        value: "register_view",
      },
      {
        name: "id",
        value: _id.toString(),
      },
      {
        name: "pageid",
        value: id,
      },
      {
        name: "date",
        value: JSON.stringify(currentDate),
      },
      {
        name: "browser",
        value: agent.getBrowserName(),
      },
      {
        name: "os",
        value: agent.getOSName(),
      },
      {
        name: "ip",
        value: ip,
      },
      {
        name: "timezone",
        value: timeZone,
      },
      {
        name: "wallet",
        value: wallet.toString(),
      },
      {
        name: "name",
        value: name.toString(),
      },
    ],
  });
  console.log(trans);
};
function createDataItemSignerFromJWK(jwk: JWKInterface) {
  const signer = async ({
    data,
    tags,
    target,
    anchor,
  }: {
    data: any;
    tags: any;
    target: any;
    anchor: any;
  }) => {
    const signer = new ArweaveSigner(jwk);
    const dataItem = createData(data, signer, { tags, target, anchor });
    return dataItem.sign(signer).then(async () => ({
      id: await dataItem.id,
      raw: await dataItem.getRaw(),
    }));
  };

  return signer;
}

document.addEventListener("DOMContentLoaded", async () => {
  const shareButton = new ShareButton(); // Create a single instance

  document.addEventListener("click", async (event: MouseEvent) => {
    if (event.target) {
      if ((event.target as HTMLButtonElement).tagName === "BUTTON") {
        if ((event.target as HTMLElement).id === "create") {
          window.open("https://arweave.net/", "_blank");
        }
        if ((event.target as HTMLElement).id === "share") {
          // Use the existing instance to handle the share functionality
          shareButton;
        }
      }
      if ((event.target as HTMLAnchorElement).tagName === "A") {
        const anchor = event.target as HTMLAnchorElement;
        const id_click = anchor.getAttribute("id") || "";
        const name = anchor.getAttribute("data-name") || "";
        const trans = message({
          signer: signer as any,
          process,
          tags: [
            {
              name: "Action",
              value: "register_click",
            },
            {
              name: "id",
              value: id_click,
            },
            {
              name: "pageid",
              value: id,
            },
            {
              name: "date",
              value: JSON.stringify(Date.now()),
            },
            {
              name: "name",
              value: name,
            },
          ],
        });
        console.log(trans);
      }
    }
  });
});
