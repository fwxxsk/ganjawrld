import React, { useState, useEffect, useRef } from 'react';

// Art ascii derived from decrypted_script.js
const ASCII_ART = `
 █████  ██████   ██████ ███████ ███████ ███    ██ ██████   ██████  
██   ██ ██   ██ ██      ██      ██      ████   ██ ██   ██ ██    ██ 
███████ ██████  ██      ███████ █████   ██ ██  ██ ██   ██ ██    ██ 
██   ██ ██   ██ ██      _     ██ ██     ██  ██ ██ ██   ██ ██    ██ 
██   ██ ██   ██  ██████ ███████ ███████ ██   ████ ██████   ██████  
`;

interface TerminalLine {
  text: string;
  type: 'info' | 'dim' | 'success' | 'white' | 'hacker';
}

export const TerminalShell: React.FC = () => {
  const [history, setHistory] = useState<TerminalLine[]>([
    { text: 'arcsendo [Version 1.0.4]', type: 'dim' },
    { text: '(c) arcsendo. All rights reserved.', type: 'dim' },
    { text: '', type: 'white' },
    { text: 'Type "help" to view list of active commands.', type: 'info' },
    { text: '', type: 'white' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [hollywoodMode, setHollywoodMode] = useState(false);
  const [hollywoodLines, setHollywoodLines] = useState<string[]>([]);
  const termBodyRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll terminal to bottom on change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, hollywoodLines, hollywoodMode]);

  // Hollywood green digital waterfall simulation
  useEffect(() => {
    if (!hollywoodMode) return;

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+=[]{}|;:',./<>?";
    const generateHackerLine = () => {
      let line = "";
      const len = Math.floor(Math.random() * 40) + 30;
      for (let i = 0; i < len; i++) {
        line += chars[Math.floor(Math.random() * chars.length)];
      }
      return `[root@arcsendo]~# ${line}`;
    };

    const interval = setInterval(() => {
      setHollywoodLines(prev => {
        const next = [...prev, generateHackerLine()];
        if (next.length > 50) next.shift(); // Keep logs memory clean
        return next;
      });
    }, 70);

    return () => clearInterval(interval);
  }, [hollywoodMode]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputValue.trim().toLowerCase();
    if (!cmd) return;

    const cmdLine = { text: `root@arcsendo:~# ${inputValue}`, type: 'white' as const };
    setInputValue('');

    // Handle Hollywood abort on any command
    if (hollywoodMode) {
      setHollywoodMode(false);
      setHollywoodLines([]);
      setHistory(prev => [
        ...prev,
        { text: 'Hollywood terminal sequence aborted.', type: 'info' }
      ]);
      return;
    }

    switch (cmd) {
      case 'help':
        setHistory(prev => [
          ...prev,
          cmdLine,
          { text: 'Core Commands:', type: 'success' },
          { text: '  help       - Display this assistance manual', type: 'info' },
          { text: '  about      - Background briefing on arcsendo', type: 'info' },
          { text: '  clear      - Polish terminal console history', type: 'info' },
          { text: '  socials    - Connected channels and invites', type: 'info' },
          { text: '  arcsendo   - Initiate high speed cyber breach script', type: 'info' },
        ]);
        break;

      case 'about':
        setHistory(prev => [
          ...prev,
          cmdLine,
          { text: 'arcsendo represents the pinnacle of underground community architecture, establishing supreme bio portfolios and security syndicates.', type: 'info' },
          { text: 'We don\'t end debates, we end eras.', type: 'success' }
        ]);
        break;

      case 'clear':
        setHistory([]);
        break;

      case 'socials':
        setHistory(prev => [
          ...prev,
          cmdLine,
          { text: 'Connecting to server nodes...', type: 'dim' },
          { text: 'Discord Server: https://discord.gg/arcsendo', type: 'success' },
          { text: 'Site Main URL: https://arcsendo.xyz', type: 'info' }
        ]);
        break;

      case 'arcsendo':
        setHistory(prev => [
          ...prev,
          cmdLine,
          { text: 'Connecting bypass sequence layers...', type: 'success' },
          { text: 'Triggering Hollywood protocol...', type: 'success' }
        ]);
        setTimeout(() => {
          setHollywoodMode(true);
        }, 500);
        break;

      default:
        setHistory(prev => [
          ...prev,
          cmdLine,
          { text: `bash: command not found: ${cmd}. Type "help" for a list of entries.`, type: 'dim' }
        ]);
        break;
    }
  };

  const getLineClass = (type: TerminalLine['type']) => {
    switch (type) {
      case 'info': return 'text-gray-400';
      case 'dim': return 'text-zinc-600';
      case 'success': return 'text-white font-medium';
      case 'white': return 'text-gray-200';
      default: return 'text-zinc-400';
    }
  };

  return (
    <div className="terminal-wrap" ref={termBodyRef}>
      <div className="terminal">
        {/* Terminal Header Bar */}
        <div className="terminal-bar">
          <div className="terminal-dots">
            <span className="tdot red" />
            <span className="tdot yellow" />
            <span className="tdot green" />
          </div>
          <span className="terminal-title">arcsendo@root:~</span>
          <span className="text-xs text-zinc-600 font-mono select-none">v1.0.4</span>
        </div>

        {/* Terminal Body Screen */}
        <div className="terminal-body">
          {/* Logo ASCii banner */}
          <pre className="term-art text-zinc-400 select-none overflow-x-auto whitespace-pre leading-normal py-2">
            {ASCII_ART}
          </pre>
          <div className="term-subtitle text-xs text-zinc-500 mb-2 select-none">
            Welcome to the interactive hacking deck. Enter a command to query.
          </div>
          <div className="term-divider border-t border-zinc-800 my-2" />

          {/* Scrolling Screen Buffer */}
          <div className="term-output flex-1" ref={scrollRef}>
            {hollywoodMode ? (
              <div className="font-mono text-green-500 text-xs flex flex-col gap-1">
                <div className="text-white bg-green-900 border border-green-400 p-1 px-2 select-none mb-2">
                  [!] PRESS ENTER OR TYPE ANY COMMAND TO DEACTIVATE HOLLYWOOD STREAM
                </div>
                {hollywoodLines.map((line, idx) => (
                  <div key={idx} className="term-hollywood text-green-400 whitespace-pre">
                    {line}
                  </div>
                ))}
              </div>
            ) : (
              history.map((line, idx) => (
                <div key={idx} className={`term-line font-mono ${getLineClass(line.type)}`}>
                  {line.text}
                </div>
              ))
            )}
          </div>

          {/* Interactive Shell Prompt Input */}
          <form onSubmit={handleCommand} className="term-input-row flex items-center gap-1 border-t border-zinc-900 pt-2 shrink-0">
            <span className="text-green-500 font-mono font-bold select-none">root@arcsendo:~#</span>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="term-real-input flex-1 bg-transparent border-none outline-none font-mono text-white text-sm"
              autoFocus
              placeholder={hollywoodMode ? "press enter to abort..." : "type command here..."}
            />
          </form>
        </div>
      </div>
    </div>
  );
};
export default TerminalShell;
