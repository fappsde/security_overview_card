# Security Overview Card

A custom Lovelace card for Home Assistant to display an overview of security-related entities.

## Features

- 🔍 **Auto-discovery**: Automatically finds and displays security-related entities (alarms, locks, doors, windows, motion sensors, cameras)
- 🎨 **Visual Status**: Color-coded indicators for active/inactive states
- 🔔 **Quick Access**: Click on any entity to see more details
- ⚙️ **Configurable**: Choose specific entities or let the card auto-discover them
- 🎭 **Theme Support**: Works with Home Assistant themes

## Installation

### HACS (Recommended)

1. Open HACS in Home Assistant
2. Go to "Frontend"
3. Click the menu in the top right and select "Custom repositories"
4. Add this repository URL: `https://github.com/fappsde/security_overview_card`
5. Category: "Lovelace"
6. Click "Add"
7. Find "Security Overview Card" in the list and install it
8. Restart Home Assistant

### Manual Installation

1. Download `security-overview-card.js` from the [latest release](https://github.com/fappsde/security_overview_card/releases)
2. Copy it to `<config>/www/security-overview-card.js`
3. Add the resource to your Lovelace configuration:

```yaml
resources:
  - url: /local/security-overview-card.js
    type: module
```

4. Restart Home Assistant

## Configuration

### Basic Configuration (Auto-discovery)

The card will automatically discover all security-related entities:

```yaml
type: custom:security-overview-card
title: Security Overview
```

### Advanced Configuration

Specify exact entities to display:

```yaml
type: custom:security-overview-card
title: Home Security
show_header: true
entities:
  - alarm_control_panel.home_alarm
  - lock.front_door
  - lock.back_door
  - binary_sensor.front_door
  - binary_sensor.back_door
  - binary_sensor.garage_door
  - binary_sensor.motion_sensor_1
  - camera.front_camera
```

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `type` | string | **Required** | Must be `custom:security-overview-card` |
| `title` | string | `Security Overview` | Card title |
| `show_header` | boolean | `true` | Show or hide the card header |
| `entities` | list | `[]` | List of entity IDs to display. Leave empty for auto-discovery |

## Auto-Discovery

When no entities are specified, the card automatically discovers entities from these domains:

- `alarm_control_panel.*`
- `lock.*`
- `binary_sensor.*` (with device_class: door, window, motion, opening, safety, smoke, gas)
- `camera.*` (when name contains 'security', 'alarm', or similar keywords)
- `sensor.*` (when name contains 'security', 'alarm', or similar keywords)

The card looks for entities with keywords like:
- security
- alarm
- door
- window
- motion
- lock

## Visual Indicators

The card uses color-coded indicators:

- 🔴 **Red**: Active/Alert state (open door/window, motion detected, alarm triggered, unlocked)
- 🟢 **Green**: Secure/Inactive state (closed door/window, no motion, alarm disarmed, locked)

## Examples

### Dashboard Example

![Security Overview Card](https://via.placeholder.com/600x400.png?text=Security+Overview+Card)

### Multiple Cards

You can use multiple cards for different security zones:

```yaml
type: vertical-stack
cards:
  - type: custom:security-overview-card
    title: Main Floor Security
    entities:
      - lock.front_door
      - binary_sensor.front_door
      - binary_sensor.living_room_motion
      
  - type: custom:security-overview-card
    title: Upper Floor Security
    entities:
      - binary_sensor.bedroom_window
      - binary_sensor.bedroom_motion
      
  - type: custom:security-overview-card
    title: Garage
    entities:
      - lock.garage_door
      - binary_sensor.garage_door
      - camera.garage_camera
```

## Support

For issues, feature requests, or contributions, please visit the [GitHub repository](https://github.com/fappsde/security_overview_card).

## License

MIT License - see LICENSE file for details
