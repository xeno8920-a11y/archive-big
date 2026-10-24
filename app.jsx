const { useState, useEffect, useRef } = React;

const { safeStorage, sound, ENDINGS_CATALOG, SECRET_DOCS_META, CLUE_TOKENS, LEVELS } = window;

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
