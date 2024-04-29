import React from 'react';
import { render, screen } from '@testing-library/react';
import MainPage from './render.jsx'; 

describe('MainPage component', () => {
    test('renders panorama viewer when panorama is valid', async () => {
        // mock fetch to return a valid panorama
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({ imageSource: 'validImage.jpg', config: {} }),
            })
        );

        render(<MainPage />);

        // wait for the panorama to be fetched and rendered
        const panoramaElement = await screen.findByTestId('panorama-viewer');

        expect(panoramaElement).toBeInTheDocument();
    });

    test('renders error message when panorama is invalid', async () => {
        // mock fetch to return an invalid panorama
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({ imageSource: '', config: {} }),
            })
        );

        render(<MainPage />);

        // wait for the error message to be rendered
        const errorMessage = await screen.findByText('Invalid panorama. Please try again.');

        expect(errorMessage).toBeInTheDocument();
    });
});