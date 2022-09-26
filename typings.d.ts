declare module '*.css';
declare module '*.scss';
declare module '*.less';
declare module '*.png';
declare module '*.svg';

/**
 * 第三方库 blueimp-load-image
 */
// eslint-disable-next-line no-unused-vars
declare const loadImage :(file:File, callback:(image:HTMLCanvasElement)=>void, options:{[key:string]:string|boolean})=>void;

