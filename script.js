"use strict";

const $ = id => document.getElementById(id);
const STORAGE_KEY = "hc2_v52"; 
const BACKUP_KEY = "hc2_v52_backup";
const ADMIN_PASSWORD = "nuxes5a96"; 
const CAPTCHA_INTERVAL = 600000;

setTimeout(() => {
    const splash = document.getElementById('splashScreen');
    if (splash) {
        splash.classList.add('hidden');
        setTimeout(() => splash.remove(), 500);
    }
}, 1000);

// --- ХЭЛЛОУИН ЭФФЕКТЫ ---
const leafCanvas = document.getElementById("leafCanvas");
const ctx = leafCanvas.getContext("2d");
let W, H;
let particles = [];
const particleEmojis = ["🦇", "🎃", "👻", "🕸️"];

function initLeaves() {
    W = leafCanvas.width = window.innerWidth;
    H = leafCanvas.height = window.innerHeight;
    particles = [];
    for (let i = 0; i < 40; i++) {
        particles.push({
            x: Math.random() * W,
            y: Math.random() * H,
            size: Math.random() * 15 + 10,
            speedY: Math.random() * 1.5 + 0.3,
            speedX: Math.random() * 1 - 0.5,
            rot: Math.random() * Math.PI * 2,
            rotSpeed: Math.random() * 0.05 - 0.025,
            emoji: particleEmojis[Math.floor(Math.random() * particleEmojis.length)],
            swing: Math.random() * Math.PI * 2
        });
    }
}

function drawLeaves() {
    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.font = p.size + "px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(p.emoji, 0, 0);
        ctx.restore();
    }
    updateLeaves();
}

function updateLeaves() {
    for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.speedY;
        p.x += Math.sin(p.swing) * 0.8 + p.speedX;
        p.rot += p.rotSpeed;
        p.swing += 0.02;

        if (p.y > H + 30) {
            p.y = -30;
            p.x = Math.random() * W;
        }
        if (p.x > W + 30) p.x = -30;
        if (p.x < -30) p.x = W + 30;
    }
}

window.addEventListener("resize", initLeaves);
initLeaves();
setInterval(drawLeaves, 30);

// --- ДАННЫЕ ---
const NEWS_DATA = [
    {
        title: "🎃 ХЭЛЛОУИНСКИЙ ИВЕНТ! 🦇",
        text: "Бу! Испугались? Мы подготовили для вас огромное обновление!\n\nЧто нового:\n• 🎃 Атмосфера: на фоне теперь летают призраки, тыквы и летучие мыши.\n• 🎡 Колесо Фортуны: крутите раз в 4 часа и получайте H, D и бусты!\n• 📜 Ежедневные Квесты: выполняйте задания каждый день и забирайте алмазы.\n\nЗаходите каждый день, чтобы не пропустить награды!",
        date: "26.10.2026",
        active: true
    },
    {
        title: "🎉 С 1 МЕСЯЦЕМ! РАЗДАЧА!",
        text: "Ура, товарищи! Нашей игре ровно 1 месяц!\n\nПо этому поводу мы дарим всем подарок:\n1QA H (Квадриллион монет) и 500 D (Алмазов)!\n\nПромокод: #HAMSONEMES24\n\n⚠️ Действует до 31.10.2026",
        date: "24.10.2026",
        active: false,
        promo: "#HAMSONEMES24"
    },
    {
        title: "🙏 Расшифровка чисел!",
        text: "Мы добавили кнопку «🙏 Пояснение»!\n\nТеперь вы можете посмотреть, что означает каждое сокращение (K, M, B, T и другие) в ваших числах. Кнопка находится в самом низу экрана.\n\nБольше не нужно гадать, что такое NOD или VIG. Просто нажмите и посмотрите!",
        date: "20.10.2026",
        active: false
    }
];

const stages = [
    {e:"🐹",n:"NOVICE",m:"#00ff88",g:"rgba(0,255,136,.45)",b1:"#04100a",b2:"#0d291b",r:1},
    {e:"😎",n:"ROOKIE",m:"#00d9ff",g:"rgba(0,217,255,.45)",b1:"#041019",b2:"#0d2b3a",r:100},
    {e:"🕶️",n:"VETERAN",m:"#a855f7",g:"rgba(168,85,247,.45)",b1:"#10051a",b2:"#2a103c",r:1000},
    {e:"🤵",n:"ELITE",m:"#ffd700",g:"rgba(255,215,0,.45)",b1:"#171105",b2:"#3a2c08",r:5000},
    {e:"👑",n:"MASTER",m:"#ff5cff",g:"rgba(255,92,255,.45)",b1:"#1a051a",b2:"#3b103b",r:20000},
    {e:"🦾",n:"LEGEND",m:"#ff4d4d",g:"rgba(255,77,77,.45)",b1:"#190505",b2:"#3b0e0e",r:100000},
    {e:"👽",n:"MYTHIC",m:"#7cff00",g:"rgba(124,255,0,.45)",b1:"#0b1703",b2:"#1d3b07",r:500000},
    {e:"🤖",n:"OVERLORD",m:"#00aaff",g:"rgba(0,170,255,.5)",b1:"#020c18",b2:"#08294a",r:1000000},
    {e:"🥇",n:"GOLD",m:"#ffcc00",g:"rgba(255,204,0,.5)",b1:"#191305",b2:"#3a2c08",r:5000000},
    {e:"🛡️",n:"TITAN",m:"#7f8fa6",g:"rgba(127,143,166,.5)",b1:"#0f1216",b2:"#232a33",r:10000000},
    {e:"🐉",n:"DRAGON",m:"#ff3b3b",g:"rgba(255,59,59,.5)",b1:"#1a0505",b2:"#3b0e0e",r:50000000},
    {e:"👾",n:"BOG",m:"#8a2be2",g:"rgba(138,43,226,.5)",b1:"#10051a",b2:"#2a103c",r:100000000},
    {e:"🦸",n:"HERO",m:"#00bfff",g:"rgba(0,191,255,.5)",b1:"#04101a",b2:"#0d2b3a",r:500000000},
    {e:"🔥",n:"PHOENIX",m:"#ff6a00",g:"rgba(255,106,0,.5)",b1:"#1a0a04",b2:"#3a1a0d",r:1000000000},
    {e:"💀",n:"REAPER",m:"#9e9e9e",g:"rgba(158,158,158,.5)",b1:"#0d0d0d",b2:"#1f1f1f",r:5000000000},
    {e:"🌌",n:"COSMIC",m:"#b266ff",g:"rgba(178,102,255,.5)",b1:"#10051a",b2:"#2a103c",r:10000000000},
    {e:"⚡",n:"ZEUS",m:"#ffee00",g:"rgba(255,238,0,.5)",b1:"#191a04",b2:"#3a3a0d",r:50000000000},
    {e:"👑",n:"EMPEROR",m:"#ffd700",g:"rgba(255,215,0,.5)",b1:"#191305",b2:"#3a2c08",r:100000000000},
    {e:"🐲",n:"LEVIATHAN",m:"#00ffcc",g:"rgba(0,255,204,.5)",b1:"#041a17",b2:"#0d3a33",r:500000000000},
    {e:"💠",n:"INFINITY",m:"#ffffff",g:"rgba(255,255,255,.5)",b1:"#0a0a0a",b2:"#1f1f1f",r:1000000000000},
    {e:"🌟",n:"STARLORD",m:"#ffe066",g:"rgba(255,224,102,.5)",b1:"#1a1504",b2:"#3b3208",r:5000000000000},
    {e:"🌀",n:"VORTEX",m:"#00e5ff",g:"rgba(0,229,255,.5)",b1:"#041a1a",b2:"#0d3a3a",r:10000000000000},
    {e:"💫",n:"NEBULA",m:"#d500f9",g:"rgba(213,0,249,.5)",b1:"#10041a",b2:"#2a0d3a",r:50000000000000},
    {e:"🪐",n:"SATURN",m:"#ffb300",g:"rgba(255,179,0,.5)",b1:"#1a1004",b2:"#3a2708",r:100000000000000},
    {e:"🌠",n:"SUPERNOVA",m:"#ff1744",g:"rgba(255,23,68,.5)",b1:"#1a0406",b2:"#3b0d13",r:500000000000000},
    {e:"🧬",n:"GENESIS",m:"#00e676",g:"rgba(0,230,118,.5)",b1:"#041a0d",b2:"#0d3a20",r:1000000000000000},
    {e:"🔮",n:"ORACLE",m:"#7c4dff",g:"rgba(124,77,255,.5)",b1:"#08041a",b2:"#1a0d3a",r:5000000000000000},
    {e:"⏳",n:"CHRONOS",m:"#ff6f00",g:"rgba(255,111,0,.5)",b1:"#1a0e04",b2:"#3a200d",r:10000000000000000},
    {e:"🌟",n:"ASCENDED",m:"#ffffff",g:"rgba(255,255,255,.7)",b1:"#050505",b2:"#151515",r:50000000000000000},
    {e:"🌌",n:"OMEGA",m:"#ff00ff",g:"rgba(255,0,255,.7)",b1:"#0a000a",b2:"#200020",r:100000000000000000},
    {e:"⚔️",n:"TITAN LORD",m:"#7f8fa6",g:"rgba(127,143,166,.7)",b1:"#0f1216",b2:"#2a3444",r:500000000000000000},
    {e:"👻",n:"VOID WALKER",m:"#9c27b0",g:"rgba(156,39,176,.7)",b1:"#100518",b2:"#2a0d3c",r:1000000000000000000},
    {e:"🌠",n:"GALAXY",m:"#3f51b5",g:"rgba(63,81,181,.7)",b1:"#050b1a",b2:"#0d1a3a",r:5000000000000000000},
    {e:"💫",n:"QUASAR",m:"#00bcd4",g:"rgba(0,188,212,.7)",b1:"#041a1c",b2:"#0d3a3c",r:10000000000000000000},
    {e:"🌟",n:"PULSAR",m:"#e91e63",g:"rgba(233,30,99,.7)",b1:"#1a0410",b2:"#3a0d24",r:50000000000000000000},
    {e:"⚫",n:"SINGULARITY",m:"#888",g:"rgba(150,150,255,.7)",b1:"#000000",b2:"#0a0a15",r:100000000000000000000},
    {e:"♾️",n:"ETERNAL",m:"#00e5ff",g:"rgba(0,229,255,.8)",b1:"#041a1a",b2:"#0d3a3a",r:500000000000000000000},
    {e:"🙏",n:"DIVINE",m:"#ffd700",g:"rgba(255,215,0,.8)",b1:"#1a1405",b2:"#3a2c08",r:1000000000000000000000},
    {e:"✨",n:"CELESTIAL",m:"#ffffff",g:"rgba(255,255,255,.9)",b1:"#0a0a0a",b2:"#1f1f1f",r:5000000000000000000000},
    {e:"🔱",n:"PRIMORDIAL",m:"#00ffcc",g:"rgba(0,255,204,.8)",b1:"#041a17",b2:"#0d3a33",r:10000000000000000000000},
    {e:"👁️",n:"ARCHON",m:"#9c27b0",g:"rgba(156,39,176,.8)",b1:"#100518",b2:"#2a0d3c",r:50000000000000000000000},
    {e:"👑",n:"SOVEREIGN",m:"#ffd700",g:"rgba(255,215,0,.9)",b1:"#1a1405",b2:"#3a2c08",r:100000000000000000000000},
    {e:"🦁",n:"MONARCH",m:"#ff6a00",g:"rgba(255,106,0,.9)",b1:"#1a0a04",b2:"#3a1a0d",r:500000000000000000000000},
    {e:"⚡",n:"OVERGOD",m:"#ff1744",g:"rgba(255,23,68,.9)",b1:"#1a0406",b2:"#3b0d13",r:1000000000000000000000000},
    {e:"♾️",n:"INFINITE",m:"#00e676",g:"rgba(0,230,118,.9)",b1:"#041a0d",b2:"#0d3a20",r:5000000000000000000000000},
    {e:"🔮",n:"ABSOLUTE",m:"#7c4dff",g:"rgba(124,77,255,.9)",b1:"#08041a",b2:"#1a0d3a",r:10000000000000000000000000},
    {e:"🌟",n:"TRANSCENDENT",m:"#ffe066",g:"rgba(255,224,102,.9)",b1:"#1a1504",b2:"#3b3208",r:50000000000000000000000000},
    {e:"👑",n:"SUPREME",m:"#ff00ff",g:"rgba(255,0,255,.9)",b1:"#0a000a",b2:"#200020",r:100000000000000000000000000},
    {e:"⚡",n:"ALMIGHTY",m:"#ffffff",g:"rgba(255,255,255,.9)",b1:"#050505",b2:"#151515",r:500000000000000000000000000},
    {e:"👁️",n:"ZENITH",m:"#ffcc00",g:"rgba(255,204,0,.9)",b1:"#191305",b2:"#3a2c08",r:999999999999999999}
];

