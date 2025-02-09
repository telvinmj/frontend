import fs from "fs";
import path from "path";

function getDirectoryStructure(dir, depth = 0, prefix = "") {
    const items = fs.readdirSync(dir);
    items.forEach((item, index) => {
        const itemPath = path.join(dir, item);
        const isLast = index === items.length - 1;
        const connector = isLast ? "└── " : "├── ";
        console.log(prefix + connector + item);

        if (fs.statSync(itemPath).isDirectory()) {
            const newPrefix = prefix + (isLast ? "    " : "│   ");
            getDirectoryStructure(itemPath, depth + 1, newPrefix);
        }
    });
}

// Define the root directory (current folder)
const rootDir = "./"; 
console.log("Project Structure:\n");
getDirectoryStructure(rootDir);
