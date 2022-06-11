const {exec} = require('child_process');

module.exports = () => new Promise((resolve, reject) => {
    let command;
    switch (process.platform) {
        case 'win32':
            command = 'echo %SystemDrive%';
            break;
        case 'darwin':
            command = 'df -l | awk \'$9 == "/"\'';
            break;
        default:
            command = 'df -l | awk \'$6 == "/"\'';
            break;
    }

    exec(command, (err, stdout, stderr) => {
        if (err || stderr) {
            reject(new Error('Error: Something wrong happened.'));
        }

        switch (process.platform) {
            case 'win32':
                resolve(stdout.split('\r\n')[0]);
                break;
            case 'darwin':
                resolve(stdout.split('  ')[0]);
                break;
            default:
                resolve(stdout.split('   ')[0]);
                break;
        }
    });
});
