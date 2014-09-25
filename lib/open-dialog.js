define(function (require, exports) {
    "use strict";

    var Dialogs             = brackets.getModule("widgets/Dialogs"),
        Strings             = require("../strings"),
        contents            = require("./contents"),
        dialogTemplate      = require("text!../templates/open-dialog.html");

    exports.show = function (allowMultipleSelection, chooseDirectories, title, initialPath, fileTypes, callback) {
        var context = {
                TITLE: title,
                BUTTON_CANCEL: Strings.BUTTON_CANCEL,
                BUTTON_OPEN: Strings.BUTTON_OPEN
            },
            path    = initialPath || brackets.app.getUserDocumentsDirectory(),
            dialog  = Dialogs.showModalDialogUsingTemplate(Mustache.render(dialogTemplate, context)),
            $dialog = dialog.getElement(),
            cnt = contents($dialog, allowMultipleSelection, chooseDirectories, title, initialPath, fileTypes, null, callback, null);

        dialog.done(function (buttonId) {
            if (buttonId === "ok") {
                callback(null, Object.keys(cnt.selected));
            }
        });

        cnt.resetTrail(path);
        cnt.showFiles(path, callback);
    };
});
