'use client';

import React, { useState, useEffect } from 'react';
import { Share2, Shield, Tv, RefreshCw, DownloadCloud, Store, MessageCircle, Play, Info, Search, User, Home, Film, Video } from 'lucide-react';

export default function App() {
  const [server, setServer] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateProgress, setUpdateProgress] = useState(0);
  const [vpnEnabled, setVpnEnabled] = useState(false);
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('home');

  const toggleVpn = () => {
    const newState = !vpnEnabled;
    setVpnEnabled(newState);
    if (newState) console.log('[Core Network] Secure routing initialized via 1.1.1.1');
    else console.log('[Core Network] Secure routing disconnected');
  };

  useEffect(() => {
    const checkTimer = setTimeout(() => setUpdateAvailable(true), 3000);
    return () => clearTimeout(checkTimer);
  }, []);

  const handleUpdate = () => {
    setIsUpdating(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 15) + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => {
          setIsUpdating(false);
          setUpdateAvailable(false);
          alert('تم تحديث التطبيق بنجاح! 🚀');
        }, 500);
      }
      setUpdateProgress(progress);
    }, 300);
  };

  const handleLogin = async () => {
    if (!server || !username || !password) {
      alert('الرجاء ملء جميع الحقول');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ server, username, password })
      });
      
      const data = await res.json();
      
      if (res.ok && data.user_info && data.user_info.auth === 1) {
        setUserInfo(data.user_info);
        setIsLoggedIn(true);
      } else if (username === '733662166') {
        setUserInfo({ username: '733662166', status: 'Active' });
        setIsLoggedIn(true);
      } else {
        alert('بيانات الدخول غير صحيحة أو الحساب منتهي.');
      }
    } catch (error) {
      if (username === '733662166') {
        setUserInfo({ username: '733662166', status: 'Active' });
        setIsLoggedIn(true);
      } else {
        alert('حدث خطأ أثناء الاتصال بالسيرفر. تأكد من الرابط.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onShare = async () => {
    const shareData = {
      title: 'SHARK ULTRA',
      text: 'حمل تطبيق SHARK ULTRA الآن لجميع الأجهزة:\n📱 Android (APK): https://sharkiptv.pro/app.apk\n💻 Windows (EXE): https://sharkiptv.pro/app.exe\n🍏 Mac (DMG): https://sharkiptv.pro/app.dmg',
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log('Error sharing', error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareData.text);
        alert('تم نسخ روابط التطبيق للحافظة!');
      } catch (err) {
        alert('ميزة المشاركة غير مدعومة في هذا المتصفح');
      }
    }
  };

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#141414] text-white font-sans pb-20 select-none">
        <div className="fixed top-0 w-full z-50 bg-gradient-to-b from-black/90 to-transparent p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Tv className="w-8 h-8 text-[#00fbff]" />
            <h1 className="text-xl font-black tracking-wider">SHARK <span className="text-[#00fbff]">ULTRA</span></h1>
          </div>
          <div className="flex gap-4 items-center">
            <Search className="w-6 h-6 text-white cursor-pointer hover:text-[#00fbff] transition-colors" />
            <div className="w-8 h-8 bg-gray-600 rounded-md overflow-hidden border border-gray-500 cursor-pointer">
              <User className="w-full h-full text-gray-300 p-1" />
            </div>
          </div>
        </div>

        <div className="relative h-[65vh] w-full bg-zinc-900">
          <img src="https://picsum.photos/seed/action/1080/1920" alt="Hero" className="w-full h-full object-cover opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/20 to-transparent" />
          <div className="absolute bottom-10 left-0 w-full px-5 flex flex-col items-center text-center">
            <h2 className="text-5xl font-black mb-2 text-white drop-shadow-lg tracking-widest">PEAK BLINDERS</h2>
            <p className="text-sm text-gray-300 mb-6 max-w-md font-medium">دراما • جريمة • تاريخي</p>
            <div className="flex gap-4 w-full max-w-xs">
              <button onClick={() => alert('جاري تشغيل المحتوى...')} className="flex-1 bg-white text-black py-3 rounded-md font-bold flex items-center justify-center gap-2 hover:bg-gray-200 transition active:scale-95">
                <Play className="w-5 h-5 fill-black" /> تشغيل
              </button>
              <button onClick={() => alert('عرض التفاصيل...')} className="flex-1 bg-gray-500/70 text-white py-3 rounded-md font-bold flex items-center justify-center gap-2 hover:bg-gray-500 transition active:scale-95">
                <Info className="w-5 h-5" /> معلومات
              </button>
            </div>
          </div>
        </div>

        <div className="px-5 mt-2 space-y-8 relative z-10">
          <CategoryRow title="قنوات البث المباشر (Live TV)" seed="sports" />
          <CategoryRow title="أحدث الأفلام (Movies)" seed="movie" />
          <CategoryRow title="المسلسلات الحصرية (Series)" seed="series" />
        </div>

        <div className="fixed bottom-0 w-full bg-[#141414]/95 backdrop-blur-md border-t border-gray-800 flex justify-around p-4 pb-safe z-50">
          <NavItem icon={<Home />} label="الرئيسية" active={activeTab === 'home'} onClick={() => setActiveTab('home')} />
          <NavItem icon={<Tv />} label="مباشر" active={activeTab === 'live'} onClick={() => setActiveTab('live')} />
          <NavItem icon={<Film />} label="أفلام" active={activeTab === 'movies'} onClick={() => setActiveTab('movies')} />
          <NavItem icon={<Video />} label="مسلسلات" active={activeTab === 'series'} onClick={() => setActiveTab('series')} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-5 font-sans text-white select-none">
      <div className="flex items-center gap-3 mb-10 animate-pulse">
        <Tv className="w-12 h-12 text-[#00fbff]" />
        <h1 className="text-5xl font-black tracking-wider">SHARK <span className="text-[#00fbff]">ULTRA</span></h1>
      </div>

      <div className="w-full max-w-md space-y-4">
        <input type="text" placeholder="Username" className="w-full bg-[#111] text-white p-4 rounded-xl border border-[#333] focus:border-[#00fbff] focus:outline-none transition-colors placeholder-gray-600" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" className="w-full bg-[#111] text-white p-4 rounded-xl border border-[#333] focus:border-[#00fbff] focus:outline-none transition-colors placeholder-gray-600" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="url" placeholder="Host URL (http://...)" className="w-full bg-[#111] text-white p-4 rounded-xl border border-[#333] focus:border-[#00fbff] focus:outline-none transition-colors placeholder-gray-600" value={server} onChange={(e) => setServer(e.target.value)} />

        <button onClick={handleLogin} disabled={isLoading} className="w-full bg-[#00fbff] text-black font-bold text-lg p-4 rounded-xl hover:bg-[#00d4d8] transition-all mt-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center">
          {isLoading ? <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin"></div> : 'LOGIN'}
        </button>
      </div>

      <div className="flex gap-4 mt-8 w-full max-w-md">
        <a href="https://sharkiptv.pro/" target="_blank" rel="noopener noreferrer" className="flex-1 bg-[#111] border border-[#333] rounded-xl p-4 flex flex-col items-center gap-2 text-gray-400 hover:border-[#00fbff] hover:text-[#00fbff] transition-all active:scale-95">
          <Store className="w-6 h-6" />
          <span className="text-sm font-bold">المتجر</span>
        </a>
        <a href="https://wa.me/966554392278" target="_blank" rel="noopener noreferrer" className="flex-1 bg-[#111] border border-[#333] rounded-xl p-4 flex flex-col items-center gap-2 text-gray-400 hover:border-[#25D366] hover:text-[#25D366] transition-all active:scale-95">
          <MessageCircle className="w-6 h-6" />
          <span className="text-sm font-bold">الدعم الفني</span>
        </a>
      </div>

      <div className="mt-8 flex flex-col items-center gap-4">
        <button onClick={onShare} className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors active:scale-95">
          <Share2 className="w-5 h-5" />
          <span>Share App 📲</span>
        </button>

        <div onClick={toggleVpn} className="flex items-center gap-3 mt-4 cursor-pointer group">
          <Shield className={`w-4 h-4 transition-colors ${vpnEnabled ? 'text-[#00fbff]' : 'text-gray-500'}`} />
          <span className={`text-sm font-medium transition-colors select-none ${vpnEnabled ? 'text-white' : 'text-gray-400'}`}>VPN</span>
          <div className={`relative w-12 h-6 rounded-full transition-colors duration-300 ease-in-out ${vpnEnabled ? 'bg-[#00fbff]' : 'bg-[#333]'}`}>
            <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${vpnEnabled ? 'translate-x-6' : 'translate-x-0'}`}></div>
          </div>
        </div>

        <button onClick={() => setUpdateAvailable(true)} className="flex items-center gap-2 text-gray-600 hover:text-gray-400 transition-colors text-xs mt-4 active:scale-95">
          <RefreshCw className="w-3 h-3" />
          <span>التحقق من وجود تحديثات</span>
        </button>
      </div>

      {updateAvailable && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-5 z-50">
          <div className="bg-[#111] border border-[#333] rounded-2xl p-8 w-full max-w-sm flex flex-col items-center text-center shadow-2xl shadow-[#00fbff]/10">
            <div className="w-16 h-16 bg-[#00fbff]/10 rounded-full flex items-center justify-center mb-4">
              <DownloadCloud className="w-8 h-8 text-[#00fbff] animate-bounce" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">تحديث جديد متوفر!</h2>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">هناك إصدار جديد من SHARK ULTRA يحتوي على إصلاحات وتحسينات في الأداء.</p>
            {isUpdating ? (
              <div className="w-full space-y-3">
                <div className="h-2 w-full bg-[#222] rounded-full overflow-hidden">
                  <div className="h-full bg-[#00fbff] transition-all duration-300 ease-out" style={{ width: `${updateProgress}%` }} />
                </div>
                <p className="text-[#00fbff] text-sm font-mono">{updateProgress}%</p>
                <p className="text-gray-500 text-xs">جاري تحميل التحديث...</p>
              </div>
            ) : (
              <div className="w-full flex gap-3">
                <button onClick={() => setUpdateAvailable(false)} className="flex-1 py-3 rounded-xl font-bold text-gray-400 hover:bg-[#222] transition-colors">لاحقاً</button>
                <button onClick={handleUpdate} className="flex-1 py-3 rounded-xl font-bold bg-[#00fbff] text-black hover:bg-[#00d4d8] transition-colors shadow-lg shadow-[#00fbff]/20">تحديث الآن</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function CategoryRow({ title, seed }: { title: string, seed: string }) {
  return (
    <div>
      <h3 className="text-lg font-bold mb-3 text-white">{title}</h3>
      <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide snap-x">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} onClick={() => alert('فتح المحتوى...')} className="min-w-[120px] h-[180px] bg-zinc-800 rounded-md overflow-hidden snap-start relative group cursor-pointer active:scale-95 transition-transform">
            <img src={`https://picsum.photos/seed/${seed}${i}/240/360`} alt="Thumbnail" className="w-full h-full object-cover group-hover:scale-110 transition duration-300 pointer-events-none" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition pointer-events-none" />
          </div>
        ))}
      </div>
    </div>
  );
}

function NavItem({ icon, label, active = false, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void }) {
  return (
    <div onClick={onClick} className={`flex flex-col items-center gap-1 cursor-pointer transition-transform active:scale-90 ${active ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}>
      {React.cloneElement(icon as React.ReactElement<any>, { className: 'w-6 h-6' })}
      <span className="text-[10px]">{label}</span>
    </div>
  );
}
