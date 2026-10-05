import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Search, Github, Code, Triangle, Youtube, Play, Pause, SkipForward, MapPin, CalendarDays, CheckSquare, Square, Pin } from 'lucide-react';

const Card = ({ children, className = "", delay = 0, rotate = 0 }) => {
  return (
    <motion.div
      initial={{ y: 80, opacity: 0, rotate: rotate - 5 }}
      animate={{ y: 0, opacity: 1, rotate: rotate }}
      whileHover={{ scale: 1.02, rotate: rotate + 1, transition: { duration: 0.2 } }}
      transition={{ type: "spring", bounce: 0.6, duration: 0.8, delay }}
      className={`bg-white border-4 border-black shadow-brutal hover:shadow-brutal-lg transition-shadow duration-200 rounded-xl overflow-hidden p-4 ${className}`}
    >
      {children}
    </motion.div>
  );
};

const GoogleSearch = () => {
  const [focused, setFocused] = useState(false);
  return (
    <Card className="col-span-12 md:col-span-8 bg-cartoon-yellow flex flex-col justify-center items-center p-8">
      <h1 className="font-display text-5xl md:text-7xl mb-6 tracking-wider text-black drop-shadow-[2px_2px_0px_#fff]">G👀GLE</h1>
      <form action="https://google.com/search" method="GET" className="w-full max-w-2xl relative">
        <input 
          type="text" 
          name="q"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="SEARCH THE WEBBBB..." 
          className={`w-full font-pixel text-sm md:text-lg p-4 md:p-6 pl-14 border-4 border-black outline-none bg-white transition-all duration-300 shadow-[inset_4px_4px_0px_rgba(0,0,0,0.1)] ${focused ? 'shadow-[0_0_20px_#ff69b4] border-hot-pink' : ''}`}
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 text-black" strokeWidth={3} />
      </form>
    </Card>
  );
};

const PinnedSites = () => {
  const sites = [
    { name: 'GitHub', icon: <Github size={32} />, color: 'bg-gray-200', url: 'https://github.com' },
    { name: 'LeetCode', icon: <Code size={32} />, color: 'bg-cartoon-yellow', url: 'https://leetcode.com' },
    { name: 'Vercel', icon: <Triangle size={32} fill="currentColor" />, color: 'bg-black text-white', url: 'https://vercel.com' },
    { name: 'YouTube', icon: <Youtube size={32} />, color: 'bg-red-500 text-white', url: 'https://youtube.com' }
  ];

  return (
    <Card delay={0.1} className="col-span-12 md:col-span-4 bg-cartoon-blue grid grid-cols-2 gap-4">
      {sites.map((site, i) => (
        <a key={i} href={site.url} className={`flex flex-col items-center justify-center p-4 border-4 border-black rounded-lg shadow-brutal hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all ${site.color}`}>
          {site.icon}
          <span className="font-pixel text-[10px] mt-2 font-bold uppercase">{site.name}</span>
        </a>
      ))}
    </Card>
  );
};

