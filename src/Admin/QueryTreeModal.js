import React, { useState, useEffect } from 'react';
import './QueryTreeModal.css'; // For styling

const QueryTreeModal = ({ isVisible, onClose, queryTreeData, onCheckQuery, selectedQueries }) => {
  const [collapsedKeys, setCollapsedKeys] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState([]);

  useEffect(() => {
    // Initialize collapsed state on mount
    setCollapsedKeys(queryTreeData.map(node => node.key));
    setExpandedKeys([]);
  }, [queryTreeData]);

  const handleToggleCollapseExpand = () => {
    if (expandedKeys.length === 0) {
      setExpandedKeys(queryTreeData.map(node => node.key));
      setCollapsedKeys([]);
    } else {
      setCollapsedKeys(queryTreeData.map(node => node.key));
      setExpandedKeys([]);
    }
  };

  const handleNodeToggle = (key) => {
    if (expandedKeys.includes(key)) {
      setExpandedKeys(expandedKeys.filter(k => k !== key));
      setCollapsedKeys([...collapsedKeys, key]);
    } else {
      setExpandedKeys([...expandedKeys, key]);
      setCollapsedKeys(collapsedKeys.filter(k => k !== key));
    }
  };

  const renderTreeNodes = (nodes, level = 0) => (
    nodes.map(node => (
      <div key={node.key} className={`tree-node level-${level}`}>
        <div className="tree-node-content">
          {node.children && node.children.length > 0 && (
            <button 
              onClick={() => handleNodeToggle(node.key)} 
              className="collapse-toggle-button"
            >
              {expandedKeys.includes(node.key) ? '−' : '+'}
            </button>
          )}
          <input
            type="checkbox"
            checked={selectedQueries.includes(node.key)}
            onChange={() => onCheckQuery(node.key)}
          />
          <span className="node-title">
            {node.children && node.children.length > 0 && (
              <img src={node.iconUrl} alt="icon" className="node-icon" />
            )}
            {node.title}
          </span>
          {node.children && node.children.length > 0 && (
            <div className={`tree-children ${collapsedKeys.includes(node.key) ? 'collapsed' : ''}`}>
              {renderTreeNodes(node.children, level + 1)}
            </div>
          )}
        </div>
      </div>
    ))
  );

  if (!isVisible) return null;

  return (
    // <div className='popUpContainer'>
    <div className="query-tree-modal">
      <div className="modal-header">
        <div style={{flex:'column'}}>
        <h2>Nature of Query</h2>
        <p>Check all relevant call query categories below.</p>
        </div>
        <button onClick={handleToggleCollapseExpand} className="toggle-collapse-expand-button">
          {expandedKeys.length === 0 ? ' ^ ' : ' v '}
          {expandedKeys.length === 0 ? 'Expand All' : 'Collapse All'}
        </button>
      </div>
      <div className="modal-body">
        <div className="tree-container">
          <div className="tree-column">
            {renderTreeNodes(queryTreeData.slice(0, Math.ceil(queryTreeData.length / 2)))}
          </div>
          <div className="tree-column">
            {renderTreeNodes(queryTreeData.slice(Math.ceil(queryTreeData.length / 2)))}
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <button onClick={onClose} className="close-button">SAVE</button>
      </div>
    </div>
    // </div>
  );
};

export default QueryTreeModal;
