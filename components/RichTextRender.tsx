'use client';

import React from 'react';

type Props = {
  content: any;
  className?: string;
};

const renderContent = (node: any) => {
  if (!node) return null;
  
  if (node.text) {
    return node.text;
  }

  if (node.children) {
    const children = node.children.map((child: any, i: number) => (
      <React.Fragment key={i}>{renderContent(child)}</React.Fragment>
    ));

    switch (node.type) {
      case 'h1':
        return <h1 className="text-4xl font-bold my-4">{children}</h1>;
      case 'h2':
        return <h2 className="text-3xl font-bold my-3">{children}</h2>;
      case 'h3':
        return <h3 className="text-2xl font-bold my-2">{children}</h3>;
      case 'p':
        return <p className="my-2">{children}</p>;
      case 'ul':
        return <ul className="list-disc pl-6 my-2">{children}</ul>;
      case 'ol':
        return <ol className="list-decimal pl-6 my-2">{children}</ol>;
      case 'li':
        return <li className="my-1">{children}</li>;
      case 'a':
        return <a href={node.url} className="text-blue-600 hover:underline">{children}</a>;
      default:
        return <div>{children}</div>;
    }
  }

  return null;
};

export const RichTextRender: React.FC<Props> = ({ content, className }) => {
  if (!content) {
    return null;
  }

  return (
    <div className={className}>
      {content.root.children.map((node: any, i: number) => (
        <React.Fragment key={i}>
          {renderContent(node)}
        </React.Fragment>
      ))}
    </div>
  );
};

export default RichTextRender;
