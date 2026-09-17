# Plan — Open Chess Alliance strategisch rapport

## Doel
Een hoogwaardige Nederlandstalige one-page site bouwen die het rapport presenteert als een gezaghebbend digitaal beleidsdocument: rustig, minimalistisch en precies, met subtiele schaaklogica in raster en typografie.

## Visuele richting
- De gekozen **Swiss Standards Manifesto**-compositie vormt de structurele basis.
- Warm papier, kalksteen, inktzwart en gedempt groen; kleur alleen waar betekenis nodig is.
- Fraunces voor redactionele koppen, Space Grotesk voor leestekst en IBM Plex Mono voor cijfers, labels en protocolnotatie.
- Scherpe lijnen, maximaal 3–4 px afronding, royale witruimte en een fijn schaakraster als achtergrondmotief.
- Geen stockfoto’s, gradients, glaseffecten, overmatige kaarten of commerciële SaaS-uitstraling.

## Pagina-opbouw
1. **Vaste hoofdstuknavigatie** met horizontaal scrollbare mobiele inhoudsopgave en leesvoortgang.
2. **Cover** met Open Chess Alliance, rapporttitel, kernbelofte en de drie geverifieerde marktgetallen.
3. **Diagnose** over monopolie, fragmentatie en opgesloten spelersdata.
4. **Alliantie & protocol** met Lichess, ChessBase en FIDE rond de neutrale OCA-standaard.
5. **Identiteit & data-eigenaarschap** met federatieve identiteit, datakluizen, toestemming en portabiliteit.
6. **OCA Rating & anti-cheat** als twee verbonden standaarden, inclusief transparant beroep.
7. **Institutionele uitrol** via bibliotheken, zorg en Europese digitale-soevereiniteitsprogramma’s.
8. **Vierfasen-roadmap** volgens de exacte termijnen uit het rapport: maanden 1–3, 4–9, 10–15 en 16+.
9. **Compacte afsluiting** met Brussel, rapportstatus en terugkeer naar boven.

## Interactie en toegankelijkheid
- Subtiele binnenkomst van de cover en rustige sectie-overgangen; volledig uitgeschakeld bij verminderde beweging.
- Duidelijke focusstijlen, semantische hoofdstukken, voldoende contrast en comfortabele leesregels.
- Mobiel eerst verfijnen voor 390×844, daarna controleren op desktop; tabellen en schema’s worden compact gestapeld zonder horizontale tekstproblemen.

## Technische uitvoering
- De startpagina vervangen en alle inhoud in herbruikbare, kleine React-secties structureren.
- De gekozen kleuren en lettertypes als semantische tokens in het bestaande designsysteem opnemen.
- Webfonts via de documentkop laden; unieke Nederlandse titel, beschrijving en social metadata toevoegen.
- Geen database of login: dit blijft een snelle, publieke rapportsite.
- Na implementatie de actuele foutmeldingen controleren en de pagina visueel testen op mobiel en desktop.
