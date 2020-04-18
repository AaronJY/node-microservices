
# node-microservices
This repo contains a demonstration of how to write micro services using:
- TypeScript
- Node
- MongoDB

In the real world, each service under `src/services` would live in its own Git repo, and the `src/common` directory (and any other shared code) would be shared across each micro service repo as an npm package. The purpose of `src/index.ts` is to bootstrap all the services together so you can run them at once for testing/demo purposes.

## Disclaimer
This repo was intended as a playground for figuring out how I would write a micro service architecture using NodeJS/TypeScript. While you're more than welcome to use this as a reference, it'll never be considered as "done", and may change drastically from one commit to the next! 😁

## Setting up
**Note:** This repo uses Yarn 🐱 instead of npm. You should be able to use npm without any issues, though you may run into dependency issues as we use a yarn lock file instead of an npm lock file.

1. Clone the repo somewhere
2. Run `yarn install` (or `npm install`)
3. Run `npm run build` to build the project
4. To start all the services at once, run `npm run start`

## Documentation
- [Mongoose v5.9.9: Schemas](https://mongoosejs.com/docs/guide.html)
- [microsoft/TypeScript-Node-Starter: A starter template for TypeScript and Node with a detailed README describing how to use the two together.](https://github.com/Microsoft/TypeScript-Node-Starter#typescript-node-starter)
- [Strongly typed models with Mongoose and TypeScript - Tom Nagle - Medium](https://medium.com/@tomanagle/strongly-typed-models-with-mongoose-and-typescript-7bc2f7197722)
- [TypeScript: Handbook - The TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/)

> Written with [StackEdit](https://stackedit.io/).