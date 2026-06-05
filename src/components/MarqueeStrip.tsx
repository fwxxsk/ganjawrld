import React, { useEffect, useState } from 'react';
import { fetchDiscordProfile } from '../discord_service';
import { LanyardData, ServerCardData } from '../types';

interface MarqueeStripProps {
  memberIds: string[];
  onHoverItem: (e: React.MouseEvent, profile: LanyardData | null) => void;
  onLeaveItem: () => void;
}

export const MarqueeStrip: React.FC<MarqueeStripProps> = ({ memberIds, onHoverItem, onLeaveItem }) => {
  const [profiles, setProfiles] = useState<Record<string, LanyardData>>({});

  useEffect(() => {
    // Lazily fetch profiles for all marquee IDs to populate usernames and avatars!
    const fetchAll = async () => {
      const results: Record<string, LanyardData> = {};
      await Promise.all(
        memberIds.map(async (id) => {
          try {
            const p = await fetchDiscordProfile(id);
            results[id] = p;
          } catch (e) {
            // Silently absorb
          }
        })
      );
      setProfiles(prev => ({ ...prev, ...results }));
    };

    fetchAll();
  }, [memberIds]);

  // Split into Row 1 (even indexes) and Row 2 (odd indexes)
  const row1Ids = memberIds.filter((_, idx) => idx % 2 === 0);
  const row2Ids = memberIds.filter((_, idx) => idx % 2 !== 0);

  const getAvatarUrl = (user: LanyardData['discord_user']) => {
    if (!user.avatar) return 'https://cdn.discordapp.com/embed/avatars/0.png';
    const ext = user.avatar.startsWith('a_') ? 'gif' : 'png';
    return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${ext}?size=128`;
  };

  const getStatusColor = (status: LanyardData['discord_status']) => {
    return {
      online: '#43b581',
      idle: '#faa61a',
      dnd: '#f04747',
      offline: '#747f8d'
    }[status] || '#747f8d';
  };

  const renderItem = (id: string, index: number) => {
    const profile = profiles[id];
    const username = profile ? (profile.discord_user.display_name || profile.discord_user.username) : '...';
    const avatarUrl = profile ? getAvatarUrl(profile.discord_user) : 'https://cdn.discordapp.com/embed/avatars/0.png';
    const statusColor = profile ? getStatusColor(profile.discord_status) : '#747f8d';

    return (
      <div
        key={`${id}-${index}`}
        className="msm"
        onMouseEnter={(e) => {
          if (profile) onHoverItem(e, profile);
        }}
        onMouseLeave={onLeaveItem}
      >
        <div
          className="msm-av"
          style={{ backgroundImage: `url('${avatarUrl}')` }}
        >
          <div
            className="msm-sdot"
            style={{ background: statusColor }}
          />
        </div>
        <span className="msm-name">{username}</span>
      </div>
    );
  };

  return (
    <div className="mscroll-rows">
      {/* Row 1 */}
      <div className="mscroll-strip">
        <div className="mscroll-fade-left" />
        <div className="mscroll-fade-right" />
        <div className="mscroll-track">
          {row1Ids.map((id, idx) => renderItem(id, idx))}
          {/* Duplicate for infinite loop */}
          {row1Ids.map((id, idx) => renderItem(id, idx + 1000))}
        </div>
      </div>

      {/* Row 2 */}
      <div className="mscroll-strip">
        <div className="mscroll-fade-left" />
        <div className="mscroll-fade-right" />
        <div className="mscroll-track mscroll-track-row2">
          {row2Ids.map((id, idx) => renderItem(id, idx))}
          {/* Duplicate for infinite loop */}
          {row2Ids.map((id, idx) => renderItem(id, idx + 1000))}
        </div>
      </div>
    </div>
  );
};
export default MarqueeStrip;
