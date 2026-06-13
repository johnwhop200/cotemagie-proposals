/* Générateur des pages prestations Côté Magie (5 services × 2 thèmes A/B) + sitemap.
   Lancer : node assets/build-services.js  (depuis le dossier proposals) */
const fs = require('fs');
const path = require('path');
const OUT = __dirname.replace(/assets$/, '');

const W = 'https://static.wixstatic.com/media/';
const img = (id, q) => W + id + '/v1/fill/' + q + '/' + id.split('/')[0];
// helper: full wix url builder
const P = (file, fill) => `https://static.wixstatic.com/media/${file}/v1/fill/${fill}/${file.split('?')[0]}`;

const PH = {
  cartes_tour:   P('11062b_3c2000da010b4e65aeb2503806e32beb~mv2_d_3143_3182_s_4_2.jpg','w_600,h_600,al_c,q_80,enc_avif,quality_auto'),
  mariage:       P('da939b_4a3fa966bda74378802e375415340330~mv2.jpg','w_600,h_600,fp_0.50_0.50,q_90,enc_avif,quality_auto'),
  levitation:    P('389bb0c509874d0097e5216d39ee4561.jpg','w_800,h_340,al_c,q_80,enc_avif,quality_auto'),
  closeup_page:  P('da939b_16f7041e8a2e4b75a72afb893a68cbe4~mv2.jpg','w_800,h_800,q_90,enc_avif,quality_auto'),
  enfants1:      P('da939b_8ae7a5f265c148b5a5555b8dab20b752f003.jpg','w_600,h_600,q_90,enc_avif,quality_auto'),
  enfants2:      P('da939b_2a13356f237a48a0944e1f81e8ab6337~mv2.jpg','w_600,h_599,q_90,enc_avif,quality_auto'),
  enfants3:      P('da939b_c8780587f10745ba9fc30f920e225025~mv2.jpg','w_600,h_450,al_c,q_80,enc_avif,quality_auto'),
  aines1:        P('da939b_cab32b9108604efdb8e6f037e71bf2f3~mv2.jpg','w_600,h_444,al_c,q_80,enc_avif,quality_auto'),
  aines2:        P('da939b_035e16a7daa040a7bf1a2cf55e5cc42a~mv2.jpg','w_600,h_1067,fp_0.49_0.36,q_90,enc_avif,quality_auto'),
  aines3:        P('da939b_54d53ae0d9c041a0b009bd181f411782~mv2.jpg','w_600,h_1065,q_90,enc_avif,quality_auto'),
  ballons1:      P('da939b_85bb82a2f032455f8ddbdf296cd6b469~mv2.jpg','w_600,h_514,al_c,q_80,enc_avif,quality_auto'),
  ballons2:      P('da939b_9469ea3f0f134639a7b9ae4f8ac82182~mv2.jpg','w_600,h_600,fp_0.63_0.4,q_90,enc_avif,quality_auto'),
  ballons3:      P('da939b_d022c92ab706476482bdea23b20616f7~mv2.jpg','w_600,h_600,q_90,enc_avif,quality_auto'),
  ballons4:      P('da939b_efaf2241746540e9a9eb5b60fa135429~mv2.jpeg','w_600,h_600,q_90,enc_avif,quality_auto'),
  atelier1:      P('da939b_a674426ee1324c6aba6cf9f2b65e150d~mv2.jpg','w_600,h_600,q_90,enc_avif,quality_auto'),
  atelier2:      P('da939b_60454d8a54a14a069f6456b595723c8c~mv2.jpg','w_600,h_599,q_90,enc_avif,quality_auto'),
};

