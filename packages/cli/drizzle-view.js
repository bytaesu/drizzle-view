const https = require("https");
const fs = require("fs");
const path = require("path");
const { execSync, spawn } = require("child_process");

const GITHUB_REPO = "bytaesu/drizzle-view";
const VERSION = require("./package.json").version;

function getPlatformInfo() {
  const platform = process.platform;
  const arch = process.arch;

  let binaryName = `drizzle-view-${platform}-${arch}`;
  if (platform === "win32") {
    binaryName += ".exe";
  }

  return { platform, arch, binaryName };
}

function downloadFile(url, destination) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destination);

    https
      .get(url, (response) => {
        if (response.statusCode === 302 || response.statusCode === 301) {
          return downloadFile(response.headers.location, destination)
            .then(resolve)
            .catch(reject);
        }

        if (response.statusCode !== 200) {
          reject(
            new Error(`HTTP ${response.statusCode}: ${response.statusMessage}`),
          );
          return;
        }

        response.pipe(file);

        file.on("finish", () => {
          file.close();
          resolve();
        });

        file.on("error", (err) => {
          fs.unlink(destination, () => {});
          reject(err);
        });
      })
      .on("error", (err) => {
        reject(err);
      });
  });
}

async function ensureBinary() {
  const { binaryName } = getPlatformInfo();
  const binaryPath = path.join(__dirname, "bin", binaryName);

  // Binary already exists
  if (fs.existsSync(binaryPath)) {
    return binaryPath;
  }

  console.log("=> Setting up Drizzle View...");

  // bin 폴더 생성
  const binDir = path.dirname(binaryPath);
  if (!fs.existsSync(binDir)) {
    fs.mkdirSync(binDir, { recursive: true });
  }

  // Try to build locally first (for development)
  const mainGoPath = path.join(__dirname, "main.go");
  if (fs.existsSync(mainGoPath)) {
    try {
      console.log("=> Building binary locally...");
      const buildCmd = `go build -ldflags='-s -w' -o bin/${binaryName} main.go`;
      execSync(buildCmd, {
        cwd: __dirname,
        stdio: "inherit",
      });

      if (process.platform !== "win32") {
        fs.chmodSync(binaryPath, 0o755);
      }

      console.log(`🟢 Built ${binaryName} locally`);
      return binaryPath;
    } catch (error) {
      console.log("Local build failed, downloading from GitHub releases...");
    }
  }

  // Download from GitHub releases
  const downloadUrl = `https://github.com/${GITHUB_REPO}/releases/download/v${VERSION}/${binaryName}`;

  try {
    console.log(`=> Downloading ${binaryName}...`);
    await downloadFile(downloadUrl, binaryPath);

    if (process.platform !== "win32") {
      fs.chmodSync(binaryPath, 0o755);
    }

    console.log(`🟢 Downloaded ${binaryName}`);
    return binaryPath;
  } catch (error) {
    console.error(`Failed to download binary: ${error.message}`);
    console.error("Please check your internet connection or try again later");
    process.exit(1);
  }
}

async function main() {
  try {
    const binaryPath = await ensureBinary();

    // Execute the Go binary with all arguments
    const child = spawn(binaryPath, process.argv.slice(2), {
      stdio: "inherit",
      shell: false,
    });

    child.on("error", (error) => {
      console.error("Failed to start drizzle-view:", error.message);
      process.exit(1);
    });

    child.on("exit", (code) => {
      process.exit(code);
    });
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { ensureBinary };
