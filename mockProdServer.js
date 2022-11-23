import { createProdMockServer } from "vite-plugin-mock/es/createProdMockServer";
import userMock from "./src/mock/user.1ts";

export function setupProdMockServer() {
  createProdMockServer([...userMock]);
}
