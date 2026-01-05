# Security Overview Card

A custom Lovelace card for Home Assistant to display an overview of security-related entities.
<img width="114" height="82" alt="image" src="https://github.com/user-attachments/assets/a0f6c551-21f9-40db-85f4-dd9d8d370f72" />

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

### Compact Dashboard Configuration

For compact dashboards, use the `max_height` option to limit the card height:

```yaml
type: custom:security-overview-card
title: Security
show_header: true
max_height: 400px  # Card will scroll if content exceeds 400px
entities:
  - alarm_control_panel.home_alarm
  - lock.front_door
  - lock.back_door
  - binary_sensor.front_door
  - binary_sensor.back_door
```

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `type` | string | **Required** | Must be `custom:security-overview-card` |
| `title` | string | `Security Overview` | Card title |
| `show_header` | boolean | `true` | Show or hide the card header |
| `entities` | list | `[]` | List of entity IDs to display. Leave empty for auto-discovery |
| `max_height` | string | `none` | Maximum height for the card content (e.g., `300px`, `50vh`). Content will scroll if it exceeds this height. Perfect for compact dashboards |

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

## Troubleshooting

### Visual Editor Not Showing Max Height Option or Entity Selection Not Working

If you don't see the "Max Height" field in the visual editor or can't select entities:

1. **Clear Browser Cache**:
   - Press `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac) for a hard refresh
   - Or manually clear your browser cache

2. **Update Resource Version**:
   - Go to Settings → Dashboards → Resources
   - Find the security-overview-card resource
   - Edit it and add/increment a version parameter:
     ```
     /local/security-overview-card.js?v=2
     ```

3. **Verify File Installation**:
   - Ensure `security-overview-card.js` is in your `config/www/` folder
   - Check file size is approximately 34KB
   - Verify the file is the latest version from this repository

4. **Restart Home Assistant**:
   - Go to Developer Tools → Restart
   - Wait for Home Assistant to fully restart

5. **Re-add the Card**:
   - Remove the card from your dashboard
   - Add it again using the visual editor
   - You should now see:
     - Title input field
     - Show Header toggle
     - **Max Height input field** (new!)
     - Entity selection with working dropdown
     - Add Entity button

### Entity Picker Tips

- Click "Add Entity" to create a new entity picker
- Click the dropdown to select from available entities
- Entity pickers now properly save your selection
- Remove unwanted entities with the X button

### Max Height Not Working

If you set a max_height but don't see scrolling:

- Make sure you entered a valid CSS height value (e.g., `300px`, `50vh`, `20em`)
- Check that your card has enough entities to exceed the height
- Try a smaller value like `200px` to test
- Verify you're viewing the card (not the editor)

## Support

For issues, feature requests, or contributions, please visit the [GitHub repository](https://github.com/fappsde/security_overview_card).

## License

MIT License - see LICENSE file for details
