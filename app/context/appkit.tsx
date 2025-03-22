"use client";

import { createAppKit } from "@reown/appkit/react";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import { mainnet, sonic, bsc } from "@reown/appkit/networks";

// 1. Get projectId at https://cloud.reown.com
const projectId = "e9b0c4f5ad8d06fddac4b54b8fea1bae";

// 2. Create a metadata object
const metadata = {
   name: "HorizonX",
   description: "The future of decentralized finance",
   url: "https://horizonx.vip/", // origin must match your domain & subdomain
   icons: ["https://horizonx.vip/favicon.ico"],
};

// 3. Create the AppKit instance
export const appkitModal = createAppKit({
   adapters: [new EthersAdapter()],
   metadata,
   networks: [mainnet, sonic, bsc],
   projectId,
   features: {
      email: false,
      socials: [],
      analytics: true, // Optional - defaults to your Cloud configuration
   },
});

export function AppKit({ children }: { children: React.ReactNode }) {
   return <>{children}</>;
}
