# oMLX Pinokio Launcher

This launcher installs and runs [oMLX](https://github.com/jundot/omlx), an Apple Silicon LLM inference server with continuous batching, tiered KV caching, an admin dashboard, and OpenAI-compatible API endpoints.

oMLX is macOS Apple Silicon software. This launcher is marked for `darwin` and `arm64`, and uses a Python 3.11 virtual environment managed by Pinokio.

## How to Use

1. Click **Install** to clone oMLX into `app/` and install it with `uv`.
2. Click **Start** to run `omlx serve` on `127.0.0.1` with a Pinokio-assigned port.
3. Open **Web UI** to manage models, download MLX models, configure settings, and monitor the server.
4. Open **Chat** to use the built-in chat UI.

The launcher initializes oMLX in local no-auth mode during install by setting `auth.skip_api_key_verification` to `true` in `data/settings.json`. Web UI, Chat, and local API requests do not require an API key while the server is bound to `127.0.0.1`. If you re-enable API key verification in oMLX settings, the launcher falls back to oMLX's `/admin/auto-login` route when a main API key is saved.

The launcher stores oMLX runtime data in `data/` and model files in `models/`. Reset removes the cloned app and Python environment, but preserves `models/` and `data/`.

## API

After the server starts, Pinokio shows the Web UI. The API base URL is the same captured URL with `/v1` appended:

```text
http://127.0.0.1:<port>/v1
```

The launcher disables API key verification by default, so the examples below do not include authentication headers. If you re-enable API key verification in oMLX, include `Authorization: Bearer <key>` in requests.

### Curl

```bash
curl http://127.0.0.1:<port>/v1/models

curl http://127.0.0.1:<port>/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "your-model-id",
    "messages": [
      { "role": "user", "content": "Write a short haiku about local inference." }
    ]
  }'
```

### JavaScript

```javascript
const baseURL = "http://127.0.0.1:<port>/v1"

const response = await fetch(`${baseURL}/chat/completions`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    model: "your-model-id",
    messages: [
      { role: "user", content: "Write a short haiku about local inference." }
    ]
  })
})

console.log(await response.json())
```

### Python

```python
import requests

base_url = "http://127.0.0.1:<port>/v1"

response = requests.post(
    f"{base_url}/chat/completions",
    json={
        "model": "your-model-id",
        "messages": [
            {
                "role": "user",
                "content": "Write a short haiku about local inference.",
            }
        ],
    },
)

print(response.json())
```

## Launcher Files

- `install.js`: clones oMLX and installs the editable package with MCP support.
- `start.js`: starts the oMLX server on localhost with a dynamic Pinokio port.
- `update.js`: pulls launcher/app updates and refreshes the editable install.
- `reset.js`: removes the cloned app and virtual environment.
- `pinokio.js`: renders the Pinokio menu.
- `pinokio.json`: launcher metadata and platform declaration.
