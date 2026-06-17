/**
 * Test user credentials and associated data.
 * Import these constants in specs — never hardcode credentials inline.
 */

export interface UserCredentials {
  username: string;
  password: string;
}

export interface UserAddress {
  name: string;
  street: string;
  cityPostcode: string;
  region: string;
  country: string;
}

export interface TestUser {
  credentials: UserCredentials;
  address: UserAddress;
}

export const KARL_DAVIES: TestUser = {
  credentials: {
    username: 'karldavies',
    password: 'password1',
  },
  address: {
    name: 'Karl Davies',
    street: 'Lepsa 45',
    cityPostcode: 'Warszawa 02-758',
    region: 'Mazowieckie',
    country: 'Poland',
  },
};
