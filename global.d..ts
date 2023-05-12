declare namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }

declare module '*.module.css' {
    const classes: { readonly [key: string]: string };
}