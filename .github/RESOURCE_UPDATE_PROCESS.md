# Resource Update Process

This document describes how to find and add new Hyperlight resources to the website.

## Search Locations

Check these sources regularly for new content:

1. **Microsoft OSS Blog**
   - Search: https://opensource.microsoft.com/blog/search?s=hyperlight
   
2. **CNCF YouTube**
   - Channel: https://www.youtube.com/c/cloudnativefdn
   - Search for "Hyperlight"
   
3. **KubeCon Schedule**
   - Check upcoming/past KubeCon schedules for Hyperlight talks
   
4. **Microsoft Ignite**
   - Sessions: https://ignite.microsoft.com/en-US/sessions
   
5. **GitHub Releases**
   - Releases: https://github.com/hyperlight-dev/hyperlight/releases
   
6. **Social Media**
   - @OpenAtMicrosoft
   - @CloudNativeFdn
   
7. **CNCF Slack**
   - #hyperlight channel

## Adding a New Resource

### Blog Post

Add to `content/docs/resources/_index.md` in the Microsoft Open Source Blog Posts table:

```markdown
| [Title](URL) | Date | One-sentence summary |
```

### Video/Talk

Add to the Conference Talks table:

```markdown
| Title | Event | Date | Speaker(s) |
```

### Podcast

If we add a podcasts section:

```markdown
| Title | Podcast Name | Date | Guest(s) |
```

## Building and Testing

After adding resources:

```bash
# Test locally
zola serve

# Verify the resources page renders correctly
open http://127.0.0.1:1111/docs/resources/
```

## Commit Format

Use a descriptive commit message:

```
docs(resources): add KubeCon EU 2025 talk

Add Rita Zhang's talk from KubeCon EU 2025 about
Hyperlight performance optimizations.
```
