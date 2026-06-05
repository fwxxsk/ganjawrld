import { LanyardData, DiscordUser } from './types';

// In-memory cache to prevent redundant API fetches and rate limits
const cache: Record<string, LanyardData> = {};

// Default, beautiful fallbacks for all Discord IDs in case APIs fail
const STATIC_FALLBACKS: Record<string, Partial<DiscordUser> & { status?: 'online' | 'idle' | 'dnd' | 'offline' }> = {
  '850273870740324353': { username: 'shazielntfnd', display_name: 'fuck shazzy', avatar: '5a736e814524dfabe7cb6092724511b3', banner: '688319230ff84fb002b3d2debb6cb47c', status: 'online' },
  '1423601796026339421': { username: 'remorse', display_name: 'remorse', status: 'online' },
  '1497232227585495106': { username: 'tokyo', display_name: 'tokyo', status: 'idle' },
  '1198977772421386251': { username: 'xei', display_name: 'xei', status: 'dnd' },
  '1298577813812678657': { username: 'senko', display_name: 'senko', status: 'online' },
  '1378455396762652767': { username: 'zone', display_name: 'zone', status: 'offline' },
  '890998985790214247': { username: 'senku', display_name: 'senku', status: 'online' }
};

export async function fetchDiscordProfile(id: string): Promise<LanyardData> {
  if (cache[id]) {
    return cache[id];
  }

  const defaultUser: DiscordUser = {
    id,
    username: STATIC_FALLBACKS[id]?.username || `user_${id.substring(0, 5)}`,
    display_name: STATIC_FALLBACKS[id]?.display_name || `User ${id.substring(0, 5)}`,
    avatar: STATIC_FALLBACKS[id]?.avatar || '',
    banner: STATIC_FALLBACKS[id]?.banner || null,
    accent_color: null,
  };

  const fallbackData: LanyardData = {
    discord_user: defaultUser,
    discord_status: STATIC_FALLBACKS[id]?.status || 'online',
    spotify: id === '850273870740324353' ? {
      track_id: 'molly_to_the_head',
      album_art_url: 'https://file.garden/aWEjqj03KS-m2Cfz/arcs/arcsind.png',
      song: 'Molly to the Head',
      artist: 'Hev Abi'
    } : null,
    activities: id === '850273870740324353' ? [
      {
        id: 'spotify:1',
        name: 'Spotify',
        type: 2,
        state: 'Molly to the Head',
        details: 'Hev Abi'
      }
    ] : []
  };

  try {
    // 1. Try Lanyard REST Endpoint
    const lanyardRes = await fetch(`https://api.lanyard.rest/v1/users/${id}`);
    if (lanyardRes.ok) {
      const json = await lanyardRes.json();
      if (json.success && json.data) {
        // Successful fetch from Lanyard
        const data = json.data;
        
        // Inject Spotify mock specifically for our core custom user
        if (id === '850273870740324353' && !data.spotify) {
          data.spotify = fallbackData.spotify;
          if (!data.activities.some((a: any) => a.name === 'Spotify')) {
            data.activities.push(fallbackData.activities[0]);
          }
        }
        
        cache[id] = data;
        return data;
      }
    }

    // 2. Fallback to Japi.rest (this will work for unmonitored / custom users!)
    const japiRes = await fetch(`https://japi.rest/discord/v1/user/${id}`);
    if (japiRes.ok) {
      const json = await japiRes.json();
      if (json.data) {
        const jUser = json.data;
        const mappedUser: DiscordUser = {
          id: jUser.id,
          username: jUser.username || defaultUser.username,
          display_name: jUser.global_name || jUser.display_name || jUser.username || defaultUser.display_name,
          avatar: jUser.avatar || defaultUser.avatar,
          banner: jUser.banner || defaultUser.banner,
          accent_color: jUser.accent_color || null,
        };

        const activeStatus = json.presence?.status || fallbackData.discord_status;
        
        const mappedData: LanyardData = {
          discord_user: mappedUser,
          discord_status: activeStatus,
          spotify: id === '850273870740324353' ? fallbackData.spotify : null,
          activities: id === '850273870740324353' ? fallbackData.activities : []
        };

        cache[id] = mappedData;
        return mappedData;
      }
    }
  } catch (error) {
    console.warn(`Error fetching profile for id ${id}, returning high-fidelity local fallback:`, error);
  }

  // If both failed, return fallback
  cache[id] = fallbackData;
  return fallbackData;
}
