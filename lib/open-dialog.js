define(function (require, exports) {
    "use strict";

    var Dialogs                 = brackets.getModule("widgets/Dialogs"),
        FileSystem              = brackets.getModule("filesystem/FileSystem"),
        Strings                 = require("../strings"),
        settingsDialogTemplate  = require("text!../templates/open-dialog.html");

    exports.show = function (allowMultipleSelection, chooseDirectories, title, initialPath, fileTypes, callback) {
        var context = {
                TITLE: title,
                BUTTON_CANCEL: Strings.BUTTON_CANCEL,
                BUTTON_OPEN: Strings.BUTTON_OPEN,
                multiSelect: allowMultipleSelection,
                chooseDir: chooseDirectories
            },
            prjsRoot = FileSystem.getDirectoryForPath(brackets.app.getUserDocumentsDirectory()),
            selected = {},
            dialog,
            $dialog,
            btnOk,
            compiledTemplate;

        function selectRow(tr) {
            tr.children().addClass("selected");
            selected[tr[0].id] = tr;
            if (btnOk.disabled) {
                btnOk.disabled = false;
            }
        }

        function deselectRow(tr) {
            tr.children().removeClass("selected");
            delete selected[tr[0].id];
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

        function onSelectSingle(event) {
            var tr = $(event.target.parentElement);
            if (selected[tr[0].id]) {
                deselectRow(tr);
            } else {
                deselectAll();
                selectRow(tr);
            }
        }

        prjsRoot.getContents(function (err, files) {
            if (err) {
                callback(err);
            } else {
                files.forEach(function (el) {
                    el.type = el.isDirectory ? "dir" : "file";
                });

                context.files = files;

                compiledTemplate = Mustache.render(settingsDialogTemplate, context);
                dialog = Dialogs.showModalDialogUsingTemplate(compiledTemplate);
                $dialog = dialog.getElement();
                btnOk = $dialog.find("button[data-button-id='ok']")[0];

                btnOk.disabled = true;
                if (!allowMultipleSelection) {
                    $dialog.on("click", ".sfs-file", onSelectSingle);
                }

                dialog.done(function (buttonId) {
                    if (buttonId === "ok") {
                        callback(null, Object.keys(selected));
                    }
                });
            }
        });
    };
});
