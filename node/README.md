# Barc.com single-sign-on with node.js

This example explains how to integrate Barc's embedded chat with your node.js
application.

Barc offers many plans. We'll go over the dedicated/enterprise plan. The
document details the steps needed to do single-sign-on to give your userss the
best experience possible.

## Setup

1.  Request dedicated plan from Barc.
2.  Barc does the following

    *   Provision one or more dedicated servers based on your
        company's bandwidth. These servers are isolated and
        locked down.
    *   Provides the following credentials which should never be
        made public

        *   ClientId - ID that is uninque to you
        *   ClientSecret - Cryptographically strong secret
        *   DedicatedHost - Your dedicated server information

## Integration Flow

Barc refers to the dedicated host.

1.  User -> Your Server: view page with chat

2.  Your Server -> Barc: send ClientId, ClientSecret, Login

    Send your credentials along with the login name of user using HTTPS.
    **NEVER HTTP**.

    ```
curl -H "Host: DOMAIN.com" \
    "https://DOMAIN.barc.com/__api/sso/login?clientId=yourapp-335c1d61c9fcf364196b594c48751167&clientSecret=05e394410819be40cd434a48d50c3d6f5bff9d90197a5dc2e043a32f0457e451&login=supermario"
```
    Replace domain with the name of your site.

3.  Barc -> Your Server: sends a token

    The response is `application/JSON` object with a stongly encrypted
    and signed token: `{"token": "F329AGH782"}`

    The token is good for 30 days, so you do not need to keep calling your
    dedicated host. Store it in a session so your users get the fastest
    experience.

4.  Your Server -> Your Server: build page single-sign-on link

5.  Your Server -> User: render page

## Contact Us

Email: grantfarwell@barc.com

