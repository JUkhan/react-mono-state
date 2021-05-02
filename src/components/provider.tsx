import React from 'react';
import { MonoStore } from 'mono-state';
import { ReactMonoContext } from '../components/context';
import { useIsomorphicLayoutEffect } from '../utils/useIsomorphicLayoutEffect';
interface StoreProps {
    store: MonoStore,
    context?: React.Context<MonoStore>
}

export const Provider: React.FC<StoreProps> = ({ store, context, children }) => {
    useIsomorphicLayoutEffect(() => {
        return () => {
            store?.clear();
        }
    }, [store]);
    const Context = context || ReactMonoContext
    return <Context.Provider value={store}>{children}</Context.Provider>;
}
