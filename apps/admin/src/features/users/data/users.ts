import { faker } from '@faker-js/faker'

// Set a fixed seed for consistent data generation
faker.seed(67890)

export const users = Array.from({ length: 500 }, () => {
  const name = faker.person.fullName()
  return {
    id: faker.string.uuid(),
    email: faker.internet.email().toLocaleLowerCase(),
    username: faker.internet.username().toLocaleLowerCase(),
    name,
    avatar: faker.image.avatar(),
    bio: faker.helpers.maybe(() => faker.person.bio(), { probability: 0.7 }) ?? null,
    role: faker.helpers.arrayElement(['READER', 'ADMIN', 'EDITOR']),
    isActive: faker.datatype.boolean(),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
  }
})
