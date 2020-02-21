const cacheName = 'weather-pwaStatic-v2';
const dataToCache = 'weather-pwaData-v2';
let dataUrl = 'https://publicdata-weather.firebaseio.com/';
const filesToCache = [
    '/',
    '/index.html',
    '/styles/ud811.css',
    '/scripts/idb.js',
    '/scripts/app.js',
    '/manifest.json',
    '/images/clear.png',
    '/images/cloudy_s_sunny.png',
    '/images/cloudy-scattered-showers.png',
    '/images/cloudy.png',
    '/images/fog.png',
    '/images/ic_add_white_24px.svg',
    '/images/ic_refresh_white_24px.svg',
    '/images/partly-cloudy.png',
    '/images/rain.png',
    '/images/scattered-showers.png',
    '/images/sleet.png',
    '/images/snow.png',
    '/images/thunderstorm.png',
    '/images/wind.png'
]
self.addEventListener('install',function(e){  
  e.waitUntil( 
      caches.open(cacheName)
      .then(function(cache) {
          console.log('[ServiceWorker] Caching app shell')
          return cache.addAll(filesToCache)
      })
  )
})
self.addEventListener('activate', function(e){
   // console.log('[ServiceWorker] Activate');
    e.waitUntil(
        caches.keys().then(function(keyLIst){
            return Promise.all(keyLIst.map(key => {
                if(key !== cacheName && key !== dataToCache) {
                    //console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key)
                }
            }))
        })
    )
})

self.addEventListener('fetch', function(e) {
 if(e.request.url.startsWith(dataUrl)) {
     e.respondWith(
         fetch(e.request)
         .then(function(response){
             return caches.open(dataToCache).then(function(cache){
                 cache.put(e.request.url,response.clone());
                 //console.log('[ServiceWorker] Fetched & Cached', e.request.url);
                 return response;
             })
         })
     )
 } else {
     e.respondWith(
         caches.match(e.request).then(function(response){
            //console.log('[ServiceWorker] Fetch Only', e.request.url);
             return response || fetch(e.request)
         })
     )
 }
})
