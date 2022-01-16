export class DynamicBase<T> {
  value: T | any;
  key: string;
  label: string;
  required: boolean;
  order: number | any;
  controlType: string;
  type: string;
  options: { key: string, value: string }[];
  autoCompleteArray: [];
  cssClass: string;
  rule: any;
  isdisabled: boolean;
  isReadonly: boolean;
  constructor(options: {
    value?: T;
    key?: string;
    label?: string;
    required?: boolean;
    order?: number;
    controlType?: string;
    type?: string;
    cssClass?: string;
    options?: { key: string, value: string }[];
    autoCompleteArray?: [];
    rule?: any;
    isdisabled?: boolean;
    isReadonly?: boolean;
  } = {}) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.required = !!options.required;
    this.order = options.order ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.type = options.type || '';
    this.options = options.options || [];
    this.autoCompleteArray = options.autoCompleteArray || [];
    this.cssClass = options.cssClass || '';
    this.rule = options.rule || null;
    this.isdisabled = options.isdisabled || false;
    this.isReadonly = options.isReadonly || false;
  }
}
