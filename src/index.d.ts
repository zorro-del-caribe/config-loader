interface ConfLoaderOptions {
    directory?: string;
    strict?: boolean;
}
export declare const load: (opts?: ConfLoaderOptions) => (path: string) => any;
export {};
