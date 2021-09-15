var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { request, RequestMethods } from "./utils/request";
var ProcesioSDK = /** @class */ (function () {
    function ProcesioSDK() {
    }
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
    ProcesioSDK.prototype.authorize = function (username, password) {
        return __awaiter(this, void 0, void 0, function () {
            var credentials, form, property, encodedKey, encodedValue, formJoin, headers, resp, authResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        credentials = {
                            username: username,
                            password: password,
                            realm: "procesio01",
                            client_id: "procesio-ui",
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
                        return [4 /*yield*/, fetch("https://api.procesio.app:4532/api/authentication", {
                                method: "POST",
                                body: formJoin,
                                headers: headers,
                            })];
                    case 1:
                        resp = _a.sent();
                        return [4 /*yield*/, resp.json()];
                    case 2:
                        authResponse = _a.sent();
                        this.token = authResponse.access_token;
                        return [2 /*return*/, authResponse];
                }
            });
        });
    };
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
    ProcesioSDK.prototype.publish = function (processId, payload, workspace) {
        if (!this.token) {
            throw Error("Authorization information missing.");
        }
        return request({
            url: "Projects/" + processId + "/instances/publish",
            bearerToken: this.token,
            workspace: workspace,
            body: payload,
            method: RequestMethods.POST,
        });
    };
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
    ProcesioSDK.prototype.launch = function (instanceId, workspace) {
        if (!this.token) {
            throw Error("Authorization information missing.");
        }
        return request({
            url: "Projects/instances/" + instanceId + "/launch",
            bearerToken: this.token,
            workspace: workspace,
            body: { connectionId: "" },
        });
    };
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
     *     const fileVariable = publishReq.content.flows.variables.find((variable) => variable.name === "attachments");
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
    ProcesioSDK.prototype.uploadFile = function (instanceId, variableName, fileId, file, workspace) {
        if (workspace === void 0) { workspace = ""; }
        return __awaiter(this, void 0, void 0, function () {
            var headers, formData, resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.token) {
                            throw Error("Authorization information missing.");
                        }
                        headers = new Headers();
                        headers.set("Accept", "application/json");
                        headers.set("Authorization", "Bearer " + this.token);
                        headers.set("realm", "procesio01");
                        headers.set("flowInstanceId", instanceId);
                        headers.set("variableName", variableName);
                        headers.set("fileId", fileId);
                        headers.set("workspace", workspace);
                        formData = new FormData();
                        formData.append("package", file);
                        headers.delete("Content-Type");
                        delete headers["Content-Type"];
                        return [4 /*yield*/, fetch("https://api.procesio.app:4321/api/file/upload/flow", {
                                method: "POST",
                                headers: headers,
                                body: formData,
                            })];
                    case 1:
                        resp = _a.sent();
                        return [2 /*return*/, resp.json()];
                }
            });
        });
    };
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
    ProcesioSDK.prototype.run = function (processId, payload, workspace) {
        if (!this.token) {
            throw Error("Authorization information missing.");
        }
        return request({
            url: "Projects/" + processId + "/run",
            bearerToken: this.token,
            workspace: workspace,
            body: { payload: payload },
        });
    };
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
     * const runReq = await sdkInstance.runProcess('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx', {to: "someemail@domain.com", subject: "Process launched via SDK"})
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
    ProcesioSDK.prototype.runProcess = function (processId, payload, workspace) {
        return __awaiter(this, void 0, void 0, function () {
            var hasFiles, files, parsedPayload, publishReq, instance_1, _loop_1, variableName, promises, _a, _b, _i, variableName, element, index, _c, _d, _e, _f;
            var _this = this;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        hasFiles = false;
                        files = {};
                        parsedPayload = Object.entries(payload).reduce(function (acc, _a) {
                            var key = _a[0], value = _a[1];
                            if (value instanceof File) {
                                hasFiles = true;
                                acc[key] = { name: value.name };
                                files[key] = { package: value };
                            }
                            else if (value instanceof FileList) {
                                hasFiles = true;
                                var fileArray = Array.from(value);
                                acc[key] = fileArray.map(function (file) { return ({ name: file.name }); });
                                files[key] = fileArray.map(function (file) { return ({ package: file }); });
                            }
                            else {
                                acc[key] = value;
                            }
                            return acc;
                        }, {});
                        if (!hasFiles) return [3 /*break*/, 12];
                        return [4 /*yield*/, this.publish(processId, parsedPayload, workspace)];
                    case 1:
                        publishReq = _g.sent();
                        if (!(!publishReq.isError && publishReq.content.flows.isValid)) return [3 /*break*/, 11];
                        instance_1 = publishReq.content.flows;
                        _loop_1 = function (variableName) {
                            if (Object.prototype.hasOwnProperty.call(files, variableName)) {
                                var fileWrapper = files[variableName];
                                var defaultValue_1 = instance_1.variables.find(function (variable) { return variable.name === variableName; }).defaultValue;
                                if (Array.isArray(fileWrapper)) {
                                    fileWrapper.forEach(function (wrapper, index) {
                                        wrapper.fileId = defaultValue_1[index].id;
                                    });
                                }
                                else {
                                    fileWrapper.fileId = defaultValue_1.id;
                                }
                            }
                        };
                        for (variableName in files) {
                            _loop_1(variableName);
                        }
                        promises = [];
                        _a = [];
                        for (_b in files)
                            _a.push(_b);
                        _i = 0;
                        _g.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 10];
                        variableName = _a[_i];
                        if (!Object.prototype.hasOwnProperty.call(files, variableName)) return [3 /*break*/, 9];
                        element = files[variableName];
                        if (!Array.isArray(element)) return [3 /*break*/, 7];
                        index = 0;
                        _g.label = 3;
                    case 3:
                        if (!(index < element.length)) return [3 /*break*/, 6];
                        _d = (_c = promises).push;
                        return [4 /*yield*/, this.uploadFile(instance_1.id, variableName, element[index].fileId, element[index].package)];
                    case 4:
                        _d.apply(_c, [_g.sent()]);
                        _g.label = 5;
                    case 5:
                        index++;
                        return [3 /*break*/, 3];
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        _f = (_e = promises).push;
                        return [4 /*yield*/, this.uploadFile(instance_1.id, variableName, element.fileId, element.package)];
                    case 8:
                        _f.apply(_e, [_g.sent()]);
                        _g.label = 9;
                    case 9:
                        _i++;
                        return [3 /*break*/, 2];
                    case 10: return [2 /*return*/, Promise.all(promises).then(function () {
                            return _this.launch(instance_1.id, workspace);
                        })];
                    case 11: return [3 /*break*/, 13];
                    case 12: return [2 /*return*/, this.run(processId, payload, workspace)];
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    return ProcesioSDK;
}());
export { ProcesioSDK };
//# sourceMappingURL=ProcesioSDK.js.map