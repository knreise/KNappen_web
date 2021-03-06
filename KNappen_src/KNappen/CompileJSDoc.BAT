@echo off
REM del JSDoc.conf
REM echo { _: [ '' >> JSDoc.conf
REM pushd KNappen.MobileSPA\JS\
REM for /r %%i in (*.ts) do @call :CompileTS "%%i"
REM popd
REM echo ], a: true, A:true, p: false, D: {generatedBy: "Tedd Hansen"}, d: "docs", t: "C:\Users\ingmoe\Downloads\jsdoc_toolkit-2.4.0\jsdoc_toolkit-2.4.0/jsdoc-toolkit/templates/jsdoc" } >> JSDoc.conf
REM java -jar C:\Users\ingmoe\Downloads\jsdoc_toolkit-2.4.0\jsdoc_toolkit-2.4.0\jsdoc-toolkit\jsrun.jar C:\Users\ingmoe\Downloads\jsdoc_toolkit-2.4.0\jsdoc_toolkit-2.4.0\jsdoc-toolkit\app\run.js -c=JSDoc.conf


\tools\jsdoc\jsdoc.cmd "KNappen.MobileSPA\JS" -c JSDocConf.json -d docs --recurse --lenient --verbose
goto EOF


:CompileTS
if "" == "%1" goto :EOF
setlocal ENABLEEXTENSIONS
set FO=%1
set FO=%FO:\=/%
set FO=%FO:.ts"=.js"%
echo ,%FO% >> ..\..\JSDoc.conf
endlocal & goto :EOF

:EOF