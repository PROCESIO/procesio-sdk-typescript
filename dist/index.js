/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@babel/runtime/regenerator/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! regenerator-runtime */ "./node_modules/regenerator-runtime/runtime.js");


/***/ }),

/***/ "./src/lib/ProcesioSDK.ts":
/*!********************************!*\
  !*** ./src/lib/ProcesioSDK.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProcesioSDK": () => (/* binding */ ProcesioSDK)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _utils_request__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/request */ "./src/lib/utils/request.ts");







var ProcesioSDK = /*#__PURE__*/function () {
  function ProcesioSDK() {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__["default"])(this, ProcesioSDK);

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__["default"])(this, "token", void 0);
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__["default"])(ProcesioSDK, [{
    key: "authorize",
    value:
    /**
     * @description
     * Authenticates the library with the provided credentials provided in the constructor
     *
     * @remarks
     * You should await for the response of this method before proceeding with other
     * methods from this library, as them are dependent on the response provided by
     * the authentication.
     *
     * @usageNotes
     *
     *  ### Authenticate and log the obtained token
     *
     *  ```typescript
     * const sdkInstance = new ProcesioSDK();
     *
     * const token = await sdkInstance.authorize('username', 'password');
     *
     * console.log(JSON.stringify(token)); // {"access_token":"<hashed_token>", "expires_in":2592000, "refresh_expires_in":2592000, "refresh_token":"<hashed_token>", "token_type":"bearer", "session_state":"5beb683c-3ed7-4f7a-be79-c2d3eb5f4e43", "scope":"email profile", "error":null, "error_description":null}
     *
     * ```
     * @returns A Promise which returns an object containing all the necessary informations for
     * authentication, like token or refresh token.
     */
    function () {
      var _authorize = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_5___default().mark(function _callee(username, password) {
        var credentials, form, property, encodedKey, encodedValue, formJoin, headers, resp, authResponse;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_5___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                credentials = {
                  username: username,
                  password: password,
                  realm: "procesio01",
                  client_id: "procesio-ui"
                };
                form = [];

                for (property in credentials) {
                  encodedKey = encodeURIComponent(property);
                  encodedValue = encodeURIComponent(credentials[property]);
                  form.push(encodedKey + "=" + encodedValue);
                }

                formJoin = form.join("&");
                headers = new Headers();
                headers.set("Content-type", "application/x-www-form-urlencoded");
                _context.next = 8;
                return fetch("https://api.procesio.app:4532/api/authentication", {
                  method: "POST",
                  body: formJoin,
                  headers: headers
                });

              case 8:
                resp = _context.sent;
                _context.next = 11;
                return resp.json();

              case 11:
                authResponse = _context.sent;
                this.token = authResponse.access_token;
                return _context.abrupt("return", authResponse);

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function authorize(_x, _x2) {
        return _authorize.apply(this, arguments);
      }

      return authorize;
    }()
    /**
     * @description
     * Calls an endpoint through which you can publish a process with the required
     * inputs in order to run that process.
     *
     * @remarks
     * Running a process from the PROCESIO platform is done in 3 different steps.
     * `PUBLISH` (generates an instance of a process), `uploadFile` (required ony for instances
     * that have file inputs) and `launch` (executes the previously generated instance)
     *
     * @usageNotes
     *
     *  ### Publish a process which sends an email and log the instance id.
     *
     *  ```typescript
     * const sdkInstance = new ProcesioSDK();
     *
     * await sdkInstance.authorize('username', 'password');
     *
     * const publishReq = await sdkInstance.publish('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx', {to: "someemail@domain.com", subject: "Process launched via SDK"})
     *
     * console.log(publishReq.content.flows.id); // "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx"
     *
     * ```
     * @param processId - The id of the process. Can be obtained from the PROCESIO platform.
     *
     * @param payload
     * Object which contains all the inputs needed to run a process from the PROCESIO platform.
     * The key of map is the variable name set in the process from the PROCESIO platform.
     * The value of the map is the value of said variable. If a variable is of type file, it's
     * value should be an object with the key name and the value the name of the file
     *
     * @param workspace - The workspace associated with the process. Optional.
     *
     * @returns A Promise which returns the instance of the process.
     */

  }, {
    key: "publish",
    value: function publish(processId, payload, workspace) {
      if (!this.token) {
        throw Error("Authorization information missing.");
      }

      return (0,_utils_request__WEBPACK_IMPORTED_MODULE_6__.request)({
        url: "Projects/".concat(processId, "/instances/publish"),
        bearerToken: this.token,
        workspace: workspace,
        body: payload,
        method: _utils_request__WEBPACK_IMPORTED_MODULE_6__.RequestMethods.POST
      });
    }
    /**
     * @description
     * Calls an endpoint through which you can launch an instance of a process.
     *
     * @remarks
     * Running a process from the PROCESIO platform is done in 3 different steps.
     * `publish` (generates an instance of a process), `uploadFile` (required ony for instances
     * that have file inputs) and `LAUNCH` (executes the previously generated instance)
     *
     * @usageNotes
     *
     *  ### Launch an instance of a process which sends an email and log the instance id.
     *
     *  ```typescript
     * const sdkInstance = new ProcesioSDK();
     *
     * await sdkInstance.authorize('username', 'password');
     *
     * const publishReq = await sdkInstance.publish('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx', {to: "someemail@domain.com", subject: "Process launched via SDK"})
     *
     * if (!publishReq.isError && publishReq.content.flows.isValid) {
     *   const launchReq = await sdkInstance.launch(publish.content.flows.id);
     *
     *   console.log(launchReq.content?.instanceId); // "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx"
     *}
     * ```
     * @param instanceId - The id of the instance. Can be obtained by `publish`ing a process.
     *
     * @param workspace - The workspace associated with the instance. Optional.
     *
     * @returns A Promise which returns an object with they key instanceId.
     */

  }, {
    key: "launch",
    value: function launch(instanceId, workspace) {
      if (!this.token) {
        throw Error("Authorization information missing.");
      }

      return (0,_utils_request__WEBPACK_IMPORTED_MODULE_6__.request)({
        url: "Projects/instances/".concat(instanceId, "/launch"),
        bearerToken: this.token,
        workspace: workspace,
        body: {
          connectionId: ""
        }
      });
    }
    /**
     * @description
     * Calls an endpoint through which you can upload a file associated to an input.
     *
     * @remarks
     * Running a process from the PROCESIO platform is done in 3 different steps.
     * `publish` (generates an instance of a process), `UPLOADFILE` (required ony for instances
     * that have file inputs) and `launch` (executes the previously generated instance)
     *
     * @usageNotes
     *
     *  ### Execute a process which sends an email with attachments and log the instance id.
     *
     *  ```typescript
     * const sdkInstance = new ProcesioSDK();
     *
     * await sdkInstance.authorize('username', 'password');
     *
     * document
     *   .getElementById("file")
     *   .addEventListener("change", handleFileSelect, false);
     *
     * function handleFileSelect(evt) {
     *   const files = evt.target.files; // FileList object
     *   const file = files[0];
     * 
     *   const publishReq = await sdkInstance.publish('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx', {to: "someemail@domain.com", subject: "Process launched via SDK", attachments: {name: file.name}})
     *
     *   if (!publishReq.isError && publishReq.content.flows.isValid) {
     *     const fileVariable = publishReq.content.flows.variables.find((variable) => variable.name === "invoiceListFile");
     * 
     *     await sdkInstance.uploadFile(publishReq.content.flows.id, fileVariable.name, fileVariable.defaultValue.id, file)
     * 
     *     const launchReq = await sdkInstance.launch(publishReq.content.flows.id);
     *
     *     console.log(launchReq.content?.instanceId); // "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx"
     *   }
     * }
     *
     
     * ```
     * @param instanceId - The id of the instance. Can be obtained by `publish`ing a process.
     * @param variableName - The name of the input variable. 
     * @param fileId - The id of the file. Can be obtained on the `publish` response in the in the `variable` property.
     * @param file
     *
     * @param workspace - The workspace associated with the instance. Optional.
     *
     * @returns A Response Promise which returns the id of the file.
     */

  }, {
    key: "uploadFile",
    value: function () {
      var _uploadFile = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_5___default().mark(function _callee2(instanceId, variableName, fileId, file) {
        var workspace,
            headers,
            formData,
            resp,
            _args2 = arguments;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_5___default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                workspace = _args2.length > 4 && _args2[4] !== undefined ? _args2[4] : "";

                if (this.token) {
                  _context2.next = 3;
                  break;
                }

                throw Error("Authorization information missing.");

              case 3:
                headers = new Headers();
                headers.set("Accept", "application/json");
                headers.set("Authorization", "Bearer ".concat(this.token));
                headers.set("realm", "procesio01");
                headers.set("flowInstanceId", instanceId);
                headers.set("variableName", variableName);
                headers.set("fileId", fileId);
                headers.set("workspace", workspace);
                formData = new FormData();
                formData.append("package", file);
                headers["delete"]("Content-Type");
                delete headers["Content-Type"];
                _context2.next = 17;
                return fetch("https://api.procesio.app:4321/api/file/upload/flow", {
                  method: "POST",
                  headers: headers,
                  body: formData
                });

              case 17:
                resp = _context2.sent;
                return _context2.abrupt("return", resp.json());

              case 19:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function uploadFile(_x3, _x4, _x5, _x6) {
        return _uploadFile.apply(this, arguments);
      }

      return uploadFile;
    }()
    /**
     * @description
     * Calls an endpoint through which you can run a process with the required inputs.
     *
     * @remarks
     * The called endpoint only work for processes than don't have file inputs.
     * The called endpoint uses the endpoints called in `publish` and `launch`.
     *
     * @usageNotes
     *
     *  ### Runs a process which sends an email and log the instance id.
     *
     *  ```typescript
     * const sdkInstance = new ProcesioSDK();
     *
     * await sdkInstance.authorize('username', 'password');
     *
     * const runReq = await sdkInstance.run('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx', {to: "someemail@domain.com", subject: "Process launched via SDK"})
     *
     * console.log(runReq.content?.instanceId?.id); // "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx"
     *
     * ```
     * @param processId - The id of the process. Can be obtained from the PROCESIO platform.
     *
     * @param payload
     * Object which contains all the inputs needed to run a process from the PROCESIO platform.
     * The key of map is the variable name set in the process from the PROCESIO platform.
     * The value of the map is the value of said input variable.
     *
     * @param workspace - The workspace associated with the process. Optional.
     *
     * @returns A Promise which returns an object with they key instanceId.
     */

  }, {
    key: "run",
    value: function run(processId, payload, workspace) {
      if (!this.token) {
        throw Error("Authorization information missing.");
      }

      return (0,_utils_request__WEBPACK_IMPORTED_MODULE_6__.request)({
        url: "Projects/".concat(processId, "/run"),
        bearerToken: this.token,
        workspace: workspace,
        body: {
          payload: payload
        }
      });
    }
    /**
     * @description
     * Run a process with the required inputs.
     *
     * @usageNotes
     *
     *  ### Runs a process which sends an email and log the instance id.
     *
     *  ```typescript
     * const sdkInstance = new ProcesioSDK();
     *
     * await sdkInstance.authorize('username', 'password');
     *
     * const runReq = await sdkInstance.run('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx', {to: "someemail@domain.com", subject: "Process launched via SDK"})
     *
     * console.log(runReq.content?.instanceId?.id); // "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx"
     *
     * ```
     * @param processId - The id of the process. Can be obtained from the PROCESIO platform.
     *
     * @param payload
     * Object which contains all the inputs needed to run a process from the PROCESIO platform.
     * The key of map is the variable name set in the process from the PROCESIO platform.
     * The value of the map is the value of said input variable.
     *
     * @param workspace - The workspace associated with the process. Optional.
     *
     * @returns A Promise which returns an object with they key instanceId.
     */

  }, {
    key: "runProcess",
    value: function () {
      var _runProcess = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_5___default().mark(function _callee3(processId, payload, workspace) {
        var _this = this;

        var hasFiles, files, parsedPayload, publishReq, instance, _loop, variableName, promises, _variableName, element, index;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_5___default().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                hasFiles = false;
                files = {};
                parsedPayload = Object.entries(payload).reduce(function (acc, _ref) {
                  var _ref2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref, 2),
                      key = _ref2[0],
                      value = _ref2[1];

                  if (value instanceof File) {
                    hasFiles = true;
                    acc[key] = {
                      name: value.name
                    };
                    files[key] = {
                      "package": value
                    };
                  } else if (value instanceof FileList) {
                    hasFiles = true;
                    var fileArray = Array.from(value);
                    acc[key] = fileArray.map(function (file) {
                      return {
                        name: file.name
                      };
                    });
                    files[key] = fileArray.map(function (file) {
                      return {
                        "package": file
                      };
                    });
                  } else {
                    acc[key] = value;
                  }

                  return acc;
                }, {});

                if (!hasFiles) {
                  _context3.next = 40;
                  break;
                }

                _context3.next = 6;
                return this.publish(processId, parsedPayload, workspace);

              case 6:
                publishReq = _context3.sent;

                if (!(!publishReq.isError && publishReq.content.flows.isValid)) {
                  _context3.next = 38;
                  break;
                }

                instance = publishReq.content.flows;

                _loop = function _loop(variableName) {
                  if (Object.prototype.hasOwnProperty.call(files, variableName)) {
                    var fileWrapper = files[variableName];
                    var defaultValue = instance.variables.find(function (variable) {
                      return variable.name === variableName;
                    }).defaultValue;

                    if (Array.isArray(fileWrapper)) {
                      fileWrapper.forEach(function (wrapper, index) {
                        wrapper.fileId = defaultValue[index].id;
                      });
                    } else {
                      fileWrapper.fileId = defaultValue.id;
                    }
                  }
                };

                for (variableName in files) {
                  _loop(variableName);
                }

                promises = [];
                _context3.t0 = _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_5___default().keys(files);

              case 13:
                if ((_context3.t1 = _context3.t0()).done) {
                  _context3.next = 37;
                  break;
                }

                _variableName = _context3.t1.value;

                if (!Object.prototype.hasOwnProperty.call(files, _variableName)) {
                  _context3.next = 35;
                  break;
                }

                element = files[_variableName];

                if (!Array.isArray(element)) {
                  _context3.next = 30;
                  break;
                }

                index = 0;

              case 19:
                if (!(index < element.length)) {
                  _context3.next = 28;
                  break;
                }

                _context3.t2 = promises;
                _context3.next = 23;
                return this.uploadFile(instance.id, _variableName, element[index].fileId, element[index]["package"]);

              case 23:
                _context3.t3 = _context3.sent;

                _context3.t2.push.call(_context3.t2, _context3.t3);

              case 25:
                index++;
                _context3.next = 19;
                break;

              case 28:
                _context3.next = 35;
                break;

              case 30:
                _context3.t4 = promises;
                _context3.next = 33;
                return this.uploadFile(instance.id, _variableName, element.fileId, element["package"]);

              case 33:
                _context3.t5 = _context3.sent;

                _context3.t4.push.call(_context3.t4, _context3.t5);

              case 35:
                _context3.next = 13;
                break;

              case 37:
                return _context3.abrupt("return", Promise.all(promises).then(function () {
                  return _this.launch(instance.id, workspace);
                }));

              case 38:
                _context3.next = 41;
                break;

              case 40:
                return _context3.abrupt("return", this.run(processId, payload, workspace));

              case 41:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function runProcess(_x7, _x8, _x9) {
        return _runProcess.apply(this, arguments);
      }

      return runProcess;
    }()
  }]);

  return ProcesioSDK;
}();

/***/ }),

/***/ "./src/lib/index.ts":
/*!**************************!*\
  !*** ./src/lib/index.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ProcesioSDK__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProcesioSDK */ "./src/lib/ProcesioSDK.ts");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_ProcesioSDK__WEBPACK_IMPORTED_MODULE_0__.ProcesioSDK);

