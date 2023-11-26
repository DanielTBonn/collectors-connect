 import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 3000,
//     open: true,
//     proxy: {
//       '/graphql': {
//         target: 'http://localhost:3001',
//         changeOrigin: true,
//         secure: false,
//       }
//     }
//   }
// })

// USE OLD DEFINECONFIG INSTEAD OF THIS ONE WHEN PROXY SERVER IS WORKING
export default defineConfig (({ mode }) => {

  const env = loadEnv(
    'mock',
    process.cwd(),
    ''
    )

    const processEnvValues = {
      'process.env': Object.entries(env).reduce(
        (prev, [key, val]) => {
          return {
            ...prev,
            [key]: val
          }
        },
        {},
      )
    }

   return {
    build: {
      sourcemap: true,
      commonjsOptions: {
        include: [/node_modules/],
        extensions: ['.js', '.cjs'],
        strictRequires: true,
        // https://stackoverflow.com/questions/62770883/how-to-include-both-import-and-require-statements-in-the-bundle-using-rollup
        transformMixedEsModules: true,
      },
    },
      plugins: [react()],
      define: processEnvValues,
      server: {
        port: 3000,
        open: true,
        proxy: {
          '/graphql': {
            target: 'http://localhost:3001',
            changeOrigin: true,
            secure: false,
          }
        }
      }
    }
})
