"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = __importStar(require("express"));
var image_1 = __importDefault(require("./api/image"));
var routes = express.Router();
routes.use('/api/images', image_1.default);
//here we descripe the steps of how to use the API to the user
routes.get('/', function (request, response) {
    response.send("<h1>\n      Image Processing API<br/>  \n      <h2>Here is the Steps to use this API</h2>\n      <h3>\n         <ol>\n            <li>\n               http://localhost:5000/api/images?imageName=(image Name) here we can insert the image name <br>\n               you can chose from this list \n               <ul>\n                  <li>crow</li>\n                  <li>dove</li>\n                  <li>falcon</li>\n                  <li>owl</li>\n               </ul>\n            </li>\n            <li>We can add the image Width and Height to process the image if it's not in the buffer <br>\n               http://localhost:5000/api/images?imageName=dove&imageWidth=(image Width)&imageHeight=(image Height)\n               <br>note We can't use less than 1 as Width or Height \n            </li>\n            <li>\n               Quick Access Links:\n               <ul>\n                  <li><a href=\"/api/images?imageName=crow\">Click for Full image Crow :).</a></li>\n                  <li><a href=\"/api/images?imageName=crow&imageWidth=200&imageHeight=200\">Click for 200 Width x 200 Height image Crow</a></li>\n               </ul>\n            </li>\n         </ol>\n      </h3>");
});
exports.default = routes;
