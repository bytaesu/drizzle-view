import { BackgroundBeamsWithCollision } from "@/components/background-beams-with-collision";
import { CodeBlock } from "@/components/code-block";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mb-24">
      <Hero />
      <HowToUse />
      <Principle />
      <Pricing />
      <LinkSection />
    </div>
  );
}

const Hero = () => {
  return (
    <BackgroundBeamsWithCollision className="py-32 px-6">
      <div className="flex flex-col-reverse lg:flex-row lg:items-center items-center justify-center gap-12 max-w-5xl mx-auto w-full">
        {/* Text */}
        <div className="flex-1 text-center lg:text-left w-full min-w-0">
          <p className="text-sm sm:text-base text-muted-foreground">
            What is stopping you from trying this?
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight mt-4">
            Drizzle View
          </h1>
          <p className="text-base sm:text-lg md:text-2xl lg:text-3xl text-pretty mt-4 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl mx-auto lg:mx-0">
            Run{" "}
            <span className="underline underline-offset-2">Drizzle Studio</span>{" "}
            and{" "}
            <span className="underline underline-offset-2">
              Drizzle Visualizer
            </span>{" "}
            together in one view
          </p>
        </div>

        {/* Image */}
        <div className="flex-1 w-full max-w-xs lg:max-w-lg">
          <img
            src="/images/demo.gif"
            alt="Drizzle View demo"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
    </BackgroundBeamsWithCollision>
  );
};