const THEMES = {
    default: {e:"🐹",key:"Стандарт",p:0,m:"#00ff88",g:"rgba(0,255,136,.45)",b1:"#04100a",b2:"#0d291b"},
    gold: {e:"🪙",key:"Золото",p:200000000000,m:"#ffd700",g:"rgba(255,215,0,.6)",b1:"#1a1405",b2:"#3b2e08"},
    diamond: {e:"💎",key:"Алмаз",p:500000000000,m:"#00e5ff",g:"rgba(0,229,255,.6)",b1:"#041a1a",b2:"#0d3a3a"},
    fire: {e:"🐦‍🔥",key:"Огонь",p:1000000000000,m:"#ff6a00",g:"rgba(255,106,0,.6)",b1:"#1a0a04",b2:"#3a1a0d"},
    electric: {e:"⚡",key:"Электро",p:2000000000000,m:"#ffee00",g:"rgba(255,238,0,.7)",b1:"#1a1a04",b2:"#3a3a0d"}
};

const shopData = {
    boosts: [
        {id:"b1",n:"⚡ +10%",d:"×1.1 / 5 мин",p:50000,f:1100,du:300},
        {id:"b2",n:"🔥 +50%",d:"×1.5 / 5 мин",p:200000,f:1500,du:300},
        {id:"b3",n:"💥 ×2",d:"×2 / 1 мин",p:1000000,f:2000,du:60},
        {id:"b4",n:"🚀 ×5",d:"×5 / 30 сек",p:10000000,f:5000,du:30}
    ],
    skins: [
        {id:"sk_hat",n:"🎩 Шляпа",d:"Скин",p:100000},
        {id:"sk_glasses",n:"🕶️ Очки",d:"Скин",p:200000},
        {id:"sk_crown",n:"👑 Корона",d:"Скин",p:500000},
        {id:"sk_cape",n:"🦸 Плащ",d:"Скин",p:1000000}
    ],
    upgrades: [{id:"up_ac",n:"💰 Автоклик",d:"+1 монета/сек",p:5000000,up:"ac"}],
    exclusive: [
        {id:"et_gold",n:"🪙 Тема: Золото",d:"Хомяк: 🪙",p:200000000000,t:"theme",th:"gold"},
        {id:"et_dia",n:"💎 Тема: Алмаз",d:"Хомяк: 💎",p:500000000000,t:"theme",th:"diamond"},
        {id:"et_fire",n:"🐦‍🔥 Тема: Огонь",d:"Хомяк: 🐦‍🔥",p:1000000000000,t:"theme",th:"fire"},
        {id:"et_elec",n:"⚡ Тема: Электро",d:"Хомяк: ⚡",p:2000000000000,t:"theme",th:"electric"},
        {id:"ex100",n:"💥 ×100 буст",d:"1 час",p:100000000000,f:100000,du:3600,t:"boost"},
        {id:"ex1000",n:"🚀 ×1000 буст",d:"30 мин",p:500000000000,f:1000000,du:1800,t:"boost"},
        {id:"ex10k",n:"☄️ ×10000 буст",d:"10 мин",p:1000000000000,f:10000000,du:600,t:"boost"},
        {id:"exmult",n:"🎯 Множитель +100",d:"Навсегда",p:500000000000,t:"mult"},
        {id:"exac",n:"🤖 Автоклик ×10",d:"+10 монет/сек",p:300000000000,t:"ac10"},
        {id:"exvip",n:"👑 VIP",d:"Золотой ник",p:100000000000,t:"vip"}
    ]
};

const donateData = [
    {id:"db10",n:"🎁 Бонус ×10",d:"+10",p:1,t:"bonus",v:10},
    {id:"db50",n:"🎁 Бонус ×50",d:"+50",p:5,t:"bonus",v:50},
    {id:"db250",n:"🎁 Бонус ×250",d:"+250",p:25,t:"bonus",v:250},
    {id:"db1k",n:"🎁 Бонус ×1000",d:"+1000",p:100,t:"bonus",v:1000},
    {id:"db10k",n:"🎁 Бонус ×10000",d:"+10000",p:1000,t:"bonus",v:10000},
    {id:"db1m",n:"🎁 Бонус ×1M",d:"+1M",p:100000,t:"bonus",v:1000000},
    {id:"da100",n:"🤖 Автоклик +100",d:"+100/сек",p:50,t:"ac",v:100},
    {id:"da1k",n:"🤖 Автоклик +1000",d:"+1000/сек",p:500,t:"ac",v:1000},
    {id:"dbx1000",n:"🚀 Буст ×1000",d:"1 час",p:100,t:"boost",f:1000000,du:3600},
    {id:"dvip",n:"👑 VIP GOLD",d:"Золотой ник",p:500,t:"vip"},
    {id:"dh1t",n:"💰 1T H",d:"Мгновенно",p:1,t:"give_h",v:1000000000000}
];

const CASE_NAMES = ["Новичок","Ученик","Стажер","Боец","Ветеран","Элита","Мастер","Легенда","Миф","Оверлорд","Золотой","Титан","Драконий","Бог","Герой","Феникс","Жнец","Космический","Зевс","Император","Левиафан","Бесконечность","Звездный Лорд","Вихрь","Туманность","Сатурн","Сверхновая","Генезис","Оракул","Хронос","Вознесенный","Омега","Владыка Титанов","Странник Пустоты","Галактика","Квазар","Пульсар","Сингулярность","Вечный","Божественный","Небесный","Первородный","Архонт","Суверен","Монарх","Сверхбог","Бесконечный","Абсолют","Трансцендент","Верховный","Всемогущий","Зенит","Кровавый","Ледяной","Огненный","Водный","Земляной","Воздушный","Темный","Светлый","Токсичный","Радиоактивный","Кибернетический","Плазменный","Квантовый","Гравитационный","Электромагнитный","Ядерный","Аннигиляция","Созидание","Хаос","Порядок","Судьба","Время","Пространство","Материя","Антиматерия","Энергия","Жизнь","Смерть","Рай","Ад","Чистилище","Вальхалла","Олимп","Асгард","Тартар","Элизиум","Нифльхейм","Муспельхейм","Королевский","Императорский","Божественный","Дьявольский","Ангельский","Демонический","Древний","Рунический","Магический","Проклятый"];
const CASE_EMOJIS = ["🐹","😎","🕶️","🤵","👑","🦾","👽","🤖","🥇","🛡️","🐉","👾","🦸","🔥","💀","🌌","⚡","👑","🐲","💠","🌟","🌀","💫","🪐","🌠","🧬","🔮","⏳","🌟","🌌","⚔️","👻","🌠","💫","🌟","⚫","♾️","🙏","✨","🔱","👁️","👑","🦁","⚡","♾️","🔮","🌟","👑","⚡","👁️","🩸","❄️","🔥","💧","🌍","💨","🌑","☀️","☠️","☢️","🤖","⚡","⚛️","🌀","⚡","☢️","💥","✨","🌀","⚖️","🔮","⏳","🌌","🌌","⚛️","💥","⚡","💖","💀","😇","😈","🔥","🛡️","🏰","🏛️","🌳","🕳️","🌈","❄️","🔥","👑","🏆","🙏","😈","😇","👹","🏛️","🔣","✨","💀"];

