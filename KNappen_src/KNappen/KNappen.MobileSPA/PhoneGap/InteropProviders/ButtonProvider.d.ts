/// <reference path="../_references.d.ts" />
declare module PhoneGap.InteropProviders {
    class ButtonProvider {
        load(): void;
        private onBackButton();
        private onMenuButton();
    }
}
declare var buttonProvider: PhoneGap.InteropProviders.ButtonProvider;
