module.exports = {
  requires: {
    bundle: "ai"
  },
  run: [
    {
      when: "{{!exists('app')}}",
      method: "shell.run",
      params: {
        message: [
          "git clone https://github.com/jundot/omlx.git app"
        ]
      }
    },
    {
      method: "shell.run",
      params: {
        message: "mkdir -p models data"
      }
    },
    {
      method: "json.set",
      params: {
        "data/settings.json": {
          "auth.skip_api_key_verification": true
        }
      }
    },
    {
      method: "shell.run",
      params: {
        venv: "env",
        venv_python: "3.11",
        path: "app",
        message: [
          "uv pip install -e \".[mcp]\""
        ]
      }
    },
  ]
}
