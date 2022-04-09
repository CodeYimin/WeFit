import { objectType } from "nexus";

export interface FieldError {
  field: string;
  message: string;
}

export const FieldError = objectType({
  name: "FieldError",
  definition(t) {
    t.nonNull.string("field");
    t.nonNull.string("message");
  },
});
