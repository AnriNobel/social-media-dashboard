
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import UsersPage from './UsersPage'
import * as api from '../api/jsonplaceholder'

vi.spyOn(api, 'getUsers').mockResolvedValue([
  { id: 1, name: 'Leanne', username: 'leanne', email: 'l@e.com', phone: '', website: 'leanne.com' }
])

it('renders users', async () => {
  render(<MemoryRouter><UsersPage /></MemoryRouter>)
  expect(await screen.findByText('Leanne')).toBeInTheDocument()
  expect(screen.getByText(/@leanne/)).toBeInTheDocument()
})
