function parseRepoUrl(repoUrl: string) {
  try {
    const url = new URL(repoUrl);
    const parts = url.pathname.split("/").filter(Boolean);

    return {
      owner: parts[0],
      repo: parts[1]?.replace(".git", ""),
    };
  } catch {
    throw new Error("Invalid GitHub URL");
  }
}

function buildStructure(tree: any[]) {
  const root: any[] = [];
  const map: Record<string, any> = {};

  for (const item of tree) {
    const parts = item.path.split("/");
    const name = parts[parts.length - 1];
    const isFolder = item.type === "tree";

    const node = {
      name,
      type: isFolder ? "folder" : "file",
      description: "",
      children: isFolder ? [] : undefined,
    };

    map[item.path] = node;

    if (parts.length === 1) {
      root.push(node);
    } else {
      const parentPath = parts.slice(0, -1).join("/");
      if (map[parentPath]) {
        map[parentPath].children = map[parentPath].children || [];
        map[parentPath].children.push(node);
      }
    }
  }

  return root;
}

export const githubService = {

    async getRepoData(repoUrl: string) {
        const { owner, repo } = parseRepoUrl(repoUrl);

        const repoRes = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
            headers: {
                Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
            }
        });
        if (!repoRes.ok) {
            throw new Error("GitHub repo not found");
        }
        const repoData = await repoRes.json();
        console.log(repoData)
        
        const treeRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/trees/${repoData.default_branch}?recursive=1`, {
            headers: {
                Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
            }
        });
        const treeData = await treeRes.json();
        console.log(treeData)

        const folderTree =
        treeData?.tree?.map((item: any) => item.path).slice(0, 60) || []; // limit for token safety
        const structure = buildStructure(treeData?.tree?.slice(0, 60) || []);

        let packageJson = null;
        try {
            const pkgRes = await fetch(`https://raw.githubusercontent.com/${owner}/${repo}/${repoData.default_branch}/package.json`, {
                headers: {
                    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
                }
            });
            if (pkgRes.ok) {
                packageJson = await pkgRes.text();
            }
        } catch (err) {
            console.log(err)
        }        

        return {
            repoName: repoData.name,
            owner: repoData.owner.login,
            description: repoData.description,
            primaryLanguage: repoData.language,
            folderTree,
            structure,
            packageJson,
        };
    },
};