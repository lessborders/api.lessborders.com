// hack for passenger to work with ESM modules
async function myFunc() {
    const { itsMine } = await import("./src/app.js");
}
myFunc()