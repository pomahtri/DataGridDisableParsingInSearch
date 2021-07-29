/**
* DevExtreme (data/array_store.d.ts)
* Version: 21.2.0
* Build date: Thu Jul 29 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import Store, {
    StoreOptions
} from './abstract_store';
import { Query } from './query';

/** @namespace DevExpress.data */
export interface ArrayStoreOptions<TKey = any, TValue = any> extends StoreOptions<TKey, TValue> {
    /**
     * @docid
     * @public
     * @type Array<any>
     */
    data?: Array<TValue>;
}
/**
 * @docid
 * @inherits Store
 * @module data/array_store
 * @export default
 * @public
 */
export default class ArrayStore<TKey = any, TValue = any> extends Store<TKey, TValue> {
    constructor(options?: ArrayStoreOptions<TKey, TValue>)
    /**
     * @docid
     * @publicName clear()
     * @public
     */
    clear(): void;
    /**
     * @docid
     * @publicName createQuery()
     * @return object
     * @public
     */
    createQuery(): Query;
}