const SERVICES = [
 { slug:'close-up', icon:'♠', h1:'Close-up & magie de proximité',
   metaTitle:'Close-up à Issoudun — Magicien de proximité | Côté Magie',
   metaDesc:"Magie de close-up à Issoudun et dans l'Indre : cartes, pièces et objets sous vos yeux. Idéal mariages, cocktails et soirées d'entreprise. Devis gratuit.",
   lead:"La magie au creux de la main de vos invités, à quelques centimètres de leurs yeux.",
   serviceType:'Magie de close-up',
   paras:[
    "Le close-up, c'est une magie de proximité qui crée une ambiance conviviale, surprenante et bluffante, directement sous les yeux de vos invités. Cartes, pièces et objets du quotidien prennent vie à quelques centimètres.",
    "Tout peut se faire à table, en déambulation ou en formule fixe. C'est la magie idéale pour les repas, vins d'honneur, cocktails, événements d'entreprise, fêtes familiales, entre amis ou foires. Elle peut aussi être accompagnée de sculpture sur ballons et d'une partie scénique."],
   tip:"Idéal pendant un cocktail ou un vin d'honneur : Francis passe de groupe en groupe et brise la glace entre les invités.",
   bullets:["Mariages, cocktails et vins d'honneur","Soirées et séminaires d'entreprise","Repas de famille et fêtes entre amis","En déambulation ou à table"],
   photos:[[PH.cartes_tour,'Tour de cartes en close-up'],[PH.mariage,'Close-up lors d\'un mariage'],[PH.levitation,'Cartes en lévitation'],[PH.closeup_page,'Magie de proximité']] },
 { slug:'spectacles-enfants', icon:'♥', h1:'Spectacles de magie pour enfants',
   metaTitle:'Spectacle de magie pour enfants à Issoudun | Côté Magie',
   metaDesc:"Spectacle de magie pour enfants à Issoudun et dans l'Indre : 1 h de rires, de rêve et de participation. Anniversaires, écoles, arbres de Noël. Devis gratuit.",
   lead:"Un spectacle d'une heure plein de rires, de rêve et de participation, où les enfants deviennent acteurs.",
   serviceType:'Spectacle de magie pour enfants',
   paras:[
    "Francis propose un spectacle d'environ une heure, avec un répertoire adapté à l'âge des enfants et surtout une participation très active du jeune public. De spectateurs, ils deviennent acteurs de la magie.",
    "C'est un spectacle chaleureux et ludique, fait de rire, de rêve et d'émerveillement, qui peut être accompagné de sculpture sur ballons. Parfait pour les anniversaires, arbres de Noël, écoles, centres de loisirs et fêtes de famille."],
   tip:"Pour un anniversaire réussi : spectacle + sculpture sur ballons, chaque enfant repart avec sa création.",
   bullets:["Anniversaires et fêtes d'enfants","Arbres de Noël et comités d'entreprise","Écoles et centres de loisirs","Spectacle interactif d'environ 1 heure"],
   photos:[[PH.enfants1,'Spectacle de magie pour enfants'],[PH.enfants2,'Enfants participant au spectacle'],[PH.enfants3,'Enfants émerveillés']] },
 { slug:'magie-aines', icon:'♦', h1:'Magie pour les aînés',
   metaTitle:'Magie pour les aînés & EHPAD à Issoudun | Côté Magie',
   metaDesc:"Magie pour les aînés en EHPAD et maisons de retraite à Issoudun et dans l'Indre : close-up et spectacle intergénérationnel. Un moment de douceur. Devis gratuit.",
   lead:"Des émotions à tout âge : un moment de douceur, de souvenirs et de partage intergénérationnel.",
   serviceType:'Spectacle de magie pour les aînés',
   paras:[
    "La magie procure des émotions à tout âge. Francis intervient avec du close-up pendant un repas ou un goûter, ou avec un spectacle au répertoire adapté et intergénérationnel.",
    "En EHPAD, maison de retraite ou club seniors, c'est un moment convivial qui fédère aînés et enfants, ravive les souvenirs et fait briller les regards. Une vraie parenthèse de douceur et de sourires."],
   tip:"Format adaptable : tour de salle en close-up pendant le goûter, ou spectacle assis en salle commune.",
   bullets:["EHPAD et maisons de retraite","Clubs et résidences seniors","Close-up pendant un repas ou un goûter","Spectacle intergénérationnel adapté"],
   photos:[[PH.aines1,'Spectacle en maison de retraite'],[PH.aines2,'Close-up avec les aînés'],[PH.aines3,'Moment de partage']] },
 { slug:'sculpture-ballons', icon:'♣', h1:'Sculpture sur ballons',
   metaTitle:'Sculpture sur ballons à Issoudun | Côté Magie',
   metaDesc:"Sculpture sur ballons à Issoudun et dans l'Indre : animaux, fleurs et personnages pour foires, fêtes de village et événements familiaux. Devis gratuit.",
   lead:"Animaux, fleurs et personnages : des créations colorées qui font des heureux, petits et grands.",
   serviceType:'Sculpture sur ballons',
   paras:[
    "Plaisant à coup sûr aux enfants, la sculpture sur ballons anime vos foires, vos événements publics et privés, et peut même clôturer un spectacle de magie.",
    "Animaux, fleurs, épées, personnages : chaque création colorée est réalisée à la demande et offerte au public. Une animation joyeuse, idéale pour les fêtes de village, kermesses, inaugurations et événements familiaux."],
   tip:"Parfait en complément du close-up ou du spectacle enfants pour prolonger la magie.",
   bullets:["Foires, kermesses et fêtes de village","Événements publics et privés","En complément d'un spectacle","Créations à la demande pour les enfants"],
   photos:[[PH.ballons1,'Sculpture sur ballons'],[PH.ballons2,'Sculpture sur ballons en animation'],[PH.ballons3,'Création offerte à un enfant'],[PH.ballons4,'Ballons sculptés colorés']] },
 { slug:'ateliers-magie', icon:'★', h1:'Ateliers de magie',
   metaTitle:'Ateliers de magie pour enfants à Issoudun | Côté Magie',
   metaDesc:"Ateliers d'initiation à la magie pour enfants à Issoudun et dans l'Indre : tours faciles adaptés à l'âge. Écoles, centres de loisirs, team building. Devis gratuit.",
   lead:"Initier les magiciens en herbe avec des tours faciles… de quoi épater la famille et les amis !",
   serviceType:"Atelier d'initiation à la magie",
   paras:[
    "Ces ateliers ont pour objectif de faire découvrir et d'initier à la magie nos magiciens en herbe, au moyen de tours facilement réalisables. De quoi étonner ensuite la famille et les amis !",
    "Les tours sont adaptés à l'âge des participants. Les ateliers se mettent facilement en place dans toutes les structures accueillant des enfants : écoles, centres de loisirs, accueils périscolaires, ou encore en team building."],
   tip:"Chaque enfant repart avec ses premiers tours… et ses secrets de magicien.",
   bullets:["Écoles et accueils périscolaires","Centres de loisirs et centres aérés","Team building et animations d'entreprise","Tours adaptés à l'âge des participants"],
   photos:[[PH.atelier1,'Atelier d\'initiation à la magie'],[PH.atelier2,'Atelier de magie avec des enfants'],[PH.enfants1,'Apprentis magiciens']] },
];

