export type TechStackItem = {
  name: string;
  description: string;
};

export type Explanation = {
  what: string;
  who: string;
  features: string[];
  techStack: TechStackItem[];
};

export type TreeNode = {
  name: string;
  type: "folder" | "file";
  description: string;
  children?: TreeNode[];
};

export type GitHubTreeItem = {
  path: string;
  type: "blob" | "tree";
  sha: string;
  size?: number;
  url: string;
};

export type RepoData = {
  repoName: string;
  owner: string;
  description: string;
  primaryLanguage: string;
  folderTree: string[];
  structure: TreeNode[];
  packageJson: string | null;
};

export type Repository = {
  _id: string;
  repoUrl: string;
  repoName: string;
  owner: string;
  primaryLanguage: string;
  techStack: TechStackItem[];
  structure: TreeNode[];
  difficulty: "beginner" | "intermediate" | "advanced";
  userId: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Readme = {
  _id: string;
  repoId: string;
  analysisId: string;
  userId: string | null;
  content: string;
  version: string;
  isLatest: boolean;
  createdAt: string;
  updatedAt: string;
};

export type UserRepo = {
  id: number;
  name: string;
  fullName: string;
  description: string;
  url: string;
  language: string;
  stars: number;
  updatedAt: string;
  isPrivate: boolean;
};

export type RepoInput = {
  repoUrl: string;
  repoName: string;
  owner: string;
  primaryLanguage: string;
  userId: string | null;
  techStack: TechStackItem[];
  structure: TreeNode[];
  difficulty: string;
};

import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
    accessToken?: string;
    provider?: string;
  }
}