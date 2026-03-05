<template>
  <!-- 배경 -->
  <div class="bg-layer"></div>

  <!-- 꽃잎 캔버스 -->
  <canvas ref="canvasRef" id="petalCanvas"></canvas>

  <div class="page-wrap">
    <div class="invite-card" ref="card">

      <!-- ══ 히어로 이미지 ══ -->
      <div class="hero">
        <div class="hero-placeholder">
          <div class="placeholder-inner">
            <i class="fa-regular fa-image"></i>
            <p>커플 사진이 들어갑니다</p>
            <small>src/assets/main-photo.jpg</small>
          </div>
        </div>
        <div class="hero-overlay"></div>
        <div class="hero-text">
          <p class="hero-eyebrow">Sanggyeonrye Invitation</p>
          <h1 class="hero-title">상견례</h1>
          <p class="hero-sub">兩家의 아름다운 첫 만남</p>
          <div class="hero-ornament">
            <span class="orn-line l"></span>
            <i class="fa-solid fa-heart"></i>
            <span class="orn-line r"></span>
          </div>
        </div>
      </div>


      <!-- ══ 카드 바디 ══ -->
      <div class="card-body">

        <!-- 인사말 -->
        <section class="section greeting">
          <div class="greeting-deco">
            <span class="deco-line l"></span>
            <i class="fa-solid fa-leaf"></i>
            <span class="deco-line r"></span>
          </div>
          <p class="greeting-main">
            두 사람의 <em>사랑</em>이 하나가 되는 날,<br />
            소중한 두 가족의 만남에<br />
            여러분을 정중히 초대합니다.
          </p>
          <p class="greeting-sub">
            바쁘신 중에도 함께해 주신다면<br />
            두 가족 모두 더없는 기쁨이 되겠습니다.
          </p>
        </section>

        <!-- 양가 소개 -->
        <section class="section">
          <span class="sec-label"><i class="fa-solid fa-users"></i>&ensp;양가 소개</span>
          <div class="family-grid">
            <div class="family-side">
              <span class="f-badge groom">신랑 측</span>
              <div class="f-name">김 ○ ○</div>
              <div class="f-role">장남</div>
              <div class="f-parents">부 김○○<br />모 이○○</div>
            </div>
            <div class="f-center">
              <div class="and-circle"><i class="fa-solid fa-infinity"></i></div>
            </div>
            <div class="family-side">
              <span class="f-badge bride">신부 측</span>
              <div class="f-name">이 ○ ○</div>
              <div class="f-role">장녀</div>
              <div class="f-parents">부 이○○<br />모 박○○</div>
            </div>
          </div>
        </section>

        <!-- 구분선 -->
        <div class="divider"><span></span><i class="fa-solid fa-circle-dot"></i><span></span></div>

        <!-- 행사 안내 -->
        <section class="section">
          <span class="sec-label"><i class="fa-solid fa-calendar-heart"></i>&ensp;행사 안내</span>
          <div class="info-list">
            <div class="info-item" v-for="item in infoItems" :key="item.label">
              <div class="info-icon"><i :class="item.icon"></i></div>
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
          <i class="fa-solid fa-circle-info"></i>
          <div>
            <p>참석 여부를 <strong>3월 10일(월)</strong>까지 알려주시면 감사하겠습니다.</p>
            <p>편안한 마음으로 왕림해 주세요.</p>
          </div>
        </div>

        <!-- CTA -->
        <div class="cta-group">
          <button class="btn-primary" @click="openMap">
            <i class="fa-solid fa-map-location-dot"></i>
            길 찾기 (카카오맵)
          </button>
          <button class="btn-secondary" @click="confirmAttend">
            <i class="fa-regular fa-circle-check"></i>
            참석 의사 전달
          </button>
        </div>

        <!-- 꽃잎 토글 -->
        <div class="petal-wrap">
          <button class="petal-btn" :class="{ on: petals }" @click="togglePetals">
            <i class="fa-solid fa-wand-magic-sparkles"></i>
            꽃잎 효과
            <div class="toggle-track"><div class="toggle-thumb"></div></div>
          </button>
        </div>

      </div>

      <!-- ══ 푸터 ══ -->
      <div class="card-footer">
        <i class="fa-solid fa-heart footer-heart"></i>
        <p class="footer-txt">2025년 봄, 두 가족의 첫 만남</p>
        <p class="footer-copy">With Love &amp; Gratitude</p>
      </div>

    </div>
  </div>

</template>

<script setup>
import { ref, onMounted } from 'vue'

