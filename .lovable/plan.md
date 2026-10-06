# Definitieve herbouw: één publicatiesysteem in licht en donker

## Ontwerpbesluit

De site wordt opnieuw opgebouwd als een digitaal protocolmanifest: de leesrust van een gezaghebbend Europees witboek, gecombineerd met de precisie van een technische standaard. Niet nóg een variatie op de huidige kaartblokken, maar één doorlopend verhaal waarin de OCA-protocolstroom de visuele ruggengraat vormt.

Licht en donker worden gelijkwaardige thema’s. De site volgt standaard de systeeminstelling; in de vaste bovenbalk komt een compacte handmatige keuze die wordt onthouden. Het donkere thema is geen omkering van het lichte thema, maar krijgt eigen oppervlakken, contrasten en beeldbehandeling.

## Definitief visueel systeem

- **Licht:** koel mineraalwit `#F6F7F4`, helder documentvlak `#FFFFFF`, grafiet `#171A1F`, secundair grafiet `#4A5058`.
- **Donker:** nachtgrafiet `#111418`, verhoogd vlak `#191D22`, gebroken wit `#F1F3EF`, secundair licht `#B9C0C7`.
- **Institutionele kleur:** diep Europees teal `#174C55` in licht en helder mineraalteal `#76B8B5` in donker. Dit draagt structuur, actieve navigatie en protocolverbindingen.
- **Signaalaccent:** schaakrood `#A63D32` in licht en zacht koraal `#E28A7E` in donker, uitsluitend voor belangrijke nummering, focus en actie. Geen rood als kleine tekst op donkere vlakken.
- Alle waarden worden als semantische OKLCH-tokens vastgelegd; tekstcombinaties halen minimaal WCAG AA.
- **Typografie:** Newsreader voor titels, kernstellingen en citaten; Public Sans voor leestekst en navigatie; IBM Plex Mono voor protocolcodes, cijfers en metadata. De serif wordt minder zwaar en menselijker, de sans neutraler en beter leesbaar dan de huidige combinatie.
- Geen algemene `.dark`-standaardkleuren meer naast het rapportpalet: één volledige set semantische tokens voorkomt de huidige vreemde wisselingen.

## Nieuwe compositie

1. **Vaste bovenbalk** — zichtbaar OCA-merk, huidige sectie, rustige themawisselaar en betrouwbare tweestreeps-menuknop op mobiel. Op desktop een sobere inhoudslijn; “Vraag het rapport” wordt een hulpmiddelknop, geen vijfde hoofdstuk.
2. **Cover** — het lokale marmeren schaakbord blijft beeldvullend, maar titel en kernbelofte krijgen een gecontroleerde contrastzone. De cover is kort genoeg om op elk scherm al de volgende inhoud te laten zien.
3. **Managementsamenvatting** — één duidelijke kernstelling met probleem, voorstel en uitkomst als genummerde redactionele regels, niet als drie kaarten.
4. **Waarom ingrijpen** — marktgegevens als één groot bewijsblok; de drie problemen als doorlopende argumenten met verschillende typografische nadruk.
5. **De open standaard** — de protocolstroom `account → Global_ID → toestemming → resultaat → rating → integriteit` wordt de centrale verticale lijn. Rollen en verantwoordelijkheden haken hier als echte, scanbare matrix op aan.
6. **Publieke toepassing** — drie toepassingen worden gekoppeld aan hun functie en invoeringsfase, zonder opnieuw hetzelfde raster te gebruiken.
7. **Uitvoering** — geen los donker hoofdstuk meer. Een sterke tijdlijn op het gewone documentvlak gebruikt de institutionele kleur functioneel; zo verdwijnt de willekeurige opeenvolging van zwarte en petroleumblauwe vlakken.
8. **Rapportassistent** — een duidelijk begrensd leesinstrument op een verhoogd oppervlak, herkenbaar interactief maar niet visueel zwaarder dan de inhoud.
9. **Colofon** — één compacte slotregel met OCA, Brussel, jaar, Delplanche-link en terugkeer naar boven.

## Donker thema en bediening

- Eerste bezoek gebruikt `prefers-color-scheme`; handmatige keuze licht/donker wordt lokaal onthouden zonder flits of laadverschil.
- De bediening toont herkenbare zon/maan-iconen met toegankelijke namen en een voldoende groot aanraakvlak.
- Foto, overlays, lijnen, invoerveld, antwoordtekst en focusstaten worden afzonderlijk voor beide thema’s afgestemd.
- Donker gebruikt maximaal twee oppervlakniveaus en subtiele lichte scheidingslijnen; geen bijna-identieke zwart/petrol-vlakken meer.
- Verminderde beweging blijft gerespecteerd.

## Inhoud en gedrag

- Alle bestaande feiten, Nederlandse teksten, hoofdstukken, roadmaptermijnen, lokale afbeelding, AI-begrenzing en Delplanche-vermelding blijven inhoudelijk behouden.
- Tekst wordt alleen herschikt of aangescherpt om herhaling te verminderen en de argumentatie te verduidelijken; er worden geen feiten toegevoegd.
- De actieve sectie, leesvoortgang, ankernavigatie en mobiele inhoudsopgave blijven werken.
- De actuele browserfout rond de paginalading wordt vóór de visuele eindcontrole gereproduceerd en opgelost als die nog optreedt.

## Technische uitvoering

- `src/styles.css`: volledig semantisch licht/donker tokensysteem, thema-attributen, focus, contrast, coverbehandeling en gereduceerde beweging.
- `src/routes/__root.tsx`: nieuwe webfonts en een vroeg thema-initiatiescript om een kleurflits te voorkomen.
- `src/routes/index.tsx`: themawisselaar, nieuwe navigatiehiërarchie en hercompositie van de bestaande inhoud tot protocolmanifest.
- Bestaande knoppen en invoervelden blijven via het designsysteem lopen; geen hardgecodeerde kleuren in de pagina.
- `roadmap.md` en `AGENTS.md` worden bijgewerkt met het definitieve themasysteem en de protocolgedreven publicatiestructuur.

## Kwaliteitscontrole

- Visuele controle in licht én donker op 390×844, 768×1024 en 1280×1800.
- Extra controle van geopende mobiele inhoudsopgave, themawisseling, opgeslagen voorkeur, systeemvoorkeur en rapportassistent.
- Geen horizontale overloop, botsende tekst, verdwenen menuknop, betekenisloze lege zones of laagcontrastlabels.
- Browsermeldingen, paginalading, lokale-afbeeldingscontrole en build moeten schoon zijn.
