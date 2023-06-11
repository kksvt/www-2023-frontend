import React, { useState, useRef } from 'react';

const Accordion = ({title, description }) => {
  const [expanded, setExpanded] = useState(false);
  const contentRef = useRef(null);

  const toggleAccordion = () => {
    setExpanded(!expanded);
  };

  return (
    <div className='accordion'>
      <button className="accordion-header" onClick={toggleAccordion}>
        {title}
      </button>
      <div
        className='accordion-content'
        ref={contentRef}
        style={{ maxHeight: expanded ? contentRef.current.scrollHeight + 'px' : 0 }}
      >
        <div className='accordion-text'>{description}</div>
      </div>
    </div>
  );
};

export default Accordion;
