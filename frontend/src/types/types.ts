interface GroupT {
  id: number;
  leader: string;
  maxmembers: number;
  teammates: string[];
  requirements: string[];
  adrequirements: string;
  projectid: number;
  leaderemail: string;
  posted: string;
}

interface ProjectT {
  id: number;
  name: string;
  requirements: string[];
  description: string;
  hours: number;
  date: string;
  location: string;
}

interface UserT {
  id: number;
  fullname: string;
  email: string;
  password: string;
  activefilter: string[];
  lastlogin: string;
  groupsid: number;
}

export type { GroupT, ProjectT, UserT };
