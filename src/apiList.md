# Devtinder API

# Auth Router
- POST /signup
- POST /login
- POST /logout

# Profile Router
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

# connection Request Router
- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

# user Router
- GET /user/connections
- GET /user/request
- GET /user/feed - Gets you the profile of other users on platform
