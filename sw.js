const cacheName = 'pwacachev1';
const filesToCache = [
    '/',
    '/index.html',
    '/styles/ud811.css',
    '/scripts/idb.js',
    '/scripts/app.js',
    '/favicon.ico',
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
    console.log('installing service worker')
  e.waitUntil( 
      caches.open(cacheName)
      .then(cache => {
          return cache.addAll(filesToCache)
      })
  )
})
self.addEventListener('activate', function(e){
    console.log('activating service worker')
    e.waitUntil(
        caches.keys().then(keyLIst => {
            return Promise.all(keyLIst.map(key => {
                if(key !== cacheName) {
                    return caches.delete(key)
                }
            }))
        })
    )
})

self.addEventListener('fetch', function(e) {
    console.log('fetching data')
    e.respondWith( 
        caches.match(e.request).then(response => {
            if(response) {
                return response ;
            }else {
                return fetch(e.request)
            }
        })
    )
})
