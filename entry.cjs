async function myFunc() {
    const { itsMine } = await import("./src/app.js");
}
myFunc()