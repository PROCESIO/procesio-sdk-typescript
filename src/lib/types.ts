export interface ConstructorOptions {
  serverName?: string;
  authenticationPort?: number;
  mainPort?: number;
  apiKey?: ApiKeyCredential;
}

export interface ApiKeyCredential {
  name: string;
  value: string;
}

export interface ProcesioToken {
  access_token: string;
  expires_in: number;
  refresh_token: string;
}

export interface ProcessInstance {
  id: GUID;
  title: string;
  description: string;
  isValid: boolean;
  firstName: string;
  lastName: string;
  workspaceName: string;
  variables: Array<Variable>;
  status: number;
}

export interface Variable {
  id: GUID;
  contextId: GUID;
  name: string;
  dataType: GUID;
  defaultValue: unknown | FileDefaultValue | FileDefaultValue[];
  isList: boolean;
  type: VariableType;
}

export type GUID = string;

export type FileName = Record<"name", string>;

export interface FileWrapper {
  package: File;
  fileId?: GUID;
}
export interface FileDefaultValue {
  name: string;
  id: GUID;
}

export enum VariableType {
  INPUT = 10,
  OUTPUT = 30,
  PROCESS = 20,
}
