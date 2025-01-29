import { Observable, PageArray } from '@triframe/ambassador';
import { ReactElement, useEffect, useRef, useState } from 'react';
import { FlatList, FlatListProps, LayoutRectangle, NativeScrollEvent, NativeSyntheticEvent, View } from 'react-native';

type Pagination = {
    offset: number;
    limit: number;
}

type LayoutRecord<T> = Record<string, LayoutRectangle>;

class ItemScrollEvent<T> {

  keyExtractor: (item: T, index: number) => string

  data: T[]

  layouts: LayoutRecord<T>

  contentOffset: number

  constructor(keyExtractor: (item: T, index: number) => string, data: T[], layouts: LayoutRecord<T>, contentOffset: number) {
    this.keyExtractor = keyExtractor;
    this.data = data;
    this.layouts = layouts;
    this.contentOffset = contentOffset;
  }

  getFirstVisibleItem() {
    if (this.contentOffset === 0) return this.data[0];
    let offset = 0;
    for (let i  = 0; i < this.data.length; i++) {
      const item = this.data[i];
      const key = this.keyExtractor(item, i);
      const layout = this.layouts[key];
      offset += layout.height;
      if (offset > this.contentOffset) {
        return item
      }
    }
  }

}

export function useInfiniteList<T, F extends { isFailure: true }>(getter: (pagination: Pagination) => Observable<PageArray<T> | F>, dependencies: any[] = []) {
      const getData = useRef(getter)
      getData.current = getter;

      const dependenciesRef = useRef(dependencies);
      dependenciesRef.current = dependencies

      type InfiniteListProps = Omit<FlatListProps<T>, 'children' | 'data' | 'renderItem'> & {
        children: (item: T) => ReactElement
        pageSize: number
        initialOffset?: number
        onItemsScroll?: (e: ItemScrollEvent<T>) => any
      }

      type InfiniteListState = {
        offset: number
        data: T[]
      }

      const [ InfiniteList ] = useState(() => function({
        children,
        pageSize,
        initialOffset = 0,
        keyExtractor,
        onItemsScroll,
        ...flatListProps
      }: InfiniteListProps) {
        const getter = getData.current;
        const dependencies = dependenciesRef.current;


        const total = useRef(Infinity);

        const { current: layouts } = useRef<LayoutRecord<T>>({});

        const isLoading = useRef(false);

        const [ state, setState ] = useState<InfiniteListState>({
          offset: initialOffset,
          data: []
        });

        const offset = state.offset;

        const hasEmittedFirstEvent = useRef(false);

        useEffect(() => {
          const handleResult = (data: PageArray<T>) => {
            total.current = data.total;
            if (!hasEmittedFirstEvent.current && onItemsScroll) {
              hasEmittedFirstEvent.current = true;
              onItemsScroll(new ItemScrollEvent(keyExtractor, data, layouts, 0))
            }
            setState(state => ({ ...state, data }))
            setTimeout(() => {
              isLoading.current = false
            }, 500)

            const allKeys = data.map( (item, i) => keyExtractor(item, i));
            for (let key in layouts) {
              if (!allKeys.includes(key)) {
                delete layouts[key];
              }
            }
          };

          isLoading.current = true;
          const observable = getter({ limit: pageSize * 3, offset });
          observable.observe(handleResult);
          return () => observable.removeListener(handleResult);
        }, [ pageSize, offset, ...dependencies ])

        function handleScroll(e: NativeSyntheticEvent<NativeScrollEvent>) {
          if (isLoading.current) return;
          const { layoutMeasurement, contentSize, contentOffset } = e.nativeEvent;
          const { y } = contentOffset;
          if (onItemsScroll) {
            onItemsScroll(new ItemScrollEvent(keyExtractor, state.data, layouts, y))
          }
          if (y < 400) {
            setState(state => ({
              ...state,
              offset:  Math.max(0, state.offset - pageSize)
            }))
          }
          if ((y + layoutMeasurement.height) > (contentSize.height - 400)) {
            setState(state => ({
              ...state,
              offset:  Math.min(total.current - pageSize, state.offset + pageSize)
            }))
          }
        }

        if (state.data.length === 0) return null;

        return (
          <FlatList
            style={{ height: '100%' }}
            data={state.data}
            renderItem={({ item, index }) => (
                <View onLayout={(e) => layouts[keyExtractor(item, index)] = e.nativeEvent.layout}>
                    {children(item)}
                </View>
            )}

            maintainVisibleContentPosition={{
              minIndexForVisible: 0,
              autoscrollToTopThreshold: -10
            }}

            keyExtractor={keyExtractor}


            onScroll={handleScroll}
            scrollEventThrottle={0}

            {...flatListProps}
          />
        );
      })

      return InfiniteList;
  }