const TasksWidget = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Finish React Project", done: false },
    { id: 2, text: "Review PRs", done: false },
    { id: 3, text: "Buy Groceries", done: false }
  ]);
  const [shake, setShake] = useState(false);

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const completedCount = tasks.filter(t => t.done).length;
  const progress = (completedCount / tasks.length) * 100;

  return (
    <Card delay={0.2} rotate={-2} className={`col-span-12 md:col-span-6 bg-[#ff99cc] ${shake ? 'shake' : ''}`}>
      <div className="border-4 border-black bg-white p-2 mb-4 rounded-md shadow-[4px_4px_0px_#000]">
        <h2 className="font-pixel text-xs font-bold uppercase mb-2">🎯 Target: 10.0 GPA</h2>
        <div className="h-4 border-2 border-black bg-gray-200 relative w-full overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-neon-green"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
          <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAFElEQVQIW2NkYGD4z8DAwMgAI0AMDA4BAn+yHhgAAAAASUVORK5CYII=')]"></div>
        </div>
      </div>
      <h2 className="font-comic text-3xl font-bold mb-4 flex items-center gap-2"><CheckSquare className="fill-black text-white" /> Tasks</h2>
      <ul className="space-y-3">
        {tasks.map(task => (
          <li key={task.id} className="flex items-center gap-3 font-comic text-xl cursor-pointer" onClick={() => toggleTask(task.id)}>
            {task.done ? <CheckSquare className="text-black" /> : <Square className="text-black" />}
            <span className={task.done ? 'line-through opacity-50' : ''}>{task.text}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
};

const CalendarWidget = () => {
  return (
    <Card delay={0.3} rotate={1} className="col-span-12 md:col-span-6 bg-[url('https://www.transparenttextures.com/patterns/cork-board.png')] bg-[#d4a373] relative">
      <Pin className="absolute top-2 left-1/2 -translate-x-1/2 text-red-600 fill-red-500 w-8 h-8 z-10 drop-shadow-md" />
      <div className="bg-[#fcf8e3] p-4 border-2 border-black rotate-1 shadow-brutal mt-4 relative">
        <h2 className="font-comic text-2xl font-bold mb-3 border-b-2 border-black pb-1 border-dashed">Stuff Going On</h2>
        <ul className="font-pixel text-[11px] space-y-4">
          <li className="flex justify-between items-center bg-red-100 p-2 border-l-4 border-red-500">
            <span>CAT Exam Prep</span> <span className="bg-black text-white px-1">T-30 Days</span>
          </li>
          <li className="flex justify-between items-center bg-blue-100 p-2 border-l-4 border-blue-500">
            <span>F1: Monaco GP</span> <span className="bg-black text-white px-1">MAY 26</span>
          </li>
          <li className="flex justify-between items-center bg-green-100 p-2 border-l-4 border-green-500">
            <span>Project Deadline</span> <span className="bg-black text-white px-1">FRI</span>
          </li>
        </ul>
      </div>
    </Card>
  );
};

const MyStuff = () => {
  return (
    <Card delay={0.4} className="col-span-12 md:col-span-4 bg-black text-neon-green border-[#333] font-pixel p-6 relative">
      <div className="absolute top-0 left-0 w-full h-6 bg-[#222] border-b-2 border-[#444] flex items-center px-2 gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <span className="text-[10px] text-gray-400 font-sans ml-2">hackerman.exe</span>
      </div>
      <div className="mt-6">
        <p className="text-[12px] mb-4">{'>'} ls -la my_stuff/</p>
        <ul className="text-[11px] space-y-3">
          <li><a href="#" className="hover:bg-neon-green hover:text-black p-1 transition-colors">{'>'} P.R.I.S.M. Dashboard</a></li>
          <li><a href="#" className="hover:bg-neon-green hover:text-black p-1 transition-colors">{'>'} F1 Telemetry Site</a></li>
          <li><a href="#" className="hover:bg-neon-green hover:text-black p-1 transition-colors">{'>'} Secret Project</a></li>
        </ul>
        <motion.div animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="mt-4 w-3 h-4 bg-neon-green"></motion.div>
      </div>
    </Card>
  );
};

const VibesPlayer = () => {
  const [playing, setPlaying] = useState(false);
  return (
    <Card delay={0.5} className="col-span-12 md:col-span-8 bg-gray-300 bg-gradient-to-b from-gray-200 to-gray-400 flex flex-col justify-between">
      <div className="flex justify-between items-center border-4 border-black bg-black text-cartoon-green p-3 shadow-inner">
        <div>
          <p className="font-pixel text-[10px] text-green-400">WINAMP.EXE</p>
          <p className="font-pixel text-sm text-green-500 mt-1 marquee overflow-hidden whitespace-nowrap w-48">
            <span className="inline-block animate-[slide_10s_linear_infinite]">DOOM (2016) - BFG Division</span>
          </p>
        </div>
        <div className="font-display text-4xl text-red-500">01:24</div>
      </div>
      
      <div className="flex justify-center gap-4 mt-4">
        <button className="bg-gray-100 p-3 border-4 border-black shadow-brutal active:translate-y-1 active:translate-x-1 active:shadow-none hover:bg-gray-200">
          <SkipForward className="rotate-180 fill-black" />
        </button>
        <button onClick={() => setPlaying(!playing)} className="bg-cartoon-yellow p-3 border-4 border-black shadow-brutal active:translate-y-1 active:translate-x-1 active:shadow-none hover:bg-yellow-400">
          {playing ? <Pause className="fill-black" /> : <Play className="fill-black" />}
        </button>
        <button className="bg-gray-100 p-3 border-4 border-black shadow-brutal active:translate-y-1 active:translate-x-1 active:shadow-none hover:bg-gray-200">
          <SkipForward className="fill-black" />
        </button>
      </div>
      
      <div className="flex gap-2 mt-4 font-pixel text-[8px]">
        <span className="bg-black text-white px-2 py-1 cursor-pointer hover:bg-hot-pink">DOOM</span>
        <span className="bg-black text-white px-2 py-1 cursor-pointer hover:bg-hot-pink">ZIMMER</span>
        <span className="bg-black text-white px-2 py-1 cursor-pointer hover:bg-hot-pink">LOFI</span>
      </div>
    </Card>
  );
};

const Clocks = () => {
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date, tz) => {
    return date.toLocaleTimeString('en-US', { timeZone: tz, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  };

  return (
    <Card delay={0.6} className="col-span-12 md:col-span-4 bg-cartoon-purple grid grid-rows-3 gap-2 p-3">
      {/* Casio */}
      <div className="bg-[#a3b18a] border-4 border-black p-2 flex justify-between items-center shadow-[inset_2px_2px_0_rgba(0,0,0,0.5)]">
        <span className="font-pixel text-[10px] text-black">IND</span>
        <span className="font-pixel text-xl text-black">{formatTime(time, 'Asia/Kolkata')}</span>
      </div>
      {/* Melting/Trippy */}
      <div className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 border-4 border-black p-2 flex justify-between items-center skew-x-[-10deg] rounded-[50%_10%_40%_20%] shadow-brutal">
        <span className="font-comic text-sm font-bold text-white drop-shadow-[1px_1px_0_#000]">NYC</span>
        <span className="font-comic text-2xl font-bold text-white drop-shadow-[2px_2px_0_#000]">{formatTime(time, 'America/New_York')}</span>
      </div>
      {/* Standard Analog (text representation for now) */}
      <div className="bg-white border-4 border-black rounded-full w-full max-w-[150px] mx-auto p-1 flex items-center justify-center shadow-brutal">
        <span className="font-serif text-sm font-bold">LON {formatTime(time, 'Europe/London')}</span>
      </div>
    </Card>
  );
};

const Wishlist = () => {
  return (
    <Card delay={0.7} rotate={4} className="col-span-12 md:col-span-4 bg-[#fefe90] !border-0 !shadow-[6px_6px_0_rgba(0,0,0,0.2)] p-6 relative">
      <div className="absolute top-0 left-0 w-full h-8 bg-[#e6e676] opacity-50"></div>
      <h2 className="font-comic text-2xl font-bold mb-4 underline decoration-wavy decoration-red-500">Things to Buy</h2>
      <ul className="font-comic text-lg space-y-2 list-disc pl-5 marker:text-blue-500">
        <li>Piso skateboard grip tape</li>
        <li>New mechanical switch tester</li>
        <li>Sattu restock</li>
      </ul>
    </Card>
  );
};

const RandomShit = () => {
  return (
    <Card delay={0.8} className="col-span-12 md:col-span-4 bg-black relative overflow-hidden h-48 md:h-auto border-4 border-neon-green">
      <motion.div
        animate={{
          x: [0, 180, 0, 100, 0],
          y: [0, 80, 120, 0, 0],
          color: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-4 left-4 font-display text-4xl drop-shadow-[2px_2px_0px_#fff]"
      >
        DVD
      </motion.div>
    </Card>
  );
};

function App() {
  return (
    <div className="min-h-screen pattern-bg relative p-4 md:p-8">
      <div className="crt-overlay absolute inset-0 z-50 mix-blend-overlay"></div>
      
      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-12 gap-6 pb-20">
        <GoogleSearch />
        <PinnedSites />
        <TasksWidget />
        <CalendarWidget />
        <MyStuff />
        <VibesPlayer />
        <Clocks />
        <Wishlist />
        <RandomShit />
      </div>
    </div>
  );
}

export default App;
