
var bRet = document.all;
var PWMGRPlugObject = document.getElementById("objPlugin");
var runtimeOrExtension = chrome.runtime && chrome.runtime.sendMessage ? 'runtime' : 'extension';


chrome[runtimeOrExtension].onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.command == "loadBrowserRecord") {
            PWMGRPlugObject.reset();
            var bRet = PWMGRPlugObject.loadBrowserRecord(request.url, request.title);

            var nPwdFieldCount = (bRet & 0x000000FF);

            if (0 == nPwdFieldCount) {
                sendResponse({ PwdFieldCount: nPwdFieldCount });
            }
            else {
                var nTextFieldCount = (bRet & 0x00000FF00);
                nTextFieldCount >>= 8;

                var bAutoFill = (bRet & 0x0000F0000);
                bAutoFill >>= 16;

                var bAutoSumbit = (bRet & 0x000F00000);
                bAutoSumbit >>= 20;

                // get Text Fields,Text Values
                var arrTextFields = new Array();
                var arrTextValues = new Array();

                for (var idx = 0; idx < nTextFieldCount; ++idx) {
                    arrTextFields[idx] = PWMGRPlugObject.getTextField(idx);
                    arrTextValues[idx] = PWMGRPlugObject.getTextValue(idx);
                }

                // get PWD Fields, PWD Values
                var arrPWDFields = new Array();
                var arrPWDValues = new Array();
                for (var idx = 0; idx < nPwdFieldCount; ++idx) {
                    arrPWDFields[idx] = PWMGRPlugObject.getPWDField(idx);
                    arrPWDValues[idx] = PWMGRPlugObject.getPWDValue(idx);
                }

                sendResponse({ PwdFieldCount: nPwdFieldCount,
                    TextFieldCount: nTextFieldCount,
                    AutoFill: bAutoFill,
                    AutoSumbit: bAutoSumbit,
                    TextFields: arrTextFields,
                    TextValues: arrTextValues,
                    PWDFields: arrPWDFields,
                    PWDValues: arrPWDValues
                });
            }
        }
        else if (request.command == "createBrowserRecord") {
            PWMGRPlugObject.reset();
            for (var idx = 0; idx < request.PWDFieldCount; ++idx) {
                PWMGRPlugObject.addPWDFieldAndValue(request.PWDFieldNames[idx], request.PWDFieldValues[idx]);
            }

            for (var idx = 0; idx < request.TextFieldCount; ++idx) {
                PWMGRPlugObject.addTextFieldAndValue(request.TextFieldNames[idx], request.TextFieldValues[idx]);
            }

            PWMGRPlugObject.createBrowserRecord(request.url, request.title);

        }
        else {
            sendResponse({}); // snub them.
        }
    } // function
); // addListener