# Ultieme designverfijning met nieuwe mobiele navigatie

## Gekozen richting
De beste oplossing is **geen permanent horizontaal schuivende hoofdstukrij op mobiel**. Die rij kapt labels af, toont slechts een deel van de inhoudsopgave en concurreert met de cover. Op telefoon wordt de balk daarom één rustige, redactionele regel: OCA links, het actuele hoofdstuk in het midden en een precieze menuknop met twee lijnen rechts. De leesvoortgang blijft als dunne groene lijn zichtbaar.

Bij openen vouwt onder de balk een compacte inhoudsopgave uit met alle acht hoofdstukken in een helder 2×4-raster. Zo blijft de gesloten toestand minimaal, terwijl elk hoofdstuk direct bereikbaar is. Desktop behoudt de volledige horizontale hoofdstuknavigatie.

## Mobiele menubalk
- Maak een vaste bovenbalk met drie stabiele zones: OCA-beeldmerk, huidig hoofdstuk (`03 / 08 — Identiteit`) en een vierkante menuknop met twee horizontale lijnen.
- Gebruik geen standaard grote hamburger of afgeronde app-knop; de knop krijgt scherpe, sobere lijnen die bij het Swiss Standards Manifesto passen.
- Laat de volledige inhoudsopgave direct onder de balk uitklappen als een papierkleurig vlak met fijne scheidingslijnen.
- Toon alle acht hoofdstukken in twee kolommen, met monospaced nummer, hoofdstuknaam en een duidelijke groene actieve markering.
- Sluit het menu na een hoofdstukkeuze, bij Escape en bij klikken buiten het menu; houd toetsenbordbediening en schermlezers correct.
- Vergrendel de achtergrond niet onnodig: het menu blijft compact en neemt alleen de ruimte in die de inhoudsopgave nodig heeft.
- Laat de voortgangslijn onder de volledige navigatie doorlopen en respecteer verminderde beweging.

## Verfijning van de hele pagina
- Controleer cover, hoofdstukopeningen, kaarten, donkere tussensecties, vraagblok en colofon als één publicatiesysteem.
- Bewaak één verticale ritmiek: consistente boven- en onderruimte, uitlijning op hetzelfde raster en nergens losse of toevallige lege vlakken.
- Verfijn mobiele tekstbreedtes en kopgroottes zodat de hiërarchie krachtig blijft zonder onrustige afbrekingen.
- Houd donkere vlakken zinc-achtig en contrastrijk, met subtiele lijnen; geen nieuwe decoratie, gradients buiten de functionele coverlaag, of SaaS-achtige kaarten.
- Controleer alle interactieve elementen op duidelijke focus, voldoende aanraakruimte en rustige actieve/hoverstatussen.
- Behoud inhoud, AI-vraagfunctie, lokale afbeelding en compacte Delplanche-colofon ongewijzigd.

## Technische uitvoering
- Werk de navigatie als een klein eigen React-onderdeel uit met lokale open/dicht-status en bestaande hoofdstukstatus.
- Gebruik de bestaande semantische kleur- en typografietokens; voeg alleen herbruikbare presentatiestijl toe waar Tailwind-klassen niet volstaan.
- Desktop vanaf `sm` blijft de huidige volledige hoofdstukrij tonen; mobiel krijgt de nieuwe compacte regel en uitklapbare inhoudsopgave.
- Werk ook `roadmap.md` bij met deze nieuwe designronde.
- Controleer na uitvoering op 390×844, 768×1024 en 1280×1800: menu openen/sluiten, hoofdstuksprongen, actieve status, scrollpositie, tekstoverlap, horizontale overloop, consolefouten, beeldcontrole en buildstatus.