let CASES = [];
let currentPrice = 50000;
for (let i = 0; i < 100; i++) {
    const minWin = Math.floor(currentPrice * 0.2);
    const maxWin = Math.floor(currentPrice * 3.5);
    CASES.push({ id: i, name: CASE_NAMES[i], emoji: CASE_EMOJIS[i], price: currentPrice, minWin, maxWin });
    currentPrice = Math.floor(currentPrice * 1.5);
}

function fmt(n) {
    if (n < 1000) return Math.floor(n).toString();
    let sfx = "", div = 1;
    if (n >= 1e63) { sfx="VIG"; div=1e63; } else if (n >= 1e60) { sfx="NOV"; div=1e60; }
    else if (n >= 1e57) { sfx="OCT"; div=1e57; } else if (n >= 1e54) { sfx="SPT"; div=1e54; }
    else if (n >= 1e51) { sfx="SXT"; div=1e51; } else if (n >= 1e48) { sfx="QNT"; div=1e48; }
    else if (n >= 1e45) { sfx="QDT"; div=1e45; } else if (n >= 1e42) { sfx="TDT"; div=1e42; }
    else if (n >= 1e39) { sfx="DUD"; div=1e39; } else if (n >= 1e36) { sfx="UND"; div=1e36; }
    else if (n >= 1e33) { sfx="DCD"; div=1e33; } else if (n >= 1e30) { sfx="NOD"; div=1e30; }
    else if (n >= 1e27) { sfx="OCD"; div=1e27; } else if (n >= 1e24) { sfx="SPD"; div=1e24; }
    else if (n >= 1e21) { sfx="SX"; div=1e21; } else if (n >= 1e18) { sfx="QI"; div=1e18; }
    else if (n >= 1e15) { sfx="QA"; div=1e15; } else if (n >= 1e12) { sfx="T"; div=1e12; }
    else if (n >= 1e9) { sfx="B"; div=1e9; } else if (n >= 1e6) { sfx="M"; div=1e6; }
    else { sfx="K"; div=1000; }
    
    const bn = BigInt(Math.floor(n));
    const bdiv = BigInt(Math.floor(div));
    const w = bn / bdiv;
    const r = bn % bdiv;
    const d = (r * 100n) / bdiv;
    
    if (w < 100n && d > 0n) {
        let dec = d.toString().padStart(2, '0').replace(/0+$/, '');
        if (dec === '') dec = '0';
        return w.toString() + "." + dec + sfx;
    }
    return w.toString() + sfx;
}

function parseSum(str) {
    if (!str) return 0;
    str = str.trim().toUpperCase().replace(/\s/g, "").replace(",", ".");
    const sfx = {"SX":1e21,"QI":1e18,"QA":1e15,"T":1e12,"B":1e9,"M":1e6,"K":1e3};
    let mult = 1, num = str;
    for (const s in sfx) { if (str.endsWith(s)) { mult = sfx[s]; num = str.slice(0, -s.length); break; } }
    num = num.replace(/[^0-9.]/g, "");
    if (!num) return 0;
    const res = parseFloat(num) * mult;
    return isNaN(res) ? 0 : Math.floor(res);
}

let saved = {};
try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) saved = JSON.parse(raw);
    else {
        const backup = localStorage.getItem(BACKUP_KEY);
        if (backup) saved = JSON.parse(backup);
    }
} catch(e) {
    try {
        const backup = localStorage.getItem(BACKUP_KEY);
        if (backup) saved = JSON.parse(backup);
    } catch(e2) {}
}

let score = Number(saved.score || 0);
let diamonds = Number(saved.diamonds || 0);
let diamondBonus = Number(saved.diamondBonus || 0);
let bonusMult = Number(saved.bonusMult || 1000);
let autoClick = Number(saved.autoClick || 0);
let rebirths = Number(saved.rebirths || 0);
let totalClicks = Number(saved.totalClicks || 0);
let totalCases = Number(saved.totalCases || 0);
let biggestWin = Number(saved.biggestWin || 0);
let skins = saved.skins || {};
let theme = saved.theme || "default";
let ownedThemes = saved.ownedThemes || {};
let usedTransferCodes = saved.usedTransferCodes || [];
let exclusiveUnlocked = !!saved.exclusiveUnlocked;
let vip = !!saved.vip;
let unlockedAch = saved.unlockedAch || {};
let activeBoost = { factor: 1000, endTime: 0, name: "" };
let nextCaptchaTime = Number(saved.nextCaptchaTime) || (Date.now() + CAPTCHA_INTERVAL);

let wheelLastSpin = Number(saved.wheelLastSpin || 0);
let questsState = saved.questsState || { date: "", clickProg: 0, caseProg: 0, boostProg: 0, claimed: [false, false, false] };

let totalHoursPlayed = Number(saved.totalHoursPlayed || 0);
let totalSpentH = Number(saved.totalSpentH || 0);
let totalSpentD = Number(saved.totalSpentD || 0);
let sessionStart = Date.now();

function save() {
    if (sessionStart) {
        const diffMs = Date.now() - sessionStart;
        if (diffMs >= 60000) {
            const addedHours = Math.floor(diffMs / 3600000);
            if (addedHours > 0) { totalHoursPlayed += addedHours; sessionStart += addedHours * 3600000; }
        }
    }
    try {
        const data = JSON.stringify({
            score, diamonds, diamondBonus, bonusMult, autoClick, rebirths,
            totalClicks, totalCases, biggestWin, skins, theme, ownedThemes,
            usedTransferCodes, exclusiveUnlocked, vip, unlockedAch, nextCaptchaTime,
            totalHoursPlayed, totalSpentH, totalSpentD, wheelLastSpin, questsState
        });
        localStorage.setItem(STORAGE_KEY, data);
        localStorage.setItem(BACKUP_KEY, data);
    } catch(e) {}
}

setInterval(save, 1000);
window.addEventListener("beforeunload", save);
window.addEventListener("pagehide", save);
window.addEventListener("blur", save);
document.addEventListener("visibilitychange", () => { if (document.hidden) save(); });

const elScore = $("score"), elDia = $("diamondScore"), elRank = $("rank");
const elMult = $("multiplier"), elReb = $("rebirthLine");
const elEmoji = $("hamsterEmoji"), elStage = $("stageName");
const elBoostInd = $("boostIndicator"), elHamster = $("hamsterButton"), elSkin = $("skinOverlay");

let lastScore = "", lastDia = "", lastRank = "", lastMult = "", lastReb = "", lastEmoji = "", lastStage = "", lastSkin = "";

let cRank = 1, cMult = 1, cReb = 0, cStageIdx = 0, cCachedScore = -1, cCachedBonus = -1, cCachedReb = -1, cCachedBoost = -1, cCachedDia = -1;

function updateUI() {
    if (cCachedScore !== score || cCachedBonus !== bonusMult || cCachedReb !== rebirths || cCachedBoost !== activeBoost.factor || cCachedDia !== diamondBonus) {
        cCachedScore = score; cCachedBonus = bonusMult; cCachedReb = rebirths; cCachedBoost = activeBoost.factor; cCachedDia = diamondBonus;
        cRank = Math.floor(score / 1000) + 1;
        cReb = rebirths * 500000000;
        let base = Math.max(1, Math.min(cRank, 999999999999999)) + cReb;
        cMult = Math.floor((base * bonusMult * activeBoost.factor) / 1000000) + diamondBonus;
        if (cMult < 1) cMult = 1;
        
        cStageIdx = 0;
        for (let i = stages.length - 1; i >= 0; i--) {
            if (cRank >= stages[i].r) { cStageIdx = i; break; }
        }
    }
    
    const s = fmt(score);
    if (s !== lastScore) { lastScore = s; elScore.innerHTML = s + '<span class="cur">H</span>'; }
    const d = fmt(diamonds);
    if (d !== lastDia) { lastDia = d; elDia.textContent = d; }
    
    const r = "РАНГ " + fmt(cRank) + " / ♾️";
    if (r !== lastRank) { lastRank = r; elRank.textContent = r; }
    
    const m = "×" + fmt(cMult) + " / 999T";
    if (m !== lastMult) { lastMult = m; elMult.textContent = m; }
    
    const rb = "🔄 ПЕРЕРОЖДЕНИЙ: " + fmt(rebirths) + " (+" + fmt(cReb) + ")";
    if (rb !== lastReb) { lastReb = rb; elReb.textContent = rb; }
    
    const stg = stages[cStageIdx];
    const themeData = theme !== "default" ? THEMES[theme] : stg;
    document.documentElement.style.setProperty("--main", themeData.m);
    document.documentElement.style.setProperty("--glow", themeData.g);
    document.documentElement.style.setProperty("--bg1", themeData.b1);
    document.documentElement.style.setProperty("--bg2", themeData.b2);
    
    const em = themeData.e;
    const st = theme !== "default" ? "★ " + THEMES[theme].key + " ★" : "Стадия: " + stg.n;
    if (em !== lastEmoji) { lastEmoji = em; elEmoji.textContent = em; }
    if (st !== lastStage) { lastStage = st; elStage.textContent = st; }
    
    const skinKey = Object.keys(skins).sort().join(",");
    if (skinKey !== lastSkin) {
        lastSkin = skinKey;
        let html = "";
        if (skins.sk_hat) html += '<div class="skin-item skin-hat">🎩</div>';
        if (skins.sk_glasses) html += '<div class="skin-item skin-glasses">🕶️</div>';
        if (skins.sk_crown) html += '<div class="skin-item skin-crown">👑</div>';
        if (skins.sk_cape) html += '<div class="skin-item skin-cape">🦸</div>';
        elSkin.innerHTML = html;
    }
    
    if (activeBoost.endTime > Date.now()) {
        const left = Math.ceil((activeBoost.endTime - Date.now()) / 1000);
        elBoostInd.textContent = "🔥 " + activeBoost.name + " — " + left + "с";
        elBoostInd.classList.add("active");
    } else {
        if (activeBoost.factor !== 1000) { activeBoost = { factor: 1000, endTime: 0, name: "" }; }
        elBoostInd.classList.remove("active");
    }
}

