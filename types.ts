export type Profile = {
  name: string;
  role: string;
  summary: string;
  photo: string;
  linkedin: string;
  email: string;
  location: string;
  stats?: { label: string; value: string }[];
};

export type Skills = {
  primary: string[];
  secondary: string[];
};

export type Experience = {
  company: string;
  items: { title: string; dates: string; summary: string }[];
}[];

export type Cert = { name: string; dates: string }[];
