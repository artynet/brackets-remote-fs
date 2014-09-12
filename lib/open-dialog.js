define(function (require, exports) {
    "use strict";

    var Dialogs                 = brackets.getModule("widgets/Dialogs"),
        Strings                 = require("../strings"),
        settingsDialogTemplate  = require("text!../templates/open-dialog.html");

    var dialog,
        $dialog;

    exports.show = function (allowMultipleSelection, chooseDirectories, title, initialPath, fileTypes, callback) {
        var context = {
                TITLE: title,
                BUTTON_CANCEL: Strings.BUTTON_CANCEL,
                BUTTON_OPEN: Strings.BUTTON_OPEN,
                files: [
                    {
                        type: "file",
                        name: "foo.js"
                    },
                    {
                        type: "dir",
                        name: "bar"
                    },
                    {
                        type: "dir",
                        name: "baz"
                    }
                ]
            },
            compiledTemplate = Mustache.render(settingsDialogTemplate, context);

        dialog = Dialogs.showModalDialogUsingTemplate(compiledTemplate);
        $dialog = dialog.getElement();

        dialog.done(function (buttonId) {
            if (buttonId === "ok") {
                callback();
            }
        });
    };
});
