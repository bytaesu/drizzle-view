![demo](https://github.com/user-attachments/assets/dc895770-5e85-4de1-8e60-0a1a88c5bbb7)

# `drizzle-view`

Run Drizzle Studio and Drizzle Visualizer together in one view.

I noticed that Drizzle v1 will soon be released, and hopefully these local tools will be integrated directly into Drizzle Studio in the future.

## Installation & Usage

### Inside a project using drizzle-orm

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

### Get drizzle-view

```
git clone https://github.com/bytaesu/drizzle-view
cd drizzle-view

pnpm install
pnpm dev
```

**Open 👉 http://localhost:3333**

Enjoy!

## Limitation

As both views are embedded in iframes, custom theme is currently unsupported.
