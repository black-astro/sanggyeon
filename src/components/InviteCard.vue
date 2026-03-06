<template>
  <div class="bg-layer" />
  <canvas ref="canvasRef" class="petal-canvas" :class="{ off: !petals }" />

  <div class="page-wrap">
    <div class="invite-card" ref="cardRef">

      <!-- ══ 히어로 ══ -->
      <div class="hero">
        <div class="hero-pattern" />
        <div class="hero-deco-circle c1" />
        <div class="hero-deco-circle c2" />
        <div class="hero-deco-circle c3" />
        <div class="hero-overlay" />
        <div class="hero-text">
          <p class="hero-eyebrow">Sanggyeonrye Invitation</p>
          <div class="hero-names">
            <span class="hero-name">김현우</span>
            <Heart class="hero-heart-sep" :size="18" />
            <span class="hero-name">김은지</span>
          </div>
          <h1 class="hero-title">상견례</h1>
          <p class="hero-sub">兩家의 아름다운 첫 만남</p>
          <div class="hero-ornament">
            <span class="orn-line l" />
            <Heart :size="11" />
            <span class="orn-line r" />
          </div>
        </div>
      </div>

      <!-- ══ 카드 바디 ══ -->
      <div class="card-body">

        <!-- 인사말 -->
        <section class="section greeting">
          <div class="greeting-deco">
            <span class="deco-line l" /><Leaf :size="14" /><span class="deco-line r" />
          </div>
          <p class="greeting-main">
            두 사람의 <em>사랑</em>이 하나가 되는 날,<br />
            소중한 두 가족이 처음으로 마주하는<br />
            뜻깊은 자리에 정중히 초대합니다.
          </p>
          <p class="greeting-sub">
            바쁘신 중에도 함께해 주신다면<br />
            두 가족 모두에게 더없는 기쁨이 되겠습니다.
          </p>
        </section>

        <!-- 양가 소개 -->
        <section class="section">
          <span class="sec-label"><Users :size="13" />양가 소개</span>
          <div class="family-grid">
            <div class="family-side">
              <span class="f-badge groom">신랑 측</span>
              <div class="f-name">김현우</div>
              <div class="f-role">장남</div>
              <div class="f-parents">부 김○○<br />모 ○○○</div>
            </div>
            <div class="f-center">
              <div class="and-circle"><Infinity :size="16" /></div>
            </div>
            <div class="family-side">
              <span class="f-badge bride">신부 측</span>
              <div class="f-name">김은지</div>
              <div class="f-role">장녀</div>
              <div class="f-parents">부 ○○○<br />모 ○○○</div>
            </div>
          </div>
        </section>

        <div class="divider"><span /><Dot :size="10" /><span /></div>

        <!-- 행사 안내 -->
        <section class="section">
          <span class="sec-label"><CalendarHeart :size="13" />행사 안내</span>
          <div class="info-list">
            <div class="info-item" v-for="item in infoItems" :key="item.label">
              <div class="info-icon"><component :is="item.icon" :size="16" /></div>
              <div>
                <div class="info-label">{{ item.label }}</div>
                <div class="info-val">{{ item.value }}</div>
                <div v-if="item.sub" class="info-sub-val">{{ item.sub }}</div>
              </div>
            </div>
          </div>
        </section>

        <!-- 공지 -->
        <div class="notice">
          <Info :size="15" class="notice-icon" />
          <div>
            <p>참석 여부를 <strong>3월 10일(월)</strong>까지 알려주시면 감사하겠습니다.</p>
            <p>편안한 마음으로 왕림해 주시길 바랍니다.</p>
          </div>
        </div>

        <!-- 오시는 길 -->
        <section class="section">
          <span class="sec-label"><MapPinned :size="13" />오시는 길</span>

          <div class="map-tabs">
            <button class="map-tab" :class="{ active: activeMap === 'restaurant' }" @click="switchMap('restaurant')">
              <UtensilsCrossed :size="14" />모담 본점
            </button>
            <button class="map-tab" :class="{ active: activeMap === 'parking' }" @click="switchMap('parking')">
              <SquareParking :size="14" />공영주차장
            </button>
          </div>

          <div class="map-frame-wrap">
            <div ref="mapEl" class="naver-map" />
            <!-- 줌 컨트롤 -->
            <div class="map-ctrl-zoom">
              <button class="map-ctrl-btn" @click="mapZoom(1)" title="확대"><ZoomIn :size="15" /></button>
              <div class="map-ctrl-divider" />
              <button class="map-ctrl-btn" @click="mapZoom(-1)" title="축소"><ZoomOut :size="15" /></button>
            </div>
            <!-- 내 위치 + 크게 보기 -->
            <div class="map-ctrl-side">
              <button class="map-ctrl-btn" @click="locateMe" title="내 위치"><Locate :size="15" /></button>
              <button class="map-ctrl-btn" @click="openFullMap" title="크게 보기"><Maximize2 :size="15" /></button>
            </div>
          </div>

          <!-- 식당 길찾기 -->
          <div class="nav-group">
            <div class="nav-group-label"><UtensilsCrossed :size="12" />식당 길찾기</div>
            <div class="btn-map-row">
              <button class="btn-map btn-naver" @click="openNaver('restaurant')">
                <Navigation :size="14" />네이버 길찾기
              </button>
              <a class="btn-map btn-kakao" :href="kakaoRestUrl" target="_blank" rel="noopener">
                <Map :size="14" />카카오 길찾기
              </a>
            </div>
          </div>

          <!-- 주차장 길찾기 -->
          <div class="nav-group">
            <div class="nav-group-label"><SquareParking :size="12" />주차장 길찾기</div>
            <div class="btn-map-row">
              <button class="btn-map btn-naver" @click="openNaver('parking')">
                <Navigation :size="14" />네이버 길찾기
              </button>
              <a class="btn-map btn-kakao" :href="kakaoParkUrl" target="_blank" rel="noopener">
                <Map :size="14" />카카오 길찾기
              </a>
            </div>
          </div>
        </section>

        <!-- 꽃잎 토글 -->
        <div class="petal-wrap">
          <button class="petal-btn" :class="{ on: petals }" @click="togglePetals">
            <Sparkles :size="14" />꽃잎 효과
            <div class="toggle-track"><div class="toggle-thumb" /></div>
          </button>
        </div>

      </div>

      <div class="card-footer">
        <Heart class="footer-heart" :size="14" />
        <p class="footer-txt">2025년 봄, 두 가족의 첫 만남</p>
        <p class="footer-copy">With Love &amp; Gratitude</p>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import {
  Heart, Leaf, Users, Infinity, Dot,
  CalendarHeart, CalendarDays, MapPin, SquareParking, Phone,
  Info, MapPinned, UtensilsCrossed, Navigation, Map, Sparkles,
  ZoomIn, ZoomOut, Locate, Maximize2,
} from 'lucide-vue-next'

