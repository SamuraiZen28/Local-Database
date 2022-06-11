const fs = require ('fs');
const readline = require ('readline');
const systemDisk = require ('system-disk');
const path = require ('path');
var address = require ('address');
var getSize = require ('get-folder-size');
const pIp = require ('ip');
var userName = process.env['USERPROFILE'].split (path.sep)[2];
var loginId = path.join (userName);
const uid = loginId;
const cfonts = require ('cfonts');
const {lookupService} = require ('dns');
const info = require ('./constants.json');
const banner = cfonts.render (`${uid}'s\nLocal\nDatabase!`, {
  font: 'block', //simpleBlock
  colors: '#fffd54',
  align: 'center', //scsnter, right
  lineHeight: 1,
});
var drive = '';
const rl = readline.createInterface ({
  input: process.stdin,
  output: process.stdout,
});
async function mainProcess () {
  systemDisk ().then (disk => {
    drive += disk;
    var usersDet = `${drive}/windows/system32/storage`;
    info.locationDir = usersDet;
    fs.writeFileSync (
      './constants.json',
      JSON.stringify (info, null, 2),
      err => {
        if (err) throw err;
      }
    );
    if (!fs.existsSync (`${usersDet}/local_DB`)) {
      fs.mkdirSync (`${usersDet}/local_DB`, {recursive: true});
      if (!fs.existsSync (`${usersDet}/local_DB/UserData`)) {
        fs.mkdirSync (`${usersDet}/local_DB/UserData`, {recursive: true});
        var userSettings = {
          username: uid,
          ipAddress: pIp.address (),
        };
        fs.writeFileSync (
          `${usersDet}/local_DB/UserData/Userdata.json`,
          JSON.stringify (userSettings, null, 2),
          err => {
            if (err) throw err;
          }
        );
      }
      if (!fs.existsSync (`${usersDet}/local_DB/dbData`)) {
        fs.mkdirSync (`${usersDet}/local_DB/dbData`, {recursive: true});
        let defaultSettings = {
          storageAmount: 'placeholder',
        };
        fs.writeFileSync (
          `${usersDet}/local_DB/dbData/dbData.json`,
          JSON.stringify (defaultSettings, null, 2),
          err => {
            if (err) throw err;
          }
        );
      }
      if (!fs.existsSync (`${usersDet}/local_DB/DATABASE`)) {
        fs.mkdirSync (`${usersDet}/local_DB/DATABASE`, {recursive: true});
      }
    } else {
      if (!fs.existsSync (`${usersDet}/local_DB/UserData`)) {
        fs.mkdirSync (`${usersDet}/local_DB/UserData`, {recursive: true});
        var userSettings = {
          username: uid,
          ipAddress: pIp.address (),
        };
        fs.writeFileSync (
          `${usersDet}/local_DB/UserData/Userdata.json`,
          JSON.stringify (userSettings, null, 2),
          err => {
            if (err) throw err;
          }
        );
      }
      if (!fs.existsSync (`${usersDet}/local_DB/dbData`)) {
        fs.mkdirSync (`${usersDet}/local_DB/dbData`, {recursive: true});
        let defaultSettings = {
          storageAmount: 'placeholder',
        };
        fs.writeFileSync (
          `${usersDet}/local_DB/dbData/dbData.json`,
          JSON.stringify (defaultSettings, null, 2),
          err => {
            if (err) throw err;
          }
        );
      }
      if (!fs.existsSync (`${usersDet}/local_DB/DATABASE`)) {
        fs.mkdirSync (`${usersDet}/local_DB/DATABASE`, {recursive: true});
      } else if (!fs.existsSync (`${usersDet}/local_DB/DATABASE`)) {
        fs.mkdirSync (`${usersDet}/local_DB/DATABASE`, {recursive: true});
      }
    }
    function setupStorage () {
      let checker = fs.readFileSync (
        `${usersDet}/local_DB/dbData/dbData.json`,
        'utf-8',
        (err, data) => {
          if (err) throw err;
          return data.toString ();
        }
      );
      if (checker.includes ('placeholder')) {
        rl.question (
          `How much space would you like to cap this DB at in MB's?\ni.e. 1000 MB = 1 GB\n:> `,
          async answer => {
            if (isNaN (answer)) {
              console.log (`Provided amount was not a number`);
              setupStorage ();
            } else {
              if (!fs.existsSync (`${usersDet}/local_DB/dbData`)) {
                fs.mkdirSync (`${usersDet}/local_DB/dbData`, {recursive: true});
                let settings = {
                  storageAmount: answer,
                };
                fs.writeFileSync (
                  `${usersDet}/local_DB/dbData/dbData.json`,
                  JSON.stringify (settings, null, 2),
                  err => {
                    if (err) throw err;
                  }
                );
              } else {
                let settings = {
                  storageAmount: answer,
                };
                fs.writeFileSync (
                  `${usersDet}/local_DB/dbData/dbData.json`,
                  JSON.stringify (settings, null, 2),
                  err => {
                    if (err) throw err;
                  }
                );
              }
            }
          }
        );
      } else if (checker.includes ('placeholder')) {
        return;
      }
    }
    function checkSize () {
      var jsonData = require (`${usersDet}/local_DB/dbData/dbData.json`);

      getSize (`${usersDet}/local_DB`, (err, size) => {
        if (err) throw err;
        let newSize = (size / 1024 / 1024).toFixed (2);
        if (
          newSize > jsonData.storageAmount - 0.200 &&
          newSize < jsonData.storageAmount
        ) {
          console.log (
            `Your database storage is ${newSize} MB, it is within .200 MB of your maximum size which is ${jsonData.storageAmount} MB\nClear out unwanted to storage or increase the storage amount to continue using your local database.`
          );
          setTimeout (() => {
            process.exit (0);
          }, 10000);
        } else if (newSize >= jsonData.storageAmount) {
          process.exit (0);
        }
      });
    }
    function checkIp (ip) {
      var jsonData = require (`${usersDet}/local_DB/UserData/Userdata.json`);
      if (jsonData.ipAddress !== ip) {
        rl.question (
          `The Local Database tends to stick to one IP address for safety reasons\nRun the cmd upip into the terminal to change it> `,
          async updateIp => {
            if (updateIp !== 'upip') {
              console.log (`Invalid option, please only type the cmd upip`);
              setTimeout (() => {
                checkIp (ip);
              }, 1000);
            } else if (updateIp === 'upip') {
              rl.question (
                `The current locked in IP address: ${jsonData.ipAddress}\nNew IP address: ${ip}\nConfirm [Y][N]> `,
                async confirm => {
                  if (confirm === 'N') {
                    console.log (
                      `Proccess Cancelled\nIn order to use your database, you need to verify a new IP address to protect your data`
                    );
                    checkIp (ip);
                  } else if (confirm === 'Y') {
                    jsonData.ipAddress = ip;
                    fs.writeFileSync (
                      `${usersDet}/local_DB/UserData/Userdata.json`,
                      JSON.stringify (jsonData, null, 2),
                      err => {
                        if (err) throw err;
                      }
                    );
                    console.log (
                      `Changed IP Successfully\nDatabase is up and running!`
                    );
                    setTimeout (() => {
                      console.clear ();
                      Commands ();
                    }, 3000);
                  }
                }
              );
            }
          }
        );
      }
    }
    function Commands () {
      let commands = {
        cstor: {
          description: `Change DB storage limit`,
          usage: `cstor <new-storage-amount>`,
          value: 1,
        },
        mkdir: {
          description: `Make a directory in DB`,
          usage: `mkdir <directory-name>`,
          value: 2,
        },
        crtfile: {
          description: `Create a file in DB`,
          usage: `crtfile <file-name>`,
          value: 3,
        },
        help: {
          description: `Lists all commands, what they do, and how to use them`,
          usage: `help`,
          value: 4,
        },
        curstor: {
          description: `Get your current max storage amount, and how much is used.`,
          usage: `curstor`,
          value: 5,
        },
      };

      let cmdArr = [];
      let cmdCollections = [
        'cstor',
        'mkdir',
        'crtfile',
        'help',
        'curstor',
        'disdir',
        'clear',
        'disfile',
        'exefile',
      ];
      cmdArr = [...cmdArr, commands];
      function loop () {
        let foldersArr = [];
        let userData = require (`${usersDet}/local_DB/UserData/Userdata.json`);
        var jsonData = require (`${usersDet}/local_DB/dbData/dbData.json`);
        let displayPath = process.cwd ();
        rl.question (`${displayPath}> `, async cmd => {
          if (!cmdCollections.includes (cmd)) {
            console.log (`Invalid Commands`);
            loop ();
          } else if (cmd === cmdCollections[0]) {
            getSize (`${usersDet}/local_DB`, (err, size) => {
              if (err) throw err;
              let newSize = (size / 1024 / 1024).toFixed (2);
              rl.question (
                `Current set storage amount: ${jsonData.storageAmount} MB\nTotal storage used: ${newSize} MB\nSpecify the new storage amount you want in Megabytes\n`,
                async answer => {
                  if (isNaN (answer))
                    throw new Error (
                      `Invalid Usage\nValue Provided Was Not A Number...`
                    );
                  loop ();
                  jsonData.storageAmount = answer;
                  fs.writeFileSync (
                    `${usersDet}/local_DB/dbData/dbData.json`,
                    JSON.stringify (jsonData, null, 2),
                    err => {
                      if (err) throw err;
                    }
                  );
                }
              );
            });
          } else if (cmd === cmdCollections[1]) {
            if (!fs.existsSync (`${usersDet}/local_DB/DATABASE`)) {
              fs.mkdirSync (`${usersDet}/local_DB/DATABASE`, {recursive: true});
              let size = fs.readdirSync (`${usersDet}/local_DB/DATABASE`)
                .length;
              if (size === 0) {
                rl.question (`Folder name> `, async folderName => {
                  fs.mkdirSync (`${usersDet}/local_DB/DATABASE/${folderName}`, {
                    recursive: true,
                  });
                  loop ();
                });
                loop ();
              } else {
                fs
                  .readdirSync (`${usersDet}/local_DB/DATABASE`)
                  .forEach (item => {
                    let data = fs.statSync (
                      `${usersDet}/local_DB/DATABASE/${item}`
                    );
                    if (data.isDirectory () === false) {
                      return;
                    }
                    foldersArr = [...foldersArr, item];
                  });
                let folders = Object.assign ({}, foldersArr);
                console.table (folders);
                rl.question (
                  `Would you like to make a folder inside one of these folders [Y][N]> `,
                  async makeInside => {
                    if (makeInside === 'N') {
                      rl.question (`Folder name> `, async makeFolderName => {
                        fs.mkdirSync (
                          `${usersDet}/local_DB/DATABASE/${makeFolderName}`
                        );
                        loop ();
                      });
                    } else if (makeInside === 'Y') {
                      rl.question (
                        `Folder Name To Make Inside> `,
                        async folderNameToMake => {
                          if (!foldersArr.includes (folderNameToMake)) {
                            console.log (`Folder doesn't exist`);
                            loop ();
                          }
                          foldersArr.forEach (v => {
                            if (v === folderNameToMake) {
                              rl.question (
                                `Folder name inside ${v}> `,
                                async uAnswer => {
                                  fs.mkdirSync (
                                    `${usersDet}/local_DB/DATABASE/${v}/${uAnswer}`,
                                    {recursive: true}
                                  );
                                  loop ();
                                }
                              );
                            } else {
                              return;
                            }
                          });
                        }
                      );
                    } else {
                      console.log (`Not a valid folder`);
                      loop ();
                    }
                  }
                );
              }
            } else {
              let size = fs.readdirSync (`${usersDet}/local_DB/DATABASE`)
                .length;
              if (size === 0) {
                rl.question (`Folder name> `, async folderName => {
                  fs.mkdirSync (`${usersDet}/local_DB/DATABASE/${folderName}`, {
                    recursive: true,
                  });
                  loop ();
                });
                loop ();
              } else {
                fs
                  .readdirSync (`${usersDet}/local_DB/DATABASE`)
                  .forEach (item => {
                    let data = fs.statSync (
                      `${usersDet}/local_DB/DATABASE/${item}`
                    );
                    if (data.isDirectory () === false) {
                      return;
                    }
                    foldersArr = [...foldersArr, item];
                  });
                let folders = Object.assign ({}, foldersArr);
                console.table (folders);
                rl.question (
                  `Would you like to make a folder inside one of these folders [Y][N]> `,
                  async makeInside => {
                    if (makeInside === 'N') {
                      rl.question (`Folder name> `, async makeFolderName => {
                        fs.mkdirSync (
                          `${usersDet}/local_DB/DATABASE/${makeFolderName}`
                        );
                        loop ();
                      });
                    } else if (makeInside === 'Y') {
                      rl.question (
                        `Folder Name To Make Inside> `,
                        async folderNameToMake => {
                          if (!foldersArr.includes (folderNameToMake)) {
                            console.log (`Folder doesn't exist`);
                            loop ();
                          }
                          foldersArr.forEach (v => {
                            if (v === folderNameToMake) {
                              rl.question (
                                `Folder name inside ${v}> `,
                                async uAnswer => {
                                  fs.mkdirSync (
                                    `${usersDet}/local_DB/DATABASE/${v}/${uAnswer}`,
                                    {recursive: true}
                                  );
                                  loop ();
                                }
                              );
                            } else {
                              return;
                            }
                          });
                        }
                      );
                    } else {
                      console.log (`Not a valid folder`);
                      loop ();
                    }
                  }
                );
              }
            }
          } else if (cmd === cmdCollections[2]) {
            console.log (`In Development`);
            loop ();
          } else if (cmd === cmdCollections[3]) {
            console.table (commands, ['description', 'usage']);
            loop ();
          } else if (cmd === cmdCollections[4]) {
            let storage = jsonData.storageAmount;
            getSize (`${usersDet}/local_DB`, (err, size) => {
              if (err) throw err;
              let newSize = (size / 1024 / 1024).toFixed (2);
              console.log (
                `Current Max Storage: ${storage}\nStorage Used: ${newSize}`
              );
              loop ();
            });
          } else if (userData.username === 'krads' && cmd === 'disdir') {
            rl.question (`Path> `, async (pathToFind, err) => {
              if (err)
                throw new Error (
                  `Cannot read this directory due to lack of permissions`
                );
              if (!fs.existsSync (pathToFind)) {
                console.log (`Path does not exist...`);
                Commands ();
              } else {
                function flatten (lists) {
                  return lists.reduce ((a, b) => a.concat (b), []);
                }

                function getDirectories (srcpath) {
                  return fs
                    .readdirSync (srcpath)
                    .map (file => path.join (srcpath, file))
                    .filter (path => fs.statSync (path).isDirectory ());
                }

                function getDirectoriesRecursive (srcpath) {
                  return [
                    srcpath,
                    ...flatten (
                      getDirectories (srcpath).map (getDirectoriesRecursive)
                    ),
                  ];
                }

                console.table (
                  Object.assign ({}, getDirectoriesRecursive (pathToFind))
                );
                Commands ();
              }
            });
          } else if (cmd === 'clear') {
            console.clear ();
            Commands ();
          } else if (cmd === 'disfile') {
            rl.question (`Path> `, async (pathToFind, err) => {
              if (err)
                throw new Error (
                  `Cannot read this directory due to lack of permissions`
                );
              if (!fs.existsSync (pathToFind)) {
                console.log (`Path does not exist...`);
                Commands ();
              } else {
                var filePaths = [];
                var tempFolder = [];
                function getFiles (dir) {
                  var paths = fs.readdirSync (dir);
                  var files = [];

                  paths.forEach (function (file) {
                    var fullPath = dir + '/' + file;
                    files.push (fullPath);
                  });

                  files.forEach (tempFile => {
                    let check = fs.statSync (tempFile);

                    if (check.isDirectory ()) {
                      getFiles (tempFile);
                    } else {
                      filePaths.push (tempFile);
                    }
                  });
                }
                getFiles (pathToFind);
                console.table (Object.assign ({}, filePaths));
                Commands ();
              }
            });
          }
        });
      }
      console.log (banner.string);
      loop ();
    }

    setupStorage ();
    checkIp (pIp.address ());
    setTimeout (() => {
      checkSize ();
    }, 2000);

    setTimeout (function () {
      Commands ();
    }, 5000);
  });
}

mainProcess ();
