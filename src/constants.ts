import { PublicKey } from '@solana/web3.js'
import { PoolToken, TokenMeta } from 'gamba-react-ui-v2'

// RPC endpoint pre testnet
export const RPC_ENDPOINT = import.meta.env.VITE_RPC_ENDPOINT ?? 'https://api.testnet.solana.com'

// Adresa tvorcu platformy (môžete zmeniť na svoju testnet peňaženku)
export const PLATFORM_CREATOR_ADDRESS = new PublicKey(
  'BgFTqkr4UPyAiyycQypBeWaCChKEhNCW67QbhJTPCf2e',
)

// URL pre Gamba explorer a zdieľanie (voliteľné)
export const EXPLORER_URL = 'https://explorer.gamba.so'
export const PLATFORM_SHARABLE_URL = 'play.gamba.so'

// Poplatky platformy
export const PLATFORM_CREATOR_FEE = 0.01 // 1%
export const PLATFORM_JACKPOT_FEE = 0.001 // 0.1%
export const PLATFORM_REFERRAL_FEE = 0.0025 // 0.25%
export const PLATFORM_ALLOW_REFERRER_REMOVAL = true

// Pomocná funkcia na definovanie poolu
const lp = (tokenMint: PublicKey | string, poolAuthority?: PublicKey | string): PoolToken => ({
  token: new PublicKey(tokenMint),
  authority: poolAuthority !== undefined ? new PublicKey(poolAuthority) : undefined,
})

// Zoznam podporovaných poolov – iba SOL
export const POOLS = [
  lp('So11111111111111111111111111111111111111112'), // SOL mint adresa
]

export const DEFAULT_POOL = POOLS[0]

// Metadata tokenov – iba SOL
export const TOKEN_METADATA: (Partial<TokenMeta> & { mint: PublicKey })[] = [
  {
    mint: new PublicKey('So11111111111111111111111111111111111111112'),
    name: 'Solana',
    symbol: 'SOL',
    image: '/solana.png',
    baseWager: 1e9, // 1 SOL
    decimals: 9,
    usdPrice: 0, // Voliteľné: cena v USD
  },
]

// HTML pre podmienky používania
export const TOS_HTML = `
  <p><b>1. Age Requirement:</b> Must be at least 18 years old.</p>
  <p><b>2. Legal Compliance:</b> Follow local laws responsibly.</p>
  <p><b>3. Risk Acknowledgement:</b> Games involve risk; no guaranteed winnings.</p>
  <p><b>4. No Warranty:</b> Games provided "as is"; operate randomly.</p>
  <p><b>5. Limitation of Liability:</b> We're not liable for damages.</p>
  <p><b>6. Licensing Disclaimer:</b> Not a licensed casino; for simulation only.</p>
  <p><b>7. Fair Play:</b> Games are conducted fairly and transparently.</p>
  <p><b>8. Data Privacy:</b> Your privacy is important to us.</p>
  <p><b>9. Responsible Gaming:</b> Play responsibly; seek help if needed.</p>
`
