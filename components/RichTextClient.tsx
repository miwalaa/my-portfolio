'use client';

import React from 'react';

type RichTextNode = {
  text?: string;
  children?: RichTextNode[];
  type?: string;
  [key: string]: any;
};

type Props = {
  content: RichTextNode[];
  className?: string;
};

const RichTextClient: React.FC<Props> = ({ content, className }) => {
  const renderContent = (node: RichTextNode, index: number) => {
    if (!node) return null;
    
    // Handle text nodes
    if (node.text) {
      return <span key={index}>{node.text}</span>;
    }

    // Handle element nodes
    if (node.children) {
      const children = node.children.map((child, i) => renderContent(child, i));
      
      switch (node.type) {
        case 'h1':
          return <h1 key={index} className="text-3xl font-bold my-4">{children}</h1>;
        case 'h2':
          return <h2 key={index} className="text-2xl font-bold my-3">{children}</h2>;
        case 'h3':
          return <h3 key={index} className="text-xl font-bold my-2">{children}</h3>;
        case 'p':
          return <p key={index} className="my-4">{children}</p>;
        case 'ul':
          return <ul key={index} className="list-disc pl-6 my-4">{children}</ul>;
        case 'ol':
          return <ol key={index} className="list-decimal pl-6 my-4">{children}</ol>;
        case 'li':
          return <li key={index} className="my-1">{children}</li>;
        case 'a':
          return (
            <a 
              key={index} 
              href={node.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {children}
            </a>
          );
        case 'blockquote':
          return <blockquote key={index} className="border-l-4 border-gray-300 pl-4 my-4 italic">{children}</blockquote>;
        case 'code':
          return <code key={index} className="bg-gray-100 dark:bg-gray-800 p-1 rounded">{children}</code>;
        default:
          return <div key={index} className="my-2">{children}</div>;
      }
    }

    return null;
  };

  if (!content || !Array.isArray(content)) {
    return null;
  }

  return (
    <div className={className}>
      {content.map((node, index) => (
        <React.Fragment key={index}>
          {renderContent(node, index)}
        </React.Fragment>
      ))}
    </div>
  );
};

export default RichTextClient;