const HowToUse = () => {
  const projectSetupCode = `pnpm add -D drizzle-kit concurrently
`;

  const projectScriptCode = `"scripts": {
  "db:view": "concurrently \\"pnpm drizzle-kit studio\\" \\"pnpm dlx drizzle-lab visualizer\\" \\"sleep 1 && pnpm dlx drizzle-view\\""
}
`;

  const projectRunCode = `pnpm db:view
  `;

  const drizzleViewInstallCode = `# homebrew
brew install bytaesu/homebrew-tap-drizzle-view/drizzle-view

# npm
npm install -g drizzle-view

# pnpm
pnpm add -g drizzle-view

# yarn
yarn global add drizzle-view
`;
  const drizzleViewRunCode = `drizzle-view`;

  return (
    <section className="py-18 px-6 bg-gradient-to-b from-background/50 to-background/0 max-w-2xl mx-auto">
      <div className="flex select-none flex-row items-center justify-center gap-2 px-2 mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold">How to use</h2>
        <div className="bg-primary/70 h-px flex-grow" />
      </div>

      {/* Project Setup */}
      <div className="mb-16">
        <h3 className="text-2xl font-semibold mb-8">
          Inside a project using drizzle-orm
        </h3>
        <p className="mb-2">Install packages:</p>
        <CodeBlock language="sh" value={projectSetupCode} className="mb-8" />
        <p className="mb-2">
          Add a script to your <code className="text-sm">package.json</code>:
        </p>
        <CodeBlock language="json" value={projectScriptCode} className="mb-8" />
        <p className="mb-2">Run:</p>
        <CodeBlock language="sh" value={projectRunCode} className="mb-8" />
        <p className="text-xl font-semibold">Enjoy🎉</p>
      </div>

      {/* Drizzle View Installation */}
      <div className="mb-16">
        <h3 className="text-2xl font-semibold mb-4">Global Installation</h3>
        <p className="mb-2">
          Install{" "}
          <code className="p-1 rounded-md bg-muted text-sm">drizzle-view</code>{" "}
          via your preferred package manager:
        </p>
        <CodeBlock
          language="sh"
          value={drizzleViewInstallCode}
          className="mb-8"
        />
      </div>

      {/* Options */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">Options</h3>
        <ul className="list-disc ml-6 text-muted-foreground">
          <li>
            --studio &lt;url&gt;: Drizzle Studio URL (default:
            http://local.drizzle.studio)
          </li>
          <li>
            --visualizer &lt;url&gt;: Drizzle Visualizer URL (default:
            http://localhost:64738)
          </li>
          <li>--port &lt;port&gt;: Web interface port (default: 3333)</li>
          <li>--help: Show help</li>
        </ul>
      </div>

      {/* Limitations */}
      <div>
        <h3 className="text-2xl font-semibold mb-4">Limitations</h3>
        <p className="text-muted-foreground">
          As all views are embedded in iframes, custom theme is currently
          unsupported.
        </p>
      </div>
    </section>
  );
};

const Principle = () => {
  return (
    <section className="py-18 px-6 bg-gradient-to-b from-background/50 to-background/0 max-w-2xl mx-auto">
      <div className="flex select-none flex-row items-center justify-center gap-2 px-2 mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold">Principles</h2>
        <div className="bg-primary/70 h-px flex-grow" />
      </div>
      <div className=" space-y-12 text-left">
        {/* Principle 1 */}
        <div>
          <h3 className="text-xl font-semibold mb-2">
            1. Use Official Drizzle Packages
          </h3>
          <p className="text-base sm:text-lg text-muted-foreground">
            I’m just using what Drizzle already provides. Drizzle View is
            literally <em>just a viewer</em>
          </p>
        </div>

        {/* Principle 2 */}
        <div>
          <h3 className="text-xl font-semibold mb-2">
            2. Retirement Upon Official Support
          </h3>
          <p className="text-base sm:text-lg text-muted-foreground">
            If Drizzle officially supports this feature, Drizzle View will be
            retired. I made this project mainly to{" "}
            <em>gently pressure the Drizzle team</em> 😎
          </p>
        </div>

        {/* Principle 3 */}
        <div>
          <h3 className="text-xl font-semibold mb-2">
            3. npm Package Name Ownership
          </h3>
          <p className="text-base sm:text-lg text-muted-foreground">
            I’ll hand over the{" "}
            <code className="bg-muted p-1 rounded-md text-sm">
              drizzle-view
            </code>{" "}
            npm package name immediately if the Drizzle team needs it. I always
            prefer officially supported tools
          </p>
        </div>
      </div>
    </section>
  );
};

const Pricing = () => {
  return (
    <section className="py-18 px-6 bg-gradient-to-b from-background/50 to-background/0 max-w-2xl mx-auto">
      <div className="flex select-none flex-row items-center justify-center gap-2 px-2 mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold">Pricing</h2>
        <div className="bg-primary/70 h-px flex-grow" />
      </div>

      <p className="text-lg font-semibold mb-8">
        100% Free — don’t spend your money on this stuff
      </p>
      <p className="text-base">Just follow my X account.</p>
      <p>
        I’m building cool stuff, and it’d be awesome if more people could check
        it out.
      </p>
    </section>
  );
};

const LinkSection = () => {
  return (
    <section className="px-6 bg-gradient-to-b from-background/50 to-background/0 max-w-2xl mx-auto text-center">
      <div className="flex flex-col justify-center gap-6 items-center max-w-55 mx-auto">
        {/* X Button */}
        <Link href="https://x.com/bytaesu" passHref className="w-full">
          <Button variant={"outline"} className="w-full">
            <XIcon />
            bytaesu
          </Button>
        </Link>

        {/* GitHub Button */}
        <Link
          href="https://github.com/bytaesu/drizzle-view"
          passHref
          className="w-full"
        >
          <Button variant={"outline"} className="w-full">
            <GitHubIcon />
            bytaesu/drizzle-view
          </Button>
        </Link>
      </div>
    </section>
  );
};

const XIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1024 1024"
      fill="currentColor"
      fillRule="evenodd"
    >
      <path
        d="M818 800 498.11 333.745l.546.437L787.084 0h-96.385L455.738 272 269.15 0H16.367l298.648 435.31-.036-.037L0 800h96.385l261.222-302.618L565.217 800zM230.96 72.727l448.827 654.546h-76.38L154.217 72.727z"
        transform="translate(103 112)"
      />
    </svg>
  );
};

const GitHubIcon = () => {
  return (
    <svg
      width="48px"
      height="48px"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
    >
      <path d="M7.976 0A7.977 7.977 0 0 0 0 7.976c0 3.522 2.3 6.507 5.431 7.584.392.049.538-.196.538-.392v-1.37c-2.201.49-2.69-1.076-2.69-1.076-.343-.93-.881-1.175-.881-1.175-.734-.489.048-.489.048-.489.783.049 1.224.832 1.224.832.734 1.223 1.859.88 2.3.685.048-.538.293-.88.489-1.076-1.762-.196-3.621-.881-3.621-3.964 0-.88.293-1.566.832-2.153-.05-.147-.343-.978.098-2.055 0 0 .685-.196 2.201.832.636-.196 1.322-.245 2.007-.245s1.37.098 2.006.245c1.517-1.027 2.202-.832 2.202-.832.44 1.077.146 1.908.097 2.104a3.16 3.16 0 0 1 .832 2.153c0 3.083-1.86 3.719-3.62 3.915.293.244.538.733.538 1.467v2.202c0 .196.146.44.538.392A7.984 7.984 0 0 0 16 7.976C15.951 3.572 12.38 0 7.976 0z" />
    </svg>
  );
};
