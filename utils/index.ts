import Ajv from 'ajv';
const ajv = new Ajv({ allErrors: true });

export function ajvCheck(schema: any, body: any) {
  const validation = ajv.validate(schema, body);

  if (validation) {
    return true;
  } else {
    console.error(`\nAJV Validation Errors: ${ajv.errorsText()}`);
    return false;
  }
}
