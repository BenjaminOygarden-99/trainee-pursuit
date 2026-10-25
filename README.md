# Trainee Pursuit – prototype

> ⚠️ AI-GENERERT – IKKE VERIFISERT. Verifiser alle faktapåstander (spørsmål og fasit) mot primærkilder før bruk.

**Status: prototype.** Testet lokalt med 110 simulerte publikummere, men ikke på Netlify og ikke på lokalets nett. Ha Kahoot klart som reserve på kvelden.

## Tre sider

| Adresse | Hvem | Hva |
|---|---|---|
| `/` | Publikum (mobil) | Bli med med kallenavn og gruppe, svar på spørsmål, se egne poeng |
| `/skjerm` | Projektor | QR-kode, kategori, spørsmål med nedtelling, fasit med statistikk per gruppe, kakestilling, toppliste, vinner |
| `/kontroll` | Teknisk ansvarlig (PIN) | Styrer alt som vises på skjermen, deler ut kakestykker, fjerner upassende kallenavn |

## Intro før showet

Trykk **«Spill intro»** øverst i kontrollpanelet. Teppet går opp, Pursuit-skiltet faller ned og lyspærene tennes (ca. 6 sekunder), og mobilene viser «Showet starter!». Start musikken fra teknisk-PC-en samtidig. Når Agne er klar, trykk **«Velkomst og QR»**. Introen kan spilles på nytt så mange ganger dere vil, også under generalprøven.

Musikken ligger ikke i appen. Den spilles fra kjøreplanens spilleliste, slik at appen ikke blir avhengig av YouTube og ikke bryter opphavsretten.

## Slik går en runde (kontrollpanelet)

1. **Vis kategori.** Skjermen blir farget i kategorien. Lagene sender frem deltakeren.
2. **Start 20 s.** Spørsmålet vises på skjermen og på mobilene. Svar telles live.
3. **Vis fasit.** Først når lagenes tavler er gjennomgått. Skjermen viser riktig svar, prosent riktig per gruppe og hvem som var raskest. I finalen vises gruppenes median og hvem i salen som var nærmest.
4. **Gi kakestykke** i tabellen «Kakestykker». Trykk «Vis kakestillingen på skjermen» når Agne vil vise stillingen.

Får et lag full kake, foreslår panelet å kåre vinneren. Får flere lag full kake samtidig, varsler panelet om tiebreak.

**Poeng for publikum:** Riktig flervalgssvar gir 500–1000 poeng (raskere gir flere). I tallspørsmålene gir svar innenfor 1 % 1000 poeng, innenfor 5 % 700 og innenfor 15 % 300.

## Publisere på Netlify

Netlify Drop (dra og slipp) virker **ikke**, fordi appen trenger en serverfunksjon. Velg ett av alternativene:

**A. Via GitHub (anbefalt)**
1. Legg mappen i et GitHub-repo.
2. Netlify: *Add new site → Import an existing project →* velg repoet. Innstillingene leses fra `netlify.toml`.
3. *Site configuration → Environment variables:* legg til `ADMIN_PIN` med en PIN-kode du velger. Ikke skriv den inn i koden.
4. Publiser på nytt (*Deploys → Trigger deploy*) slik at PIN-en blir tatt i bruk.
5. Gi nettstedet et kort navn (*Site configuration → Change site name*), for eksempel `traineepursuit`. Navnet blir adressen som står under QR-koden.

**B. Via Netlify CLI**
```
npm install
npx netlify-cli login
npx netlify-cli init
npx netlify-cli env:set ADMIN_PIN <​DIN_PIN>
npx netlify-cli deploy --prod
```

Lagring skjer i Netlify Blobs (innebygd, ingen database å sette opp).

## Teste lokalt
```
node dev-server.mjs
```
Åpne http://localhost:8888/kontroll (PIN `1234`), http://localhost:8888/skjerm og http://localhost:8888 i hver sin fane. Lokalt lagres alt i minnet og forsvinner når serveren stoppes.

## Endre spørsmål, lag og grupper
Alt ligger i `netlify/lib/questions.mjs`. Filen ligger på serveren, så publikum kan ikke lese fasiten. Lagre, så publiserer Netlify automatisk på nytt (GitHub-varianten).

## Må sjekkes før kvelden

- [ ] **Fasit** `[verifiser]`. Spesielt antall ESC-seire etter 2026, Agders kommunetall og 1030/2030-formuleringen. Feilsvarene i flervalg er utkast.
- [ ] **Netlify-plan og kvoter** `[verifiser]`. Spørsmålstilstanden caches i 1 sekund på Netlifys CDN (`Netlify-CDN-Cache-Control`), slik at 110 telefoner gir omtrent ett funksjonskall i sekundet, ikke 110. Sjekk at kontoen deres tåler et kvarters trafikk, og at cachingen virker etter publisering (svartall og nedtelling skal oppdateres jevnt).
- [ ] **Generalprøve** med 10–20 telefoner på lokalets nett/4G, og storskjermen på projektoren.
- [ ] **Reserve:** Kahoot med de samme spørsmålene, klart på teknisk-PC-en.
- [ ] **Kallenavn:** Den tekniske ansvarlige sjekker topp 10 i panelet og fjerner upassende navn *før* «Vis topp 5».
- [ ] **Etter arrangementet:** Trykk «Slett alt» i panelet. Det sletter kallenavn, svar og poeng.

## Personvern og sikkerhet
- Appen lagrer kun kallenavn og gruppe (trainee/alumni/medlemsbedrift). Ingen innlogging, e-post eller navn.
- Kontrollpanelet er beskyttet av en enkel PIN-kode (`ADMIN_PIN`). Det holder for et kveldsarrangement, men ikke for noe som skal leve videre.
- Statistikk vises per gruppe. Det er ingen nedre grense, så med svært få svar i én gruppe kan enkeltpersoners svar bli synlige. Det er uproblematisk for quizsvar, men verdt å vite.

## Filer
```
netlify.toml                 Netlify-oppsett
package.json                 Avhengighet: @netlify/blobs
netlify/functions/api.mjs    Serverfunksjonen (/api/*)
netlify/lib/game.mjs         Spillogikk: tilstand, svar, fasit, poeng, kontrollpanel
netlify/lib/questions.mjs    Spørsmål, lag, grupper, farger
netlify/lib/store.mjs        Lagring (Netlify Blobs / minne lokalt)
public/index.html            Mobil
public/skjerm.html           Storskjerm
public/kontroll.html         Kontrollpanel
public/shared.js|css         Felles kode og stil
public/vendor/qr.js          QR-motor (MIT, fra qrcode-terminal), uten CDN
public/fonts/                Lokale webfonter (TeX Gyre Adventor, Inter) med lisenser
dev-server.mjs               Lokal testserver
```
