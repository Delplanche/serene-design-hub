# Designcontrole en laatste verfijning

Ik heb de hele pagina nagekeken op telefoon (390px) en laptop (1280px). De inhoud, navigatie, roadmap en footer zitten goed; er blijven vier zichtbare punten over.

## Wat ik zag

1. **De donkere blokken lopen op een breed scherm niet door tot de schermrand.** Zowel het citaatblok ("Wie de identiteit bezit…") als het donkere vraagblok stopt net buiten de tekstkolom, met een smalle papierstrook links en rechts. Dat is dezelfde "rare zwarte kader"-indruk, nu op laptop in plaats van telefoon.
2. **Onder het vraagformulier blijft een grote lege donkere zone** wanneer er nog geen antwoord is; het blok oogt daardoor onafgewerkt.
3. **De cover toont bovenaan vooral de muur boven het bord**, op telefoon zelfs meer muur dan schaakbord.
4. **Een technische waarschuwing bij het laden van het vraagveld** (verschil tussen server- en browserweergave van het invoerveld). Zichtbaar effect is er niet, maar ik wil het opruimen.

## Wat ik ga doen

- De twee donkere blokken echt van rand tot rand laten lopen op elk schermformaat, met de tekst netjes uitgelijnd op dezelfde kolom als de rest van het rapport.
- De lege ruimte onder het vraagformulier weghalen: het blok krijgt rustige, kloppende marges en groeit pas mee wanneer er een antwoord of melding is.
- De uitsnede van de cover bijstellen zodat het schaakbord de hoofdrol krijgt, met iets meer nadruk op het bord en minder muur — apart afgestemd voor telefoon en laptop.
- De laadwaarschuwing bij het vraagveld verhelpen.
- Kleine puntjes meepakken: gelijke witruimte tussen de hoofdstukken rond de donkere blokken, en de scheidingslijn boven de footer laten aansluiten op het vraagblok.

## Technische uitvoering

- Alleen `src/routes/index.tsx` en zo nodig `src/styles.css` (presentatie); geen wijziging aan inhoud, AI-functie of buildcontrole.
- Full-bleed via een eigen utility (`width: 100vw; margin-inline: calc(50% - 50vw)`) in plaats van de huidige `-mx-5 / sm:-mx-8`, zodat de blokken buiten de `max-w-6xl` container reiken; binnenin een `mx-auto max-w-6xl px-5 sm:px-8` wrapper voor uitlijning.
- Verticale ritmes van de donkere secties gelijktrekken met de lichte secties; `aria-live`-container houdt alleen padding bij inhoud.
- Cover: `object-position` fijnstellen per breakpoint en gradient-stops iets verlagen.
- Hydratiewaarschuwing van de textarea onderzoeken en oplossen (stabiele render server/client).
- Nacontrole met Playwright op 390×844 en 1280×1800: geen horizontale overloop, geen consolefouten, build OK.
