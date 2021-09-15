export interface AuthResponse {
  access_token: string;
  error: unknown;
  error_description: unknown;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
  scope: string;
  session_state: string;
  token_type: string;
}

export interface FlowInstance {
  id: GUID;
  title: string;
  description: string;
  isValid: boolean;
  firstName: string;
  lastName: string;
  lastUpdate: Date;
  startOn: Date;
  status: number;
  workspaceName: string;
  actions: Array<unknown>;
  variables: Array<Variable>;
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
