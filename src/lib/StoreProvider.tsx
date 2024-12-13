'use client'
import { Provider } from 'react-redux'
import { AppStore } from './store';

export default function StoreProvider({
    children,
    store
}: {
    children: React.ReactNode,
    store: AppStore
}) {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}