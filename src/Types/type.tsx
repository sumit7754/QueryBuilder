export interface Rule {
  field?: 'Theme' | 'Sub-theme' | 'Reason' | 'Language' | 'Source' | 'Rating' | 'Time Period' | 'Customer ID' | null;
  condition?:
    | 'Equals'
    | 'Does not equal'
    | 'Like'
    | 'Not like'
    | 'Is Empty'
    | 'Is'
    | 'Is not'
    | 'Greater than'
    | 'Less than'
    | null;
  value?: string[] | null;
  type: 'rule';
  id: any;
}

export interface RuleGroup {
  children: (RuleGroup | Rule)[];
  conjunction: 'AND' | 'OR' | null;
  not: boolean;
  type: 'rule_group';
  id: any;
}