// ══════════════════════════════════════════
// ✅ 여기만 수정
// ══════════════════════════════════════════
const NAVER_CLIENT_ID = 'r3v0svm07f'

// geocoder가 주소 → 좌표 자동 변환
const REST_ADDR = '경기도 김포시 모담공원로167번길 105'
const PARK_ADDR = '경기도 김포시 모담공원로 170'

const REST_NAME     = '모담 김포 본점'
const PARK_NAME     = '김포 아트빌리지 공영주차장'
const REST_PLACE_ID = '1120584413'
const PARK_PLACE_ID = '1424823651'
// ══════════════════════════════════════════

const cardRef   = ref(null)
const canvasRef = ref(null)
const mapEl     = ref(null)
const petals    = ref(true)
const activeMap = ref('restaurant')

// geocoder가 런타임에 채워주는 좌표
const coords = {
  restaurant: { lat: 0, lng: 0 },
  parking:    { lat: 0, lng: 0 },
}

const kakaoRestUrl = ref('#')
const kakaoParkUrl = ref('#')

const infoItems = [
  { icon: CalendarDays,  label: '일 시', value: '2025년 3월 15일 (토요일)',    sub: '오후 12시 30분  ·  도착은 12:00 권장' },
  { icon: MapPin,        label: '장 소', value: '모담 김포 본점 (한정식)',      sub: REST_ADDR },
  { icon: SquareParking, label: '주 차', value: PARK_NAME,                     sub: '식당에서 도보 약 2분 · 무료 주차 가능' },
  { icon: Phone,         label: '문 의', value: '신랑 측 010-0000-0000',       sub: '신부 측 010-0000-0000' },
]

