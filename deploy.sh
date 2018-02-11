#!/bin/bash

hexo clean
hexo generate -f # re-generates the static assets
sw-precache --config sw-config.js # creates the service worker
cp service-worker.js public # copies it to the static site folder
hexo deploy # deploys it to github pages