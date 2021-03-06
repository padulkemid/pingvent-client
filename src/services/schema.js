import gql from 'graphql-tag';

// mutations

// USER
export const LOGIN = gql`
  mutation($input: LoginUser!) {
    loginUser(input: $input)
  }
`;

export const REFRESH_TOKEN = gql`
  mutation($input: RefreshTokenData!) {
    refreshToken(input: $input)
  }
`;

export const EDIT_USER = gql`
  mutation($id: ID!, $input: EditUser!) {
    editUser(id: $id, input: $input) {
      id
      username
      nama
      role
      email
      phone
      address
      latlng
      updatedAt
    }
  }
`;

export const DELETE_USER = gql`
  mutation($id: ID!) {
    hapusUser(id: $id)
  }
`;

export const PARSE_TOKEN = gql`
  query {
    parseTokenData {
      username
      role
    }
  }
`;

// BARANG
export const BUAT_BARANG = gql`
  mutation($input: BarangBaru!) {
    buatBarang(input: $input) {
      id
      nama
      harga
      stock
      vendor
      createdAt
      updatedAt
    }
  }
`;

export const EDIT_BARANG = gql`
  mutation($id: ID!, $input: BarangBaru!) {
    editBarang(id: $id, input: $input) {
      id
      nama
      harga
      stock
      vendor
      createdAt
      updatedAt
    }
  }
`;

export const HAPUS_BARANG = gql`
  mutation($id: ID!) {
    hapusBarang(id: $id)
  }
`;

// queries

// USER
export const LIST_USER = gql`
  query {
    semuaUser {
      id
      username
      nama
      role
      email
      phone
      address
      latlng
      createdAt
      updatedAt
      lastLoginAt
    }
  }
`;

// BARANG
export const LIST_BARANG = gql`
  query {
    semuaBarang {
      id
      nama
      harga
      stock
      vendor
      createdAt
      updatedAt
    }
  }
`;
