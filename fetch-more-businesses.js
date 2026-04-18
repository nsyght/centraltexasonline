// CentralTexas.online — Business Discovery Script (EXPANDED)
// Run: node fetch-more-businesses.js
// Returns up to 5 results per search across 200+ searches = 1000+ potential businesses
// Paste ===RESULTS=== block to Claude when done

const https = require('https');
const API_KEY = 'AIzaSyA30yZf9i-SJffMIsOjfpPpCylr688bd1A';

const searches = [
  // ── ROUND ROCK ────────────────────────────────────────────────────────────
  { label: 'rr-bbq',          query: 'BBQ restaurant Round Rock TX' },
  { label: 'rr-mexican',      query: 'Mexican restaurant Round Rock TX' },
  { label: 'rr-italian',      query: 'Italian restaurant Round Rock TX' },
  { label: 'rr-pizza',        query: 'pizza restaurant Round Rock TX' },
  { label: 'rr-burgers',      query: 'burger restaurant Round Rock TX' },
  { label: 'rr-sushi',        query: 'sushi restaurant Round Rock TX' },
  { label: 'rr-breakfast',    query: 'breakfast restaurant Round Rock TX' },
  { label: 'rr-coffee',       query: 'coffee shop cafe Round Rock TX' },
  { label: 'rr-chinese',      query: 'Chinese restaurant Round Rock TX' },
  { label: 'rr-indian',       query: 'Indian restaurant Round Rock TX' },
  { label: 'rr-auto',         query: 'auto repair shop Round Rock TX' },
  { label: 'rr-tire',         query: 'tire shop Round Rock TX' },
  { label: 'rr-carwash',      query: 'car wash Round Rock TX' },
  { label: 'rr-body-shop',    query: 'auto body shop Round Rock TX' },
  { label: 'rr-dentist',      query: 'dentist Round Rock TX' },
  { label: 'rr-orthodontist', query: 'orthodontist Round Rock TX' },
  { label: 'rr-eye-doctor',   query: 'optometrist eye doctor Round Rock TX' },
  { label: 'rr-chiropractor', query: 'chiropractor Round Rock TX' },
  { label: 'rr-physical-therapy', query: 'physical therapy Round Rock TX' },
  { label: 'rr-pediatrician', query: 'pediatrician Round Rock TX' },
  { label: 'rr-urgent-care',  query: 'urgent care Round Rock TX' },
  { label: 'rr-gym',          query: 'gym fitness center Round Rock TX' },
  { label: 'rr-yoga',         query: 'yoga studio Round Rock TX' },
  { label: 'rr-martial-arts', query: 'martial arts karate Round Rock TX' },
  { label: 'rr-salon',        query: 'hair salon Round Rock TX' },
  { label: 'rr-barbershop',   query: 'barbershop Round Rock TX' },
  { label: 'rr-nail-salon',   query: 'nail salon Round Rock TX' },
  { label: 'rr-spa',          query: 'spa massage Round Rock TX' },
  { label: 'rr-vet',          query: 'veterinarian animal clinic Round Rock TX' },
  { label: 'rr-plumber',      query: 'plumber plumbing Round Rock TX' },
  { label: 'rr-electrician',  query: 'electrician Round Rock TX' },
  { label: 'rr-hvac',         query: 'HVAC air conditioning Round Rock TX' },
  { label: 'rr-roofing',      query: 'roofing contractor Round Rock TX' },
  { label: 'rr-lawn',         query: 'lawn care landscaping Round Rock TX' },
  { label: 'rr-pest',         query: 'pest control Round Rock TX' },
  { label: 'rr-real-estate',  query: 'real estate agent Round Rock TX' },
  { label: 'rr-insurance',    query: 'insurance agency Round Rock TX' },
  { label: 'rr-tutoring',     query: 'tutoring learning center Round Rock TX' },
  { label: 'rr-daycare',      query: 'daycare childcare Round Rock TX' },
  { label: 'rr-pharmacy',     query: 'pharmacy Round Rock TX' },

  // ── PFLUGERVILLE ──────────────────────────────────────────────────────────
  { label: 'pfl-bbq',         query: 'BBQ restaurant Pflugerville TX' },
  { label: 'pfl-mexican',     query: 'Mexican restaurant Pflugerville TX' },
  { label: 'pfl-pizza',       query: 'pizza Pflugerville TX' },
  { label: 'pfl-coffee',      query: 'coffee shop Pflugerville TX' },
  { label: 'pfl-breakfast',   query: 'breakfast Pflugerville TX' },
  { label: 'pfl-auto',        query: 'auto repair Pflugerville TX' },
  { label: 'pfl-tire',        query: 'tire shop Pflugerville TX' },
  { label: 'pfl-dentist',     query: 'dentist Pflugerville TX' },
  { label: 'pfl-urgent-care', query: 'urgent care Pflugerville TX' },
  { label: 'pfl-gym',         query: 'gym fitness Pflugerville TX' },
  { label: 'pfl-salon',       query: 'hair salon Pflugerville TX' },
  { label: 'pfl-nail-salon',  query: 'nail salon Pflugerville TX' },
  { label: 'pfl-vet',         query: 'veterinarian Pflugerville TX' },
  { label: 'pfl-lawn',        query: 'lawn care Pflugerville TX' },
  { label: 'pfl-hvac',        query: 'HVAC air conditioning Pflugerville TX' },
  { label: 'pfl-daycare',     query: 'daycare childcare Pflugerville TX' },

  // ── CEDAR PARK ────────────────────────────────────────────────────────────
  { label: 'cp-bbq',          query: 'BBQ restaurant Cedar Park TX' },
  { label: 'cp-mexican',      query: 'Mexican restaurant Cedar Park TX' },
  { label: 'cp-pizza',        query: 'pizza Cedar Park TX' },
  { label: 'cp-coffee',       query: 'coffee shop Cedar Park TX' },
  { label: 'cp-sushi',        query: 'sushi Cedar Park TX' },
  { label: 'cp-breakfast',    query: 'breakfast Cedar Park TX' },
  { label: 'cp-auto',         query: 'auto repair Cedar Park TX' },
  { label: 'cp-tire',         query: 'tire shop Cedar Park TX' },
  { label: 'cp-dentist',      query: 'dentist Cedar Park TX' },
  { label: 'cp-orthodontist', query: 'orthodontist Cedar Park TX' },
  { label: 'cp-urgent-care',  query: 'urgent care Cedar Park TX' },
  { label: 'cp-chiropractor', query: 'chiropractor Cedar Park TX' },
  { label: 'cp-gym',          query: 'gym fitness Cedar Park TX' },
  { label: 'cp-yoga',         query: 'yoga studio Cedar Park TX' },
  { label: 'cp-salon',        query: 'hair salon Cedar Park TX' },
  { label: 'cp-nail-salon',   query: 'nail salon Cedar Park TX' },
  { label: 'cp-spa',          query: 'spa massage Cedar Park TX' },
  { label: 'cp-vet',          query: 'veterinarian Cedar Park TX' },
  { label: 'cp-lawn',         query: 'lawn care Cedar Park TX' },
  { label: 'cp-hvac',         query: 'HVAC Cedar Park TX' },
  { label: 'cp-roofing',      query: 'roofing contractor Cedar Park TX' },
  { label: 'cp-daycare',      query: 'daycare Cedar Park TX' },

  // ── GEORGETOWN ────────────────────────────────────────────────────────────
  { label: 'geo-bbq',         query: 'BBQ restaurant Georgetown TX' },
  { label: 'geo-mexican',     query: 'Mexican restaurant Georgetown TX' },
  { label: 'geo-pizza',       query: 'pizza Georgetown TX' },
  { label: 'geo-coffee',      query: 'coffee shop Georgetown TX' },
  { label: 'geo-breakfast',   query: 'breakfast Georgetown TX' },
  { label: 'geo-italian',     query: 'Italian restaurant Georgetown TX' },
  { label: 'geo-auto',        query: 'auto repair Georgetown TX' },
  { label: 'geo-tire',        query: 'tire shop Georgetown TX' },
  { label: 'geo-dentist',     query: 'dentist Georgetown TX' },
  { label: 'geo-urgent-care', query: 'urgent care Georgetown TX' },
  { label: 'geo-chiropractor',query: 'chiropractor Georgetown TX' },
  { label: 'geo-gym',         query: 'gym fitness Georgetown TX' },
  { label: 'geo-salon',       query: 'hair salon Georgetown TX' },
  { label: 'geo-nail-salon',  query: 'nail salon Georgetown TX' },
  { label: 'geo-vet',         query: 'veterinarian Georgetown TX' },
  { label: 'geo-lawn',        query: 'lawn care Georgetown TX' },
  { label: 'geo-hvac',        query: 'HVAC Georgetown TX' },
  { label: 'geo-roofing',     query: 'roofing Georgetown TX' },
  { label: 'geo-daycare',     query: 'daycare Georgetown TX' },
  { label: 'geo-real-estate', query: 'real estate Georgetown TX' },

  // ── LEANDER ───────────────────────────────────────────────────────────────
  { label: 'lea-bbq',         query: 'BBQ restaurant Leander TX' },
  { label: 'lea-mexican',     query: 'Mexican restaurant Leander TX' },
  { label: 'lea-pizza',       query: 'pizza Leander TX' },
  { label: 'lea-coffee',      query: 'coffee shop Leander TX' },
  { label: 'lea-auto',        query: 'auto repair Leander TX' },
  { label: 'lea-dentist',     query: 'dentist Leander TX' },
  { label: 'lea-urgent-care', query: 'urgent care Leander TX' },
  { label: 'lea-gym',         query: 'gym Leander TX' },
  { label: 'lea-salon',       query: 'hair salon Leander TX' },
  { label: 'lea-nail-salon',  query: 'nail salon Leander TX' },
  { label: 'lea-vet',         query: 'veterinarian Leander TX' },
  { label: 'lea-lawn',        query: 'lawn care Leander TX' },
  { label: 'lea-daycare',     query: 'daycare Leander TX' },

  // ── HUTTO ─────────────────────────────────────────────────────────────────
  { label: 'hut-bbq',         query: 'BBQ Hutto TX' },
  { label: 'hut-mexican',     query: 'Mexican restaurant Hutto TX' },
  { label: 'hut-pizza',       query: 'pizza Hutto TX' },
  { label: 'hut-coffee',      query: 'coffee shop Hutto TX' },
  { label: 'hut-auto',        query: 'auto repair Hutto TX' },
  { label: 'hut-dentist',     query: 'dentist Hutto TX' },
  { label: 'hut-gym',         query: 'gym fitness Hutto TX' },
  { label: 'hut-salon',       query: 'hair salon Hutto TX' },
  { label: 'hut-nail-salon',  query: 'nail salon Hutto TX' },
  { label: 'hut-vet',         query: 'veterinarian Hutto TX' },
  { label: 'hut-lawn',        query: 'lawn care Hutto TX' },

  // ── TAYLOR ────────────────────────────────────────────────────────────────
  { label: 'tay-bbq',         query: 'BBQ Taylor TX' },
  { label: 'tay-mexican',     query: 'Mexican restaurant Taylor TX' },
  { label: 'tay-pizza',       query: 'pizza Taylor TX' },
  { label: 'tay-coffee',      query: 'coffee shop Taylor TX' },
  { label: 'tay-auto',        query: 'auto repair Taylor TX' },
  { label: 'tay-dentist',     query: 'dentist Taylor TX' },
  { label: 'tay-salon',       query: 'hair salon Taylor TX' },
  { label: 'tay-vet',         query: 'veterinarian Taylor TX' },

  // ── KILLEEN ───────────────────────────────────────────────────────────────
  { label: 'kil-bbq',         query: 'BBQ restaurant Killeen TX' },
  { label: 'kil-mexican',     query: 'Mexican restaurant Killeen TX' },
  { label: 'kil-pizza',       query: 'pizza Killeen TX' },
  { label: 'kil-coffee',      query: 'coffee shop Killeen TX' },
  { label: 'kil-breakfast',   query: 'breakfast Killeen TX' },
  { label: 'kil-sushi',       query: 'sushi Killeen TX' },
  { label: 'kil-chinese',     query: 'Chinese restaurant Killeen TX' },
  { label: 'kil-auto',        query: 'auto repair Killeen TX' },
  { label: 'kil-tire',        query: 'tire shop Killeen TX' },
  { label: 'kil-body-shop',   query: 'auto body shop Killeen TX' },
  { label: 'kil-dentist',     query: 'dentist Killeen TX' },
  { label: 'kil-urgent-care', query: 'urgent care Killeen TX' },
  { label: 'kil-chiropractor',query: 'chiropractor Killeen TX' },
  { label: 'kil-gym',         query: 'gym fitness Killeen TX' },
  { label: 'kil-yoga',        query: 'yoga Killeen TX' },
  { label: 'kil-salon',       query: 'hair salon Killeen TX' },
  { label: 'kil-barbershop',  query: 'barbershop Killeen TX' },
  { label: 'kil-nail-salon',  query: 'nail salon Killeen TX' },
  { label: 'kil-vet',         query: 'veterinarian Killeen TX' },
  { label: 'kil-lawn',        query: 'lawn care Killeen TX' },
  { label: 'kil-hvac',        query: 'HVAC Killeen TX' },
  { label: 'kil-daycare',     query: 'daycare Killeen TX' },
  { label: 'kil-real-estate', query: 'real estate Killeen TX' },

  // ── TEMPLE ────────────────────────────────────────────────────────────────
  { label: 'tem-bbq',         query: 'BBQ restaurant Temple TX' },
  { label: 'tem-mexican',     query: 'Mexican restaurant Temple TX' },
  { label: 'tem-pizza',       query: 'pizza Temple TX' },
  { label: 'tem-coffee',      query: 'coffee shop Temple TX' },
  { label: 'tem-breakfast',   query: 'breakfast Temple TX' },
  { label: 'tem-chinese',     query: 'Chinese restaurant Temple TX' },
  { label: 'tem-auto',        query: 'auto repair Temple TX' },
  { label: 'tem-tire',        query: 'tire shop Temple TX' },
  { label: 'tem-dentist',     query: 'dentist Temple TX' },
  { label: 'tem-orthodontist',query: 'orthodontist Temple TX' },
  { label: 'tem-urgent-care', query: 'urgent care Temple TX' },
  { label: 'tem-chiropractor',query: 'chiropractor Temple TX' },
  { label: 'tem-gym',         query: 'gym fitness Temple TX' },
  { label: 'tem-salon',       query: 'hair salon Temple TX' },
  { label: 'tem-nail-salon',  query: 'nail salon Temple TX' },
  { label: 'tem-vet',         query: 'veterinarian Temple TX' },
  { label: 'tem-lawn',        query: 'lawn care Temple TX' },
  { label: 'tem-hvac',        query: 'HVAC Temple TX' },
  { label: 'tem-daycare',     query: 'daycare Temple TX' },

  // ── WACO ──────────────────────────────────────────────────────────────────
  { label: 'wco-bbq',         query: 'BBQ restaurant Waco TX' },
  { label: 'wco-mexican',     query: 'Mexican restaurant Waco TX' },
  { label: 'wco-pizza',       query: 'pizza Waco TX' },
  { label: 'wco-coffee',      query: 'coffee shop Waco TX' },
  { label: 'wco-breakfast',   query: 'breakfast Waco TX' },
  { label: 'wco-sushi',       query: 'sushi Waco TX' },
  { label: 'wco-auto',        query: 'auto repair Waco TX' },
  { label: 'wco-tire',        query: 'tire shop Waco TX' },
  { label: 'wco-dentist',     query: 'dentist Waco TX' },
  { label: 'wco-urgent-care', query: 'urgent care Waco TX' },
  { label: 'wco-gym',         query: 'gym fitness Waco TX' },
  { label: 'wco-salon',       query: 'hair salon Waco TX' },
  { label: 'wco-nail-salon',  query: 'nail salon Waco TX' },
  { label: 'wco-vet',         query: 'veterinarian Waco TX' },
  { label: 'wco-lawn',        query: 'lawn care Waco TX' },
  { label: 'wco-real-estate', query: 'real estate Waco TX' },

  // ── BUDA & KYLE ───────────────────────────────────────────────────────────
  { label: 'bud-bbq',         query: 'BBQ restaurant Buda TX' },
  { label: 'bud-mexican',     query: 'Mexican restaurant Buda TX' },
  { label: 'bud-auto',        query: 'auto repair Buda TX' },
  { label: 'bud-dentist',     query: 'dentist Buda TX' },
  { label: 'bud-salon',       query: 'hair salon Buda TX' },
  { label: 'kyle-bbq',        query: 'BBQ restaurant Kyle TX' },
  { label: 'kyle-mexican',    query: 'Mexican restaurant Kyle TX' },
  { label: 'kyle-auto',       query: 'auto repair Kyle TX' },
  { label: 'kyle-dentist',    query: 'dentist Kyle TX' },
  { label: 'kyle-gym',        query: 'gym fitness Kyle TX' },
  { label: 'kyle-salon',      query: 'hair salon Kyle TX' },

  // ── LIBERTY HILL ──────────────────────────────────────────────────────────
  { label: 'lh-restaurant',   query: 'restaurant Liberty Hill TX' },
  { label: 'lh-auto',         query: 'auto repair Liberty Hill TX' },
  { label: 'lh-salon',        query: 'hair salon Liberty Hill TX' },

  // ── SAN MARCOS ────────────────────────────────────────────────────────────
  { label: 'sm-bbq',          query: 'BBQ restaurant San Marcos TX' },
  { label: 'sm-mexican',      query: 'Mexican restaurant San Marcos TX' },
  { label: 'sm-coffee',       query: 'coffee shop San Marcos TX' },
  { label: 'sm-auto',         query: 'auto repair San Marcos TX' },
  { label: 'sm-dentist',      query: 'dentist San Marcos TX' },
  { label: 'sm-gym',          query: 'gym San Marcos TX' },
  { label: 'sm-salon',        query: 'hair salon San Marcos TX' },

  // ── BASTROP ───────────────────────────────────────────────────────────────
  { label: 'bas-restaurant',  query: 'restaurant Bastrop TX' },
  { label: 'bas-bbq',         query: 'BBQ Bastrop TX' },
  { label: 'bas-auto',        query: 'auto repair Bastrop TX' },
  { label: 'bas-salon',       query: 'hair salon Bastrop TX' },

  // ── MARBLE FALLS / BURNET ─────────────────────────────────────────────────
  { label: 'mf-restaurant',   query: 'restaurant Marble Falls TX' },
  { label: 'mf-bbq',          query: 'BBQ Marble Falls TX' },
  { label: 'mf-auto',         query: 'auto repair Marble Falls TX' },
  { label: 'bur-restaurant',  query: 'restaurant Burnet TX' },
  { label: 'bur-auto',        query: 'auto repair Burnet TX' },

  // ── LOCKHART (BBQ Capital of Texas!) ─────────────────────────────────────
  { label: 'lck-bbq',         query: 'BBQ restaurant Lockhart TX' },
  { label: 'lck-restaurant',  query: 'restaurant Lockhart TX' },

  // ── HARKER HEIGHTS & BELTON ───────────────────────────────────────────────
  { label: 'hh-restaurant',   query: 'restaurant Harker Heights TX' },
  { label: 'hh-auto',         query: 'auto repair Harker Heights TX' },
  { label: 'hh-salon',        query: 'hair salon Harker Heights TX' },
  { label: 'bel-restaurant',  query: 'restaurant Belton TX' },
  { label: 'bel-auto',        query: 'auto repair Belton TX' },
];

