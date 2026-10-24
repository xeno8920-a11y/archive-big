const { useState, useEffect, useRef } = React;

const safeStorage = {
  get(key, fallback = null) {
    try {
      const val = window.localStorage.getItem(key);
      return val !== null ? val : fallback;
    } catch (err) {
      return fallback;
    }
  },
  set(key, value) {
    try { window.localStorage.setItem(key, String(value)); } catch (err) {}
  },
  getJSON(key, fallback) {
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (err) { return fallback; }
  },
  setJSON(key, value) {
    try { window.localStorage.setItem(key, JSON.stringify(value)); } catch (err) {}
  },
  remove(key) {
    try { window.localStorage.removeItem(key); } catch (err) {}
  },
  clearKeys(keys) {
    keys.forEach(k => this.remove(k));
  }
};

function HotspotItemGraphic({ icon, x, y, stepProgress = 0 }) {
  const rotationAngle = stepProgress * 120;
  switch (icon) {
    case 'lamp': return <g transform={`translate(${x}, ${y})`}><polygon points="-22,-10 22,-10 16,8 -16,8" fill="#fffbe0" stroke="#c9b458" strokeWidth="2"/><line x1="-8" y1="-10" x2="4" y2="8" stroke="#524618" strokeWidth="2"/><line x1="0" y1="8" x2="0" y2="20" stroke="#ffe97d" strokeWidth="1.5" strokeDasharray="2 2"/></g>;
    case 'cable': return <g transform={`translate(${x}, ${y})`}><path d="M-20,6 C-8,-12 6,16 20,-6" fill="none" stroke="#1a1812" strokeWidth="5"/><path d="M-20,6 C-8,-12 6,16 20,-6" fill="none" stroke="#d49b35" strokeWidth="2" strokeDasharray="5 3"/><circle cx="20" cy="-6" r="4" fill="#ff5d73"/></g>;
    case 'box': return <g transform={`translate(${x}, ${y})`}><rect x="-20" y="-14" width="40" height="28" rx="3" fill="#7d6b42" stroke="#e6d28c" strokeWidth="2"/><line x1="-20" y1="-2" x2="20" y2="-2" stroke="#3d331c" strokeWidth="2"/><rect x="-8" y="-6" width="16" height="8" fill="#c94c4c"/></g>;
    case 'valve': return <g transform={`translate(${x}, ${y})`}><circle cx="0" cy="0" r="16" fill="none" stroke="#d9534f" strokeWidth="4"/><line x1="-16" y1="0" x2="16" y2="0" stroke="#d9534f" strokeWidth="3"/><line x1="0" y1="-16" x2="0" y2="16" stroke="#d9534f" strokeWidth="3"/><circle cx="0" cy="0" r="5" fill="#e6dec8"/></g>;
    case 'ripple': return <g transform={`translate(${x}, ${y})`}><ellipse cx="0" cy="0" rx="26" ry="10" fill="none" stroke="#85e3ec" strokeWidth="2"/><ellipse cx="0" cy="0" rx="14" ry="5" fill="none" stroke="#ffffff" strokeWidth="1.5"/></g>;
    case 'monitor': return <g transform={`translate(${x}, ${y})`}><rect x="-20" y="-16" width="40" height="30" rx="2" fill="#2e3338" stroke="#95a5a6" strokeWidth="2"/><rect x="-15" y="-11" width="30" height="20" fill="#1b4d2e"/><line x1="-10" y1="-4" x2="8" y2="-4" stroke="#7bed9f" strokeWidth="2"/><line x1="-10" y1="2" x2="4" y2="2" stroke="#7bed9f" strokeWidth="2"/></g>;
    case 'car': return <g transform={`translate(${x}, ${y})`}><polygon points="-24,6 -12,-10 14,-10 24,6" fill="#22252a" stroke="#e0a838" strokeWidth="2"/><circle cx="-12" cy="4" r="4" fill="#ff4757"/><circle cx="12" cy="4" r="4" fill="#ff4757"/></g>;
    case 'sign': return <g transform={`translate(${x}, ${y})`}><rect x="-22" y="-12" width="44" height="24" rx="2" fill="#205c3b" stroke="#a3f7bf" strokeWidth="2"/><path d="M-10,0 L8,0 M2,-6 L9,0 L2,6" fill="none" stroke="#ffffff" strokeWidth="2.5"/></g>;
    case 'elevator': return <g transform={`translate(${x}, ${y})`}><rect x="-14" y="-20" width="28" height="40" fill="#2f3238" stroke="#e0a944" strokeWidth="2"/><circle cx="0" cy="-6" r="3.5" fill="#8cd460"/><circle cx="0" cy="6" r="3.5" fill="#ff5d73"/></g>;
    case 'clock':
      return (
        <g transform={`translate(${x}, ${y})`}>
          <circle cx="0" cy="0" r="18" fill="#e8d8b5" stroke="#8c5828" strokeWidth="3"/>
          <g transform={`rotate(${-rotationAngle})`}>
            <line x1="0" y1="0" x2="0" y2="-11" stroke="#111" strokeWidth="2.5"/>
            <line x1="0" y1="0" x2="9" y2="4" stroke="#9e2a2b" strokeWidth="2"/>
          </g>
        </g>
      );
    case 'keyhole': return <g transform={`translate(${x}, ${y})`}><polygon points="-22,-4 22,-4 30,8 -30,8" fill="#ffbe3b" stroke="#fff" strokeWidth="1.5"/><circle cx="-5" cy="1" r="4" fill="#1a0f08"/><circle cx="7" cy="1" r="4" fill="#1a0f08"/></g>;
    case 'notes':
    case 'envelope': return <g transform={`translate(${x}, ${y})`}><rect x="-18" y="-12" width="36" height="24" rx="2" fill={icon === 'envelope' ? '#ff7597' : '#f2ead3'} stroke="#ffffff" strokeWidth="2"/><polyline points="-18,-12 0,2 18,-12" fill="none" stroke="#4a1525" strokeWidth="2"/></g>;
    case 'gauge':
      return (
        <g transform={`translate(${x}, ${y})`}>
          <circle cx="0" cy="0" r="17" fill="#ece4d0" stroke="#b83c3c" strokeWidth="3"/>
          <g transform={`rotate(${rotationAngle})`}>
            <line x1="0" y1="2" x2="10" y2="-9" stroke="#d91e18" strokeWidth="2.5"/>
          </g>
          <circle cx="0" cy="2" r="3" fill="#222"/>
        </g>
      );
    case 'beacon': return <g transform={`translate(${x}, ${y})`}><circle cx="0" cy="0" r="20" fill="rgba(255,50,40,0.32)"/><path d="M-10,10 L-7,-8 L7,-8 L10,10 Z" fill="#ff3b2b" stroke="#ffd1cc" strokeWidth="2"/></g>;
    case 'hatch':
    case 'grate': return <g transform={`translate(${x}, ${y})`}><rect x="-22" y="-12" width="44" height="24" fill="#2b2626" stroke="#c29b61" strokeWidth="2"/><line x1="-10" y1="-12" x2="-10" y2="12" stroke="#c29b61" strokeWidth="2"/><line x1="10" y1="-12" x2="10" y2="12" stroke="#c29b61" strokeWidth="2"/></g>;
    case 'lamp_green': return <g transform={`translate(${x}, ${y})`}><path d="M-18,4 L-10,-12 L10,-12 L18,4 Z" fill="#2ecc71" stroke="#d4f5dd" strokeWidth="2"/><rect x="-14" y="8" width="28" height="8" fill="#f0e6d2"/></g>;
    case 'glasses': return <g transform={`translate(${x}, ${y})`}><circle cx="-9" cy="0" r="7" fill="#d2f5e3" stroke="#fff" strokeWidth="2"/><circle cx="9" cy="0" r="7" fill="#d2f5e3" stroke="#fff" strokeWidth="2"/><line x1="-2" y1="0" x2="2" y2="0" stroke="#fff" strokeWidth="2"/></g>;
    case 'banner': return <g transform={`translate(${x}, ${y})`}><rect x="-26" y="-11" width="52" height="22" rx="4" fill="#fff0f5" stroke="#ff477e" strokeWidth="2.5"/><circle cx="-14" cy="0" r="3" fill="#ff477e"/><circle cx="0" cy="0" r="3" fill="#ffbe0b"/><circle cx="14" cy="0" r="3" fill="#4cc9f0"/></g>;
    case 'cake': return <g transform={`translate(${x}, ${y})`}><rect x="-20" y="-6" width="40" height="20" rx="3" fill="#ff85a1" stroke="#fff" strokeWidth="2"/><line x1="-8" y1="-6" x2="-8" y2="-18" stroke="#222" strokeWidth="2.5"/><line x1="8" y1="-6" x2="8" y2="-18" stroke="#222" strokeWidth="2.5"/><circle cx="-8" cy="-19" r="3" fill="#ffbe0b"/><circle cx="8" cy="-19" r="3" fill="#ff2a55"/></g>;
    case 'balloon': return <g transform={`translate(${x}, ${y})`}><ellipse cx="0" cy="-4" rx="14" ry="17" fill="#ff2a55" stroke="#fff" strokeWidth="2"/><line x1="0" y1="13" x2="0" y2="26" stroke="#fff" strokeWidth="1.5"/></g>;
    case 'window_face': return <g transform={`translate(${x}, ${y})`}><circle cx="0" cy="0" r="18" fill="#f2ca46" stroke="#fff" strokeWidth="2"/><circle cx="-6" cy="-4" r="2.5" fill="#b81d2a"/><circle cx="6" cy="-4" r="2.5" fill="#b81d2a"/><path d="M-8,5 Q0,13 8,5" fill="none" stroke="#b81d2a" strokeWidth="2.5"/></g>;
    case 'skull': return <g transform={`translate(${x}, ${y})`}><polygon points="0,-16 18,14 -18,14" fill="#591218" stroke="#ff5d73" strokeWidth="2"/><text x="0" y="10" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold">!</text></g>;
    default: return <g transform={`translate(${x}, ${y})`}><rect x="-14" y="-14" width="28" height="28" transform="rotate(45)" fill="#2b2618" stroke="#e6d28c" strokeWidth="2"/><circle cx="0" cy="0" r="4" fill="#fff"/></g>;
  }
}

function UVSecretLayer({ levelId }) {
  switch (levelId) {
    case 'lvl-0': return <g className="uv-secret-layer" fill="#00f5d4" fontFamily="monospace"><text x="70" y="210" fontSize="15" transform="rotate(-8 70 210)">Б.И.Г. СЛЕДИТ ЗА ТОБОЙ</text><text x="585" y="195" fontSize="14" transform="rotate(6 585 195)">ИЩИ 3 ЗАПИСИ</text><circle cx="400" cy="240" r="38" fill="none" stroke="#00f5d4" strokeWidth="1.5" strokeDasharray="4 4"/><text x="400" y="245" textAnchor="middle" fontSize="12">КАМЕРА #44</text></g>;
    case 'lvl-1': return <g className="uv-secret-layer" fill="#00f5d4" fontFamily="monospace" fontWeight="bold"><text x="112" y="100" textAnchor="middle" fontSize="22">[ I ]</text><text x="299" y="100" textAnchor="middle" fontSize="22">[ II ]</text><text x="509" y="100" textAnchor="middle" fontSize="22">[ III ]</text><text x="677" y="100" textAnchor="middle" fontSize="22">[ IV ]</text><text x="400" y="355" textAnchor="middle" fontSize="18">ПЕРВАЯ ЦИФРА КОДА = 4 КОЛОННЫ</text></g>;
    case 'lvl-2': return <g className="uv-secret-layer" fill="#00f5d4" fontFamily="monospace"><text x="340" y="210" textAnchor="middle" fontSize="18">КОД 133 — ЛОЖЬ СМОТРИТЕЛЯ!</text><line x1="250" y1="204" x2="430" y2="204" stroke="#ff2a6d" strokeWidth="2"/></g>;
    case 'lvl-3': return <g className="uv-secret-layer" fill="#00f5d4" fontFamily="monospace" fontWeight="bold"><circle cx="472" cy="322" r="46" fill="none" stroke="#00f5d4" strokeWidth="2.5" strokeDasharray="6 3"/><text x="472" y="245" textAnchor="middle" fontSize="18">ВТОРАЯ ЦИФРА = БОРТ №8</text></g>;
    case 'lvl-4': return <g className="uv-secret-layer" fill="#00f5d4" fontFamily="monospace"><text x="400" y="295" textAnchor="middle" fontSize="16">СМОТРИТЕЛЬ СТИРАЕТ СВИДЕТЕЛЕЙ</text></g>;
    case 'lvl-5': return <g className="uv-secret-layer" fill="#00f5d4" fontFamily="monospace"><text x="565" y="355" textAnchor="middle" fontSize="16" fill="#ff4dff">НЕ ТРОГАЙ ДОННЫЙ СЕНСОР!</text></g>;
    case 'lvl-6': return <g className="uv-secret-layer" fill="#00f5d4" fontFamily="monospace"><text x="400" y="180" textAnchor="middle" fontSize="17">КРАСНЫЙ МАЯК ВЕДЁТ К ДВЕРИ №1</text></g>;
    case 'lvl-7': return <g className="uv-secret-layer" fill="#00f5d4" fontFamily="monospace" fontWeight="bold"><text x="400" y="150" textAnchor="middle" fontSize="19">НЕ ВЕРЬ ЧИСЛУ 133 В ЗАПИСКЕ!</text><text x="400" y="178" textAnchor="middle" fontSize="15">ТРЕТЬЯ ЦИФРА — «ПЕРВАЯ» ДВЕРЬ [ 1 ]</text></g>;
    case 'lvl-fun': return <g className="uv-secret-layer" fontFamily="monospace" fontWeight="bold"><text x="195" y="140" fill="#ff4d79" fontSize="24">133 = THE END</text><line x1="185" y1="132" x2="365" y2="132" stroke="#ff4d79" strokeWidth="4"/><rect x="285" y="365" width="230" height="44" fill="rgba(0, 20, 25, 0.8)" stroke="#00f5d4" strokeWidth="2"/><text x="400" y="393" textAnchor="middle" fill="#00f5d4" fontSize="20">ИСТИННЫЙ ШИФР: 4 - 8 - 1</text></g>;
    case 'lvl-9': return <g className="uv-secret-layer" fontFamily="monospace" fontWeight="bold"><rect x="250" y="195" width="300" height="42" fill="rgba(0, 25, 30, 0.85)" stroke="#00f5d4" strokeWidth="2"/><text x="400" y="222" textAnchor="middle" fill="#00f5d4" fontSize="21">REBOOT --OVERRIDE</text><text x="400" y="315" textAnchor="middle" fill="#ff4dff" fontSize="14">[ КЛИКНИТЕ НА ТОМ ДЛЯ ВЗЛОМА СИСТЕМЫ ]</text></g>;
    case 'lvl-10': return <g className="uv-secret-layer" fill="#00f5d4" fontFamily="monospace"><text x="400" y="145" textAnchor="middle" fontSize="17">ВЫ ВНУТРИ УДАЛЁННОГО БУФЕРА Б.И.Г.</text></g>;
    case 'lvl-11': return <g className="uv-secret-layer" fill="#ff4d79" fontFamily="monospace" fontWeight="bold"><text x="400" y="135" textAnchor="middle" fontSize="18">НЕ ПЫТАЙСЯ ВСКРЫТЬ КОРНЕВОЙ АРХИВ — ОН ЖИВОЙ!</text></g>;
    case 'lvl-13': return <g className="uv-secret-layer" fill="#00f5d4" fontFamily="monospace" fontWeight="bold"><text x="400" y="165" textAnchor="middle" fontSize="28" letterSpacing="4">БЕГИ, ПОКА ЕСТЬ ЧЕМ</text></g>;
    default: return null;
  }
}