// 네이버 길찾기: 앱 스킴 → 웹 fallback
const openNaver = (target) => {
  const c    = coords[target]
  const name = target === 'restaurant' ? REST_NAME : PARK_NAME
  const pid  = target === 'restaurant' ? REST_PLACE_ID : PARK_PLACE_ID
  if (c.lat && c.lng) {
    window.location.href = `nmap://route/public?dlat=${c.lat}&dlng=${c.lng}&dname=${encodeURIComponent(name)}&appname=kr.sanggyeonrye`
  }
  setTimeout(() => window.open(`https://map.naver.com/p/entry/place/${pid}`, '_blank'), 500)
}

// ── 네이버 지도 SDK (geocoder 서브모듈 포함) ──
let naverMap = null
let markers  = {}

const loadNaverSDK = () =>
  new Promise((resolve, reject) => {
    if (window.naver?.maps?.Service?.geocode) { resolve(); return }
    const script = document.createElement('script')
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${NAVER_CLIENT_ID}&submodules=geocoder`
    script.onerror = () => reject(new Error('SDK 로드 실패'))
    document.head.appendChild(script)
    script.onload = () => {
      // geocoder 서브모듈 준비까지 폴링 대기 (최대 5초)
      let elapsed = 0
      const wait = setInterval(() => {
        elapsed += 50
        if (window.naver?.maps?.Service?.geocode) {
          clearInterval(wait)
          resolve()
        } else if (elapsed > 5000) {
          clearInterval(wait)
          reject(new Error('geocoder 준비 타임아웃'))
        }
      }, 50)
    }
  })

const makeMarker = (latLng, label) => new window.naver.maps.Marker({
  position: latLng,
  map: naverMap,
  icon: {
    content: `
      <div style="
        background:#d4a017;color:#fff;
        font-family:'Noto Serif KR',serif;
        font-size:11px;font-weight:600;
        padding:5px 10px;border-radius:3px;
        white-space:nowrap;
        box-shadow:0 2px 8px rgba(61,43,0,.4);
        position:relative;
      ">
        ${label}
        <div style="
          position:absolute;bottom:-6px;left:50%;
          transform:translateX(-50%);
          border-left:6px solid transparent;
          border-right:6px solid transparent;
          border-top:6px solid #d4a017;
        "></div>
      </div>`,
    anchor: new window.naver.maps.Point(40, 34),
  },
})

// 주소 → 좌표 변환
const geocodeAddress = (address) =>
  new Promise((resolve, reject) => {
    window.naver.maps.Service.geocode({ query: address }, (status, res) => {
      if (status !== window.naver.maps.Service.Status.OK) {
        reject(new Error(`geocode 실패: ${status}`))
        return
      }
      const item = res?.v2?.addresses?.[0]
      if (!item) { reject(new Error('주소 결과 없음')); return }
      resolve({ lat: Number(item.y), lng: Number(item.x) })
    })
  })

const initMap = async () => {
  const naver = window.naver

  // 지도 초기 생성 (geocode 완료 전 임시 중심)
  naverMap = new naver.maps.Map(mapEl.value, {
    center: new naver.maps.LatLng(37.611, 126.715),
    zoom: 17,
    zoomControl: false,
    mapDataControl: false,
    scaleControl: false,
  })

  // 식당 geocode
  try {
    const c = await geocodeAddress(REST_ADDR)
    coords.restaurant = c
    kakaoRestUrl.value = `https://map.kakao.com/link/to/${encodeURIComponent(REST_NAME)},${c.lat},${c.lng}`
    const latLng = new naver.maps.LatLng(c.lat, c.lng)
    naverMap.setCenter(latLng)
    markers.restaurant = makeMarker(latLng, REST_NAME)
  } catch (e) {
    console.error('식당 geocode 실패', e)
  }

  // 주차장 — 좌표 직접 지정 (geocoder 오인식 방지)
  {
    const c = { lat: 37.6464826, lng: 126.6962041 }
    coords.parking = c
    kakaoParkUrl.value = `https://map.kakao.com/link/to/${encodeURIComponent(PARK_NAME)},${c.lat},${c.lng}`
    const latLng = new naver.maps.LatLng(c.lat, c.lng)
    markers.parking = makeMarker(latLng, PARK_NAME)
    markers.parking.setVisible(false)
  }
}