function searchPlaces(query) {
  return new Promise((resolve) => {
    const body = JSON.stringify({ textQuery: query, maxResultCount: 5 });
    const req = https.request({
      hostname: 'places.googleapis.com',
      path: '/v1/places:searchText',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': API_KEY,
        'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.nationalPhoneNumber,places.websiteUri,places.rating,places.userRatingCount,places.regularOpeningHours,places.types,places.photos'
      }
    }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed.error) console.error(`  ⚠ API error for "${query}": ${parsed.error.message}`);
          resolve(parsed);
        } catch (e) { resolve({}); }
      });
    });
    req.on('error', err => { console.error(`  ⚠ Network error: ${err.message}`); resolve({}); });
    req.write(body);
    req.end();
  });
}

function getPhotoUrl(photoName) {
  return new Promise(resolve => {
    https.request(
      { hostname: 'places.googleapis.com', path: `/v1/${photoName}/media?maxHeightPx=400&maxWidthPx=600&key=${API_KEY}`, method: 'GET' },
      res => resolve(res.headers['location'] || '')
    ).on('error', () => resolve('')).end();
  });
}

function formatHours(periods) {
  if (!periods || !periods.length) return '';
  const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const fmt = (h, m) => `${h%12||12}${m?':'+String(m).padStart(2,'0'):''}${h<12?'am':'pm'}`;
  return periods.map(p =>
    `${days[p.open?.day??0]}: ${fmt(p.open?.hour??0,p.open?.minute??0)}–${fmt(p.close?.hour??0,p.close?.minute??0)}`
  ).join(', ');
}

