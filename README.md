# Window Overview Card

Eine benutzerdefinierte Lovelace-Karte für Home Assistant zur Anzeige von Fensterstatus (offen/gekippt/geschlossen), einfachen Kontakten und Tamper-Alarmen.

![Preview](preview.png)

## Features

- **Automatische Erkennung** von Sensoren per Regex-Pattern
- **Unterstützte Sensortypen:**
  - Kombinierte Sensoren mit Neigungserkennung (offen/gekippt/geschlossen)
  - Einfache Binärsensoren (offen/geschlossen)
  - Tamper-Kontakte
- **Zusammenfassung** mit Anzahl pro Status
- **Detailansicht** mit allen Sensoren
- **Kompakter Modus** für "Verlassen des Hauses"-Dashboard
- **Gruppierung nach Bereich**
- **Visueller Editor** mit Dropdown-Auswahl
- **Anklickbare Einträge** für More-Info Dialog

## Installation

### HACS (empfohlen)

1. HACS öffnen
2. "Frontend" → "+" Button
3. "Custom Repository" hinzufügen
4. Repository-URL eingeben
5. "Window Overview Card" installieren
6. Browser-Cache leeren

### Manuell

1. `window-overview-card.js` in `/config/www/` kopieren
2. In Home Assistant: Einstellungen → Dashboards → Ressourcen
3. Ressource hinzufügen:
   - URL: `/local/window-overview-card.js`
   - Typ: JavaScript-Modul

## Konfiguration

### Über den visuellen Editor

1. Dashboard bearbeiten
2. "Karte hinzufügen" → "Window Overview Card"
3. Einstellungen im Editor anpassen

### YAML-Konfiguration

```yaml
type: custom:window-overview-card
title: Fenster & Sicherheit
icon: mdi:home-lock

# Automatische Erkennung
auto_discover: true
combined_pattern: "^binary_sensor\\.dw_.*_combined$"
simple_pattern: "^binary_sensor\\.window_security_panel_window_\\d+$"
tamper_pattern: "^binary_sensor\\..*_tamper$"

# Manuelle Entitäten (zusätzlich zu auto_discover)
entities:
  - binary_sensor.custom_window_1
  - binary_sensor.custom_window_2

# Ausgeschlossene Entitäten
exclude_entities:
  - binary_sensor.window_security_panel_window_99

# Filter
filter_area: wohnzimmer  # Optional: nur bestimmter Bereich

# Anzeige-Optionen
show_closed: true
show_tamper: true
show_last_changed: true
group_by_area: false
compact_mode: false
```

## Konfigurationsoptionen

| Option | Typ | Standard | Beschreibung |
|--------|-----|----------|--------------|
| `title` | string | `Fenster & Sicherheit` | Titel der Karte |
| `icon` | string | `mdi:home-lock` | Icon im Header |
| `auto_discover` | boolean | `true` | Automatische Sensorerkennung |
| `combined_pattern` | string | `^binary_sensor\.dw_.*_combined$` | Regex für kombinierte Sensoren |
| `simple_pattern` | string | `^binary_sensor\.window_security_panel_window_\d+$` | Regex für einfache Sensoren |
| `tamper_pattern` | string | `^binary_sensor\..*_tamper$` | Regex für Tamper-Sensoren |
| `entities` | list | `[]` | Manuell hinzugefügte Entitäten |
| `exclude_entities` | list | `[]` | Ausgeschlossene Entitäten |
| `filter_area` | string | `""` | Nach Bereich filtern (area_id) |
| `show_closed` | boolean | `true` | Geschlossene Fenster anzeigen |
| `show_tamper` | boolean | `true` | Tamper-Sensoren anzeigen |
| `show_last_changed` | boolean | `true` | Letzte Änderung anzeigen |
| `group_by_area` | boolean | `false` | Nach Bereich gruppieren |
| `compact_mode` | boolean | `false` | Nur Probleme anzeigen |

## Sensor-Kompatibilität

### Kombinierte Sensoren (mit Neigungserkennung)

Die Karte erkennt kombinierte Sensoren anhand des `detailed_state` Attributs:

```yaml
# Erwartete Attribute:
detailed_state: "offen" | "gekippt" | "geschlossen"
angle: 15  # Optional: Neigungswinkel in Grad
```

### Einfache Binärsensoren

Standard Home Assistant Binärsensoren:
- `on` = offen
- `off` = geschlossen

### Tamper-Sensoren

Standard Binärsensoren für Manipulation:
- `on` = Alarm ausgelöst
- `off` = OK

## Beispiel-Konfigurationen

### Minimale Konfiguration (nur Auto-Erkennung)

```yaml
type: custom:window-overview-card
```

### Für "Verlassen des Hauses"-Dashboard

```yaml
type: custom:window-overview-card
title: Sicherheitscheck
icon: mdi:door
compact_mode: true
show_closed: false
show_last_changed: false
```

### Gruppiert nach Räumen

```yaml
type: custom:window-overview-card
title: Alle Fenster
group_by_area: true
show_closed: true
```

### Nur bestimmte Bereiche

```yaml
type: custom:window-overview-card
title: Erdgeschoss Fenster
filter_area: erdgeschoss
```

## Styling

Die Karte verwendet CSS-Variablen, die du in deinem Theme anpassen kannst:

```yaml
# In deiner theme.yaml
window-overview-card:
  --woc-open-color: "#db4437"
  --woc-tilted-color: "#ffa726"
  --woc-closed-color: "#43a047"
  --woc-tamper-color: "#db4437"
```

## Troubleshooting

### Sensoren werden nicht erkannt

1. Prüfe die Entity-IDs in Developer Tools → States
2. Passe die Regex-Patterns in der Konfiguration an
3. Oder füge Entitäten manuell hinzu

### Editor zeigt keine Bereiche

Stelle sicher, dass deine Entitäten einem Bereich zugewiesen sind (Einstellungen → Bereiche).

### Neigungswinkel wird nicht angezeigt

Der Sensor muss das Attribut `angle` haben. Bei kombinierten Sensoren aus dem Blueprint ist dies automatisch der Fall.

## Changelog

### v1.0.0
- Initiale Version
- Unterstützung für kombinierte und einfache Sensoren
- Tamper-Alarme
- Visueller Editor
- Kompakter Modus
- Bereichsfilter und -gruppierung