setInterval(() => {
    if (autoClick > 0) { score += autoClick; updateUI(); }
}, 1000);

let captchaAns = 0, captchaOn = false;
function genCaptcha() {
    const a = Math.floor(Math.random() * 20) + 2;
    const b = Math.floor(Math.random() * 20) + 2;
    const r = Math.random();
    let q, ans;
    if (r < 0.33) { q = a + ' + ' + b; ans = a + b; }
    else if (r < 0.66) { const big = Math.max(a,b), sm = Math.min(a,b); q = big + ' - ' + sm; ans = big - sm; }
    else { q = a + ' × ' + b; ans = a * b; }
    captchaAns = ans;
    $("captchaTask").textContent = q + ' = ?';
}
function showCaptcha() {
    captchaOn = true;
    genCaptcha();
    $("captchaInput").value = "";
    $("captchaResult").className = "promo-result";
    $("captchaModal").classList.add("active");
}
function checkCaptcha() {
    const raw = $("captchaInput").value.trim();
    const res = $("captchaResult");
    if (!raw || parseInt(raw, 10) !== captchaAns) {
        res.className = "promo-result error"; res.textContent = "❌ Неверно!";
        genCaptcha(); $("captchaInput").value = ""; return;
    }
    captchaOn = false;
    $("captchaModal").classList.remove("active");
    showToast("✅ Верно", "success");
    nextCaptchaTime = Date.now() + CAPTCHA_INTERVAL;
    save();
}
$("captchaSubmit").onclick = checkCaptcha;
$("captchaInput").addEventListener("keydown", e => { if (e.key === "Enter") checkCaptcha(); });

setInterval(() => {
    if (captchaOn) return;
    if (Date.now() >= nextCaptchaTime && !document.querySelector(".modal.active")) {
        showCaptcha();
    }
}, 1000);

function handleClick(e) {
    if (captchaOn) return;
    score += cMult;
    totalClicks++;
    
    questsState.clickProg++;
    renderQuests();

    updateUI();
    const p = document.createElement("div");
    p.className = "particle"; p.textContent = "+" + fmt(cMult);
    p.style.left = e.clientX + "px"; p.style.top = e.clientY + "px";
    p.style.setProperty("--x", (Math.random() * 80 - 40) + "px");
    p.style.setProperty("--y", (-50 - Math.random() * 40) + "px");
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 550);
    checkAchievements();
    save();
}
elHamster.addEventListener("pointerdown", handleClick);

let toastT = null;
function showToast(msg, type) {
    const el = $("toast");
    el.textContent = msg; el.className = "toast show" + (type ? " " + type : "");
    clearTimeout(toastT); toastT = setTimeout(() => el.className = "toast", 1500);
}

function checkAchievements() {
    let changed = false;
    for (const a of ACH) {
        if (!unlockedAch[a.id] && a.check()) {
            unlockedAch[a.id] = true;
            a.give();
            showToast("🏆 Достижение: " + a.name + " (" + a.reward + ")", "success");
            changed = true;
        }
    }
    if (changed) { updateUI(); save(); }
}

function renderShop(tab) {
    $("shopBalance").textContent = fmt(score);
    $("shopDiamond").textContent = fmt(diamonds);
    document.querySelectorAll(".shop-tab").forEach(b => b.classList.toggle("active", b.dataset.tab === tab));
    const items = $("shopItems");
    let html = "";
    
    if (tab === "exclusive" && !exclusiveUnlocked) {
        const can = score >= 500000000000;
        items.innerHTML = '<div class="exclusive-header">🔒 500B</div><div class="shop-item exclusive-item"><div class="shop-item-info"><div class="shop-item-name">🎫 Купить билет</div><div class="shop-item-desc">Разовый вход</div></div><div class="shop-item-price">500B</div><button ' + (can ? "" : "disabled") + '>' + (can ? "ОТКРЫТЬ" : "НЕТ") + '</button></div>';
        const btn = items.querySelector("button");
        if (can) btn.onclick = () => { score -= 500000000000; exclusiveUnlocked = true; updateUI(); renderShop("exclusive"); showToast("👑 Добро пожаловать!", "success"); save(); };
        return;
    }
    
    if (tab === "exclusive") html += '<div class="exclusive-header">👑 ЭЛИТНЫЙ КЛУБ</div>';
    if (tab === "donate") html += '<div class="donate-header">🍩 ДОНАТНЫЙ МАГАЗИН</div>';
    
    const arr = tab === "donate" ? donateData : shopData[tab];
    for (const it of arr) {
        let owned = false, can = false;
        if (tab === "skins" && skins[it.id]) owned = true;
        if (tab === "upgrades" && it.up === "ac" && autoClick > 0) owned = true;
        if (tab === "exclusive") {
            if (it.t === "theme" && ownedThemes[it.th]) owned = true;
            if (it.t === "vip" && vip) owned = true;
        }
        if (tab === "donate") { can = diamonds >= it.p; if (it.t === "vip" && vip) owned = true; }
        else can = score >= it.p;
        
        html += '<div class="shop-item ' + (tab === 'exclusive' ? 'exclusive-item' : '') + ' ' + (tab === 'donate' ? 'donate-item' : '') + ' ' + (owned ? 'owned' : '') + '" data-id="' + it.id + '"><div class="shop-item-info"><div class="shop-item-name">' + it.n + '</div><div class="shop-item-desc">' + it.d + '</div></div><div class="shop-item-price">' + fmt(it.p) + (tab === 'donate' ? ' D' : '') + '</div><button ' + (owned || !can ? "disabled" : "") + '>' + (owned ? "✓" : "ОТКРЫТЬ") + '</button></div>';
    }
    items.innerHTML = html;
    items.querySelectorAll(".shop-item").forEach(row => {
        const it = arr.find(x => x.id == row.dataset.id);
        if (it) row.querySelector("button").onclick = () => buyItem(it, tab);
    });
}

function buyItem(it, tab) {
    if (tab === "donate") {
        if (diamonds < it.p) return;
        diamonds -= it.p; totalSpentD += it.p;
        if (it.t === "bonus") diamondBonus += it.v;
        else if (it.t === "ac") autoClick += it.v;
        else if (it.t === "boost") activeBoost = { factor: it.f, endTime: Date.now() + it.du * 1000, name: it.n };
        else if (it.t === "vip") vip = true;
        else if (it.t === "give_h") score += it.v;
    } else {
        if (score < it.p) return;
        score -= it.p; totalSpentH += it.p;
        if (tab === "skins") skins[it.id] = true;
        else if (tab === "upgrades" && it.up === "ac") autoClick += 1;
        else if (tab === "boosts") {
            activeBoost = { factor: it.f, endTime: Date.now() + it.du * 1000, name: it.n };
            questsState.boostProg++;
        }
        else if (tab === "exclusive") {
            if (it.t === "theme") { ownedThemes[it.th] = true; theme = it.th; }
            else if (it.t === "boost") { activeBoost = { factor: it.f, endTime: Date.now() + it.du * 1000, name: it.n }; questsState.boostProg++; }
            else if (it.t === "mult") bonusMult += 100000;
            else if (it.t === "ac10") autoClick += 10;
            else if (it.t === "vip") vip = true;
        }
    }
    updateUI(); renderShop(tab); showToast("✅ Куплено!", "success"); checkAchievements(); renderQuests(); save();
}

$("shopBtn").onclick = () => { renderShop("boosts"); $("shopModal").classList.add("active"); };
$("closeShop").onclick = () => $("shopModal").classList.remove("active");
document.querySelectorAll(".shop-tab").forEach(b => b.addEventListener("click", () => renderShop(b.dataset.tab)));