// 줌 컨트롤
const mapZoom = (delta) => {
  if (!naverMap) return
  naverMap.setZoom(naverMap.getZoom() + delta)
}

// 내 위치 표시
let myMarker = null
const locateMe = () => {
  if (!navigator.geolocation) return
  navigator.geolocation.getCurrentPosition(({ coords }) => {
    if (!naverMap) return
    const pos = new window.naver.maps.LatLng(coords.latitude, coords.longitude)
    naverMap.setCenter(pos)
    naverMap.setZoom(17)
    if (myMarker) { myMarker.setPosition(pos); return }
    myMarker = new window.naver.maps.Marker({
      position: pos,
      map: naverMap,
      icon: {
        content: `<div style="width:14px;height:14px;background:#4a90e2;border:2.5px solid #fff;border-radius:50%;box-shadow:0 2px 8px rgba(74,144,226,.5)"></div>`,
        anchor: new window.naver.maps.Point(7, 7),
      },
    })
  }, () => alert('위치 정보를 가져올 수 없습니다.'))
}

// 크게 보기 — 현재 탭 장소를 네이버 지도 웹에서 열기
const openFullMap = () => {
  const pid = activeMap.value === 'restaurant' ? REST_PLACE_ID : PARK_PLACE_ID
  window.open(`https://map.naver.com/p/entry/place/${pid}`, '_blank')
}

const switchMap = (target) => {
  activeMap.value = target
  if (!naverMap) return
  const c = coords[target]
  if (c.lat && c.lng) {
    naverMap.setCenter(new window.naver.maps.LatLng(c.lat, c.lng))
  }
  markers.restaurant?.setVisible(target === 'restaurant')
  markers.parking?.setVisible(target === 'parking')
}

