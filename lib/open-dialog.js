define(function (require, exports) {
    "use strict";

    var Dialogs             = brackets.getModule("widgets/Dialogs"),
        FileUtils           = brackets.getModule("file/FileUtils"),
        FileSystem          = brackets.getModule("filesystem/FileSystem"),
        Strings             = require("../strings"),
        contentsTemplate    = require("text!../templates/contents.html"),
        dialogTemplate      = require("text!../templates/open-dialog.html");

    exports.show = function (allowMultipleSelection, chooseDirectories, title, initialPath, fileTypes, callback) {
        var context = {
                TITLE: title,
                BUTTON_CANCEL: Strings.BUTTON_CANCEL,
                BUTTON_OPEN: Strings.BUTTON_OPEN,
                OPEN_FOLDER: Strings.BUTTON_OPEN_FOLDER,
                multiSelect: allowMultipleSelection,
                chooseDir: chooseDirectories
            },
            selected = {},
            btnOk,
            trail,
            dialog,
            $dialog,
            $contents;

        function deselectRow($tr) {
            $tr.children().removeClass("selected");
            delete selected[$tr[0].id];
            if (Object.keys(selected).length === 0) {
                btnOk.disabled = true;
            }
        }

        function deselectAll() {
            var keys = Object.keys(selected);
            if (keys.length) {
                keys.forEach(function (key) {
                    selected[key].children().removeClass("selected");
                });
                selected = {};
                btnOk.disabled = true;
            }
        }

        function selectRow(event) {
            var $tr     = $(event.target.parentElement),
                isDir   = $tr.find(".dir");

            if (selected[$tr[0].id]) {
                deselectRow($tr);
            } else if ((chooseDirectories && isDir.length) || (!chooseDirectories && !isDir.length)) {
                if (!allowMultipleSelection) {
                    deselectAll();
                }
                $tr.children().addClass("selected");
                selected[$tr[0].id] = $tr;
                if (btnOk.disabled) {
                    btnOk.disabled = false;
                }
            }
        }

        function resetTrail(path) {
            var parts = path.split("/"),
                lPath = "";

            trail = [];
            parts.forEach(function (el) {
                if (el) {
                    lPath += "/" + el;
                    trail.push({
                        name: el,
                        path: lPath
                    });
                }
            });
        }

        function openFolder(event) {
            var pel     = event.target.parentElement,
                el      = pel.tagName === "TR" ? pel : pel.parentElement,
                $tr     = $(el),
                path    = $tr[0].id,
                isDir   = $tr.find(".dir");

            event.stopImmediatePropagation();
            if (path && isDir.length) {
                resetTrail(path);
                showFiles(path);
            }
        }

        function openTrail(event) {
            event.stopImmediatePropagation();
            showFiles($(event.target).attr("data-path"));
        }

        function showFiles(path) {
            var dir     = FileSystem.getDirectoryForPath(path);

            selected = {};
            btnOk.disabled = true;
            // TODO: Add loading indication here.
//            $contents.empty();

            dir.getContents(function (err, files) {
                var list = [];
                if (err) {
                    callback(err);
                } else {
                    files.forEach(function (el) {
                        var file = {
                            name: el.name,
                            fullPath: el.fullPath,
                            isFile: el.isFile,
                            isDirectory: el.isDirectory,
                            type: el.isDirectory ? "dir" : "file"
                        };
                        if (chooseDirectories && el.isFile) {
                            file.disabled = "rfs-disabled";
                        }
                        list.push(file);
                    });
                    list.sort(function (a, b) {
                        if (a.type === b.type) {
                            return (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0;
                        } else {
                            return (a.type < b.type) ? -1 : 1;
                        }
                    });

                    path = FileUtils.stripTrailingSlash(path);
                    trail.forEach(function (el) {
                        if (el.path === path) {
                            el.curr = "curr";
                        } else if (el.curr) {
                            delete el.curr;
                        }
                    });

                    context.files = list;
                    context.trail = trail;
                    $contents.html(Mustache.render(contentsTemplate, context));
                    $contents.on("click", ".rfs-icon.dir", openFolder);
                    $contents.on("click", "#rfs-trail > ul > li", openTrail);
                }
            });
        }

        dialog = Dialogs.showModalDialogUsingTemplate(Mustache.render(dialogTemplate, context));
        $dialog = dialog.getElement();
        btnOk = $dialog.find("button[data-button-id='ok']")[0];
        $contents = $dialog.find("#rfs-contents");
        $contents.on("click", selectRow);
        $contents.on("dblclick", openFolder);

        dialog.done(function (buttonId) {
            if (buttonId === "ok") {
                callback(null, Object.keys(selected));
            }
        });

        var path = initialPath || brackets.app.getUserDocumentsDirectory();
        resetTrail(path);
        showFiles(path, callback);
    };
});