/* ── 상태 ── */
const card = ref(null)
const petals = ref(true)

/* ── 행사 정보 ── */
const infoItems = ref([
  {
    icon: 'fa-solid fa-calendar-days',
    label: '일 시',
    value: '2025년 3월 15일 (토요일)',
    sub: '오후 12시 30분  ·  도착은 12:00 권장',
  },
  {
    icon: 'fa-solid fa-location-dot',
    label: '장 소',
    value: '한정식 레스토랑 ○○○',
    sub: '서울 강남구 ○○동 ○○○번지 2층 프리미엄홀',
  },
  {
    icon: 'fa-solid fa-square-parking',
    label: '주 차',
    value: '지하 2층 무료 주차',
    sub: '발렛파킹 가능 (입구 앞)',
  },
  {
    icon: 'fa-solid fa-phone',
    label: '문 의',
    value: '신랑 측 010-1234-5678',
    sub: '신부 측 010-9876-5432',
  },
])

/* ── 꽃잎 파티클 ── */
const canvasRef = ref(null)

let ctx = null
let petalArr = []
let animId = null
let running = false

const COLORS = [
  'rgba(245,197,24,VAL)',
  'rgba(232,180,10,VAL)',
  'rgba(255,215,80,VAL)',
  'rgba(200,152,10,VAL)',
  'rgba(255,230,120,VAL)',
  'rgba(210,170,60,VAL)',
]

function randColor() {
  const c = COLORS[Math.floor(Math.random() * COLORS.length)]
  return c.replace('VAL', (0.35 + Math.random() * 0.45).toFixed(2))
}

function newPetal(W) {
  return {
    x: Math.random() * W,
    y: -20,
    rx: 3.5 + Math.random() * 9,
    rot: Math.random() * Math.PI * 2,
    rotSpd: (Math.random() - 0.5) * 0.045,
    vx: (Math.random() - 0.5) * 1,
    vy: 0.5 + Math.random() * 1.1,
    swing: Math.random() * Math.PI * 2,
    swingSpd: 0.018 + Math.random() * 0.022,
    color: randColor(),
  }
}

function drawP(p) {
  ctx.save()
  ctx.translate(p.x, p.y)
  ctx.rotate(p.rot)
  ctx.fillStyle = p.color
  ctx.beginPath()
  ctx.ellipse(0, 0, p.rx, p.rx * 0.45, 0, 0, Math.PI * 2)
  ctx.fill()
  ctx.strokeStyle = 'rgba(255,255,255,.22)'
  ctx.lineWidth = 0.6
  ctx.beginPath()
  ctx.moveTo(0, -p.rx * 0.38)
  ctx.lineTo(0, p.rx * 0.38)
  ctx.stroke()
  ctx.restore()
}

function resize() {
  const canvas = canvasRef.value
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

function loop() {
  if (!running) return

  const canvas = canvasRef.value
  const W = canvas.width
  const H = canvas.height

  ctx.clearRect(0, 0, W, H)

  if (petalArr.length < 65 && Math.random() < 0.27)
    petalArr.push(newPetal(W))

  for (const p of petalArr) {
    p.swing += p.swingSpd
    p.x += p.vx + Math.sin(p.swing) * 0.55
    p.y += p.vy
    p.rot += p.rotSpd
    drawP(p)
  }

  petalArr = petalArr.filter(
    p => p.y < H + 30 && p.x > -60 && p.x < W + 60
  )

  animId = requestAnimationFrame(loop)
}

function startPetals() {
  if (running) return
  running = true
  canvasRef.value.classList.remove('off')
  loop()
}

function stopPetals() {
  running = false
  cancelAnimationFrame(animId)
  canvasRef.value.classList.add('off')
  setTimeout(() => {
    ctx.clearRect(
      0,
      0,
      canvasRef.value.width,
      canvasRef.value.height
    )
    petalArr = []
  }, 900)
}

function togglePetals() {
  petals.value = !petals.value
  petals.value ? startPetals() : stopPetals()
}

/* ── CTA ── */
function openMap() {
  window.open('https://map.kakao.com', '_blank')
}

function confirmAttend() {
  alert('참석 확인 — 카카오 알림톡 API 연동 포인트')
}

/* ── 마운트 ── */
onMounted(() => {
  const canvas = canvasRef.value
  ctx = canvas.getContext('2d')

  resize()
  window.addEventListener('resize', resize)

  startPetals()

  setTimeout(() => {
    if (card.value) card.value.classList.add('revealed')
  }, 80)
})
</script>


<style scoped>
.read-the-docs {
  color: #888;
}
</style>
