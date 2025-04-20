export default function CredentialsProvider(options) {
  return {
    id: "credentials",
    name: "Credentials",
    type: "credentials",
    credentials: {},
    authorize(credentials, req) {
      return null;
    },
    ...options,
  };
}
