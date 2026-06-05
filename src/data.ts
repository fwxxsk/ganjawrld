import { RectConfig, MemberConfig, ExclusiveConfig, ThreatConfig, BottomMemberConfig } from './types';

// ============================================================================
// PROFILE CARDS PAGE 1: HOME DASHBOARD (6 RECTANGLES)
// ============================================================================
export const RECT_CONFIGS: RectConfig[] = [
  { 
    discordId: '850273870740324353', // Christine / Shazzy
    defaultMusic: 'https://hiphopkit.com/uploads/songs/O-Side-Mafia-Don-t-Fuck-With-Us.mp3', 
    banner: 'https://cdn.discordapp.com/banners/850273870740324353/688319230ff84fb002b3d2debb6cb47c.png',
    songName: 'DONT FUCK WITH US',
    songArtist: 'O Side Mafia'
  },
  { 
    discordId: '1497232227585495106', 
    defaultMusic: 'https://file.garden/aWEjqj03KS-m2Cfz/song/tokyosongxclsv.mp3', 
    banner: 'https://file.garden/aWEjqj03KS-m2Cfz/arcs/arcs2.jpg',
    songName: 'Tokyo Song',
    songArtist: 'Xclusive'
  },
  { 
    discordId: '1198977772421386251', 
    defaultMusic: 'https://file.garden/aWEjqj03KS-m2Cfz/arcs/xeimp52342342.mp3', 
    banner: 'https://file.garden/aWEjqj03KS-m2Cfz/arcs/ciaa.png',
    songName: 'xeimp52342342',
    songArtist: 'Xei'
  },
  { 
    // Senko (Alt/Both IDs loaded just in case)
    discordId: '1298577813812678657', 
    defaultMusic: 'https://archive.org/download/taylor-swift-folklore_202011/02.%20Taylor%20Swift%20-%20cardigan.mp3', 
    banner: 'https://file.garden/aWEjqj03KS-m2Cfz/arcs/cia.gif', // Custom GIF editable
    songName: 'cardigan',
    songArtist: 'Taylor Swift'
  },
  { 
    discordId: '1378455396762652767', 
    defaultMusic: 'https://file.garden/aWEjqj03KS-m2Cfz/song/rxmorsesongxclsv.mp3', 
    banner: 'https://file.garden/aWEjqj03KS-m2Cfz/arcs/hof/remorsez.gif',
    songName: 'Remorse Custom Song',
    songArtist: 'Zone / Remorse'
  },
  { 
    // Senko Primary
    discordId: '890998985790214247', 
    defaultMusic: 'https://archive.org/download/taylor-swift-folklore_202011/02.%20Taylor%20Swift%20-%20cardigan.mp3', 
    banner: 'https://file.garden/aWEjqj03KS-m2Cfz/arcs/hof/senkuw.png', // custom photo/gif editable
    songName: 'cardigan',
    songArtist: 'Taylor Swift'
  }
];

// ============================================================================
// PROFILE CARDS SECTION: THREATS (3 PORTRAIT CARDS AT THE BOTTOM FLOW)
// ============================================================================
export const THREATS_CONFIGS: ThreatConfig[] = [
  {
    discordId: '1423601796026339421', // Remorse
    banner: 'https://file.garden/aWEjqj03KS-m2Cfz/arcs/hof/FxCia.png', // Put any photo or GIF url here!
    defaultMusic: 'https://file.garden/aWEjqj03KS-m2Cfz/song/rxmorsesongxclsv.mp3',
    songName: 'Remorse Loop',
    songArtist: 'Remorse Clan'
  },
  {
    discordId: '1198977772421386251', // Xei
    banner: 'https://file.garden/aWEjqj03KS-m2Cfz/arcs/xeibanner2.jpg', // Custom Banner GIF or photo
    defaultMusic: 'https://file.garden/aWEjqj03KS-m2Cfz/arcs/xeimp52342342.mp3',
    songName: 'Xei Ambient Synth',
    songArtist: 'Xei'
  },
  {
    discordId: '1173976669233623182', // Endo
    banner: 'https://file.garden/aWEjqj03KS-m2Cfz/arcs/arcsendo.png', // Custom static photo or GIF
    defaultMusic: 'https://file.garden/aWEjqj03KS-m2Cfz/song/tokyosongxclsv.mp3',
    songName: 'Cyber Ambient Track',
    songArtist: 'Endosendo'
  }
];

