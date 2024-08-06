export type Test = () => Promise<void> | void;
export declare const describe: (name: string, test: Test) => Promise<void>;
export declare const it: (name: string, test: Test) => Promise<void>;
export declare const xit: (_name: string, _test: Test) => void;
