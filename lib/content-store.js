import { promises as fs } from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "data");

const readJsonFile = async (fileName) => {
  const filePath = path.join(dataDir, fileName);
  const raw = await fs.readFile(filePath, "utf8");
  return JSON.parse(raw);
};

const writeJsonFile = async (fileName, payload) => {
  const filePath = path.join(dataDir, fileName);
  await fs.writeFile(filePath, JSON.stringify(payload, null, 2), "utf8");
};

export const readProjects = async () => readJsonFile("projects.json");
export const writeProjects = async (projects) =>
  writeJsonFile("projects.json", projects);

export const readBlogs = async () => readJsonFile("blogs.json");
export const writeBlogs = async (blogs) => writeJsonFile("blogs.json", blogs);

export const readSeoConfig = async () => readJsonFile("seo.json");
