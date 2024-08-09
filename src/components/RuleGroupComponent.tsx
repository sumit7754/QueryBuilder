import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import RuleComponent from './RuleComponent';
import { addRule, addGroup, updateGroup, deleteGroup } from '../store/slices/queryBuilderSlice';
import { Rule, RuleGroup } from '../Types/type';

interface RuleGroupProps {
  group: RuleGroup;
  parentId: string | null;
}

const RuleGroupComponent: React.FC<RuleGroupProps> = ({ group, parentId }) => {
  const dispatch = useDispatch();

  const toggleConjunction = () => {
    const newConjunction = group.conjunction === 'AND' ? 'OR' : 'AND';
    dispatch(updateGroup({ groupId: group.id, conjunction: newConjunction, not: null }));
  };

  const handleUpdateGroup = () => {
    dispatch(updateGroup({ groupId: group.id, conjunction: null, not: !group.not }));
  };

  const handleAddRule = () => {
    const newRule: Rule = {
      id: uuidv4(),
      type: 'rule',
      field: null,
      condition: null,
      value: [],
    };
    dispatch(addRule({ groupId: group.id, rule: newRule }));
  };

  const handleAddGroup = () => {
    const newGroup: RuleGroup = {
      id: uuidv4(),
      type: 'rule_group',
      conjunction: 'AND',
      children: [],
      not: false,
    };
    dispatch(addGroup({ parentGroupId: group.id, group: newGroup }));
  };

  const handleDeleteGroup = () => {
    dispatch(deleteGroup({ parentId: parentId, groupId: group.id }));
  };

  return (
    <div
      className={`relative pl-6 pt-6 pb-6 rounded-lg ${parentId ? 'ml-10 border-l-4 border-gray-600' : 'bg-[#1D2025]'}`}
    >
      <div className="flex justify-between items-center">
        <div className="flex space-x-4">
          <button
            onClick={toggleConjunction}
            className={`px-4 py-2 text-white rounded-lg ${group.conjunction === 'AND' ? 'bg-blue-600' : 'bg-gray-600'}`}
          >
            AND
          </button>
          <button
            onClick={toggleConjunction}
            className={`px-4 py-2 text-white rounded-lg ${group.conjunction === 'OR' ? 'bg-blue-600' : 'bg-gray-600'}`}
          >
            OR
          </button>
        </div>
        {parentId === null && (
          <div className="space-x-4">
            <button
              onClick={handleUpdateGroup}
              className={`${group.not ? 'bg-green-500' : 'bg-gray-400'} text-white py-2 px-4 rounded`}
            >
              NOT
            </button>

            <button onClick={handleAddRule} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
              Add Rule
            </button>
            <button onClick={handleAddGroup} className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">
              Add Group
            </button>
            <button onClick={handleDeleteGroup} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded">
              Delete Group
            </button>
          </div>
        )}
      </div>

      <div className="mt-6 space-y-6">
        {group.children.map((child) =>
          child.type === 'rule' ? (
            <RuleComponent key={child.id} groupId={group.id} rule={child} />
          ) : (
            <RuleGroupComponent key={child.id} group={child} parentId={group.id} />
          ),
        )}
      </div>

      {parentId && (
        <div className="mt-4 flex space-x-4">
          <button
            onClick={handleUpdateGroup}
            className={`${group.not ? 'bg-green-500' : 'bg-gray-400'} text-white py-2 px-4 rounded`}
          >
            NOT
          </button>

          <button onClick={handleAddRule} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
            Add Rule
          </button>
          <button onClick={handleAddGroup} className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">
            Add Group
          </button>
          <button onClick={handleDeleteGroup} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded">
            Delete Group
          </button>
        </div>
      )}
    </div>
  );
};

export default RuleGroupComponent;
