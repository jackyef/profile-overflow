export interface StackResponse<T> {
  items: T[];
  has_more: boolean;
  backoff: number;
  quota_max: number;
  quota_remaining: number;
  total: number;
}

export interface StackUserData {
  badge_counts: BadgeCounts;
  account_id: number;
  is_employee: boolean;
  last_modified_date: number;
  last_access_date: number;
  reputation_change_year: number;
  reputation_change_quarter: number;
  reputation_change_month: number;
  reputation_change_week: number;
  reputation_change_day: number;
  reputation: number;
  creation_date: number;
  user_type: string;
  user_id: number;
  accept_rate: number;
  location: string;
  website_url: string;
  link: string;
  profile_image: string;
  display_name: string;
  up_vote_count: number;
  view_count: number;
  question_count: number;
  answer_count: number;
}

export interface BadgeCounts {
  bronze: number;
  silver: number;
  gold: number;
}

export interface Tag {
  user_id: number;
  answer_count: number;
  answer_score: number;
  question_count: number;
  question_score: number;
  tag_name: string;
}

export interface Badge {
  badge_type: string;
  award_count: number;
  rank: string;
  badge_id: number;
  link: string;
  name: string;
}

export interface Question {
  tags: string[];
  comment_count: number;
  is_answered: boolean;
  view_count: number;
  up_vote_count: number;
  answer_count: number;
  score: number;
  creation_date: number;
  link: string;
  title: string;
}

export interface Answer {
  up_vote_count: number;
  is_accepted: boolean;
  score: number;
  last_activity_date: number;
  last_edit_date: number;
  creation_date: number;
  answer_id: number;
  question_id: number;
  body_markdown: string;
  link: string;
}
