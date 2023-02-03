# Frontend app for interactive comment webpage build with next-js

## Description
- Works with designated api [available here](https://github.com/mako542b/nestjs-interactive-comments-backend)
- Implements auth flow by:
 + After initial login, access token is saved in app memory, and long lived refresh token is stored in http-only cookie
 + after access token expires, axios interceptor sends request to api endpoint responsible for refreshing access token and setting the user in app context
 + By loging-out, access token and user are erased from memory, and refresh token is invalidated by removing it on backend from data-base
- Extended solution for [frontend-mentor](frontendmentor.io/) challenge 'interactive comment section'

## instalation
To get the app running, just install dependencies(e.g npm install)