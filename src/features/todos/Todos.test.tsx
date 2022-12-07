import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import Todos from './Todos';

test('Todos Feature', async () => {
    render(<Provider store={store}><Todos /></Provider>);

    await screen.findByTestId("todos_wrapper");

    expect(screen.getByTestId("todos_wrapper")).toBeInTheDocument();
});