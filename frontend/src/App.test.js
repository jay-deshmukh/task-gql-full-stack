import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App.js';
import { act } from 'react-dom/test-utils';

beforeEach(() => {

  fetch.resetMocks();

  const expectedData = {
   "data" : {
    "heroes": [
      {
        "name": "Luke Skywalker"
      },
      {
        "name": "Han Solo"
      },
      {
        "name": "C-3PO"
      }
    ]
   }
  };

  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue(expectedData)
  })

});


afterEach(() => {
  jest.restoreAllMocks();
});


test('Buttons are rendered for heroes', async () => {
  const expectedButtonTexts = ["Luke Skywalker", "Han Solo", "C-3PO"]

  await act(async () => {
    render(
      <App/>);
  })

  const buttons = screen.getAllByRole('button')

  expect(buttons).toHaveLength(expectedButtonTexts.length);
  for (let i = 0; i < expectedButtonTexts.length; i++) {
    expect(buttons[i]).toHaveTextContent(expectedButtonTexts[i]);
  }
});
