const cacheName = 'v2';
const cachedAssets = ['index.html',
'Contact_Us.html',
'About_Us.html',
'staff.html',
'reset.css',
'styles/about.css',
'styles/contact.css',
'styles/home.css',
'styles/staff.css',
'main.js'];

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
  e.respondWith(
    caches.match(e.request)
    .then(
      response => {
        console.log(response);
        if (response) {
          return response;
        };
        return fetch(e.request)
      })
      .catch(err => console.log(err))
  );
});