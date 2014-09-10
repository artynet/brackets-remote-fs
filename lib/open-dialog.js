define(function (require, exports) {
    "use strict";

    exports.show = function () {
        var compiledTemplate = Mustache.render(settingsDialogTemplate, Strings);

        dialog = Dialogs.showModalDialogUsingTemplate(compiledTemplate);
        $dialog = dialog.getElement();

        init();

        dialog.done(function (buttonId) {
            if (buttonId === "ok") {
                // Save everything to preferences
                collectValues();
                // Restart brackets to reload changes.
                showRestartDialog();
            }
        });
    };
}
