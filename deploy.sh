#!/bin/bash

hexo clean
hexo generate -f # re-generates the static assets
hexo deploy # deploys it to github pages