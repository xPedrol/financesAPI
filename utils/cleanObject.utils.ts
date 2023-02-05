export const removeEmptyProperties = (obj: any): any => {
  const newObj: any = {};
  Object.entries(obj).forEach(([key, value]) => {
    if (value && typeof value === "object") {
      newObj[key] = removeEmptyProperties(value);
    } else if (value !== undefined && value !== null) {
      newObj[key] = value;
    }
  });
  return newObj;
};