// ============================================================================
// PROFILE CARDS SECTION: MEMBERS LANDSCAPE (5 LANDSCAPE MOUNTED CARDS AT THE VERY BOTTOM AT ONCE)
// ============================================================================
export const BOTTOM_MEMBERS_CONFIGS: BottomMemberConfig[] = [
  {
    discordId: '1285659297916915752', // Shakur
    banner: 'https://file.garden/aWEjqj03KS-m2Cfz/sHakur/skahbg.gif', // Beautiful cyberpunk GIF banner!
    defaultMusic: 'https://file.garden/aWEjqj03KS-m2Cfz/song/rxmorsesongxclsv.mp3',
    songName: 'Shakur Beat',
    songArtist: 'Shakur'
  },
  {
    discordId: '1427283915558617149', // Stuss
    banner: 'https://file.garden/aWEjqj03KS-m2Cfz/arcs/stussbanner.jpg', // Photo or GIF URL editable
    defaultMusic: 'https://file.garden/aWEjqj03KS-m2Cfz/song/tokyosongxclsv.mp3',
    songName: 'Tokyo Chill Vibe',
    songArtist: 'Stuss'
  },
  {
    discordId: '884238761624489985', // Cia
    banner: 'https://file.garden/aWEjqj03KS-m2Cfz/arcs/7dsarcscia.png', // Photo or GIF URL editable
    defaultMusic: 'https://file.garden/aWEjqj03KS-m2Cfz/arcs/Hev%20Abi%20-%20molly%20to%20the%20head%20freestyle.mp3',
  },
  {
    discordId: '1395772638588047471', // Nox
    banner: 'https://file.garden/aWEjqj03KS-m2Cfz/arcs/noxbanner.gif', // Action GIF banner editable
    defaultMusic: 'https://file.garden/aWEjqj03KS-m2Cfz/arcs/senkosong.mp3',
    songName: 'Nox Vibe Track',
    songArtist: 'Nox'
  },
  {
    discordId: '1284038557471739907', // 7ds
    banner: 'https://file.garden/aWEjqj03KS-m2Cfz/arcs/7ds1.png', // Photo or GIF URL editable
    defaultMusic: 'https://file.garden/aWEjqj03KS-m2Cfz/arcs/xeimp52342342.mp3',
    songName: 'xeimp52342342',
    songArtist: '7ds'
  }
];

// ============================================================================
// ORIGINAL MEMBER LIST CONFIGURATION (12 MOUNTED COMPATIBLE GRID ITEMS)
// ============================================================================
export const MEMBER_CONFIGS: MemberConfig[] = [
  { discordId: '1423601796026339421', defaultBanner: 'https://file.garden/aWEjqj03KS-m2Cfz/arcs/hof/FxCia.png' },
  { discordId: '1383343147198709781', defaultBanner: 'https://file.garden/aWEjqj03KS-m2Cfz/arcs/subdomain/leiabn.jpg' },
  { discordId: '1359891937066225674', defaultBanner: 'https://file.garden/aWEjqj03KS-m2Cfz/arcs/xeibanner2.jpg' },
  { discordId: '1173976669233623182', defaultBanner: 'https://file.garden/aWEjqj03KS-m2Cfz/arcs/arcsendo.png' },
  { discordId: '1258540862179119175', defaultBanner: 'https://file.garden/aWEjqj03KS-m2Cfz/arcs/7ds.png' },
  { discordId: '1285659297916915752', defaultBanner: 'https://file.garden/aWEjqj03KS-m2Cfz/sHakur/skahbg.gif' },
  { discordId: '1427283915558617149', defaultBanner: 'https://file.garden/aWEjqj03KS-m2Cfz/arcs/stussbanner.jpg' },
  { discordId: '884238761624489985', defaultBanner: 'https://file.garden/aWEjqj03KS-m2Cfz/arcs/7dsarcscia.png' },
  { discordId: '1395772638588047471', defaultBanner: 'https://file.garden/aWEjqj03KS-m2Cfz/arcs/noxbanner.gif' },
  { discordId: '1284038557471739907', defaultBanner: 'https://file.garden/aWEjqj03KS-m2Cfz/arcs/7ds1.png' },
  { discordId: '1127180191240835103', defaultBanner: 'https://file.garden/aWEjqj03KS-m2Cfz/arcs/harubanner.gif' },
  { discordId: '1340554659353595914', defaultBanner: 'https://file.garden/aWEjqj03KS-m2Cfz/arcs/7dsarcscia.png' }
];

export const EXCLUSIVE_CONFIGS: ExclusiveConfig[] = [
  { discordId: '1360879822854946916' },
  { discordId: '783126736262266920' },
  { discordId: '1442907756515295376' }
];

export const MARQUEE_IDS: string[] = [
  '1423601796026339421', '1369176102337118361', '1359891937066225674', '1173976669233623182', 
  '1300821067501277208', '1258540862179119175', '1285659297916915752', '1194520302693142540', 
  '1427283915558617149', '884238761624489985', '1203449668718305351', '1436374391503061206', 
  '1395772638588047471', '1147770222774861854', '1284038557471739907', '1489455687250612345', 
  '1423294589535649926', '957128773977931787', '1127180191240835103', '1340554659353595914', 
  '1360879822854946916', '1248910763494473728', '1410504862445080586', '783126736262266920', 
  '1298808333507104789', '1442907756515295376', '1383343147198709781'
];

export const SERVER_INVITES: string[] = [
  'remorse', 'senko', 'vXbXzP7M3Y', '69n', 'K8VvAhmM6m', 'arcsendo', '3rWJ736UWe', 'XhXg9B4Y', 'G7WmdwW49f'
];
