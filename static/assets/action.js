'use strict';

// Define schemas for your action's settings and parameters
const parameterDefinitions = {
    urlPath: { type: "string" },
    myBool: { type: "boolean" },
    sleepMs: { type: "int" }
};
const settingDefinitions = {
    externalUrl: { type: "string" },
    retries: { type: "int" },
};
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
async function main(parameters, settings, actionsAPI) {
    const url = `${settings.externalUrl}/${parameters.urlPath}`;
    const startTime = performance.now();
    if (parameters.sleepMs) {
        await sleep(parameters.sleepMs);
    }
    // Make a request to an external URL using fetch
    const result = await fetch(url, {
        method: "get",
        headers: {
            "Content-Type": "application/json",
        },
    });
    console.log(`request took ${performance.now() - startTime}ms`);
    // try parsing result as either json or text
    let resultData;
    try {
        resultData = await result.clone().json();
    }
    catch {
        resultData = await result.clone().text();
    }
    // read/write files using the actions helpers
    const files = await actionsAPI.listSequences();
    console.log(`sequence files: ${JSON.stringify(files)}`);
    const readFileName = "my_file";
    // note: only wrap in try/catch to handle *non-fatal errors*! Fatal errors should be thrown to properly report action run as failure
    try {
        const myFile = await actionsAPI.readSequence(readFileName);
        console.log(`${readFileName}: ${JSON.stringify(myFile)}`);
    }
    catch (e) {
        console.warn(`Could not find file named ${readFileName}`);
    }
    const jsonStr = JSON.stringify(resultData, null, 2);
    const writeResult = await actionsAPI.writeSequence("action-template-output", jsonStr);
    console.log(`writeResult: ${JSON.stringify(writeResult)}`);
    return {
        status: "SUCCESS",
        data: resultData,
    };
}

exports.main = main;
exports.parameterDefinitions = parameterDefinitions;
exports.settingDefinitions = settingDefinitions;
