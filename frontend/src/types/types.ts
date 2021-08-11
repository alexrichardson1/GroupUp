interface GroupT {
  leader: string;
  maxmembers: number;
  teammates: string[];
  requirements: string[];
  adrequirements: string;
  projectid: number;
  leaderemail: string;
  posted: string;
}

interface Project {
  id: number;
  name: string;
  requirements: string[];
  description: string;
  hours: number;
  date: string;
  location: string;
}

export type { GroupT, Project };
