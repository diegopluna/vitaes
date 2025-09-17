/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as locale from "../locale.js";
import type * as resume_exampleData_chinese from "../resume/exampleData/chinese.js";
import type * as resume_exampleData_english from "../resume/exampleData/english.js";
import type * as resume_exampleData_french from "../resume/exampleData/french.js";
import type * as resume_exampleData_german from "../resume/exampleData/german.js";
import type * as resume_exampleData_getExampleData from "../resume/exampleData/getExampleData.js";
import type * as resume_exampleData_japanese from "../resume/exampleData/japanese.js";
import type * as resume_exampleData_portuguese from "../resume/exampleData/portuguese.js";
import type * as resume_exampleData_spanish from "../resume/exampleData/spanish.js";
import type * as resume_functions from "../resume/functions.js";
import type * as resume_type from "../resume/type.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  locale: typeof locale;
  "resume/exampleData/chinese": typeof resume_exampleData_chinese;
  "resume/exampleData/english": typeof resume_exampleData_english;
  "resume/exampleData/french": typeof resume_exampleData_french;
  "resume/exampleData/german": typeof resume_exampleData_german;
  "resume/exampleData/getExampleData": typeof resume_exampleData_getExampleData;
  "resume/exampleData/japanese": typeof resume_exampleData_japanese;
  "resume/exampleData/portuguese": typeof resume_exampleData_portuguese;
  "resume/exampleData/spanish": typeof resume_exampleData_spanish;
  "resume/functions": typeof resume_functions;
  "resume/type": typeof resume_type;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
