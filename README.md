# ELYOM Backend

Backend for ELYOM's Meta integrations.

## Current endpoints

- `GET /` — health check
- `GET /webhook` — Meta webhook verification
- `POST /webhook` — receives Meta webhook events

## Environment variables

Copy `.env.example` to `.env` locally and configure:

- `META_VERIFY_TOKEN`: a private verification token chosen by ELYOM.
- `PORT`: optional; hosting platforms normally provide this automatically.

Never commit access tokens, app secrets, or the real `.env` file.

## Local start

```bash
npm install
npm start
```

## Meta webhook

After deploying this repository to a public HTTPS hosting service, configure Meta with:

- Callback URL: `https://YOUR-DOMAIN/webhook`
- Verify token: exactly the same value as `META_VERIFY_TOKEN` on the hosting service.

The next phase is to connect Instagram, Messenger and WhatsApp credentials and implement the corresponding event handlers.
