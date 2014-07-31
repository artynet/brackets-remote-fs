define(function (require, exports) {
    "use strict";

    var socket = require("/socket.io/socket.io.js").connect("/brackets");

    socket.on("greeting", function (data) {
        if (data === "hi") {
            console.log("Socket.io connected!");
        }
    });

    /**
     * Callback to notify FileSystem of watcher changes
     * @type {?function(string, FileSystemStats=)}
     */
    var _changeCallback;

    /**
     * Callback to notify FileSystem if watchers stop working entirely
     * @type {?function()}
     */
    var _offlineCallback;

    /**
     * Display an open-files dialog to the user and call back asynchronously with
     * either a FileSystmError string or an array of path strings, which indicate
     * the entry or entries selected.
     *
     * @param {boolean} allowMultipleSelection
     * @param {boolean} chooseDirectories
     * @param {string} title
     * @param {string} initialPath
     * @param {Array.<string>=} fileTypes
     * @param {function(?string, Array.<string>=)} callback
     */
    function showOpenDialog(allowMultipleSelection, chooseDirectories, title, initialPath, fileTypes, callback) {
        if (callback) {
            return callback("Not implemented!");
        }
        throw "Not implemented!";
    }

    /**
     * Display a save-file dialog and call back asynchronously with either a
     * FileSystemError string or the path to which the user has chosen to save
     * the file. If the dialog is cancelled, the path string will be empty.
     *
     * @param {string} title
     * @param {string} initialPath
     * @param {string} proposedNewFilename
     * @param {function(?string, string=)} callback
     */
    function showSaveDialog(title, initialPath, proposedNewFilename, callback) {
        if (callback) {
            return callback("Not implemented!");
        }
        throw "Not implemented!";
    }

    /**
     * Stat the file or directory at the given path, calling back
     * asynchronously with either a FileSystemError string or the entry's
     * associated FileSystemStats object.
     *
     * @param {string} path
     * @param {function(?string, FileSystemStats=)} callback
     */
    function stat(path, callback) {
        if (callback) {
            return callback("Not implemented!");
        }
        throw "Not implemented!";
    }

    /**
     * Determine whether a file or directory exists at the given path by calling
     * back asynchronously with either a FileSystemError string or a boolean,
     * which is true if the file exists and false otherwise. The error will never
     * be FileSystemError.NOT_FOUND; in that case, there will be no error and the
     * boolean parameter will be false.
     *
     * @param {string} path
     * @param {function(?string, boolean)} callback
     */
    function exists(path, callback) {
        if (callback) {
            return callback("Not implemented!");
        }
        throw "Not implemented!";
    }

    /**
     * Read the contents of the directory at the given path, calling back
     * asynchronously either with a FileSystemError string or an array of
     * FileSystemEntry objects along with another consistent array, each index
     * of which either contains a FileSystemStats object for the corresponding
     * FileSystemEntry object in the second parameter or a FileSystemError
     * string describing a stat error.
     *
     * @param {string} path
     * @param {function(?string, Array.<FileSystemEntry>=, Array.<string|FileSystemStats>=)} callback
     */
    function readdir(path, callback) {
        if (callback) {
            return callback("Not implemented!");
        }
        throw "Not implemented!";
    }

    /**
     * Create a directory at the given path, and call back asynchronously with
     * either a FileSystemError string or a stats object for the newly created
     * directory. The octal mode parameter is optional; if unspecified, the mode
     * of the created directory is implementation dependent.
     *
     * @param {string} path
     * @param {number=} mode The base-eight mode of the newly created directory.
     * @param {function(?string, FileSystemStats=)=} callback
     */
    function mkdir(path, mode, callback) {
        if (callback) {
            return callback("Not implemented!");
        }
        throw "Not implemented!";
    }

    /**
     * Rename the file or directory at oldPath to newPath, and call back
     * asynchronously with a possibly null FileSystemError string.
     *
     * @param {string} oldPath
     * @param {string} newPath
     * @param {function(?string)=} callback
     */
    function rename(oldPath, newPath, callback) {
        if (callback) {
            return callback("Not implemented!");
        }
        throw "Not implemented!";
    }

    /**
     * Read the contents of the file at the given path, calling back
     * asynchronously with either a FileSystemError string, or with the data and
     * the FileSystemStats object associated with the read file. The options
     * parameter can be used to specify an encoding (default "utf8"), and also
     * a cached stats object that the implementation is free to use in order
     * to avoid an additional stat call.
     *
     * Note: if either the read or the stat call fails then neither the read data
     * nor stat will be passed back, and the call should be considered to have failed.
     * If both calls fail, the error from the read call is passed back.
     *
     * @param {string} path
     * @param {{encoding: string=, stat: FileSystemStats=}} options
     * @param {function(?string, string=, FileSystemStats=)} callback
     */
    function readFile(path, options, callback) {
        if (callback) {
            return callback("Not implemented!");
        }
        throw "Not implemented!";
    }

    /**
     * Write data to the file at the given path, calling back asynchronously with
     * either a FileSystemError string or the FileSystemStats object associated
     * with the written file and a boolean that indicates whether the file was
     * created by the write (true) or not (false). If no file exists at the
     * given path, a new file will be created. The options parameter can be used
     * to specify an encoding (default "utf8"), an octal mode (default
     * unspecified and implementation dependent), and a consistency hash, which
     * is used to the current state of the file before overwriting it. If a
     * consistency hash is provided but does not match the hash of the file on
     * disk, a FileSystemError.CONTENTS_MODIFIED error is passed to the callback.
     *
     * @param {string} path
     * @param {string} data
     * @param {{encoding : string=, mode : number=, expectedHash : object=, expectedContents : string=}} options
     * @param {function(?string, FileSystemStats=, boolean)} callback
     */
    function writeFile(path, data, options, callback) {
        if (callback) {
            return callback("Not implemented!");
        }
        throw "Not implemented!";
    }

    /**
     * Unlink (i.e., permanently delete) the file or directory at the given path,
     * calling back asynchronously with a possibly null FileSystemError string.
     * Directories will be unlinked even when non-empty.
     *
     * @param {string} path
     * @param {function(string)=} callback
     */
    function unlink(path, callback) {
        if (callback) {
            return callback("Not implemented!");
        }
        throw "Not implemented!";
    }

    /**
     * Move the file or directory at the given path to a system dependent trash
     * location, calling back asynchronously with a possibly null FileSystemError
     * string. Directories will be moved even when non-empty.
     *
     * @param {string} path
     * @param {function(string)=} callback
     */
    function moveToTrash(path, callback) {
        if (callback) {
            return callback("Not implemented!");
        }
        throw "Not implemented!";
    }

    /**
     * Initialize file watching for this filesystem, using the supplied
     * changeCallback to provide change notifications. The first parameter of
     * changeCallback specifies the changed path (either a file or a directory);
     * if this parameter is null, it indicates that the implementation cannot
     * specify a particular changed path, and so the callers should consider all
     * paths to have changed and to update their state accordingly. The second
     * parameter to changeCallback is an optional FileSystemStats object that
     * may be provided in case the changed path already exists and stats are
     * readily available. The offlineCallback will be called in case watchers
     * are no longer expected to function properly. All watched paths are
     * cleared when the offlineCallback is called.
     *
     * @param {function(?string, FileSystemStats=)} changeCallback
     * @param {function()=} offlineCallback
     */
    function initWatchers(changeCallback, offlineCallback) {
        _changeCallback = changeCallback;
        _offlineCallback = offlineCallback;
    }

    /**
     * Start providing change notifications for the file or directory at the
     * given path, calling back asynchronously with a possibly null FileSystemError
     * string when the initialization is complete. Notifications are provided
     * using the changeCallback function provided by the initWatchers method.
     * Note that change notifications are only provided recursively for directories
     * when the recursiveWatch property of this module is true.
     *
     * @param {string} path
     * @param {function(?string)=} callback
     */
    function watchPath(path, callback) {
        if (callback) {
            return callback("Not implemented!");
        }
        throw "Not implemented!";
    }

    /**
     * Stop providing change notifications for the file or directory at the
     * given path, calling back asynchronously with a possibly null FileSystemError
     * string when the operation is complete.
     *
     * @param {string} path
     * @param {function(?string)=} callback
     */
    function unwatchPath(path, callback) {
        if (callback) {
            return callback("Not implemented!");
        }
        throw "Not implemented!";
    }

    /**
     * Stop providing change notifications for all previously watched files and
     * directories, optionally calling back asynchronously with a possibly null
     * FileSystemError string when the operation is complete.
     *
     * @param {function(?string)=} callback
     */
    function unwatchAll(callback) {
        if (callback) {
            return callback("Not implemented!");
        }
        throw "Not implemented!";
    }

    // Export public API
    exports.showOpenDialog  = showOpenDialog;
    exports.showSaveDialog  = showSaveDialog;
    exports.exists          = exists;
    exports.readdir         = readdir;
    exports.mkdir           = mkdir;
    exports.rename          = rename;
    exports.stat            = stat;
    exports.readFile        = readFile;
    exports.writeFile       = writeFile;
    exports.unlink          = unlink;
    exports.moveToTrash     = moveToTrash;
    exports.initWatchers    = initWatchers;
    exports.watchPath       = watchPath;
    exports.unwatchPath     = unwatchPath;
    exports.unwatchAll      = unwatchAll;

    /**
     * Indicates whether or not recursive watching notifications are supported
     * by the watchPath call. Currently, only Darwin supports recursive watching.
     *
     * @type {boolean}
     */
    exports.recursiveWatch = false;

    /**
     * Indicates whether or not the filesystem should expect and normalize UNC
     * paths. If set, then //server/directory/ is a normalized path; otherwise the
     * filesystem will normalize it to /server/directory. Currently, UNC path
     * normalization only occurs on Windows.
     *
     * @type {boolean}
     */
    exports.normalizeUNCPaths = false;
});
