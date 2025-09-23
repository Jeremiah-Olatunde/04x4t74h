export type GroupLeaf<T> = T
export type GroupLeaves<T> = readonly GroupLeaf<T>[]
export type GroupNode<T> = readonly [string, GroupLeaves<T>]
export type GroupTree<T> = readonly GroupNode<T>[]