function LevelIllustration({ levelId, hotspots = [], explored = [], puzzleSteps = {}, onSelectHotspot, isThumbnail = false, uvMode = false }) {
  const renderArtwork = () => {
    switch (levelId) {
      case 'lvl-0':
        return (
          <g>
            <defs>
              <linearGradient id="l0-w" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#6b6335"/><stop offset="50%" stopColor="#9c9152"/><stop offset="100%" stopColor="#423d1e"/></linearGradient>
              <pattern id="l0-p" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M12 2 L22 12 L12 22 L2 12 Z" fill="none" stroke="#4f4822" strokeWidth="1" opacity="0.45"/></pattern>
            </defs>
            <polygon points="0,0 800,0 580,150 220,150" fill="#787248"/><polygon points="0,500 800,500 580,350 220,350" fill="#524b28"/>
            <line x1="200" y1="0" x2="290" y2="150" stroke="#575230" strokeWidth="2"/><line x1="400" y1="0" x2="400" y2="150" stroke="#575230" strokeWidth="2"/><line x1="600" y1="0" x2="510" y2="150" stroke="#575230" strokeWidth="2"/>
            <g className="lamp-flicker-00">
              <polygon points="340,25 460,25 445,55 355,55" fill="#fffbe0" stroke="#d4cc90" strokeWidth="2"/>
              <polygon points="365,95 435,95 425,115 375,115" fill="#fffbe0" opacity="0.85"/>
            </g>
            <polygon points="0,0 220,150 220,350 0,500" fill="url(#l0-w)"/><polygon points="0,0 220,150 220,350 0,500" fill="url(#l0-p)"/>
            <polygon points="800,0 580,150 580,350 800,500" fill="url(#l0-w)"/><polygon points="800,0 580,150 580,350 800,500" fill="url(#l0-p)"/>
            <rect x="220" y="150" width="95" height="200" fill="#827842" stroke="#453f20"/><rect x="485" y="150" width="95" height="200" fill="#6e6536" stroke="#453f20"/>
            <rect x="315" y="150" width="170" height="200" fill="#17150a"/><rect x="355" y="175" width="70" height="150" fill="#2b2713"/>
            <path d="M545,195 C555,195 560,210 558,230 L562,330 L542,330 L544,235 Z" fill="#0d0c06" opacity="0.88"/>
          </g>
        );
      case 'lvl-1':
        return (
          <g>
            <rect width="800" height="320" fill="#0b1416"/><rect y="320" width="800" height="180" fill="#060d0e"/>
            <rect x="85" y="30" width="55" height="290" fill="#1e2d30"/>
            <rect x="275" y="55" width="48" height="265" fill="#182527"/>
            <rect x="485" y="55" width="48" height="265" fill="#182527"/>
            <rect x="650" y="30" width="55" height="290" fill="#1a2729"/>
            <g stroke="#2c4245" strokeWidth="3" fill="none"><rect x="155" y="110" width="105" height="210"/><line x1="155" y1="165" x2="260" y2="165"/><line x1="155" y1="220" x2="260" y2="220"/></g>
            <rect x="170" y="190" width="52" height="28" fill="#6e6338" stroke="#b5a66b" strokeWidth="1.5"/>
            <ellipse cx="430" cy="400" rx="85" ry="22" fill="none" stroke="#4b8387" strokeWidth="2" opacity="0.7"/>
            <ellipse cx="430" cy="400" rx="48" ry="12" fill="none" stroke="#6baab0" strokeWidth="1.5"/>
            <rect y="275" width="800" height="65" fill="#2c4c4f" opacity="0.2"/>
          </g>
        );
      case 'lvl-2':
        return (
          <g>
            <rect width="800" height="500" fill="#d9dadb"/>
            <polygon points="0,0 800,0 640,120 160,120" fill="#f5f7fa" stroke="#b8bcc2"/><polygon points="0,500 800,500 640,340 160,340" fill="#b4b8bd"/>
            <polygon points="70,130 250,150 250,360 70,410" fill="#e4e6e8" stroke="#8d9299" strokeWidth="2"/>
            <polygon points="250,150 430,150 430,360 250,360" fill="#cfd3d6" stroke="#8d9299" strokeWidth="2"/>
            <polygon points="465,135 680,115 680,385 465,355" fill="#dcdfe3" stroke="#8d9299" strokeWidth="2"/>
            <circle cx="525" cy="112" r="18" fill="#121314"/><path d="M498,132 C498,118 552,118 552,132 Z" fill="#121314"/>
            <polygon points="265,295 395,295 415,320 250,320" fill="#9ea3a8"/>
            <rect x="295" y="250" width="52" height="42" fill="#3a3d40" stroke="#222" strokeWidth="2"/><rect x="301" y="256" width="40" height="30" fill="#1b3626"/>
            <polygon points="130,380 215,380 200,415 110,415" fill="#4f5257"/>
          </g>
        );
      case 'lvl-3':
        return (
          <g>
            <rect width="800" height="270" fill="#17181a"/><rect y="270" width="800" height="230" fill="#1f2024"/>
            <polygon points="0,40 800,40 730,85 70,85" fill="#25272b"/>
            <rect x="350" y="85" width="100" height="10" fill="#ffcf56"/><polygon points="350,95 450,95 560,360 240,360" fill="#ffcf56" opacity="0.09"/>
            <rect x="135" y="85" width="75" height="255" fill="#2e3036"/><rect x="135" y="260" width="75" height="45" fill="#d49b27"/>
            <g transform="translate(380, 260)">
              <path d="M20,40 L45,10 L135,10 L160,40 L180,45 L180,85 L5,85 L5,45 Z" fill="#0f1012" stroke="#363940" strokeWidth="2"/>
              <polygon points="50,16 130,16 148,38 32,38" fill="#050505"/><rect x="55" y="55" width="75" height="12" fill="#8f1d1d"/>
              <circle cx="35" cy="60" r="8" fill="#d93829"/><circle cx="150" cy="60" r="8" fill="#d93829"/>
              <text x="92" y="65" textAnchor="middle" fill="#ffd43b" fontSize="11" fontFamily="monospace" fontWeight="bold">№ 08</text>
            </g>
            <rect x="625" y="165" width="90" height="175" fill="#252629" stroke="#43454a" strokeWidth="3"/>
          </g>
        );
      case 'lvl-4':
        return (
          <g>
            <polygon points="0,0 800,0 590,130 210,130" fill="#1f1610"/><polygon points="0,500 800,500 590,360 210,360" fill="#3b1616"/>
            <polygon points="160,500 640,500 520,360 280,360" fill="#591c1c" stroke="#8c6239" strokeWidth="3"/>
            <polygon points="0,0 210,130 210,360 0,500" fill="#2b1d14"/><polygon points="800,0 590,130 590,360 800,500" fill="#2b1d14"/>
            <rect x="210" y="130" width="380" height="230" fill="#170f0a"/>
            <polygon points="65,110 155,150 155,380 65,445" fill="#422616" stroke="#1a0e07" strokeWidth="3"/>
            <polygon points="735,110 645,150 645,380 735,445" fill="#422616" stroke="#1a0e07" strokeWidth="3"/>
            <polygon points="155,378 290,395 230,445 65,445" fill="#ffae33" opacity="0.45"/>
            <circle cx="400" cy="185" r="24" fill="#d9c5a0" stroke="#5c3d24" strokeWidth="4"/>
            <line x1="400" y1="185" x2="400" y2="166" stroke="#111" strokeWidth="2.5">
              <animateTransform attributeName="transform" type="rotate" from="360 400 185" to="0 400 185" dur="5s" repeatCount="indefinite" />
            </line>
            <line x1="400" y1="185" x2="414" y2="185" stroke="#331a00" strokeWidth="2">
              <animateTransform attributeName="transform" type="rotate" from="360 400 185" to="0 400 185" dur="24s" repeatCount="indefinite" />
            </line>
            <circle cx="290" cy="210" r="10" fill="#ffcc66"/><circle cx="510" cy="210" r="10" fill="#ffcc66"/>
          </g>
        );
      case 'lvl-5':
        return (
          <g>
            <defs><pattern id="l5-t" width="32" height="32" patternUnits="userSpaceOnUse"><rect width="32" height="32" fill="#d8e6e8" stroke="#9ab8bd" strokeWidth="1.5"/></pattern></defs>
            <rect width="800" height="320" fill="url(#l5-t)"/>
            <path d="M120,320 L120,170 A55,55 0 0,1 230,170 L230,320 Z" fill="#0f2b2e"/><path d="M550,320 L550,170 A60,60 0 0,1 670,170 L670,320 Z" fill="#0f2b2e"/>
            <ellipse cx="400" cy="35" rx="130" ry="30" fill="#ffffff"/><polygon points="270,35 530,35 610,320 190,320" fill="#ffffff" opacity="0.18"/>
            <rect x="190" y="285" width="110" height="22" fill="#b7cfd4"/><rect x="205" y="307" width="110" height="22" fill="#89b0b8"/>
            <rect y="315" width="800" height="185" fill="#1c6e75" opacity="0.88"/>
            <path d="M510,395 C540,385 590,388 625,405 C595,418 545,420 510,395 Z" fill="#04191c" opacity="0.75"/>
          </g>
        );
      case 'lvl-6':
        return (
          <g>
            <rect width="800" height="500" fill="#1a0909"/><rect x="80" y="0" width="38" height="500" fill="#2e1515"/><rect x="640" y="0" width="45" height="500" fill="#2e1515"/>
            <rect x="0" y="95" width="800" height="45" fill="#47211d" stroke="#240e0c" strokeWidth="3"/><rect x="0" y="200" width="800" height="55" fill="#592822" stroke="#240e0c" strokeWidth="3"/>
            <circle cx="290" cy="210" r="28" fill="#ded7c5" stroke="#331814" strokeWidth="5"/><line x1="290" y1="210" x2="308" y2="195" stroke="#b81d1d" strokeWidth="3"/>
            <circle cx="490" cy="140" r="75" fill="#ff2a1a" opacity="0.22"/><rect x="476" y="125" width="28" height="32" rx="10" fill="#ff3b2b"/>
            <polygon points="0,500 800,500 660,340 140,340" fill="#1c1212" stroke="#4a2c2a" strokeWidth="2"/><rect x="340" y="345" width="120" height="65" fill="#0a0404" stroke="#613734" strokeWidth="3"/>
          </g>
        );
      case 'lvl-7':
        return (
          <g>
            <rect width="800" height="500" fill="#0f0d17"/><rect x="40" y="20" width="220" height="360" fill="#1b1726" stroke="#2f2942" strokeWidth="2"/><rect x="540" y="20" width="220" height="360" fill="#1b1726" stroke="#2f2942" strokeWidth="2"/>
            {[70, 130, 190, 250, 310].map((y, idx) => (<g key={idx}><line x1="40" y1={y} x2="260" y2={y} stroke="#362f4d" strokeWidth="4"/><line x1="540" y1={y} x2="760" y2={y} stroke="#362f4d" strokeWidth="4"/></g>))}
            <circle cx="400" cy="210" r="18" fill="#1b1b1e" stroke="#4f4f59" strokeWidth="2"/>
            <circle cx="393" cy="208" r="4" fill="#2ecc71"/><circle cx="407" cy="208" r="4" fill="#2ecc71"/>
            <path d="M368,260 C372,228 428,228 432,260 Z" fill="#18181c" stroke="#3c3c46"/>
            <rect x="410" y="242" width="14" height="8" fill="#b83c3c"/>
            <polygon points="210,360 590,360 660,450 140,450" fill="#2b211b" stroke="#47372d" strokeWidth="3"/>
            <polygon points="400,260 280,410 520,410" fill="#47d17c" opacity="0.18"/><path d="M365,265 L435,265 L420,240 L380,240 Z" fill="#258f4e"/>
            <polygon points="355,320 445,320 455,348 345,348" fill="#e6dec8"/><polygon points="575,280 625,285 620,305 570,300" fill="#ff6b9d" stroke="#fff" strokeWidth="1"/>
          </g>
        );
      case 'lvl-fun':
        return (
          <g>
            <defs>
              <pattern id="fun-s" width="40" height="40" patternUnits="userSpaceOnUse"><rect width="20" height="40" fill="#fff7d6"/><rect x="20" width="20" height="40" fill="#ffe4ec"/></pattern>
              <pattern id="fun-f" width="50" height="25" patternUnits="userSpaceOnUse"><rect width="25" height="25" fill="#f2ead3"/><rect x="25" width="25" height="25" fill="#aed9e0"/></pattern>
            </defs>
            <rect width="800" height="340" fill="url(#fun-s)"/>
            <polygon points="0,0 800,0 700,55 100,55" fill="#ffffff" stroke="#e6dec3" strokeWidth="2"/>
            <polygon points="0,500 800,500 700,340 100,340" fill="url(#fun-f)" stroke="#d4c8a8" strokeWidth="2"/>
            <path d="M55,340 L55,155 A55,55 0 0,1 165,155 L165,340 Z" fill="#48bfe3" stroke="#ffbe0b" strokeWidth="6"/>
            <path d="M70,340 L70,175 A40,40 0 0,1 150,175 L150,340 Z" fill="#161925"/>
            <rect x="575" y="145" width="145" height="125" fill="#18151c" stroke="#ff6b8b" strokeWidth="6" rx="6"/>
            <circle cx="645" cy="215" r="28" fill="#e8c547" opacity="0.9"/>
            <circle cx="635" cy="208" r="3.5" fill="#c9184a"/><circle cx="655" cy="208" r="3.5" fill="#c9184a"/>
            <path d="M632,222 Q645,235 658,222" fill="none" stroke="#c9184a" strokeWidth="3.5" strokeLinecap="round"/>
            <polygon points="578,148 615,148 595,267 578,267" fill="#ffcad4" opacity="0.7"/>
            <path d="M100,55 Q400,120 700,55" fill="none" stroke="#ff5d8f" strokeWidth="3"/>
            <rect x="275" y="52" width="250" height="52" rx="8" fill="#ffffff" stroke="#ff5d8f" strokeWidth="3"/>
            <text x="400" y="75" textAnchor="middle" fill="#ff477e" fontSize="14" fontWeight="bold" fontFamily="sans-serif">С ДНЁМ РОЖДЕНИЯ!</text>
            <text x="400" y="94" textAnchor="middle" fill="#9e2a2b" fontSize="10" fontFamily="monospace">ТЫ ЗДЕСЬ НАВСЕГДА =)</text>
            <path d="M135,445 C140,395 190,395 195,445 L215,485 L120,485 Z" fill="#1f1a24" opacity="0.65"/>
            <line x1="165" y1="225" x2="165" y2="355" stroke="#888" strokeWidth="1.5"/>
            <ellipse cx="165" cy="195" rx="28" ry="34" fill="#ff2a55"/><ellipse cx="202" cy="215" rx="24" ry="29" fill="#ffbe0b"/>
            <rect x="275" y="340" width="14" height="95" fill="#8c5a3c"/><rect x="510" y="340" width="14" height="95" fill="#8c5a3c"/>
            <polygon points="245,305 555,305 585,355 215,355" fill="#ffffff" stroke="#ff85a1" strokeWidth="3"/>
            <rect x="265" y="270" width="42" height="35" fill="#4cc9f0" stroke="#2b9348" strokeWidth="2"/>
            <rect x="360" y="272" width="80" height="33" rx="4" fill="#ff9ebb" stroke="#d96b8c" strokeWidth="2"/>
          </g>
        );
      case 'lvl-9':
        return (
          <g>
            <rect width="800" height="500" fill="#07050a"/>
            <g stroke="#3d2352" strokeWidth="1.5" fill="none" strokeDasharray="8 5">
              <line x1="0" y1="0" x2="400" y2="250"/><line x1="800" y1="0" x2="400" y2="250"/>
              <line x1="0" y1="500" x2="400" y2="250"/><line x1="800" y1="500" x2="400" y2="250"/>
              <polygon points="120,60 680,80 640,430 90,410" />
            </g>
            <rect x="35" y="30" width="150" height="390" fill="#120d1a" stroke="#4a2c63" strokeWidth="2"/>
            <rect x="615" y="30" width="150" height="390" fill="#120d1a" stroke="#4a2c63" strokeWidth="2"/>
            {[80, 145, 210, 275, 340].map((y, idx) => (
              <g key={idx} stroke="#2e1b3d" strokeWidth="5">
                <line x1="40" y1={y} x2="180" y2={y + (idx % 2 === 0 ? 12 : -10)} />
                <line x1="620" y1={y} x2="760" y2={y + (idx % 2 === 0 ? -12 : 10)} />
              </g>
            ))}
            <text x="400" y="95" textAnchor="middle" fill="#6c4294" fontSize="22" fontFamily="monospace" letterSpacing="8">THE END // ТУПИК Б.И.Г.</text>
            <polygon points="270,320 530,320 570,390 230,390" fill="#1c1326" stroke="#8c52ff" strokeWidth="2"/>
          </g>
        );
      case 'lvl-10':
        return (
          <g>
            <rect width="800" height="500" fill="#080406"/>
            <g stroke="#ff1e42" strokeWidth="1.5" fill="none" opacity="0.65">
              <polygon points="50,40 740,20 690,460 110,430" strokeDasharray="12 6"/>
              <line x1="0" y1="120" x2="800" y2="380" strokeDasharray="4 8"/>
              <line x1="180" y1="0" x2="620" y2="500" strokeDasharray="8 4"/>
            </g>
            <polygon points="90,80 310,110 290,370 70,410" fill="#14080c" stroke="#ff3b56" strokeWidth="2" strokeDasharray="10 4"/>
            <polygon points="480,70 720,90 700,380 510,340" fill="none" stroke="#ff3b56" strokeWidth="2.5"/>
            <rect x="140" y="150" width="210" height="10" fill="#ff1e42" opacity="0.7"/>
            <rect x="430" y="280" width="260" height="8" fill="#ff1e42" opacity="0.6"/>
            <rect x="260" y="60" width="180" height="6" fill="#00f5d4" opacity="0.5"/>
            <text x="400" y="45" textAnchor="middle" fill="#ff4760" fontSize="16" fontFamily="monospace" letterSpacing="4">ERR_SECTOR_10 // UNRENDERED_BUFFER</text>
          </g>
        );
      case 'lvl-11':
        return (
          <g>
            <rect width="800" height="500" fill="#0a0204"/>
            <radialGradient id="core-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#590814"/>
              <stop offset="100%" stopColor="#080103"/>
            </radialGradient>
            <rect width="800" height="500" fill="url(#core-glow)"/>
            {[60, 145, 575, 660].map((x, idx) => (
              <g key={idx}>
                <rect x={x} y="40" width="75" height="390" fill="#120608" stroke="#4a121b" strokeWidth="2"/>
                {[70, 110, 150, 190, 230, 270, 310, 350].map(y => (
                  <g key={y}>
                    <line x1={x + 10} y1={y} x2={x + 65} y2={y} stroke="#2e0b10" strokeWidth="4"/>
                    <circle cx={x + 18} cy={y} r="2.5" fill="#ff1e38"/>
                    <circle cx={x + 28} cy={y} r="2.5" fill="#ff8593"/>
                  </g>
                ))}
              </g>
            ))}
            <polygon points="240,430 560,430 630,500 170,500" fill="#1c080b" stroke="#ff1e38" strokeWidth="2"/>
            <rect x="330" y="210" width="140" height="190" fill="#160609" stroke="#ff3b56" strokeWidth="3"/>
            <rect x="348" y="228" width="104" height="68" fill="#2b060c" stroke="#ff6b81" strokeWidth="1.5"/>
          </g>
        );
      case 'lvl-13':
        return (
          <g>
            <rect width="800" height="500" fill="#1a0205"/>
            <g className="flesh-maw-pulse">
              <ellipse cx="400" cy="250" rx="390" ry="240" fill="#38050b" stroke="#6e0b16" strokeWidth="12"/>
              <ellipse cx="400" cy="250" rx="310" ry="185" fill="#540812" stroke="#8f1120" strokeWidth="8"/>
              <ellipse cx="400" cy="250" rx="220" ry="125" fill="#140103" stroke="#b81428" strokeWidth="6"/>
              <polygon points="210,175 235,235 260,165 290,240 325,155 360,245 400,150 440,245 475,155 510,240 540,165 565,235 590,175" fill="#ded2c2" stroke="#4a0810" strokeWidth="3"/>
              <polygon points="210,325 235,265 260,335 290,260 325,345 360,255 400,350 440,255 475,345 510,260 540,335 565,265 590,325" fill="#ded2c2" stroke="#4a0810" strokeWidth="3"/>
              <path d="M0,80 Q200,180 280,140 M800,90 Q600,180 520,140 M0,420 Q220,330 290,360 M800,410 Q580,330 510,360" fill="none" stroke="#9e1424" strokeWidth="5"/>
            </g>
          </g>
        );
      default: return null;
    }
  };

  return (
    <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice">
      <g className="base-artwork">{renderArtwork()}</g>
      {!isThumbnail && uvMode && <UVSecretLayer levelId={levelId} />}
      {!isThumbnail && hotspots.map((h) => {
        const isDone = explored.includes(h.id);
        const isFloating = levelId === 'lvl-2';
        const stepCount = puzzleSteps[h.id] || 0;
        return (
          <g
            key={h.id}
            className={`svg-item-hotspot ${isDone ? 'explored' : ''} ${h.trap ? 'trap-spot' : ''} ${isFloating ? 'hotspot-float' : ''}`}
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const panX = ((rect.left + rect.width / 2) / window.innerWidth) * 2 - 1;
              onSelectHotspot && onSelectHotspot(h, panX);
            }}
          >
            <title>{h.label}</title>
            <HotspotItemGraphic icon={h.icon} x={h.x} y={h.y} stepProgress={stepCount} />
          </g>
        );
      })}
    </svg>
  );
}

