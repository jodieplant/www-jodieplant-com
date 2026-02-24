# PostHog Analytics Setup Guide

This document defines the PostHog configuration for www.jodieplant.com so the setup is reproducible.

## Project Setup

1. Create a PostHog project at https://posthog.com
2. Copy the Project API Key
3. Set environment variables:
   - `PUBLIC_POSTHOG_KEY` — your PostHog project API key
   - `PUBLIC_POSTHOG_HOST` — PostHog instance URL (default: `https://us.i.posthog.com`)
4. PostHog loads only after cookie consent is granted (see `CookieConsent.astro`)
5. PostHog is disabled on localhost

## Events Reference

### Core Events (FEAT-010)

| Event | Properties | Fires When |
|-------|-----------|------------|
| `$pageview` | (auto) | Every page load |
| `$pageleave` | (auto) | Every page exit |
| `cta_clicked` | `cta_text`, `cta_location` (hero/nav/footer/inline), `cta_destination`, `page` | CTA button/link clicked |
| `email_clicked` | `location`, `page` | mailto: link clicked |
| `nav_clicked` | `link_text`, `destination`, `is_mobile` | Header/footer nav link clicked |

### Person Properties (set on first visit)

| Property | Source |
|----------|--------|
| `first_visit_page` | `window.location.pathname` |
| `utm_source` | URL parameter |
| `utm_medium` | URL parameter |
| `utm_campaign` | URL parameter |

## Conversion Funnels

### Primary Funnel

Measures the path from homepage visit to form submission.

| Step | Event | Filter |
|------|-------|--------|
| 1 | `$pageview` | `$current_url` contains `/` (homepage) |
| 2 | `$pageview` | `$current_url` contains `/contact` |
| 3 | `cta_clicked` | `cta_text` = "Send My Request" |

### Services Exploration Funnel

Measures how visitors explore services before converting.

| Step | Event | Filter |
|------|-------|--------|
| 1 | `$pageview` | `$current_url` = `/` |
| 2 | `$pageview` | `$current_url` contains `/services` |
| 3 | `$pageview` | `$current_url` contains `/contact` |

## Dashboards

### Overview Dashboard

| Panel | Type | Definition |
|-------|------|-----------|
| Unique Visitors | Trend | `$pageview` → unique users, daily/weekly/monthly |
| Page Views by Page | Breakdown | `$pageview` broken down by `$current_url` |
| Top Referrers | Breakdown | `$pageview` broken down by `$referrer` |
| Device Breakdown | Breakdown | `$pageview` broken down by `$device_type` |
| Sessions | Trend | Unique sessions per day |

### Conversion Dashboard

| Panel | Type | Definition |
|-------|------|-----------|
| Primary Funnel | Funnel | See Primary Funnel above |
| CTA Clicks by Location | Breakdown | `cta_clicked` broken down by `cta_location` |
| Email Clicks | Trend | `email_clicked` count per day |
| Contact Page Visits | Trend | `$pageview` where `$current_url` contains `/contact` |

## KPI Mapping (Brief Section 13)

| KPI | PostHog Metric |
|-----|---------------|
| Monthly unique visitors | `$pageview` → unique users (monthly) |
| Contact form submissions | `cta_clicked` where `cta_text` = "Send My Request" |
| Form conversion rate | Primary Funnel step 2→3 conversion % |
| Traffic by source | `$pageview` broken down by `$referrer` |
| Top pages | `$pageview` broken down by `$current_url` |
| CTA engagement | `cta_clicked` count and breakdown by location |
| Email click rate | `email_clicked` / `$pageview` (contact page) |

## Future Events (planned)

These events are defined but not yet implemented:

- `form_viewed`, `form_started`, `form_field_completed`, `form_abandoned`, `form_error` (FEAT-020)
- `scroll_depth`, `page_section_viewed` (FEAT-021)
- `blog_post_read`, `external_link_clicked` (FEAT-024)
- Session recordings with masked sensitive fields (FEAT-023)
