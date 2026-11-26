const cardArt = (kind, palette, painted) => {
    const ink = painted ? '#292821' : '#292821';
    const muted = painted ? palette.muted : '#dedbd2';
    const accent = painted ? palette.accent : '#c8c4ba';
    const secondary = painted ? palette.secondary : '#e5e2db';
    const panel = painted ? palette.panel : '#fffdf8';

    const artwork = {
        resume: `
            <rect x="230" y="790" width="560" height="820" rx="18" fill="${panel}" stroke="${ink}" stroke-width="8"/>
            <circle cx="355" cy="930" r="72" fill="${muted}" stroke="${ink}" stroke-width="7"/>
            <path d="M322 935c18-42 51-42 68 0m-78 46c24-35 65-35 87 0" fill="none" stroke="${ink}" stroke-width="10" stroke-linecap="round"/>
            <path d="M475 885h230m-230 52h184m-300 178h338m-338 65h280m-280 65h315" fill="none" stroke="${ink}" stroke-width="12" stroke-linecap="round"/>
            <rect x="285" y="1310" width="105" height="18" rx="9" fill="${accent}"/>
            <rect x="410" y="1310" width="290" height="18" rx="9" fill="${secondary}" stroke="${ink}" stroke-width="4"/>
            <rect x="285" y="1370" width="185" height="18" rx="9" fill="${accent}"/>
            <rect x="490" y="1370" width="210" height="18" rx="9" fill="${secondary}" stroke="${ink}" stroke-width="4"/>
            <path d="M315 1510h390m-390 42h260" fill="none" stroke="${ink}" stroke-width="10" stroke-linecap="round"/>
            <path d="m675 1020 28 28 53-64" fill="none" stroke="${painted ? palette.accent : ink}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
        `,
        aigen: `
            <rect x="150" y="760" width="720" height="890" rx="20" fill="${panel}" stroke="${ink}" stroke-width="8"/>
            <rect x="180" y="795" width="150" height="815" rx="12" fill="${muted}" stroke="${ink}" stroke-width="5"/>
            <path d="M205 850h95m-95 65h80m-80 65h92m-92 65h72m-72 65h90" fill="none" stroke="${ink}" stroke-width="9" stroke-linecap="round"/>
            <rect x="360" y="795" width="475" height="250" rx="14" fill="${secondary}" stroke="${ink}" stroke-width="5"/>
            <path d="M395 990 470 930l62 32 78-95 85 48" fill="none" stroke="${painted ? palette.accent : ink}" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>
            <rect x="360" y="1080" width="220" height="230" rx="14" fill="${muted}" stroke="${ink}" stroke-width="5"/>
            <rect x="610" y="1080" width="225" height="230" rx="14" fill="${secondary}" stroke="${ink}" stroke-width="5"/>
            <rect x="360" y="1345" width="475" height="265" rx="14" fill="${panel}" stroke="${ink}" stroke-width="5"/>
            <path d="M400 1410h390m-390 55h300m-300 55h360m-360 55h230" fill="none" stroke="${ink}" stroke-width="10" stroke-linecap="round"/>
        `,
        rag: `
            <rect x="145" y="760" width="730" height="890" rx="20" fill="${panel}" stroke="${ink}" stroke-width="8"/>
            <path d="m305 975 190-100 195 140-100 205-220-10-95 185 250 110 175-145" fill="none" stroke="${painted ? palette.accent : ink}" stroke-width="10" stroke-linecap="round"/>
            <g fill="${muted}" stroke="${ink}" stroke-width="7">
              <circle cx="305" cy="975" r="42"/><circle cx="495" cy="875" r="55"/>
              <circle cx="690" cy="1015" r="47"/><circle cx="590" cy="1220" r="52"/>
              <circle cx="370" cy="1210" r="43"/><circle cx="275" cy="1395" r="39"/>
              <circle cx="525" cy="1505" r="48"/><circle cx="700" cy="1360" r="44"/>
            </g>
            <path d="M205 810h180m-180 47h115m420 610h90" fill="none" stroke="${ink}" stroke-width="10" stroke-linecap="round"/>
        `,
        warehouse: `
            <rect x="145" y="760" width="730" height="890" rx="20" fill="${panel}" stroke="${ink}" stroke-width="8"/>
            <g stroke="${ink}" stroke-width="7" stroke-linejoin="round">
              <path d="m250 980 240-110 240 110-240 112Z" fill="${muted}"/>
              <path d="M250 980v150l240 112v-150Z" fill="${secondary}"/>
              <path d="M730 980v150l-240 112v-150Z" fill="${accent}"/>
              <path d="m250 1280 240-110 240 110-240 112Z" fill="${muted}"/>
              <path d="M250 1280v130l240 112v-130Z" fill="${secondary}"/>
              <path d="M730 1280v130l-240 112v-130Z" fill="${accent}"/>
            </g>
            <path d="M315 930v-90m175 30v-85m175 145v-90" stroke="${ink}" stroke-width="9" stroke-linecap="round"/>
        `,
        assistant: `
            <rect x="145" y="760" width="730" height="890" rx="20" fill="${panel}" stroke="${ink}" stroke-width="8"/>
            <circle cx="245" cy="850" r="42" fill="${muted}" stroke="${ink}" stroke-width="7"/>
            <path d="M215 855h60m-50 18h40" stroke="${ink}" stroke-width="7" stroke-linecap="round"/>
            <rect x="330" y="800" width="420" height="115" rx="30" fill="${secondary}" stroke="${ink}" stroke-width="6"/>
            <path d="M375 850h310m-310 33h220" stroke="${ink}" stroke-width="8" stroke-linecap="round"/>
            <rect x="255" y="980" width="500" height="160" rx="30" fill="${muted}" stroke="${ink}" stroke-width="6"/>
            <path d="M300 1035h380m-380 38h320m-320 38h250" stroke="${ink}" stroke-width="8" stroke-linecap="round"/>
            <rect x="330" y="1205" width="420" height="125" rx="30" fill="${secondary}" stroke="${ink}" stroke-width="6"/>
            <path d="M375 1260h300m-300 34h205" stroke="${ink}" stroke-width="8" stroke-linecap="round"/>
            <rect x="220" y="1400" width="600" height="130" rx="28" fill="${panel}" stroke="${ink}" stroke-width="6"/>
            <circle cx="735" cy="1465" r="32" fill="${accent}" stroke="${ink}" stroke-width="5"/>
        `,
        osteo: `
            <rect x="145" y="760" width="730" height="890" rx="20" fill="${panel}" stroke="${ink}" stroke-width="8"/>
            <rect x="195" y="815" width="630" height="700" rx="18" fill="${painted ? palette.dark : '#f7f5ef'}" stroke="${ink}" stroke-width="6"/>
            <path d="M290 890h445m-445 55h260" stroke="${painted ? palette.light : ink}" stroke-width="9" stroke-linecap="round"/>
            <path d="M480 1075c-34-36-95-20-105 28-8 39 15 68 51 77 19 5 41 2 58-7l116 124c-4 35 17 70 53 78 47 11 82-33 65-76-10-25-33-40-60-38l-114-123c14-38-16-76-64-63Z" fill="${painted ? palette.accent : '#e8e5de'}" stroke="${painted ? palette.light : ink}" stroke-width="11" stroke-linejoin="round"/>
            <path d="M245 1360h190m-190 47h125m260-47h120m-120 47h175" stroke="${painted ? palette.light : ink}" stroke-width="9" stroke-linecap="round"/>
            <circle cx="715" cy="965" r="55" fill="${muted}" stroke="${painted ? palette.light : ink}" stroke-width="7"/>
            <path d="m690 965 18 18 35-41" fill="none" stroke="${painted ? palette.light : ink}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
        `
    }[kind];

    const sketchLines = `
        <path d="M42 54 Q520 43 982 61 M48 66 Q514 74 974 54 M40 1990 Q525 2003 985 1983 M52 2004 Q510 1988 970 2002" fill="none" stroke="#26231f" stroke-width="8" stroke-linecap="round" opacity=".82"/>
        <path d="M70 95 Q510 84 950 100 L948 472 Q510 480 74 466Z M80 108 Q520 98 940 115 L938 458 Q510 469 84 452Z" fill="none" stroke="#292621" stroke-width="5" stroke-linecap="round" opacity=".75"/>
        <path d="M68 548 Q510 535 956 552 L950 1940 Q512 1955 74 1938Z M82 564 Q520 551 940 568 L936 1924 Q515 1938 88 1920Z" fill="none" stroke="#292621" stroke-width="6" stroke-linecap="round" opacity=".78"/>
    `;

    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="1024" height="2048" viewBox="0 0 1024 2048">
            <rect width="1024" height="2048" fill="#fbf8ef"/>
            <path d="M0 245h1024M0 490h1024M0 735h1024M0 980h1024M0 1225h1024M0 1470h1024M0 1715h1024" stroke="#c9bea6" stroke-width="2" opacity=".13"/>
            ${sketchLines}
            <rect x="112" y="575" width="800" height="1350" rx="14" fill="${painted ? palette.screen : '#fffdf8'}" stroke="#292621" stroke-width="8"/>
            ${artwork}
        </svg>
    `;

    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

const makeProject = (id, title, url, description, kind, palette, techStack = []) => ({
    id,
    title,
    front: cardArt(kind, palette, false),
    painted: cardArt(kind, palette, true),
    url,
    description,
    techStack
});

export const GALLERY_PROJECTS = [
    makeProject(
        'resume-analyzer',
        'RESUME ANALYZER',
        'https://github.com/SudharshanYadav71/Resume-Analyzer',
        'A resume analysis project. Explore the source code, implementation, and setup instructions on GitHub.',
        'resume',
        { accent: '#5d9f9b', secondary: '#d8e9df', muted: '#e8d6b3', panel: '#fffaf0', screen: '#173a4d' }
    ),
    makeProject(
        'aigen-dashboard',
        'AIGEN DASHBOARD',
        'https://github.com/SudharshanYadav71/AIGEN-dash-board-creator',
        'An AI developer platform with a Gemini-powered copilot, live configuration editor, Firebase authentication, and downloadable architecture reports.',
        'aigen',
        { accent: '#8f6cbd', secondary: '#d9c9ed', muted: '#c9badf', panel: '#f5effb', screen: '#211a34' },
        [
            '/textures/gallery/reactlogo.webp',
            '/textures/gallery/tailwindlogo.webp',
            '/textures/gallery/firebaselogo.webp'
        ]
    ),
    makeProject(
        'persona-aware-rag',
        'PERSONA-AWARE RAG',
        'https://github.com/SudharshanYadav71/persona-aware-rag-assistant',
        'A privacy-first, offline AI assistant with adaptive persona detection, layered memory, and conflict-aware retrieval-augmented generation.',
        'rag',
        { accent: '#438d83', secondary: '#c9e2d9', muted: '#e7d4a9', panel: '#f2faf4', screen: '#163d3c' },
        [
            '/textures/gallery/reactlogo.webp',
            '/textures/gallery/jslogo.webp',
            '/textures/gallery/tailwindlogo.webp'
        ]
    ),
    makeProject(
        'data-warehouse',
        'DATA WAREHOUSE',
        'https://github.com/SudharshanYadav71/data-warehouse-project',
        'An end-to-end SQL Server analytics warehouse that integrates CRM and ERP data through Bronze, Silver, and Gold layers with data-quality checks.',
        'warehouse',
        { accent: '#ba9147', secondary: '#e8d9ae', muted: '#d9c78e', panel: '#fff9e9', screen: '#3b4736' }
    ),
    makeProject(
        'personal-assistant',
        'PERSONAL ASSISTANT',
        'https://github.com/SudharshanYadav71/personal_assistant',
        'A personal assistant project. Visit the GitHub repository for its source code and project details.',
        'assistant',
        { accent: '#b26b62', secondary: '#f0d7cb', muted: '#e9c5b7', panel: '#fff5ef', screen: '#4b2d38' }
    ),
    makeProject(
        'osteo-ai',
        'OSTEOAI',
        'https://github.com/Maahims7/OsteoAI',
        'An AI project with application source, dataset, and prediction test assets. See the repository for implementation details.',
        'osteo',
        { accent: '#518da5', secondary: '#d0e1e9', muted: '#c0d7e1', panel: '#f1f8fb', screen: '#243d49', dark: '#294958', light: '#d9f0f3' }
    )
];