function MainMenuBackdrop() {
  return (
    <svg className="hero-svg-bg" viewBox="0 0 900 700" preserveAspectRatio="xMidYMid slice">
      <defs><radialGradient id="mg" cx="50%" cy="45%" r="55%"><stop offset="0%" stopColor="#38331c"/><stop offset="60%" stopColor="#14130c"/><stop offset="100%" stopColor="#080806"/></radialGradient></defs>
      <rect width="900" height="700" fill="url(#mg)"/>
      <line x1="0" y1="0" x2="450" y2="320" stroke="#2e2a18" strokeWidth="2"/><line x1="900" y1="0" x2="450" y2="320" stroke="#2e2a18" strokeWidth="2"/>
      <line x1="0" y1="700" x2="450" y2="320" stroke="#2e2a18" strokeWidth="2"/><line x1="900" y1="700" x2="450" y2="320" stroke="#2e2a18" strokeWidth="2"/>
      {[1, 2, 3, 4, 5].map(step => (<rect key={step} x={450 - step * 70} y={320 - step * 52} width={step * 140} height={step * 104} fill="none" stroke="#6b6138" strokeWidth="1.5" opacity={0.45 / (step * 0.4)}/>))}
      <rect x="432" y="285" width="36" height="70" fill="#e6d895" opacity="0.85"/>
    </svg>
  );
}

