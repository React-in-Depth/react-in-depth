const path = require("path");
const fs = require("fs");
const fsExtra = require("fs-extra");
const argv = require("yargs")
  .scriptName("npm run create")
  .usage("$0 <cmd> [args]")
  .command(
    "js [chapter] [name]",
    "Create JS Vite example",
    (yargs) => {
      yargs
        .positional("chapter", {
          type: "string",
          describe: "the chapter to put the example in",
        })
        .positional("name", {
          type: "string",
          describe: "the name of the example",
        });
    },
    function (argv) {
      cloneExample(
        path.join(__dirname, "../base-projects/vite-base-js"),
        argv.chapter,
        argv.name
      );
    }
  )
  .command(
    "ts [chapter] [name]",
    "Create TS Vite example",
    (yargs) => {
      yargs
        .positional("chapter", {
          type: "string",
          describe: "the chapter to put the example in, e.g. 'ch07'",
        })
        .positional("name", {
          type: "string",
          describe: "the name of the example, e.g. 'accordion'",
        });
    },
    function (argv) {
      cloneExample(
        path.join(__dirname, "../base-projects/vite-base-ts"),
        argv.chapter,
        argv.name
      );
    }
  )
  .help().argv;

function cloneExample(from, chapter, name) {
  const targetFolder = path.join(__dirname, `../${chapter}/${name}`);
  fs.mkdirSync(targetFolder, { recursive: true });
  fsExtra.copySync(from, targetFolder, { overwrite: true });
  // Edit name inside package.json
  const packageJsonPath = path.join(targetFolder, "package.json");
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath));
  packageJson.name = `@jrr/${chapter}-${name}`;
  fs.writeFileSync(
    packageJsonPath,
    JSON.stringify(packageJson, null, 2)
  );
  // Edit title inside index.html
  const indexPath = path.join(targetFolder, "index.html");
  const indexHtml = fs.readFileSync(indexPath).toString();
  const newHtml = indexHtml.replace("vite-base", name);
  fs.writeFileSync(indexPath, newHtml);
  // Add as a workspace to root package.json
  const rootPackageJsonPath = path.join(__dirname, "../package.json");
  const rootPackageJson = JSON.parse(
    fs.readFileSync(rootPackageJsonPath)
  );
  rootPackageJson.workspaces.push(`${chapter}/${name}`);
  rootPackageJson.workspaces.sort();
  fs.writeFileSync(
    rootPackageJsonPath,
    JSON.stringify(rootPackageJson, null, 2)
  );
}
