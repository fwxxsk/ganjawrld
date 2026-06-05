import React, { useEffect, useState, useRef } from 'react';
import { fetchDiscordProfile } from './discord_service';
import { LanyardData, ServerCardData } from './types';
import { RECT_CONFIGS, MEMBER_CONFIGS, EXCLUSIVE_CONFIGS, MARQUEE_IDS, SERVER_INVITES, THREATS_CONFIGS, BOTTOM_MEMBERS_CONFIGS } from './data';
import { IntroGate } from './components/IntroGate';
import { MarqueeStrip } from './components/MarqueeStrip';
import { TerminalShell } from './components/TerminalShell';
import { Volume2, VolumeX, Shield, Users, Activity, Terminal, Link, ChevronRight, Play, Pause, Music } from 'lucide-react';

export const App: React.FC = () => {
  // Navigation & Viewport States
  const [activeTab, setActiveTab] = useState('home');
  const [entered, setEntered] = useState(false);
  
  // Custom Profile States
  const [profiles, setProfiles] = useState<Record<string, LanyardData>>({});
  const [expandedMobileRect, setExpandedMobileRect] = useState<number | null>(null);
  const [expandedMobileMember, setExpandedMobileMember] = useState<number | null>(null);
  const [expandedMobileExcl, setExpandedMobileExcl] = useState<number | null>(null);
  const [expandedMobileThreat, setExpandedMobileThreat] = useState<number | null>(null);
  const [expandedMobileBottomMember, setExpandedMobileBottomMember] = useState<number | null>(null);
  
  // Floating Tooltip for Marquee elements
  const [tooltipProfile, setTooltipProfile] = useState<LanyardData | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [tooltipVisible, setTooltipVisible] = useState(false);

  // Affiliate Server Card Invites States
  const [serverCards, setServerCards] = useState<ServerCardData[]>([]);

  // Typewriter Affiliate Text State
  const [typewriterText, setTypewriterText] = useState('');
  const typewriterPhrases = [
    'establishing supreme global bio portfolios...',
    'weaving underground elite security syndicate nodes...',
    'we don\'t end debates, we end eras.',
    'arcsendo collective. elite network connection.'
  ];
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Audio System States
  const [muted, setMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [masterVolume, setMasterVolume] = useState(0.4); // default 40%
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);
  const hoverMusicRef = useRef<HTMLAudioElement | null>(null);
  const curHoverSrcRef = useRef<string>('');

  // YouTube Audio Embed State
  const [ytPlayer, setYtPlayer] = useState<any>(null);
  const [currentTrack, setCurrentTrack] = useState<{
    id: string;
    type: 'youtube' | 'mp3';
    title: string;
    artist: string;
    src?: string;
  }>({
    id: 'main',
    type: 'youtube',
    title: "DONT FUCK WITH US",
    artist: "O Side Mafia"
  });

  // Floating Chains for Particle Effect
  const [chains, setChains] = useState<Array<{ id: number; left: number; delay: number; duration: number }>>([]);
  const [stars, setStars] = useState<Array<{ id: number; left: number; top: number; size: number; delay: number }>>([]);

  // Setup elements & effects
  useEffect(() => {
    // Generate star elements
    const starList = [];
    for (let i = 0; i < 40; i++) {
      starList.push({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 4,
      });
    }
    setStars(starList);

    // Generate falling chain elements
    const chainList = [];
    for (let i = 0; i < 15; i++) {
      chainList.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 12,
        duration: Math.random() * 15 + 15,
      });
    }
    setChains(chainList);
  }, []);

  // Sync YouTube API & Player
  useEffect(() => {
    const createPlayer = () => {
      new (window as any).YT.Player('youtube-player-element', {
        videoId: 'SdbL2gx1BoY',
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          rel: 0,
          showinfo: 0,
          iv_load_policy: 3,
          start: 54, // starts at 54 seconds
          loop: 1,
          playlist: 'SdbL2gx1BoY',
        },
        events: {
          onReady: (event: any) => {
            setYtPlayer(event.target);
            event.target.setVolume(muted ? 0 : masterVolume * 100);
          },
          onStateChange: (event: any) => {
            if (event.data === (window as any).YT.PlayerState.ENDED) {
              event.target.seekTo(54);
              event.target.playVideo();
            }
          }
        }
      });
    };

    // Inject YouTube API Script if not already loaded
    if (!(window as any).YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
      (window as any).onYouTubeIframeAPIReady = createPlayer;
    } else if ((window as any).YT && (window as any).YT.Player) {
      createPlayer();
    } else {
      (window as any).onYouTubeIframeAPIReady = createPlayer;
    }
  }, []);

  // Sync volume with players
  useEffect(() => {
    if (ytPlayer) {
      ytPlayer.setVolume(muted ? 0 : masterVolume * 100);
    }
    if (bgMusicRef.current) {
      bgMusicRef.current.volume = muted ? 0 : masterVolume;
    }
    if (hoverMusicRef.current) {
      hoverMusicRef.current.volume = muted ? 0 : 0.05; // soft hover sounds
    }
  }, [masterVolume, muted, ytPlayer]);

  // Handle Typewriter text loops
  useEffect(() => {
    const handleType = () => {
      const currentPhrase = typewriterPhrases[phraseIdx];
      if (!isDeleting) {
        setTypewriterText(currentPhrase.substring(0, charIdx + 1));
        setCharIdx(prev => prev + 1);

        if (charIdx + 1 === currentPhrase.length) {
          // Pause at end of sentence
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setTypewriterText(currentPhrase.substring(0, charIdx - 1));
        setCharIdx(prev => prev - 1);

        if (charIdx - 1 === 0) {
          setIsDeleting(false);
          setPhraseIdx(prev => (prev + 1) % typewriterPhrases.length);
        }
      }
    };

    const timer = setTimeout(handleType, isDeleting ? 40 : 80);
    return () => clearTimeout(timer);
  }, [charIdx, isDeleting, phraseIdx]);

  // Load profiles as pages come into view
  useEffect(() => {
    const loadAllProfiles = async () => {
      const results: Record<string, LanyardData> = {};
      const idsToFetch = [
        ...RECT_CONFIGS.map(c => c.discordId),
        ...MEMBER_CONFIGS.map(c => c.discordId),
        ...EXCLUSIVE_CONFIGS.map(c => c.discordId),
        ...THREATS_CONFIGS.map(c => c.discordId),
        ...BOTTOM_MEMBERS_CONFIGS.map(c => c.discordId)
      ];

      // De-duplicate
      const uniqueIds = Array.from(new Set(idsToFetch));

      await Promise.all(
        uniqueIds.map(async (id) => {
          try {
            const p = await fetchDiscordProfile(id);
            results[id] = p;
          } catch (e) {
            // Absorb
          }
        })
      );

      setProfiles(prev => ({ ...prev, ...results }));
    };

    loadAllProfiles();
  }, []);

  // Fetch Discord Guild Invites
  useEffect(() => {
    const fetchGuilds = async () => {
      const results: ServerCardData[] = [];
      await Promise.all(
        SERVER_INVITES.map(async (code) => {
          try {
            const res = await fetch(`https://discord.com/api/v9/invites/${code}?with_counts=true`);
            if (res.ok) {
              const data = await res.json();
              results.push({
                id: code,
                inviteId: code,
                name: data.guild?.name || code,
                membersOnline: data.approximate_presence_count || 12,
                membersTotal: data.approximate_member_count || 240,
                iconUrl: data.guild?.icon 
                  ? `https://cdn.discordapp.com/icons/${data.guild.id}/${data.guild.icon}.png` 
                  : undefined
              });
            } else {
              throw new Error('Fallback needed');
            }
          } catch (e) {
            // High fidelity fallback lists for servers marquee
            results.push({
              id: code,
              inviteId: code,
              name: code.charAt(0).toUpperCase() + code.slice(1) + ' Node',
              membersOnline: Math.floor(Math.random() * 45) + 5,
              membersTotal: Math.floor(Math.random() * 300) + 120,
            });
          }
        })
      );
      setServerCards(results);
    };

    fetchGuilds();
  }, []);

  // Background Videos state triggers as we scroll
  const [homeVideoPlaying, setHomeVideoPlaying] = useState(false);
  const [exclVideoPlaying, setExclVideoPlaying] = useState(false);

  useEffect(() => {
    // Scroll events for tab activation indicator & video playback
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;

      // Track active tabs based on viewport bounds
      const sections = ['home', 'members', 'exclusive', 'sliders', 'terminal', 'affiliates', 'threats', 'bottom-members'];
      for (const sec of sections) {
        const el = document.getElementById(`page-${sec === 'sliders' ? 'mscroll' : sec === 'terminal' ? 'term' : sec === 'bottom-members' ? 'bottom-members' : sec}`);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveTab(sec);
          }
        }
      }

      // Dynamic video loading triggers based on viewport position
      const homeSection = document.getElementById('page-home');
      const exclusiveSection = document.getElementById('page-exclusive');

      if (homeSection) {
        const rect = homeSection.getBoundingClientRect();
        setHomeVideoPlaying(rect.top < winHeight && rect.bottom > 0);
      }

      if (exclusiveSection) {
        const rect = exclusiveSection.getBoundingClientRect();
        setExclVideoPlaying(rect.top < winHeight && rect.bottom > 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle enter landing gateway click
  const handleEnterApp = () => {
    setEntered(true);
    setIsPlaying(true);
    if (ytPlayer) {
      ytPlayer.setVolume(muted ? 0 : masterVolume * 100);
      ytPlayer.playVideo();
    } else {
      if (bgMusicRef.current) {
        bgMusicRef.current.muted = false;
        bgMusicRef.current.currentTime = 9.2;
        bgMusicRef.current.play().catch(e => console.warn('Autoplay block:', e));
      }
    }
  };

  // Play profile card specific defaultMusic tracks (Taylor Swift on senko, etc.)
  const handleCardClickPlayMusic = (c: any, cardUsername: string, cardDisplayName: string) => {
    if (!entered) return;

    const configMusic = c.defaultMusic;
    if (!configMusic) return;

    setIsPlaying(true);

    // Pause YouTube player
    if (ytPlayer) {
      ytPlayer.pauseVideo();
    }

    // Play MP3
    if (bgMusicRef.current) {
      bgMusicRef.current.pause();
      bgMusicRef.current.src = configMusic;
      bgMusicRef.current.currentTime = 0;
      bgMusicRef.current.volume = muted ? 0 : masterVolume;
      bgMusicRef.current.play()
        .then(() => {
          setCurrentTrack({
            id: c.discordId,
            type: 'mp3',
            title: c.songName || 'Custom Track',
            artist: c.songArtist || `@${cardUsername}`,
            src: configMusic
          });
        })
        .catch((err) => {
          console.warn("Failed to play dynamic card sound:", err);
        });
    }
  };

  // Skip back to the main track (O Side Mafia starts at 54s)
  const resetToMainTrack = () => {
    setIsPlaying(true);
    if (bgMusicRef.current) {
      bgMusicRef.current.pause();
    }
    if (ytPlayer) {
      ytPlayer.seekTo(54);
      ytPlayer.setVolume(muted ? 0 : masterVolume * 100);
      ytPlayer.playVideo();
    }
    setCurrentTrack({
      id: 'main',
      type: 'youtube',
      title: "DONT FUCK WITH US",
      artist: "O Side Mafia"
    });
  };

  // Toggle play/pause
  const handleTogglePlay = () => {
    const nextState = !isPlaying;
    setIsPlaying(nextState);

    if (nextState) {
      if (currentTrack.type === 'youtube') {
        if (ytPlayer) {
          ytPlayer.playVideo();
        }
      } else {
        if (bgMusicRef.current) {
          bgMusicRef.current.play().catch((err) => {
            console.warn("Audio resume blocked by browser policy:", err);
          });
        }
      }
    } else {
      if (currentTrack.type === 'youtube') {
        if (ytPlayer) {
          ytPlayer.pauseVideo();
        }
      } else {
        if (bgMusicRef.current) {
          bgMusicRef.current.pause();
        }
      }
    }
  };

  // Hover Rect Sound controls - only dim background if playing primary youtube track
  const handleRectHover = (musicSrc: string) => {
    if (!entered || muted) return;
    
    if (currentTrack.type === 'youtube') {
      if (ytPlayer) {
        ytPlayer.setVolume(masterVolume * 25); // Dim YouTube
      }
      if (hoverMusicRef.current && musicSrc) {
        if (curHoverSrcRef.current !== musicSrc) {
          curHoverSrcRef.current = musicSrc;
          hoverMusicRef.current.src = musicSrc;
        }
        hoverMusicRef.current.currentTime = 0;
        hoverMusicRef.current.play().catch(() => {});
      }
    }
  };

  const handleRectHoverLeave = () => {
    if (!entered) return;

    if (currentTrack.type === 'youtube') {
      if (ytPlayer) {
        ytPlayer.setVolume(muted ? 0 : masterVolume * 100); // Full YouTube
      }
    }
    if (hoverMusicRef.current) {
      hoverMusicRef.current.pause();
    }
  };

  const getStatusRingColor = (status: LanyardData['discord_status']) => {
    return {
      online: '#43b581',
      idle: '#faa61a',
      dnd: '#f04747',
      offline: '#747f8d'
    }[status] || '#747f8d';
  };

  const getStatusTextLabel = (status: LanyardData['discord_status']) => {
    return {
      online: 'Online',
      idle: 'Idle',
      dnd: 'Do Not Disturb',
      offline: 'Offline'
    }[status] || 'Offline';
  };

  const getAvatarUrl = (user: LanyardData['discord_user']) => {
    if (!user.avatar) return 'https://cdn.discordapp.com/embed/avatars/0.png';
    const ext = user.avatar.startsWith('a_') ? 'gif' : 'png';
    return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${ext}?size=256`;
  };

  const handleScrollToSec = (secId: string) => {
    const el = document.getElementById(secId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white font-sans select-none overflow-x-hidden p-0 m-0">
      
      {/* Hidden sound engines */}
      <audio
        ref={bgMusicRef}
        src="https://hiphopkit.com/uploads/songs/O-Side-Mafia-Don-t-Fuck-With-Us.mp3"
        loop
        muted={muted}
        onError={(e) => {
          console.warn("Audio loading failed from primary link");
        }}
      />
      <audio
        ref={hoverMusicRef}
        muted={muted}
        loop
      />
      
      {/* Target element for YouTube iframe player mount */}
      <div id="youtube-player-element" style={{ position: 'fixed', width: '1px', height: '1px', opacity: 0, pointerEvents: 'none', bottom: 0, right: 0 }} />

      {/* Twinkling particle stars background */}
      <div className="effects select-none pointer-events-none absolute inset-0 overflow-hidden w-full h-full">
        {stars.map((star) => (
          <div
            key={star.id}
            className="star absolute bg-white rounded-full opacity-60"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animation: `twinkle 4s infinite ease-in-out`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}

        {/* Floating background chains */}
        {chains.map((chain) => (
          <div
            key={chain.id}
            className="chain font-mono text-zinc-800 opacity-20 absolute text-3xl"
            style={{
              left: `${chain.left}%`,
              animation: `floatChain ${chain.duration}s linear infinite`,
              animationDelay: `${chain.delay}s`,
            }}
          >
            🔗
          </div>
        ))}
      </div>

      {/* Dynamic Cyberpunk Media Station & Controller */}
      {entered && (
        <div className="fixed bottom-6 right-6 z-[999] flex flex-col gap-2.5 bg-zinc-950/90 backdrop-blur-xl border border-zinc-800/85 rounded-2xl p-4 shadow-2xl select-none max-w-[290px] w-[290px] transition duration-500 hover:border-zinc-500/50">
          
          {/* Track Info Overlay */}
          <div className="flex items-center gap-3">
            {/* Spinning disk graphic */}
            <div className={`relative w-10 h-10 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center shrink-0 overflow-hidden ${!muted ? 'animate-[spin_4s_linear_infinite]' : ''}`}>
              <div className="absolute inset-2 rounded-full border border-zinc-800 bg-black flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-zinc-600" />
              </div>
              <Activity size={10} className="text-zinc-500 absolute" />
            </div>
            
            {/* Metadata texts */}
            <div className="min-w-0 flex-1">
              <div className="text-[11px] font-bold text-white font-sans tracking-wide truncate">
                {currentTrack.title}
              </div>
              <div className="text-[9px] text-zinc-400 font-mono truncate">
                {currentTrack.artist}
              </div>
            </div>

            {/* Simulated sound-bars animation */}
            <div className="flex items-end gap-0.5 h-4 select-none pb-0.5">
              <span className={`w-0.5 bg-white/60 rounded-full h-2 ${muted ? 'h-0.5' : 'animate-[bounce_0.8s_infinite]'}`} />
              <span className={`w-0.5 bg-white/70 rounded-full h-3 ${muted ? 'h-0.5' : 'animate-[bounce_0.6s_infinite_delay-150ms]'}`} />
              <span className={`w-0.5 bg-white/55 rounded-full h-1.5 ${muted ? 'h-0.5' : 'animate-[bounce_0.9s_infinite_delay-300ms]'}`} />
              <span className={`w-0.5 bg-white/80 rounded-full h-4 ${muted ? 'h-0.5' : 'animate-[bounce_0.7s_infinite_delay-100ms]'}`} />
            </div>
          </div>

          {/* Quick jump to lyric button specifically based on user instruction */}
          <button
            onClick={() => {
              if (currentTrack.type === 'youtube') {
                if (ytPlayer) {
                  ytPlayer.seekTo(54);
                  setMuted(false);
                  ytPlayer.setVolume(masterVolume * 100);
                  ytPlayer.playVideo();
                }
              } else {
                resetToMainTrack();
              }
            }}
            className="w-full py-1.5 px-3 rounded-lg bg-zinc-900 hover:bg-white text-zinc-400 hover:text-black font-mono text-[9px] text-center border border-zinc-800 hover:border-white transition-all cursor-pointer font-medium tracking-tight uppercase"
            title="Instant skip action control"
          >
            {currentTrack.type === 'youtube' ? '🔊 Jump in at 54s lyric trigger' : '🔊 Reset back to Main Track'}
          </button>

          {/* Slider & Actions Row */}
          <div className="flex items-center gap-2.5 pt-1 border-t border-zinc-900">
            <button
              onClick={handleTogglePlay}
              className="text-zinc-400 hover:text-white transition duration-200 cursor-pointer"
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={15} /> : <Play size={15} />}
            </button>

            <button
              onClick={() => setMuted(!muted)}
              className="text-zinc-400 hover:text-white transition duration-200 cursor-pointer"
            >
              {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
            </button>
            
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={masterVolume}
              onChange={(e) => {
                setMasterVolume(parseFloat(e.target.value));
                if (muted) setMuted(false);
              }}
              className="flex-1 accent-white h-1 bg-zinc-800 rounded-full appearance-none cursor-pointer"
            />
            <span className="text-zinc-400 font-mono text-[9px]">
              {muted ? '0%' : `${Math.round(masterVolume * 100)}%`}
            </span>
          </div>
        </div>
      )}

      {/* Nav Menu */}
      {entered && (
        <nav className="nav-menu select-none">
          <span
            onClick={() => handleScrollToSec('page-home')}
            className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
          >
            Home
          </span>
          <span
            onClick={() => handleScrollToSec('page-members')}
            className={`nav-item ${activeTab === 'members' ? 'active' : ''}`}
          >
            Members
          </span>
          <span
            onClick={() => handleScrollToSec('page-exclusive')}
            className={`nav-item ${activeTab === 'exclusive' ? 'active' : ''}`}
          >
            Exclusive
          </span>
          <span
            onClick={() => handleScrollToSec('page-mscroll')}
            className={`nav-item ${activeTab === 'sliders' ? 'active' : ''}`}
          >
            Sliders
          </span>
          <span
            onClick={() => handleScrollToSec('page-term')}
            className={`nav-item ${activeTab === 'terminal' ? 'active' : ''}`}
          >
            Terminal
          </span>
          <span
            onClick={() => handleScrollToSec('page-affiliates')}
            className={`nav-item ${activeTab === 'affiliates' ? 'active' : ''}`}
          >
            Affiliates
          </span>
          <span
            onClick={() => handleScrollToSec('page-threats')}
            className={`nav-item ${activeTab === 'threats' ? 'active' : ''}`}
          >
            Threats
          </span>
          <span
            onClick={() => handleScrollToSec('page-bottom-members')}
            className={`nav-item ${activeTab === 'bottom-members' ? 'active' : ''}`}
          >
            Bottom Members
          </span>
        </nav>
      )}

      {/* Entrance Click-to-Gate Screen */}
      {!entered && <IntroGate onEnter={handleEnterApp} />}

      {/* Main Pages Scrolling container */}
      {entered && (
        <main className="relative z-10 w-full">

          {/* PAGE 1: HOME */}
          <section id="page-home" className="page relative min-h-screen flex flex-col justify-between py-12 transition-all duration-1000">
            {/* Ambient Background blur vide */}
            <video
              className={`page-video ${homeVideoPlaying ? 'playing' : ''}`}
              src="https://file.garden/aWEjqj03KS-m2Cfz/arcs/arcsendo.mp4"
              loop
              muted
              playsInline
              autoPlay
            />
            {/* Parallax standard banner background image */}
            <div
              className="page-background"
              style={{ backgroundImage: `url('https://file.garden/aWEjqj03KS-m2Cfz/arcs/arcsbg.png')` }}
            />
            <div className="page-overlay" />

            {/* floating logo visual banner */}
            <div className="logo-container select-none select-none mt-12 shrink-0">
              <img
                src="https://file.garden/aWEjqj03KS-m2Cfz/arcs/arcsind.png"
                alt="arcsendo banner logo"
                className="mx-auto"
                onClick={() => handleScrollToSec('page-members')}
                referrerPolicy="no-referrer"
              />
            </div>

            {/* HOF Section: Six Rectangles Container */}
            <div className="rectangles-container shrink-0 select-none">
              {RECT_CONFIGS.map((c, idx) => {
                const profile = profiles[c.discordId];
                const activeId = idx + 1;
                const isMobileExpanded = expandedMobileRect === activeId;
                const username = profile?.discord_user.username || '...';
                const displayName = profile?.discord_user.display_name || '...';
                const avatar = profile ? getAvatarUrl(profile.discord_user) : 'https://cdn.discordapp.com/embed/avatars/0.png';
                const discordStatus = profile?.discord_status || 'offline';
                const statusColor = getStatusRingColor(discordStatus);
                const statusText = getStatusTextLabel(discordStatus);

                return (
                  <div
                    key={c.discordId}
                    className="relative pb-6"
                    style={{ overflow: 'visible' }}
                  >
                    <div
                      id={`rect-${activeId}`}
                      className={`rectangle ${isMobileExpanded ? 'mobile-expanded' : ''}`}
                      onMouseEnter={() => handleRectHover(c.defaultMusic)}
                      onMouseLeave={handleRectHoverLeave}
                      onClick={() => {
                        if (expandedMobileRect === activeId) {
                          setExpandedMobileRect(null);
                        } else {
                          setExpandedMobileRect(activeId);
                        }
                        handleCardClickPlayMusic(c, username, displayName);
                      }}
                    >
                      {/* Top sliding cover background banner */}
                      <div
                        className="banner"
                        id={`banner-${activeId}`}
                        style={{ backgroundImage: `url('${c.banner}')` }}
                      />

                      {/* Middle suspended circular layout avatar wrapper */}
                      <div className="avatar-wrap">
                        <div
                          className="avatar-circle"
                          style={{ backgroundImage: `url('${avatar}')` }}
                        >
                          <div
                            className="status-dot"
                            style={{ background: statusColor }}
                          />
                        </div>
                      </div>

                      {/* Sliding profile hover dynamic information display details */}
                      <div className="rect-info flex flex-col justify-start">
                        <div className="rect-username select-none text-white font-bold font-sans">
                          {displayName}
                        </div>
                        <div className="rect-tag select-none text-[10px] text-zinc-400 mb-1">
                          @{username}
                        </div>
                        
                        {/* Subtitle status row details */}
                        <div className="rect-status-text font-mono text-[9px] text-zinc-400 select-none gap-1 py-0.5">
                          <span
                            className="dot-small rounded-full"
                            style={{ background: statusColor, width: '6px', height: '6px' }}
                          />
                          {statusText}
                        </div>

                        {/* Custom active Spotify presence tracker inside home card */}
                        {profile?.spotify && (
                          <div className="rect-spotify active">
                            <img
                              src={profile.spotify.album_art_url}
                              className="rect-spotify-art"
                              alt="spotify art"
                              referrerPolicy="no-referrer"
                            />
                            <div className="min-w-0 flex-1 text-left">
                              <div className="rect-spotify-song truncate font-bold py-0.5">
                                {profile.spotify.song}
                              </div>
                              <div className="rect-spotify-artist truncate select-none text-[8px]">
                                by {profile.spotify.artist}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Suspended static bottom tag caption - now outside the overflow hidden container, fully visible */}
                    <div className="name-text-bottom text-center select-none truncate max-w-[125px] font-mono whitespace-nowrap">
                      @{username}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>


          {/* PAGE 2: MEMBERS */}
          <section id="page-members" className="page relative min-h-screen py-16 transition-all duration-1000 bg-black/60">
            {/* Standard static members overlay background image styling */}
            <div
              className="page-background opacity-25"
              style={{ backgroundImage: `url('https://file.garden/aWEjqj03KS-m2Cfz/arcs/arcs.png')` }}
            />
            <div className="page-overlay" />

            <h1 className="members-title select-none">
              Threat to Everyone
            </h1>

            {/* Twelve Members Grid listing layout */}
            <div className="member-grid">
              {MEMBER_CONFIGS.map((m, idx) => {
                const profile = profiles[m.discordId];
                const activeId = idx + 1;
                const isMobileExpanded = expandedMobileMember === activeId;
                const username = profile?.discord_user.username || '...';
                const displayName = profile?.discord_user.display_name || '...';
                const avatar = profile ? getAvatarUrl(profile.discord_user) : 'https://cdn.discordapp.com/embed/avatars/0.png';
                const discordStatus = profile?.discord_status || 'offline';
                const statusColor = getStatusRingColor(discordStatus);
                const statusText = getStatusTextLabel(discordStatus);

                // Fetch real dynamic discord banner if lanyard resolves it, otherwise beautiful fallbacks
                const cardBanner = (profile?.discord_user.banner)
                  ? `https://cdn.discordapp.com/banners/${profile.discord_user.id}/${profile.discord_user.banner}.png?size=1024`
                  : m.defaultBanner;

                return (
                  <div
                    key={m.discordId}
                    className={`member-card relative ${isMobileExpanded ? 'mobile-expanded' : ''}`}
                    onClick={() => {
                      if (expandedMobileMember === activeId) {
                        setExpandedMobileMember(null);
                      } else {
                        setExpandedMobileMember(activeId);
                      }
                      handleCardClickPlayMusic(m, username, displayName);
                    }}
                  >
                    {/* Background slide element banner */}
                    <div
                      className="member-card-banner opacity-70"
                      style={{ backgroundImage: `url('${cardBanner}')` }}
                    />
                    <div className="member-card-overlay" />

                    {/* Avatar structure */}
                    <div className="member-avatar-wrap">
                      <div
                        className="member-avatar"
                        style={{ backgroundImage: `url('${avatar}')` }}
                      >
                        <div
                          className="member-status-ring"
                          style={{ background: statusColor, boxShadow: `0 0 8px ${statusColor}` }}
                        />
                      </div>
                    </div>

                    {/* Dynamic information slide on hover layout */}
                    <div className="member-info text-left">
                      <div className="member-name truncate">{displayName}</div>
                      <div className="member-tag select-none text-zinc-500 text-xs">@{username}</div>
                      
                      <div className="member-status-row font-mono text-[9px] gap-1 items-center select-none text-zinc-400">
                        <span
                          className="member-status-dot rounded-full"
                          style={{ background: statusColor }}
                        />
                        {statusText}
                      </div>

                      {/* Embed active Spotify presence information details if listening list exists */}
                      {profile?.spotify && (
                        <div className="member-spotify active">
                          <img
                            src={profile.spotify.album_art_url}
                            className="member-spotify-art rounded"
                            alt="spotify"
                            referrerPolicy="no-referrer"
                          />
                          <div className="min-w-0 flex-1 select-none">
                            <div className="member-spotify-song truncate text-white leading-normal text-[10px]">
                              {profile.spotify.song}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>


          {/* PAGE 3: EXCLUSIVE SLOTS SECTION */}
          <section id="page-exclusive" className="page min-h-screen py-16 flex flex-col justify-start bg-black/45">
            <video
              className={`page-video ${exclVideoPlaying ? 'playing' : ''}`}
              src="https://file.garden/aWEjqj03KS-m2Cfz/arcs/arcsendo.mp4"
              loop
              muted
              playsInline
              autoPlay
            />
            <div className="page-overlay" />

            <h2 className="exclusive-title select-none">
              Exclusive Slots
            </h2>
            <div className="exclusive-sub select-none mb-10 text-center">
              syndicate members_
            </div>

            {/* Exclusive slots grid */}
            <div className="exclusive-grid">
              {EXCLUSIVE_CONFIGS.map((e, idx) => {
                const profile = profiles[e.discordId];
                const activeId = idx + 1;
                const isMobileExpanded = expandedMobileExcl === activeId;
                const username = profile?.discord_user.username || '...';
                const displayName = profile?.discord_user.display_name || '...';
                const avatar = profile ? getAvatarUrl(profile.discord_user) : 'https://cdn.discordapp.com/embed/avatars/0.png';
                const discordStatus = profile?.discord_status || 'offline';
                const statusColor = getStatusRingColor(discordStatus);
                const statusText = getStatusTextLabel(discordStatus);

                const cardBanner = (profile?.discord_user.banner)
                  ? `https://cdn.discordapp.com/banners/${profile.discord_user.id}/${profile.discord_user.banner}.png?size=512`
                  : 'https://file.garden/aWEjqj03KS-m2Cfz/arcs/arcsendo.png';

                return (
                  <div
                    key={e.discordId}
                    className={`excl-slot relative ${isMobileExpanded ? 'mobile-expanded' : ''}`}
                    onClick={() => {
                      if (expandedMobileExcl === activeId) {
                        setExpandedMobileExcl(null);
                      } else {
                        setExpandedMobileExcl(activeId);
                      }
                      handleCardClickPlayMusic(e, username, displayName);
                    }}
                  >
                    {/* Ring frame */}
                    <div className="excl-avatar-ring">
                      <div
                        className="excl-avatar-inner"
                        style={{ backgroundImage: `url('${avatar}')` }}
                      >
                        <div
                          className="excl-status-badge"
                          style={{ background: statusColor, boxShadow: `0 0 8px ${statusColor}` }}
                        />
                      </div>
                    </div>

                    <div className="excl-label mt-3 select-none text-zinc-400">
                      @{username}
                    </div>

                    {/* Integrated Hover Glassmorphic Popup details */}
                    <div className="excl-popup text-left">
                      {/* Banner cover */}
                      <div
                        className="excl-popup-banner relative"
                        style={{ backgroundImage: `url('${cardBanner}')` }}
                      />
                      
                      <div className="excl-popup-body px-4 pb-4">
                        <div className="excl-popup-avatar-wrap">
                          <div
                            className="excl-popup-avatar"
                            style={{ backgroundImage: `url('${avatar}')` }}
                          >
                            <div
                              className="excl-popup-status-dot"
                              style={{ background: statusColor }}
                            />
                          </div>
                        </div>

                        <div className="excl-popup-name truncate text-white py-0.5">
                          {displayName}
                        </div>
                        <div className="excl-popup-tag select-none text-[11px] text-zinc-500 mb-2">
                          @{username}
                        </div>

                        <div className="excl-popup-status-row font-mono text-[9px] gap-1 items-center select-none text-zinc-400">
                          <span
                            className="excl-popup-dot rounded-full"
                            style={{ background: statusColor }}
                          />
                          {statusText}
                        </div>

                        {/* Custom activities line details */}
                        {profile && profile.activities && profile.activities.length > 0 && (
                          <div className="excl-popup-activity active">
                            <div className="excl-popup-activity-title">Playing</div>
                            <div className="excl-popup-activity-name truncate">
                              {profile.activities[0].name} {profile.activities[0].state ? `— ${profile.activities[0].state}` : ''}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>


          {/* PAGE 4: INFINITE SLIDERS (MARQUEE_STRIP) */}
          <section id="page-mscroll" className="page relative min-h-screen py-12 flex flex-col justify-center items-center">
            {/* Static marquee theme background texture layer */}
            <div className="mscroll-bg" />
            <div className="mscroll-overlay" />

            <h2 className="mscroll-label select-none relative z-10 index-10">
              elite network members
            </h2>

            {/* Seamless sliding dual rows */}
            <div className="mscroll-strip relative z-10 w-full mt-10">
              <MarqueeStrip
                memberIds={MARQUEE_IDS}
                onHoverItem={(e, profile) => {
                  if (!profile) return;
                  setTooltipProfile(profile);
                  setTooltipPos({ x: e.clientX, y: e.clientY - 120 });
                  setTooltipVisible(true);
                }}
                onLeaveItem={() => {
                  setTooltipVisible(false);
                }}
              />
            </div>

            {/* Float dynamic HTML UI tooltip wrapper for marquee row elements */}
            {tooltipVisible && tooltipProfile && (
              <div
                id="msm-tooltip"
                className="visible font-sans"
                style={{
                  left: `${tooltipPos.x}px`,
                  top: `${tooltipPos.y}px`,
                  transform: 'translate(-50%, -100%)',
                  position: 'fixed'
                }}
              >
                <div className="msm-tip-top flex items-center gap-3">
                  <div
                    className="msm-tooltip-av rounded-full"
                    style={{ backgroundImage: `url('${getAvatarUrl(tooltipProfile.discord_user)}')` }}
                  >
                    <div
                      className="msm-tooltip-sdot"
                      style={{ background: getStatusRingColor(tooltipProfile.discord_status) }}
                    />
                  </div>

                  <div className="msm-tooltip-info text-left min-w-0 flex-1">
                    <div className="msm-tooltip-name truncate py-0.5 font-bold">
                      {tooltipProfile.discord_user.display_name}
                    </div>
                    <div className="msm-tooltip-status font-mono text-[9px] gap-1 items-center text-zinc-400 select-none">
                      <span
                        className="msm-tooltip-sdot-inline rounded-full"
                        style={{ background: getStatusRingColor(tooltipProfile.discord_status), width: '6px', height: '6px' }}
                      />
                      {getStatusTextLabel(tooltipProfile.discord_status)}
                    </div>
                  </div>
                </div>

                {/* Spotify status details */}
                {tooltipProfile.spotify && (
                  <div className="msm-tip-activity show">
                    <div className="msm-tip-act-label select-none text-[8px] text-zinc-500 font-bold uppercase tracking-wider">
                      Listening to Spotify
                    </div>
                    <div className="msm-tip-act-name truncate font-medium text-white text-[11px] py-0.5">
                      {tooltipProfile.spotify.song}
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>


          {/* PAGE 5: TERMINAL CONSOLE PANEL */}
          <section id="page-term" className="page relative min-h-screen py-16 flex flex-col justify-center items-center">
            <div
              className="page-background opacity-25"
              style={{ backgroundImage: `url('https://file.garden/aWEjqj03KS-m2Cfz/arcs/arcs.png')` }}
            />
            <div className="page-overlay" />

            <div className="container max-w-4xl mx-auto px-4 z-20 w-full">
              <TerminalShell />
            </div>
          </section>


          {/* PAGE 6: AFFILIATES Bento-Styled Card Panel */}
          <section id="page-affiliates" className="page relative min-h-screen py-16 flex flex-col justify-center bg-black/40">
            {/* Radial layout visual theme layer ambient mesh */}
            <div className="page-background opacity-35" />
            <div className="page-overlay" />

            {/* Bento-Visual Container layout box */}
            <div className="affiliates-container relative z-10 mx-auto select-none p-8 max-w-3xl w-full">
              <div className="affiliates-eyebrow select-none">
                ARCSENDO ALLIANCE
              </div>
              <h2 className="affiliates-title select-none mt-2">
                Allied Servers Node
              </h2>
              <div className="affiliates-divider mx-auto my-4 h-[2px] w-20 bg-zinc-800" />

              {/* Typewriter text line container wrapper */}
              <div className="typing-text h-16 flex items-center justify-center font-mono text-zinc-400 select-none text-sm px-6">
                {typewriterText}
              </div>

              {/* Action grid nodes button linkers */}
              <div className="join-btn-wrap flex flex-row items-center justify-center gap-4 mt-8">
                <a
                  href="https://discord.gg/arcsendo"
                  target="_blank"
                  rel="noreferrer"
                  className="join-btn flex items-center gap-2 px-6 py-3 cursor-pointer"
                >
                  <Shield size={16} />
                  Join arcsendo
                </a>
              </div>
            </div>

            {/* Allied server scrolls sliders queue */}
            <div className="server-scroll-section relative z-10 w-full mt-12 select-none overflow-hidden pb-4">
              <div className="server-scroll-label select-none">
                connected syndicate networks
              </div>

              <div className="server-scroll-fade">
                <div className="server-scroll-track gap-4">
                  {serverCards.map((srv, idx) => (
                    <a
                      key={`${srv.id}-${idx}`}
                      href={`https://discord.gg/${srv.inviteId}`}
                      target="_blank"
                      rel="noreferrer"
                      className="server-card hover:translate-y-[-4px] transition duration-300"
                    >
                      {srv.iconUrl ? (
                        <img
                          src={srv.iconUrl}
                          className="server-icon rounded"
                          alt={srv.name}
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="server-icon-placeholder">
                          {srv.name.charAt(0).toUpperCase()}
                        </div>
                      )}

                      <div className="server-info ml-2 min-w-0">
                        <div className="server-name truncate">{srv.name}</div>
                        <div className="server-meta flex items-center gap-1">
                          <span className="server-dot w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#43b581]" />
                          <span className="text-zinc-500 font-mono text-[9px]">
                            {srv.membersOnline} Online / {srv.membersTotal} members
                          </span>
                        </div>
                      </div>

                      <ChevronRight size={14} className="text-zinc-400 ml-auto shrink-0" />
                    </a>
                  ))}
                  {/* Seamless loop duplicates */}
                  {serverCards.map((srv, idx) => (
                    <a
                      key={`${srv.id}-clone-${idx}`}
                      href={`https://discord.gg/${srv.inviteId}`}
                      target="_blank"
                      rel="noreferrer"
                      className="server-card hover:translate-y-[-4px] transition duration-300"
                    >
                      {srv.iconUrl ? (
                        <img
                          src={srv.iconUrl}
                          className="server-icon rounded"
                          alt={srv.name}
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="server-icon-placeholder">
                          {srv.name.charAt(0).toUpperCase()}
                        </div>
                      )}

                      <div className="server-info ml-2 min-w-0">
                        <div className="server-name truncate">{srv.name}</div>
                        <div className="server-meta flex items-center gap-1">
                          <span className="server-dot w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#43b581]" />
                          <span className="text-zinc-500 font-mono text-[9px]">
                            {srv.membersOnline} Online / {srv.membersTotal} members
                          </span>
                        </div>
                      </div>

                      <ChevronRight size={14} className="text-zinc-400 ml-auto shrink-0" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* PAGE 7: THREATS SECTION ABOVE MEMBERS */}
          <section id="page-threats" className="page relative min-h-screen py-24 flex flex-col justify-center items-center">
            <div
              className="page-background opacity-25"
              style={{ backgroundImage: `url('https://file.garden/aWEjqj03KS-m2Cfz/arcs/arcs.png')` }}
            />
            <div className="page-overlay" />

            <div className="container max-w-5xl mx-auto px-4 z-20 w-full text-center">
              <div className="flex items-center justify-center gap-2 mb-2 select-none">
                <Shield size={16} className="text-red-500 animate-pulse" />
                <span className="text-[10px] uppercase tracking-[0.25em] text-red-500/85 font-mono font-bold">SYNDICATE SECURITY ALERTS</span>
              </div>
              <h2 className="members-title mt-2 mb-4 select-none" style={{ background: 'linear-gradient(45deg, #ff3333, #ffffff, #ff6666)' }}>
                THREATS
              </h2>
              <div className="affiliates-divider mx-auto my-3 h-[2px] w-20 bg-red-900/60" />
              <p className="text-zinc-500 max-w-md mx-auto mb-12 text-xs font-mono select-none">
                priority indicators list • real-time telemetry feed
              </p>

              {/* Row of 3 custom styled Threat cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto w-full px-4">
                {THREATS_CONFIGS.map((t, idx) => {
                  const profile = profiles[t.discordId];
                  const username = profile?.discord_user.username || '...';
                  const displayName = profile?.discord_user.display_name || '...';
                  const avatar = profile ? getAvatarUrl(profile.discord_user) : 'https://cdn.discordapp.com/embed/avatars/0.png';
                  const discordStatus = profile?.discord_status || 'offline';
                  const statusColor = getStatusRingColor(discordStatus);
                  const statusText = getStatusTextLabel(discordStatus);

                  const bannerImg = t.banner || 'https://file.garden/aWEjqj03KS-m2Cfz/arcs/arcsendo.png';

                  return (
                    <div
                      key={t.discordId}
                      className="group relative cursor-pointer border border-red-950/40 bg-zinc-950/80 hover:border-red-500/30 rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_0_35px_rgba(239,68,68,0.12)] flex flex-col justify-end p-5 h-[360px] w-full"
                      onClick={() => handleCardClickPlayMusic(t, username, displayName)}
                    >
                      {/* Banner cover region */}
                      <div
                        className="absolute inset-x-0 top-0 h-[48%] bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                        style={{ backgroundImage: `url('${bannerImg}')` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-950/80 to-zinc-950" />
                      </div>

                      {/* Floating glowing avatar profile wrapper */}
                      <div className="absolute top-[34%] left-1/2 -translate-x-1/2 z-10 select-none">
                        <div className="relative w-18 h-18 rounded-full border-2 border-red-500/20 shadow-2xl overflow-hidden bg-zinc-900">
                          <img src={avatar} className="w-full h-full object-cover rounded-full" alt="Threat Operative" referrerPolicy="no-referrer" />
                        </div>
                        <div
                          className="absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-zinc-950"
                          style={{ backgroundColor: statusColor }}
                        />
                      </div>

                      {/* Meta segment */}
                      <div className="relative z-10 mt-auto text-center pt-8">
                        <h3 className="text-white font-extrabold text-sm tracking-wide group-hover:text-red-400 transition-colors">
                          {displayName}
                        </h3>
                        <p className="text-[10px] text-zinc-500 font-mono mt-0.5">@{username}</p>

                        <div className="flex items-center justify-center gap-1.5 mt-2.5">
                          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: statusColor }} />
                          <span className="text-[9px] font-mono tracking-wider text-zinc-400 uppercase">{statusText}</span>
                        </div>

                        {t.songName && (
                          <div className="mt-4 flex items-center justify-center gap-1 bg-red-950/15 py-1.5 px-3 rounded-full border border-red-900/10 max-w-[180px] mx-auto select-none">
                            <Music size={10} className="text-red-400 animate-pulse shrink-0" />
                            <span className="text-[9px] text-red-300 font-mono font-medium truncate">{t.songName}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* PAGE 8: MEMBERS LANDSCAPE SECTION */}
          <section id="page-bottom-members" className="page relative min-h-screen py-24 flex flex-col justify-center items-center">
            <div
              className="page-background opacity-15"
              style={{ backgroundImage: `url('https://file.garden/aWEjqj03KS-m2Cfz/arcs/arcs.png')` }}
            />
            <div className="page-overlay" />

            <div className="container max-w-4xl mx-auto px-4 z-20 w-full text-center">
              <div className="flex items-center justify-center gap-2 mb-2 select-none">
                <Users size={16} className="text-white animate-pulse" />
                <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-300 font-mono font-bold">OPERATIVE INTEGRATION NODES</span>
              </div>
              <h2 className="members-title mt-2 mb-4 select-none">
                MEMBERS
              </h2>
              <div className="affiliates-divider mx-auto my-3 h-[2px] w-20 bg-zinc-800" />
              <p className="text-zinc-500 max-w-md mx-auto mb-12 text-xs font-mono select-none">
                allied syndicate directory • click for custom audio track
              </p>

              {/* Stack of 5 landscape-oriented member cards */}
              <div className="flex flex-col gap-5 max-w-3xl mx-auto w-full px-4">
                {BOTTOM_MEMBERS_CONFIGS.map((m) => {
                  const profile = profiles[m.discordId];
                  const username = profile?.discord_user.username || '...';
                  const displayName = profile?.discord_user.display_name || '...';
                  const avatar = profile ? getAvatarUrl(profile.discord_user) : 'https://cdn.discordapp.com/embed/avatars/0.png';
                  const discordStatus = profile?.discord_status || 'offline';
                  const statusColor = getStatusRingColor(discordStatus);
                  const statusText = getStatusTextLabel(discordStatus);

                  const bannerImg = m.banner || 'https://file.garden/aWEjqj03KS-m2Cfz/arcs/arcsendo.png';
                  const songToShow = m.songName || (profile?.spotify ? profile.spotify.song : '');
                  const artistToShow = m.songArtist || (profile?.spotify ? profile.spotify.artist : '');

                  return (
                    <div
                      key={m.discordId}
                      className="group relative flex flex-col md:flex-row items-stretch rounded-2xl border border-zinc-900 bg-zinc-950/70 backdrop-blur-md overflow-hidden transition-all duration-500 hover:border-zinc-700/50 hover:shadow-[0_12px_40px_rgba(255,255,255,0.02)] cursor-pointer"
                      style={{ minHeight: '150px' }}
                      onClick={() => handleCardClickPlayMusic(m, username, displayName)}
                    >
                      {/* Banner sidebar preview wrapper */}
                      <div
                        className="relative w-full md:w-[28%] bg-cover bg-center min-h-[90px] md:min-h-full transition-transform duration-700 group-hover:scale-105 shrink-0 select-none"
                        style={{ backgroundImage: `url('${bannerImg}')` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-950/60 to-zinc-950" />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-950/60 to-zinc-950 md:hidden" />
                      </div>

                      {/* Avatar indicators layout */}
                      <div className="flex items-center px-6 py-4 md:py-0 shrink-0 select-none relative z-10">
                        <div className="relative w-16 h-16 rounded-full border-2 border-zinc-800 p-0.5 overflow-hidden transition-all duration-500 group-hover:border-white/30 bg-zinc-900">
                          <img src={avatar} className="w-full h-full object-cover rounded-full" alt="Syndicate Operative" referrerPolicy="no-referrer" />
                        </div>
                        <div
                          className="absolute transform translate-x-[42px] translate-y-[20px] w-4.5 h-4.5 rounded-full border-3 border-zinc-950 z-20 shadow-md"
                          style={{ backgroundColor: statusColor }}
                        />
                      </div>

                      {/* Landscape description card wrapper details */}
                      <div className="flex-1 flex flex-col justify-center p-5 text-left min-w-0 z-10">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div>
                            <h3 className="text-white font-extrabold text-base tracking-wide group-hover:text-zinc-300 transition-colors">
                              {displayName}
                            </h3>
                            <p className="text-xs text-zinc-500 font-mono">@{username}</p>
                          </div>

                          <div className="flex items-center gap-1.5 select-none sm:self-start">
                            <span className="w-1.5 h-1.5 rounded-full shadow-[0_0_6px_currentColor]" style={{ color: statusColor, backgroundColor: statusColor }} />
                            <span className="text-[9px] font-mono tracking-widest text-zinc-400 uppercase">{statusText}</span>
                          </div>
                        </div>

                        {/* Interactive dynamic audio presence label */}
                        {songToShow && (
                          <div className="mt-3 flex items-center gap-2.5 bg-zinc-900/30 border border-zinc-850/50 py-1.5 px-3 rounded-xl max-w-sm select-none">
                            <Music size={11} className="text-zinc-400 animate-spin" style={{ animationDuration: '6s' }} />
                            <div className="min-w-0 flex-1">
                              <p className="text-[10px] text-zinc-300 truncate font-mono">
                                {songToShow} <span className="text-zinc-500">by {artistToShow || 'Operative'}</span>
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

        </main>
      )}
    </div>
  );
};

export default App;
