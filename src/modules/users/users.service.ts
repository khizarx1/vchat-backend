// Users service — business logic, delegates persistence to the repository.
import { usersRepository } from './users.repository';

export const usersService = {
  findAll() {
    return usersRepository.findMany();
  },

  findById(id: string) {
    return usersRepository.findById(id);
  },
};
