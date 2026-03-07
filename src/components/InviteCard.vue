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
            
        <div class="f-parents">
  <div class="f-parent-row"><span class="f-relation">이모부</span><span class="f-pname">박돈영</span></div>
  <div class="f-parent-row"><span class="f-relation">이모</span><span class="f-pname">김숙정</span></div>
</div>
            </div>
            <div class="f-center">
              <div class="and-circle"><span class="and-symbol">∞</span></div>
            </div>
            <div class="family-side">
              <span class="f-badge bride">신부 측</span>
              <div class="f-name">김은지</div>
              <div class="f-role">장녀</div>
             <div class="f-parents">
  <div class="f-parent-row"><span class="f-relation">부</span><span class="f-pname">김용철</span></div>
  <div class="f-parent-row"><span class="f-relation">모</span><span class="f-pname">원혜숙</span></div>
</div>
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
                <div class="info-val">
                  <a v-if="item.type === 'tel'" :href="`tel:+82${item.value.replaceAll('-','').slice(1)}`">{{ item.value }}</a>
                  <a v-else>{{ item.value }}</a>
                </div>
                <div v-if="item.sub" class="info-sub-val">
                  <a v-if="item.type === 'tel'" :href="`tel:+82${item.sub.replaceAll('-','').slice(1)}`">{{ item.sub }}</a>
                  <a v-else>{{ item.sub }}</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 공지 -->
        <div class="notice">
          <Info :size="15" class="notice-icon" />
          <div>
            <p>부족한 자리이지만 함께해 주신다면</p>
            <p>더없는 기쁨이 되겠습니다.</p>
            <p>편안한 마음으로 왕림해 주시길 바랍니다.</p>
          </div>
        </div>

        <!-- 오시는 길 -->
        <section class="section">
          <span class="sec-label"><MapPinned :size="13" />오시는 길</span>

          <!-- 장소 설명 카드 -->
          <div class="place-card">
            <div class="place-card-inner" :class="{ visible: activeMap === 'restaurant' }">
              <div class="place-title"><UtensilsCrossed :size="13" />모담 김포 본점</div>
              <div class="place-desc">전통 한정식 전문점 · 프라이빗 룸 운영<br/>경기도 김포시 모담공원로167번길 105</div>

            </div>
            <div class="place-card-inner" :class="{ visible: activeMap === 'parking' }">
              <div class="place-title"><SquareParking :size="13" />김포 아트빌리지 주차장</div>
              <div class="place-desc">식당에서 도보 약 2분<br/>경기도 김포시 모담공원로 170</div>

            </div>
          </div>

          <div class="map-tabs">
            <button class="map-tab" :class="{ active: activeMap === 'restaurant' }" @click="switchMap('restaurant')">
              <UtensilsCrossed :size="14" />모담 본점 위치
            </button>
            <button class="map-tab" :class="{ active: activeMap === 'parking' }" @click="switchMap('parking')">
              <SquareParking :size="14" />주차장 위치
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

        <!-- 꽃잎 토글 
        <div class="petal-wrap">
          <button class="petal-btn" :class="{ on: petals }" @click="togglePetals">
            <Sparkles :size="14" />꽃잎 효과
            <div class="toggle-track"><div class="toggle-thumb" /></div>
          </button>
        </div>
        -->

      </div>

      <div class="card-footer">
        <Heart class="footer-heart" :size="14" />
        <p class="footer-txt">2026년 봄, 두 가족의 첫 만남</p>
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
const PARK_NAME     = '김포 아트빌리지 주차장'
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

const kakaoRestUrl  = ref('#')
const kakaoParkUrl  = ref('#')

