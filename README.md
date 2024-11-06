# Joblooper

Dette er et fullstack-prosjekt bygget med Next.js og Prisma. Prosjektet er satt opp for å lettere samarbeide og inkluderer en organisert mappestruktur for å gjøre utvikling og vedlikehold enklere.

## Kom i gang

### 1. Klon repositoriet

For å komme i gang, klon prosjektet til din lokale maskin. I terminalen, kjør følgende kommando:

```bash
git clone REPO_URL
```

Bytt ut REPO_URL med URL-en til Git-repositoriet, du finner denne når du trykker på den grønne code knappen inne på github repoet. Den ser ut slik https://github.com/JobLoop-AS/JobLooper.git

Når du kloner repoet havner prosjektet(mappen) inne i mappen du kjører git clone kommandoen. f.eks ~/Desktop/din_mappe/en_annen_mappe/git_klonet_repo

### 2. Installer avhengigheter

Etter at du har klonet repositoriet, naviger til prosjektmappen og installer avhengighetene med følgende kommando:

```bash
cd joblooper
npm install
```

cd står for change directory eller gå til mappe "din_mappe", man gjør dette for og flytte til riktig mappe før man installerer alle avhengigheter.

npm install kjører node package manager install kommandoen, det gjør at du installerer alle avhengighetene man trenger for å drive prosjektet.

### 3. Miljøvariabler

Prosjektet benytter miljøvariabler som er definert i .env-filen. Opprett en .env-fil i roten av prosjektet, og legg til nødvendige variabler. Roten av prosjektet er samme plass som package.json ligger Et eksempel:

Inne i .env filen skal det ligge en variabler som ser slik ut: DATABASE_URL="mysql://brukernavn:passord@ip_adresse:port/databasenavn". Vi blir å gå igjennom dette i lag.

Det er **VELDIG VIKTIG!!** at .env filen ikke blir lagt ut på github, da den inneholder sensitive data. Den er allerede ignorert i .gitignore filen. Vi kommer også til å gå igjennom dette i lag.

### 4. Mappestruktur

```bash
/app
  ├── api
  │   ├── users
  │   │   └── route.js         # API-endepunkt for brukerdata
  │   ├── posts
  │   │   └── route.js         # API-endepunkt for post-data
  ├── components
  │   ├── UI
  │   │   ├── Button.js        # Gjenbrukbar knapp-komponent
  │   │   ├── Input.js         # Gjenbrukbar input-komponent
  │   ├── Header.js            # Header-komponent
  │   └── Footer.js            # Footer-komponent
  ├── layout.js                # Global layout for appen (Tenk på denne som en index.html)
  └── page.js                  # Hovedside i appen. Dette vil være startsiden på vår app. Vi blir også og gå igjennom ting ilag.
/lib
  ├── db
  │   ├── prisma.js            # Initialisering av Prisma-klienten
  │   ├── user.js              # Databasefunksjoner for brukere
  │   └── post.js              # Databasefunksjoner for poster
  ├── hooks                    # Mappe for custom hooks
  │   └── useDebounce.js       # Egendefinert hook for debouncing
/prisma
  └── schema.prisma            # Database-skjema definert med Prisma
/public
  └── images                   # Statiske ting som bilder ligger i denne mappen, fonter er gjort på en litt annne måte i next 15, vi kan også gå igjennom dette ilag.
/styles
  ├── globals.css              # Global styling for appen
  └── reset.css                # CSS-reset for enhetlig styling på tvers av browsere
.env                           # Miljøvariabler.
README.md                      # Prosjektets dokumentasjon

```

Det som vises over er bare et eksempel på hvordan prosjektet kan utvikle seg, og hvordan man forholder seg til mapper.

#### Mappebeskrivelse

- **app/**: Inneholder alle sidene i prosjektet samt API-ruter.
  - **api/**: Inneholder server-side API-endepunkter som kan hente, oppdatere og slette data fra databasen.
  - **components/**: Inneholder React-komponenter.
  - **UI/**: Gjenbrukbare UI-komponenter, som knapper og input-felter, som kan brukes på tvers av prosjektet.
- **lib/**: Inneholder hjelpefiler og tilkoblingskonfigurasjon.
  - **db/**: Inneholder databasefunksjoner og Prisma-klienten for å koble til databasen.
  - **hooks/**: Egendefinerte React-hooks..
- **prisma/**: Inneholder schema.prisma-filen, som definerer databaseskjemaet for Prisma.
- **public/**: Her ligger statiske filer som bilder og ikoner som er tilgjengelige på URL-en (for eksempel /favicon.ico).
- **styles/**: Inneholder globale stilfiler, som globals.css for hovedstilen og reset.css for å nullstille standard CSS-stiler på tvers av browsere.
  - **undermapper/**: Kan inneholde styling til komponenter f.eks header/styles.module.css eller header/header.module.css slik at ikke all styling havner rett i root mappen.

### 5. Viktige kommandoer

Her er noen nyttige kommandoer du kan bruke for å utvikle og teste prosjektet.

- **npm run dev** - Starter utviklingsserveren på localhost:3000. Det vil dukke opp en link i terminalen i vscode man kan trykke på.
- **npm run build** - Bygger prosjektet for produksjon. Man trenger ikke tenkte på den når man utvikler bare bruk npm run dev.
- **npm run start** - Starter en versjon av den bygde appen. Samme med npm run build, man trenger ikke tenkte på denne.
- **npx prisma migrate dev** - Kjører migreringer for databasen ved endringer i schema.prisma. Ikke bruk den hvis man ikke vet hva man gjør.
- **npm run lint** - Kjører linting for å sjekke at koden følger prosjektets stilguider.

Vi blir også å gå igjennom dette i lag.

# Branching

Vi skal gå igjennom å lage vår egen branch slik at vi kan utvikle utenfor main branchen. Vi går igjennom hvorfor dette er viktig.
