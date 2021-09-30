declare module 'react-file-viewer';
declare module 'react-read-pdf';
declare module 'pdfh5';
declare interface Window {
    getStructure: Function;
    getSearchOptions: Function;
    callStructureSearch: Function;
    lastId: number;
}