const infoItems = [
  { icon: CalendarDays,  label: '일 시', value: '2026년 3월 8일 (일요일)',    sub: '오후 1시 15분  ·  도착은 오후 1시 권장', type:'text' },
  { icon: MapPin,        label: '장 소', value: '모담 김포 본점 (한정식)',      sub: REST_ADDR , type:'text'},
  { icon: SquareParking, label: '주 차', value: PARK_NAME,                     sub: '식당에서 도보 약 2분', type:'text' },
  { icon: Phone,         label: '문 의', value: '신랑 측 010-2052-9118',       sub: '신부 측 010-5095-5127' , type:'tel'},
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

const makeMarker = (latLng, label, placeUrl) => {
  const marker = new window.naver.maps.Marker({
    position: latLng,
    map: naverMap,
    icon: {
      content: `
        <div style="
          transform:translateX(-50%);
          background:#c45878;color:#fff;
          font-family:'Noto Serif KR',serif;
          font-size:11px;font-weight:600;
          padding:5px 10px;border-radius:3px;
          white-space:nowrap;
          box-shadow:0 2px 8px rgba(61,43,0,.4);
          position:relative;
          cursor:pointer;
        ">
          ${label}
          <div style="
            position:absolute;bottom:-6px;left:50%;
            transform:translateX(-50%);
            border-left:6px solid transparent;
            border-right:6px solid transparent;
            border-top:6px solid #c45878;
          "></div>
        </div>`,
      anchor: new window.naver.maps.Point(0, 34),
    },
  })
  // 더블클릭 시 장소 페이지 오픈
  if (placeUrl) {
    window.naver.maps.Event.addListener(marker, 'dblclick', () => {
      window.open(placeUrl, '_blank')
    })
  }
  return marker
}

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
    markers.restaurant = makeMarker(latLng, REST_NAME, `https://map.naver.com/p/entry/place/${REST_PLACE_ID}`)
  } catch (e) {
    console.error('식당 geocode 실패', e)
  }

  // 주차장 — 좌표 직접 지정 (geocoder 오인식 방지)
  {
    const c = { lat: 37.6469362, lng: 126.6972285 }
    coords.parking = c
    kakaoParkUrl.value = `https://map.kakao.com/link/to/${encodeURIComponent(PARK_NAME)},${c.lat},${c.lng}`
    const latLng = new naver.maps.LatLng(c.lat, c.lng)
    markers.parking = makeMarker(latLng, PARK_NAME, `https://map.naver.com/p/entry/place/${PARK_PLACE_ID}`)
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
  navigator.geolocation.getCurrentPosition(({ coords: c }) => {
    if (!naverMap) return
    const pos = new window.naver.maps.LatLng(c.latitude, c.longitude)
    naverMap.setCenter(pos)
    naverMap.setZoom(17)
    if (myMarker) { myMarker.setPosition(pos) } else {
    myMarker = new window.naver.maps.Marker({
      position: pos,
      map: naverMap,
      icon: {
        content: `<div style="width:14px;height:14px;background:#4a90e2;border:2.5px solid #fff;border-radius:50%;box-shadow:0 2px 8px rgba(74,144,226,.5)"></div>`,
        anchor: new window.naver.maps.Point(7, 7),
      },
    })
    }
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

// ── 벚꽃 꽃잎 ──
let ctx = null, petalArr = [], animId = null, running = false
const isMobile   = window.innerWidth <= 480
const MAX_PETALS = isMobile ? 22 : 22
const SPAWN_PROB = isMobile ? 0.90 : 0.10

// 벚꽃 색상 팔레트 — 연분홍~흰색 계열
const PETAL_COLORS = [
  [255, 210, 220], // 연한 핑크
  [255, 228, 234], // 밝은 핑크
  [255, 243, 246], // 거의 흰색
  [252, 196, 211], // 중간 핑크
  [248, 175, 195], // 진한 핑크
  [255, 235, 240], // 아이보리 핑크
]
const randPetalColor = (alpha) => {
  const [r,g,b] = PETAL_COLORS[Math.floor(Math.random()*PETAL_COLORS.length)]
  return `rgba(${r},${g},${b},${alpha})`
}

const newPetal = W => {
  const type = Math.random() < 0.72 ? 'single' : 'flower'
  const baseAlpha = 0.6 + Math.random() * 0.35
  return {
    x: Math.random() * W,
    y: -25,
    size: type === 'flower' ? 6 + Math.random() * 5 : 7 + Math.random() * 9,
    rot: Math.random() * Math.PI * 2,
    rotSpd: (Math.random() - .5) * .028,
    tilt: (Math.random() - .5) * .6,   // 옆으로 기울어진 정도
    vx: (Math.random() - .5) * .9,
    vy: .3 + Math.random() * .65,
    swing: Math.random() * Math.PI * 2,
    swingSpd: .010 + Math.random() * .018,
    color: randPetalColor(baseAlpha),
    colorDark: randPetalColor(Math.min(1, baseAlpha + 0.15)),
    colorLight: randPetalColor(Math.max(0, baseAlpha - 0.2)),
    type,
  }
}

// 꽃잎 한 장 — 더 사실적인 벚꽃 꽃잎
const drawSinglePetal = (size, color, colorDark, colorLight, tilt) => {
  const w = size * 0.52
  const h = size * 1.5

  ctx.save()
  ctx.scale(1, 1 - Math.abs(tilt) * 0.3) // 기울기에 따라 납작하게

  // 꽃잎 그라디언트 — 베이스에서 끝으로
  const grad = ctx.createLinearGradient(-w*.3, h*.4, w*.3, -h*.5)
  grad.addColorStop(0,   colorLight)
  grad.addColorStop(0.4, color)
  grad.addColorStop(1,   colorDark)
  ctx.fillStyle = grad

  // 꽃잎 외곽선 path
  ctx.beginPath()
  ctx.moveTo(0, h * .44)
  // 왼쪽 — 자연스러운 볼록 곡선
  ctx.bezierCurveTo(
    -w * 1.15, h * .18,
    -w * 1.08, -h * .22,
    -w * .18,  -h * .44
  )
  // 끝 노치 — 벚꽃 특유의 오목한 하트 끝
  ctx.bezierCurveTo(
    -w * .06, -h * .52,
     w * .06, -h * .52,
     w * .18,  -h * .44
  )
  // 오른쪽
  ctx.bezierCurveTo(
     w * 1.08, -h * .22,
     w * 1.15,  h * .18,
     0,         h * .44
  )
  ctx.fill()

  // 테두리 살짝 (투명도 낮게)
  ctx.strokeStyle = colorDark.replace(/[\d.]+\)$/, '0.15)')
  ctx.lineWidth = 0.4
  ctx.stroke()

  ctx.restore()

  // 중앙 잎맥
  ctx.strokeStyle = 'rgba(255,255,255,0.4)'
  ctx.lineWidth = 0.65
  ctx.lineCap = 'round'
  ctx.beginPath()
  ctx.moveTo(0, h * .38)
  ctx.bezierCurveTo(0, h*.12, tilt*w*.3, -h*.15, tilt*w*.1, -h*.4)
  ctx.stroke()

  // 잎맥 가지 2개
  ctx.strokeStyle = 'rgba(255,255,255,0.18)'
  ctx.lineWidth = 0.35
  ctx.beginPath()
  ctx.moveTo(tilt*w*.05, h*.08)
  ctx.quadraticCurveTo(-w*.55, -h*.08, -w*.75, -h*.22)
  ctx.moveTo(tilt*w*.05, h*.08)
  ctx.quadraticCurveTo( w*.55, -h*.08,  w*.75, -h*.22)
  ctx.stroke()
}

// 5장 벚꽃 전체
const drawFullFlower = (size, color, colorDark, colorLight) => {
  for (let i = 0; i < 5; i++) {
    ctx.save()
    ctx.rotate((i / 5) * Math.PI * 2 + Math.PI / 10)
    // 꽃잎마다 색 살짝 다르게
    const variation = (Math.random() - .5) * 15
    const c  = color.replace(/rgba\((\d+),(\d+),(\d+)/, (_, r,g,b) =>
      `rgba(${Math.min(255,+r+variation)},${Math.min(255,+g+variation*.6)},${Math.min(255,+b+variation*.4)}`)
    drawSinglePetal(size * .72, c, colorDark, colorLight, (Math.random()-.5)*.3)
    ctx.restore()
  }
  // 꽃술 — 노란 점들
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2
    const r = size * .22
    ctx.fillStyle = 'rgba(255,235,140,0.85)'
    ctx.beginPath()
    ctx.arc(Math.cos(angle)*r, Math.sin(angle)*r, size*.055, 0, Math.PI*2)
    ctx.fill()
  }
  // 중심원
  const cg = ctx.createRadialGradient(0,0,0, 0,0,size*.18)
  cg.addColorStop(0, 'rgba(255,245,180,0.95)')
  cg.addColorStop(1, 'rgba(255,210,100,0.5)')
  ctx.fillStyle = cg
  ctx.beginPath()
  ctx.arc(0, 0, size * .18, 0, Math.PI * 2)
  ctx.fill()
}

const drawPetal = p => {
  ctx.save()
  ctx.translate(p.x, p.y)
  ctx.rotate(p.rot)

  if (p.type === 'flower') {
    drawFullFlower(p.size, p.color, p.colorDark, p.colorLight)
  } else {
    drawSinglePetal(p.size, p.color, p.colorDark, p.colorLight, p.tilt)
  }

  ctx.restore()
}

const resize      = () => {if(!canvasRef.value)return;canvasRef.value.width=window.innerWidth;canvasRef.value.height=window.innerHeight}
const loop        = () => {if(!running)return;const W=canvasRef.value.width,H=canvasRef.value.height;ctx.clearRect(0,0,W,H);if(petalArr.length<MAX_PETALS&&Math.random()<SPAWN_PROB)petalArr.push(newPetal(W));petalArr.forEach(p=>{p.swing+=p.swingSpd;p.x+=p.vx+Math.sin(p.swing)*.55;p.y+=p.vy;p.rot+=p.rotSpd;drawPetal(p)});petalArr=petalArr.filter(p=>p.y<H+30&&p.x>-60&&p.x<W+60);animId=requestAnimationFrame(loop)}
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
  --pink:       #e8a0b4;
  --pink-deep:  #d4708a;
  --pink-dark:  #b85070;
  --pink-soft:  #f4c2d0;
  --pink-pale:  #fce8ef;
  --blush:      #f9d0dc;
  --white:      #ffffff;
  --white-warm: #fdfafe;
  --white-soft: #f8f0f4;
  --text-main:  #3a1a28;
  --text-mid:   #7a4060;
  --text-lt:    #b08098;
  --rose:       #c45878;
  --rose-lt:    #e8a0b8;
}

.bg-layer {
  position:fixed;inset:0;z-index:0;pointer-events:none;
  background:
    radial-gradient(ellipse 70% 50% at 15% 0%,   rgba(255,192,210,.22) 0%,transparent 55%),
    radial-gradient(ellipse 55% 60% at 88% 100%,  rgba(232,160,180,.15) 0%,transparent 52%),
    radial-gradient(ellipse 140% 140% at 50% 50%, #ffffff 0%,#fdf0f4 100%);
}

.petal-canvas { position:fixed;inset:0;pointer-events:none;z-index:10;transition:opacity .9s ease; &.off{opacity:0} }

.page-wrap { position:relative;z-index:2;min-height:100vh;display:flex;justify-content:center;align-items:flex-start;padding:44px 16px 80px; }

.invite-card {
  width:100%;max-width:540px;
  background:rgba(255,255,255,.96);
  backdrop-filter:blur(20px);
  border:1px solid rgba(232,160,180,.35);
  border-radius:4px;
  box-shadow:
    0 0 0 1px rgba(255,255,255,.95) inset,
    0 1px 0 0 rgba(255,192,210,.6),
    0 -1px 0 0 rgba(255,255,255,.8),
    0 32px 90px rgba(180,80,120,.12),
    0 8px 28px rgba(180,80,120,.08);
  overflow:hidden;opacity:0;transform:translateY(30px) scale(.975);
  transition:opacity 1.1s cubic-bezier(.16,1,.3,1),transform 1.1s cubic-bezier(.16,1,.3,1);
  &.revealed{opacity:1;transform:translateY(0) scale(1)}
}

// ── 히어로 ──
.hero {
  position:relative;height:400px;overflow:hidden;
  background:linear-gradient(155deg,#5a1a30 0%,#2e0a1a 55%,#150310 100%);
}
.hero-pattern {
  position:absolute;inset:0;opacity:.06;
  background-image:
    radial-gradient(circle at 50% 50%,rgba(255,192,210,1) 1px,transparent 1px),
    radial-gradient(circle at 50% 50%,rgba(255,220,230,1) 1px,transparent 1px);
  background-size:24px 24px, 12px 12px;
  background-position: 0 0, 6px 6px;
}
.hero-deco-circle {
  position:absolute;border-radius:50%;border:1px solid rgba(255,183,197,.15);
  &.c1{width:320px;height:320px;top:-80px;right:-80px}
  &.c2{width:200px;height:200px;top:-30px;right:-30px;border-color:rgba(255,183,197,.22)}
  &.c3{width:420px;height:420px;bottom:-160px;left:-120px}
}
.hero-overlay {
  position:absolute;inset:0;
  background:linear-gradient(to bottom,rgba(90,26,48,.1) 0%,rgba(60,10,25,.05) 30%,rgba(40,5,15,.5) 65%,rgba(20,2,8,.92) 100%);
}
.hero-text { position:absolute;bottom:0;inset-inline:0;padding:28px 40px 38px;text-align:center;color:#fff; }
.hero-eyebrow { font-family:'Playfair Display',serif;font-style:italic;font-size:11.5px;color:var(--pink-soft);letter-spacing:3.5px;text-transform:uppercase;margin-bottom:10px;opacity:.9;animation:fadeUp .9s .35s both; }
.hero-names { display:flex;align-items:center;justify-content:center;gap:12px;margin-bottom:4px;animation:fadeUp .9s .45s both; }
.hero-name { font-family:'Noto Serif KR',serif;font-size:clamp(24px,6.5vw,34px);font-weight:700;letter-spacing:6px; }
.hero-heart-sep { color:var(--pink-soft);opacity:.9;flex-shrink:0; }
.hero-title { font-family:'Playfair Display',serif;font-size:clamp(40px,10vw,58px);font-weight:700;line-height:1.05;letter-spacing:3px;margin-bottom:8px;animation:fadeUp .9s .55s both; }
.hero-sub { font-size:12px;color:rgba(255,220,230,.55);letter-spacing:2.5px;font-weight:300;margin-bottom:18px;animation:fadeUp .9s .75s both; }
.hero-ornament { display:flex;align-items:center;justify-content:center;gap:14px;color:var(--pink-soft);opacity:.75;animation:fadeUp .9s .95s both; }
.orn-line { width:50px;height:1px; &.l{background:linear-gradient(to right,transparent,rgba(255,183,197,.6))} &.r{background:linear-gradient(to left,transparent,rgba(255,183,197,.6))} }

// ── 카드 바디 ──
.card-body { padding:44px 40px 38px; }
.section   { margin-bottom:36px; }
.sec-label { display:flex;align-items:center;gap:7px;font-family:'Playfair Display',serif;font-style:italic;font-size:11px;letter-spacing:2.8px;color:var(--pink-deep);text-transform:uppercase;margin-bottom:16px; }

.greeting { text-align:center;padding-bottom:36px;border-bottom:1px solid rgba(212,112,138,.15); }
.greeting-deco { display:flex;align-items:center;justify-content:center;gap:12px;margin-bottom:20px;color:var(--pink-deep);opacity:.6; }
.deco-line { width:38px;height:1px; &.l{background:linear-gradient(to right,transparent,rgba(212,112,138,.4))} &.r{background:linear-gradient(to left,transparent,rgba(212,112,138,.4))} }
.greeting-main { font-size:17.5px;font-weight:400;color:var(--text-main);line-height:2.1;margin-bottom:16px;word-break:keep-all; em{font-style:normal;color:var(--rose);font-weight:700;border-bottom:1.5px solid rgba(196,88,120,.25);padding-bottom:1px;} }
.greeting-sub  { font-size:13px;color:var(--text-lt);line-height:2.1;font-weight:300;word-break:keep-all; }

.family-grid {
  display:grid;grid-template-columns:1fr 52px 1fr;align-items:center;gap:12px;
  background:linear-gradient(135deg,rgba(255,192,210,.08) 0%,rgba(255,255,255,.6) 50%,rgba(232,160,180,.06) 100%);
  border:1px solid rgba(212,112,138,.16);border-radius:6px;padding:28px 18px;
  box-shadow:0 2px 16px rgba(180,80,120,.06) inset;
}
.family-side { text-align:center; }
.f-badge {
  display:inline-block;font-size:9.5px;letter-spacing:1.8px;padding:3px 11px;border-radius:20px;
  margin-bottom:12px;font-family:'Playfair Display',serif;font-style:italic;
  &.groom{background:rgba(58,26,40,.07);color:var(--text-main);border:1px solid rgba(58,26,40,.15)}
  &.bride{background:rgba(212,112,138,.12);color:var(--rose);border:1px solid rgba(212,112,138,.25)}
}
.f-name { font-family:'Noto Serif KR',serif;font-size:21px;font-weight:700;color:var(--text-main);letter-spacing:5px;margin-bottom:4px; }
.f-role    { font-size:11.5px;color:var(--text-lt);font-weight:300;margin-bottom:10px; }
.f-parents { font-size:11.5px;color:var(--text-mid);line-height:1.8;font-weight:300; }
.f-center  { display:flex;justify-content:center;align-items:center; }
.and-circle {
  width:44px;height:44px;
  background:linear-gradient(135deg,#e8a0b4 0%,#c45878 100%);
  border-radius:50%;display:flex;align-items:center;justify-content:center;
  box-shadow:0 4px 16px rgba(180,80,120,.32),0 0 0 3px rgba(232,160,180,.3);
}
.and-symbol {
  font-size:19px;font-weight:400;letter-spacing:0;
  line-height:1;color:#ffffff;
  font-family:'Playfair Display',serif;
  text-shadow:0 1px 3px rgba(120,30,60,.3);
}

.divider { display:flex;align-items:center;gap:12px;margin-bottom:32px;color:rgba(212,112,138,.35); span{flex:1;height:1px;background:rgba(212,112,138,.15)} }

.info-list { display:flex;flex-direction:column; }
.info-item { display:flex;align-items:flex-start;gap:14px;padding:16px 0;border-bottom:1px solid rgba(212,112,138,.1); &:last-child{border-bottom:none} }
.info-icon {
  width:40px;height:40px;
  background:linear-gradient(135deg,rgba(255,192,210,.3),rgba(255,192,210,.08));
  border:1px solid rgba(212,112,138,.2);border-radius:50%;
  display:flex;align-items:center;justify-content:center;flex-shrink:0;color:var(--pink-deep);
}
.info-label { font-size:10.5px;color:var(--text-lt);letter-spacing:1.5px;margin-bottom:3px;font-family:'Playfair Display',serif;font-style:italic; }
.info-val     { font-size:14px;font-weight:600;color:var(--text-main);line-height:1.5;   text-decoration: none;
  color: inherit;}
.info-sub-val { font-size:12.5px;color:var(--text-lt);font-weight:300;margin-top:2px;line-height:1.65;word-break:keep-all;   text-decoration: none;
  color: inherit;}

  .info-val > a, .info-sub-val > a
  {text-decoration: none;
  color: inherit;}

.notice {
  display:flex;gap:12px;
  background:rgba(212,112,138,.05);
  border-left:3px solid var(--pink-deep);
  border-radius:0 4px 4px 0;padding:16px 18px;margin-bottom:28px;
  font-size:13px;color:var(--text-mid);line-height:1.9;font-weight:300;word-break:keep-all;
  .notice-icon{color:var(--pink-deep);flex-shrink:0;margin-top:2px}
  strong{font-weight:700;color:var(--text-main)}
}

.map-tabs { display:flex;gap:8px;margin-bottom:14px; }
.map-tab {
  flex:1;padding:10px 8px;
  border:1.5px solid rgba(212,112,138,.25);border-radius:4px;
  background:transparent;font-family:'Noto Serif KR',serif;font-size:12px;
  color:var(--text-lt);cursor:pointer;
  display:flex;align-items:center;justify-content:center;gap:6px;transition:all .22s;
  &.active{background:linear-gradient(135deg,#5a1a30,#3a0a1a);border-color:transparent;color:#fff}
}

.map-frame-wrap { border-radius:4px;overflow:hidden;border:1px solid rgba(212,112,138,.2);margin-bottom:16px;position:relative; }
.naver-map { width:100%;height:230px; }

.map-ctrl-btn {
  width:32px;height:32px;
  background:rgba(255,255,255,.94);
  border:1px solid rgba(212,112,138,.22);
  border-radius:4px;cursor:pointer;
  display:flex;align-items:center;justify-content:center;
  color:var(--text-mid);transition:all .18s;backdrop-filter:blur(4px);
  &:hover { background:rgba(255,192,210,.2);border-color:var(--pink-deep);color:var(--rose); }
}
.map-ctrl-divider { height:1px;background:rgba(212,112,138,.18);margin:2px 4px; }
.map-ctrl-zoom {
  position:absolute;top:10px;right:10px;
  display:flex;flex-direction:column;
  box-shadow:0 2px 8px rgba(180,80,120,.12);
  border-radius:4px;overflow:hidden;
  .map-ctrl-btn { border-radius:0;border:none;border-bottom:1px solid rgba(212,112,138,.12);&:last-child{border-bottom:none} }
}
.map-ctrl-side {
  position:absolute;top:10px;left:10px;
  display:flex;flex-direction:column;gap:4px;
  .map-ctrl-btn { box-shadow:0 2px 8px rgba(180,80,120,.12); }
}

.place-card { margin-bottom:14px;min-height:72px;position:relative; }
.place-card-inner {
  position:absolute;inset:0;
  background:linear-gradient(135deg,rgba(255,192,210,.1),rgba(232,160,180,.04));
  border:1px solid rgba(212,112,138,.18);border-radius:4px;
  padding:12px 14px;opacity:0;pointer-events:none;transition:opacity .25s;
  &.visible { opacity:1;pointer-events:auto;position:relative; }
}
.place-title { display:flex;align-items:center;gap:6px;font-size:12.5px;font-weight:700;color:var(--text-main);margin-bottom:5px; }
.place-desc  { font-size:11.5px;color:var(--text-lt);line-height:1.75;font-weight:300; }

.nav-group { margin-bottom:12px; &:last-child{margin-bottom:0} }
.nav-group-label { display:flex;align-items:center;gap:6px;font-family:'Playfair Display',serif;font-style:italic;font-size:10.5px;letter-spacing:1.5px;color:var(--text-lt);margin-bottom:7px; }

.btn-map-row { display:grid;grid-template-columns:1fr 1fr;gap:8px; }
.btn-map {
  padding:12px 8px;border-radius:4px;
  font-family:'Noto Serif KR',serif;font-size:12.5px;cursor:pointer;
  display:flex;align-items:center;justify-content:center;gap:6px;
  transition:all .22s;text-decoration:none;border:1.5px solid;
  &.btn-naver {
    background:linear-gradient(135deg,rgba(255,192,210,.2),rgba(212,112,138,.12));
    border-color:rgba(212,112,138,.38);color:var(--rose);font-weight:600;
    &:hover { background:linear-gradient(135deg,rgba(255,192,210,.32),rgba(212,112,138,.2));border-color:var(--pink-deep); }
  }
  &.btn-kakao {
    background:rgba(255,192,210,.08);
    border-color:rgba(212,112,138,.25);color:var(--text-mid);
    &:hover { background:rgba(255,192,210,.18);border-color:var(--pink-deep);color:var(--rose); }
  }
}

.petal-wrap { display:flex;justify-content:center;margin-top:8px; }
.petal-btn {
  display:inline-flex;align-items:center;gap:10px;padding:11px 22px;
  background:transparent;border:1px dashed rgba(212,112,138,.35);border-radius:40px;
  cursor:pointer;font-family:'Noto Serif KR',serif;font-size:13px;
  color:var(--text-lt);transition:all .25s;user-select:none;
  &:hover{background:rgba(255,192,210,.12);color:var(--pink-deep)}
  &.on{color:var(--rose)}
}
.toggle-track {
  width:34px;height:19px;background:#e8c0cc;border-radius:10px;position:relative;transition:background .3s;
  .petal-btn.on &{background:var(--pink-deep)}
}
.toggle-thumb {
  position:absolute;width:13px;height:13px;background:#fff;border-radius:50%;top:3px;left:3px;
  transition:transform .3s;box-shadow:0 1px 4px rgba(0,0,0,.2);
  .petal-btn.on &{transform:translateX(15px)}
}

.card-footer {
  background:linear-gradient(155deg,#5a1a30 0%,#2e0a1a 60%,#1a0510 100%);
  padding:28px 40px;text-align:center;
}
.footer-heart { color:var(--pink-soft);display:block;margin:0 auto 10px;opacity:.85; }
.footer-txt  { font-family:'Noto Serif KR',serif;font-size:13px;color:rgba(255,220,230,.5);margin-bottom:4px;font-weight:300;letter-spacing:1px; }
.footer-copy { font-family:'Playfair Display',serif;font-style:italic;font-size:12px;color:rgba(255,183,197,.45);letter-spacing:1.5px; }

@keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }

@media (max-width: 480px) {
  .hero{height:320px} .hero-text{padding:20px 20px 28px} .card-body{padding:28px 20px 26px}
  .family-grid{grid-template-columns:1fr 42px 1fr;padding:18px 10px} .f-name{font-size:17px;letter-spacing:3px}
  .card-footer{padding:22px 20px} .page-wrap{padding:24px 10px 60px}
}

.f-parent-row {
  display: flex;
  gap: 8px;
  justify-content: center; /* family-side가 text-align:center면 이걸로 */
}

.f-relation {
  min-width: 30px;
  text-align: right;
  color: #999;
  font-size: 12px;
}

.f-pname {
  text-align: left;
  font-size: 12px;
}
</style>
