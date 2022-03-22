import {render, fireEvent, screen} from '@testing-library/react'

import SummaryForm from '../../../pages/summary/SummaryForm';

describe('Summary Form', () => {
  it('should return checkbox unchecked by default', () => {
    render(<SummaryForm />);

    const checkboxElm = screen.getByRole('checkbox');
    expect(checkboxElm).not.toBeChecked();
  });
  it('should return checkbox "Enabled"', () => {
    render(<SummaryForm />);

    const checkboxElm = screen.getByRole('checkbox');
    const buttonElm = screen.getByRole('button');
    fireEvent.click(checkboxElm);
    expect(checkboxElm.errors).toBeUndefined();
    expect(checkboxElm).toBeChecked();
    expect(buttonElm).toBeEnabled()
  });
  it('should unchenking checkbox should disable button', () => {
    render(<SummaryForm />);

    const checkboxElm = screen.getByRole('checkbox');
    const buttonElm = screen.getByRole('button');
    fireEvent.click(checkboxElm)
    expect(checkboxElm).toBeChecked();
    expect(buttonElm).toBeEnabled();
    fireEvent.click(checkboxElm);
    expect(checkboxElm).not.toBeChecked();
    expect(buttonElm).toBeDisabled();
  })
})
