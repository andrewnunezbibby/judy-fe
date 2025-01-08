export const Messages = [
  {
    text: "The issue you're encountering is indeed related to how Vite handles the build output and how the Chrome extension expects the files to be organized. When you specify paths in the manifest.json file for a Chrome extension, these paths should point to the actual locations in the build output directory (dist/), not the source directory (src/).",
    isChatMessage: true,
  },
  {
    text: "In your case, you are referencing the SidePanel component as if it were a TypeScript source file directly in the manifest.json, which won't work because the Chrome browser expects all files referenced in the manifest to be actual JavaScript files or assets that are present in the final build directory.",
    isChatMessage: false,
  },
  {
    text: 'First, you need to change the manifest.json to point to the correct built file. Typically, Vite will bundle your React components into a single or several JavaScript files, not as .tsx or .ts files. You might want to point to an HTML file that embeds your React application if your SidePanel is part of a larger React app. If the SidePanel is meant to be a standalone panel, make sure the output JavaScript file that contains the SidePanel code is correctly referenced.',
    isChatMessage: true,
  },
  {
    text: "Assuming you're using a popup or similar mechanism to include the SidePanel, your manifest might look something like this:",
    isChatMessage: false,
  },
];
