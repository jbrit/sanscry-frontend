// DEX address to name mapping
export const DEX_NAME_MAP: Record<string, string> = {
  whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc: "Orca",
  CAMMCzo5YL8w4VFF8KVHrK22GGUsp5VTaW7grrKgrWqK: "Raydium CLMM",
  "675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8": "Raydium LPv4",
  Eo7WjKq67rjJQSZxS6z3YkapzY3eMj6Xy8X5EQVn5UaB: "Meteora PP",
  LBUZKhRxPF3XUpBCjp4YzTKgLccjZhTSDM9YuVaPwxo: "Meteora DLMM",
  "2wT8Yq49kHgDzXuPxZSaeLaH1qbmGXtEyPy64bL7aD3c": "Lifinity V2",
  CPMMoo8L3F4NbTegBCKVNunggL7H1ZpdTHKxQB5qKP1C: "Raydium CPMM",
  SoLFiHG9TfgtdUXUjWAxi3LtvYuFyDLVhBWxdMZxyCe: "SolFi",
  H8W3ctz92svYg6mkn1UtGfu2aQr2fnUFHM1RhScEtQDt: "Cropper",
  obriQD1zbpyLz95G5n7nJe6a4DPjpFwa5XYPoNm113y: "Obric",
  swapNyd8XiQwJ6ianp9snpu4brUqFxadzvHebnAXjJZ: "Stabble",
  ZERor4xhbUycZ6gb9ntrhqscUcZmAbQDjEAtCf4hbZY: "ZeroFi",
  opnb2LAfJYbRMAHHvqjCwQxanZn7ReEHp1k81EohpZb: "Openbook V2",
  pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA: "Pump Swap",
}

export function formatDexName(address: string): string {
  return DEX_NAME_MAP[address] || formatDexAddress(address)
}

export function formatDexAddress(address: string): string {
  return `${address.slice(0, 4)}...${address.slice(-4)}`
}

export function formatTokenAddress(address: string): string {
  if (address === "So11111111111111111111111111111111111111112") return "SOL"
  return `${address.slice(0, 4)}...${address.slice(-4)}`
}

export function formatPoolAddress(address: string): string {
  return `${address.slice(0, 4)}...${address.slice(-4)}`
}

export function formatBotAddress(address: string): string {
  return `${address.slice(0, 4)}...${address.slice(-4)}`
}
