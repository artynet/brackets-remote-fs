define(function (require, exports) {
    "use strict";

    var Dialogs                 = brackets.getModule("widgets/Dialogs"),
        FileSystem              = brackets.getModule("filesystem/FileSystem"),
        Strings                 = require("../strings"),
        settingsDialogTemplate  = require("text!../templates/open-dialog.html");

    var dialog,
        $dialog;

    exports.show = function (allowMultipleSelection, chooseDirectories, title, initialPath, fileTypes, callback) {
        var context = {
                TITLE: title,
                BUTTON_CANCEL: Strings.BUTTON_CANCEL,
                BUTTON_OPEN: Strings.BUTTON_OPEN,
                multiSelect: allowMultipleSelection,
                chooseDir: chooseDirectories
            },
            prjsRoot = FileSystem.getDirectoryForPath(brackets.app.getUserDocumentsDirectory()),
            compiledTemplate;

        prjsRoot.getContents(function (err, files) {
            if (err) {
                // FIXME: We need error message template with close button.
                compiledTemplate = err;
            } else {
                files.forEach(function (el) {
                    el.type = el.isDirectory ? "dir" : "file";
                });

                context.files = files;

                compiledTemplate = Mustache.render(settingsDialogTemplate, context);
                dialog = Dialogs.showModalDialogUsingTemplate(compiledTemplate);
                $dialog = dialog.getElement();

                dialog.done(function (buttonId) {
                    if (buttonId === "ok") {
                        callback([]);
                    }
                });
            }
        });
    };
});