const SITE = 'https://www.cotemagie.fr/';
const esc = s => s.replace(/&/g,'&amp;');

function page(svc, theme){
 const suf = theme==='a' ? 'a' : 'b';
 const home = theme==='a' ? '02-eventail-etoiles.html' : '02-eventail-3d.html';
 const bg = theme==='a'
   ? '<div class="sky" id="sky" aria-hidden="true"></div>'
   : '<div id="webgl" aria-hidden="true"></div>';
 const scripts = theme==='a'
   ? '<script src="assets/service.js" defer></script>'
   : '<script src="https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js" defer></script>\n<script src="assets/sky3d.js" defer></script>\n<script src="assets/service.js" defer></script>';
 const others = SERVICES.filter(s=>s.slug!==svc.slug).map(s=>
   `   <a class="ocard" href="${s.slug}-${suf}.html"><span class="oico">${s.icon}</span><span><b>${esc(s.h1)}</b><span>${esc(s.lead).slice(0,46)}…</span></span><span class="arrow">→</span></a>`).join('\n');
 const gallery = svc.photos.map(p=>`   <img src="${p[0]}" alt="${esc(p[1])} — Côté Magie, Issoudun" loading="lazy">`).join('\n');
 const bullets = svc.bullets.map(b=>`    <li>${esc(b)}</li>`).join('\n');
 const paras = svc.paras.map(p=>`   <p>${esc(p)}</p>`).join('\n');
 const canonical = SITE + svc.slug;
 const serviceLd = JSON.stringify({"@context":"https://schema.org","@type":"Service","name":svc.h1,"serviceType":svc.serviceType,"provider":{"@type":["LocalBusiness","EntertainmentBusiness"],"@id":SITE+"#business","name":"Côté Magie — Francis Darcy","telephone":"+33672118229","address":{"@type":"PostalAddress","streetAddress":"3 rue Serge Cligman","addressLocality":"Issoudun","postalCode":"36100","addressCountry":"FR"}},"areaServed":[{"@type":"AdministrativeArea","name":"Indre"},{"@type":"AdministrativeArea","name":"Centre-Val de Loire"}],"url":canonical});
 const crumbLd = JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Accueil","item":SITE},{"@type":"ListItem","position":2,"name":"Prestations","item":SITE+"#prestations"},{"@type":"ListItem","position":3,"name":svc.h1}]});

 return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(svc.metaTitle)}</title>
<meta name="description" content="${esc(svc.metaDesc)}">
<link rel="canonical" href="${canonical}">
<meta name="geo.region" content="FR-36"><meta name="geo.placename" content="Issoudun"><meta name="geo.position" content="46.94889;1.99389"><meta name="ICBM" content="46.94889, 1.99389">
<meta property="og:type" content="article"><meta property="og:locale" content="fr_FR"><meta property="og:site_name" content="Côté Magie">
<meta property="og:title" content="${esc(svc.h1)} — Côté Magie, magicien à Issoudun">
<meta property="og:description" content="${esc(svc.metaDesc)}">
<meta property="og:image" content="${svc.photos[0][0]}">
<meta property="og:url" content="${canonical}">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preconnect" href="https://static.wixstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/service.css">
<script type="application/ld+json">${serviceLd}</script>
<script type="application/ld+json">${crumbLd}</script>
</head>
<body data-theme="${suf}">
${bg}
<nav class="nav" id="nav">
 <a href="${home}" class="nav-logo">Côté Magie</a>
 <div class="nav-links">
  <a href="${home}#prestations">Prestations</a>
  <a href="${home}#evenements">Événements</a>
  <a href="${home}#temoignages">Avis</a>
  <a href="${home}#faq">FAQ</a>
  <a href="${home}#contact" class="nav-cta">Demander un devis</a>
 </div>
 <button class="nav-burger" id="navBurger" aria-label="Ouvrir le menu" aria-expanded="false"><span></span><span></span><span></span></button>
