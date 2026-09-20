# Plan — rapportassistent, lokale beelden en afwerking

## Resultaat
De rapportsite krijgt een compacte vraagfunctie die uitsluitend vanuit de rapportinhoud antwoordt, een lokaal opgeslagen hoofdbeeld dat met de code naar GitHub gaat, en een strakkere donkere afwerking met een minimale colofon.

## Uitvoering
1. **Hoofdbeeld lokaal maken**
   - Het bestaande marmeren schaakbeeld als echt WebP-bestand onder de projectcode opslaan.
   - De cover rechtstreeks naar dat lokale bestand laten verwijzen en het CDN-verwijsbestand verwijderen.
   - De uitsnede en zichtbaarheid op mobiel en desktop controleren; Scaleway is hiervoor niet nodig.

2. **Controle bij iedere build**
   - Een controlescript toevoegen dat afbeeldingsverwijzingen in de broncode en stijlen nakijkt.
   - De build laten stoppen wanneer een beeldbestand ontbreekt, een extern `http(s)`-beeld wordt gebruikt of een CDN-assetverwijzing terugkomt.
   - Zowel de gewone als ontwikkelbuild altijd via deze controle laten lopen.

3. **Vragen over het rapport**
   - Lovable AI veilig aan de serverzijde aansluiten met `openai/gpt-6-astra`; de sleutel blijft buiten de browser.
   - Een rustige vraagsectie toevoegen waarin lezers een vrije vraag stellen en een helder, beknopt antwoord ontvangen.
   - Het model strikt gronden in de volledige rapportinhoud, onzekerheid expliciet laten noemen en geen bronnen of feiten laten verzinnen.
   - Denkstatus, leeg resultaat en concrete foutmeldingen tonen; invoer bewaren wanneer een verzoek mislukt.

4. **Footer en donkere vormgeving**
   - De huidige dubbele footerstructuur vervangen door één compacte colofonregel met rapportgegevens, terug-naar-boven en “Architectuur & Platform door Delplanche”.
   - `Delplanche` laten linken naar `https://delplanche.cloud`.
   - Donkere delen verfijnen met neutrale zinc-achtige vlakken, helderdere teksthiërarchie en subtiele scheidingslijnen, zonder de gekozen Swiss Standards Manifesto-stijl te verlaten.

5. **Controle**
   - De nieuwe beeldcontrole en de normale build uitvoeren.
   - De AI-aanroep één keer echt testen en eventuele veilige foutmelding controleren.
   - Cover, vraagfunctie en footer in de browser controleren op telefoon en desktop, inclusief toetsenbordfocus en horizontale overflow.

## Technische details
- De vraagfunctie gebruikt een TanStack-serverfunctie; er wordt geen gespreksgeschiedenis opgeslagen.
- De AI-aanroep streamt intern zodat langere antwoorden niet op een stille time-out stuklopen.
- Alleen afbeeldingsbronnen worden op externe verwijzingen gecontroleerd; de expliciete Delplanche-link en bestaande webfonts blijven toegestaan.