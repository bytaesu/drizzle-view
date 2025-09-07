# Drizzle View

Run Drizzle Studio and Drizzle Visualizer together in one view.

![demo](https://github.com/user-attachments/assets/d0a59505-5739-4eb2-865a-6a07a6e283ec)

## Installation

```bash
npm install -g drizzle-view
# or
pnpm add -g drizzle-view
# or
yarn global add drizzle-view
```

## Inside a project using drizzle-orm

**Install required packages:**

```sh
pnpm add -D drizzle-kit drizzle-lab concurrently
```

**Add a script to your package.json:**

```json
"scripts": {
  "db:view": "concurrently \"pnpm drizzle-kit studio\" \"pnpm drizzle-lab visualizer\""
}
```

**Run:**

```sh
pnpm db:view
```

## Usage

```bash
# Basic usage (default ports)
drizzle-view

# Custom URLs
drizzle-view --studio=http://localhost:1234 --visualizer=http://localhost:5678 --port=3333

# Help
drizzle-view --help
```

### Options

- `--studio <url>`: Drizzle Studio URL (default: http://local.drizzle.studio)
- `--visualizer <url>`: Drizzle Visualizer URL (default: http://localhost:64738)
- `--port <port>`: Web interface port (default: 3333)
- `--help`: Show help## Features

## Requirements

- Running Drizzle Studio, Drizzle Visualizer instances

## License

MIT
