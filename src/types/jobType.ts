export type TJob = {
  id: number;
  title: string;
  slug: string;
  job_type: string;
  description: string;
  candidate_needed: string;
  min_salary: string;
  max_salary: string;
  started_on: string;
  status: string;
  salary_range: {
    currency: string;
    max_salary: string;
    min_salary: string;
    display_text: string;
  };
  list_card: {
    badge: string;
    started_on_text: string;
    cta: string;
  };
};
