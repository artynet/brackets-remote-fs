define(function (require, exports) {
    "use strict";

    var Dialogs             = brackets.getModule("widgets/Dialogs"),
        FileUtils           = brackets.getModule("file/FileUtils"),
        Strings             = require("../strings"),
        CreateFolder        = require("./create-folder"),
        contents            = require("./contents"),
        dialogTemplate      = require("text!../templates/save-dialog.html");

    exports.show = function (title, initialPath, proposedNewFilename, callback) {
        if (initialPath.indexOf("/samples/") === 0) {
            initialPath = null;
        }

        var context = {
                TITLE: title,
                BUTTON_CANCEL: Strings.BUTTON_CANCEL,
                BUTTON_SAVE: Strings.BUTTON_SAVE,
                LABEL_FILE_NAME: Strings.LABEL_FILE_NAME,
                OPEN_FOLDER: Strings.BUTTON_OPEN_FOLDER,
                BUTTON_CREATE_FOLDER: Strings.BUTTON_CREATE_FOLDER,
                proposed: proposedNewFilename
            },
            path        = initialPath || brackets.app.getUserDocumentsDirectory(),
            dialog      = Dialogs.showModalDialogUsingTemplate(Mustache.render(dialogTemplate, context)),
            $dialog     = dialog.getElement(),
            btnOk       = $dialog.find("button[data-button-id='ok']")[0],
            $input      = $dialog.find("#rfs-file-name"),
            $saveName   = $dialog.find("#rfs-save-name"),
            $newFolder  = $dialog.find("#rfs-create-folder");

        function getFullName() {
            return FileUtils.stripTrailingSlash(path) + "/" + $input.val().trim();
        }

        function handleButton() {
            if (!$input.val().trim()) {
                btnOk.disabled = true;
            } else if (btnOk.disabled) {
                btnOk.disabled = false;
            }
            $saveName.text(getFullName());
        }

        function onSelected(val) {
            if (val.path) {
                path = val.path;
            }

            if (val.fileName) {
                $input.val(val.fileName);
                handleButton();
            }

            $saveName.text(getFullName());
        }

        $input.keyup(handleButton);
        $newFolder.click(function (event) {
            event.stopImmediatePropagation();

            CreateFolder.show([]);
        });

        contents($dialog, false, false, title, path, null, null, callback, onSelected);

        dialog.done(function (buttonId) {
            if (buttonId === "ok") {
                callback(null, getFullName());
            }
        });
    };
});