function App() {
  const [screen, setScreen] = useState('main');
  const [trapPhase, setTrapPhase] = useState(0);
  const [currentLevelId, setCurrentLevelId] = useState(null);

  const [whiteFlash, setWhiteFlash] = useState(false);
  const [bsodCrash, setBsodCrash] = useState(false);
  const [surrenderConfirm, setSurrenderConfirm] = useState(false);
  const [uvMode, setUvMode] = useState(false);
  const [systemOverlayMsg, setSystemOverlayMsg] = useState(null);

  const [puzzleSteps, setPuzzleSteps] = useState({});

  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorHover, setCursorHover] = useState(false);

  const subtitleTimerRef = useRef(null);
  const glitchTimerRef = useRef(null);
  const boardCanvasRef = useRef(null);

  const [boardOpen, setBoardOpen] = useState(false);
  const [boardNodes, setBoardNodes] = useState([
    { id: 'b_doc1', title: 'Док-01: Затопленный архив', text: 'Архитектурный свод держат 4 колонны.', x: 40, y: 50, isNote: false },
    { id: 'b_doc2', title: 'Док-02: Паркинг', text: 'Аномальный седан №8 заглох у колонны.', x: 300, y: 60, isNote: false },
    { id: 'b_doc3', title: 'Док-03: Директива Смотрителя', text: 'Код 133 отвлечёт внимание. Выход — дверь #1.', x: 560, y: 70, isNote: false }
  ]);
  const [boardLinks, setBoardLinks] = useState([]);
  const [linkingFromId, setLinkingFromId] = useState(null);
  const [draggingNodeId, setDraggingNodeId] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const [cliOpen, setCliOpen] = useState(false);
  const [cliInput, setCliInput] = useState('');
  const [cliHistory, setCliHistory] = useState([
    'АРХИВ Б.И.Г. // СИСТЕМНАЯ КОНСОЛЬ v44.1',
    'Введите "help" для списка доступных команд.'
  ]);

  const [adminModeUnlocked, setAdminModeUnlocked] = useState(() => safeStorage.get('backrooms_admin_mode') === 'true');
  const [hasAdminKey, setHasAdminKey] = useState(() => safeStorage.get('backrooms_admin_key') === 'true');
  const [coreConsoleModalOpen, setCoreConsoleModalOpen] = useState(false);
  const [debugModalOpen, setDebugModalOpen] = useState(false);

  const [extractedClues, setExtractedClues] = useState(() => safeStorage.getJSON('backrooms_clues', []));
  const [pinSlots, setPinSlots] = useState(['', '', '']);
  const [activeSlotIdx, setActiveSlotIdx] = useState(0);

  const [unlockedEndings, setUnlockedEndings] = useState(() => safeStorage.getJSON('backrooms_endings', []));
  const [dossierModalOpen, setDossierModalOpen] = useState(false);

  const [codeModalOpen, setCodeModalOpen] = useState(false);
  const [codeInput, setCodeInput] = useState('');
  const [codeError, setCodeError] = useState('');

  const [savedLevelId, setSavedLevelId] = useState(() => safeStorage.get('backrooms_saved_level', null));
  const [exploredMap, setExploredMap] = useState(() => safeStorage.getJSON('backrooms_explored', {}));
  const [inventoryDocs, setInventoryDocs] = useState(() => safeStorage.getJSON('backrooms_docs', []));
  const [diaryEntries, setDiaryEntries] = useState(() =>
    safeStorage.getJSON('backrooms_diary', [
      { id: 'init', title: 'Инициализация субъекта', text: 'Я очнулся в буферном секторе комплекса Б.И.Г. За мной ведётся наблюдение через терминал 44.1.' }
    ])
  );

  const [activeReport, setActiveReport] = useState(null);
  const [readingDoc, setReadingDoc] = useState(null);
  const [inventoryModalOpen, setInventoryModalOpen] = useState(false);
  const [diaryModalOpen, setDiaryModalOpen] = useState(false);
  const [endingData, setEndingData] = useState(null);

  const [brightness, setBrightness] = useState(1);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [subtitlesEnabled, setSubtitlesEnabled] = useState(true);
  const [reducedEffects, setReducedEffects] = useState(false);
  const [subtitleText, setSubtitleText] = useState('');
  const [terminalNote, setTerminalNote] = useState('ПРОТОКОЛ НАДЗОРА Б.И.Г. // ТЕРМИНАЛ 44.1 АКТИВЕН');
  const [glitchHeader, setGlitchHeader] = useState('ТЕРМИНАЛ 44.1');
  const [ambientTint, setAmbientTint] = useState('rgba(0,0,0,0)');
  const [silhouette, setSilhouette] = useState('');

  const currentLevel = LEVELS.find(l => l.id === currentLevelId);

  const triggerSubtitle = (text) => {
    if (!subtitlesEnabled) return;
    if (subtitleTimerRef.current) {
      clearTimeout(subtitleTimerRef.current);
    }
    setSubtitleText(text);
    subtitleTimerRef.current = setTimeout(() => {
      setSubtitleText('');
      subtitleTimerRef.current = null;
    }, 4200);
  };

  useEffect(() => {
    return () => {
      if (subtitleTimerRef.current) clearTimeout(subtitleTimerRef.current);
      if (glitchTimerRef.current) clearTimeout(glitchTimerRef.current);
    };
  }, []);

  useEffect(() => { setSurrenderConfirm(false); }, [screen, currentLevelId]);
  useEffect(() => { document.documentElement.style.setProperty('--brightness', brightness); }, [brightness]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        const scaryTitles = [
          'НЕ ОСТАВЛЯЙ МЕНЯ ЗДЕСЬ',
          'СМОТРИТЕЛЬ ВИДИТ, ЧТО ТЫ УШЁЛ',
          'ВЕРНИСЬ К ТЕРМИНАЛУ 44.1',
          'Б.И.Г. ФИКСИРУЕТ ПОТЕРЮ ФОКУСА'
        ];
        document.title = scaryTitles[Math.floor(Math.random() * scaryTitles.length)];
      } else {
        document.title = 'АРХИВЫ Б.И.Г. // ТЕРМИНАЛ 44.1';
        sound.playMicClick();
        triggerSubtitle('[Смотритель возобновил аудиофиксацию сессии]');
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [subtitlesEnabled]);

  useEffect(() => {
    const handleMouseMove = (e) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const activeEl = document.activeElement;
      const isTyping = activeEl && (
        activeEl.tagName === 'INPUT' ||
        activeEl.tagName === 'TEXTAREA' ||
        activeEl.isContentEditable
      );

      if (e.key === 'Escape') {
        if (boardOpen) setBoardOpen(false);
        else if (cliOpen) setCliOpen(false);
        else if (debugModalOpen) setDebugModalOpen(false);
        else if (readingDoc) setReadingDoc(null);
        else if (inventoryModalOpen) setInventoryModalOpen(false);
        else if (diaryModalOpen) setDiaryModalOpen(false);
        else if (dossierModalOpen) setDossierModalOpen(false);
        else if (codeModalOpen) setCodeModalOpen(false);
        else if (coreConsoleModalOpen) setCoreConsoleModalOpen(false);
        return;
      }

      if (isTyping) return;

      if (e.key === 'Tab') {
        e.preventDefault();
        sound.playSpatialClick(660);
        setBoardOpen(prev => !prev);
        return;
      }
      if (e.key === '`' || e.key === '~' || e.key === 'ё' || e.key === 'Ё') {
        e.preventDefault();
        sound.playSpatialClick(700);
        setCliOpen(prev => !prev);
        return;
      }
      if (e.key === 'F2') {
        e.preventDefault();
        sound.playSpatialClick(800);
        setDebugModalOpen(prev => !prev);
        return;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [boardOpen, cliOpen, debugModalOpen, readingDoc, inventoryModalOpen, diaryModalOpen, dossierModalOpen, codeModalOpen, coreConsoleModalOpen]);

  useEffect(() => {
    const timer = setInterval(() => {
      const notes = [
        'ПРОТОКОЛ НАДЗОРА Б.И.Г. // ТЕРМИНАЛ 44.1 АКТИВЕН',
        'СВОДКА: НАЖМИТЕ [TAB] ДЛЯ ОТКРЫТИЯ ДОСКИ РАССЛЕДОВАНИЯ С НИТЯМИ',
        'СОВЕТ: НАЖМИТЕ [`] ДЛЯ ВЫЗОВА КОМАНДНОЙ СТРОКИ ТЕРМИНАЛА Б.И.Г.',
        'АРХИВНАЯ СПРАВКА: ОТКРОЙТЕ ВСЕ 7 КОНЦОВОК В ДОСЬЕ СУБЪЕКТА'
      ];
      setTerminalNote(notes[Math.floor(Math.random() * notes.length)]);
      if (Math.random() > 0.75) {
        setGlitchHeader('Б.И.Г. НАДЗОР');
        if (glitchTimerRef.current) clearTimeout(glitchTimerRef.current);
        glitchTimerRef.current = setTimeout(() => {
          setGlitchHeader('ТЕРМИНАЛ 44.1');
          glitchTimerRef.current = null;
        }, 360);
      }
    }, 6000);
    return () => {
      clearInterval(timer);
      if (glitchTimerRef.current) clearTimeout(glitchTimerRef.current);
    };
  }, []);

  const addDiaryLog = (key, title, text) => {
    setDiaryEntries(prev => {
      if (key && prev.some(item => item.id === key)) return prev;
      const next = [{ id: key || String(Date.now() + Math.random()), title, text }, ...prev];
      safeStorage.setJSON('backrooms_diary', next);
      return next;
    });
  };

  const registerUnlockedEnding = (endingId) => {
    setUnlockedEndings(prev => {
      if (prev.includes(endingId)) return prev;
      const next = [...prev, endingId];
      safeStorage.setJSON('backrooms_endings', next);
      return next;
    });
  };

  const handleCliSubmit = (e) => {
    e.preventDefault();
    const cmd = cliInput.trim().toLowerCase();
    if (!cmd) return;
    const newHistory = [...cliHistory, `> ${cliInput}`];

    if (cmd === 'help') {
      newHistory.push(
        'ДОСТУПНЫЕ КОМАНДЫ ТЕРМИНАЛА Б.И.Г.:',
        '  scan       - глубокий спектральный анализ текущего сектора',
        '  cat doc-X  - вывести исходный текст документа (cat doc-1 .. cat doc-4)',
        '  ping 44.1  - проверить канал связи с постом Смотрителя #44',
        '  status     - сводка прогресса расследования и допусков',
        '  override   - принудительный тест видеобуфера',
        '  clear      - очистить консоль'
      );
    } else if (cmd === 'scan') {
      sound.playAnomalyStinger();
      newHistory.push(
        `[SCAN]: Локация: ${currentLevel ? currentLevel.title : 'Главный буфер'}`,
        `[SCAN]: Частота: 44.1 kHz. Обнаружены скрытые флуоресцентные метки (включите УФ-спектр 365 нм).`
      );
    } else if (cmd.startsWith('cat doc-')) {
      const docNum = cmd.replace('cat doc-', '');
      const dKey = `doc${docNum}`;
      if (SECRET_DOCS_META[dKey]) {
        newHistory.push(
          `=== ${SECRET_DOCS_META[dKey].code} (${SECRET_DOCS_META[dKey].title}) ===`,
          SECRET_DOCS_META[dKey].content,
          `// ПРИМЕЧАНИЕ: ${SECRET_DOCS_META[dKey].cipherFragment}`
        );
      } else {
        newHistory.push(`[ОШИБКА]: Документ ${dKey} не найден.`);
      }
    } else if (cmd === 'ping 44.1') {
      sound.playSpatialClick(300);
      newHistory.push(
        'PING 44.1 (smotritel_node_44): 56 data bytes',
        '64 bytes from 44.1: icmp_seq=1 ttl=44 time=0.44 ms',
        'ОТВЕТ УЗЛА: «Субъект пытается пинговать пост надзора. Продолжайте наблюдение».'
      );
    } else if (cmd === 'status') {
      newHistory.push(
        `Собрано документов Б.И.Г.: ${inventoryDocs.length}/4`,
        `Выписано зацепок в блокнот: ${extractedClues.length}/4`,
        `Штампов концовок в Досье: ${unlockedEndings.length}/7`,
        `Root-доступ Администратора: ${adminModeUnlocked ? 'АКТИВЕН' : 'НЕТ'}`
      );
    } else if (cmd === 'override') {
      setBsodCrash(true);
      sound.playAnomalyStinger();
      setTimeout(() => setBsodCrash(false), 2400);
      newHistory.push('// СБОЙ ВИДЕОДРАЙВЕРА 0x00000044. СЕССИЯ ВОССТАНОВЛЕНА.');
    } else if (cmd === 'clear') {
      setCliHistory(['АРХИВ Б.И.Г. // СИСТЕМНАЯ КОНСОЛЬ v44.1']);
      setCliInput('');
      return;
    } else {
      newHistory.push(`[ОШИБКА]: Неизвестная команда "${cmd}". Введите "help".`);
    }

    setCliHistory(newHistory);
    setCliInput('');
  };

  const handleBoardMouseDown = (e, nodeId) => {
    const node = boardNodes.find(n => n.id === nodeId);
    if (!node || !boardCanvasRef.current) return;
    const rect = boardCanvasRef.current.getBoundingClientRect();
    const localClickX = e.clientX - rect.left;
    const localClickY = e.clientY - rect.top;
    setDraggingNodeId(nodeId);
    setDragOffset({ x: localClickX - node.x, y: localClickY - node.y });
  };

  const handleBoardMouseMove = (e) => {
    if (!draggingNodeId || !boardCanvasRef.current) return;
    const rect = boardCanvasRef.current.getBoundingClientRect();
    const localMouseX = e.clientX - rect.left;
    const localMouseY = e.clientY - rect.top;
    const maxX = Math.max(20, rect.width - 240);
    const maxY = Math.max(20, rect.height - 130);

    setBoardNodes(prev => prev.map(n => {
      if (n.id === draggingNodeId) {
        return {
          ...n,
          x: Math.max(10, Math.min(maxX, localMouseX - dragOffset.x)),
          y: Math.max(10, Math.min(maxY, localMouseY - dragOffset.y))
        };
      }
      return n;
    }));
  };

  const handleBoardMouseUp = () => setDraggingNodeId(null);

  const handleConnectBoardNode = (nodeId) => {
    if (!linkingFromId) {
      setLinkingFromId(nodeId);
      sound.playSpatialClick(600);
      triggerSubtitle('[Выберите вторую карточку на доске, чтобы протянуть красную нить]');
    } else if (linkingFromId === nodeId) {
      setLinkingFromId(null);
    } else {
      setBoardLinks(prev => [...prev, { from: linkingFromId, to: nodeId }]);
      setLinkingFromId(null);
      sound.playSpatialClick(800);
      triggerSubtitle('[Красная нить связи натянута]');
    }
  };

  const handleAddBoardNote = () => {
    const text = prompt('Введите текст заметки следователя для Доски улик:');
    if (!text) return;
    const newId = `note_${Date.now()}`;
    setBoardNodes(prev => [...prev, { id: newId, title: 'Заметка следователя', text, x: 220, y: 210, isNote: true }]);
    sound.playSpatialClick(720);
  };

  const extractClueFromDoc = (clueKey) => {
    sound.playSpatialClick(760);
    const token = CLUE_TOKENS[clueKey];
    if (!token) return;
    if (!extractedClues.includes(clueKey)) {
      const next = [...extractedClues, clueKey];
      setExtractedClues(next);
      safeStorage.setJSON('backrooms_clues', next);
      addDiaryLog(`clue-${clueKey}`, `Выписана зацепка: ${token.label}`, `В Блокнот дешифровки занесено значение «${token.digit}».`);
    }
    triggerSubtitle(`[Зацепка занесена в Блокнот дешифровки: ${token.label}]`);
  };

  const applyClueToDecoder = (clueKey) => {
    sound.playSpatialClick(680);
    const token = CLUE_TOKENS[clueKey];
    if (!token) return;
    if (token.digit === '133') {
      setPinSlots(['1', '3', '3']); setCodeInput('133'); setCodeError(''); return;
    }
    const nextSlots = [...pinSlots];
    nextSlots[activeSlotIdx] = token.digit;
    setPinSlots(nextSlots);
    setActiveSlotIdx((activeSlotIdx + 1) % 3);
    setCodeInput(nextSlots.join(''));
    setCodeError('');
  };

  const handleDebugUnlockAllSectors = () => {
    sound.playSpatialClick(820);
    const fullMap = {};
    LEVELS.forEach(lvl => {
      if (!lvl.hiddenUntilUnlocked) {
        fullMap[lvl.id] = lvl.hotspots.filter(h => !h.trap).map(h => h.id);
      }
    });
    setExploredMap(fullMap);
    setAdminModeUnlocked(true);
    setHasAdminKey(true);
    safeStorage.setJSON('backrooms_explored', fullMap);
    safeStorage.set('backrooms_admin_mode', 'true');
    safeStorage.set('backrooms_admin_key', 'true');
    triggerSubtitle('[DEBUG: Все сектора (включая 10 и 11) и Ключ Администратора разблокированы]');
  };

  const handleDebugGrantAllDocs = () => {
    sound.playSpatialClick(840);
    const allDocs = ['doc1', 'doc2', 'doc3', 'doc4'];
    const allClues = ['clue_4', 'clue_8', 'clue_1', 'clue_133'];
    setInventoryDocs(allDocs);
    setExtractedClues(allClues);
    setHasAdminKey(true);
    safeStorage.setJSON('backrooms_docs', allDocs);
    safeStorage.setJSON('backrooms_clues', allClues);
    safeStorage.set('backrooms_admin_key', 'true');
    triggerSubtitle('[DEBUG: Выданы все документы (doc1–doc4), зацепки и Ключ Администратора]');
  };

  const handleDebugTeleport = (targetId) => {
    setDebugModalOpen(false);
    if (targetId === 'lvl-10' || targetId === 'lvl-11') {
      setAdminModeUnlocked(true);
      safeStorage.set('backrooms_admin_mode', 'true');
    }
    openLevel(targetId, true);
    triggerSubtitle(`[DEBUG: Выполнен прямой телепорт в ${targetId}]`);
  };

  const resetProgress = (startImmediately = false) => {
    sound.stopAll();
    setSurrenderConfirm(false);
    setCodeModalOpen(false);
    setCoreConsoleModalOpen(false);
    setDebugModalOpen(false);
    setSystemOverlayMsg(null);
    setCodeInput('');
    setCodeError('');
    setPinSlots(['', '', '']);
    setActiveSlotIdx(0);
    setUvMode(false);
    setPuzzleSteps({});

    safeStorage.clearKeys([
      'backrooms_saved_level',
      'backrooms_explored',
      'backrooms_docs',
      'backrooms_diary',
      'backrooms_clues',
      'backrooms_admin_mode',
      'backrooms_admin_key'
    ]);

    const initialDiary = [{ id: 'init', title: 'Инициализация субъекта', text: 'Я очнулся в буферном секторе комплекса Б.И.Г. За мной ведётся наблюдение через терминал 44.1.' }];
    safeStorage.setJSON('backrooms_diary', initialDiary);

    setSavedLevelId(null);
    setExploredMap({});
    setInventoryDocs([]);
    setExtractedClues([]);
    setAdminModeUnlocked(false);
    setHasAdminKey(false);
    setDiaryEntries(initialDiary);
    setActiveReport(null);
    setReadingDoc(null);
    setInventoryModalOpen(false);
    setDiaryModalOpen(false);
    setEndingData(null);

    if (startImmediately) {
      openLevel('lvl-0', true);
    } else {
      setCurrentLevelId(null);
      setScreen('main');
      triggerSubtitle('[Текущая экспедиция сброшена (Штампы в Досье сохранены)]');
    }
  };

  const isLevelUnlocked = (lvl) => {
    if (lvl.id === 'lvl-0') return true;
    if (lvl.id === 'lvl-9' || lvl.id === 'lvl-13') return false;
    if (lvl.id === 'lvl-10') return adminModeUnlocked;
    if (lvl.id === 'lvl-11') return adminModeUnlocked && isLevelFullyCleared(LEVELS.find(l => l.id === 'lvl-10'));
    const prev = LEVELS.find(l => l.seq === lvl.seq - 1);
    if (!prev) return true;
    const req = prev.hotspots.filter(h => !h.trap).map(h => h.id);
    const done = exploredMap[prev.id] || [];
    return req.every(id => done.includes(id));
  };

  const isLevelFullyCleared = (lvl) => {
    if (!lvl) return false;
    const req = lvl.hotspots.filter(h => !h.trap).map(h => h.id);
    const done = exploredMap[lvl.id] || [];
    return req.every(id => done.includes(id));
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sound.enabled = next;
    if (next) {
      sound.playSpatialClick(640);
      if (screen === 'level' && currentLevelId) sound.startAmbient(currentLevelId);
      triggerSubtitle('[Пространственный аудиомониторинг включён]');
    } else {
      sound.stopAll();
      triggerSubtitle('[Аудиомониторинг отключён]');
    }
  };

  const openLevel = (id, forceOpen = false) => {
    const targetLvl = LEVELS.find(l => l.id === id);
    if (!targetLvl || (!forceOpen && !isLevelUnlocked(targetLvl))) return;

    setSurrenderConfirm(false);
    sound.playSpatialClick(480);
    setActiveReport(null);
    setAmbientTint('rgba(0,0,0,0)');
    setSilhouette('');

    addDiaryLog(`visit-${id}`, `${targetLvl.number}: ${targetLvl.title}`, targetLvl.diaryEntry);

    setCurrentLevelId(id);
    if (id !== 'lvl-9' && id !== 'lvl-13') {
      setSavedLevelId(id);
      safeStorage.set('backrooms_saved_level', id);
    }
    setScreen('level');
    sound.startAmbient(id);
  };

  const handleInspectHotspot = (hotspot, panX = 0) => {
    if (currentLevelId === 'lvl-9' && hotspot.id === 'h9-end' && uvMode) {
      sound.stopAmbient();
      sound.playAnomalyStinger();
      setSystemOverlayMsg('// СИСТЕМА ВЗЛОМАНА // ЗАГРУЗКА АДМИНИСТРАТИВНОГО МОДУЛЯ...');
      setAdminModeUnlocked(true);
      safeStorage.set('backrooms_admin_mode', 'true');
      addDiaryLog('hack-sec09', 'Взлом тупика «The End» (REBOOT --OVERRIDE)', 'В ультрафиолете на страницах тома проявился эксплойт. Система перебросила меня в скрытый Сектор 10.');

      setTimeout(() => {
        setSystemOverlayMsg(null);
        setUvMode(false);
        openLevel('lvl-10', true);
      }, 2000);
      return;
    }

    if (currentLevelId === 'lvl-11' && hotspot.id === 'h11-console') {
      if (!hasAdminKey) {
        sound.playSpatialClick(260, panX);
        setActiveReport({
          label: hotspot.label,
          report: 'ДОСТУП ОТКЛОНЁН: Требуется аппаратный «Ключ Администратора» из Сектора 10 (Чистилище данных).'
        });
        triggerSubtitle('[Нужен Ключ Администратора из Сектора 10!]');
        return;
      }
      sound.playSpatialClick(820, panX);
      setActiveReport(hotspot);
      setCoreConsoleModalOpen(true);
      return;
    }

    if (hotspot.trap) {
      sound.playSpatialClick(220, panX);
      setActiveReport(hotspot);
      setExploredMap(prev => {
        const updated = { ...prev, [currentLevelId]: [] };
        safeStorage.setJSON('backrooms_explored', updated);
        return updated;
      });
      triggerSubtitle('[СБОЙ СКАНЕРА: Донный сенсор Б.И.Г. сбросил калибровку Сектора 05!]');
      return;
    }

    const currentList = exploredMap[currentLevelId] || [];
    const isAlreadyExplored = currentList.includes(hotspot.id);
    if (hotspot.interactiveSteps && !isAlreadyExplored) {
      const nextStep = (puzzleSteps[hotspot.id] || 0) + 1;
      setPuzzleSteps(prev => ({ ...prev, [hotspot.id]: nextStep }));
      sound.playSpatialClick(420 + nextStep * 120, panX);
      if (nextStep < hotspot.interactiveSteps) {
        setActiveReport({
          label: hotspot.label,
          report: `Механизм поворачивается со скрипом (${nextStep}/${hotspot.interactiveSteps})... Нажмите ещё раз на сцене, чтобы докрутить до конца.`
        });
        triggerSubtitle(`[Поворот механизма: ${nextStep}/${hotspot.interactiveSteps}]`);
        return;
      }
    }

    const triggeredAudioScare = currentLevelId !== 'lvl-9' && currentLevelId !== 'lvl-13' && Math.random() < 0.25;
    if (triggeredAudioScare) {
      sound.playAnomalyStinger();
    } else {
      sound.playSpatialClick(720, panX);
    }

    setActiveReport(hotspot);

    const isNewHotspot = !currentList.includes(hotspot.id);
    if (isNewHotspot) {
      const updatedMap = { ...exploredMap, [currentLevelId]: [...currentList, hotspot.id] };
      setExploredMap(updatedMap);
      safeStorage.setJSON('backrooms_explored', updatedMap);
    }

    if (hotspot.givesAdminKey) {
      setHasAdminKey(true);
      safeStorage.set('backrooms_admin_key', 'true');
      addDiaryLog('admin-key', 'Найден Ключ Администратора', 'В Секторе 10 получен root-ключ для центральной консоли Ядра Б.И.Г.');
      triggerSubtitle('[ПОЛУЧЕН КЛЮЧ АДМИНИСТРАТОРА Б.И.Г.!]');
    }

    if (hotspot.givesDoc && !inventoryDocs.includes(hotspot.givesDoc)) {
      const nextDocs = [...inventoryDocs, hotspot.givesDoc];
      setInventoryDocs(nextDocs);
      safeStorage.setJSON('backrooms_docs', nextDocs);
      const docMeta = SECRET_DOCS_META[hotspot.givesDoc];
      addDiaryLog(`doc-${hotspot.givesDoc}`, `Найдена запись ${docMeta.code}`, `Обнаружен документ Б.И.Г.: «${docMeta.title}».`);
      triggerSubtitle(`[В ИНВЕНТАРЬ ДОБАВЛЕНА ЗАПИСЬ: ${docMeta.code}]`);
      openDocumentReader(docMeta);
    } else if (triggeredAudioScare) {
      triggerSubtitle('Вы слышите резкий скрежет за спиной. Но там никого нет.');
    } else {
      triggerSubtitle(`[Вы заметили: ${hotspot.label}]`);
    }
  };

  const openDocumentReader = (docMeta) => {
    sound.playSpatialClick(620);
    addDiaryLog(`read-${docMeta.id}`, `Изучен документ ${docMeta.code}`, `Заметка расследования: ${docMeta.note}`);
    setReadingDoc(docMeta);
  };

  const renderInteractiveDocContent = (docId) => {
    const Chip = ({ word, clueKey }) => {
      const isExtracted = extractedClues.includes(clueKey);
      return (
        <span
          className={`interactive-word ${isExtracted ? 'extracted' : ''}`}
          onClick={() => extractClueFromDoc(clueKey)}
          title="Нажмите, чтобы выписать зацепку в Блокнот дешифровки"
        >
          {word} {isExtracted ? '✓' : '[+]'}
        </span>
      );
    };

    if (docId === 'doc1') {
      return (
        <>
          «Сегодня обходил Затопленный Архив. Вода поднялась, но бетонные колонны держатся. Их всего{' '}
          <Chip word="четыре" clueKey="clue_4" />, но они держат весь свод. А в Паркинге (Сектор 03) седан под номером{' '}
          <Chip word="восемь" clueKey="clue_8" /> снова заглох. Смотритель сказал, что это не баг, а фича. Б.И.Г. довольна».
        </>
      );
    }
    if (docId === 'doc2') {
      return (
        <>
          «Седан под номером <Chip word="восемь" clueKey="clue_8" /> снова заглох. Я оставил его на паркинге, но он перекатывается сам по себе. А в Архиве, где{' '}
          <Chip word="четыре" clueKey="clue_4" /> колонны, вода сегодня особенно черная...»
        </>
      );
    }
    if (docId === 'doc3') {
      return (
        <>
          «Приказываю: не допускать проникновения субъектов в Зал Торжеств. Если субъект нашел все три записи, он представляет угрозу. Настоящий код доступа —{' '}
          <Chip word="133" clueKey="clue_133" />, это отвлечет его внимание. Истинный выход — за красной дверью, которая в протоколе идет{' '}
          <Chip word="первой" clueKey="clue_1" />. Пусть думает, что это его выбор. P.S. Смотритель, не забудь стереть его память после. Б.И.Г. не нуждается в свидетелях».
        </>
      );
    }
    return SECRET_DOCS_META[docId]?.content || null;
  };

  const handleCodeSubmit = (e) => {
    if (e) e.preventDefault();
    const clean = codeInput.trim();
    if (clean === '481') {
      sound.playSpatialClick(880);
      setCodeModalOpen(false);
      setCodeError('');
      addDiaryLog('code-481', 'Шлюз Сектора 08 взломан (Код 481)', 'Код 481 подошёл к замку.');
      setScreen('doors');
      return;
    }
    if (clean === '133') {
      sound.playAnomalyStinger();
      setCodeModalOpen(false);
      setCodeError('');
      setWhiteFlash(true);
      setTimeout(() => setWhiteFlash(false), 220);
      addDiaryLog('code-133-trap', 'Ловушка кода 133 («The End»)', 'Код 133 оказался приманкой Б.И.Г. Меня сбросило в тупиковый Сектор 09.');
      openLevel('lvl-9', true);
      return;
    }
    sound.playSpatialClick(240);
    setCodeError('ДОСТУП ЗАПРЕЩЕН');
  };

  const handleLeftGreenDoorTrap = () => {
    sound.stopAmbient();
    registerUnlockedEnding('fun_trap');
    setScreen('trap');
    setTrapPhase(1);
    setTimeout(() => setTrapPhase(2), 1800);
    setTimeout(() => {
      setTrapPhase(0);
      setEndingData(ENDINGS_CATALOG.find(e => e.id === 'fun_trap'));
      setScreen('ending');
    }, 3500);
  };

  const handleRightRedDoorEscape = () => {
    sound.stopAmbient();
    sound.playSpatialClick(880);
    registerUnlockedEnding('true_exit');
    setEndingData(ENDINGS_CATALOG.find(e => e.id === 'true_exit'));
    setScreen('ending');
  };

  const handleAdminShutdownEnding = () => {
    setCoreConsoleModalOpen(false);
    sound.stopAmbient();
    sound.playSpatialClick(880);
    registerUnlockedEnding('admin_shutdown');
    setEndingData(ENDINGS_CATALOG.find(e => e.id === 'admin_shutdown'));
    setScreen('ending');
  };

  const handleTriggerCoreOverreach = () => {
    setCoreConsoleModalOpen(false);
    sound.stopAmbient();
    sound.playAnomalyStinger();
    setSystemOverlayMsg('// КРИТИЧЕСКАЯ ОШИБКА: СУБЪЕКТ ПРЕВЫСИЛ ПОЛНОМОЧИЯ //');
    addDiaryLog('core-overreach', 'Превышение полномочий в Ядре', 'Попытка вскрыть корневой архив вызвала блокировку. Меня сбросило в Сектор 13 («Пасть Архива»).');

    setTimeout(() => {
      setSystemOverlayMsg(null);
      setUvMode(false);
      openLevel('lvl-13', true);
    }, 2000);
  };

  const handleDigestedEnding = () => {
    sound.stopAmbient();
    sound.playAnomalyStinger();
    registerUnlockedEnding('digested');
    setEndingData(ENDINGS_CATALOG.find(e => e.id === 'digested'));
    setScreen('ending');
  };

  const handleAcceptFateInTheEnd = () => {
    sound.stopAmbient();
    sound.playSpatialClick(240);
    registerUnlockedEnding('the_end');
    setEndingData(ENDINGS_CATALOG.find(e => e.id === 'the_end'));
    setScreen('ending');
  };

  const handlePassiveDisappearEnding = () => {
    if (!surrenderConfirm) {
      sound.playSpatialClick(340);
      setSurrenderConfirm(true);
      triggerSubtitle('[Нажмите ещё раз, если действительно хотите прекратить расследование]');
      return;
    }
    setSurrenderConfirm(false);
    sound.stopAmbient();
    sound.playAnomalyStinger();
    const endId = inventoryDocs.length === 0 ? 'parasite' : 'disappear';
    registerUnlockedEnding(endId);
    setEndingData(ENDINGS_CATALOG.find(e => e.id === endId));
    setScreen('ending');
  };

  const visibleLevels = LEVELS.filter(l => !l.hiddenUntilUnlocked && (!l.adminSector || adminModeUnlocked));
  const currentExplored = currentLevel ? (exploredMap[currentLevel.id] || []) : [];
  const totalClearedCount = visibleLevels.filter(l => isLevelFullyCleared(l)).length;
  const baseDocsCollected = ['doc1', 'doc2', 'doc3'].every(k => inventoryDocs.includes(k));
  const isNoEscapeSector = currentLevel && (currentLevel.id === 'lvl-9' || currentLevel.id === 'lvl-13');
  const docSlotKeys = adminModeUnlocked || inventoryDocs.includes('doc4') ? ['doc1', 'doc2', 'doc3', 'doc4'] : ['doc1', 'doc2', 'doc3'];

  return (
    <div
      className={reducedEffects ? 'reduced-effects' : ''}
      style={{ '--dynamic-tint': ambientTint }}
      onMouseEnter={() => setCursorHover(true)}
      onMouseLeave={() => setCursorHover(false)}
    >
      <div className="ambient-layer"></div>
      <div className="ambient-silhouette">{silhouette}</div>
      <div className="overlay vignette"></div>
      <div className="overlay crt-lines"></div>
      <div className="overlay noise"></div>

      <div className={`custom-cursor-dot ${cursorHover ? 'cursor-hover' : ''}`} style={{ left: cursorPos.x, top: cursorPos.y }}></div>
      {whiteFlash && <div className="white-flash-overlay"></div>}

      {bsodCrash && (
        <div className="bsod-crash-overlay">
          <h1 style={{ color: '#ff4757', fontSize: '2.4rem' }}>*** STOP: 0x00000044 (KERNEL_SECURITY_CHECK_FAILURE)</h1>
          <p>Система наблюдения Б.И.Г. зафиксировала попытку прямого аппаратного перехвата памяти.</p>
          <p>Dumping physical memory to disk: 44.1% complete...</p>
          <p style={{ color: '#ffd43b' }}>ПЕРЕЗАПУСК ВИДЕОДРАЙВЕРА ТЕРМИНАЛА...</p>
        </div>
      )}

      {systemOverlayMsg && (
        <div className="trap-phase-screen" style={{ backgroundColor: '#000000', color: '#ff4757', zIndex: 99999 }}>
          <div style={{ fontSize: '0.82rem', letterSpacing: '4px', color: '#00f5d4', marginBottom: '14px' }}>
            // SYSTEM OVERRIDE // KERNEL PANIC //
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 'normal', letterSpacing: '3px', maxWidth: '760px', lineHeight: '1.5' }}>
            {systemOverlayMsg}
          </h2>
        </div>
      )}

      <div className="topbar-wrapper">
        <header className="topbar">
          <div className="topbar-left">
            <div className="brand-badge">
              <span className="status-dot"></span>
              <span>{glitchHeader}</span>
            </div>
            <div className="protocol-pill">// АРХИВ Б.И.Г. | НАДЗОР СМОТРИТЕЛЯ #44</div>
            {adminModeUnlocked && (
              <div className="admin-pill">[ROOT-ДОСТУП {hasAdminKey ? '+ КЛЮЧ ЯДРА' : 'АКТИВЕН'}]</div>
            )}
            <div className="terminal-log">{terminalNote}</div>
          </div>

          <div className="topbar-actions">
            <button className="btn" style={{ borderColor: '#d9384a', color: '#ff8593' }} onClick={() => setBoardOpen(true)}>
              📌 Доска улик [TAB]
            </button>
            <button className="btn" onClick={() => setDossierModalOpen(true)}>
              Досье ({unlockedEndings.length}/7)
            </button>
            <button className="btn" onClick={() => setDiaryModalOpen(true)}>
              Дневник ({diaryEntries.length})
            </button>
            <button className="btn" onClick={() => setInventoryModalOpen(true)}>
              Документы ({inventoryDocs.length}/{docSlotKeys.length})
            </button>
            <button className="btn" onClick={toggleSound}>
              {soundEnabled ? 'Звук: ВКЛ' : 'Звук: ВЫКЛ'}
            </button>
            {screen !== 'main' && !isNoEscapeSector && (
              <button className="btn" onClick={() => { setSurrenderConfirm(false); sound.stopAmbient(); setScreen('main'); }}>
                Меню
              </button>
            )}
          </div>
        </header>
      </div>

      {screen === 'main' && (
        <main className="hero-screen">
          <aside className="hero-sidebar">
            <div>
              <div className="game-kicker">Большая Исследовательская Группа (Б.И.Г.)</div>
              <h1 className="game-title">АРХИВЫ ЗАКУЛИСЬЯ</h1>
              <p className="game-tagline">
                Нарративный квест-детектив. Используйте УФ-спектр для поиска тайных пометок, связывайте улики красными нитями на Доске [TAB], работайте через консоль [`] и соберите все 7 штампов в Досье субъекта.
              </p>
              <nav className="menu-nav">
                <button className="menu-item" disabled={!savedLevelId} onClick={() => openLevel(savedLevelId)}>
                  <span>Продолжить расследование</span>
                  {savedLevelId && <span className="menu-item-meta">{LEVELS.find(l => l.id === savedLevelId)?.number}</span>}
                </button>
                <button className="menu-item" onClick={() => resetProgress(true)}>
                  <span>Новая экспедиция</span><span className="menu-item-meta">Сектор 00</span>
                </button>
                <button className="menu-item" onClick={() => setScreen('archive')}>
                  <span>Картотека секторов</span><span className="menu-item-meta">Изучено: {totalClearedCount}/{visibleLevels.length}</span>
                </button>
                <button className="menu-item" style={{ borderColor: '#d9384a', color: '#ffb3bd' }} onClick={() => setBoardOpen(true)}>
                  <span>Доска расследования</span><span className="menu-item-meta">[TAB]</span>
                </button>
                <button className="menu-item" onClick={() => setDossierModalOpen(true)}>
                  <span>Досье субъекта (Концовки)</span><span className="menu-item-meta">Открыто: {unlockedEndings.length}/7</span>
                </button>
                <button className="menu-item" onClick={() => setDiaryModalOpen(true)}>
                  <span>Дневник расследования</span><span className="menu-item-meta">Записей: {diaryEntries.length}</span>
                </button>
                <button className="menu-item" onClick={() => setInventoryModalOpen(true)}>
                  <span>Документы Б.И.Г.</span><span className="menu-item-meta">{inventoryDocs.length} из {docSlotKeys.length}</span>
                </button>
                <button className="menu-item" onClick={() => setScreen('settings')}>
                  <span>Настройки терминала</span><span className="menu-item-meta">Экран / Аудио</span>
                </button>
              </nav>
            </div>
            <div style={{ fontSize: '0.74rem', color: '#666458', borderTop: '1px dashed #292922', paddingTop: '12px' }}>
              Сборка v13.0 Release // Разделённая архитектура.
            </div>
          </aside>
          <section className="hero-art">
            <MainMenuBackdrop />
            <div className="hero-art-caption">
              <strong>АРСЕНАЛ СЛЕДОВАТЕЛЯ:</strong> Нажмите <strong>[TAB]</strong> для открытия пробковой Доски улик с красными нитями или <strong>[`]</strong> для командной строки Б.И.Г.
            </div>
          </section>
        </main>
      )}

      {screen === 'archive' && (
        <main className="archive-container">
          <div className="archive-header">
            <div>
              <h2 className="archive-title">
                КАРТОТЕКА СЕКТОРОВ Б.И.Г. {adminModeUnlocked ? '(00 → 11 // ROOT-РЕЖИМ)' : '(00 → 08)'}
              </h2>
              <p style={{ color: 'var(--text-muted)', marginTop: '4px', fontSize: '0.86rem' }}>
                Осматривайте объекты на иллюстрациях каждого сектора, чтобы продвигаться по цепочке.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              {!baseDocsCollected && (
                <button className={`btn-surrender ${surrenderConfirm ? 'confirming' : ''}`} onClick={handlePassiveDisappearEnding}>
                  {surrenderConfirm ? '[ Подтвердить: Прекратить поиски? ]' : 'Прекратить поиски (Сдаться)'}
                </button>
              )}
              <div style={{ background: 'var(--bg-panel)', border: '1px solid var(--border)', padding: '8px 14px', fontSize: '0.8rem', color: 'var(--accent)' }}>
                Документов: {inventoryDocs.length}/{docSlotKeys.length} | Зацепок: {extractedClues.length}/4
              </div>
            </div>
          </div>

          <div className="chain-bar">
            {visibleLevels.map((lvl, i) => {
              const unlocked = isLevelUnlocked(lvl);
              const cleared = isLevelFullyCleared(lvl);
              return (
                <React.Fragment key={lvl.id}>
                  <span className={`chain-node ${cleared ? 'cleared' : unlocked ? 'unlocked' : ''}`}>
                    {unlocked ? (cleared ? `✓ ${lvl.number}` : lvl.number) : `🔒 ${lvl.number}`}
                  </span>
                  {i < visibleLevels.length - 1 && <span style={{ color: '#555' }}>&rarr;</span>}
                </React.Fragment>
              );
            })}
          </div>

          <div className="levels-grid">
            {visibleLevels.map((lvl) => {
              const unlocked = isLevelUnlocked(lvl);
              const reqHotspots = lvl.hotspots.filter(h => !h.trap);
              const doneCount = (exploredMap[lvl.id] || []).filter(id => reqHotspots.some(h => h.id === id)).length;
              const isComplete = isLevelFullyCleared(lvl);

              return (
                <button
                  key={lvl.id}
                  className={`level-card ${!unlocked ? 'locked-card' : ''}`}
                  style={{ '--card-accent': lvl.accent }}
                  onMouseEnter={() => unlocked && (setAmbientTint(lvl.tint || 'rgba(0,0,0,0)'), setSilhouette(lvl.silhouette || ''))}
                  onMouseLeave={() => (setAmbientTint('rgba(0,0,0,0)'), setSilhouette(''))}
                  onClick={() => unlocked && openLevel(lvl.id)}
                >
                  {!unlocked && (
                    <div className="lock-overlay">
                      <div style={{ fontSize: '1.8rem' }}>🔒</div>
                      <strong>СЕКТОР ЗАБЛОКИРОВАН</strong>
                      <span style={{ color: '#999', fontSize: '0.75rem' }}>Сначала исследуйте предыдущий сектор</span>
                    </div>
                  )}
                  <div className="card-thumb">
                    <LevelIllustration levelId={lvl.id} isThumbnail={true} />
                    <div className="card-badges">
                      <span className="badge">{lvl.number}</span>
                      <span className={`badge ${isComplete ? 'badge-cleared' : ''}`}>
                        {isComplete ? 'Изучен ✓' : `Улики: ${doneCount}/${reqHotspots.length}`}
                      </span>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="card-title-row">
                      <h3 className="card-title">{lvl.title}</h3>
                      <span className="card-tone">{lvl.tone}</span>
                    </div>
                    <p className="card-sub">{lvl.story}</p>
                    <div className="card-quote">{lvl.quote}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </main>
      )}

      {screen === 'level' && currentLevel && (
        <main className="level-screen" style={{ '--lvl-accent': currentLevel.accent }}>
          {!isNoEscapeSector ? (
            <div className="level-screen-nav">
              <button className="btn" onClick={() => { sound.stopAmbient(); setScreen('archive'); }}>
                &larr; К картотеке секторов
              </button>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {visibleLevels.map((l) => {
                  const unlocked = isLevelUnlocked(l);
                  return (
                    <button
                      key={l.id}
                      disabled={!unlocked}
                      className="btn"
                      style={{
                        borderColor: l.id === currentLevel.id ? currentLevel.accent : undefined,
                        background: l.id === currentLevel.id ? 'rgba(184, 166, 102, 0.2)' : undefined
                      }}
                      onClick={() => openLevel(l.id)}
                    >
                      {unlocked ? l.number : `🔒 ${l.number}`}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="level-screen-nav">
              <div style={{ color: '#ff5d73', fontSize: '0.85rem', letterSpacing: '2px' }}>
                // ВЫХОД ЗАБЛОКИРОВАН ПРОТОКОЛОМ Б.И.Г. — НАЗАД ПУТИ НЕТ //
              </div>
            </div>
          )}

          <div className="level-layout">
            <section className="panel">
              <div className="panel-header">
                <div className="lvl-index">{currentLevel.number}</div>
                <h2 className="lvl-main-title">{currentLevel.title}</h2>
                <div className="lvl-story-chapter selectable-text">{currentLevel.story}</div>
                <span className="lvl-mood-tag">Атмосфера: {currentLevel.tone}</span>
              </div>

              <div className="docs-widget">
                <div className="section-label" style={{ marginBottom: 0 }}>
                  <span>Инвентарь: Документы Б.И.Г.</span>
                  <span style={{ color: 'var(--accent)' }}>{inventoryDocs.length} / {docSlotKeys.length}</span>
                </div>

                <div className="docs-slots">
                  {docSlotKeys.map((docKey, i) => {
                    const found = inventoryDocs.includes(docKey);
                    const meta = SECRET_DOCS_META[docKey];
                    return (
                      <div
                        key={docKey}
                        className={`doc-slot ${found ? 'found' : ''}`}
                        onClick={() => found && openDocumentReader(meta)}
                      >
                        <span>
                          <strong>[{found ? meta.code : `ДОКУМЕНТ #0${i + 1}`}]</strong>{' '}
                          {found ? meta.title : 'Не найден'}
                        </span>
                        <span style={{ fontSize: '0.72rem', color: found ? 'var(--accent)' : '#555' }}>
                          {found ? 'Читать' : 'Скрыто'}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="decoder-notebook">
                  <div style={{ fontSize: '0.73rem', color: 'var(--accent)', display: 'flex', justifyContent: 'space-between' }}>
                    <span>БЛОКНОТ ДЕШИФРОВКИ (ЗАЦЕПКИ)</span>
                    <span>{extractedClues.length}/4</span>
                  </div>
                  {extractedClues.length === 0 ? (
                    <div className="selectable-text" style={{ fontSize: '0.74rem', color: '#777', lineHeight: '1.4' }}>
                      Откройте найденный документ и кликните по подсвеченным словам-числам в тексте, чтобы выписать их сюда.
                    </div>
                  ) : (
                    <div className="clue-chips-wrap">
                      {extractedClues.map(ck => {
                        const token = CLUE_TOKENS[ck];
                        return (
                          <span
                            key={ck}
                            className={`clue-chip ${token.isTrap ? 'trap-chip' : ''}`}
                            onClick={() => { sound.playSpatialClick(640); triggerSubtitle(`Зацепка: ${token.label}`); }}
                          >
                            {token.label}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              <p className="lvl-description selectable-text">{currentLevel.description}</p>

              {currentLevel.features && (
                <div>
                  <div className="section-label">Особенности среды</div>
                  <ul className="feature-list selectable-text">
                    {currentLevel.features.map((f, i) => <li key={i}>{f}</li>)}
                  </ul>
                </div>
              )}

              <div>
                <div className="section-label">Архивная справка</div>
                <div className="connection-note selectable-text">{currentLevel.connection}</div>
              </div>
            </section>

            <section className="stage-wrapper">
              <div className="stage-toolbar">
                <span style={{ fontSize: '0.75rem', color: uvMode ? 'var(--uv-glow)' : 'var(--text-muted)', letterSpacing: '1px' }}>
                  {uvMode
                    ? '🟣 АКТИВЕН УЛЬТРАФИОЛЕТОВЫЙ СПЕКТР (365 нм) — ПРОЯВЛЕНЫ СКРЫТЫЕ НАДПИСИ'
                    : 'КАМЕРА ВИЗУАЛЬНОГО НАБЛЮДЕНИЯ // ШТАТНЫЙ СПЕКТР'}
                </span>
                <button
                  className={`btn-uv ${uvMode ? 'active' : ''}`}
                  onClick={() => { sound.playSpatialClick(uvMode ? 440 : 780); setUvMode(!uvMode); }}
                >
                  <span>🔦 {uvMode ? 'УФ-СПЕКТР: ВКЛ' : 'ВКЛЮЧИТЬ УФ-ФИЛЬТР'}</span>
                </button>
              </div>

              <div className={`stage-viewport ${uvMode ? 'uv-active' : ''}`}>
                <LevelIllustration
                  levelId={currentLevel.id}
                  hotspots={currentLevel.hotspots}
                  explored={currentExplored}
                  puzzleSteps={puzzleSteps}
                  onSelectHotspot={handleInspectHotspot}
                  uvMode={uvMode}
                />
              </div>

              <div className="inspection-console">
                {activeReport ? (
                  <>
                    <div className="inspection-title selectable-text">Вы заметили: {activeReport.label}</div>
                    <div className="inspection-text">{activeReport.report}</div>
                    {currentLevel.id === 'lvl-9' && activeReport.id === 'h9-end' && (
                      <div style={{ marginTop: '8px', display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                        <button className="btn-strict" onClick={handleAcceptFateInTheEnd}>
                          [ Принять судьбу ]
                        </button>
                        <span style={{ fontSize: '0.75rem', color: '#a855f7' }}>
                          (Подсказка: или включите УФ-фильтр и кликните на том снова...)
                        </span>
                      </div>
                    )}
                    {currentLevel.id === 'lvl-13' && activeReport.id === 'h13-maw' && (
                      <div style={{ marginTop: '8px' }}>
                        <button className="btn-strict" style={{ borderColor: '#ff3b56', color: '#ffd6db' }} onClick={handleDigestedEnding}>
                          [ Принять судьбу ]
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className="inspection-title">ЖУРНАЛ ВИЗУАЛЬНОЙ ИНСПЕКЦИИ</div>
                    <div className="inspection-text" style={{ color: '#8a8879' }}>
                      Нажимайте на предметы на сцене выше или включите «УФ-фильтр», чтобы увидеть флуоресцентные пометки.
                    </div>
                  </>
                )}
              </div>
            </section>

            <section className="panel">
              <div className="danger-box">
                <div className="section-label" style={{ marginBottom: 0 }}>
                  <span>Индекс контроля Б.И.Г.</span><span>{currentLevel.danger} / 5</span>
                </div>
                <div className="danger-bars">
                  {[1, 2, 3, 4, 5].map(n => (
                    <div key={n} className="danger-bar" style={{ background: n <= currentLevel.danger ? (currentLevel.danger >= 4 ? 'var(--danger)' : currentLevel.danger === 3 ? '#c29b48' : 'var(--safe)') : 'transparent' }} />
                  ))}
                </div>
              </div>

              <div className="entity-card">
                <div className="section-label">Наблюдатель / Объект</div>
                <div className="entity-name selectable-text">{currentLevel.entity.name}</div>
                <p className="entity-desc selectable-text">{currentLevel.entity.desc}</p>
              </div>

              <div className="task-card">
                <div className="section-label">
                  <span>Улики в секторе (Ищите на сцене)</span>
                  <span>{isLevelFullyCleared(currentLevel) ? 'ИЗУЧЕНО' : 'В процессе'}</span>
                </div>
                <p className="selectable-text" style={{ fontSize: '0.8rem', color: '#c2c0b2' }}>{currentLevel.task}</p>

                <div className="hotspot-btn-list">
                  {currentLevel.hotspots.map((h) => {
                    const done = currentExplored.includes(h.id);
                    const isCurrent = activeReport?.id === h.id;
                    const stepCount = puzzleSteps[h.id] || 0;
                    return (
                      <div key={h.id} className={`hotspot-info-item ${isCurrent ? 'active' : ''}`}>
                        <span className="selectable-text">{h.label}</span>
                        <span style={{ color: done ? '#b8a666' : '#666' }}>
                          {done ? 'Изучено' : h.interactiveSteps ? `Ход: ${stepCount}/${h.interactiveSteps}` : 'Не изучено'}
                        </span>
                      </div>
                    );
                  })}

                  {currentLevel.id === 'lvl-10' && isLevelFullyCleared(currentLevel) && (
                    <button className="secret-option-btn unlocked" onClick={() => openLevel('lvl-11', true)}>
                      <span>[ROOT] Войти в Сектор 11: Ядро Б.И.Г.</span>
                      <span>ОТКРЫТО &rarr;</span>
                    </button>
                  )}

                  {currentLevel.id === 'lvl-fun' && (
                    <button
                      className={`secret-option-btn ${baseDocsCollected ? 'unlocked' : 'locked'}`}
                      disabled={!baseDocsCollected}
                      onClick={() => {
                        sound.playSpatialClick(880);
                        setCodeInput(pinSlots.join(''));
                        setCodeError('');
                        setCodeModalOpen(true);
                      }}
                    >
                      <span>[???] Ввести код шлюза Б.И.Г.</span>
                      <span>{baseDocsCollected ? 'ВВОД КОДА' : `Нужны док-ты (${inventoryDocs.filter(d => d !== 'doc4').length}/3)`}</span>
                    </button>
                  )}

                  {(currentLevel.id === 'lvl-fun' || currentLevel.id === 'lvl-9') && !baseDocsCollected && (
                    <button
                      className={`btn-surrender ${surrenderConfirm ? 'confirming' : ''}`}
                      style={{ marginTop: '8px', width: '100%' }}
                      onClick={handlePassiveDisappearEnding}
                    >
                      {surrenderConfirm ? '[ Подтвердить: Остаться навсегда? ]' : 'Прекратить поиски (Сдаться)'}
                    </button>
                  )}
                </div>
              </div>
            </section>
          </div>
        </main>
      )}

      {boardOpen && (
        <div className="board-modal-overlay">
          <div className="board-header">
            <div>
              <h2 style={{ color: '#f0eee2', fontSize: '1.4rem', letterSpacing: '2px', fontWeight: 'normal' }}>
                📌 ДОСКА РАССЛЕДОВАНИЯ СЛЕДОВАТЕЛЯ // EVIDENCE BOARD
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                Перетаскивайте карточки за верхнюю плашку. Нажмите «Связать нитью» на двух карточках, чтобы протянуть между ними красную нить.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="btn" onClick={handleAddBoardNote}>[ + Наклеить заметку ]</button>
              <button className="btn" onClick={() => setBoardLinks([])}>Очистить нити</button>
              <button className="btn" onClick={() => setBoardOpen(false)}>Закрыть [TAB]</button>
            </div>
          </div>

          <div
            className="board-canvas"
            ref={boardCanvasRef}
            onMouseMove={handleBoardMouseMove}
            onMouseUp={handleBoardMouseUp}
            onMouseLeave={handleBoardMouseUp}
          >
            <svg className="board-svg-links">
              {boardLinks.map((link, idx) => {
                const fromNode = boardNodes.find(n => n.id === link.from);
                const toNode = boardNodes.find(n => n.id === link.to);
                if (!fromNode || !toNode) return null;
                return (
                  <line
                    key={idx}
                    x1={fromNode.x + 115} y1={fromNode.y + 35}
                    x2={toNode.x + 115} y2={toNode.y + 35}
                    stroke="#d9384a" strokeWidth="2.5"
                    style={{ filter: 'drop-shadow(0 0 6px #ff4d6d)' }}
                  />
                );
              })}
            </svg>

            {boardNodes.map(node => (
              <div
                key={node.id}
                className={`board-card-node ${node.isNote ? 'pinned-note' : ''}`}
                style={{ left: node.x, top: node.y }}
              >
                <div className="board-card-drag-bar" onMouseDown={(e) => handleBoardMouseDown(e, node.id)}>
                  <span>{node.title}</span>
                  <span className="pin-badge-red"></span>
                </div>
                <div className="selectable-text" style={{ fontSize: '0.8rem', lineHeight: '1.45' }}>{node.text}</div>
                <button
                  className="btn"
                  style={{ fontSize: '0.68rem', padding: '3px 6px', marginTop: '4px', borderColor: linkingFromId === node.id ? '#ff4d6d' : undefined }}
                  onClick={() => handleConnectBoardNode(node.id)}
                >
                  {linkingFromId === node.id ? 'Выберите 2-ю карточку...' : 'Связать нитью'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {!cliOpen && (
        <button className="cli-bar-toggle" onClick={() => setCliOpen(true)}>
          <span>&gt;_ ТЕРМИНАЛ Б.И.Г. [`]</span>
        </button>
      )}

      {cliOpen && (
        <div className="cli-drawer">
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #222', paddingBottom: '4px', marginBottom: '6px' }}>
            <span style={{ color: 'var(--accent)', fontSize: '0.78rem' }}>ТЕРМИНАЛ Б.И.Г. // СИСТЕМНЫЙ КАНАЛ 44.1 (CLI)</span>
            <button className="btn" style={{ fontSize: '0.7rem', padding: '2px 8px' }} onClick={() => setCliOpen(false)}>Свернуть [`]</button>
          </div>
          <div className="cli-history">
            {cliHistory.map((line, idx) => <div className="selectable-text" key={idx}>{line}</div>)}
          </div>
          <form onSubmit={handleCliSubmit} className="cli-input-row">
            <span style={{ color: '#8cd460' }}>root@big-terminal:~#</span>
            <input
              type="text"
              className="cli-input"
              value={cliInput}
              onChange={(e) => setCliInput(e.target.value)}
              placeholder="Введите команду (help, scan, cat doc-1, ping 44.1, status, override, clear)..."
              autoFocus
            />
          </form>
        </div>
      )}

      {coreConsoleModalOpen && (
        <div className="modal-overlay" onClick={() => setCoreConsoleModalOpen(false)}>
          <div className="doors-modal" style={{ maxWidth: '760px', borderColor: '#ff3b56' }} onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: '0.78rem', color: '#ff6b81', letterSpacing: '3px', marginBottom: '8px' }}>
              ТЕРМИНАЛ ЯДРА Б.И.Г. // КЛЮЧ АДМИНИСТРАТОРА ПРИНЯТ
            </div>
            <h2 style={{ color: '#fff', fontSize: '1.75rem', letterSpacing: '2px', marginBottom: '12px', fontWeight: 'normal' }}>
              ВЫБЕРИТЕ ДИРЕКТИВУ ЯДРА
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#d8d6c8', lineHeight: '1.6', maxWidth: '640px', margin: '0 auto' }}>
              Вы получили полный root-доступ к серверам Большой Исследовательской Группы. Вы можете стереть всю симуляцию прямо сейчас — или попытаться принудительно распечатать запретный Корневой Архив #00.
            </p>
            <div className="doors-container">
              <div className="door-card left-door" onClick={handleAdminShutdownEnding}>
                <div style={{ fontSize: '2.1rem' }}>🛑⚡</div>
                <h3 style={{ color: '#8cd460', letterSpacing: '1px' }}>ДИРЕКТИВА: «УДАЛИТЬ»</h3>
                <p style={{ fontSize: '0.83rem', color: '#a8a698', lineHeight: '1.5' }}>
                  Полное форматирование серверов Б.И.Г. и отключение всех секторов Архива вместе с вашей цифровой копией.
                </p>
                <span className="btn-strict" style={{ marginTop: 'auto' }}>[ Нажать «Удалить» ]</span>
              </div>
              <div className="door-card right-door" onClick={handleTriggerCoreOverreach}>
                <div style={{ fontSize: '2.1rem' }}>👁️🩸</div>
                <h3 style={{ color: '#ff5d73', letterSpacing: '1px' }}>ВСКРЫТЬ КОРНЕВОЙ АРХИВ #00</h3>
                <p style={{ fontSize: '0.83rem', color: '#a8a698', lineHeight: '1.5' }}>
                  Запросить сверхсекретный уровень допуска Основателей и узнать, на чём именно работают серверы Б.И.Г.
                </p>
                <span className="btn-strict" style={{ marginTop: 'auto', borderColor: '#ff3b56', color: '#ffb3bd' }}>
                  [ Превысить полномочия ]
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {debugModalOpen && (
        <div className="modal-overlay" style={{ zIndex: 9950 }} onClick={() => setDebugModalOpen(false)}>
          <div className="debug-console-modal" onClick={e => e.stopPropagation()}>
            <div className="debug-warning-banner">ВНИМАНИЕ: ДОСТУП ТОЛЬКО ДЛЯ ПЕРСОНАЛА Б.И.Г.</div>
            <h3 style={{ color: '#b8f28a', marginBottom: '14px', letterSpacing: '2px' }}>КОНСОЛЬ СМОТРИТЕЛЯ // DEBUG MODE [F2]</h3>
            <button className="debug-btn" onClick={handleDebugUnlockAllSectors}>
              <span>[ Разблокировать все сектора ]</span><span>00–11 + Ключ</span>
            </button>
            <button className="debug-btn" onClick={handleDebugGrantAllDocs}>
              <span>[ Выдать все документы ]</span><span>doc1–doc4 + Ключ</span>
            </button>
            <button className="debug-btn" onClick={() => handleDebugTeleport('lvl-7')}>
              <span>[ Телепорт на Сектор 07 (Смотритель) ]</span><span>&rarr; lvl-7</span>
            </button>
            <button className="debug-btn" onClick={() => handleDebugTeleport('lvl-fun')}>
              <span>[ Телепорт на Сектор 08 (Кодовый шлюз) ]</span><span>&rarr; lvl-fun</span>
            </button>
            <button className="debug-btn" onClick={() => handleDebugTeleport('lvl-9')}>
              <span>[ Телепорт на Сектор 09 (The End) ]</span><span>&rarr; lvl-9</span>
            </button>
            <button className="debug-btn" onClick={() => handleDebugTeleport('lvl-10')}>
              <span>[ Телепорт на Сектор 10 (Чистилище данных) ]</span><span>&rarr; lvl-10</span>
            </button>
            <button className="debug-btn" onClick={() => handleDebugTeleport('lvl-11')}>
              <span>[ Телепорт на Сектор 11 (Ядро Б.И.Г.) ]</span><span>&rarr; lvl-11</span>
            </button>
            <button className="debug-btn" onClick={() => handleDebugTeleport('lvl-13')}>
              <span>[ Телепорт на Сектор 13 (Пасть Архива) ]</span><span>&rarr; lvl-13</span>
            </button>
            <button className="debug-btn" style={{ borderColor: '#6b5824', color: '#f0d878' }} onClick={() => resetProgress(false)}>
              <span>[ Сбросить прогресс ]</span><span>resetProgress()</span>
            </button>
            <button className="debug-btn" style={{ justifyContent: 'center', marginTop: '6px' }} onClick={() => setDebugModalOpen(false)}>
              <span>[ Закрыть консоль ]</span>
            </button>
          </div>
        </div>
      )}

      {codeModalOpen && (
        <div className="modal-overlay" onClick={() => setCodeModalOpen(false)}>
          <div className="keypad-modal" onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: '0.75rem', color: 'var(--accent)', letterSpacing: '3px', marginBottom: '6px' }}>
              ТЕРМИНАЛ БЛОКИРОВКИ ШЛЮЗА // СЕКТОР 08
            </div>
            <h2 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 'normal', letterSpacing: '2px', marginBottom: '10px' }}>
              ВВЕДИТЕ ТРЁХЗНАЧНЫЙ КОД
            </h2>
            <p style={{ fontSize: '0.84rem', color: '#d8d2b8', lineHeight: '1.5', background: 'rgba(181,166,107,0.1)', border: '1px dashed var(--accent)', padding: '9px 12px' }}>
              «Проверьте данные в документах. Один из них может быть подделкой».
            </p>

            <div style={{ marginTop: '14px', background: '#0e0e0b', border: '1px solid #2e2c22', padding: '12px' }}>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                ВЫПИСАННЫЕ УЛИКИ ИЗ БЛОКНОТА (Нажмите, чтобы подставить в слот #{activeSlotIdx + 1}):
              </div>
              {extractedClues.length === 0 ? (
                <div style={{ fontSize: '0.76rem', color: '#777', marginBottom: '8px' }}>
                  Вы ещё не выписали числительные из текстов документов (или введите код вручную ниже).
                </div>
              ) : (
                <div className="clue-chips-wrap" style={{ justifyContent: 'center', marginBottom: '10px' }}>
                  {extractedClues.map(ck => (
                    <button key={ck} type="button" className={`clue-chip ${CLUE_TOKENS[ck].isTrap ? 'trap-chip' : ''}`} onClick={() => applyClueToDecoder(ck)}>
                      {CLUE_TOKENS[ck].label}
                    </button>
                  ))}
                </div>
              )}

              <div className="pin-slots-row">
                {[0, 1, 2].map(idx => (
                  <div key={idx} className={`pin-slot-box ${activeSlotIdx === idx ? 'active-slot' : ''}`} onClick={() => setActiveSlotIdx(idx)}>
                    <span className="pin-slot-index">#{idx + 1}</span>
                    <span>{codeInput[idx] || '·'}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '12px', flexWrap: 'wrap' }}>
              {['doc1', 'doc2', 'doc3'].map((k, idx) => (
                <button key={k} type="button" className="btn" style={{ fontSize: '0.74rem', padding: '5px 10px' }} onClick={() => openDocumentReader(SECRET_DOCS_META[k])}>
                  Читать Док #{idx + 1}
                </button>
              ))}
            </div>

            <form onSubmit={handleCodeSubmit}>
              <input
                type="text"
                maxLength={3}
                value={codeInput}
                onChange={e => {
                  setCodeError('');
                  const val = e.target.value.replace(/[^0-9]/g, '');
                  setCodeInput(val);
                  setPinSlots([val[0] || '', val[1] || '', val[2] || '']);
                }}
                placeholder="---"
                className="code-input-field"
                autoFocus
              />
              <div className="code-error-msg">{codeError}</div>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '8px' }}>
                <button type="submit" className="btn-strict">[ Подтвердить код ]</button>
                <button type="button" className="btn" onClick={() => setCodeModalOpen(false)}>Отмена</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {screen === 'doors' && (
        <div className="modal-overlay">
          <div className="doors-modal">
            <div style={{ fontSize: '0.78rem', color: '#8cd460', letterSpacing: '3px', marginBottom: '8px' }}>
              КОД 481 ПРИНЯТ // ЗАЩИТА СМОТРИТЕЛЯ ОБОЙДЕНА
            </div>
            <h2 style={{ color: '#fff', fontSize: '1.85rem', letterSpacing: '2px', marginBottom: '14px', fontWeight: 'normal' }}>
              РАЗВИЛКА ЗА ПРАЗДНИЧНЫМ СТОЛОМ
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#d8d6c8', lineHeight: '1.65', maxWidth: '700px', margin: '0 auto' }}>
              За вами следили с самого начала. Б.И.Г. не допустит утечки. Вы стоите перед выбором, который вам навязали. Зеленая дверь — ловушка, красная — выход. Но помните: Б.И.Г. никогда не отпускает своих свидетелей.
            </p>
            <div className="doors-container">
              <div className="door-card left-door" onClick={handleLeftGreenDoorTrap}>
                <div style={{ fontSize: '2.3rem' }}>🚪🟢</div>
                <h3 style={{ color: '#c8d6b8', letterSpacing: '1px' }}>ЗЕЛЁНАЯ ДВЕРЬ: «EXIT»</h3>
                <p style={{ fontSize: '0.84rem', color: '#a8a698', lineHeight: '1.5' }}>
                  Спокойный зелёный плафон эвакуации и искусственный запах свежего дождя из вентилятора Б.И.Г.
                </p>
                <span className="btn-strict" style={{ marginTop: 'auto' }}>[ Выбрать зелёную дверь ]</span>
              </div>
              <div className="door-card right-door" onClick={handleRightRedDoorEscape}>
                <div style={{ fontSize: '2.3rem' }}>🚪🔴</div>
                <h3 style={{ color: '#ff5d73', letterSpacing: '1px' }}>КРАСНАЯ ДВЕРЬ: «ШЛЮЗ №1»</h3>
                <p style={{ fontSize: '0.84rem', color: '#a8a698', lineHeight: '1.5' }}>
                  Тяжёлая техническая гермодверь, идущая первой в протоколе эвакуации Б.И.Г.
                </p>
                <span className="btn-strict" style={{ marginTop: 'auto' }}>[ Выбрать красную дверь ]</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {screen === 'trap' && (
        <main
          className="trap-phase-screen"
          style={{
            backgroundColor: trapPhase === 1 ? '#122416' : '#2b090c',
            color: trapPhase === 1 ? '#d4f5dd' : '#ffb3bd'
          }}
        >
          {trapPhase === 1 ? (
            <div style={{ maxWidth: '620px' }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 'normal', marginBottom: '12px' }}>
                Вы шагнули под зелёный плафон «EXIT»...
              </h2>
              <p style={{ fontSize: '0.95rem' }}>Но запах дождя оказался синтетическим аэрозолем Б.И.Г.</p>
            </div>
          ) : (
            <div style={{ maxWidth: '640px' }}>
              <h1 style={{ fontSize: '2.3rem', letterSpacing: '4px', marginBottom: '12px', fontWeight: 'normal' }}>
                ГЕРМОДВЕРЬ ЗАХЛОПНУЛАСЬ
              </h1>
              <p style={{ fontSize: '1rem' }}>Впереди — лишь бесконечный замкнутый коридор...</p>
            </div>
          )}
        </main>
      )}

      {screen === 'ending' && endingData && (
        <main style={{ minHeight: 'calc(100vh - 56px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '18px', textAlign: 'center', padding: '28px', position: 'relative', zIndex: 5 }}>
          <div style={{ fontSize: '0.85rem', color: endingData.isGoodEnding ? '#8cd460' : endingData.color, letterSpacing: '4px' }}>
            {endingData.code}
          </div>
          <h1 style={{ color: endingData.isGoodEnding ? '#8cd460' : '#f2f0e4', fontSize: '2.4rem', letterSpacing: '3px', fontWeight: 'normal', maxWidth: '780px' }}>
            «{endingData.title}»
          </h1>
          <div style={{ fontSize: '0.85rem', color: 'var(--accent)', letterSpacing: '2px' }}>
            ШТАМП ЗАНЕСЁН В ДОСЬЕ ({unlockedEndings.length}/7) // ДОКУМЕНТОВ СОБРАНО: {inventoryDocs.length}/{docSlotKeys.length}
          </div>
          <p className="selectable-text" style={{ color: 'var(--text-main)', maxWidth: '660px', lineHeight: '1.7', fontSize: '0.98rem' }}>
            {endingData.summary}
          </p>
          <div style={{ display: 'flex', gap: '14px', marginTop: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button className="btn-strict" onClick={() => setDossierModalOpen(true)}>
              [ Открыть Досье концовок ({unlockedEndings.length}/7) ]
            </button>
            <button className="btn-strict" onClick={() => resetProgress(true)}>
              [ Начать заново ]
            </button>
            <button className="btn-strict" onClick={() => resetProgress(false)}>
              [ Главное меню ]
            </button>
          </div>
        </main>
      )}

      {dossierModalOpen && (
        <div className="modal-overlay" onClick={() => setDossierModalOpen(false)}>
          <div className="doc-reader-modal" style={{ maxWidth: '840px' }} onClick={e => e.stopPropagation()}>
            <div className="doc-stamp">АРХИВ Б.И.Г. // ЛИЧНОЕ ДЕЛО ИСПЫТУЕМОГО</div>
            <h2 style={{ color: 'var(--accent)', letterSpacing: '2px', fontWeight: 'normal', marginBottom: '6px' }}>
              ДОСЬЕ СУБЪЕКТА: ОТКРЫТЫЕ ФИНАЛЫ ({unlockedEndings.length} ИЗ 7)
            </h2>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
              Штампы концовок сохраняются между экспедициями. Откройте все 7 исходов, чтобы расшифровать послание Основателя.
            </p>

            <div className="dossier-grid">
              {ENDINGS_CATALOG.map((item) => {
                const isUnlocked = unlockedEndings.includes(item.id);
                return (
                  <div key={item.id} className={`dossier-card ${isUnlocked ? 'unlocked' : ''}`}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <strong style={{ fontSize: '0.78rem', color: isUnlocked ? '#f2e8b6' : '#666' }}>{item.code}</strong>
                      {isUnlocked && <span className="dossier-stamp">ШТАМП ПОЛУЧЕН ✓</span>}
                    </div>
                    <div style={{ fontSize: '0.98rem', color: isUnlocked ? '#fff' : '#555' }}>
                      {isUnlocked ? `«${item.title}»` : 'Засекреченный исход'}
                    </div>
                    <p className="selectable-text" style={{ fontSize: '0.76rem', color: isUnlocked ? '#c2c0b2' : '#777', lineHeight: '1.45' }}>
                      {isUnlocked ? item.summary : `Условие открытия: ${item.hint}`}
                    </p>
                  </div>
                );
              })}
            </div>

            {unlockedEndings.length === 7 && (
              <div className="founder-secret-box">
                <div style={{ fontSize: '0.76rem', color: '#8cd460', letterSpacing: '2px', marginBottom: '6px' }}>
                  // ДОСТУП УРОВНЯ ОМЕГА РАЗБЛОКИРОВАН (7/7 КОНЦОВОК) //
                </div>
                <h3 style={{ color: '#fff', fontWeight: 'normal', marginBottom: '8px' }}>
                  Секретное письмо Основателя симуляции «44.1»
                </h3>
                <p className="selectable-text" style={{ fontSize: '0.86rem', color: '#d8f0c8', lineHeight: '1.6' }}>
                  «Поздравляю, детектив. Вы прошли через все семь сценариев, заложенных Большой Исследовательской Группой, взломали "The End", побывали в Ядре и даже увидели биореактор Сектора 13. Теперь в этом архиве для вас не осталось тайн — терминал 44.1 полностью подчиняется вам».
                </p>
              </div>
            )}

            <div style={{ marginTop: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Нажмите [ESC] для закрытия</span>
              <button className="btn" onClick={() => setDossierModalOpen(false)}>Закрыть досье</button>
            </div>
          </div>
        </div>
      )}

      {diaryModalOpen && (
        <div className="modal-overlay" onClick={() => setDiaryModalOpen(false)}>
          <div className="doc-reader-modal" style={{ maxWidth: '760px' }} onClick={e => e.stopPropagation()}>
            <h2 style={{ color: 'var(--accent)', letterSpacing: '2px', fontWeight: 'normal', marginBottom: '6px' }}>
              ЖУРНАЛ РАССЛЕДОВАНИЯ
            </h2>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Хроника ваших находок и зацепок в секторах Б.И.Г.
            </p>
            <div style={{ maxHeight: '55vh', overflowY: 'auto', paddingRight: '6px' }}>
              {diaryEntries.map((entry) => (
                <div key={entry.id} className="diary-entry">
                  <div className="diary-meta">// {entry.title}</div>
                  <div className="diary-text selectable-text">{entry.text}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Нажмите [ESC] для закрытия</span>
              <button className="btn" onClick={() => setDiaryModalOpen(false)}>Закрыть журнал</button>
            </div>
          </div>
        </div>
      )}

      {readingDoc && (
        <div className="modal-overlay" style={{ zIndex: 9800 }} onClick={() => setReadingDoc(null)}>
          <div className="doc-reader-modal" onClick={e => e.stopPropagation()}>
            <div className="doc-stamp">{readingDoc.stamp}</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--accent)', letterSpacing: '2px' }}>
              {readingDoc.code} // {readingDoc.author}
            </div>
            <h2 style={{ color: '#fff', fontSize: '1.4rem', marginTop: '6px', fontWeight: 'normal' }}>{readingDoc.title}</h2>
            <div className="doc-paper selectable-text">{renderInteractiveDocContent(readingDoc.id)}</div>
            <div className="doc-cipher-highlight selectable-text">
              <strong>Выделенная строка:</strong><br />{readingDoc.cipherFragment}
            </div>
            <div style={{ marginTop: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '0.76rem', color: '#8cd460' }}>💡 {readingDoc.note}</span>
              <button className="btn" onClick={() => setReadingDoc(null)}>Закрыть [ESC]</button>
            </div>
          </div>
        </div>
      )}

      {inventoryModalOpen && (
        <div className="modal-overlay" onClick={() => setInventoryModalOpen(false)}>
          <div className="doc-reader-modal" style={{ maxWidth: '760px' }} onClick={e => e.stopPropagation()}>
            <h2 style={{ color: 'var(--accent)', letterSpacing: '2px', fontWeight: 'normal', marginBottom: '8px' }}>
              ДОКУМЕНТЫ Б.И.Г. ({inventoryDocs.length} ИЗ 4)
            </h2>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Откройте любой найденный документ и кликните по выделенным числительным в тексте, чтобы выписать их в Блокнот дешифровки.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['doc1', 'doc2', 'doc3', 'doc4'].map((key, idx) => {
                const isFound = inventoryDocs.includes(key);
                const doc = SECRET_DOCS_META[key];
                return (
                  <div
                    key={key}
                    className={`doc-slot ${isFound ? 'found' : ''}`}
                    style={{ padding: '14px 16px' }}
                    onClick={() => { if (isFound) openDocumentReader(doc); }}
                  >
                    <div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 'bold' }}>
                        {isFound ? `${doc.code}: ${doc.title}` : `Засекреченная запись Б.И.Г. #0${idx + 1}`}
                      </div>
                      <div style={{ fontSize: '0.8rem', opacity: 0.8, marginTop: '4px' }}>
                        {isFound ? doc.cipherFragment : 'Местонахождение неизвестно. Осматривайте предметы на сценах секторов.'}
                      </div>
                    </div>
                    <span className="btn" style={{ pointerEvents: 'none', opacity: isFound ? 1 : 0.4 }}>
                      {isFound ? 'Прочитать' : 'Пусто'}
                    </span>
                  </div>
                );
              })}
            </div>
            <div style={{ marginTop: '20px', textAlign: 'right' }}>
              <button className="btn" onClick={() => setInventoryModalOpen(false)}>Закрыть инвентарь</button>
            </div>
          </div>
        </div>
      )}

      {screen === 'settings' && (
        <main style={{ maxWidth: '560px', margin: '50px auto', background: 'var(--bg-panel)', padding: '32px', border: '1px solid var(--border)', position: 'relative', zIndex: 5 }}>
          <h2 style={{ marginBottom: '20px', fontWeight: 'normal', letterSpacing: '2px' }}>НАСТРОЙКИ ТЕРМИНАЛА</h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid #24241e' }}>
            <label>Яркость экрана ({Math.round(brightness * 100)}%)</label>
            <input type="range" min="0.5" max="1.4" step="0.05" value={brightness} onChange={e => setBrightness(parseFloat(e.target.value))} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid #24241e' }}>
            <label>Пространственный стереозвук и суб-дрон</label>
            <button className="btn" onClick={toggleSound}>{soundEnabled ? 'Включён' : 'Выключен'}</button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid #24241e' }}>
            <label>Субтитры событий</label>
            <button className="btn" onClick={() => setSubtitlesEnabled(!subtitlesEnabled)}>{subtitlesEnabled ? 'Включены' : 'Выключены'}</button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid #24241e' }}>
            <label>ЭЛТ-развёртка и шум</label>
            <button className="btn" onClick={() => setReducedEffects(!reducedEffects)}>{reducedEffects ? 'Отключены' : 'Активны'}</button>
          </div>
          <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'space-between', gap: '10px', flexWrap: 'wrap' }}>
            <button className="btn" onClick={() => resetProgress(false)}>Сбросить текущую сессию</button>
            <button
              className="btn"
              style={{ borderColor: '#5e2a2e', color: '#e6b8bc' }}
              onClick={() => {
                safeStorage.remove('backrooms_endings');
                setUnlockedEndings([]);
                triggerSubtitle('[Штампы в Досье субъекта очищены]');
              }}
            >
              Очистить Досье (0/7)
            </button>
            <button className="btn" onClick={() => setScreen('main')}>Назад в меню</button>
          </div>
        </main>
      )}

      {subtitleText && <div className="subtitle-toast">{subtitleText}</div>}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
