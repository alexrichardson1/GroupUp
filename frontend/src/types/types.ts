interface Group {
  leader: string;
  maxmembers: number;
  teammates: string[];
  requirements: string[];
  adrequirements: string;
  projectid: number;
  leaderemail: string;
  posted: string;
}

export type { Group };