async function run() {
  console.log('\n🤠 CentralTexas.online — Expanded Business Discovery');
  console.log(`   ${searches.length} searches × up to 5 results = up to ${searches.length * 5} businesses`);
  console.log(`   Estimated time: ~${Math.round(searches.length * 0.35 / 60)} minutes\n`);
  console.log('Testing API key...');

  const test = await searchPlaces('Round Rock Texas');
  if (test.error) {
    console.error(`\n❌ API KEY ERROR: ${test.error.message}`);
    console.error('   Make sure Places API (New) is enabled in Google Cloud Console.\n');
    process.exit(1);
  }
  console.log(`✅ Key works! Starting ${searches.length} searches...\n`);

  const results = {};
  let total = 0;

  for (let i = 0; i < searches.length; i++) {
    const search = searches[i];
    const data = await searchPlaces(search.query);
    const places = data.places || [];
    results[search.label] = [];

    for (const place of places) {
      let photoUrl = '';
      if (place.photos?.length) photoUrl = await getPhotoUrl(place.photos[0].name);
      results[search.label].push({
        name:    place.displayName?.text || '',
        address: place.formattedAddress || '',
        phone:   place.nationalPhoneNumber || '',
        rating:  place.rating || '',
        reviews: place.userRatingCount || 0,
        website: place.websiteUri || '',
        hours:   formatHours(place.regularOpeningHours?.periods),
        types:   (place.types || []).slice(0,3).join(', '),
        photoUrl,
      });
      total++;
    }

    const n = results[search.label].length;
    const pct = Math.round(((i+1)/searches.length)*100);
    const names = results[search.label].map(b => b.name).join(', ');
    console.log(`[${pct}%] ✓ ${search.label}: ${n} found — ${names || 'none'}`);

    await new Promise(r => setTimeout(r, 350));
  }

  console.log(`\n✅ Complete! ${total} businesses found across ${searches.length} searches`);
  console.log('\n===RESULTS===');
  console.log(JSON.stringify(results, null, 2));
  console.log('===END RESULTS===');
  console.log('\n📋 Copy everything between ===RESULTS=== and ===END RESULTS=== and paste to Claude.');
}

run();
