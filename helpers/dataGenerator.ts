import { faker } from "@faker-js/faker";

export function generateRandomEmployeeData() {
    const firstName = faker.person.firstName();
    const middleName = faker.person.middleName();
    const lastName = faker.person.lastName();

    const employeeId = faker.number.int({ min: 10000, max: 99999 }).toString();

    const username = faker.internet.userName({ firstName, lastName });

    const password = faker.internet.password({
        length: 8,
        pattern: /[A-Za-z0-9]/,
        prefix: "!7", // every password will start with '!'
    });

    return {
        firstName,
        middleName,
        lastName,
        employeeId,
        username,
        password,
    };
}
