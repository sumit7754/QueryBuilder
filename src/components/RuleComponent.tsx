import React, { useState, ChangeEvent, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { deleteRule, updateRule } from '../store/slices/queryBuilderSlice';
import { Rule } from '../Types/type';

interface RuleComponentProps {
  rule: Rule;
  groupId: string;
}

const RuleComponent: React.FC<RuleComponentProps> = ({ rule, groupId }) => {
  const dispatch = useDispatch();
  const [newRule, setNewRule] = useState<Partial<Rule>>(rule);

  useEffect(() => {
    dispatch(updateRule({ groupId: groupId, ruleId: rule.id, rule: newRule }));
  }, [newRule, dispatch, groupId, rule.id]);

  const handleInputChange = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewRule((prevRule) => ({
      ...prevRule,
      [name]: value,
    }));
  };

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNewRule((prevRule) => ({
      ...prevRule,
      value: [value], // Storing the value as an array
    }));
  };

  const handleDelete = () => {
    dispatch(deleteRule({ groupId: groupId, ruleId: rule.id }));
  };

  return (
    <div className="w-full p-6 bg-[#282B30] flex flex-col items-center space-y-6 rounded-lg">
      <form className="flex space-x-4">
        <div className="flex flex-col">
          <label htmlFor="field" className="block mb-2 text-sm font-medium text-white">
            Field
          </label>
          <select
            id="field"
            name="field"
            value={newRule.field || ''}
            onChange={handleInputChange}
            className="block w-56 p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white"
          >
            <option value="">Choose</option>
            <option value="Theme">Theme</option>
            <option value="Sub-theme">Sub-theme</option>
            <option value="Reason">Reason</option>
            <option value="Language">Language</option>
            <option value="Source">Source</option>
            <option value="Rating">Rating</option>
            <option value="Time Period">Time Period</option>
            <option value="Customer ID">Customer ID</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="condition" className="block mb-2 text-sm font-medium text-white">
            Condition
          </label>
          <select
            id="condition"
            name="condition"
            value={newRule.condition || ''}
            onChange={handleInputChange}
            className="block w-56 p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white"
          >
            <option value="">Choose</option>
            <option value="Equals">Equals</option>
            <option value="Does not equal">Does not equal</option>
            <option value="Like">Like</option>
            <option value="Not like">Not like</option>
            <option value="Greater than">Greater than</option>
            <option value="Less than">Less than</option>
            <option value="Is Empty">Is Empty</option>
            <option value="Is">Is</option>
            <option value="Is not">Is not</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="value" className="block mb-2 text-sm font-medium text-white">
            Value
          </label>
          <input
            id="value"
            name="value"
            value={newRule.value?.[0] || ''}
            onChange={handleValueChange}
            className="block w-56 p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white"
            placeholder="Enter value"
          />
        </div>
      </form>
      <button onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded">
        Delete Rule
      </button>
    </div>
  );
};

export default RuleComponent;
