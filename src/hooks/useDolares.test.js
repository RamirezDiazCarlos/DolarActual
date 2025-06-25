import { renderHook, waitFor } from '@testing-library/react';
import * as dolarService from '../services/dolarService';
import useDolares from './useDolares';

vi.mock('../services/dolarService');

describe('useDolares', () => {
  it('sets dolares on successful fetch', async () => {
    dolarService.fetchDolares.mockResolvedValue([{ nombre: 'Oficial', venta: 1 }]);

    const { result } = renderHook(() => useDolares());

    await waitFor(() => expect(result.current.dolares).toHaveLength(1));
    expect(result.current.dolares[0].nombre).toBe('Oficial');
    expect(result.current.error).toBeNull();
  });

  it('sets error on fetch failure', async () => {
    dolarService.fetchDolares.mockRejectedValue(new Error('fail'));

    const { result } = renderHook(() => useDolares());

    await waitFor(() => expect(result.current.error).toBe('fail'));
    expect(result.current.dolares).toEqual([]);
  });
});
