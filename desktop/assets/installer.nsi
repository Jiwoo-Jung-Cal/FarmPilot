; Generates its unsigned uninstaller at install time; no Wine is required.
!include "MUI2.nsh"
!include "LogicLib.nsh"
!include "x64.nsh"
Name "FarmPilot"
RequestExecutionLevel user
InstallDir "$LOCALAPPDATA\Programs\FarmPilot"
InstallDirRegKey HKCU "Software\NoorFieldnotesDesktop" "InstallDir"
!define MUI_ABORTWARNING
!define MUI_FINISHPAGE_RUN "$INSTDIR\FarmPilot.exe"
!define MUI_FINISHPAGE_RUN_TEXT "Open FarmPilot"
!insertmacro MUI_PAGE_WELCOME
!insertmacro MUI_PAGE_LICENSE "${PROJECT_DIR}/LICENSE"
!insertmacro MUI_PAGE_DIRECTORY
!insertmacro MUI_PAGE_INSTFILES
!insertmacro MUI_PAGE_FINISH
!insertmacro MUI_UNPAGE_CONFIRM
!insertmacro MUI_UNPAGE_INSTFILES
!insertmacro MUI_LANGUAGE "English"
Function .onInit
 ${IfNot} ${RunningX64}
  MessageBox MB_OK|MB_ICONSTOP "This build requires a 64-bit Windows computer."
  Abort
 ${EndIf}
 SetShellVarContext current
FunctionEnd
Section "Install"
 InitPluginsDir
 File /oname=$PLUGINSDIR\app.7z "${APP_64}"
 SetOutPath "$INSTDIR"
 ClearErrors
 Nsis7z::Extract "$PLUGINSDIR\app.7z"
 IfErrors 0 +3
  MessageBox MB_OK|MB_ICONSTOP "Installation could not finish. Close the app and try again."
  Abort
 WriteUninstaller "$INSTDIR\Uninstall FarmPilot.exe"
 CreateShortcut "$DESKTOP\FarmPilot.lnk" "$INSTDIR\FarmPilot.exe"
 CreateShortcut "$SMPROGRAMS\FarmPilot.lnk" "$INSTDIR\FarmPilot.exe"
 WriteRegStr HKCU "Software\NoorFieldnotesDesktop" "InstallDir" "$INSTDIR"
 WriteRegStr HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\NoorFieldnotesDesktop" "DisplayName" "FarmPilot"
 WriteRegStr HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\NoorFieldnotesDesktop" "DisplayVersion" "${VERSION}"
 WriteRegStr HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\NoorFieldnotesDesktop" "Publisher" "FarmPilot contributors"
 WriteRegStr HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\NoorFieldnotesDesktop" "UninstallString" '"$INSTDIR\Uninstall FarmPilot.exe"'
 WriteRegStr HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\NoorFieldnotesDesktop" "DisplayIcon" "$INSTDIR\FarmPilot.exe"
 WriteRegDWORD HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\NoorFieldnotesDesktop" "EstimatedSize" ${APP_64_UNPACKED_SIZE}
 WriteRegDWORD HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\NoorFieldnotesDesktop" "NoModify" 1
 WriteRegDWORD HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\NoorFieldnotesDesktop" "NoRepair" 1
SectionEnd
Section "Uninstall"
 SetShellVarContext current
 !include "${PROJECT_DIR}/assets/uninstall-files.nsh"
 Delete "$DESKTOP\FarmPilot.lnk"
 Delete "$SMPROGRAMS\FarmPilot.lnk"
 Delete "$INSTDIR\Uninstall FarmPilot.exe"
 RMDir "$INSTDIR"
 DeleteRegKey HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\NoorFieldnotesDesktop"
 DeleteRegKey HKCU "Software\NoorFieldnotesDesktop"
SectionEnd
