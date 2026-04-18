// Run: node fetch-places-photos.js
// Fetches real Google Places data for CentralTexas.online businesses

const https = require('https');
const path = require('path');
const API_KEY = process.env.GOOGLE_API_KEY || 'YOUR_API_KEY_HERE';

const businesses = [
  {slug:'sandis-moonwalks',          query:'Sandis Moonwalks 2505 Willow Way Round Rock TX'},
  {slug:'jump-around-party-rentals', query:'Jump Around Party Rentals 3616 Bass Loop Round Rock TX'},
  {slug:'hop-a-lot-moonwalks',       query:'Hop A Lot Moonwalks 1101 S Industrial Blvd Round Rock TX'},
  {slug:'we-bring-the-party',        query:'We Bring The Party LLC Florence TX'},
  {slug:'austin-water-slide-rentals',query:'Austin Water Slide Rentals Pflugerville TX'},
  {slug:'waco-bounce-house-rentals', query:'Waco Bounce House Rentals Eddy TX'},
  {slug:'round-rock-donuts',         query:'Round Rock Donuts 106 W Liberty Ave Round Rock TX'},
  {slug:'inner-space-cavern',        query:'Inner Space Cavern Georgetown TX'},
  {slug:'salt-lick-bbq-round-rock',  query:'Salt Lick BBQ Round Rock TX Dell Diamond'},
  {slug:'cedar-park-urgent-care',    query:'urgent care Cedar Park TX Whitestone'},
  {slug:'georgetown-square-restaurant',query:'Monument Cafe Georgetown TX'},
  {slug:'round-rock-family-dentistry',query:'family dentistry Round Rock TX'},
  {slug:'central-texas-auto-care',   query:'auto repair Pflugerville TX FM 685'},
  {slug:'killeen-family-health',     query:'family health primary care Killeen TX'},
  {slug:'central-texas-lawn',        query:'lawn care landscaping Round Rock TX'},
  {slug:'pflugerville-animal-clinic',query:'animal clinic veterinarian Pflugerville TX'},
  {slug:'temple-regional-fitness',   query:'gym fitness center Temple TX'},
  {slug:'hutto-community-library',   query:'Hutto Community Library TX'},
  {slug:'round-rock-premium-outlets',query:'Round Rock Premium Outlets TX'},
];

function post(data) {
  return new Promise((resolve,reject) => {
    const body=JSON.stringify(data);
    const req=https.request({hostname:'places.googleapis.com',path:'/v1/places:searchText',method:'POST',
      headers:{'Content-Type':'application/json','X-Goog-Api-Key':API_KEY,
        'X-Goog-FieldMask':'places.id,places.displayName,places.rating,places.userRatingCount,places.websiteUri,places.regularOpeningHours,places.nationalPhoneNumber,places.formattedAddress,places.photos'}},
      res=>{let d='';res.on('data',c=>d+=c);res.on('end',()=>{try{resolve(JSON.parse(d))}catch(e){resolve({})}})});
    req.on('error',reject);req.write(body);req.end();
  });
}

async function getPhotoUrl(name){
  return new Promise(resolve=>{
    https.request({hostname:'places.googleapis.com',path:`/v1/${name}/media?maxHeightPx=600&maxWidthPx=900&key=${API_KEY}`,method:'GET'},
      res=>resolve(res.headers['location']||'')).on('error',()=>resolve('')).end();
  });
}

async function run(){
  const results={};
  for(const biz of businesses){
    try{
      const data=await post({textQuery:biz.query,maxResultCount:1});
      const place=data.places?.[0];
      if(!place){console.error(`NOT FOUND: ${biz.slug}`);results[biz.slug]={found:false};await new Promise(r=>setTimeout(r,300));continue;}
      let photoUrl='';
      if(place.photos?.length>0) photoUrl=await getPhotoUrl(place.photos[0].name);
      results[biz.slug]={found:true,name:place.displayName?.text||'',address:place.formattedAddress||'',
        phone:place.nationalPhoneNumber||'',rating:place.rating||'',reviews:place.userRatingCount||'',
        website:place.websiteUri||'',photoUrl};
      console.log(`✓ ${biz.slug} — ${place.rating}★ (${place.userRatingCount} reviews) | photo: ${photoUrl?'YES':'none'}`);
    }catch(e){console.error(`ERROR ${biz.slug}: ${e.message}`);results[biz.slug]={found:false};}
    await new Promise(r=>setTimeout(r,400));
  }
  console.log('\n\n===RESULTS===');
  console.log(JSON.stringify(results,null,2));
  console.log('===END RESULTS===');
}
run();
