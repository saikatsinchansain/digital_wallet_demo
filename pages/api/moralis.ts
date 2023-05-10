// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

const Moralis = require("moralis").default;
const { EvmChain } = require("@moralisweb3/common-evm-utils");

export default class MoralisHelper {
  private moralis: any;

  constructor() {
    Moralis.start({
      apiKey: process.env.MORALIS_KEY,
    });
  }

  async getOwnedTokens(address: string): Promise<any>  {
    const chain = EvmChain.MUMBAI;
    const response = await Moralis.EvmApi.nft.getWalletNFTs({
      address,
      chain,
    });
    return response.result;
  }

}