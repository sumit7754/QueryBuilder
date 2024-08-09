import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Rule, RuleGroup } from '../../Types/type';

interface QueryBuilderState {
  groups: RuleGroup[];
  update: boolean;
}

const initialState: QueryBuilderState = {
  groups: [],
  update: false,
};

const findParById = (groups: RuleGroup[], id: string): RuleGroup | null => {
  for (const group of groups) {
    if (group.id === id) {
      return group;
    }
    for (const child of group.children) {
      if (child.type === 'rule_group') {
        const foundGroup = findParById([child as RuleGroup], id);
        if (foundGroup) {
          return foundGroup;
        }
      }
    }
  }
  return null;
};

const queryBuilderSlice = createSlice({
  name: 'queryBuilder',
  initialState,
  reducers: {
    addGroup: (state, action: PayloadAction<{ parentGroupId: string | null; group: RuleGroup }>) => {
      if (action.payload.parentGroupId) {
        const parentGroup = findParById(state.groups, action.payload.parentGroupId);
        parentGroup?.children.push(action.payload.group);
      } else {
        state.groups.push(action.payload.group);
      }
      state.update = true;
    },
    addRule: (state, action: PayloadAction<{ groupId: string; rule: Rule }>) => {
      const parentGroup = findParById(state.groups, action.payload.groupId);
      parentGroup?.children.push(action.payload.rule);
      state.update = true;
    },
    updateRule: (state, action: PayloadAction<{ groupId: string; ruleId: string; rule: Partial<Rule> }>) => {
      const parentGroup = findParById(state.groups, action.payload.groupId);
      if (parentGroup) {
        parentGroup.children = parentGroup.children.map((child) => {
          if (child.type === 'rule' && child.id === action.payload.ruleId) {
            return { ...child, ...action.payload.rule };
          }
          return child;
        });
      }
      state.update = true;
    },
    updateGroup: (
      state,
      action: PayloadAction<{ groupId: string; conjunction: 'AND' | 'OR' | null; not: boolean | null }>,
    ) => {
      const group = findParById(state.groups, action.payload.groupId);
      if (group && action.payload.conjunction !== null) {
        group.conjunction = action.payload.conjunction;
      }
      if (group && action.payload.not !== null) {
        group.not = action.payload.not;
      }
      state.update = true;
    },
    deleteRule: (state, action: PayloadAction<{ groupId: string; ruleId: string }>) => {
      const group = findParById(state.groups, action.payload.groupId);
      if (group) {
        group.children = group.children.filter(
          (child) => !(child.type === 'rule' && child.id === action.payload.ruleId),
        );
      }
      state.update = true;
    },
    deleteGroup: (state, action: PayloadAction<{ parentId: string | null; groupId: string }>) => {
      if (action.payload.parentId === null) {
        state.groups = state.groups.filter((group) => group.id !== action.payload.groupId);
      } else {
        const parentGroup = findParById(state.groups, action.payload.parentId);
        if (parentGroup) {
          parentGroup.children = parentGroup.children.filter((child) => child.id !== action.payload.groupId);
        }
      }
      state.update = true;
    },
    offUpdate: (state) => {
      state.update = false;
    },
  },
});

export const { addGroup, addRule, updateRule, updateGroup, deleteRule, deleteGroup, offUpdate } =
  queryBuilderSlice.actions;
export default queryBuilderSlice.reducer;