/***/ }),

/***/ "./src/lib/utils/request.ts":
/*!**********************************!*\
  !*** ./src/lib/utils/request.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RequestMethods": () => (/* binding */ RequestMethods),
/* harmony export */   "request": () => (/* binding */ request)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);


var RequestMethods;

(function (RequestMethods) {
  RequestMethods["GET"] = "GET";
  RequestMethods["POST"] = "POST";
  RequestMethods["DELETE"] = "DELETE";
  RequestMethods["PUT"] = "PUT";
})(RequestMethods || (RequestMethods = {}));

function request(_x) {
  return _request.apply(this, arguments);
}

function _request() {
  _request = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee(_ref) {
    var bearerToken, url, _ref$method, method, _ref$workspace, workspace, body, headers, req, status, resp, isBadRequest, response;

    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            bearerToken = _ref.bearerToken, url = _ref.url, _ref$method = _ref.method, method = _ref$method === void 0 ? RequestMethods.POST : _ref$method, _ref$workspace = _ref.workspace, workspace = _ref$workspace === void 0 ? "" : _ref$workspace, body = _ref.body;
            headers = new Headers();
            headers.set("Content-type", "application/json");
            headers.set("Authorization", "Bearer ".concat(bearerToken));
            headers.set("realm", "procesio01");
            headers.set("workspace", workspace);
            _context.next = 8;
            return fetch("https://api.procesio.app:4321/api/".concat(url), {
              method: method,
              headers: headers,
              body: JSON.stringify(body)
            });

          case 8:
            req = _context.sent;
            status = req.status;

            if (req.status === 401) {// refresh token
            }

            _context.next = 13;
            return req.json();

          case 13:
            resp = _context.sent;
            isBadRequest = status !== 200;
            response = {
              status: status,
              isError: isBadRequest,
              errorContent: isBadRequest ? resp : null,
              content: isBadRequest ? null : resp
            };
            return _context.abrupt("return", response);

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _request.apply(this, arguments);
}

/***/ }),

