// Cache - Storage of the web, No need to reload
const CACHE_NAME = 'version-1';
const urlsToCache = ['index.html','offline.html'];

const self = this;
// Install serviceWorker
// Create a cache memory if not present so that even on reload user will be able to load something or other.
self.addEventListener('install',(event) =>{
    event.waitUntil(
        caches.open(CACHE_NAME) 
        .then((cache) => {
            console.log('Opened Cache');
            return cache.addAll(urlsToCache);

        })
    )
})
// Install for requests
self.addEventListener('fetch',(event) =>{ // fetching the request - whether it is a API call, request a IMG fetch
    event.respondWith( // respond it with the below thing on request 'fetch'.
        caches.match(event.request) // match  all the request that our page is recieving
        .then(() => {
            return fetch(event.request) // simply fetch all the request again to process the new request and get new data.
            .catch(() => caches.match('offline.html')) // in case of internet connection failure.

        })
    )
})
// activate serviceWorker
self.addEventListener('activate',(event) =>{
    // remove all the previous caches and keep the new ones.
    const cacheWhiteList =[];
    cacheWhiteList.push(CACHE_NAME);
    // we always want to keep CACHE_NAME:- version-1
    // and remove all the versions if created any
    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
                if (!cacheWhiteList.includes(cacheName)) { //keep only the specific cache version you need
                    return caches.delete(cacheName);
                }
            })
        ))
    )

})

