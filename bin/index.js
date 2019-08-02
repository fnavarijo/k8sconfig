#!/usr/bin/env node

const inquirer = require('inquirer');
const {
    printInfo,
    getContexts,
    getCurrentContext,
    bufferToString,
    useContext } = require('./util');

function currentContext() {
    let { output } = getCurrentContext();
    printInfo('Current context: ', output[1]);
}

async function selectContexts() {
    const { output } = getContexts();
    const contexts = bufferToString(output[1]).split('\n').map(context => context.split(/\s+/)[1]);
    contexts.shift();
    contexts.pop();

    const options = inquirer.prompt([
        { 
            type: 'list',
            name: 'context',
            choices: contexts
        }
    ]);
    const { context } = await options;
    return context;
}

function setContext(context) {
    useContext(context);
    printInfo('Context set', context);
}

async function init() {
    currentContext();
    const selectedCtxt = await selectContexts();
    setContext(selectedCtxt);
}

init();