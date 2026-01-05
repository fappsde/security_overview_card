# Window Overview Card

Eine benutzerdefinierte Lovelace-Karte für Home Assistant zur Anzeige von Fensterstatus (offen/gekippt/geschlossen), einfachen Kontakten und Tamper-Alarmen.

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

## Konfiguration

### Minimale Konfiguration

```yaml
type: custom:window-overview-card
```

### Erweiterte Konfiguration

```yaml
type: custom:window-overview-card
title: Fenster & Sicherheit
icon: mdi:home-lock

# Automatische Erkennung
auto_discover: true
combined_pattern: "^binary_sensor\\.dw_.*_combined$"
simple_pattern: "^binary_sensor\\.window_security_panel_window_\\d+$"
tamper_pattern: "^binary_sensor\\..*_tamper$"

# Anzeige-Optionen
show_closed: true
show_tamper: true
show_last_changed: true
group_by_area: false
compact_mode: false
```

## Hauptoptionen

| Option | Beschreibung |
|--------|--------------|
| `title` | Titel der Karte |
| `auto_discover` | Automatische Sensorerkennung |
| `compact_mode` | Nur Probleme anzeigen |
| `group_by_area` | Nach Bereich gruppieren |
| `show_closed` | Geschlossene Fenster anzeigen |

Weitere Details finden Sie in der [vollständigen Dokumentation](https://github.com/fappsde/security_overview_card).
