import { render, screen } from '@testing-library/react';

test('renders learn react link', () => {
    render(<App />);
    const linkElement = screen.getByAltText('Preloader');
    expect(linkElement).toBeInTheDocument();
});
