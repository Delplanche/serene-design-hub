# Ultieme designverfijning met nieuwe mobiele navigatie

## Gekozen richting
Op telefoon verdwijnt de horizontaal schuivende hoofdstukrij. Die rij kapt labels af, toont maar een deel van de inhoudsopgave en concurreert met de cover. In de plaats komt één rustige, redactionele regel: OCA links, het actuele hoofdstuk in het midden en rechts een strakke menuknop met twee lijnen. De dunne groene leesvoortgang blijft zichtbaar. Desktop houdt de volledige horizontale hoofdstuknavigatie.

## Mobiele menubalk
- Vaste bovenbalk met drie zones: OCA-beeldmerk, huidig hoofdstuk (`03 / 08 — Identiteit`) en een vierkante menuknop met twee horizontale lijnen.
- Bij openen vouwt onder de balk een papierkleurig vlak uit. Daarin staan alle acht hoofdstukken in een 2×4-raster, telkens met nummer en naam. Het actieve hoofdstuk krijgt een groene markering.
- Het menu sluit na een hoofdstukkeuze, met Escape en bij een klik buiten het menu. Het werkt ook volledig met toetsenbord en schermlezer.
- De voortgangslijn loopt onder de hele navigatie door. Wie bewegingsanimaties heeft uitgeschakeld, krijgt geen animatie.

## Verfijning van de hele pagina
- Cover, hoofdstukopeningen, kaarten, donkere blokken, vraagblok en colofon nakijken als één geheel.
- Overal dezelfde witruimte tussen de blokken en geen toevallige lege vlakken.
- Kopgroottes en tekstbreedtes op mobiel bijstellen, zodat koppen niet onrustig afbreken.
- Alle knoppen en links controleren op duidelijke focus en voldoende aanraakruimte.
- Inhoud, AI-vraagfunctie, lokale afbeelding en de Delplanche-colofon blijven ongewijzigd.

## Technische uitvoering
- De resultaten van de eerdere designaudit (sub_dapwk9q9) ophalen en de bruikbare punten meenemen.
- Een eigen `MobileNav`-onderdeel in `src/routes/index.tsx`, met lokale open/dicht-status en de bestaande `useReadingState`. Desktop vanaf `sm` houdt de huidige rij.
- Alleen bestaande semantische tokens gebruiken. Waar dat nodig is, kleine utilities toevoegen in `src/styles.css`.
- `roadmap.md` bijwerken met deze ronde.
- Testen met Playwright op 390×844, 768×1024 en 1280×1800. Te controleren: menu openen en sluiten, sprongen naar hoofdstukken, actieve status, overlappende tekst, horizontale overloop, consolefouten, beeldcontrole en build.
