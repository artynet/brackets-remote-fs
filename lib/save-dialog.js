define(function (require, exports) {
    "use strict";

    var Dialogs             = brackets.getModule("widgets/Dialogs"),
        FileUtils           = brackets.getModule("file/FileUtils"),
        FileSystem          = brackets.getModule("filesystem/FileSystem"),
        Strings             = require("../strings"),
        contentsTemplate    = require("text!../templates/contents.html"),
        dialogTemplate      = require("text!../templates/save-dialog.html");

    exports.show = function (title, initialPath, proposedNewFilename, callback) {
//        var context = {
//                TITLE: title,
//                BUTTON_CANCEL: Strings.BUTTON_CANCEL,
//                BUTTON_OPEN: Strings.BUTTON_OPEN,
//                OPEN_FOLDER: Strings.BUTTON_OPEN_FOLDER,
//                proposed: proposedNewFilename
//            },
//            chosen,
//            btnOk,
//            trail,
//            dialog,
//            $dialog,
//            $contents;
//
//        dialog = Dialogs.showModalDialogUsingTemplate(Mustache.render(dialogTemplate, context));
//        $dialog = dialog.getElement();
//        btnOk = $dialog.find("button[data-button-id='ok']")[0];
//        $contents = $dialog.find("#rfs-contents");
//        $contents.on("click", selectRow);
//        $contents.on("dblclick", openFolder);
//
//        dialog.done(function (buttonId) {
//            if (buttonId === "ok") {
//                callback(null, Object.keys(selected));
//            }
//        });
//
//        var path = initialPath || brackets.app.getUserDocumentsDirectory();
//        resetTrail(path);
//        showFiles(path, callback);
    };
});
