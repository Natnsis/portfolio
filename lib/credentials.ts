import credentialsData from "@/data/credentials.json";

export interface Credential {
  title: string;
  description: string;
  fileUrl: string;
}

// Adding a credential is just an entry in data/credentials.json — no code changes.
export const CREDENTIALS: Credential[] = credentialsData as Credential[];
