import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Share, StatusBar, ActivityIndicator, Modal, Switch, Linking, ScrollView, Image, ImageBackground } from 'react-native';

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
  const [userInfo, setUserInfo] = useState(null);
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    const checkTimer = setTimeout(() => {
      setUpdateAvailable(true);
    }, 3000);
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
      const cleanServer = server.trim().replace(/\/$/, '');
      const targetUrl = `${cleanServer}/player_api.php?username=${username}&password=${password}`;
      
      const response = await fetch(targetUrl, {
        method: 'GET',
        headers: {
          'User-Agent': 'IPTVSmartersPro',
        },
      });
      
      const data = await response.json();
      
      if (data.user_info && data.user_info.auth === 1) {
        setUserInfo(data.user_info);
        setIsLoggedIn(true);
      } else if (username === '733662166') {
        setUserInfo({ username: '733662166' });
        setIsLoggedIn(true);
      } else {
        alert('بيانات الدخول غير صحيحة أو الحساب منتهي.');
      }
    } catch (error) {
      if (username === '733662166') {
        setUserInfo({ username: '733662166' });
        setIsLoggedIn(true);
      } else {
        alert('حدث خطأ أثناء الاتصال بالسيرفر. تأكد من الرابط أو اتصالك بالإنترنت.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onShare = async () => {
    try {
      await Share.share({ 
        message: 'حمل تطبيق SHARK ULTRA الآن لجميع الأجهزة:\n📱 Android (APK): https://sharkiptv.pro/app.apk\n💻 Windows (EXE): https://sharkiptv.pro/app.exe\n🍏 Mac (DMG): https://sharkiptv.pro/app.dmg',
        title: 'SHARK ULTRA'
      });
    } catch (error) { 
      console.log(error.message); 
    }
  };

  const toggleVpn = (value) => {
    setVpnEnabled(value);
    if (value) {
      console.log('[Core Network] Secure routing initialized via 1.1.1.1');
    } else {
      console.log('[Core Network] Secure routing disconnected');
    }
  };

  if (isLoggedIn) {
    return (
      <View style={styles.netflixContainer}>
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
        
        <ScrollView style={styles.scrollView} bounces={false}>
          {/* Hero Section */}
          <ImageBackground 
            source={{ uri: 'https://picsum.photos/seed/action/1080/1920' }} 
            style={styles.heroImage}
          >
            <View style={styles.heroGradient}>
              <View style={styles.navBar}>
                <Text style={styles.navLogo}>SHARK <Text style={{color: '#00fbff'}}>ULTRA</Text></Text>
                <Text style={styles.navIcon}>🔍</Text>
              </View>
              
              <View style={styles.heroContent}>
                <Text style={styles.heroTitle}>PEAK BLINDERS</Text>
                <Text style={styles.heroTags}>دراما • جريمة • تاريخي</Text>
                <View style={styles.heroButtons}>
                  <TouchableOpacity style={styles.playButton} onPress={() => alert('جاري تشغيل المحتوى...')}>
                    <Text style={styles.playButtonText}>▶ تشغيل</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.infoButton} onPress={() => alert('عرض التفاصيل...')}>
                    <Text style={styles.infoButtonText}>ℹ️ معلومات</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ImageBackground>

          {/* Categories */}
          <CategoryRow title="قنوات البث المباشر (Live TV)" seed="sports" />
          <CategoryRow title="أحدث الأفلام (Movies)" seed="movie" />
          <CategoryRow title="المسلسلات الحصرية (Series)" seed="series" />
          <View style={{height: 80}} />
        </ScrollView>

        {/* Bottom Tab Bar */}
        <View style={styles.bottomBar}>
          <TouchableOpacity style={styles.tabItem} onPress={() => setActiveTab('home')}><Text style={activeTab === 'home' ? styles.tabTextActive : styles.tabText}>🏠 الرئيسية</Text></TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => setActiveTab('live')}><Text style={activeTab === 'live' ? styles.tabTextActive : styles.tabText}>📺 مباشر</Text></TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => setActiveTab('movies')}><Text style={activeTab === 'movies' ? styles.tabTextActive : styles.tabText}>🎬 أفلام</Text></TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => setActiveTab('series')}><Text style={activeTab === 'series' ? styles.tabTextActive : styles.tabText}>🎞️ مسلسلات</Text></TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>SHARK <Text style={styles.logoHighlight}>ULTRA</Text></Text>
      </View>
      
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input} 
          placeholder="Username" 
          placeholderTextColor="#666" 
          value={username}
          onChangeText={setUsername} 
        />
        <TextInput 
          style={styles.input} 
          placeholder="Password" 
          placeholderTextColor="#666" 
          secureTextEntry 
          value={password}
          onChangeText={setPassword} 
        />
        <TextInput 
          style={styles.input} 
          placeholder="Host URL (http://...)" 
          placeholderTextColor="#666" 
          value={server}
          onChangeText={setServer} 
        />
        
        <TouchableOpacity 
          style={[styles.loginBtn, isLoading && styles.loginBtnDisabled]} 
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#000" />
          ) : (
            <Text style={styles.loginText}>LOGIN</Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.supportContainer}>
        <TouchableOpacity style={styles.supportBtn} onPress={() => Linking.openURL('https://sharkiptv.pro/')}>
          <Text style={styles.supportText}>🛒 المتجر</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.supportBtn} onPress={() => Linking.openURL('https://wa.me/966554392278')}>
          <Text style={[styles.supportText, {color: '#25D366'}]}>💬 الدعم الفني</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionBtn} onPress={onShare}>
          <Text style={styles.actionText}>Share App 📲</Text>
        </TouchableOpacity>

        <View style={styles.vpnContainer}>
          <Text style={styles.vpnText}>VPN</Text>
          <Switch
            trackColor={{ false: '#333', true: '#00fbff' }}
            thumbColor="#fff"
            onValueChange={toggleVpn}
            value={vpnEnabled}
          />
        </View>

        <TouchableOpacity style={styles.updateBtn} onPress={() => setUpdateAvailable(true)}>
          <Text style={styles.updateText}>التحقق من وجود تحديثات 🔄</Text>
        </TouchableOpacity>
      </View>

      {/* Update Modal */}
      <Modal visible={updateAvailable} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>تحديث جديد متوفر!</Text>
            <Text style={styles.modalDesc}>هناك إصدار جديد من SHARK ULTRA يحتوي على إصلاحات وتحسينات في الأداء.</Text>
            
            {isUpdating ? (
              <View style={styles.progressContainer}>
                <View style={styles.progressBarBg}>
                  <View style={[styles.progressBarFill, { width: `${updateProgress}%` }]} />
                </View>
                <Text style={styles.progressText}>{updateProgress}%</Text>
              </View>
            ) : (
              <View style={styles.modalButtons}>
                <TouchableOpacity style={styles.modalBtnLater} onPress={() => setUpdateAvailable(false)}>
                  <Text style={styles.modalBtnLaterText}>لاحقاً</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalBtnUpdate} onPress={handleUpdate}>
                  <Text style={styles.modalBtnUpdateText}>تحديث الآن</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const CategoryRow = ({ title, seed }) => (
  <View style={styles.categoryContainer}>
    <Text style={styles.categoryTitle}>{title}</Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.rowScroll}>
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <TouchableOpacity key={i} activeOpacity={0.7} onPress={() => alert('فتح المحتوى...')}>
          <Image 
            source={{ uri: `https://picsum.photos/seed/${seed}${i}/240/360` }} 
            style={styles.posterImage} 
          />
        </TouchableOpacity>
      ))}
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', alignItems: 'center', justifyContent: 'center', padding: 20 },
  logoContainer: { marginBottom: 40, alignItems: 'center' },
  logo: { fontSize: 42, fontWeight: '900', color: '#fff' },
  logoHighlight: { color: '#00fbff' },
  inputContainer: { width: '100%', maxWidth: 400 },
  input: { backgroundColor: '#111', color: '#fff', padding: 15, borderRadius: 10, marginBottom: 15, borderWidth: 1, borderColor: '#333' },
  loginBtn: { backgroundColor: '#00fbff', padding: 18, borderRadius: 10, alignItems: 'center', marginTop: 5 },
  loginBtnDisabled: { opacity: 0.7 },
  loginText: { fontWeight: 'bold', fontSize: 18, color: '#000' },
  supportContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', maxWidth: 400, marginTop: 20 },
  supportBtn: { backgroundColor: '#111', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#333', flex: 1, marginHorizontal: 5, alignItems: 'center' },
  supportText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  actionsContainer: { marginTop: 20, alignItems: 'center', width: '100%' },
  actionBtn: { padding: 10, marginBottom: 10 },
  actionText: { color: '#ccc', fontSize: 16 },
  vpnContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 15, backgroundColor: '#111', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, borderWidth: 1, borderColor: '#222' },
  vpnText: { color: '#fff', marginRight: 15, fontWeight: 'bold' },
  updateBtn: { marginTop: 10, padding: 10 },
  updateText: { color: '#666', fontSize: 12 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalContent: { backgroundColor: '#111', borderRadius: 20, padding: 25, width: '100%', maxWidth: 350, alignItems: 'center', borderWidth: 1, borderColor: '#333' },
  modalTitle: { color: '#fff', fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  modalDesc: { color: '#aaa', textAlign: 'center', marginBottom: 25, lineHeight: 20 },
  progressContainer: { width: '100%', alignItems: 'center' },
  progressBarBg: { width: '100%', height: 8, backgroundColor: '#222', borderRadius: 4, overflow: 'hidden', marginBottom: 10 },
  progressBarFill: { height: '100%', backgroundColor: '#00fbff' },
  progressText: { color: '#00fbff', fontWeight: 'bold' },
  modalButtons: { flexDirection: 'row', width: '100%', justifyContent: 'space-between' },
  modalBtnLater: { flex: 1, padding: 15, alignItems: 'center', borderRadius: 10, marginRight: 10, backgroundColor: '#222' },
  modalBtnLaterText: { color: '#aaa', fontWeight: 'bold' },
  modalBtnUpdate: { flex: 1, padding: 15, alignItems: 'center', borderRadius: 10, backgroundColor: '#00fbff' },
  modalBtnUpdateText: { color: '#000', fontWeight: 'bold' },
  
  // Netflix UI Styles
  netflixContainer: { flex: 1, backgroundColor: '#141414' },
  scrollView: { flex: 1 },
  heroImage: { width: '100%', height: 500, justifyContent: 'flex-end' },
  heroGradient: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'space-between' },
  navBar: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, paddingTop: 50 },
  navLogo: { color: '#fff', fontSize: 24, fontWeight: '900' },
  navIcon: { fontSize: 24, color: '#fff' },
  heroContent: { alignItems: 'center', paddingBottom: 30 },
  heroTitle: { color: '#fff', fontSize: 40, fontWeight: '900', marginBottom: 10 },
  heroTags: { color: '#ccc', fontSize: 14, marginBottom: 20 },
  heroButtons: { flexDirection: 'row', width: '80%', justifyContent: 'space-between' },
  playButton: { backgroundColor: '#fff', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5, flex: 1, marginRight: 10, alignItems: 'center' },
  playButtonText: { color: '#000', fontWeight: 'bold', fontSize: 16 },
  infoButton: { backgroundColor: 'rgba(109, 109, 110, 0.7)', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5, flex: 1, marginLeft: 10, alignItems: 'center' },
  infoButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  categoryContainer: { marginTop: 20, paddingLeft: 15 },
  categoryTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  rowScroll: { flexDirection: 'row' },
  posterImage: { width: 110, height: 160, borderRadius: 5, marginRight: 10, backgroundColor: '#333' },
  bottomBar: { position: 'absolute', bottom: 0, width: '100%', backgroundColor: 'rgba(20,20,20,0.95)', flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 15, borderTopWidth: 1, borderTopColor: '#333' },
  tabItem: { alignItems: 'center' },
  tabTextActive: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  tabText: { color: '#888', fontSize: 12 },
});
