define(function (require, exports) {
    "use strict";

    var Dialogs             = brackets.getModule("widgets/Dialogs"),
        Strings             = require("../strings"),
        dialogTemplate      = require("text!../templates/create-folder.html");

    exports.show = function (contents) {
        var context = {
                TITLE: Strings.LABEL_FOLDER_NAME,
                BUTTON_CANCEL: Strings.BUTTON_CANCEL,
                BUTTON_OK: Strings.BUTTON_OK
            },
            dialog      = Dialogs.showModalDialogUsingTemplate(Mustache.render(dialogTemplate, context)),
            $dialog     = dialog.getElement(),
            btnOk       = $dialog.find("button[data-button-id='ok']")[0],
            $input      = $dialog.find("#rfs-folder-name");

        btnOk.disabled = true;
        $input.keyup(function () {
            var val = $input.val().trim();
            if (!val || $.inArray(val, contents) !== -1) {
                btnOk.disabled = true;
            } else if (btnOk.disabled) {
                btnOk.disabled = false;
            }
        });
    };
});
