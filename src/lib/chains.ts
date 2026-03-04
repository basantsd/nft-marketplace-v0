import { defineChain } from 'viem'
import { mainnet, sepolia } from 'wagmi/chains'
export const sepoliaChain = defineChain({
  id: 11155111,
  name: 'Sepolia',
  network: 'sepolia',
  nativeCurrency: {
    decimals: 18,
    name: 'Sepolia Ether',
    symbol: 'SEP',
  },
  rpcUrls: {
    default: {
      http: ['https://sepolia.infura.io/v3/'],
    },
  },
  blockExplorers: {
    default: { name: 'Etherscan', url: 'https://sepolia.etherscan.io' },
  },
})
export { mainnet, sepolia }