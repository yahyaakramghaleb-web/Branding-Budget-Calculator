
export interface FormData {
  scope: {
    logo: boolean;
    guidelines: boolean;
    stationery: boolean;
    social: boolean;
    website: boolean;
  };
  businessSize: 'Startup' | 'Small Business' | 'Established Corporation';
  complexity: 'Simple' | 'Moderate' | 'Complex';
  timeline: 'Standard' | 'Rush';
  experience: 'Junior' | 'Mid-level' | 'Senior';
  region: 'Egypt' | 'UAE' | 'Saudi Arabia' | 'Other MENA';
}

export interface Source {
  web?: {
    uri: string;
    title: string;
  };
}
