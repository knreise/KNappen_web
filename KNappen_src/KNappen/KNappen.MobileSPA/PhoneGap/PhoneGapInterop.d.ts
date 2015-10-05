/// <reference path="_references.d.ts" />
declare module PhoneGap {
    class PhoneGapInterop {
        config: System.ConfigBase;
        onInteropCommand: System.Utils.Event;
        onDeviceReady: System.Utils.Event;
        onOnline: System.Utils.Event;
        onOffline: System.Utils.Event;
        onLoad: System.Utils.Event;
        onResume: System.Utils.Event;
        onPause: System.Utils.Event;
        constructor();
        private bindEvents();
        onExitApp(): void;
    }
}
declare var phoneGapInterop: PhoneGap.PhoneGapInterop;