/***/ "./node_modules/regenerator-runtime/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/***/ ((module) => {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : 0
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}


/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _arrayLikeToArray)
/* harmony export */ });
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _arrayWithHoles)
/* harmony export */ });
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _asyncToGenerator)
/* harmony export */ });
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _classCallCheck)
/* harmony export */ });
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/createClass.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/createClass.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _createClass)
/* harmony export */ });
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/defineProperty.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _defineProperty)
/* harmony export */ });
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _iterableToArrayLimit)
/* harmony export */ });
function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js":
/*!********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _nonIterableRest)
/* harmony export */ });
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _slicedToArray)
/* harmony export */ });
/* harmony import */ var _arrayWithHoles_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayWithHoles.js */ "./node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js");
/* harmony import */ var _iterableToArrayLimit_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./iterableToArrayLimit.js */ "./node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js");
/* harmony import */ var _unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./unsupportedIterableToArray.js */ "./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js");
/* harmony import */ var _nonIterableRest_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./nonIterableRest.js */ "./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js");




function _slicedToArray(arr, i) {
  return (0,_arrayWithHoles_js__WEBPACK_IMPORTED_MODULE_0__["default"])(arr) || (0,_iterableToArrayLimit_js__WEBPACK_IMPORTED_MODULE_1__["default"])(arr, i) || (0,_unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__["default"])(arr, i) || (0,_nonIterableRest_js__WEBPACK_IMPORTED_MODULE_3__["default"])();
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _unsupportedIterableToArray)
/* harmony export */ });
/* harmony import */ var _arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayLikeToArray.js */ "./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js");

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return (0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return (0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(o, minLen);
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!***************************!*\
  !*** ./src/demo/index.ts ***!
  \***************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib */ "./src/lib/index.ts");



var myLibraryInstance = new _lib__WEBPACK_IMPORTED_MODULE_2__["default"]();
console.log("myLibraryInstance", myLibraryInstance);
var input = document.createElement("input");
input.type = "file";
input.multiple = true;
var btn = document.createElement("button");
btn.innerText = "Trigger flow";
var body = document.querySelector("body");
body.innerHTML = "<h1>Hello World!</h1>";
body.appendChild(input);
body.appendChild(btn);
var fileList;
var singleFile;

input.onchange = function (e) {
  var files = e.target.files;
  fileList = files;
  singleFile = fileList[0];
};

btn.onclick = /*#__PURE__*/(0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee() {
  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return myLibraryInstance.authorize("cuore.nica@procesio.com", "C#ut1creier");

        case 2:
          // const run = await myLibraryInstance.run(
          //   "241c2beb-4788-4c07-a705-0cec62ac1086",
          //   {
          //     from: "External application",
          //     to: "cuore.nica@procesio.com",
          //     subject: "Email triggered by external application",
          //     body: "Some randon body",
          //   }
          // );
          // console.log(run.content);
          //   return;
          // const publish = await myLibraryInstance.publish(
          //   "241c2beb-4788-4c07-a705-0cec62ac1086",
          //   {
          //     from: "External application",
          //     to: "cuore.nica@procesio.com",
          //     subject: "Email triggered by external application",
          //     body: "Some randon body",
          //     // singleFile: singleFile,
          //     // fileList: fileList,
          //   }
          // );
          // console.log(publish.content.flows.id);
          // if (!publish.isError && publish.content.flows.isValid) {
          //   const launch = await myLibraryInstance.launch(publish.content.flows.id);
          //   console.log(launch.content.instanceId);
          // }
          // myLibraryInstance.u
          myLibraryInstance.executeProcess("241c2beb-4788-4c07-a705-0cec62ac1086", {
            from: "External application",
            to: "cuore.nica@procesio.com",
            subject: "Email triggered by external application",
            body: "Some randon body",
            singleFile: singleFile,
            fileList: fileList
          }).then(function (resp) {
            return console.log(resp.content);
          });

        case 3:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}));
})();

/******/ })()
;
//# sourceMappingURL=index.js.map