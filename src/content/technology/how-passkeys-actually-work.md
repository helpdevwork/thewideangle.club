---
title: "How Passkeys Actually Work (And Why Your Bank Wants You to Use Them)"
description: "Passkeys are replacing passwords across Indian apps and banks. Here's the plain-English explanation of the cryptography that makes them both easier and harder to steal."
vertical: technology
subcategory: "Security"
tags: ["passkeys", "security", "authentication"]
heroImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=80&auto=format"
heroAlt: "Close-up of an illuminated circuit board"
publishDate: 2026-08-01
author: "Suraj Ghorpade"
published: false
topicCluster: "Everyday Security"
sourceLinks:
  - "https://fidoalliance.org/passkeys/"
  - "https://www.rbi.org.in/"
relatedTools: ["Google Password Manager", "1Password", "iCloud Keychain"]
---

If you've logged into an app recently and been asked to use your fingerprint instead of typing a
password, you've used a passkey. Several Indian banks and fintech apps have quietly switched over
in the last year, and it's worth understanding why — because the mechanism is genuinely different
from anything password managers did before.

## The core idea: two keys, only one of which ever leaves your device

A passkey is a pair of cryptographic keys generated on your phone or laptop. One half — the private
key — never leaves the secure hardware chip on your device. The other half — the public key — is
sent to the website or app when you register. When you log in, the site sends a challenge, your
device signs it with the private key, and the site verifies the signature with the public key it
already has.

Nothing you type or send over the network can be phished, because there is no shared secret in
transit. Compare that to a password: it has to travel from your keyboard to the server, and be
compared against a stored (hopefully hashed) copy — two places it can leak.

## Why this matters more in India specifically

India has the fastest-growing base of first-time smartphone banking users anywhere, and phishing
targeting UPI and net-banking credentials is a genuinely large-scale problem. Passkeys close an
entire attack category — credential-stuffing and phishing pages that mimic a bank's login screen —
because there is no password to trick you into typing.

## The catch

Passkeys are tied to a device (or a synced keychain like iCloud or Google Password Manager). If you
lose your phone and haven't set up a recovery method, getting back into an account can be more
friction than a forgotten password used to be. Most apps are handling this with a recovery email or
a secondary passkey on a second device — worth setting up the day you enable one.