function openCase(c) {
    if (score < c.price) { showToast("❌ Недостаточно средств!", "error"); return; }
    score -= c.price; totalSpentH += c.price;
    questsState.caseProg++;
    updateUI();
    $("casesModal").classList.remove("active");
    $("caseOpenModal").classList.add("active");
    $("caseOpenTitle").textContent = c.emoji + " " + c.name;
    $("caseResult").textContent = ""; $("caseResult").className = "case-result";
    
    const win = Math.floor(c.minWin + Math.random() * (c.maxWin - c.minWin + 1));
    const isProfit = Math.random() < 0.25;
    const finalWin = isProfit ? win : Math.floor(c.minWin + Math.random() * (c.price - c.minWin));
    
    const strip = $("reelStrip");
    const winPos = 17, itemW = window.innerWidth <= 600 ? 82 : 96;
    const parts = [];
    for (let i = 0; i < 20; i++) {
        const isW = i === winPos;
        const amt = isW ? finalWin : Math.floor(c.minWin + Math.random() * (c.maxWin - c.minWin));
        parts.push('<div class="reel-item' + (isW ? " win" : "") + '">+' + fmt(amt) + '</div>');
    }
    strip.innerHTML = parts.join("");
    strip.style.transition = "none"; strip.style.transform = "translateX(0)";
    
    const reelW = document.querySelector(".reel").clientWidth;
    const targetX = -(winPos * itemW) + (reelW / 2 - itemW / 2);
    
    setTimeout(() => {
        strip.style.transition = "transform 3s cubic-bezier(.15,.7,.25,1)";
        strip.style.transform = "translateX(" + targetX + "px)";
    }, 30);
    
    setTimeout(() => {
        score += finalWin;
        totalCases++;
        if (finalWin > biggestWin) biggestWin = finalWin;
        const profit = finalWin - c.price;
        const res = $("caseResult");
        if (profit >= 0) {
            res.textContent = "✅ +" + fmt(finalWin) + " H (профит +" + fmt(profit) + ")";
            res.className = "case-result win";
        } else {
            res.textContent = "❌ +" + fmt(finalWin) + " H (убыток " + fmt(-profit) + ")";
            res.className = "case-result lose";
        }
        updateUI(); save(); checkAchievements(); renderQuests();
    }, 3100);
}

function renderCases() {
    const parts = [];
    for (const c of CASES) {
        const can = score >= c.price;
        parts.push('<div class="case-row' + (can ? "" : " locked") + '" data-id="' + c.id + '"><div class="case-emoji-big">' + c.emoji + '</div><div class="case-info-block"><div class="case-name-big">' + c.name + '</div><div class="case-price-big">Цена: ' + fmt(c.price) + ' H</div></div><button class="case-buy-btn">ОТКРЫТЬ</button></div>');
    }
    $("casesGrid").innerHTML = parts.join("");
    $("casesGrid").querySelectorAll(".case-row").forEach(row => {
        const c = CASES.find(x => x.id == row.dataset.id);
        row.querySelector(".case-buy-btn").onclick = () => openCase(c);
    });
}
$("casesBtn").onclick = () => { renderCases(); $("casesModal").classList.add("active"); };
$("closeCases").onclick = () => $("casesModal").classList.remove("active");
$("closeCaseOpen").onclick = () => $("caseOpenModal").classList.remove("active");

const wheelItems = [
    { type: "H", val: 1000, text: "1K H" },
    { type: "D", val: 5, text: "5 D" },
    { type: "H", val: 10000, text: "10K H" },
    { type: "D", val: 10, text: "10 D" },
    { type: "H", val: 100000, text: "100K H" },
    { type: "Boost", val: 5000, dur: 60, text: "×5 (1м)" },
    { type: "H", val: 1000000, text: "1M H" },
    { type: "D", val: 50, text: "50 D" }
];

$("wheelBtn").onclick = () => {
    renderWheel();
    checkWheelTimer();
    $("wheelModal").classList.add("active");
};
$("closeWheel").onclick = () => $("wheelModal").classList.remove("active");

function renderWheel() {
    const wheelGraphic = $("wheelGraphic");
    wheelGraphic.style.transform = "rotate(0deg)";
}

function checkWheelTimer() {
    const btn = $("spinWheelBtn");
    const timer = $("wheelTimer");
    const now = Date.now();
    const cooldown = 4 * 60 * 60 * 1000;
    
    if (now < wheelLastSpin + cooldown) {
        btn.disabled = true;
        const left = wheelLastSpin + cooldown - now;
        const h = Math.floor(left / 3600000);
        const m = Math.floor((left % 3600000) / 60000);
        const s = Math.floor((left % 60000) / 1000);
        timer.textContent = `Доступно через: ${h}ч ${m}м ${s}с`;
        timer.style.color = "#ff3b3b";
    } else {
        btn.disabled = false;
        timer.textContent = "Доступно!";
        timer.style.color = "#00ff88";
    }
}

$("spinWheelBtn").onclick = () => {
    const now = Date.now();
    if (now < wheelLastSpin + 4 * 60 * 60 * 1000) return;
    
    wheelLastSpin = now;
    save();
    $("spinWheelBtn").disabled = true;
    $("wheelTimer").textContent = "Крутим...";
    
    const winIndex = Math.floor(Math.random() * wheelItems.length);
    const winItem = wheelItems[winIndex];
    
    const spins = 5;
    const targetAngle = spins * 360 + (360 - (winIndex * 45 + 22.5));
    
    const wheelGraphic = $("wheelGraphic");
    wheelGraphic.style.transform = `rotate(${targetAngle}deg)`;
    
    setTimeout(() => {
        if (winItem.type === "H") {
            score += winItem.val;
            showToast(`🎉 ВЫПАЛО: +${fmt(winItem.val)} H!`, "success");
        } else if (winItem.type === "D") {
            diamonds += winItem.val;
            showToast(`🎉 ВЫПАЛО: +${winItem.val} D!`, "success");
        } else if (winItem.type === "Boost") {
            activeBoost = { factor: winItem.val, endTime: Date.now() + winItem.dur * 1000, name: "Колесо x5" };
            showToast(`🎉 ВЫПАЛ БУСТ ×5 на 1 мин!`, "success");
        }
        updateUI();
        checkWheelTimer();
        save();
    }, 3100);
};
setInterval(checkWheelTimer, 1000);

function getTodayDateString() {
    const d = new Date();
    return `${d.getDate()}.${d.getMonth()+1}.${d.getFullYear()}`;
}

function checkQuestsReset() {
    const today = getTodayDateString();
    if (questsState.date !== today) {
        questsState = { date: today, clickProg: 0, caseProg: 0, boostProg: 0, claimed: [false, false, false] };
        save();
    }
}

const QUESTS_INFO = [
    { id: 0, title: "Кликер-маньяк", desc: "Сделай 2000 кликов", target: 2000, key: "clickProg", reward: "10 D" },
    { id: 1, title: "Лудоман", desc: "Открой 10 кейсов", target: 10, key: "caseProg", reward: "25 D" },
    { id: 2, title: "Шопоголик", desc: "Купи 2 буста", target: 2, key: "boostProg", reward: "15 D" }
];

$("questsBtn").onclick = () => {
    checkQuestsReset();
    renderQuests();
    $("questsModal").classList.add("active");
};
$("closeQuests").onclick = () => $("questsModal").classList.remove("active");

function renderQuests() {
    checkQuestsReset();
    const list = $("questList");
    let html = "";
    
    for (const q of QUESTS_INFO) {
        const prog = Math.min(questsState[q.key], q.target);
        const isDone = prog >= q.target;
        const isClaimed = questsState.claimed[q.id];
        const percent = (prog / q.target) * 100;
        
        html += `
            <div class="quest-item">
                <div class="quest-info">
                    <div class="quest-title">${q.title}</div>
                    <div class="quest-reward">Награда: ${q.reward}</div>
                    <div class="quest-progress-bar"><div class="quest-progress-fill" style="width:${percent}%"></div></div>
                </div>
                <button class="quest-claim-btn" ${(!isDone || isClaimed) ? "disabled" : ""} onclick="claimQuest(${q.id})">
                    ${isClaimed ? "✓" : (isDone ? "ЗАБРАТЬ" : `${prog}/${q.target}`)}
                </button>
            </div>
        `;
    }
    list.innerHTML = html;
    
    const now = new Date();
    const night = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
    const diff = night - now;
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    $("questsTimer").textContent = `Сброс через: ${h}ч ${m}м ${s}с`;
}

window.claimQuest = function(id) {
    const q = QUESTS_INFO.find(x => x.id === id);
    if (!q) return;
    if (questsState[q.key] >= q.target && !questsState.claimed[id]) {
        questsState.claimed[id] = true;
        if (q.id === 0) diamonds += 10;
        else if (q.id === 1) diamonds += 25;
        else if (q.id === 2) diamonds += 15;
        
        showToast(`🎁 Получено: ${q.reward}!`, "success");
        updateUI();
        renderQuests();
        save();
    }
};
setInterval(renderQuests, 1000);

function getRebReq(next) {
    let h, d = 0;
    if (next <= 1) h = 100000000000;
    else if (next <= 2) h = 1000000000000;
    else if (next <= 3) h = 10000000000000;
    else if (next <= 4) h = 100000000000000;
    else if (next <= 5) h = 1000000000000000;
    else if (next <= 9) h = 10000000000000000 * (next - 4);
    else if (next <= 10) { h = 100000000000000000000; d = 1; }
    else if (next <= 20) { h = 100000000000000000000 * next; d = next - 9; }
    else if (next <= 50) { h = 1000000000000000000000 * next; d = 10 + (next - 20) * 5; }
    else { h = 10000000000000000000000 * next; d = 200 + (next - 50) * 20; }
    return { h, d };
}