// ── 꽃잎 ──
let ctx = null, petalArr = [], animId = null, running = false
const isMobile   = window.innerWidth <= 480
const MAX_PETALS = isMobile ? 25 : 50
const SPAWN_PROB = isMobile ? 0.12 : 0.20
const COLORS = ['rgba(245,197,24,A)','rgba(232,180,10,A)','rgba(255,215,80,A)','rgba(200,152,10,A)','rgba(255,230,120,A)','rgba(210,170,60,A)']
const randColor   = () => COLORS[Math.floor(Math.random()*COLORS.length)].replace('A',(0.28+Math.random()*0.32).toFixed(2))
const newPetal    = W => ({x:Math.random()*W,y:-20,rx:2.5+Math.random()*6,rot:Math.random()*Math.PI*2,rotSpd:(Math.random()-.5)*.038,vx:(Math.random()-.5)*.7,vy:.4+Math.random()*.8,swing:Math.random()*Math.PI*2,swingSpd:.015+Math.random()*.018,color:randColor()})
const drawPetal   = p => {ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.rot);ctx.fillStyle=p.color;ctx.beginPath();ctx.ellipse(0,0,p.rx,p.rx*.42,0,0,Math.PI*2);ctx.fill();ctx.strokeStyle='rgba(255,255,255,.15)';ctx.lineWidth=.5;ctx.beginPath();ctx.moveTo(0,-p.rx*.35);ctx.lineTo(0,p.rx*.35);ctx.stroke();ctx.restore()}
const resize      = () => {if(!canvasRef.value)return;canvasRef.value.width=window.innerWidth;canvasRef.value.height=window.innerHeight}
const loop        = () => {if(!running)return;const W=canvasRef.value.width,H=canvasRef.value.height;ctx.clearRect(0,0,W,H);if(petalArr.length<MAX_PETALS&&Math.random()<SPAWN_PROB)petalArr.push(newPetal(W));petalArr.forEach(p=>{p.swing+=p.swingSpd;p.x+=p.vx+Math.sin(p.swing)*.42;p.y+=p.vy;p.rot+=p.rotSpd;drawPetal(p)});petalArr=petalArr.filter(p=>p.y<H+30&&p.x>-60&&p.x<W+60);animId=requestAnimationFrame(loop)}
const startPetals = () => {if(running)return;running=true;canvasRef.value?.classList.remove('off');loop()}
const stopPetals  = () => {running=false;cancelAnimationFrame(animId);canvasRef.value?.classList.add('off');setTimeout(()=>{ctx?.clearRect(0,0,canvasRef.value?.width,canvasRef.value?.height);petalArr=[]},900)}
const togglePetals = () => {petals.value=!petals.value;petals.value?startPetals():stopPetals()}

onMounted(async () => {
  ctx = canvasRef.value.getContext('2d')
  resize()
  window.addEventListener('resize', resize)
  startPetals()
  setTimeout(() => cardRef.value?.classList.add('revealed'), 80)
  await loadNaverSDK()
  await initMap()
})

onUnmounted(() => {
  window.removeEventListener('resize', resize)
  cancelAnimationFrame(animId)
})
</script>

<style lang="scss" scoped>
:root {
  --amber:      #f5c518;
  --amber-deep: #d4a017;
  --amber-dark: #a07810;
  --gold:       #c8980a;
  --gold-soft:  #e8c84a;
  --ivory:      #fffbee;
  --ivory-dark: #f5edcc;
  --brown:      #3d2b00;
  --brown-mid:  #6b4c00;
  --brown-lt:   #9a7230;
  --text-main:  #2a1e00;
  --text-mid:   #5a4010;
  --text-lt:    #8a6c30;
}

.bg-layer { position:fixed;inset:0;z-index:0;pointer-events:none; background:radial-gradient(ellipse 65% 45% at 10% 5%,rgba(245,197,24,.16) 0%,transparent 55%),radial-gradient(ellipse 50% 65% at 90% 95%,rgba(200,152,10,.12) 0%,transparent 52%),radial-gradient(ellipse 130% 130% at 50% 50%,var(--ivory) 0%,var(--ivory-dark) 100%); }

.petal-canvas { position:fixed;inset:0;pointer-events:none;z-index:10;transition:opacity .9s ease; &.off{opacity:0} }

.page-wrap { position:relative;z-index:2;min-height:100vh;display:flex;justify-content:center;align-items:flex-start;padding:44px 16px 80px; }

.invite-card { width:100%;max-width:540px;background:rgba(255,252,238,.95);backdrop-filter:blur(18px);border:1px solid rgba(200,152,10,.28);border-radius:2px;box-shadow:0 0 0 1px rgba(255,255,255,.7) inset,0 2px 0 0 rgba(200,152,10,.4),0 32px 90px rgba(61,43,0,.13),0 8px 24px rgba(61,43,0,.07);overflow:hidden;opacity:0;transform:translateY(30px) scale(.975);transition:opacity 1.1s cubic-bezier(.16,1,.3,1),transform 1.1s cubic-bezier(.16,1,.3,1); &.revealed{opacity:1;transform:translateY(0) scale(1)} }

