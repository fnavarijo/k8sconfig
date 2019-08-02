const chalk = require('chalk');
const { spawnSync } = require('child_process');

function bufferToString(buff) {
    return buff.toString('utf8');
}

function print(color) {
    return (label, msg) => console.log(`${chalk[color](label)}: ${msg}`)
}

function kubectl() {
    return (args) => {
        return spawnSync('kubectl', args);
    }
}

const callKubectl = kubectl();

const printInfo = print('blue');
const getContexts = () => callKubectl(['config', 'get-contexts']);
const getCurrentContext = () => callKubectl(['config', 'current-context']);

const useContext = (context) => callKubectl(['config', 'use-context', context]);

module.exports = {
    printInfo,
    getContexts,
    useContext,
    getCurrentContext,
    bufferToString
};