const { faker } = require("@faker-js/faker");
const bcrypt = require("bcryptjs");

async function usersGenerator() {
  const usersData = [];

  for (let i = 0; i < 20; i++) {
    const id = faker.string.uuid();
    const username = faker.person.firstName();
    const password = await bcrypt.hash(
      genPassword(8, { lowercase: false, uppercase: true, numbers: false, symbols: true }),
      10,
    );
    const created_at = new Date();
    const updated_at = new Date();

    const userData = {
      id,
      username,
      password,
      created_at,
      updated_at,
    };

    usersData.push(userData);
  }

  return usersData;
}

function usersPermissionsGenerator(users) {
  const usersPermissions = [];

  users.forEach((user) => {
    const permission_id = faker.number.int({ min: 1, max: 2 });
    const user_id = user.id;

    usersPermissions.push({
      permission_id,
      user_id,
    });
  });

  return usersPermissions;
}

function genPassword(length, options) {
  let password = "";
  const passwordCharsTypes = getPasswordCharsTypes(options);

  for (let i = 0; i < length; i++) {
    const charTypeIndex = faker.number.int({ min: 0, max: passwordCharsTypes.length - 1 });
    const charType = passwordCharsTypes[charTypeIndex];

    const charIndex = faker.number.int({ min: 0, max: charType.length - 1 });
    const char = charType[charIndex];

    password += char;
  }

  return password;
}

function getPasswordCharsTypes(options) {
  const passwordCharsTypes = [];

  const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
  const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+-=[]{}|;:'\",.\\<>?/";
  const charsTypes = [lowercaseLetters, uppercaseLetters, numbers, symbols];

  Object.values(options).forEach((option, i) => {
    if (!option) return;
    passwordCharsTypes.push(charsTypes[i]);
  });

  return passwordCharsTypes;
}

module.exports = { usersGenerator, usersPermissionsGenerator };
