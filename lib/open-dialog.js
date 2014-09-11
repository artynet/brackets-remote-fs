define(function (require, exports) {
    "use strict";

    var CommandManager          = brackets.getModule("command/CommandManager"),
        Dialogs                 = brackets.getModule("widgets/Dialogs"),
        Strings                 = require("../strings"),
        settingsDialogTemplate  = require("text!../templates/open-dialog.html");

    var dialog,
        $dialog;

    exports.show = function (allowMultipleSelection, chooseDirectories, title, initialPath, fileTypes, callback) {
        var compiledTemplate = Mustache.render(settingsDialogTemplate, Strings);

        dialog = Dialogs.showModalDialogUsingTemplate(compiledTemplate);
        $dialog = dialog.getElement();

        dialog.done(function (buttonId) {
            if (buttonId === "ok") {
                callback();
            }
        });
    };
});
