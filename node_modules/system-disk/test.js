const test = require('ava');
const systemDisk = require('.');

test('Able to return a disk', async t => {
    try {
        await systemDisk();
        t.pass();
    } catch {
        t.fail();
    }
});

test('Return correct type', async t => {
    try {
        const disk = await systemDisk();
        t.is(typeof disk, 'string');
    } catch {
        t.fail();
    }
});
