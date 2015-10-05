/// <reference path="../scripts/typings/jquery/jquery.d.ts" />
declare module UnitTests {
    interface IUnitTest {
        runTest(resultwindow: JQuery): any;
    }
}
