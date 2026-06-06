module.exports = {
  daemon: true,
  run: [
    {
      method: "shell.run",
      params: {
        venv: "env",
        venv_python: "3.11",
        env: {
          PYTHONUNBUFFERED: "1"
        },
        path: "app",
        message: [
          "omlx serve --model-dir ../models --base-path ../data --host 127.0.0.1 --port {{port}}"
        ],
        on: [{
          event: "/(http:\\/\\/[0-9.:]+)/",
          done: true
        }]
      }
    },
    {
      method: "local.set",
      params: {
        url: "{{input.event[1]}}"
      }
    },
    {
      method: "process.wait",
      params: {
        uri: "{{local.url}}/health"
      }
    }
  ]
}
