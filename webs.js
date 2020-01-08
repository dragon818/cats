const cacheName = 'v7';
const cachedAssets = ['index.html',
'Contact_Us.html',
'staff.html',
'reset.css',
'styles/about.css',
'styles/contact.css',
'styles/home.css',
'styles/staff.css',
'main.js',
'http://www.iconarchive.com/download/i103367/paomedia/small-n-flat/cat.ico',
'http://placekitten.com/225/175',
'http://placekitten.com/225/176',
'http://placekitten.com/224/175',
'http://placekitten.com/175/175'];

self.addEventListener('install', e => {
  console.log('install');
  e.waitUntil(
    caches.open(cacheName).then(cache => { return cache.addAll(cachedAssets);})
    .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  console.log('avtivate');
  e.waitUntil(
    Promise.all([
      clients.claim(), 
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cache => {
            if (cache !== cacheName) {
              return caches.delete(cache);
            }
          })
        )
        }
      )
    ])
  )
});

self.addEventListener('fetch', e => {
  console.log('fetch');
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});