const path = require("path");
const fs = require("fs");
const cp = require("child_process");

function getFolder(publicSub, chapterName, targetName) {
  const chapterPath = path.normalize(
    path.join(
      __dirname,
      "..",
      "..",
      "jobreadyreact.com",
      "public",
      publicSub,
      chapterName
    )
  );
  if (!fs.existsSync(chapterPath)) {
    fs.mkdirSync(chapterPath);
  }
  const targetPath = path.join(chapterPath, targetName);
  if (fs.existsSync(targetPath)) {
    fs.rmSync(targetPath, { recursive: true, force: true });
  }
  return targetPath;
}

function build(sourceFolder, index) {
  const progress = `[${index + 1}/${projects.length}]`;

  const projectName = path.basename(sourceFolder);
  const chapterName = path.basename(path.dirname(sourceFolder));

  // First build to proper folder
  const buildPath = getFolder("builds", chapterName, projectName);
  cp.execSync(`npm run build -- --outDir ${buildPath}`, {
    cwd: sourceFolder,
  });

  // The archive to proper zip
  const archivePath = getFolder(
    "zips",
    chapterName,
    `${projectName}.zip`
  );
  cp.execSync(`git archive -o ${archivePath} HEAD`, {
    cwd: sourceFolder,
  });

  console.log("Build and published", projectName, progress);

  return {
    repo: projectName,
    chapter: chapterName,
    build: `/builds/${chapterName}/${projectName}/`,
    content: `/zips/${chapterName}/${projectName}.zip`,
  };
}

const packageJson = require("../package.json");
const projects = packageJson.workspaces.map((folder) =>
  path.join(__dirname, "..", folder)
);
const builds = projects.map(build).filter(Boolean);

const initialOutput = {};

const output = builds.reduce((o, { repo, chapter, build, content }) => {
  (o[chapter] || (o[chapter] = {}))[repo] = { build, content };
  return o;
}, initialOutput);

const configPath = path.normalize(
  path.join(
    __dirname,
    "..",
    "..",
    "jobreadyreact.com",
    "app",
    "config",
    "repositories.json"
  )
);
fs.rmSync(configPath);
fs.writeFileSync(configPath, JSON.stringify(output, null, 2) + "\n");

const initialRedirect = {
  "*": "/",
};
const redirects = builds.reduce((o, { repo, chapter }) => {
  o[chapter] = `/browse/${chapter}`;
  o[`${chapter}-${repo}`] = `/browse/${chapter}/${repo}/info`;
  return o;
}, initialRedirect);
const redirectContent = Object.entries(redirects)
  .map(([key, value]) => `/${key}  https://jobreadyreact${value}`)
  .reverse()
  .join("\n");

const redirectPath = path.normalize(
  path.join(__dirname, "..", "..", "reactlikea.pro", "_redirects")
);
fs.rmSync(redirectPath);
fs.writeFileSync(redirectPath, redirectContent + "\n");
