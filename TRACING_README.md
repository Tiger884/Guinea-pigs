# 🔍 Tracing Setup for Artist Paws Website

## Overview
This project now includes OpenTelemetry-based tracing to monitor user interactions, performance metrics, and application behavior.

## What's Tracked

### Automatic Tracing
- **Page Load**: Load times, DOM ready time, resource counts
- **User Clicks**: Buttons, links, artist cards
- **Errors**: JavaScript errors and unhandled promise rejections
- **Image Viewer**: Opening and closing image lightbox
- **Theme System**: Theme initialization, application, and snowfall effects

### Tracked Events
1. `page.load` - Page loading performance
2. `user.click` - User interactions with clickable elements
3. `error.occurred` - JavaScript errors
4. `promise.rejection` - Unhandled promise rejections
5. `theme.init` - Theme manager initialization
6. `theme.apply` - Theme switching
7. `snowfall.init` - Christmas snowfall initialization
8. `image.viewer.open` - Gallery image viewer opened
9. `image.viewer.close` - Gallery image viewer closed

## Files Added/Modified

### New Files
- **`tracing.js`** - OpenTelemetry tracing implementation
- **`TRACING_README.md`** - This documentation

### Modified Files
- **`index.html`** - Added tracing.js script
- **`laska.html`** - Added tracing.js script
- **`plyushka.html`** - Added tracing.js script
- **`script.js`** - Integrated tracing in ThemeManager and image viewer

## How to Use

### 1. Start the Trace Collector
The AI Toolkit trace collector should already be running. If not, run:
- In VS Code: Press `Ctrl+Shift+P` → "AI Toolkit: Open Trace Viewer"
- Or use the command: `ai-mlstudio.tracing.open`

### 2. Open the Website
Simply open any HTML file in a browser:
```bash
# Using Python HTTP server
python -m http.server 8000

# Or using Node.js
npx serve
```

Then navigate to `http://localhost:8000`

### 3. View Traces
- Traces are automatically sent to `http://localhost:4318/v1/traces`
- View them in the AI Toolkit Trace Viewer in VS Code
- Console logs show trace confirmations (check browser DevTools)

## Trace Attributes

Each trace includes:
- **Service Name**: `artist-paws-website`
- **Session ID**: Unique per browser session
- **Page URL**: Current page location
- **Page Title**: Document title
- **User Agent**: Browser information
- **Screen Dimensions**: Window width/height
- **Custom Attributes**: Event-specific data

## Adding Custom Traces

### Simple Span
```javascript
const spanId = window.ArtistPawsTracer.startSpan('custom.event', {
    'custom.attribute': 'value'
});

// Your code here...

window.ArtistPawsTracer.endSpan(spanId, {
    'result.status': 'success'
});
```

### Auto-traced Function
```javascript
window.ArtistPawsTracer.trace('my.operation', () => {
    // Your code here
    return result;
}, {
    'operation.type': 'user_action'
});
```

### Add Events to Span
```javascript
const spanId = window.ArtistPawsTracer.startSpan('complex.operation');

window.ArtistPawsTracer.addEvent(spanId, 'step.completed', {
    'step.number': 1
});

// More work...

window.ArtistPawsTracer.addEvent(spanId, 'step.completed', {
    'step.number': 2
});

window.ArtistPawsTracer.endSpan(spanId);
```

## Performance Considerations

- Traces are sent asynchronously to avoid blocking UI
- Failed trace sends are silently caught (won't break the site)
- CORS-enabled for local development
- Console debug messages can be disabled in production

## Troubleshooting

### Traces Not Appearing
1. Check that AI Toolkit trace viewer is open
2. Verify `http://localhost:4318` is accessible
3. Check browser console for errors
4. Ensure `tracing.js` loads before `script.js`

### Console Warnings
- "Trace collector not reachable" - Normal if trace viewer isn't running
- Safe to ignore in development

### Production Deployment
For GitHub Pages deployment:
- Either remove tracing.js or
- Configure remote OTLP endpoint (e.g., Azure Application Insights, Datadog)
- Update `this.endpoint` in tracing.js

## Example Trace Output

```
🔍 Artist Paws Tracing initialized - Session: a1b2c3d4e5f6
✅ Span completed: page.load (1523.45ms)
✅ Span completed: theme.init (12.34ms)
✅ Span completed: user.click (0.52ms)
✅ Span completed: image.viewer.open (245.12ms)
```

## Architecture

```
Browser
  ├── tracing.js (SimpleTracer)
  ├── script.js (Instrumented code)
  └── HTTP POST → localhost:4318
                   ↓
              AI Toolkit
              Trace Collector
                   ↓
              Trace Viewer (VS Code)
```

## Future Enhancements

- Add Web Vitals tracking (LCP, FID, CLS)
- Track navigation timing in detail
- Monitor API calls (when backend is added)
- Add custom dimensions for A/B testing
- Implement error rate alerts

---

**Happy Tracing! 🐾🎨**
