import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import RuleGroupComponent from './RuleGroupComponent';
import { addGroup, offUpdate } from '../store/slices/queryBuilderSlice';
import { AppDispatch, RootState } from '../store/store';
import { Rule, RuleGroup } from '../Types/type';
import Modal from './modal';

interface QueryBuilderProps {
  onClose: () => void;
}

const QueryBuilder: React.FC<QueryBuilderProps> = ({ onClose }) => {
  const groups = useSelector((state: RootState) => state.queryBuilder.groups);
  const dispatch: AppDispatch = useDispatch();
  const update = useSelector((store: RootState) => store.queryBuilder.update);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formattedQuery, setFormattedQuery] = useState('');
  const [resultString, setResultString] = useState('');

  const addNewGroup = () => {
    const newGroup: RuleGroup = {
      id: uuidv4(),
      children: [],
      conjunction: 'AND', // Default conjunction for new groups
      not: false,
      type: 'rule_group',
    };
    dispatch(addGroup({ parentGroupId: null, group: newGroup }));
  };

  const removeFields = (data: any): any => {
    if (Array.isArray(data)) {
      return data.map((item) => removeFields(item));
    } else if (typeof data === 'object' && data !== null) {
      const { id, type, ...rest } = data;
      return Object.fromEntries(Object.entries(rest).map(([key, value]) => [key, removeFields(value)]));
    } else {
      return data;
    }
  };

  const humanizeQuery = (groups: (RuleGroup | Rule)[]): string => {
    return groups
      .map((group) => {
        if (group.type === 'rule') {
          const valueStr = group.value?.length ? `'${group.value.join(', ')}'` : 'N/A';
          return `${group.field} ${group.condition} ${valueStr}`;
        }

        const childrenStr = group.children.map((child) => humanizeQuery([child])).join(` ${group.conjunction} `);
        const negationStr = group.not ? 'NOT ' : '';
        return `(${negationStr}${childrenStr})`;
      })
      .join(' ');
  };

  const showResult = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (update) {
      const cleanedGroups = removeFields(groups);
      setFormattedQuery(JSON.stringify(cleanedGroups, null, 2));
      setResultString(humanizeQuery(groups));
      dispatch(offUpdate());
    }
  }, [update, dispatch, groups]);

  return (
    <div className="w-full h-full overflow-y-auto p-4">
      <div className="bg-[#1D2025] rounded-lg shadow-lg max-w-4xl mx-auto mt-12 mb-4">
        <div className="w-full h-auto p-6 bg-[#5C61F0] text-white rounded-t-lg flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div className="flex flex-col w-full">
            <div className="text-2xl font-semibold">Build your Query</div>
            <div className="mt-2 bg-[#4338CA] p-2 rounded-lg text-sm text-white overflow-x-auto">
              {`Query: "${formattedQuery}"`}
            </div>
            <div className="mt-2 bg-[#4338CA] p-2 rounded-lg text-sm text-white overflow-x-auto">
              {`String: "${resultString}"`}
            </div>
          </div>
          <div className="flex mt-4 sm:mt-0 sm:items-center">
            <button
              onClick={showResult}
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-4 py-2 text-sm"
            >
              Show More
            </button>
            <button
              onClick={onClose}
              className="ml-4 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg"
            >
              &times;
            </button>
          </div>
        </div>
        <div className="w-full p-6">
          {groups.map((group) => (
            <div key={group.id} className="mb-4 p-4 bg-[#2D2D2D] rounded-lg">
              <RuleGroupComponent group={group} parentId={null} />
            </div>
          ))}
          <button onClick={addNewGroup} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-4">
            Add New Group
          </button>
        </div>
      </div>
      {isModalOpen && <Modal isOpen={true} onClose={closeModal} result={formattedQuery} resultString={resultString} />}
    </div>
  );
};

export default QueryBuilder;
