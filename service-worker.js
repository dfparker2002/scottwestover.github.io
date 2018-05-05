/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/2017/12/01/Unity-2D-Snake-Tutorial-Part-1/apple.png","47a884df9607193951ad2053e5ad02db"],["/2017/12/01/Unity-2D-Snake-Tutorial-Part-1/index.html","4a2613224a64b24ef941b5c20b5bfa80"],["/2017/12/01/Unity-2D-Snake-Tutorial-Part-1/screenShot1.png","fbed88dc8e214d542119fa01454841a2"],["/2017/12/01/Unity-2D-Snake-Tutorial-Part-1/screenShot10.png","d14c90c99b1344f69d728f1fdd02e8fc"],["/2017/12/01/Unity-2D-Snake-Tutorial-Part-1/screenShot11.png","b00cd7298b401297d0fcbe89a885ff47"],["/2017/12/01/Unity-2D-Snake-Tutorial-Part-1/screenShot12.png","7a6dc3daa94385a37048c441c89ee04e"],["/2017/12/01/Unity-2D-Snake-Tutorial-Part-1/screenShot13.png","d5d120db8787b84a71a5b2d38a134852"],["/2017/12/01/Unity-2D-Snake-Tutorial-Part-1/screenShot14.png","9a7903bce99400afa7c130e1e1b2b39e"],["/2017/12/01/Unity-2D-Snake-Tutorial-Part-1/screenShot15.png","0d7a9d07d9b1c6e9fb260925fd549814"],["/2017/12/01/Unity-2D-Snake-Tutorial-Part-1/screenShot2.png","8fc754a9b616dad44efeb4e76bca8ef4"],["/2017/12/01/Unity-2D-Snake-Tutorial-Part-1/screenShot3.png","eebf1c51550add32379a44c6989b9f0d"],["/2017/12/01/Unity-2D-Snake-Tutorial-Part-1/screenShot4.png","8e92e0cd23e60322bc7fef5d67175ff1"],["/2017/12/01/Unity-2D-Snake-Tutorial-Part-1/screenShot5.png","5b6bdb7117c654835f9fc31fe95732cf"],["/2017/12/01/Unity-2D-Snake-Tutorial-Part-1/screenShot6.png","d6cab24353b93f8410886c01296f187e"],["/2017/12/01/Unity-2D-Snake-Tutorial-Part-1/screenShot7.png","f0b9d87fbd1f47057edaadde0cb4102b"],["/2017/12/01/Unity-2D-Snake-Tutorial-Part-1/screenShot8.png","bc66e8c7a4ec6bc2b1f50c2338632f95"],["/2017/12/01/Unity-2D-Snake-Tutorial-Part-1/screenShot9.png","6519de9bd75d0b428c7e4e0631fa2a0e"],["/2017/12/01/Unity-2D-Snake-Tutorial-Part-1/snake.png","112caf039fc5d07e58e8ed8b711b2878"],["/2018/02/08/Switching-to-Hexo/index.html","9d808a420a1b50db139ad557af33b7ab"],["/2018/02/10/Progressive-Web-App/index.html","718e0be85de443b1894ac437fcd001e5"],["/2018/02/11/Phaser-3-Release/index.html","df81df925f05df5a52109e04cdf5242f"],["/2018/02/14/Phaser3-Create-a-simple-preloader/1.png","8e0b06079dedaeb9415b79553164aa04"],["/2018/02/14/Phaser3-Create-a-simple-preloader/2.png","6e326a50faba0022c16293a50f71b5b7"],["/2018/02/14/Phaser3-Create-a-simple-preloader/index.html","6be70dda3df401a34cdd2af8a08986ba"],["/2018/02/14/Phaser3-Create-a-simple-preloader/logo.png","895ceb8ed81797129ff6372e8e413d1c"],["/2018/04/20/Creating-A-Preloader-Screen-In-Phaser-3-Tutorial/1.png","5c4f5687b49846b992840f1933a0549f"],["/2018/04/20/Creating-A-Preloader-Screen-In-Phaser-3-Tutorial/index.html","603986047cab79ee328679c611fb0701"],["/archives/index.html","144b60a4c2879c56db8b3851da4cac71"],["/css/apollo.css","24c0b04d4f64aac12918d57c688dbb86"],["/favicon.png","8f03a5daec1c1aec2f99e70f83851e31"],["/images/icons/icon-128x128.png","0142e8971e8b062df74ff7422243ad9b"],["/images/icons/icon-144x144.png","f115be11335451bf8d3b8ddfe3438f3e"],["/images/icons/icon-152x152.png","78bdf9a2830431e1176ced5b7a47a908"],["/images/icons/icon-192x192.png","e1e4ec22115502446f8391035ba1a469"],["/images/icons/icon-384x384.png","5e86dd1c8d4f8515040390c1af977ffc"],["/images/icons/icon-512x512.png","f6b6193c152280181635e0f8e8a2965f"],["/images/icons/icon-72x72.png","88a15f71d8233bfaec01432f02e63e4a"],["/images/icons/icon-96x96.png","b6b9434aa4d4c1fe751f8d79fa77b6a6"],["/index.html","218f7fbcb71d54e592ecf186826aa336"],["/js/sw-register.js","f6375a386419b3a4a96577ca9cfcac77"],["/tag/index.html","07fd591898910b73e83100bafa694a30"],["/tags/Game-Development-PhaserJS-Tutorial/index.html","07fd591898910b73e83100bafa694a30"],["/tags/Game-Development-PhaserJS/index.html","07fd591898910b73e83100bafa694a30"],["/tags/Misc/index.html","07fd591898910b73e83100bafa694a30"]];
var cacheName = 'sw-precache-v3-sw-precache-' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







