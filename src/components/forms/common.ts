export const commonInputProps = {
  fieldId: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  labelSrOnly: {
    type: Boolean,
    required: false,
    default: true,
  },
  groupCssClass: {
    type: String,
    required: false,
  },
  inputCssClass: {
    type: String,
    required: false,
  },
  value: {
    // not sure if this should be required or have type validation...
  },
};