</nav>
<div class="nav-overlay" id="navOverlay"></div>
<aside class="nav-mobile" id="navMobile" aria-label="Menu">
 <a href="${home}">Accueil</a>
 <a href="${home}#prestations">Prestations</a>
 <a href="${home}#evenements">Événements</a>
 <a href="${home}#galerie">Galerie</a>
 <a href="${home}#temoignages">Avis</a>
 <a href="${home}#faq">FAQ</a>
 <a href="${home}#contact">Contact</a>
 <a href="tel:+33672118229" class="cta">Appeler le 06 72 11 82 29</a>
</aside>

<header class="shero">
 <p class="crumb"><a href="${home}">Accueil</a> &rsaquo; <a href="${home}#prestations">Prestations</a> &rsaquo; ${esc(svc.h1)}</p>
 <h1>${esc(svc.h1)}</h1>
 <p class="lead">${esc(svc.lead)}</p>
 <p class="loc">Magicien à Issoudun, dans l'Indre &amp; tout le Centre-Val de Loire</p>
 <div class="ctas">
  <a class="btn btn-or" href="${home}#contact">Demander un devis</a>
  <a class="btn btn-line" href="tel:+33672118229">06 72 11 82 29</a>
 </div>
</header>

<main>
<section class="rv">
 <div class="wrap prose">
${paras}
  <p class="tip">${esc(svc.tip)}</p>
  <h2>Pour quelles occasions&nbsp;?</h2>
  <ul>
${bullets}
  </ul>
 </div>
</section>

<section class="rv">
 <div class="wrap"><h2 style="text-align:center">En images</h2></div>
 <div class="sgal">
${gallery}
 </div>
</section>

<section class="others rv">
 <div class="wrap"><h2 style="text-align:center">Autres prestations</h2></div>
 <div class="others-grid">
${others}
 </div>
</section>

<section class="cta-band rv">
 <h2>Envie de magie pour votre événement&nbsp;?</h2>
 <p>Parlez-en à Francis : il vous répond personnellement et établit un devis gratuit sous 24&nbsp;heures.</p>
 <div class="ctas">
  <a class="btn btn-or" href="${home}#contact">Demander un devis</a>
  <a class="btn btn-line" href="tel:+33672118229">Appeler le 06 72 11 82 29</a>
 </div>
 <p class="reassur">Issoudun &middot; Indre &middot; Centre-Val de Loire &middot; déplacements France entière</p>
</section>
</main>

<footer>
 <p class="fname">CÔTÉ MAGIE</p>
 <p>Francis Darcy — Magicien professionnel à Issoudun</p>
 <div class="flinks">
  <a href="${home}">Accueil</a>
${SERVICES.map(s=>`  <a href="${s.slug}-${suf}.html">${esc(s.h1)}</a>`).join('\n')}
  <a href="${home}#contact">Contact</a>
 </div>
 <p>3 rue Serge Cligman, 36100 Issoudun &middot; <a href="tel:+33672118229">06 72 11 82 29</a> &middot; <a href="mailto:cotemagie@gmail.com">cotemagie@gmail.com</a></p>
 <p class="sign">Des rires, des sourires et des souvenirs…</p>
</footer>

<a class="fab" href="tel:+33672118229" aria-label="Appeler Francis Darcy">
 <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><path d="M6.6 10.8a15.6 15.6 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.2.4 2.4.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1l-2.2 2.2Z"/></svg>
 Appeler
</a>
${scripts}
</body>
</html>
`;
}

let count=0;
const urls=[];
for(const svc of SERVICES){
 for(const theme of ['a','b']){
  const f = `${svc.slug}-${theme}.html`;
  fs.writeFileSync(path.join(OUT, f), page(svc, theme), 'utf8');
  count++;
  urls.push(SITE+svc.slug); // canonical (dedup later)
 }
}

// sitemap.xml (URLs canoniques production)
const pages = [SITE, ...SERVICES.map(s=>SITE+s.slug)];
const today = process.env.BUILD_DATE || '2026-06-13';
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(u=>`  <url><loc>${u}</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>${u===SITE?'1.0':'0.8'}</priority></url>`).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(OUT,'sitemap.xml'), sitemap, 'utf8');

console.log('Pages générées : '+count+' + sitemap.xml');