function updateRebirthInfo() {
    const next = rebirths + 1;
    const r = getRebReq(next);
    const canH = score >= r.h, canD = diamonds >= r.d;
    let html = '<div class="row"><span>Перерождений:</span><span>' + fmt(rebirths) + '</span></div>' +
        '<div class="row"><span>После:</span><span>' + fmt(next) + '</span></div>' +
        '<div class="row"><span>Бонус:</span><span class="gain">+' + fmt(cReb) + ' → +' + fmt(cReb + 500000000) + '</span></div>' +
        '<div class="row"><span>H требуется:</span><span class="' + (canH ? 'gain' : 'lose') + '">' + fmt(r.h) + ' ' + (canH ? '✅' : '❌') + '</span></div>';
    if (r.d > 0) html += '<div class="row"><span>D требуется:</span><span class="' + (canD ? 'gain' : 'lose') + '">' + fmt(r.d) + ' ' + (canD ? '✅' : '❌') + '</span></div>';
    html += '<div class="row"><span>Статус:</span><span class="' + (canH && canD ? 'gain' : 'lose') + '">' + (canH && canD ? '✅ Доступно' : '❌ Недоступно') + '</span></div>';
    $("rebirthInfo").innerHTML = html;
    $("doRebirth").disabled = !(canH && canD);
}
$("rebirthBtn").onclick = () => { updateRebirthInfo(); $("rebirthModal").classList.add("active"); };
$("cancelRebirth").onclick = () => $("rebirthModal").classList.remove("active");
$("doRebirth").onclick = () => {
    const r = getRebReq(rebirths + 1);
    if (score < r.h || diamonds < r.d) return;
    score = 0; bonusMult = 1000; autoClick = 0;
    skins = {}; theme = "default"; ownedThemes = {};
    activeBoost = { factor: 1000, endTime: 0, name: "" };
    rebirths += 1;
    updateUI(); renderThemeBar(); save();
    $("rebirthModal").classList.remove("active");
    const flash = document.createElement("div"); flash.className = "reset-flash"; document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 400);
    showToast("🔄 Перерождение #" + fmt(rebirths), "success");
    checkAchievements();
};

function renderThemeBar() {
    const parts = [];
    for (const key of Object.keys(THEMES)) {
        const th = THEMES[key];
        const owned = key === "default" || !!ownedThemes[key];
        parts.push('<button class="theme-btn ' + key + (theme === key ? " active" : "") + (owned ? "" : " locked") + '" data-theme="' + key + '">' + th.e + '<span class="price">' + (owned ? th.key : fmt(th.p)) + '</span></button>');
    }
    $("themeBar").innerHTML = parts.join("");
    $("themeBar").querySelectorAll(".theme-btn").forEach(btn => {
        btn.onclick = () => {
            const key = btn.dataset.theme;
            if (key === "default" || !!ownedThemes[key]) { theme = key; updateUI(); renderThemeBar(); showToast("Тема: " + THEMES[key].key, "success"); save(); }
            else showToast("Купи в ЭКСКЛЮЗИВ!", "error");
        };
    });
}

$("adminBtn").onclick = () => { $("adminPassword").value=""; $("adminLoginModal").classList.add("active"); };
$("closeAdminLogin").onclick = () => $("adminLoginModal").classList.remove("active");
$("adminLoginBtn").onclick = () => {
    if ($("adminPassword").value === ADMIN_PASSWORD) { $("adminLoginModal").classList.remove("active"); $("adminPanelModal").classList.add("active"); }
    else { showToast("❌ Неверный пароль", "error"); }
};
$("closeAdminPanel").onclick = () => $("adminPanelModal").classList.remove("active");

$("adminHGive").onclick = () => {
    const val = parseSum($("adminHInput").value);
    if(val > 0) { score += val; $("adminHInput").value=""; updateUI(); showToast("💰 +" + fmt(val), "success"); save(); }
};
$("adminDGive").onclick = () => {
    const val = parseSum($("adminDInput").value);
    if(val > 0) { diamonds += val; $("adminDInput").value=""; updateUI(); showToast("💎 +" + fmt(val), "success"); save(); }
};
$("adminBonusGive").onclick = () => {
    const val = parseSum($("adminBonusInput").value);
    if(val > 0) { diamondBonus += val; $("adminBonusInput").value=""; updateUI(); showToast("🎁 +" + fmt(val), "success"); save(); }
};
$("adminRebirthGive").onclick = () => {
    const val = parseSum($("adminRebirthInput").value);
    if(val > 0) { rebirths += val; $("adminRebirthInput").value=""; updateUI(); showToast("🔄 +" + fmt(val), "success"); save(); }
};
$("adminAutoGive").onclick = () => {
    const val = parseSum($("adminAutoInput").value);
    if(val > 0) { autoClick += val; $("adminAutoInput").value=""; updateUI(); showToast("⚙️ +" + fmt(val), "success"); save(); }
};
$("adminMultGive").onclick = () => {
    const val = parseSum($("adminMultInput").value);
    if(val > 0) { bonusMult += val; $("adminMultInput").value=""; updateUI(); showToast("🎯 +" + fmt(val), "success"); save(); }
};

document.querySelectorAll(".admin-quick button").forEach(b => {
    b.onclick = () => {
        const amt = parseSum(b.dataset.amt);
        const cur = b.dataset.cur;
        if (cur === "H") { score += amt; showToast("💰 +" + fmt(amt), "success"); }
        else if (cur === "D") { diamonds += amt; showToast("💎 +" + fmt(amt), "success"); }
        updateUI(); save();
    };
});

$("adminUnlockAll").onclick = () => {
    skins = { sk_hat: true, sk_glasses: true, sk_crown: true, sk_cape: true };
    ownedThemes = { gold: true, diamond: true, fire: true, electric: true };
    exclusiveUnlocked = true; vip = true;
    updateUI(); renderThemeBar(); showToast("🎁 Всё разблокировано!", "success"); save();
};

$("adminFullReset").onclick = () => { $("adminPanelModal").classList.remove("active"); $("adminResetConfirmModal").classList.add("active"); };
$("cancelAdminReset").onclick = () => $("adminResetConfirmModal").classList.remove("active");
$("doAdminReset").onclick = () => {
    score=0; diamonds=0; diamondBonus=0; bonusMult=1000; autoClick=0; rebirths=0;
    skins={}; theme="default"; ownedThemes={}; usedTransferCodes=[];
    exclusiveUnlocked=false; vip=false; unlockedAch={};
    activeBoost={factor:1000,endTime:0,name:""};
    wheelLastSpin=0;
    questsState={date:"", clickProg:0, caseProg:0, boostProg:0, claimed:[false,false,false]};
    localStorage.removeItem(STORAGE_KEY); 
    localStorage.removeItem(BACKUP_KEY);
    save();
    $("adminResetConfirmModal").classList.remove("active");
    updateUI(); renderThemeBar(); showToast("🧨 Всё удалено (кроме статистики)", "success");
};

$("exchangeBtn").onclick = () => { $("exchangeModal").classList.add("active"); };
$("closeExchange").onclick = () => $("exchangeModal").classList.remove("active");
$("doExchange").onclick = () => {
    const amt = parseSum($("exchangeInput").value);
    if (amt < 1000000000000) { showToast("❌ Минимум 1T H", "error"); return; }
    if (amt > score) { showToast("❌ Мало монет!", "error"); return; }
    const got = Math.floor(amt / 1000000000000);
    score -= amt; totalSpentH += amt; diamonds += got;
    updateUI(); showToast("💎 +" + fmt(got) + " D", "success"); save();
};

let transferCurrency = "H";
$("transferBtn").onclick = () => {
    $("transferInput").value=""; $("transferResult").className="promo-result"; $("transferCodeBox").classList.remove("show");
    setTransferCurrency("H"); $("transferModal").classList.add("active");
};
$("closeTransfer").onclick = () => $("transferModal").classList.remove("active");

function setTransferCurrency(cur) {
    transferCurrency = cur;
    if (cur === "H") {
        $("btnTransferH").style.background = "var(--main)"; $("btnTransferH").style.color = "#000";
        $("btnTransferD").style.background = "transparent"; $("btnTransferD").style.color = "#00e5ff";
    } else {
        $("btnTransferH").style.background = "transparent"; $("btnTransferH").style.color = "var(--main)";
        $("btnTransferD").style.background = "#00e5ff"; $("btnTransferD").style.color = "#000";
    }
}
$("btnTransferH").onclick = () => setTransferCurrency("H");
$("btnTransferD").onclick = () => setTransferCurrency("D");

