export interface DiscordUser {
  id: string;
  username: string;
  display_name: string;
  avatar: string;
  avatar_decoration_data?: { asset: string } | null;
  banner?: string | null;
  accent_color?: number | null;
}

export interface SpotifyPresence {
  track_id: string | null;
  album_art_url: string;
  song: string;
  artist: string;
}

export interface DiscordActivity {
  id: string;
  name: string;
  type: number;
  state?: string;
  details?: string;
  timestamps?: { start?: number; end?: number };
}

export interface LanyardData {
  discord_user: DiscordUser;
  discord_status: 'online' | 'idle' | 'dnd' | 'offline';
  spotify: SpotifyPresence | null;
  activities: DiscordActivity[];
}

export interface RectConfig {
  discordId: string;
  defaultMusic: string;
  banner: string;
  songName?: string;
  songArtist?: string;
}

export interface MemberConfig {
  discordId: string;
  defaultBanner: string;
  defaultMusic?: string;
  songName?: string;
  songArtist?: string;
}

export interface ExclusiveConfig {
  discordId: string;
  banner?: string;
  defaultMusic?: string;
  songName?: string;
  songArtist?: string;
}

export interface ThreatConfig {
  discordId: string;
  banner?: string; // editable banner image or GIF link
  defaultMusic?: string; // custom mp3 override
  songName?: string;
  songArtist?: string;
}

export interface BottomMemberConfig {
  discordId: string;
  banner?: string; // editable banner image or GIF link
  defaultMusic?: string; // custom mp3 override
  songName?: string;
  songArtist?: string;
}

export interface ServerCardData {
  id: string;
  inviteId: string; // discord invite code
  name: string;
  membersOnline: number;
  membersTotal: number;
  iconUrl?: string;
}
