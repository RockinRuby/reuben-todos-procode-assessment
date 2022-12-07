import { render, screen } from '@testing-library/react';
import Homepage from './Homepage';

test('Homepage renders', async () => {
    render(<Homepage />);

    await screen.findByText("TODO's");

    expect(screen.getByText("TODO's")).toBeInTheDocument();
});