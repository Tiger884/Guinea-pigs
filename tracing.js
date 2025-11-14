// OpenTelemetry Tracing for Artist Paws Website
// This module sets up browser-based tracing to monitor user interactions and performance

(function() {
    'use strict';

    // OpenTelemetry Web SDK - Simplified implementation using CDN
    // For production, consider using npm packages: @opentelemetry/sdk-trace-web, @opentelemetry/instrumentation-document-load, etc.
    
    class SimpleTracer {
        constructor() {
            this.serviceName = 'artist-paws-website';
            this.endpoint = 'http://localhost:4318/v1/traces'; // AI Toolkit OTLP endpoint
            this.traces = [];
            this.activeSpans = new Map();
            this.sessionId = this.generateId();
            
            // Отключаем трассировку на production (GitHub Pages)
            this.isProduction = window.location.hostname !== 'localhost' && 
                               window.location.hostname !== '127.0.0.1' &&
                               !window.location.hostname.includes('local');
            
            if (!this.isProduction) {
                console.log('🔍 Artist Paws Tracing initialized - Session:', this.sessionId);
            }
        }

        generateId() {
            return Math.random().toString(36).substring(2, 15) + 
                   Math.random().toString(36).substring(2, 15);
        }

        getCurrentTimestamp() {
            return Date.now() * 1000000; // Convert to nanoseconds
        }

        startSpan(name, attributes = {}) {
            const spanId = this.generateId();
            const span = {
                traceId: this.sessionId,
                spanId: spanId,
                name: name,
                kind: 1, // SPAN_KIND_INTERNAL
                startTime: this.getCurrentTimestamp(),
                attributes: {
                    'service.name': this.serviceName,
                    'page.url': window.location.href,
                    'page.title': document.title,
                    'user.agent': navigator.userAgent,
                    'screen.width': window.innerWidth,
                    'screen.height': window.innerHeight,
                    ...attributes
                },
                events: []
            };

            this.activeSpans.set(spanId, span);
            return spanId;
        }

        addEvent(spanId, eventName, attributes = {}) {
            const span = this.activeSpans.get(spanId);
            if (span) {
                span.events.push({
                    name: eventName,
                    time: this.getCurrentTimestamp(),
                    attributes: attributes
                });
            }
        }

        endSpan(spanId, attributes = {}) {
            const span = this.activeSpans.get(spanId);
            if (span) {
                span.endTime = this.getCurrentTimestamp();
                span.attributes = { ...span.attributes, ...attributes };
                
                // Calculate duration
                const duration = (span.endTime - span.startTime) / 1000000; // Convert to ms
                span.attributes['span.duration_ms'] = duration;

                this.traces.push(span);
                this.activeSpans.delete(spanId);

                // Send trace to collector
                this.sendTrace(span);

                console.log(`✅ Span completed: ${span.name} (${duration.toFixed(2)}ms)`);
            }
        }

        async sendTrace(span) {
            try {
                // Format for OTLP HTTP JSON
                const payload = {
                    resourceSpans: [{
                        resource: {
                            attributes: [
                                { key: 'service.name', value: { stringValue: this.serviceName } },
                                { key: 'session.id', value: { stringValue: this.sessionId } }
                            ]
                        },
                        scopeSpans: [{
                            spans: [{
                                traceId: this.base64ToHex(btoa(span.traceId)),
                                spanId: this.base64ToHex(btoa(span.spanId)),
                                name: span.name,
                                kind: span.kind,
                                startTimeUnixNano: span.startTime.toString(),
                                endTimeUnixNano: span.endTime.toString(),
                                attributes: Object.entries(span.attributes).map(([key, value]) => ({
                                    key: key,
                                    value: { stringValue: String(value) }
                                })),
                                events: span.events.map(event => ({
                                    name: event.name,
                                    timeUnixNano: event.time.toString(),
                                    attributes: Object.entries(event.attributes).map(([key, value]) => ({
                                        key: key,
                                        value: { stringValue: String(value) }
                                    }))
                                }))
                            }]
                        }]
                    }]
                };

                // Не отправляем трассировку на production
                if (this.isProduction) {
                    console.debug('Tracing disabled on production');
                    return;
                }

                // Send to AI Toolkit trace collector
                const response = await fetch(this.endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                    mode: 'cors'
                }).catch(err => {
                    // Silently fail if collector is not available
                    console.debug('Trace collector not reachable:', err.message);
                });

                if (response && response.ok) {
                    console.debug('Trace sent successfully');
                }
            } catch (error) {
                console.debug('Failed to send trace:', error.message);
            }
        }

        base64ToHex(base64) {
            const raw = atob(base64);
            let hex = '';
            for (let i = 0; i < raw.length; i++) {
                const hexChar = raw.charCodeAt(i).toString(16).padStart(2, '0');
                hex += hexChar;
            }
            return hex.padEnd(32, '0').substring(0, 32);
        }

        // Convenience method for automatic span
        trace(name, fn, attributes = {}) {
            const spanId = this.startSpan(name, attributes);
            try {
                const result = fn();
                if (result instanceof Promise) {
                    return result
                        .then(res => {
                            this.endSpan(spanId, { 'result.status': 'success' });
                            return res;
                        })
                        .catch(err => {
                            this.endSpan(spanId, { 
                                'result.status': 'error',
                                'error.message': err.message 
                            });
                            throw err;
                        });
                } else {
                    this.endSpan(spanId, { 'result.status': 'success' });
                    return result;
                }
            } catch (err) {
                this.endSpan(spanId, { 
                    'result.status': 'error',
                    'error.message': err.message 
                });
                throw err;
            }
        }
    }

    // Create global tracer instance
    window.ArtistPawsTracer = new SimpleTracer();

    // Auto-instrumentation: Page Load
    const pageLoadSpan = window.ArtistPawsTracer.startSpan('page.load', {
        'navigation.type': performance.navigation ? performance.navigation.type : 'unknown'
    });

    window.addEventListener('load', function() {
        const timing = performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        const domContentLoaded = timing.domContentLoadedEventEnd - timing.navigationStart;
        const domInteractive = timing.domInteractive - timing.navigationStart;

        window.ArtistPawsTracer.endSpan(pageLoadSpan, {
            'page.load_time_ms': loadTime,
            'page.dom_content_loaded_ms': domContentLoaded,
            'page.dom_interactive_ms': domInteractive,
            'page.resources_count': performance.getEntriesByType('resource').length
        });
    });

    // Auto-instrumentation: Track errors
    window.addEventListener('error', function(event) {
        const errorSpan = window.ArtistPawsTracer.startSpan('error.occurred', {
            'error.message': event.message,
            'error.filename': event.filename,
            'error.line': event.lineno,
            'error.column': event.colno
        });
        window.ArtistPawsTracer.endSpan(errorSpan);
    });

    // Auto-instrumentation: Track unhandled promise rejections
    window.addEventListener('unhandledrejection', function(event) {
        const errorSpan = window.ArtistPawsTracer.startSpan('promise.rejection', {
            'error.reason': event.reason ? event.reason.toString() : 'Unknown'
        });
        window.ArtistPawsTracer.endSpan(errorSpan);
    });

    // Helper: Track user clicks
    document.addEventListener('click', function(event) {
        const target = event.target;
        const tagName = target.tagName.toLowerCase();
        
        if (['a', 'button'].includes(tagName) || target.classList.contains('master-card')) {
            const clickSpan = window.ArtistPawsTracer.startSpan('user.click', {
                'element.tag': tagName,
                'element.text': target.textContent.substring(0, 50),
                'element.id': target.id || 'none',
                'element.class': target.className || 'none',
                'click.x': event.clientX,
                'click.y': event.clientY
            });
            window.ArtistPawsTracer.endSpan(clickSpan);
        }
    });

    console.log('🎨 Artist Paws Tracing ready! Use window.ArtistPawsTracer to create custom spans.');
})();
