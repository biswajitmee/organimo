// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// export default defineConfig({
//   plugins: [react()],
//   base: "/home",
//   resolve: {
//     alias: {
//       // Add aliases for your project directories here
//       '@': '/src', // Example: Map "@" to your "src" directory
//     },
//   },
//   build: {
//     rollupOptions: {
//       output: {
//         manualChunks: {
//           // Define manual chunks here if needed
//         }
//       }
//     },
//     chunkSizeWarningLimit: 5000 // Set your desired limit in kB
//   }
// });


import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  base: "/", // 👈 Must match GitHub repo name
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // ✅ Correct way
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {},
      },
    },
    chunkSizeWarningLimit: 5000,
  },
});