.hero { position:relative;height:380px;overflow:hidden;background:linear-gradient(160deg,#3d2b00 0%,#1e1600 100%); }
.hero-pattern { position:absolute;inset:0;opacity:.06;background-image:radial-gradient(circle at 50% 50%,var(--amber) 1px,transparent 1px);background-size:28px 28px; }
.hero-deco-circle { position:absolute;border-radius:50%;border:1px solid rgba(245,197,24,.12); &.c1{width:320px;height:320px;top:-80px;right:-80px} &.c2{width:200px;height:200px;top:-30px;right:-30px;border-color:rgba(245,197,24,.18)} &.c3{width:420px;height:420px;bottom:-160px;left:-120px} }
.hero-overlay { position:absolute;inset:0;background:linear-gradient(to bottom,rgba(30,16,0,.15) 0%,rgba(30,16,0,.05) 30%,rgba(30,16,0,.55) 65%,rgba(20,10,0,.92) 100%); }
.hero-text { position:absolute;bottom:0;inset-inline:0;padding:28px 40px 38px;text-align:center;color:#fff; }
.hero-eyebrow { font-family:'Playfair Display',serif;font-style:italic;font-size:11.5px;color:var(--gold-soft);letter-spacing:3.5px;text-transform:uppercase;margin-bottom:10px;opacity:.88;animation:fadeUp .9s .35s both; }
.hero-names { display:flex;align-items:center;justify-content:center;gap:12px;margin-bottom:4px;animation:fadeUp .9s .45s both; }
.hero-name { font-family:'Noto Serif KR',serif;font-size:clamp(24px,6.5vw,34px);font-weight:700;letter-spacing:6px; }
.hero-heart-sep { color:var(--amber);opacity:.9;flex-shrink:0; }
.hero-title { font-family:'Playfair Display',serif;font-size:clamp(40px,10vw,58px);font-weight:700;line-height:1.05;letter-spacing:3px;margin-bottom:8px;animation:fadeUp .9s .55s both; }
.hero-sub { font-size:12px;color:rgba(255,255,255,.5);letter-spacing:2.5px;font-weight:300;margin-bottom:18px;animation:fadeUp .9s .75s both; }
.hero-ornament { display:flex;align-items:center;justify-content:center;gap:14px;color:var(--amber);opacity:.8;animation:fadeUp .9s .95s both; }
.orn-line { width:50px;height:1px; &.l{background:linear-gradient(to right,transparent,rgba(245,197,24,.55))} &.r{background:linear-gradient(to left,transparent,rgba(245,197,24,.55))} }

.card-body { padding:44px 40px 38px; }
.section   { margin-bottom:36px; }
.sec-label { display:flex;align-items:center;gap:7px;font-family:'Playfair Display',serif;font-style:italic;font-size:11px;letter-spacing:2.8px;color:var(--gold);text-transform:uppercase;margin-bottom:16px; }

.greeting { text-align:center;padding-bottom:36px;border-bottom:1px solid rgba(200,152,10,.18); }
.greeting-deco { display:flex;align-items:center;justify-content:center;gap:12px;margin-bottom:20px;color:var(--amber-deep);opacity:.65; }
.deco-line { width:38px;height:1px; &.l{background:linear-gradient(to right,transparent,rgba(200,152,10,.4))} &.r{background:linear-gradient(to left,transparent,rgba(200,152,10,.4))} }
.greeting-main { font-size:17.5px;font-weight:400;color:var(--brown);line-height:2;margin-bottom:16px;word-break:keep-all; em{font-style:normal;color:var(--amber-dark);font-weight:700} }
.greeting-sub  { font-size:13px;color:var(--text-lt);line-height:2.1;font-weight:300;word-break:keep-all; }

.family-grid { display:grid;grid-template-columns:1fr 52px 1fr;align-items:center;gap:12px;background:linear-gradient(135deg,rgba(245,197,24,.09),rgba(200,152,10,.05));border:1px solid rgba(200,152,10,.2);border-radius:3px;padding:26px 18px; }
.family-side { text-align:center; }
.f-badge { display:inline-block;font-size:9.5px;letter-spacing:1.8px;padding:3px 11px;border-radius:20px;margin-bottom:12px;font-family:'Playfair Display',serif;font-style:italic; &.groom{background:rgba(61,43,0,.08);color:var(--brown);border:1px solid rgba(61,43,0,.18)} &.bride{background:rgba(200,152,10,.1);color:var(--gold);border:1px solid rgba(200,152,10,.22)} }
.f-name { font-family:'Noto Serif KR',serif;font-size:21px;font-weight:700;color:var(--brown);letter-spacing:5px;margin-bottom:4px; }
.f-role    { font-size:11.5px;color:var(--text-lt);font-weight:300;margin-bottom:10px; }
.f-parents { font-size:11.5px;color:var(--text-mid);line-height:1.8;font-weight:300; }
.f-center  { display:flex;justify-content:center;align-items:center; }
.and-circle { width:42px;height:42px;background:linear-gradient(135deg,var(--amber) 0%,var(--amber-dark) 100%);border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;box-shadow:0 4px 18px rgba(200,152,10,.35); }

.divider { display:flex;align-items:center;gap:12px;margin-bottom:32px;color:rgba(200,152,10,.4); span{flex:1;height:1px;background:rgba(200,152,10,.18)} }

.info-list { display:flex;flex-direction:column; }
.info-item { display:flex;align-items:flex-start;gap:14px;padding:16px 0;border-bottom:1px solid rgba(200,152,10,.1); &:last-child{border-bottom:none} }
.info-icon { width:40px;height:40px;background:linear-gradient(135deg,rgba(245,197,24,.25),rgba(245,197,24,.08));border:1px solid rgba(200,152,10,.22);border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;color:var(--gold); }
.info-label { font-size:10.5px;color:var(--text-lt);letter-spacing:1.5px;margin-bottom:3px;font-family:'Playfair Display',serif;font-style:italic; }
.info-val     { font-size:14px;font-weight:600;color:var(--text-main);line-height:1.5; }
.info-sub-val { font-size:12.5px;color:var(--text-lt);font-weight:300;margin-top:2px;line-height:1.65;word-break:keep-all; }

.notice { display:flex;gap:12px;background:rgba(200,152,10,.05);border-left:3px solid var(--amber-deep);border-radius:0 3px 3px 0;padding:16px 18px;margin-bottom:28px;font-size:13px;color:var(--text-mid);line-height:1.9;font-weight:300;word-break:keep-all; .notice-icon{color:var(--amber-deep);flex-shrink:0;margin-top:2px} strong{font-weight:700;color:var(--brown)} }

.map-tabs { display:flex;gap:8px;margin-bottom:14px; }
.map-tab { flex:1;padding:10px 8px;border:1.5px solid rgba(200,152,10,.3);border-radius:3px;background:transparent;font-family:'Noto Serif KR',serif;font-size:12px;color:var(--text-lt);cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px;transition:all .22s; &.active{background:var(--brown);border-color:var(--brown);color:#fff} }

.map-frame-wrap { border-radius:3px;overflow:hidden;border:1px solid rgba(200,152,10,.22);margin-bottom:16px;position:relative; }
.naver-map { width:100%;height:230px; }

// 공통 컨트롤 버튼
.map-ctrl-btn {
  width:32px;height:32px;
  background:rgba(255,252,238,.92);
  border:1px solid rgba(200,152,10,.25);
  border-radius:3px;cursor:pointer;
  display:flex;align-items:center;justify-content:center;
  color:var(--brown-mid);
  transition:all .18s;
  backdrop-filter:blur(4px);
  &:hover { background:rgba(245,197,24,.15);border-color:var(--amber-deep);color:var(--brown); }
}
.map-ctrl-divider { height:1px;background:rgba(200,152,10,.2);margin:2px 4px; }

// 우측 상단: 줌인/아웃
.map-ctrl-zoom {
  position:absolute;top:10px;right:10px;
  display:flex;flex-direction:column;gap:0;
  box-shadow:0 2px 8px rgba(61,43,0,.12);
  border-radius:3px;overflow:hidden;
  .map-ctrl-btn { border-radius:0;border:none;border-bottom:1px solid rgba(200,152,10,.15);
    &:last-child{border-bottom:none} }
}

// 좌측 상단: 내 위치 + 크게 보기
.map-ctrl-side {
  position:absolute;top:10px;left:10px;
  display:flex;flex-direction:column;gap:4px;
  .map-ctrl-btn { box-shadow:0 2px 8px rgba(61,43,0,.12); }
}

.nav-group { margin-bottom:12px; &:last-child{margin-bottom:0} }
.nav-group-label { display:flex;align-items:center;gap:6px;font-family:'Playfair Display',serif;font-style:italic;font-size:10.5px;letter-spacing:1.5px;color:var(--text-lt);margin-bottom:7px; }

.btn-map-row { display:grid;grid-template-columns:1fr 1fr;gap:8px; }

.btn-map {
  padding:12px 8px;
  border-radius:3px;
  font-family:'Noto Serif KR',serif;font-size:12.5px;cursor:pointer;
  display:flex;align-items:center;justify-content:center;gap:6px;
  transition:all .22s;text-decoration:none;border:1.5px solid;

  // 네이버 — 골드 채움
  &.btn-naver {
    background:linear-gradient(135deg, var(--amber-deep) 0%, var(--amber-dark) 100%);
    border-color:var(--amber-dark);
    color:#fff;
    font-weight:600;
    box-shadow:0 2px 8px rgba(200,152,10,.3);
    &:hover { background:linear-gradient(135deg,#c8980a 0%,#8a6010 100%);box-shadow:0 4px 14px rgba(200,152,10,.45); }
  }

  // 카카오 — 골드 아웃라인
  &.btn-kakao {
    background:rgba(245,197,24,.08);
    border-color:rgba(200,152,10,.35);
    color:var(--brown-mid);
    &:hover { background:rgba(245,197,24,.16);border-color:var(--amber-deep);color:var(--brown); }
  }
}

.petal-wrap { display:flex;justify-content:center;margin-top:8px; }
.petal-btn { display:inline-flex;align-items:center;gap:10px;padding:11px 22px;background:transparent;border:1px dashed rgba(200,152,10,.38);border-radius:40px;cursor:pointer;font-family:'Noto Serif KR',serif;font-size:13px;color:var(--text-lt);transition:all .25s;user-select:none; &:hover{background:rgba(200,152,10,.08);color:var(--gold)} &.on{color:var(--brown-mid)} }
.toggle-track { width:34px;height:19px;background:#d4c090;border-radius:10px;position:relative;transition:background .3s; .petal-btn.on &{background:var(--amber-deep)} }
.toggle-thumb { position:absolute;width:13px;height:13px;background:#fff;border-radius:50%;top:3px;left:3px;transition:transform .3s;box-shadow:0 1px 4px rgba(0,0,0,.2); .petal-btn.on &{transform:translateX(15px)} }

.card-footer { background:linear-gradient(160deg,var(--brown) 0%,#1e1200 100%);padding:28px 40px;text-align:center; }
.footer-heart { color:var(--amber);display:block;margin:0 auto 10px;opacity:.85; }
.footer-txt  { font-family:'Noto Serif KR',serif;font-size:13px;color:rgba(255,255,255,.5);margin-bottom:4px;font-weight:300;letter-spacing:1px; }
.footer-copy { font-family:'Playfair Display',serif;font-style:italic;font-size:12px;color:rgba(245,197,24,.45);letter-spacing:1.5px; }

@keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }

@media (max-width: 480px) {
  .hero{height:320px} .hero-text{padding:20px 20px 28px} .card-body{padding:28px 20px 26px}
  .family-grid{grid-template-columns:1fr 42px 1fr;padding:18px 10px} .f-name{font-size:17px;letter-spacing:3px}
  .card-footer{padding:22px 20px} .page-wrap{padding:24px 10px 60px}
}
</style>