$("createTransfer").onclick = () => {
    const res = $("transferResult"); res.className = "promo-result"; res.textContent = "";
    const amt = parseSum($("transferInput").value);
    if (amt <= 0) { res.className = "promo-result error"; res.textContent = "Введи сумму!"; return; }
    
    if (transferCurrency === "H") {
        if (amt > score) { res.className = "promo-result error"; res.textContent = "❌ Мало монет!"; return; }
        score -= amt; totalSpentH += amt;
        const code = "H_" + amt.toString() + "_" + Array.from({length:4},()=>"ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(Math.random()*26)]).join("");
        $("transferCodeText").textContent = code;
    } else {
        if (amt > diamonds) { res.className = "promo-result error"; res.textContent = "❌ Мало алмазов!"; return; }
        diamonds -= amt; totalSpentD += amt;
        const code = "D_" + amt.toString() + "_" + Array.from({length:4},()=>"ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(Math.random()*26)]).join("");
        $("transferCodeText").textContent = code;
    }
    
    $("transferCodeBox").classList.add("show"); res.className = "promo-result success"; res.textContent = "✅ Код создан!";
    updateUI(); save();
};

$("closeTransferCode").onclick = () => $("transferCodeBox").classList.remove("show");
$("copyTransferCode").onclick = () => {
    const code = $("transferCodeText").textContent;
    if (!code) return;
    navigator.clipboard.writeText(code).then(() => { showToast("✅ Скопировано!", "success"); }).catch(() => {});
};

$("promoBtn").onclick = () => { $("promoInput").value=""; $("promoResult").className="promo-result"; $("promoModal").classList.add("active"); };
$("closePromo").onclick = () => $("promoModal").classList.remove("active");

function parseTransferCode(code) {
    if (code.startsWith("H_")) {
        const parts = code.split("_");
        try { return { currency: "H", amount: BigInt(parts[1]) }; } catch { return null; }
    } else if (code.startsWith("D_")) {
        const parts = code.split("_");
        try { return { currency: "D", amount: BigInt(parts[1]) }; } catch { return null; }
    }
    return null;
}

$("activatePromo").onclick = () => {
    const code = $("promoInput").value.trim().toUpperCase();
    const res = $("promoResult");
    if (!code) { res.className = "promo-result error"; res.textContent = "❌ Неверный код!"; return; }
    if (usedTransferCodes.includes(code)) { res.className = "promo-result error"; res.textContent = "❌ Уже использован!"; return; }
    
    if (code === "#HAMSONEMES24") {
        usedTransferCodes.push(code);
        score += 1000000000000000;
        diamonds += 500;
        res.textContent = "🎉 +1QA H, +500 D!";
        res.className = "promo-result success"; updateUI(); save(); $("promoInput").value = "";
        return;
    }
    
    const transferData = parseTransferCode(code);
    if (transferData) {
        usedTransferCodes.push(code);
        if (transferData.currency === "H") { score += Number(transferData.amount); res.textContent = "💰 +" + fmt(transferData.amount) + " H"; }
        else { diamonds += Number(transferData.amount); res.textContent = "💎 +" + fmt(transferData.amount) + " D"; }
        res.className = "promo-result success"; updateUI(); save(); $("promoInput").value = "";
    } else { res.className = "promo-result error"; res.textContent = "❌ Неверный код!"; }
};

$("newsBtn").onclick = () => {
    $("newsList").innerHTML = NEWS_DATA.map((n, i) => `
        <div class="news-item ${n.active ? 'active' : ''}" onclick="openNews(${i})">
            <div class="news-item-title">${n.title}</div>
            <div class="news-item-date">${n.date}</div>
        </div>
    `).join("");
    $("newsModal").classList.add("active");
};
window.openNews = function(idx) {
    const n = NEWS_DATA[idx];
    let html = `<div class="news-detail-text">${n.text}</div>`;
    if (n.promo) {
        html += `<div class="promo-code-box"><span class="promo-code-text">${n.promo}</span><button class="promo-copy-btn" onclick="copyPromo('${n.promo}')">📋 Копировать</button></div>`;
    }
    $("newsDetailTitle").textContent = n.title;
    $("newsDetailText").innerHTML = html;
    $("newsDetailDate").textContent = n.date;
    $("newsModal").classList.remove("active");
    $("newsDetailModal").classList.add("active");
};
window.copyPromo = function(code) {
    navigator.clipboard.writeText(code).then(() => {
        showToast("✅ Промокод скопирован!", "success");
    }).catch(() => {
        const el = document.createElement("textarea");
        el.value = code;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
        showToast("✅ Промокод скопирован!", "success");
    });
};
$("closeNews").onclick = () => $("newsModal").classList.remove("active");
$("closeNewsDetail").onclick = () => $("newsDetailModal").classList.remove("active");

$("achBtn").onclick = () => {
    $("achModal").classList.add("active");
    const grid = $("achGrid"); let html = "", opened = 0;
    for (const a of ACH) {
        const done = !!unlockedAch[a.id];
        if (done) opened++;
        if (done) {
            html += '<div class="ach-card unlocked" data-id="' + a.id + '"><div class="ach-ico">' + a.ico + '</div><div class="ach-name">' + a.name + '</div><div class="ach-reward">' + a.reward + '</div></div>';
        } else {
            html += '<div class="ach-card locked"><div class="ach-qmark">?</div><div class="ach-name">Скрыто</div></div>';
        }
    }
    grid.innerHTML = html;
    $("achProgress").textContent = "Открыто: " + opened + " / " + ACH.length;
    grid.querySelectorAll(".ach-card.unlocked").forEach(el => el.onclick = () => {
        const a = ACH.find(x => x.id === el.dataset.id);
        $("achDetailIco").textContent = a.ico;
        $("achDetailName").textContent = a.name;
        $("achDetailDesc").textContent = a.desc;
        $("achDetailReward").textContent = "🎁 Награда: " + a.reward;
        $("achDetailStatus").textContent = "✅ Получено";
        $("achDetailModal").classList.add("active");
    });
};
$("closeAch").onclick = () => $("achModal").classList.remove("active");
$("closeAchDetail").onclick = () => $("achDetailModal").classList.remove("active");

$("statsBtn").onclick = () => {
    let sessionHours = 0;
    if (sessionStart) { sessionHours = Math.floor((Date.now() - sessionStart) / 3600000); }
    const displayHours = totalHoursPlayed + sessionHours;
    $("statsList").innerHTML = 
        '<div class="stat-row"><span>⏱️ Часов в игре</span><span>'+displayHours+' ч.</span></div>'+
        '<div class="stat-row"><span>💸 Всего потрачено H</span><span>'+fmt(totalSpentH)+'</span></div>'+
        '<div class="stat-row"><span>💸 Всего потрачено D</span><span>'+fmt(totalSpentD)+'</span></div>'+
        '<div class="stat-row"><span>🖱️ Всего кликов</span><span>'+totalClicks+'</span></div>'+
        '<div class="stat-row"><span>📦 Кейсов открыто</span><span>'+totalCases+'</span></div>'+
        '<div class="stat-row"><span>💰 Текущий H</span><span>'+fmt(score)+'</span></div>'+
        '<div class="stat-row"><span>💎 Текущий D</span><span>'+fmt(diamonds)+'</span></div>'+
        '<div class="stat-row"><span>🔄 Перерождений</span><span>'+fmt(rebirths)+'</span></div>'+
        '<div class="stat-row"><span>🏆 Крупнейший выигрыш</span><span>'+fmt(biggestWin)+'</span></div>'+
        '<div class="stat-row"><span>🎁 Множитель бонус</span><span>+'+fmt(diamondBonus)+'</span></div>'+
        '<div class="stat-row"><span>⚙️ Автоклик</span><span>'+fmt(autoClick)+'</span></div>'+
        '<div class="stat-row"><span>📊 Ранг</span><span>'+fmt(cRank)+'</span></div>';
    $("statsModal").classList.add("active");
};
$("closeStats").onclick = () => $("statsModal").classList.remove("active");
$("supportBtn").onclick = () => window.open("https://t.me/ksxx16", "_blank");

const INFO_DATA = [
    { s: "K", n: "Тысяча" },
    { s: "M", n: "Миллион" },
    { s: "B", n: "Миллиард" },
    { s: "T", n: "Триллион" },
    { s: "QA", n: "Квадриллион" },
    { s: "QI", n: "Квинтиллион" },
    { s: "SX", n: "Секстиллион" },
    { s: "SPD", n: "Септиллион" },
    { s: "OCD", n: "Октиллион" },
    { s: "NOD", n: "Нониллион" },
    { s: "DCD", n: "Дециллион" },
    { s: "UND", n: "Ундециллион" },
    { s: "DUD", n: "Дуодециллион" },
    { s: "TDT", n: "Тредециллион" },
    { s: "QDT", n: "Кваттуордециллион" },
    { s: "QNT", n: "Квиндециллион" },
    { s: "SXT", n: "Сексдециллион" },
    { s: "SPT", n: "Септендециллион" },
    { s: "OCT", n: "Октодециллион" },
    { s: "NOV", n: "Новемдециллион" },
    { s: "VIG", n: "Вигинтиллион" }
];

$("infoBtn").onclick = () => {
    $("infoList").innerHTML = INFO_DATA.map(i => `<div class="info-row"><span>${i.s}</span><span>${i.n}</span></div>`).join("");
    $("infoModal").classList.add("active");
};
$("closeInfo").onclick = () => $("infoModal").classList.remove("active");

const ACH = [
    {id:1, ico:"🖱️", name:"Первый клик", desc:"Сделай 1 клик", reward:"100 H", check:()=>totalClicks>=1, give:()=>score+=100},
    {id:2, ico:"🖱️", name:"100 кликов", desc:"Сделай 100 кликов", reward:"1K H", check:()=>totalClicks>=100, give:()=>score+=1000},
    {id:3, ico:"🖱️", name:"1000 кликов", desc:"Сделай 1000 кликов", reward:"10K H", check:()=>totalClicks>=1000, give:()=>score+=10000},
    {id:4, ico:"🖱️", name:"10K кликов", desc:"Сделай 10000 кликов", reward:"100K H", check:()=>totalClicks>=10000, give:()=>score+=100000},
    {id:5, ico:"🖱️", name:"100K кликов", desc:"Сделай 100000 кликов", reward:"1M H", check:()=>totalClicks>=100000, give:()=>score+=1000000},
    {id:6, ico:"🖱️", name:"1M кликов", desc:"Сделай 1 миллион кликов", reward:"10M H", check:()=>totalClicks>=1000000, give:()=>score+=10000000},
    {id:7, ico:"📦", name:"Первый кейс", desc:"Открой 1 кейс", reward:"1K H", check:()=>totalCases>=1, give:()=>score+=1000},
    {id:8, ico:"📦", name:"10 кейсов", desc:"Открой 10 кейсов", reward:"10K H", check:()=>totalCases>=10, give:()=>score+=10000},
    {id:9, ico:"📦", name:"50 кейсов", desc:"Открой 50 кейсов", reward:"100K H", check:()=>totalCases>=50, give:()=>score+=100000},
    {id:10, ico:"📦", name:"200 кейсов", desc:"Открой 200 кейсов", reward:"1M H", check:()=>totalCases>=200, give:()=>score+=1000000},
    {id:11, ico:"📦", name:"500 кейсов", desc:"Открой 500 кейсов", reward:"10M H", check:()=>totalCases>=500, give:()=>score+=10000000},
    {id:12, ico:"💰", name:"Первый миллион", desc:"Накопи 1M H", reward:"100K H", check:()=>score>=1000000, give:()=>score+=100000},
    {id:13, ico:"💰", name:"Миллиард", desc:"Накопи 1B H", reward:"1M H", check:()=>score>=1000000000, give:()=>score+=1000000},
    {id:14, ico:"💰", name:"Триллион", desc:"Накопи 1T H", reward:"10M H", check:()=>score>=1000000000000, give:()=>score+=10000000},
    {id:15, ico:"💰", name:"Квадриллион", desc:"Накопи 1QA H", reward:"100M H", check:()=>score>=1000000000000000, give:()=>score+=100000000},
    {id:16, ico:"💎", name:"Первый D", desc:"Получи 1 D", reward:"10K H", check:()=>diamonds>=1, give:()=>score+=10000},
    {id:17, ico:"💎", name:"100 D", desc:"Накопи 100 D", reward:"100K H", check:()=>diamonds>=100, give:()=>score+=100000},
    {id:18, ico:"💎", name:"1000 D", desc:"Накопи 1000 D", reward:"1M H", check:()=>diamonds>=1000, give:()=>score+=1000000},
    {id:19, ico:"💎", name:"10K D", desc:"Накопи 10000 D", reward:"10M H", check:()=>diamonds>=10000, give:()=>score+=10000000},
    {id:20, ico:"💎", name:"100K D", desc:"Накопи 100000 D", reward:"100M H", check:()=>diamonds>=100000, give:()=>score+=100000000},
    {id:21, ico:"🔄", name:"Ранг 100", desc:"Достигни ранга 100", reward:"10K H", check:()=>cRank>=100, give:()=>score+=10000},
    {id:22, ico:"🔄", name:"Ранг 1000", desc:"Достигни ранга 1000", reward:"100K H", check:()=>cRank>=1000, give:()=>score+=100000},
    {id:23, ico:"🔄", name:"Ранг 10K", desc:"Достигни ранга 10000", reward:"1M H", check:()=>cRank>=10000, give:()=>score+=1000000},
    {id:24, ico:"🔄", name:"Ранг 100K", desc:"Достигни ранга 100000", reward:"10M H", check:()=>cRank>=100000, give:()=>score+=10000000},
    {id:25, ico:"🔄", name:"Ранг 1M", desc:"Достигни ранга 1M", reward:"100M H", check:()=>cRank>=1000000, give:()=>score+=100000000},
    {id:26, ico:"🔥", name:"Перерождение", desc:"Сделай 1 перерождение", reward:"1M H", check:()=>rebirths>=1, give:()=>score+=1000000},
    {id:27, ico:"🔥", name:"10 перерождений", desc:"Сделай 10 перерождений", reward:"10M H", check:()=>rebirths>=10, give:()=>score+=10000000},
    {id:28, ico:"🔥", name:"50 перерождений", desc:"Сделай 50 перерождений", reward:"50M H", check:()=>rebirths>=50, give:()=>score+=50000000},
    {id:29, ico:"🔥", name:"100 перерождений", desc:"Сделай 100 перерождений", reward:"100M H", check:()=>rebirths>=100, give:()=>score+=100000000},
    {id:30, ico:"🔥", name:"500 перерождений", desc:"Сделай 500 перерождений", reward:"500M H", check:()=>rebirths>=500, give:()=>score+=500000000},
    {id:31, ico:"🎨", name:"Скин", desc:"Купи любой скин", reward:"10K H", check:()=>Object.keys(skins).length>=1, give:()=>score+=10000},
    {id:32, ico:"🎨", name:"2 скина", desc:"Купи 2 скина", reward:"50K H", check:()=>Object.keys(skins).length>=2, give:()=>score+=50000},
    {id:33, ico:"🎨", name:"3 скина", desc:"Купи 3 скина", reward:"100K H", check:()=>Object.keys(skins).length>=3, give:()=>score+=100000},
    {id:34, ico:"🎨", name:"4 скина", desc:"Купи все скины", reward:"500K H", check:()=>Object.keys(skins).length>=4, give:()=>score+=500000},
    {id:35, ico:"👑", name:"VIP", desc:"Купи VIP", reward:"1M H", check:()=>vip, give:()=>score+=1000000},
    {id:36, ico:"🎨", name:"Тема", desc:"Купи любую тему", reward:"100K H", check:()=>Object.keys(ownedThemes).length>=1, give:()=>score+=100000},
    {id:37, ico:"🎨", name:"2 темы", desc:"Купи 2 темы", reward:"500K H", check:()=>Object.keys(ownedThemes).length>=2, give:()=>score+=500000},
    {id:38, ico:"🎨", name:"Все темы", desc:"Купи все темы", reward:"5M H", check:()=>Object.keys(ownedThemes).length>=4, give:()=>score+=5000000},
    {id:39, ico:"⚙️", name:"Автоклик", desc:"Купи автоклик", reward:"50K H", check:()=>autoClick>0, give:()=>score+=50000},
    {id:40, ico:"⚙️", name:"Автоклик 100", desc:"Накопи 100/сек", reward:"500K H", check:()=>autoClick>=100, give:()=>score+=500000},
    {id:41, ico:"⚙️", name:"Автоклик 1000", desc:"Накопи 1000/сек", reward:"1M H", check:()=>autoClick>=1000, give:()=>score+=1000000},
    {id:42, ico:"⚙️", name:"Автоклик 10K", desc:"Накопи 10000/сек", reward:"10M H", check:()=>autoClick>=10000, give:()=>score+=10000000},
    {id:43, ico:"⚙️", name:"Автоклик 100K", desc:"Накопи 100000/сек", reward:"100M H", check:()=>autoClick>=100000, give:()=>score+=100000000},
    {id:44, ico:"🚀", name:"Буст", desc:"Купи любой буст", reward:"10K H", check:()=>activeBoost.factor>1000, give:()=>score+=10000},
    {id:45, ico:"🚀", name:"Буст ×2", desc:"Купи буст ×2", reward:"100K H", check:()=>activeBoost.factor>=2000, give:()=>score+=100000},
    {id:46, ico:"🚀", name:"Буст ×5", desc:"Купи буст ×5", reward:"1M H", check:()=>activeBoost.factor>=5000, give:()=>score+=1000000},
    {id:47, ico:"🚀", name:"Буст ×100", desc:"Купи буст ×100", reward:"10M H", check:()=>activeBoost.factor>=100000, give:()=>score+=10000000},
    {id:48, ico:"🚀", name:"Буст ×1000", desc:"Купи буст ×1000", reward:"50M H", check:()=>activeBoost.factor>=1000000, give:()=>score+=50000000},
    {id:49, ico:"🎁", name:"Бонус +10", desc:"Получи +10 к бонусу", reward:"10K H", check:()=>diamondBonus>=10, give:()=>score+=10000},
    {id:50, ico:"🎁", name:"Бонус +100", desc:"Получи +100 к бонусу", reward:"100K H", check:()=>diamondBonus>=100, give:()=>score+=100000},
    {id:51, ico:"🎁", name:"Бонус +1000", desc:"Получи +1000 к бонусу", reward:"1M H", check:()=>diamondBonus>=1000, give:()=>score+=1000000},
    {id:52, ico:"🎁", name:"Бонус +10K", desc:"Получи +10000 к бонусу", reward:"10M H", check:()=>diamondBonus>=10000, give:()=>score+=10000000},
    {id:53, ico:"🏆", name:"Крупняк", desc:"Выиграй 1T H за раз", reward:"1M H", check:()=>biggestWin>=1000000000000, give:()=>score+=1000000},
    {id:54, ico:"🏆", name:"Мега-крупняк", desc:"Выиграй 1QA H за раз", reward:"100M H", check:()=>biggestWin>=1000000000000000, give:()=>score+=100000000},
    {id:55, ico:"🌟", name:"VETERAN", desc:"Достигни стадии VETERAN", reward:"10K H", check:()=>stages[cStageIdx].n==="VETERAN", give:()=>score+=10000},
    {id:56, ico:"🌟", name:"LEGEND", desc:"Достигни стадии LEGEND", reward:"1M H", check:()=>stages[cStageIdx].n==="LEGEND", give:()=>score+=1000000},
    {id:57, ico:"🌟", name:"EMPEROR", desc:"Достигни стадии EMPEROR", reward:"100M H", check:()=>stages[cStageIdx].n==="EMPEROR", give:()=>score+=100000000},
    {id:58, ico:"🌟", name:"GALAXY", desc:"Достигни стадии GALAXY", reward:"1B H", check:()=>stages[cStageIdx].n==="GALAXY", give:()=>score+=1000000000},
    {id:59, ico:"🌟", name:"SINGULARITY", desc:"Достигни SINGULARITY", reward:"10B H", check:()=>stages[cStageIdx].n==="SINGULARITY", give:()=>score+=10000000000},
    {id:60, ico:"🌟", name:"ZENITH", desc:"Достигни ZENITH", reward:"1T H", check:()=>stages[cStageIdx].n==="ZENITH", give:()=>score+=1000000000000}
];

document.querySelectorAll(".modal").forEach(m => { m.addEventListener("click", e => { if(e.target === m) m.classList.remove("active"); }); });

renderThemeBar(); 
updateUI();
checkQuestsReset();
renderQuests();
checkWheelTimer();