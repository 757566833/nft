import {LocalStorageProvider, useLocalStorage} from 'src/lib/react-context/localStorage/context';

/**
 * LocalStorage整体导出的class
 */
export class LocalStorage {
    static LocalStorageProvider =LocalStorageProvider
    static useLocalStorage=useLocalStorage
}
export default LocalStorage;
