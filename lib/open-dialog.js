define(function (require, exports) {
    "use strict";

    var Dialogs             = brackets.getModule("widgets/Dialogs"),
        FileSystem          = brackets.getModule("filesystem/FileSystem"),
        Strings             = require("../strings"),
        contentsTemplate    = require("text!../templates/contents.html"),
        dialogTemplate      = require("text!../templates/open-dialog.html");

    exports.show = function (allowMultipleSelection, chooseDirectories, title, initialPath, fileTypes, callback) {
        var context = {
                TITLE: title,
                BUTTON_CANCEL: Strings.BUTTON_CANCEL,
                BUTTON_OPEN: Strings.BUTTON_OPEN,
                multiSelect: allowMultipleSelection,
                chooseDir: chooseDirectories
            },
            selected = {},
            dialog,
            $dialog,
            btnOk,
            $contents;

        function selectRow($tr) {
            $tr.children().addClass("selected");
            selected[$tr[0].id] = $tr;
            if (btnOk.disabled) {
                btnOk.disabled = false;
            }
        }

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

        function selectSingle(event) {
            var $tr     = $(event.target.parentElement),
                isDir   = $tr.find(".dir");

            if (selected[$tr[0].id]) {
                deselectRow($tr);
            } else if ((chooseDirectories && isDir.length) || (!chooseDirectories && !isDir.length)) {
                deselectAll();
                selectRow($tr);
            }
        }

        function openFolder(event) {
            var $tr = $(event.target.parentElement),
                path = $tr[0].id,
                isDir = $tr.find(".dir");

            if (path && isDir.length) {
                showFiles(path);
            }
        }

        function showFiles(path) {
            var dir = FileSystem.getDirectoryForPath(path);

            selected = {};
            btnOk.disabled = true;
            $contents.empty();

            dir.getContents(function (err, files) {
                if (err) {
                    callback(err);
                } else {
                    files.forEach(function (el) {
                        el.type = el.isDirectory ? "dir" : "file";
                    });

                    context.files = files;
                    $contents.html(Mustache.render(contentsTemplate, context));
                }
            });
        }

        dialog = Dialogs.showModalDialogUsingTemplate(Mustache.render(dialogTemplate, context));
        $dialog = dialog.getElement();
        btnOk = $dialog.find("button[data-button-id='ok']")[0];
        $contents = $dialog.find("#rfs-contents");

        if (!allowMultipleSelection) {
            $contents.on("click", selectSingle);
        }

        $contents.on("dblclick", openFolder);

        dialog.done(function (buttonId) {
            if (buttonId === "ok") {
                callback(null, Object.keys(selected));
            }
        });

        showFiles(brackets.app.getUserDocumentsDirectory(), callback);
    };
});
