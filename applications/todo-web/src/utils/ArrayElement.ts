export type ArrayElement<ArrayType extends ReadonlyArray<unknown>> =
  ArrayType extends ReadonlyArray<infer ElementType> ? ElementType : never
