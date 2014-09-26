define(function (require, exports) {
    "use strict";

    var Dialogs             = brackets.getModule("widgets/Dialogs"),
        FileUtils           = brackets.getModule("file/FileUtils"),
        Strings             = require("../strings"),
        contents            = require("./contents"),
        dialogTemplate      = require("text!../templates/save-dialog.html");

    exports.show = function (title, initialPath, proposedNewFilename, callback) {
        var context = {
                TITLE: title,
                BUTTON_CANCEL: Strings.BUTTON_CANCEL,
                BUTTON_SAVE: Strings.BUTTON_SAVE,
                LABEL_FILE_NAME: Strings.LABEL_FILE_NAME,
                OPEN_FOLDER: Strings.BUTTON_OPEN_FOLDER,
                proposed: proposedNewFilename
            },
            path    = initialPath || brackets.app.getUserDocumentsDirectory(),
            dialog  = Dialogs.showModalDialogUsingTemplate(Mustache.render(dialogTemplate, context)),
            $dialog = dialog.getElement(),
            btnOk = $dialog.find("button[data-button-id='ok']")[0],
            $input  = $dialog.find("#rfs-file-name");

        function handleButton() {
            if (!$input.val().trim()) {
                btnOk.disabled = true;
            } else if (btnOk.disabled) {
                btnOk.disabled = false;
            }
        }

        function onSelected(val) {
            if (val.path) {
                path = val.path;
            }

            if (val.fileName) {
                $input.val(val.fileName);
                handleButton();
            }
        }

        $input.keyup(handleButton);

        contents($dialog, false, false, title, path, null, null, callback, onSelected);

        dialog.done(function (buttonId) {
            if (buttonId === "ok") {
                callback(null, FileUtils.stripTrailingSlash(path) + "/" + $input.val().trim());
            }
        });
    };
});
